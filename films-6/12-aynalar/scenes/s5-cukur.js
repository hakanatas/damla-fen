// SAHNE 5 — Çukur ayna: yakında düz ve büyük, uzakta ters ve küçük (uzaklığa göre değişir);
// ışınları bir bölgede toplar (vektörle hesaplanır); kullanım alanları; güvenlik
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F612, V = F.V;
  const MC = [560, 460], MR = 210;
  const C = [1300, 520], R = 420, A0 = -0.55, A1 = 0.55;
  const YS = [380, 425, 470, 520, 570, 615, 660];
  const BEAM = F.beamArc(YS.map(y => [1000, y]), [1, 0], C, R, A0, A1, 'concave');

  function mirror(ctx, t) {
    const sc = E.s('concave'), sf = E.s('far');
    const flip = E.se(t, sf + 1.2, sf + 3.2);          // yakın → uzak
    const nearA = E.se(t, sc + 0.6, sc + 1.6) * (1 - E.se(t, sf + 1.2, sf + 2.2));
    const farA = E.se(t, sf + 2.2, sf + 3.2);
    F.roundMirror(ctx, MC[0], MC[1], MR, c => {
      // yakında: düz ve büyük
      if (nearA > 0) E.layer(c, 0.8 * nearA, cc => DAMLA.draw(cc, { x: MC[0] - 20, y: MC[1] + 330, s: 2.5, view: 'q3', flip: true, expr: 'surprised', look: [-0.5, 0], blink: E.blink(t, 6), t, seed: 4, shadow: false }));
      // uzakta: ters ve küçük
      if (farA > 0) E.layer(c, 0.8 * farA, cc => { cc.save(); cc.translate(0, 2 * MC[1]); cc.scale(1, -1); DAMLA.draw(cc, { x: MC[0] + 10, y: MC[1] + 60, s: 0.5, view: 'q3', flip: true, expr: 'happy', blink: E.blink(t, 6), t, seed: 4, shadow: false }); cc.restore(); });
    }, { frame: '#5E7F93' });
    INK.label(ctx, 'çukur ayna', MC[0], MC[1] - MR - 40, { size: 40, weight: 700, align: 'center' });
    E.inkText(ctx, 'yakında: düz ve büyük', MC[0], MC[1] + MR + 70, t, sc + 2.2, sf + 1.4, { size: 40, align: 'center', color: PAL.water });
    E.inkText(ctx, 'uzakta: ters ve küçük', MC[0], MC[1] + MR + 70, t, sf + 3.0, 1e9, { size: 40, align: 'center', color: PAL.water });
    // gerçek Damla: yakından uzağa yürür
    const x = E.lerp(330, 130, flip), s = E.lerp(1.0, 0.8, flip), walking = flip > 0 && flip < 1;
    DAMLA.draw(ctx, { x, y: 890, s, view: 'q3', expr: 'curious', look: [0.8, -0.3], blink: E.blink(t, 7), squash: E.breath(t), t, talk: E.talk(t), seed: 4, feet: walking ? E.walk(t * 7) : undefined });
    const lk = E.se(t, sf + 0.4, sf + 1.0);
    if (lk > 0) { ctx.save(); ctx.globalAlpha *= lk; INK.label(ctx, flip < 0.5 ? 'yakın' : 'uzak', x, 640 + (1 - s) * 200, { size: 32, align: 'center', weight: 700, alpha: 0.7 }); ctx.restore(); }
  }

  function rays(ctx, t) {
    const sg = E.s('gather');
    F.arcMirror(ctx, C, R, A0, A1, 'concave', { seed: 1310 });
    INK.label(ctx, 'çukur ayna (kesit)', 1650, 820, { size: 32, align: 'center', alpha: 0.75 });
    const k1 = E.se(t, sg + 0.2, sg + 1.4), k2 = E.se(t, sg + 1.4, sg + 2.8);
    BEAM.forEach((b, i) => { F.ray(ctx, b.p, b.q, k1, { w: 2.6, head: 12, heads: [0.4], seed: 1320 + i }); F.ray(ctx, b.q, V.add(b.q, V.mul(b.r, 420)), k2, { w: 2.6, head: 12, heads: [0.3], seed: 1340 + i }); });
    E.inkText(ctx, 'ışınlar bir bölgede toplanır', 1330, 250, t, sg + 2.6, 1e9, { size: 40, align: 'center', color: '#8A4A10' });
  }

  function uses(ctx, t) {
    const su = E.s('caveuse'), sd = E.s('danger');
    const k = 1 - E.se(t, sd, sd + 0.5);
    if (k > 0) E.layer(ctx, k, c => {
      // diş hekimi aynası
      line(c, [1060, 640], [1150, 420], { w: 8, seed: 1350 });
      F.roundMirror(c, 1160, 390, 40, null, { frame: '#9AA6AD' });
      INK.label(c, 'diş hekimi aynası', 1110, 720, { size: 32, weight: 700, align: 'center', alpha: E.se(t, su + 0.4, su + 1.0) });
      // makyaj aynası (büyüten)
      line(c, [1420, 560], [1420, 640], { w: 7, seed: 1351 }); P.fillPts(c, circlePts(1420, 645, 60, 12, 20), '#8A6A45', 0.8);
      F.roundMirror(c, 1420, 460, 95, cc => P.icon.eye(cc, 1420, 460, 0.7));
      INK.label(c, 'makyaj aynası', 1420, 720, { size: 32, weight: 700, align: 'center', alpha: E.se(t, su + 1.4, su + 2.0) });
      // el feneri yansıtıcısı
      F.flashlight(c, 1740, 470, 0, 0.9, 1);
      for (let i = -2; i <= 2; i++) F.ray(c, [1746, 470 + i * 12], [1860, 470 + i * 12], E.se(t, su + 2.4, su + 3.2), { w: 2.2, head: 10, heads: [0.8], seed: 1360 + i });
      INK.label(c, 'el feneri yansıtıcısı', 1690, 720, { size: 32, weight: 700, align: 'center', alpha: E.se(t, su + 2.6, su + 3.2) });
    });
    F.warn(ctx, 1000, 280, 860, 240, E.se(t, sd + 0.2, sd + 0.8, 'out'), ['Dikkat!', 'Toplanan güneş ışığı yakabilir.', 'Asla kimsenin gözüne tutma!'], { size: 42, lh: 58 });
  }

  E.scene({
    name: 'Çukur ayna', concept: 'Çukur aynada görüntü, kullanım', from: 'concave', to: 'danger', trFrom: [560, 460],
    draw(ctx, t) {
      const su = E.s('caveuse');
      mirror(ctx, t);
      const k = E.se(t, su - 0.2, su + 0.7);
      if (k < 1) E.layer(ctx, 1 - k, c => rays(c, t));
      if (k > 0) E.layer(ctx, k, c => uses(c, t));
    }
  });
})();
