// SAHNE 5 — Modelleri karşılaştırma, yeni kanıt ve modeli yenileme (FB.5.5.6 b; E3.4)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F21;
  function ring(ctx, x, y, r, k, col) { if (k <= 0) return; ctx.save(); ctx.globalAlpha = 0.9; P.drawOn(ctx, INK.wobble(circlePts(x, y, r, r * 0.8, 50), 3, (x + y) | 0), k, { w: 4, color: col }); ctx.restore(); }
  E.scene({
    name: 'Modeli yenile', concept: 'Yeni kanıtla modeli yenileme', from: 'compare', to: 'test2', trFrom: [960, 540],
    draw(ctx, t) {
      const sc = E.s('compare'), se = E.s('evidence'), sr = E.s('revise'), s2 = E.s('test2');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      const tb = [[60, 800], [1860, 796], [1870, 840], [50, 844], [60, 800]]; P.fillPts(ctx, tb, '#E3D3B3'); wash(ctx, tb, '#8A6A45', 0.4, 4601); stroke(ctx, tb, { w: 3, closed: true, seed: 4602 });
      const roof = E.se(t, sr + 1.0, sr + 3.0), gaps = E.se(t, sr + 3.5, sr + 5.5), dbl = E.se(t, sr + 6.0, sr + 7.5);
      const m2 = E.clamp((t - (s2 + 0.3)) / 3.5) * 20;
      const TD = t < s2 ? 32 : F.at(F.D.full, m2);
      // Damla's model
      const dx = E.lerp(560, 640, E.se(t, sr - 0.4, sr + 0.6));
      F.model(ctx, dx, 796, 380, 330, { walls: 1, roof, gaps, dbl, T: TD, t, flow: 1 });
      const ver = t > sr + 7.5 ? 'Damla’nın modeli · v2' : 'Damla’nın modeli · v1';
      INK.label(ctx, ver, dx, 866, { size: 36, weight: 700, align: 'center' });
      // Ece's model (compare/evidence), then checklist
      const ek = E.se(t, sc + 0.6, sc + 1.4, 'out') * (1 - E.se(t, sr - 0.4, sr + 0.4));
      if (ek > 0) E.layer(ctx, ek, c => {
        F.model(c, 1300, 796, 380, 330, { walls: 1, roof: 1, gaps: 1, dbl: 1, T: 35, t, flow: 1 });
        INK.label(c, 'Ece’nin modeli', 1300, 866, { size: 36, weight: 700, align: 'center' });
        const k1 = E.se(t, se + 1.0, se + 1.8), k2 = E.se(t, se + 2.6, se + 3.4);
        ring(c, 1300, 485, 190, k1, PAL.life); ring(c, 1500, 760, 50, k2, PAL.life); ring(c, 1110, 570, 50, k2, PAL.life);
        if (k1 > 0.9) INK.label(c, 'çatı kaplı', 1580, 360, { size: 36, weight: 700, color: PAL.life, alpha: k1 });
        if (k2 > 0.9) INK.label(c, 'aralıklar kapalı', 1640, 660, { size: 36, weight: 700, color: PAL.life, alpha: k2, align: 'center' });
      });
      // hot spots on Damla's model
      const hk = E.se(t, se + 4.2, se + 5.0) * (1 - E.se(t, sr, sr + 0.5));
      if (hk > 0) { ring(ctx, dx - 60, 480, 110, hk, F.RED); ring(ctx, dx + 200, 780, 60, hk, F.RED); ring(ctx, dx - 190, 570, 55, hk, F.RED); INK.label(ctx, 'ısı buradan kaçıyor', dx, 250, { size: 36, weight: 700, color: F.RED, align: 'center', alpha: hk }); }
      // checklist (revise)
      const ck = E.se(t, sr + 0.3, sr + 1.0, 'out');
      if (ck > 0) E.layer(ctx, ck, c => {
        F.card(c, 1150, 190, 700, 520, { fill: '#F6E7B8', seed: 4610 });
        INK.label(c, 'Modelimi yeniliyorum', 1500, 260, { size: 44, weight: 700, align: 'center', color: '#8A4A10' });
        [['çatının içini kapladım', sr + 1.0], ['aralıkları bantladım', sr + 3.5], ['pencereye 2. kat ekledim', sr + 6.0]].forEach(([s, at], i) => {
          const y = 360 + i * 90, k = E.se(t, at, at + 0.8);
          stroke(c, [[1200, y - 36], [1244, y - 38], [1246, y + 4], [1202, y + 6], [1200, y - 36]], { w: 2.4, closed: true, seed: 4620 + i });
          P.check(c, 1220, y - 16, 40, E.se(t, at + 1.2, at + 1.7), { w: 5 });
          P.write(c, s, 1270, y, k, { size: 40 });
        });
        INK.label(c, '(çift pencere: iki cam arasında hava)', 1500, 650, { size: 28, align: 'center', alpha: 0.7 * E.se(t, sr + 7, sr + 7.8) });
      });
      // test2 result
      const rk = E.se(t, s2 + 3.8, s2 + 4.6);
      if (rk > 0) E.layer(ctx, rk, c => {
        c.save(); c.globalAlpha = 1; P.fillPts(c, [[1180, 740], [1840, 736], [1842, 820], [1182, 824]], '#FBF6E8', 0.95); c.restore();
        INK.label(c, 'v1: 32 °C  →  v2: 35 °C', 1510, 794, { size: 42, weight: 700, align: 'center', color: F.HEAT, rot: 0 });
      });
      if (t > s2 + 0.3 && t < s2 + 4.2) { P.icon.clock(ctx, 1000, 330, 0.55, m2 / 20 * 6.28); INK.label(ctx, Math.round(m2) + '. dk', 1000, 410, { size: 32, weight: 700, align: 'center' }); }
      DAMLA.draw(ctx, { x: 1790, y: 1070, s: 0.9, view: 'q3', flip: true, t, seed: 4, blink: E.blink(t, 5), squash: E.breath(t), talk: E.talk(t), expr: rk > 0.5 ? 'happy' : (t > se ? 'thinking' : 'surprised'), look: [-0.8, -0.6], arms: [[-1, 0.35], [1, 2.3]], shadow: false });
    }
  });
})();
