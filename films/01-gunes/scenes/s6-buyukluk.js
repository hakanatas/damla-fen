// SAHNE 6 — Büyüklük ve uzaklık: 109 Dünya çapı, basketbol topu / toplu iğne başı, hacim, 150 milyon km
// (TYMM: farklı büyüklükteki cisimler kullanılarak büyüklük çıkarımı)
(function () {
  const { PAL, line, stroke, circlePts, rng, dashed, arrowHead } = INK;
  const fmt = n => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  function phaseRow(ctx, t) { // 109 Earths across the diameter
    const sh = E.s('howbig'), sc = E.s('count'), sx = E.s('x109');
    const cx = 960, cy = 590, R = 420, r = R / 109;
    P.sun(ctx, cx, cy, R, t, { nrays: 28 });
    // diameter guide
    const dk = E.se(t, sh + 2.4, sh + 3.6);
    if (dk > 0) { ctx.save(); ctx.globalAlpha = 0.8; dashed(ctx, P.partial(P.bez([cx - R, cy], [cx, cy], [cx + R, cy], 60), dk), { w: 2, on: 10, off: 8 }); ctx.restore(); }
    // earth count
    let n = 0;
    if (t > sc) { const firsts = [0.15, 0.55, 0.95]; n = firsts.filter(f => t > sc + f).length; if (t > sc + 1.3) n = 3 + Math.floor(106 * E.ease.in(E.seg(t, sc + 1.3, sc + 3.1))); }
    for (let i = 0; i < n; i++) P.earth(ctx, cx - R + (i + 0.5) * 2 * r, cy, r * 0.96);
    // counter
    if (n > 0) { ctx.save(); ctx.font = '700 120px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.lineWidth = 12; ctx.strokeStyle = 'rgba(246,217,160,0.9)'; ctx.strokeText(n, cx, cy - 70); ctx.fillText(n, cx, cy - 70); ctx.restore(); }
    // magnifier inset showing the first Earths
    const mk = E.se(t, sh + 3.2, sh + 4.0, 'out');
    if (mk > 0) {
      const mx = 330, my = 330, mr = 150 * P.pop(mk), Z = 9;
      ctx.save(); ctx.beginPath(); ctx.arc(mx, my, mr, 0, 7); ctx.clip();
      ctx.fillStyle = '#F6D9A0'; ctx.fillRect(mx - mr, my - mr, 2 * mr, 2 * mr);
      INK.wash(ctx, circlePts(mx, my, mr, mr, 40), PAL.light, 0.5, 5);
      for (let i = 0; i < Math.min(n, 4); i++) P.earth(ctx, mx - 3.5 * r * Z + (i + 0.5) * 2 * r * Z, my, r * Z * 0.96);
      if (n === 0) { ctx.save(); ctx.globalAlpha = 0.7; dashed(ctx, [[mx - mr, my], [mx + mr, my]], { w: 2, on: 10, off: 8 }); ctx.restore(); }
      ctx.restore();
      stroke(ctx, circlePts(mx, my, mr, mr, 60), { w: 6, closed: true }); line(ctx, [mx + mr * 0.7, my + mr * 0.7], [mx + mr * 1.15, my + mr * 1.15], { w: 14, taper: 0.02 });
      ctx.save(); ctx.globalAlpha = mk * 0.6; stroke(ctx, [[cx - R + 2, cy - 12], [mx + mr * 0.8, my + mr * 0.5]], { w: 1.4, dry: false }); ctx.restore();
      if (n > 0) INK.label(ctx, 'her biri bir Dünya', mx, my + mr + 60, { size: 34, weight: 700, align: 'center' });
    }
    const xk = E.se(t, sx + 0.2, sx + 1.2);
    if (xk > 0) { P.write(ctx, 'Güneş’in çapı', 1470, 260, xk, { size: 48 }); P.write(ctx, '≈ 109 Dünya', 1470, 330, E.se(t, sx + 0.8, sx + 1.8), { size: 56, color: '#B5553F' }); }
  }

  function phaseBall(ctx, t) { // basketball vs pin head
    const sb = E.s('ball');
    const bx = 640, by = 560, br = 190;
    // basketball
    const disk = circlePts(bx, by, br, br, 80); P.fillPts(ctx, disk, '#E9A94A'); INK.wash(ctx, disk, '#C8661E', 0.55, 31, { bleed: 2 });
    stroke(ctx, P.arc(bx, by, br, 0, Math.PI * 2, 60, br * 0.28).slice(0, 61), { w: 3, dry: false });
    stroke(ctx, P.bez([bx, by - br], [bx + 40, by], [bx, by + br], 30), { w: 3, dry: false });
    stroke(ctx, P.arc(bx - br * 1.2, by, br * 0.85, -0.85, 0.85, 30), { w: 3, dry: false }); stroke(ctx, P.arc(bx + br * 1.2, by, br * 0.85, Math.PI - 0.85, Math.PI + 0.85, 30), { w: 3, dry: false });
    stroke(ctx, INK.wobble(disk, 1.5, 32), { w: 4.4, closed: true });
    P.write(ctx, 'Güneş', bx, by + br + 80, E.se(t, sb + 1.0, sb + 1.8), { size: 52, align: 'center' });
    P.write(ctx, '= basketbol topu', bx, by + br + 135, E.se(t, sb + 1.6, sb + 2.6), { size: 38, weight: 400, align: 'center' });
    // Damla holding a pin
    const dx = 1320, dy = 930; let pin = null;
    DAMLA.draw(ctx, { x: dx, y: dy, s: 1.6, view: 'q3', flip: true, expr: t > sb + 4 ? 'surprised' : 'curious', look: [-0.6, -0.5], blink: E.blink(t, 8), squash: E.breath(t), t, talk: E.talk(t), seed: 3,
      arms: [[-1, 0.4], [1, 2.55]], hold: (c, res) => { const h = res[1].hand; line(c, [h[0], h[1] + 10], [h[0], h[1] - 34], { w: 1.6, dry: false }); pin = [h[0], h[1] - 36]; c.fillStyle = PAL.water; c.beginPath(); c.arc(h[0], h[1] - 36, 1.6, 0, 7); c.fill(); } });
    const pk = E.se(t, sb + 3.6, sb + 4.4, 'out');
    // pin head world position (Damla drawn flipped, scale 1.6) — recompute: hand of side 1 mirrored
    const pinW = [dx - (DAMLA.edgeX(-116) * 0.93 + Math.sin(2.55) * 46) * 1.6, dy + (-116 + Math.cos(2.55) * 46 - 36) * 1.6];
    if (pk > 0) {
      const mx = 1330, my = 300, mr = 130 * P.pop(pk);
      ctx.save(); ctx.beginPath(); ctx.arc(mx, my, mr, 0, 7); ctx.clip(); ctx.fillStyle = PAL.white; ctx.fillRect(mx - mr, my - mr, 2 * mr, 2 * mr);
      line(ctx, [mx, my + 18], [mx, my + mr], { w: 6, dry: false }); P.earth(ctx, mx, my, 22); ctx.restore();
      stroke(ctx, circlePts(mx, my, mr, mr, 60), { w: 6, closed: true });
      ctx.save(); ctx.globalAlpha = pk * 0.6; stroke(ctx, [[pinW[0], pinW[1] - 4], [mx - mr * 0.5, my + mr * 0.85]], { w: 1.4, dry: false }); ctx.restore();
      P.write(ctx, 'Dünya', mx + mr + 30, my - 10, E.se(t, sb + 4.4, sb + 5.1), { size: 52 });
      P.write(ctx, '= toplu iğne başı', mx + mr + 30, my + 45, E.se(t, sb + 5.0, sb + 6.0), { size: 38, weight: 400 });
    }
  }

  function phaseVolume(ctx, t) {
    const sv = E.s('volume'); const cx = 960, cy = 560, R = 400;
    P.sun(ctx, cx, cy, R, t, { nrays: 28, cells: false });
    const k = E.ease.io(E.seg(t, sv + 0.6, sv + 4.4)); const N = 1400, rr = rng(77);
    ctx.save(); ctx.fillStyle = '#4F7F9E';
    for (let i = 0; i < N * k; i++) { const a = rr() * 6.283, d = Math.sqrt(rr()) * R * 0.96; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 2.6, 0, 7); ctx.fill(); }
    ctx.restore();
    if (k > 0) {
      ctx.save(); ctx.font = '700 100px Kalam'; ctx.textAlign = 'center'; ctx.lineWidth = 14; ctx.strokeStyle = 'rgba(250,240,215,0.95)'; const txt = '≈ ' + fmt(1300000 * k);
      ctx.strokeText(txt, cx, cy + 30); ctx.fillStyle = PAL.ink; ctx.fillText(txt, cx, cy + 30); ctx.restore();
      E.inkText(ctx, 'Dünya sığar', cx, cy + 110, t, sv + 1.2, 1e9, { size: 58, align: 'center' });
      E.inkText(ctx, '(noktalar temsilîdir)', 1650, 900, t, sv + 2, 1e9, { size: 28, weight: 400, align: 'center', alpha: 0.7 });
    }
  }

  function phaseFar(ctx, t) {
    const sf = E.s('far');
    const sunX = 250, y = 520;
    P.sun(ctx, sunX, y, 95, t, { nrays: 20, cells: false });
    P.earth(ctx, 1640, y, 30);
    DAMLA.draw(ctx, { x: 1640, y: y - 28, s: 0.45, view: 'q3', flip: true, expr: 'curious', look: [-0.8, -0.3], blink: E.blink(t, 9), t, seed: 4, shadow: false, arms: [[-1, 0.3], [1, 2.4]] });
    const k = E.se(t, sf + 3.6, sf + 5.2);
    if (k > 0) {
      const pts = P.bez([sunX + 150, y], [960, y - 30], [1590, y], 60); ctx.save(); dashed(ctx, P.partial(pts, k), { w: 3, on: 16, off: 10 }); ctx.restore();
      if (k > 0.98) { arrowHead(ctx, pts[56], pts[60], 16, { w: 3 }); arrowHead(ctx, pts[4], pts[0], 16, { w: 3 }); }
      P.write(ctx, '≈ 150 milyon km', 960, y - 70, E.se(t, sf + 5.0, sf + 6.0), { size: 70, align: 'center' });
    }
    E.inkText(ctx, 'Güneş', sunX, y + 190, t, sf + 0.5, 1e9, { size: 40, align: 'center' }); E.inkText(ctx, 'Dünya', 1640, y + 90, t, sf + 0.5, 1e9, { size: 40, align: 'center' });
    E.inkText(ctx, 'uzaktaki cisimler küçük görünür', 960, 760, t, sf + 1.8, 1e9, { size: 46, align: 'center', weight: 400 });
    E.inkText(ctx, '(çizim ölçekli değildir)', 960, 820, t, sf + 5.5, 1e9, { size: 30, align: 'center', weight: 400, alpha: 0.65 });
  }

  E.scene({
    name: 'Büyüklük', concept: 'Büyüklük ve uzaklık karşılaştırması', from: 'howbig', to: 'far', trFrom: [960, 590],
    draw(ctx, t) {
      const aB = E.se(t, E.s('ball') - 0.4, E.s('ball') + 0.5), aC = E.se(t, E.s('volume') - 0.4, E.s('volume') + 0.4), aD = E.se(t, E.s('far') - 0.4, E.s('far') + 0.5);
      if (aB < 1) E.layer(ctx, 1 - aB, c => phaseRow(c, t));
      if (aB > 0 && aC < 1) E.layer(ctx, Math.min(aB, 1 - aC), c => phaseBall(c, t));
      if (aC > 0 && aD < 1) E.layer(ctx, Math.min(aC, 1 - aD), c => phaseVolume(c, t));
      if (aD > 0) E.layer(ctx, aD, c => phaseFar(c, t));
    }
  });
})();
