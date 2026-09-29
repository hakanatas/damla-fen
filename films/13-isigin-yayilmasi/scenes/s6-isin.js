// SAHNE 6 — Işık ışını çizimi: ok uçlu düz çizgi; matematikteki ışın ile ilişki; doğru / yanlış çizimler
// (TYMM: "çizimlerinde ışığı bir doğru şeklinde çizmeleri"; matematik dersi ile ilişkilendirme)
(function () {
  const { PAL, line, stroke, circlePts, dashed, arrowHead } = INK;
  const F = F13, RED = F.RED;

  E.scene({
    name: 'Işık ışını', concept: 'Işığın yolu ışınla gösterilir', from: 'ray', to: 'wrong', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('ray'), sm = E.s('math'), sw = E.s('wrong');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 120, 1620, 790);
      // --- a ray from a source ---
      const S = [400, 400];
      F.bulb(ctx, S[0], S[1], 0.9, 1, { glow: true });
      P.write(ctx, 'kaynak', S[0], S[1] + 100, E.seg(t, sr + 0.4, sr + 1.2), { size: 38, align: 'center' });
      const k0 = E.se(t, sr + 0.8, sr + 2.6, 'sine');
      F.ray(ctx, [S[0] + 34, S[1]], [S[0] + 560, S[1]], k0, { w: 4.5, head: 20, heads: [0.55] });
      P.write(ctx, 'ışık ışını', S[0] + 320, S[1] - 34, E.seg(t, sr + 2.4, sr + 3.4), { size: 48, align: 'center', color: '#8A4A10' });
      const kf = E.se(t, sr + 3.6, sr + 5.0);
      [-0.55, -0.3, 0.3, 0.55, 2.6, 3.14, -2.6].forEach((a, i) => F.ray(ctx, [S[0] + Math.cos(a) * 34, S[1] + Math.sin(a) * 34], [S[0] + Math.cos(a) * 200, S[1] + Math.sin(a) * 200], kf, { w: 2.6, head: 12, heads: [0.6], alpha: 0.7, seed: 810 + i }));
      // --- math: ray [AB ---
      const mk = E.se(t, sm + 0.2, sm + 0.8);
      if (mk > 0) {
        ctx.save(); ctx.globalAlpha = mk;
        line(ctx, [1060, 250], [1064, 560], { w: 1.6, alpha: 0.4, dry: false });
        INK.label(ctx, 'Matematikte:', 1130, 260, { size: 38, weight: 700 });
        ctx.restore();
        const A = [1170, 400], B = [1420, 400];
        const k = E.se(t, sm + 1.0, sm + 3.0);
        INK.inkDot(ctx, A[0], A[1], 7);
        if (k > 0) { P.drawOn(ctx, [A, [A[0] + 480 * k, A[1]]], 1, { w: 4, taper: 0.02 }); if (k > 0.98) arrowHead(ctx, [1640, 400], [1650, 400], 18, { w: 3.6 }); }
        if (k > 0.5) INK.inkDot(ctx, B[0], B[1], 6);
        INK.label(ctx, 'A', A[0] - 12, A[1] - 22, { size: 40, weight: 700, alpha: mk });
        if (k > 0.5) INK.label(ctx, 'B', B[0] - 10, B[1] - 22, { size: 40, weight: 700 });
        P.write(ctx, '[AB ışını', 1410, 320, E.seg(t, sm + 2.8, sm + 3.6), { size: 46, align: 'center' });
        P.write(ctx, 'başlangıç noktası', A[0] - 40, A[1] + 62, E.seg(t, sm + 3.4, sm + 4.4), { size: 34 });
        P.write(ctx, 'bir yönde sonsuza uzar', 1410, 520, E.seg(t, sm + 4.4, sm + 5.6), { size: 34, align: 'center' });
      }
      // --- right vs wrong drawings ---
      const cards = [
        { x: 290, ok: true, cap: 'doğru', path: (x, y) => [[x + 60, y], [x + 290, y]] },
        { x: 650, ok: false, cap: 'eğri', path: (x, y) => P.bez([x + 60, y], [x + 170, y - 120], [x + 290, y + 10], 30) },
        { x: 1010, ok: false, cap: 'dalgalı', path: (x, y) => { const p = []; for (let i = 0; i <= 40; i++) { const u = i / 40; p.push([x + 60 + u * 230, y + Math.sin(u * 14) * 22]); } return p; } },
        { x: 1370, ok: false, cap: 'ok ucu ters', rev: true, path: (x, y) => [[x + 60, y], [x + 290, y]] }
      ];
      cards.forEach((c, i) => {
        const at = (i === 0 ? sr + 5.2 : sw + 0.3 + (i - 1) * 1.6), k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const y0 = 620, y = y0 + 95;
        ctx.save(); ctx.globalAlpha = k;
        F.card(ctx, c.x, y0, 330, 220, { seed: 830 + i });
        F.bulb(ctx, c.x + 36, y, 0.6, 1, { glow: false });
        const pts = c.path(c.x + 0, y);
        if (c.path.length && pts.length > 2) { stroke(ctx, pts, { w: 3.6, color: F.AMB, dry: false }); arrowHead(ctx, pts[pts.length - 3], pts[pts.length - 1], 14, { w: 3.4, color: F.AMB }); }
        else if (c.rev) { F.ray(ctx, pts[1], pts[0], 1, { w: 3.6, heads: [0.5] }); }
        else F.ray(ctx, pts[0], pts[1], 1, { w: 3.6, heads: [0.5] });
        ctx.restore();
        P.write(ctx, c.cap, c.x + 165, y0 + 196, k, { size: 38, align: 'center', color: c.ok ? PAL.ink : RED });
        if (c.ok) P.check(ctx, c.x + 290, y0 + 30, 50, E.se(t, at + 0.5, at + 1.0), { w: 7, color: PAL.life });
        else P.cross(ctx, c.x + 295, y0 + 32, 22, E.se(t, at + 0.5, at + 1.0), { w: 7, color: RED });
      });
    }
  });
})();
