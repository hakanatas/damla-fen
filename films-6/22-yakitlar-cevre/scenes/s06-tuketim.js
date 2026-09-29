// SAHNE 6 — Bilinçli tüketim: yakıt kullanımının ekonomik yönü ve tasarruf (OB3)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F622;
  function houseX(c, x, y, t, insulated, k) { // kesit ev: ısı kaçışı
    const b = [[x - 200, y], [x - 200, y - 260], [x + 200, y - 260], [x + 200, y], [x - 200, y]];
    const roof = [[x - 230, y - 258], [x, y - 400], [x + 230, y - 258], [x - 230, y - 258]];
    F.shape(c, b, '#F6EBD6', 0.5, insulated ? 701 : 705); F.shape(c, roof, '#B5553F', 0.5, insulated ? 702 : 706);
    if (insulated) { // yalıtım katmanı
      c.save(); c.globalAlpha *= k; const ins = [[x - 214, y], [x - 214, y - 272], [x + 214, y - 272], [x + 214, y]]; stroke(c, ins, { w: 12, color: '#E2B737', dry: false, taper: 0 }); INK.hatch(c, x - 214, y - 130, 428, 20, { n: 14, ang: 1.2, w: 1.4, alpha: 0.5, seed: 703 }); c.restore();
    }
    F.thermo(c, x, y - 120, 0.9, 0.6);
    const n = insulated ? 1 : 5;
    for (let i = 0; i < n; i++) { const a = [[x - 200, y - 200], [x + 200, y - 160], [x - 60, y - 260], [x + 200, y - 60], [x - 200, y - 80]][i]; const dir = a[0] < x ? -1 : 1; const up = a[1] <= y - 260; const kk = ((t * 0.6 + i / n) % 1); c.save(); c.globalAlpha *= Math.sin(kk * Math.PI) * k; P.arrow(c, a, [a[0] + (up ? 0 : dir * (40 + kk * 50)), a[1] - (up ? 40 + kk * 50 : 0)], 1, { w: 4, color: '#C8553D', head: 12 }); c.restore(); }
  }
  E.scene({
    name: 'Bilinçli tüketim', concept: 'Yakıt tasarrufu: bütçe ve çevre', from: 'economy', to: 'economy', trFrom: [960, 540],
    draw(ctx, t) {
      const se = E.s('economy');
      ctx.fillStyle = 'rgba(227,160,58,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
      const k1 = E.se(t, se + 0.3, se + 1.0, 'out'), k2 = E.se(t, se + 4.0, se + 4.8, 'out');
      if (k1 > 0) E.layer(ctx, k1, c => { houseX(c, 900, 760, t, false, 1); F.fit(c, 'yalıtımsız: ısı kaçar', 900, 830, 440, 40, { color: '#C8553D' }); F.fit(c, 'daha çok yakıt · daha çok fatura', 900, 880, 480, 34, { weight: 400 }); });
      if (k2 > 0) E.layer(ctx, k2, c => { houseX(c, 1530, 760, t, true, k2); F.fit(c, 'yalıtımlı: ısı içeride kalır', 1530, 830, 480, 40, { color: F.GREEN }); F.fit(c, 'daha az yakıt · daha temiz hava', 1530, 880, 480, 34, { weight: 400 }); });
      const tk = E.se(t, se + 6.0, se + 6.8, 'out');
      if (tk > 0) { ctx.save(); ctx.globalAlpha = tk; F.card(ctx, 1000, 170, 820, 110, 720, { tint: PAL.light, tintA: 0.2, blur: 8 }); F.fit(ctx, 'Odaları gereğinden fazla ısıtma!', 1410, 240, 760, 46, { color: F.HEAT }); ctx.restore(); }
      F.damla(ctx, t, { x: 330, y: 890, expr: 'happy', view: 'q3', arms: [[-1, 0.4], [1, 2.1]], look: [0.8, -0.3] });
    }
  });
})();
