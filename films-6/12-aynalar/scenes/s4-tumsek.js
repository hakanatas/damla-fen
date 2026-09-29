// SAHNE 4 — Tümsek ayna: görüntü düz ve küçük; ışınları dağıtır (vektörle hesaplanır) → geniş görüş; kullanım alanları
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F612, V = F.V;
  const MC = [560, 460], MR = 210;
  const C = [1800, 520], R = 380, A0 = Math.PI - 0.62, A1 = Math.PI + 0.62;
  const YS = [340, 395, 450, 505, 560, 615, 670];
  const BEAM = F.beamArc(YS.map(y => [1000, y]), [1, 0], C, R, A0, A1, 'convex');

  function room(c, s) { // aynada görülen küçük oda: pencere, bitki, raf (geniş alan)
    const w = [[MC[0] - 170, MC[1] - 120], [MC[0] - 90, MC[1] - 122], [MC[0] - 88, MC[1] - 40], [MC[0] - 168, MC[1] - 38], [MC[0] - 170, MC[1] - 120]];
    P.fillPts(c, w, '#F8E6B8', 0.8); stroke(c, w, { w: 2, closed: true, seed: 1201, dry: false });
    line(c, [MC[0] + 90, MC[1] - 100], [MC[0] + 180, MC[1] - 100], { w: 2.4, seed: 1202 }); line(c, [MC[0] + 90, MC[1] - 60], [MC[0] + 180, MC[1] - 60], { w: 2.4, seed: 1203 });
    P.fillPts(c, circlePts(MC[0] - 130, MC[1] + 60, 26, 30, 20), PAL.life, 0.7);
    line(c, [MC[0] - 220, MC[1] + 110], [MC[0] + 220, MC[1] + 104], { w: 2, seed: 1204, alpha: 0.6 });
  }

  function mirror(ctx, t) {
    const sc = E.s('convex');
    const ik = E.se(t, sc + 0.6, sc + 1.6);
    F.roundMirror(ctx, MC[0], MC[1], MR, c => {
      if (ik > 0) E.layer(c, 0.8 * ik, cc => { room(cc); DAMLA.draw(cc, { x: MC[0] + 10, y: MC[1] + 110, s: 0.55, view: 'q3', flip: true, expr: 'happy', look: [-0.6, 0], blink: E.blink(t, 6), t, seed: 4, shadow: false }); });
    });
    INK.label(ctx, 'tümsek ayna', MC[0], MC[1] - MR - 40, { size: 40, weight: 700, align: 'center' });
    E.inkText(ctx, 'görüntü: düz ve küçük', MC[0], MC[1] + MR + 70, t, sc + 2.2, 1e9, { size: 40, align: 'center', color: PAL.water });
    DAMLA.draw(ctx, { x: 170, y: 890, s: 0.95, view: 'q3', expr: 'curious', look: [0.8, -0.3], blink: E.blink(t, 7), squash: E.breath(t), t, talk: E.talk(t), seed: 4 });
  }

  function rays(ctx, t) {
    const sw = E.s('wide');
    F.arcMirror(ctx, C, R, A0, A1, 'convex', { seed: 1210 });
    INK.label(ctx, 'tümsek ayna (kesit)', 1700, 820, { size: 32, align: 'center', alpha: 0.75 });
    const k1 = E.se(t, sw + 0.2, sw + 1.4), k2 = E.se(t, sw + 1.4, sw + 2.8);
    BEAM.forEach((b, i) => { F.ray(ctx, b.p, b.q, k1, { w: 2.6, head: 12, heads: [0.5], seed: 1220 + i }); F.ray(ctx, b.q, V.add(b.q, V.mul(b.r, 250)), k2, { w: 2.6, head: 12, heads: [0.6], seed: 1240 + i }); });
    E.inkText(ctx, 'ışınlar dağılır →', 1880, 220, t, sw + 2.6, 1e9, { size: 40, align: 'right', color: '#8A4A10' });
    E.inkText(ctx, 'geniş alan görünür', 1880, 272, t, sw + 3.0, 1e9, { size: 40, align: 'right', color: '#8A4A10' });
  }

  function uses(ctx, t) {
    const su = E.s('convuse');
    // kavşak aynası
    const x1 = 1150;
    line(ctx, [x1 - 260, 860], [x1 + 60, 860], { w: 3, seed: 1250 }); line(ctx, [x1 + 60, 860], [x1 + 60, 620], { w: 3, seed: 1251 });
    line(ctx, [x1 - 260, 760], [x1 - 40, 760], { w: 3, seed: 1252 }); line(ctx, [x1 - 40, 760], [x1 - 40, 620], { w: 3, seed: 1253 });
    line(ctx, [x1 + 60, 860], [x1 + 60, 380], { w: 7, seed: 1254 });
    F.roundMirror(ctx, x1 + 60, 330, 80, c => { c.save(); c.translate(x1 + 60, 350); P.fillPts(c, [[-40, -10], [30, -12], [34, 14], [-38, 16]], PAL.water, 0.7); P.fillPts(c, [[-30, 16], [-20, 16], [-20, 22], [-30, 22]], PAL.ink); P.fillPts(c, [[20, 14], [30, 14], [30, 20], [20, 20]], PAL.ink); c.restore(); line(c, [x1 - 20, 380], [x1 + 140, 376], { w: 1.6, alpha: 0.6 }); });
    INK.label(ctx, 'kavşak aynası', x1 - 120, 540, { size: 38, weight: 700, align: 'center', alpha: E.se(t, su + 0.5, su + 1.1) });
    // mağaza güvenlik aynası (tavan köşesinde)
    const x2 = 1620;
    line(ctx, [1400, 240], [1860, 240], { w: 3, seed: 1260 });
    line(ctx, [x2, 240], [x2, 280], { w: 4, seed: 1261 });
    F.roundMirror(ctx, x2, 350, 70, c => { for (let i = 0; i < 3; i++) line(c, [x2 - 50, 320 + i * 22], [x2 + 50, 318 + i * 22], { w: 2, alpha: 0.6, seed: 1262 + i }); });
    // raflar
    for (let i = 0; i < 3; i++) { const y = 620 + i * 80; line(ctx, [1480, y], [1780, y - 2], { w: 3, seed: 1270 + i }); for (let j = 0; j < 6; j++) P.fillPts(ctx, [[1500 + j * 45, y - 50], [1530 + j * 45, y - 50], [1530 + j * 45, y - 4], [1500 + j * 45, y - 4]], [PAL.light, PAL.water, PAL.life][(i + j) % 3], 0.5); }
    INK.label(ctx, 'mağaza güvenlik aynası', x2, 490, { size: 38, weight: 700, align: 'center', alpha: E.se(t, su + 2.0, su + 2.6) });
  }

  E.scene({
    name: 'Tümsek ayna', concept: 'Tümsek aynada görüntü, kullanım', from: 'convex', to: 'convuse', trFrom: [560, 460],
    draw(ctx, t) {
      const su = E.s('convuse');
      mirror(ctx, t);
      const k = E.se(t, su - 0.2, su + 0.7);
      if (k < 1) E.layer(ctx, 1 - k, c => rays(c, t));
      if (k > 0) E.layer(ctx, k, c => uses(c, t));
    }
  });
})();
