// SAHNE 3 — Paralel ışınlar: ince kenarlı mercek toplar (odak noktası), kalın kenarlı mercek dağıtır (uzantılar odakta kesişir)
// Her ışın iki küresel yüzeyde Snell ile (n = 1,5) izlenir: F713.traceLens. Odak, eksene çok yakın ışınla bulunur (F713.focus).
// Özel ışınlarla görüntü çizimine girilmez (TYMM sınırlaması).
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F713, V = F.V;
  const CY = 520, CX = 800, X0 = 250, XEND = 1480;
  const LC = F.lens(CX, CY, 160, 77, 400, true), LD = F.lens(CX, CY, 160, 12, 400, false);
  const HS = [-80, -40, 0, 40, 80];
  const TC = HS.map(h => F.traceLens(LC, X0, h)), TD = HS.map(h => F.traceLens(LD, X0, h));
  const FC = F.focus(LC), FD = F.focus(LD);

  function rays(ctx, trs, k, o = {}) {
    trs.forEach((tr, i) => {
      const [p0, p1, p2] = tr.pts, pe = F.toX(p2, tr.d, XEND);
      const a = E.clamp(k * 3), b = E.clamp(k * 3 - 1), c = E.clamp(k * 3 - 2);
      if (a > 0) F.ray(ctx, p0, p1, a, { seed: 1000 + i, heads: [0.45], w: 3 });
      if (b > 0) F.ray(ctx, p1, p2, b, { seed: 1010 + i, heads: [], w: 3 });
      if (c > 0) F.ray(ctx, p2, pe, c, { seed: 1020 + i, heads: [0.35], w: 3 });
    });
  }

  E.scene({
    name: 'Işığın yolu', concept: 'Toplayıcı / dağıtıcı mercek, odak noktası', from: 'rays', to: 'vfocus', trFrom: [800, 520],
    draw(ctx, t) {
      const sr = E.s('rays'), sc = E.s('converge'), sf = E.s('focus'), sd = E.s('diverge'), sv = E.s('vfocus');
      // optik eksen
      F.dline(ctx, [X0 - 60, CY], [XEND + 40, CY], { color: PAL.ink, alpha: 0.35, w: 1.6, on: 16, off: 10 });
      F.lightbox(ctx, X0, CY - 40, 0, 0.8); F.lightbox(ctx, X0, CY + 40, 0, 0.8);
      const bars = [[X0 - 8, CY - 110], [X0 + 6, CY - 110], [X0 + 6, CY + 110], [X0 - 8, CY + 110], [X0 - 8, CY - 110]];
      P.fillPts(ctx, bars, '#5E7F93', 0.9); stroke(ctx, bars, { w: 2.4, closed: true, dry: false });
      INK.label(ctx, 'paralel ışınlar', X0 - 40, CY + 170, { size: 32, alpha: 0.8 });
      const swap = E.se(t, sd - 0.2, sd + 0.6);
      // ince kenarlı
      if (swap < 1) E.layer(ctx, 1 - swap, c => {
        F.drawLens(c, LC, { seed: 1031 });
        INK.label(c, 'ince kenarlı mercek', CX, CY - 200, { size: 38, weight: 700, align: 'center' });
        rays(c, TC, E.se(t, sr + 1.0, sr + 4.5, 'sine'));
        const kf = E.se(t, sf + 0.2, sf + 1.0);
        if (kf > 0) { F.glow(c, FC[0], FC[1], 70, kf); INK.inkDot(c, FC[0], FC[1], 7);
          E.inkText(c, 'odak noktası', FC[0], FC[1] + 250, t, sf + 0.6, 1e9, { size: 42, align: 'center', color: '#8A4A10' });
          if (t > sf + 0.8) INK.leader(c, [FC[0], FC[1] + 205], [FC[0], FC[1] + 14], { color: '#8A4A10', bend: 0.1 }); }
        if (t > sc + 1.5) { const k = E.se(t, sc + 1.5, sc + 2.2); c.save(); c.globalAlpha *= k;
          stroke(c, circlePts(TC[0].pts[1][0] + 4, TC[0].pts[1][1], 16, 16, 20), { w: 2.4, closed: true, color: PAL.water, dry: false });
          stroke(c, circlePts(TC[0].pts[2][0] - 2, TC[0].pts[2][1], 16, 16, 20), { w: 2.4, closed: true, color: PAL.water, dry: false });
          INK.label(c, '1. kırılma', TC[0].pts[1][0] - 150, TC[0].pts[1][1] - 30, { size: 30, color: PAL.water });
          INK.label(c, '2. kırılma', TC[0].pts[2][0] + 24, TC[0].pts[2][1] - 30, { size: 30, color: PAL.water });
          c.restore(); }
        E.inkText(c, 'ışınları toplar', 1150, 300, t, sc + 3.0, 1e9, { size: 44, color: '#8A4A10' });
      });
      // kalın kenarlı
      if (swap > 0) E.layer(ctx, swap, c => {
        F.drawLens(c, LD, { seed: 1041 });
        INK.label(c, 'kalın kenarlı mercek', CX, CY - 200, { size: 38, weight: 700, align: 'center' });
        rays(c, TD, E.se(t, sd + 0.8, sd + 4.0, 'sine'));
        E.inkText(c, 'ışınları dağıtır', 1000, 190, t, sd + 3.6, 1e9, { size: 44, color: '#8A4A10' });
        const kv = E.se(t, sv + 0.3, sv + 2.3);
        if (kv > 0) {
          TD.forEach((tr, i) => { if (Math.abs(HS[i]) < 1) return; const p2 = tr.pts[2]; F.dline(c, p2, F.at(p2, FD, kv), { color: PAL.ink, alpha: 0.55, w: 2, on: 10, off: 8 }); });
          if (kv >= 1) { F.glow(c, FD[0], FD[1], 50, E.se(t, sv + 2.3, sv + 2.9) * 0.7); INK.inkDot(c, FD[0], FD[1], 7);
            E.inkText(c, 'odak noktası', FD[0], FD[1] + 250, t, sv + 2.6, 1e9, { size: 42, align: 'center', color: '#8A4A10' });
            INK.leader(c, [FD[0], FD[1] + 205], [FD[0], FD[1] + 14], { color: '#8A4A10', bend: -0.1 });
            E.inkText(c, '(uzantılar kesişir)', FD[0], FD[1] + 295, t, sv + 3.0, 1e9, { size: 32, align: 'center', alpha: 0.75 }); }
        }
      });
      DAMLA.draw(ctx, { x: 1760, y: 900, s: 0.9, view: 'q3', flip: true, expr: 'curious', look: [-0.9, -0.2], blink: E.blink(t, 17), squash: E.breath(t), t, talk: E.talk(t), seed: 5,
        arms: [[-1, 0.35], [1, 2.0]] });
    }
  });
})();
