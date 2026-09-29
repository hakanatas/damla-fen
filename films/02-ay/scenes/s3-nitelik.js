// SAHNE 3 — Ay'ın nitelikleri (FB.5.1.2 a: nitelikleri tanımlar)
// doğal uydu · kendi ışığı yok (yansıtır) · yüzey · hava yok · sıcaklık farkı · kutuplarda buz
(function () {
  const { PAL, line, stroke, circlePts, dashed, arrowHead, wash, leader } = INK;
  const HOT = '#B5553F';
  function thermo(ctx, x, y, h, level, col) {
    const tube = [[x - 14, y - h], [x + 14, y - h], [x + 14, y], [x - 14, y], [x - 14, y - h]];
    P.fillPts(ctx, tube, PAL.white); stroke(ctx, tube, { w: 2.6, closed: true });
    P.fillPts(ctx, [[x - 6, y - h * level], [x + 6, y - h * level], [x + 6, y + 4], [x - 6, y + 4]], col, 0.9);
    P.fillPts(ctx, circlePts(x, y + 22, 26, 26, 24), col, 0.9); stroke(ctx, circlePts(x, y + 22, 26, 26, 24), { w: 2.6, closed: true });
    for (let i = 1; i < 6; i++) line(ctx, [x + 14, y - h * i / 6], [x + 26, y - h * i / 6], { w: 1.6, dry: false });
  }
  function phaseA(ctx, t) {
    const s1 = E.s('moon-sat'), s2 = E.s('nolight');
    const ex = 1400, ey = 580, R = 280;
    ctx.save(); ctx.fillStyle = 'rgba(30,38,72,0.10)'; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
    // Güneş (solda, kısmen kadraj dışında)
    const ks = E.se(t, s2 + 0.3, s2 + 1.3);
    if (ks > 0) { ctx.save(); ctx.globalAlpha = ks; P.sun(ctx, -60, 600, 230, t, { nrays: 20, cells: false }); ctx.restore(); INK.label(ctx, 'Güneş', 60, 900 - 20, { size: 40, weight: 700, alpha: ks }); }
    ctx.save(); ctx.globalAlpha = 0.7; dashed(ctx, circlePts(ex, ey, R, R, 120), { w: 2.4, on: 12, off: 9 }); ctx.restore();
    F02.orbitArrow(ctx, ex, ey, R + 30, R + 30, 0.6, -0.4, { w: 3.4, head: 14 });
    P.earth(ctx, ex, ey, 95);
    INK.label(ctx, 'Dünya', ex, ey + 150, { size: 40, weight: 700, align: 'center' });
    // Ay yörüngede: moon-sat boyunca dolanır, nolight'ta en üstte durur
    const a = E.lerp(0.9, -Math.PI / 2, E.se(t, s1, s2 + 0.4, 'io')) - (t < s1 ? 0 : 0);
    const mx = ex + Math.cos(a) * R, my = ey + Math.sin(a) * R;
    if (ks > 0.3) F02.halfLit(ctx, mx, my, 56, Math.PI, { alpha: 0.72 * E.se(t, s2 + 1.0, s2 + 1.8) }); else P.moon(ctx, mx, my, 56);
    INK.label(ctx, 'Ay', mx + 72, my - 34, { size: 40, weight: 700 });
    P.write(ctx, 'Dünya’nın doğal uydusu', 900, 180 + 0, E.seg(t, s1 + 1.2, s1 + 2.6) * (1 - E.se(t, s2, s2 + 0.5)), { size: 46 });
    // ışık yolu
    const kr = E.se(t, s2 + 1.4, s2 + 3.0), kf = E.se(t, s2 + 3.0, s2 + 4.4);
    for (let i = -1; i <= 1; i++) {
      const y = my + i * 26;
      const aa = Math.atan2(my - 600, mx + 60) + i * 0.06; if (kr > 0) P.arrow(ctx, [-60 + Math.cos(aa) * 300, 600 + Math.sin(aa) * 300], [mx - 64, y], kr, { w: 3.4, color: '#C07F1E', bend: 0, head: 14 });
    }
    for (let i = -1; i <= 1; i += 2) if (kf > 0) P.arrow(ctx, [mx - 20 + i * 8, my + 64], [ex - 30 + i * 30, ey - 104], kf, { w: 3.4, color: '#C07F1E', bend: 0, head: 14 });
    if (kr > 0.8) P.write(ctx, 'Güneş ışığı', 560, my - 40, E.seg(t, s2 + 2.4, s2 + 3.2), { size: 40, color: '#8A4A10' });
    if (kf > 0.8) P.write(ctx, 'yansıyan ışık', ex - 330, ey - 170, E.seg(t, s2 + 4.2, s2 + 5.0), { size: 38, color: '#8A4A10' });
    if (t > s2 + 5) P.write(ctx, 'Ay’ın kendi ışığı yoktur.', 560, 780, E.seg(t, s2 + 5.0, s2 + 6.4), { size: 48 });
  }
  function phaseB(ctx, t) {
    const su = E.s('surface'), sa = E.s('air'), st = E.s('temp'), sw = E.s('water');
    const mx = 560, my = 520, R = 320;
    F02.bigMoon(ctx, mx, my, R, t);
    const vis = (a, b) => Math.min(E.se(t, a, a + 0.7), 1 - E.se(t, b - 0.3, b + 0.3));
    // Yüzey
    const k1 = vis(su + 0.3, sa);
    if (k1 > 0) E.layer(ctx, k1, c => {
      const L = [['kraterler', 300, [mx + 150, my - 190]], ['koyu düzlükler', 440, [mx + 110, my - 20]], ['dağlar', 580, [mx + 240, my + 130]], ['kayalık ve tozlu yüzey', 720, [mx + 180, my + 230]]];
      L.forEach(([s, y, p], i) => {
        const k = E.se(t, su + 0.6 + i * 1.1, su + 1.3 + i * 1.1); if (k <= 0) return;
        c.save(); c.globalAlpha = k; leader(c, [1040, y - 14], p, { w: 2, bend: 0.12, seed: 20 + i }); c.restore();
        P.write(c, s, 1060, y, k, { size: 48 });
      });
      // küçük dağ silueti işareti
      const mp = [mx + 200, my + 150]; stroke(c, [[mp[0] - 30, mp[1]], [mp[0] - 10, mp[1] - 28], [mp[0] + 4, mp[1] - 10], [mp[0] + 20, mp[1] - 34], [mp[0] + 40, mp[1]]], { w: 2.6, dry: false });
    });
    // Hava yok: Ay'dan gökyüzü
    const k2 = vis(sa + 0.3, st);
    if (k2 > 0) E.layer(ctx, k2, c => {
      const x = 1000, y = 200, w = 820, h = 470;
      F02.card(c, x - 20, y - 20, w + 40, h + 150, { seed: 41 });
      c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip();
      c.fillStyle = '#16161C'; c.fillRect(x, y, w, h);
      P.sun(c, x + 150, y + 110, 42, t, { nrays: 12, glow: false, cells: false });
      P.earth(c, x + w - 150, y + 120, 44);
      const gr = [[x, y + h * 0.66]]; for (let i = 1; i <= 20; i++) gr.push([x + w * i / 20, y + h * 0.66 + Math.sin(i * 1.7) * 10 - (i > 8 && i < 13 ? 26 : 0)]); const gp = gr.concat([[x + w, y + h], [x, y + h]]);
      P.fillPts(c, gp, '#B9B2A6', 1); wash(c, gp, '#6F6A63', 0.4, 42, { bleed: 1, blooms: 1 }); stroke(c, gr, { w: 2.4 });
      DAMLA.draw(c, { x: x + 420, y: y + h * 0.66 + 70, s: 0.55, view: 'q3', expr: 'surprised', look: [0.6, -0.6], blink: E.blink(t, 5), t, seed: 2, arms: [[-1, 0.5], [1, 2.3]] });
      c.restore();
      stroke(c, [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]], { w: 3, closed: true });
      P.write(c, 'Gündüz bile gökyüzü kara', x + w / 2, y + h + 60, E.seg(t, sa + 1.6, sa + 2.8), { size: 44, align: 'center' });
      P.write(c, 'çünkü nefes alacak hava yok', x + w / 2, y + h + 108, E.seg(t, sa + 3.0, sa + 4.2), { size: 36, weight: 400, align: 'center' });
    });
    // Sıcaklık
    const k3 = vis(st + 0.3, sw);
    if (k3 > 0) E.layer(ctx, k3, c => {
      F02.card(c, 980, 200, 860, 620, { seed: 43 });
      thermo(c, 1130, 620, 300, 0.92, HOT); thermo(c, 1530, 620, 300, 0.12, PAL.water);
      P.sun(c, 1250, 340, 34, t, { nrays: 10, glow: false, cells: false }); P.moon(c, 1650, 340, 30);
      INK.label(c, 'gündüz', 1180, 430, { size: 36, weight: 700 }); INK.label(c, 'gece', 1580, 430, { size: 36, weight: 700 });
      P.write(c, '100 °C’nin üzeri', 1060, 740, E.seg(t, st + 0.9, st + 2.0), { size: 40, color: HOT });
      P.write(c, '−150 °C’nin altı', 1460, 740, E.seg(t, st + 3.4, st + 4.5), { size: 40, color: PAL.water });
    });
    // Buz
    const k4 = E.se(t, sw + 0.3, sw + 1.0);
    if (k4 > 0) E.layer(ctx, k4, c => {
      const px = mx - 20, py = my + R - 40;
      const ice = circlePts(px, py, 60, 18, 24); P.fillPts(c, ice, '#CFE3EE', 1); wash(c, ice, PAL.water, 0.55, 51, { bleed: 1, blooms: 0 });
      stroke(c, INK.wobble(circlePts(px, py, 110, 60, 40), 3, 52), { w: 4, closed: true, color: PAL.water });
      F02.card(c, 1000, 420, 820, 300, { seed: 53 });
      P.write(c, 'Kutuplardaki gölgeli', 1050, 520, E.seg(t, sw + 0.8, sw + 2.0), { size: 46 });
      P.write(c, 'kraterlerde: buz', 1050, 590, E.seg(t, sw + 1.8, sw + 3.0), { size: 46, color: PAL.water });
      INK.label(c, 'hiç Güneş ışığı almayan yerler', 1050, 660, { size: 32, alpha: 0.7 * E.se(t, sw + 3, sw + 3.8) });
      c.save(); c.globalAlpha = E.se(t, sw + 1, sw + 1.8); leader(c, [1000, 600], [px + 110, py - 10], { w: 2.2, bend: 0.2 }); c.restore();
      INK.label(c, 'güney kutbu', px - 300, py + 40, { size: 30, alpha: 0.8 });
    });
  }
  E.scene({
    name: 'Nitelikler', concept: 'Ay\'ın nitelikleri: uydu, ışık, yüzey, hava, sıcaklık, buz', from: 'moon-sat', to: 'water', trFrom: [1400, 580],
    draw(ctx, t) {
      const x = E.se(t, E.s('surface') - 0.5, E.s('surface') + 0.4);
      if (x < 1) E.layer(ctx, 1 - x, c => phaseA(c, t));
      if (x > 0) E.layer(ctx, x, c => phaseB(c, t));
    }
  });
})();
