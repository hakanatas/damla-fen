// SAHNE 1 — Merak: haberlerdeki iklim sözcükleri; soru; hava olayı ≠ iklim
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const U = U7;
  function dryLand(ctx, t) {
    const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(227,160,58,0.20)'); g.addColorStop(1, 'rgba(181,85,63,0.06)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
    P.sun(ctx, 1640, 330, 95, t, { cells: false, nrays: 20 });
    const land = [[-20, 760], [400, 740], [900, 752], [1400, 735], [1940, 750], [1940, 1100], [-20, 1100]];
    P.fillPts(ctx, land, '#E9D7B0'); wash(ctx, land, '#B98A55', 0.35, 3000, { bleed: 2, blooms: 2 });
    stroke(ctx, land.slice(0, 5), { w: 3.2, seed: 3001 });
    // kuru toprak çatlakları
    const r = INK.rng(3002);
    for (let i = 0; i < 14; i++) { const x = 60 + i * 135 + r() * 40, y = 800 + r() * 90; const pts = [[x, y]]; for (let j = 0; j < 4; j++) pts.push([pts[j][0] + 18 + r() * 20, pts[j][1] + (r() - 0.5) * 26]); stroke(ctx, pts, { w: 1.6, alpha: 0.55, dry: false, seed: 3003 + i }); }
    U.tree(ctx, 280, 748, 1.0, t, { seed: 3, color: '#A89A3A' });
  }
  function headline(ctx, x, y, txt, icon, k, t, rot) {
    if (k <= 0) return; const s = P.pop(k);
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    U.card(ctx, -210, -70, 420, 140, { seed: 3010 + txt.length });
    P.fillPts(ctx, U.rect(-210, -70, 210, -46), U.HEAT, 0.55);
    U.txt(ctx, 'HABER', -196, -52, { size: 20, color: PAL.white });
    icon(ctx);
    U.fit(ctx, txt, 50, 30, 260, 40);
    ctx.restore();
  }
  E.scene({
    name: 'Merak', concept: 'Soru: Dünya neden ısınıyor?', from: 'title', to: 'q',
    draw(ctx, t) {
      const sq = E.s('q');
      dryLand(ctx, t);
      const hs = [
        ['rekor sıcaklık', c => U.thermo(c, -140, 36, 90, 0.85), 560, 440, -0.04],
        ['kuraklık', c => { const p = circlePts(-140, 10, 44, 30, 20); P.fillPts(c, p, '#C9A064'); stroke(c, p, { w: 2, closed: true, dry: false }); line(c, [-170, 4], [-140, 16], { w: 1.6, dry: false }); line(c, [-140, 16], [-112, 2], { w: 1.6, dry: false }); }, 1000, 380, 0.03],
        ['orman yangını', c => { U.tree(c, -150, 50, 0.45, t, { seed: 6 }); const f = circlePts(-130, 0, 16, 28, 16); P.fillPts(c, f, '#E3A03A', 0.95); stroke(c, f, { w: 1.6, closed: true, dry: false, color: U.HEAT }); }, 800, 600, -0.02]
      ];
      hs.forEach(([txt, ic, x, y, rot], i) => headline(ctx, x, y, txt, ic, E.se(t, sq + 0.6 + i * 1.0, sq + 1.3 + i * 1.0, 'out'), t, rot));
      const qk = E.se(t, sq + 4.6, sq + 5.4, 'out');
      if (qk > 0) { ctx.save(); ctx.globalAlpha *= qk; U.txt(ctx, '?', 1260, 520, { size: 150, color: U.HEAT, align: 'center' }); ctx.restore(); }
      U.damla(ctx, t, { x: 1380, y: 748, s: 1.3, view: 'q3', flip: true, expr: t > sq ? 'curious' : 'happy', look: t > sq ? [-0.8, -0.4] : [-0.5, 0], arms: t > sq ? [[-1, 0.4], [1, [22, -150], 1]] : [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]], seed: 1 });
      U.title(ctx, t, '27 · Isınan Dünya: Küresel İklim Değişikliği');
    }
  });
  E.scene({
    name: 'Hava ve iklim', concept: 'Hava olayı günlük, iklim uzun yılların ortalaması', from: 'climate', to: 'climate', trFrom: [960, 540],
    draw(ctx, t) {
      const s0 = E.s('climate');
      // sol: tek gün
      const lk = E.se(t, s0 + 0.3, s0 + 1.0, 'out');
      if (lk > 0) { ctx.save(); ctx.globalAlpha *= lk;
        U.card(ctx, 180, 260, 560, 520, { tint: PAL.water, seed: 3020 });
        U.txt(ctx, 'Hava olayı', 460, 340, { size: 54, align: 'center', color: PAL.water });
        P.icon.calendar(ctx, 360, 520, 1.1, 'bugün');
        U.cloud(ctx, 590, 480, 0.55); U.rain(ctx, 590, 520, 150, 120, t, 1, { n: 8 });
        U.txt(ctx, 'kısa süreli, günlük', 460, 730, { size: 40, align: 'center' });
        ctx.restore(); }
      // sağ: uzun yıllar
      const rk = E.se(t, s0 + 1.8, s0 + 2.5, 'out');
      if (rk > 0) { ctx.save(); ctx.globalAlpha *= rk;
        U.card(ctx, 900, 260, 840, 520, { tint: '#C07F1E', tintA: 0.14, seed: 3021 });
        U.txt(ctx, 'İklim', 1320, 340, { size: 54, align: 'center', color: U.AMBER });
        const r = INK.rng(3022); const n = 30;
        for (let i = 0; i < n; i++) { const k = E.se(t, s0 + 2.4 + i * 0.05, s0 + 2.8 + i * 0.05); const h = (90 + r() * 110) * k; const x = 960 + i * 24; P.fillPts(ctx, U.rect(x, 640 - h, x + 16, 640), '#C07F1E', 0.55); }
        line(ctx, [950, 642], [1690, 642], { w: 2.4, dry: false });
        const ak = E.seg(t, s0 + 4.2, s0 + 5.2); if (ak > 0) { ctx.save(); INK.dashed(ctx, P.partial(Array.from({ length: 186 }, (_, i) => [950 + i * 4, 545]), ak), { w: 3.4, color: PAL.ink, on: 12, off: 8 }); ctx.restore(); }
        U.txt(ctx, 'ortalama', 1700, 540, { size: 32, align: 'right', alpha: ak });
        U.txt(ctx, 'uzun yılların ortalaması (temsilî)', 1320, 730, { size: 38, align: 'center' });
        ctx.restore(); }
      P.write(ctx, '≠', 820, 560, E.seg(t, s0 + 1.4, s0 + 2.0), { size: 110, align: 'center' });
    }
  });
})();
