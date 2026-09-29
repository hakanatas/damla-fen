// SAHNE 4 — Sıcaklık: ne kadar sıcak/soğuk; tanecik hareketi ile ilişkisi; termometre ve °C; günlük yaşamda ölçme araçları
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F17;
  function scale(ctx, t) {
    const s0 = E.s('temp1');
    const k = E.se(t, s0 + 0.3, s0 + 1.5);
    const x0 = 300, x1 = 1620, y = 640;
    ctx.save(); const g = ctx.createLinearGradient(x0, 0, x1, 0); g.addColorStop(0, 'rgba(46,106,140,0.75)'); g.addColorStop(0.5, 'rgba(220,200,170,0.6)'); g.addColorStop(1, 'rgba(181,85,63,0.85)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.rect(x0, y - 18, (x1 - x0) * k, 36); ctx.fill(); ctx.restore();
    stroke(ctx, [[x0, y - 18], [x0 + (x1 - x0) * k, y - 18]], { w: 2.4, seed: 500 }); stroke(ctx, [[x0, y + 18], [x0 + (x1 - x0) * k, y + 18]], { w: 2.4, seed: 501 });
    INK.label(ctx, 'soğuk', x0, y + 80, { size: 48, weight: 700, color: PAL.water, alpha: k });
    INK.label(ctx, 'sıcak', x1, y + 80, { size: 48, weight: 700, align: 'right', color: F.HEAT, alpha: E.se(t, s0 + 1.2, s0 + 1.8) });
    const it = [[380, s0 + 1.6, c => { for (let i = 0; i < 3; i++) F.iceCube(c, 350 + i * 40, 560 - (i % 2) * 20, 1.2, 0, i); }], [960, s0 + 2.4, c => F.glass(c, 890, 430, 140, 170, 120, { seed: 502 })], [1540, s0 + 3.2, c => { F.cup(c, 1540, 600, 1.1); F.steam(c, 1540, 480, 1, t, { color: F.HEAT }); }]];
    it.forEach(([x, at, d]) => { const kk = E.se(t, at, at + 0.5, 'out'); if (kk > 0) { ctx.save(); ctx.translate(x, 600); ctx.scale(P.pop(kk), P.pop(kk)); ctx.translate(-x, -600); d(ctx); ctx.restore(); } });
    P.write(ctx, 'Sıcaklık: ne kadar sıcak ya da soğuk?', 960, 250, E.seg(t, s0 + 0.2, s0 + 1.6), { size: 60, align: 'center' });
  }
  function beakers(ctx, t) {
    const sp = E.s('tpart'), sth = E.s('thermo');
    const B = [{ x: 330, name: 'soğuk su', sp: 0.3, col: PAL.water, read: '10 °C', lv: 0.2, cap: 'tanecikler daha yavaş' }, { x: 1170, name: 'sıcak su', sp: 2.6, col: F.HEAT, read: '70 °C', lv: 0.72, cap: 'tanecikler daha hızlı' }];
    B.forEach((b, i) => {
      const k = E.se(t, sp + 0.2 + i * 0.6, sp + 0.9 + i * 0.6, 'out'); if (k <= 0) return;
      ctx.save(); ctx.globalAlpha = k;
      const bx = b.x, by = 380, bw = 420, bh = 360;
      F.water(ctx, bx, by, bw, bh, 250, { alpha: 0.3, seed: 510 + i, color: i ? '#8FA8B8' : PAL.water });
      F.field(ctx, 'liquid', [bx + 5, by + bh - 250, bw - 10, 245], t, { r: 17, rows: 6, speed: b.sp, seed: 12 + i });
      F.box(ctx, bx, by, bw, bh, { fill: false, seed: 512 + i });
      if (i) F.steam(ctx, bx + bw / 2, by - 10, 1, t, { color: F.HEAT });
      INK.label(ctx, b.name, bx + bw / 2, 450, { size: 52, weight: 700, align: 'center', color: b.col });
      ctx.restore();
      P.write(ctx, b.cap, bx + bw / 2, 800, E.seg(t, sp + 1.6 + i * 1.4, sp + 2.6 + i * 1.4), { size: 42, align: 'center' });
      // termometre
      const kt = E.se(t, sth + 0.2 + i * 0.5, sth + 0.9 + i * 0.5);
      if (kt > 0) { ctx.save(); ctx.globalAlpha = kt; F.thermo(ctx, bx + bw + 110, by + bh - 40, 400, E.lerp(0.05, b.lv, E.se(t, sth + 0.6 + i * 0.5, sth + 2 + i * 0.5)), { w: 20 }); INK.label(ctx, b.read, bx + bw + 150, by + 120, { size: 46, weight: 700, color: b.col, alpha: E.se(t, sth + 1.8 + i * 0.5, sth + 2.4 + i * 0.5) }); ctx.restore(); }
    });
    INK.label(ctx, '(ortalamada)', 1380, 850, { size: 32, align: 'center', alpha: 0.65 * E.se(t, sp + 4.4, sp + 5) });
    const ck = E.se(t, sth + 1.0, sth + 1.8, 'out');
    if (ck > 0) { ctx.save(); ctx.translate(960, 200); ctx.scale(P.pop(ck), P.pop(ck)); F.card(ctx, 0, 0, 860, 100, { seed: 520, fill: '#F6E7B8' }); INK.label(ctx, 'birim: derece Celsius (Selsiyus) · °C', 0, 16, { size: 46, weight: 700, align: 'center' }); ctx.restore(); }
  }
  function tools(ctx, t) {
    const st = E.s('tools');
    const C = [
      [330, 'duvar', 'termometresi', c => F.thermo(c, 330, 640, 330, 0.55, { w: 22 })],
      [750, 'dijital', 'termometre', c => F.digiThermo(c, 750, 470, 1.4, '21 °C')],
      [1170, 'ateşölçer', '', c => F.feverThermo(c, 1170, 500, 1.6)],
      [1590, 'hava durumu', 'raporu', c => F.weather(c, 1590, 490, 1.4, t)]
    ];
    C.forEach(([x, a, b, d], i) => {
      const k = E.se(t, st + 0.2 + i * 1.3, st + 0.8 + i * 1.3, 'out'); if (k <= 0) return;
      ctx.save(); ctx.translate(x, 520); ctx.scale(P.pop(k), P.pop(k)); ctx.translate(-x, -520);
      F.card(ctx, x, 520, 380, 560, { seed: 530 + i }); d(ctx);
      INK.label(ctx, a, x, 730, { size: 42, weight: 700, align: 'center' }); if (b) INK.label(ctx, b, x, 776, { size: 42, weight: 700, align: 'center' });
      ctx.restore();
    });
    P.write(ctx, 'Sıcaklığı ölçen araçlar', 960, 180, E.seg(t, st, st + 1.2), { size: 58, align: 'center' });
  }
  E.scene({
    name: 'Sıcaklık', concept: 'Sıcaklık; tanecik hareketi; termometre, °C', from: 'temp1', to: 'tools', trFrom: [960, 640],
    draw(ctx, t) {
      ctx.fillStyle = 'rgba(46,106,140,0.05)'; ctx.fillRect(0, 0, E.W, E.H);
      const aB = E.se(t, E.s('tpart') - 0.4, E.s('tpart') + 0.3), aT = E.se(t, E.s('tools') - 0.4, E.s('tools') + 0.3);
      if (aB < 1) E.layer(ctx, 1 - aB, c => scale(c, t));
      if (aB > 0 && aT < 1) E.layer(ctx, Math.min(aB, 1 - aT), c => beakers(c, t));
      if (aT > 0) E.layer(ctx, aT, c => tools(c, t));
    }
  });
})();
