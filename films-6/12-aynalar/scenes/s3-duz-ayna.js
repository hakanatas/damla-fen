// SAHNE 3 — Düz ayna: görüntü düz, aynı boy, sağ-sol yer değiştirir, aynaya eşit uzaklıkta; ambulans yazısı
// Görüntü, Damla çiziminin ayna doğrusuna (x = MX) göre tam yansıtılmasıyla (translate + scale(-1,1)) elde edilir.
(function () {
  const { PAL, line, stroke, dashed } = INK;
  const F = F612;
  const MX = 960, FLOOR = 880, S = 1.3;

  function dAt(t) { const sd = E.s('dist'); return E.lerp(380, 220, E.se(t, sd + 1.8, sd + 4.2)); }

  function mirrorScene(ctx, t) {
    const sp = E.s('plane'), sl = E.s('lr'), sd = E.s('dist');
    line(ctx, [80, FLOOR], [1840, FLOOR], { w: 3, seed: 1101 });
    // ayna (yandan): parlak yüz solda, arkası taralı
    P.fillPts(ctx, [[MX, 240], [MX + 18, 240], [MX + 18, FLOOR], [MX, FLOOR]], '#DCE6EC', 0.95);
    for (let y = 250; y < FLOOR; y += 18) line(ctx, [MX + 4, y + 14], [MX + 18, y], { w: 1.3, dry: false, seed: y });
    line(ctx, [MX, 240], [MX, FLOOR], { w: 4.4, color: '#5B6B75', seed: 1102, taper: 0.01 });
    INK.label(ctx, 'düz ayna', MX + 30, 270, { size: 36, weight: 700 });
    const d = dAt(t), moving = t > sd + 1.8 && t < sd + 4.2;
    const raise = E.se(t, sl + 0.3, sl + 1.0) * (1 - E.se(t, sd, sd + 0.6));
    const opts = { x: MX - d, y: FLOOR, s: S, view: 'q3', expr: raise > 0.5 ? 'happy' : 'curious', look: [0.8, -0.1], blink: E.blink(t, 5), squash: E.breath(t), t, seed: 3,
      arms: [[-1, E.lerp(0.35, 2.75, raise)], [1, 0.35]], feet: moving ? E.walk(t * 7) : undefined };
    // görüntü (ayna arkasında)
    E.layer(ctx, 0.55 * E.se(t, sp + 0.2, sp + 1.2), c => { c.save(); c.translate(2 * MX, 0); c.scale(-1, 1); DAMLA.draw(c, { ...opts, shadow: false }); c.restore(); });
    DAMLA.draw(ctx, { ...opts, talk: E.talk(t) });
    INK.label(ctx, 'ben', MX - d, FLOOR + 34, { size: 32, align: 'center', alpha: 0.7 });
    INK.label(ctx, 'görüntüm', MX + d, FLOOR + 34, { size: 32, align: 'center', alpha: 0.7 * E.se(t, sp + 0.6, sp + 1.2) });
    // aynı boy: tepe hizası
    const hk = E.se(t, sp + 2.0, sp + 2.8) * (1 - E.se(t, sl, sl + 0.4));
    if (hk > 0) { ctx.save(); ctx.globalAlpha *= hk; const yTop = FLOOR - 222 * S; const pts = []; for (let i = 0; i <= 40; i++) pts.push([MX - d - 90 + (2 * d + 180) * i / 40, yTop]); dashed(ctx, pts, { w: 2.4, on: 12, off: 9, color: PAL.water });
      INK.label(ctx, 'aynı boy', MX - d - 100, yTop - 14, { size: 34, weight: 700, color: PAL.water, align: 'right' }); ctx.restore(); }
    // sağ-sol
    const lk = raise;
    if (lk > 0.05) { ctx.save(); ctx.globalAlpha *= lk;
      INK.label(ctx, 'sağ elim', MX - d - 120, FLOOR - 345, { size: 36, weight: 700, align: 'right', color: '#8A4A10' });
      INK.label(ctx, 'sol eli gibi', MX + d + 120, FLOOR - 345, { size: 36, weight: 700, color: '#8A4A10' }); ctx.restore(); }
    // uzaklık okları
    const dk = E.se(t, sd + 0.6, sd + 1.4);
    if (dk > 0) { ctx.save(); ctx.globalAlpha *= dk; const y = FLOOR - 330;
      [[MX - d + 40, MX - 6], [MX + 24, MX + d - 40]].forEach(([a, b], i) => { line(ctx, [a, y], [b, y], { w: 2.6, dry: false, color: PAL.water, seed: 1110 + i }); INK.arrowHead(ctx, [a + 10, y], [a, y], 12, { w: 2.6, color: PAL.water }); INK.arrowHead(ctx, [b - 10, y], [b, y], 12, { w: 2.6, color: PAL.water }); });
      INK.label(ctx, 'aynı uzaklık', MX, y - 30, { size: 36, weight: 700, align: 'center', color: PAL.water }); ctx.restore(); }
  }

  function ambulance(ctx, t) {
    const sa = E.s('ambul');
    F.ambulance(ctx, 560, 800, 1.0, t);
    INK.label(ctx, 'ambulansın önü: ters yazı', 560, 380, { size: 38, weight: 700, align: 'center' });
    // dikiz aynası (düz ayna): içinde ambulans ayna görüntüsü → yazı düz okunur
    const k = E.se(t, sa + 2.0, sa + 3.0);
    const mx = 1360, my = 560, w = 600, h = 250;
    const fr = [[mx - w / 2, my - h / 2], [mx + w / 2, my - h / 2], [mx + w / 2, my + h / 2], [mx - w / 2, my + h / 2]];
    line(ctx, [mx, my - h / 2 - 60], [mx, my - h / 2], { w: 8, seed: 1120 });
    ctx.save(); ctx.beginPath(); ctx.roundRect(mx - w / 2, my - h / 2, w, h, 40); ctx.fillStyle = '#E3ECF0'; ctx.fill(); ctx.clip();
    if (k > 0) E.layer(ctx, k, c => { c.save(); c.translate(2 * mx, 0); c.scale(-1, 1); F.ambulance(c, mx, my + 140, 0.62, t); c.restore(); });
    ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.roundRect(mx - w / 2, my - h / 2, w, h, 40); ctx.lineWidth = 12; ctx.strokeStyle = '#3A3A40'; ctx.stroke(); ctx.restore();
    INK.label(ctx, 'öndeki aracın dikiz aynası', mx, my - h / 2 - 80, { size: 36, weight: 700, align: 'center' });
    E.inkText(ctx, 'aynada: AMBULANS (düz okunur)', mx, my + h / 2 + 70, t, sa + 3.2, 1e9, { size: 40, align: 'center', color: PAL.water });
    P.arrow(ctx, [840, 600], [mx - w / 2 - 20, 600], E.se(t, sa + 1.0, sa + 2.0), { w: 3, bend: 30, head: 14, color: F.AMB });
  }

  E.scene({
    name: 'Düz ayna', concept: 'Düz aynada görüntü', from: 'plane', to: 'ambul', trFrom: [960, 560],
    draw(ctx, t) {
      const sa = E.s('ambul');
      const k = E.se(t, sa - 0.2, sa + 0.7);
      if (k < 1) E.layer(ctx, 1 - k, c => mirrorScene(c, t));
      if (k > 0) E.layer(ctx, k, c => ambulance(c, t));
    }
  });
})();
