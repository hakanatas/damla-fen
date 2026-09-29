// SAHNE 2 — Güneş sistemi: Güneş + 8 gezegen, Güneş’e yakınlık sırası, Biruni (FB.6.1.1 a · D19.2)
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const F = G61;
  const SX = 110, SY = 560;
  const ORB = [300, 385, 475, 565, 800, 1040, 1290, 1530];
  const ANG = [-0.55, 0.62, -0.3, 0.45, -0.2, 0.28, -0.12, 0.1];
  const VR = [11, 19, 20, 14, 58, 46, 31, 30];   // görsel yarıçaplar (ölçekli değil)
  const RY = 0.24;
  const pos = i => [SX + Math.cos(ANG[i]) * ORB[i], SY + Math.sin(ANG[i]) * ORB[i] * RY];

  function system(ctx, t, o = {}) {
    const ss = E.s('system');
    P.sun(ctx, SX, SY, 120, t, { nrays: 22 });
    ORB.forEach((rx, i) => {
      const k = o.full ? 1 : E.se(t, ss + 0.6 + i * 0.25, ss + 1.8 + i * 0.25);
      if (k <= 0) return;
      const pts = P.arc(SX, SY, rx, -0.95, 0.95, 70, rx * RY);
      ctx.save(); ctx.globalAlpha = 0.5; dashed(ctx, P.partial(pts, k), { w: 1.6, on: 8, off: 7, seed: 60 + i }); ctx.restore();
    });
    // küçük gök cisimleri (asteroit kuşağı ipucu)
    F.belt(ctx, SX, SY, 680, 680 * RY, o.full ? 1 : E.se(t, ss + 3.5, ss + 5), { a0: -0.95, a1: 0.95, n: 110, size: 1.8 });
    ORB.forEach((rx, i) => {
      const k = o.full ? 1 : P.pop(E.seg(t, ss + 2.2 + i * 0.3, ss + 2.9 + i * 0.3));
      if (k <= 0) return; const [x, y] = pos(i);
      F.planet(ctx, i, x, y, VR[i] * k);
    });
  }
  function names(ctx, t, a = 1) {
    const so = E.s('order');
    ORB.forEach((rx, i) => {
      const at = so + 0.4 + i * 0.85, k = E.se(t, at, at + 0.5, 'out');
      if (k <= 0) return; const [x, y] = pos(i); const up = ANG[i] > 0 ? 1 : -1;   // merkezin altındakiler: etiket altta; üstündekiler: etiket üstte
      const ly = y + up * (VR[i] + (i === 5 ? 48 : 34)) + (up > 0 ? 26 : 0);
      ctx.save(); ctx.globalAlpha = k * a;
      INK.label(ctx, (i + 1) + ' ' + F.PLANETS[i].n, x, ly, { size: 34, weight: 700, align: 'center' });
      ctx.restore();
    });
    // baş harfler şeridi (tekerleme ipucu)
    const ik = E.se(t, so + 7.3, so + 8.2);
    if (ik > 0) { ctx.save(); ctx.globalAlpha = ik * a; INK.label(ctx, 'M · V · D · M · J · S · U · N', 1330, 200, { size: 54, weight: 700, align: 'center', color: '#8A4A10' }); ctx.restore();
      ctx.save(); ctx.globalAlpha = ik * a * 0.7; INK.label(ctx, 'Güneş’e yakınlık sırasının baş harfleri', 1330, 250, { size: 32, align: 'center' }); ctx.restore(); }
  }

  function biruni(ctx, t) {
    const sb = E.s('biruni');
    F.card(ctx, 330, 190, 1260, 640, { seed: 21 });
    P.write(ctx, 'Biruni (973–1048)', 960, 285, E.seg(t, sb + 0.3, sb + 1.3), { size: 60, align: 'center', color: '#8A4A10' });
    // iki mini diyagram: Dünya merkezde (✗) · Güneş merkezde (✓)
    const L = [640, 540], R = [1280, 540];
    const k1 = E.se(t, sb + 1.0, sb + 1.8), k2 = E.se(t, sb + 2.2, sb + 3.0);
    if (k1 > 0) E.layer(ctx, k1, c => {
      stroke(c, circlePts(L[0], L[1], 150, 60, 60), { w: 2, closed: true, alpha: 0.5, dry: false });
      P.earth(c, L[0], L[1], 30); P.sun(c, L[0] + 150, L[1], 22, t, { nrays: 10, glow: false, cells: false });
      INK.label(c, 'Dünya merkezde?', L[0], L[1] + 130, { size: 38, align: 'center' });
    });
    P.cross(ctx, L[0], L[1], 90, E.se(t, sb + 4.2, sb + 4.8), { w: 10, color: '#A23A2A' });
    if (k2 > 0) E.layer(ctx, k2, c => {
      stroke(c, circlePts(R[0], R[1], 110, 44, 60), { w: 2, closed: true, alpha: 0.5, dry: false });
      stroke(c, circlePts(R[0], R[1], 180, 72, 60), { w: 2, closed: true, alpha: 0.5, dry: false });
      P.sun(c, R[0], R[1], 34, t, { nrays: 12, cells: false });
      F.planet(c, 1, R[0] - 110, R[1] + 4, 12); P.earth(c, R[0] + 176, R[1] - 16, 16);
      INK.label(c, 'Güneş merkezde', R[0], R[1] + 130, { size: 38, align: 'center' });
    });
    P.check(ctx, R[0] + 190, R[1] - 110, 70, E.se(t, sb + 4.6, sb + 5.2), { w: 9, color: PAL.life });
    E.inkText(ctx, 'Dünya ve diğer gezegenler Güneş’in çevresinde dolanır.', 960, 780, t, sb + 5.2, 1e9, { size: 42, align: 'center' });
  }

  E.scene({
    name: 'Güneş sistemi', concept: 'Güneş sistemi ve yakınlık sırası', from: 'system', to: 'biruni', trFrom: [SX, SY],
    draw(ctx, t) {
      const sb = E.s('biruni');
      const dim = E.se(t, sb - 0.3, sb + 0.6);
      E.layer(ctx, 1 - dim * 0.75, c => { system(c, t); names(c, t); });
      if (dim > 0) E.layer(ctx, dim, c => biruni(c, t));
      E.inkText(ctx, '(çizim ölçekli değildir)', 1700, 890, t, E.s('system') + 3, sb, { size: 30, weight: 400, align: 'center', alpha: 0.65 });
    }
  });
  G61.sys = { SX, SY, ORB, ANG, VR, RY, pos, system };
})();
