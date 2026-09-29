// SAHNE 7 — Tümdengelim: kuraldan (yoğunluğu sudan küçük → yüzer, büyük → batar, eşit → askıda kalır) tahmin → deney → doğrulama;
// geçerli hipotezi yeni duruma (mum) uygulama. Kaldırma kuvvetine girilmez.
(function () {
  const { PAL } = INK;
  const F = F617;
  const X0 = 300, Y0 = 470, W = 1320, H = 380, WY = 540, BOT = Y0 + H - 4;
  // cisimler: x, tür, yoğunluk, etiket
  const OBJ = [
    { x: 480, kind: 'wood', d: 0.5, lab: 'tahta 0,5', pred: 'yüzer', a: 90 },
    { x: 800, kind: 'stone', d: 2.7, lab: 'taş 2,7', pred: 'batar' },
    { x: 1120, kind: 'iron', d: 7.9, lab: 'demir 7,9', pred: 'batar', a: 70 }
  ];
  function drawObj(ctx, o, by, tilt = 0) {
    ctx.save(); ctx.translate(o.x, by); ctx.rotate(tilt); ctx.translate(-o.x, -by);
    if (o.kind === 'stone') F.stone(ctx, o.x, by, 0.9, 7); else F.cube(ctx, o.x, by, o.a, o.kind, { seed: 700 + o.x });
    ctx.restore();
  }
  E.scene({
    name: 'Katılar suda', concept: 'Tümdengelimsel akıl yürütme', from: 'predict', to: 'new', trFrom: [960, 500],
    draw(ctx, t) {
      const sp = E.s('predict'), st = E.s('test'), sn = E.s('new');
      F.desk(ctx, 860, 7);
      // kural kartı
      const kc = E.se(t, sp + 2.4, sp + 3.2, 'out');
      if (kc > 0) E.layer(ctx, kc, c => {
        F.card(c, 230, 160, 1690, 300, { seed: 1871, fill: '#FBF3DE' });
        F.txt(c, 'su: 1 g/cm³', 290, 220, { size: 40, color: PAL.water });
        F.txt(c, 'sudan az yoğun → yüzer   ·   daha yoğun → batar   ·   eşit → askıda kalır', 960, 275, { size: 36, align: 'center' });
      });
      const front = F.tank(ctx, X0, Y0, W, H, WY, { t });
      // cisimler
      OBJ.forEach((o, i) => {
        const at = st + 3.4 + i * 0.5;
        const k = E.seg(t, at, at + (o.d < 1 ? 0.9 : 1.6));
        const hgt = o.kind === 'stone' ? 54 : o.a;
        let by;
        const start = Y0 - 20;
        if (o.d < 1) { const fl = WY + hgt * o.d; by = E.lerp(start, fl, E.ease.out(k)) + (k >= 1 ? Math.sin(t * 2 + i) * 2 : 0); }
        else by = E.lerp(start, BOT, E.ease.io(k));
        const ka = E.se(t, sp + 0.4 + i * 0.4, sp + 1.2 + i * 0.4, 'out');
        if (ka > 0) E.layer(ctx, ka, c => drawObj(c, o, by));
        P.write(ctx, o.lab, o.x + 58, 420, E.seg(t, sp + 3.6 + i * 0.6, sp + 4.4 + i * 0.6), { size: 36 });
      });
      front();
      // tahminler (tank altı, sırayla) ve doğrulama
      OBJ.forEach((o, i) => {
        P.write(ctx, 'tahmin: ' + o.pred, o.x, 895, E.seg(t, st + 0.3 + i * 0.9, st + 1.2 + i * 0.9), { size: 36, align: 'center', color: '#8A4A10' });
        P.check(ctx, o.x + 130, 872, 36, E.se(t, st + 5.8 + i * 0.3, st + 6.3 + i * 0.3), { w: 6, color: PAL.life });
      });
      // yeni durum: mum
      const km = E.se(t, sn + 0.2, sn + 1.0, 'out');
      if (km > 0) {
        const x = 1440, a = 70, dd = 0.9;
        const k = E.seg(t, sn + 4.2, sn + 5.4);
        const by = E.lerp(Y0 - 20, WY + a * dd, E.ease.out(k)) + (k >= 1 ? Math.sin(t * 2) * 1.5 : 0);
        E.layer(ctx, km, c => { F.cube(c, x, by, a, 'wax', { seed: 790 }); line2(c, x, by - a - 20, 16); });
        P.write(ctx, 'mum ≈ 0,9', x + 58, 420, E.seg(t, sn + 0.6, sn + 1.4), { size: 36 });
        P.write(ctx, 'tahmin: yüzer', x, 895, E.seg(t, sn + 2.0, sn + 3.0), { size: 36, align: 'center', color: '#8A4A10' });
        P.check(ctx, x + 130, 872, 36, E.se(t, sn + 5.6, sn + 6.1), { w: 6, color: PAL.life });
        front();
      }
      INK.label(ctx, '(çizim ölçekli değildir)', 1610, 345, { size: 26, align: 'right', alpha: 0.55 });
    }
  });
  function line2(ctx, x, y, h) { INK.line(ctx, [x + 10, y + 20], [x + 12, y + 20 - h], { w: 3, dry: false }); }
})();
