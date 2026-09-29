// SAHNE 3 — Ayrıştır, gruplandır, etiketle: saydam · yarı saydam · saydam olmayan (opak)
// (FB.5.4.2 b) ayrıştırır, c) gruplandırır, ç) etiketler)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F14;
  const ORDER = ['kitap', 'cam', 'tul', 'karton', 'dosya', 'folyo', 'buzlu'];   // mixed start order
  const CX = [380, 960, 1540], BY0 = 330, BY1 = 780;
  const DESC = [['ışığı geçirir,', 'arkası net görünür'], ['ışığın bir kısmını geçirir,', 'arkası bulanık görünür'], ['ışığı geçirmez,', 'arkası görünmez']];

  E.scene({
    name: 'Gruplandır', concept: 'Saydam, yarı saydam, opak', from: 'sort', to: 'opaque', trFrom: [960, 540],
    draw(ctx, t) {
      const ss = E.s('sort'), sc = [E.s('clear'), E.s('semi'), E.s('opaque')];
      ctx.fillStyle = 'rgba(138,106,69,0.10)'; ctx.fillRect(0, 0, E.W, E.H);
      // boxes
      CX.forEach((cx, g) => {
        const k = E.se(t, ss + 0.2 + g * 0.2, ss + 0.8 + g * 0.2, 'out'); if (k <= 0) return;
        const b = [[cx - 260, BY0], [cx + 260, BY0 - 4], [cx + 264, BY1], [cx - 256, BY1 + 4], [cx - 260, BY0]];
        ctx.save(); ctx.globalAlpha = k;
        P.fillPts(ctx, b, '#FAF6EC', 0.85);
        const named = E.se(t, sc[g] + 0.2, sc[g] + 0.8);
        if (named > 0) wash(ctx, b, F.CLS[g].col, 0.12 * named, 300 + g, { bleed: 2, blooms: 1 });
        stroke(ctx, b, { w: 3, closed: true, seed: 310 + g });
        ctx.restore();
        if (named <= 0) INK.label(ctx, '?', cx, BY0 + 330, { size: 70, weight: 700, align: 'center', alpha: k * 0.6 });
        F.tag(ctx, g, cx, BY0 - 10, named);
        P.write(ctx, DESC[g][0], cx, 650, E.seg(t, sc[g] + 0.8, sc[g] + 2.0), { size: 36, align: 'center' });
        P.write(ctx, DESC[g][1], cx, 700, E.seg(t, sc[g] + 1.8, sc[g] + 3.0), { size: 36, align: 'center' });
        if (g === 2) P.write(ctx, '(saydam olmayan)', cx, 752, E.seg(t, sc[g] + 3.0, sc[g] + 4.0), { size: 32, weight: 400, align: 'center' });
      });
      // items: from a mixed row into their group
      const slot = {}; [0, 1, 2].forEach(g => { const ms = ORDER.filter(m => F.MAT[m].cls === g); ms.forEach((m, j) => slot[m] = [CX[g] + (j - (ms.length - 1) / 2) * 165, 450]); });
      ORDER.forEach((m, i) => {
        const a = [380 + i * 200, 188], b = slot[m];
        const ki = E.se(t, ss + 0.4, ss + 0.9, 'out'); if (ki <= 0) return;
        const k = E.se(t, ss + 1.2 + i * 0.55, ss + 2.0 + i * 0.55);
        const p = [E.lerp(a[0], b[0], k), E.lerp(a[1], b[1], k) - Math.sin(k * Math.PI) * 80];
        ctx.save(); ctx.globalAlpha = ki; F.icon(ctx, m, p[0], p[1], 0.85); ctx.restore();
        F.MAT[m].name.split(' ').forEach((w, j) => INK.label(ctx, w, p[0], p[1] + 90 + j * 34, { size: 34, weight: 700, align: 'center', alpha: ki }));
      });
    }
  });
})();
