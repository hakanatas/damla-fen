// SAHNE 7 — Günlük yaşamda iletken ve yalıtkanlar (köprü kurma: kablo, priz, anahtar; iş güvenliği) + sanal deney (OB1, OB2, KB2.6)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const RED = CK.RED;
  // kesit görünümlü kablo: plastik kılıf açılmış, bakır teller görünüyor
  function cable(ctx, x0, x1, y, k) {
    const xe = E.lerp(x0, x1, k);
    const sheath = [[x0, y - 36], [xe - 120, y - 36], [xe - 110, y + 36], [x0, y + 36], [x0, y - 36]];
    P.fillPts(ctx, sheath, '#E8E2D2'); wash(ctx, sheath, PAL.water, 0.55, 401, { bleed: 1, blooms: 0 }); stroke(ctx, sheath, { w: 3, closed: true, seed: 402 });
    stroke(ctx, P.arc(xe - 115, y, 12, -Math.PI / 2, Math.PI / 2, 12, 36), { w: 2.4, dry: false });
    for (let i = 0; i < 7; i++) { const yy = y - 18 + i * 6; line(ctx, [xe - 120, yy], [xe - 4 + (i % 2) * 6, yy + (i - 3) * 1.5], { w: 4, color: COPPER_(), dry: false, seed: 410 + i, taper: 0.05 }); }
  }
  const COPPER_ = () => CK.COPPER;
  function switchPlate(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const pl = CK.rect(-60, -60, 120, 120); P.fillPts(ctx, pl, PAL.white); stroke(ctx, pl, { w: 3, closed: true, seed: 420 });
    const r = CK.rect(-24, -36, 48, 72); P.fillPts(ctx, r, '#EDE6D6'); stroke(ctx, r, { w: 2.6, closed: true, seed: 421 }); line(ctx, [-24, 0], [24, 0], { w: 2, dry: false, alpha: 0.6 });
    ctx.restore();
  }
  function glove(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const g = [[-40, 80], [-44, 0], [-60, -30], [-50, -40], [-34, -16], [-34, -80], [-22, -84], [-16, -40], [-12, -92], [0, -94], [4, -40], [10, -86], [22, -84], [22, -36], [30, -74], [42, -70], [38, 0], [40, 80], [-40, 80]];
    P.fillPts(ctx, g, '#E3A03A', 0.75); stroke(ctx, g, { w: 3, closed: true, seed: 430 });
    line(ctx, [-40, 56], [40, 56], { w: 2.4, dry: false });
    ctx.restore();
  }
  function boot(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-40, -90], [20, -90], [20, 20], [70, 40], [74, 70], [-40, 70], [-40, -90]];
    P.fillPts(ctx, b, '#3F3B45', 0.8); stroke(ctx, b, { w: 3, closed: true, seed: 440 });
    line(ctx, [-40, 56], [74, 56], { w: 2.4, color: PAL.white, alpha: 0.5, dry: false });
    ctx.restore();
  }
  function screwdriver(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(-0.6); ctx.scale(s, s);
    const h = densify([[-100, -18], [-10, -18], [-4, -10], [-4, 10], [-10, 18], [-100, 18], [-100, -18]]);
    P.fillPts(ctx, h, RED, 0.7); stroke(ctx, h, { w: 3, closed: true, seed: 450 });
    const sh = CK.rect(-4, -5, 90, 10); P.fillPts(ctx, sh, '#B8B2A6'); stroke(ctx, sh, { w: 2.2, closed: true, dry: false });
    ctx.restore();
  }
  const densify = CK.densify;
  E.scene({
    name: 'Günlük yaşam', concept: 'İletken ve yalıtkanların kullanımı', from: 'daily', to: 'digital', trFrom: [960, 540],
    draw(ctx, t) {
      const sd = E.s('daily'), sw = E.s('workers'), sg = E.s('digital');
      ctx.save();
      ctx.fillStyle = 'rgba(46,106,140,0.07)'; ctx.fillRect(0, 0, E.W, E.H);
      // kablo
      const kc = E.se(t, sd + 0.2, sd + 1.4);
      if (kc > 0) cable(ctx, 200, 1050, 330, kc);
      const kl1 = E.se(t, sd + 1.6, sd + 2.2), kl2 = E.se(t, sd + 3.0, sd + 3.6);
      if (kl1 > 0) { INK.leader(ctx, [1010, 230], [1010, 318], { color: PAL.ink }); ctx.save(); ctx.globalAlpha = kl1; INK.label(ctx, 'bakır tel → iletken', 1010, 210, { size: 38, weight: 700, color: '#8A4A10', align: 'center' }); ctx.restore(); }
      if (kl2 > 0) { INK.leader(ctx, [560, 450], [560, 362]); ctx.save(); ctx.globalAlpha = kl2; INK.label(ctx, 'plastik kılıf → yalıtkan', 560, 490, { size: 38, weight: 700, color: PAL.water, align: 'center' }); ctx.restore(); }
      // priz + anahtar
      const kp = E.se(t, sd + 4.4, sd + 5.0, 'out');
      if (kp > 0) {
        E.layer(ctx, kp, c => { CK.outlet(c, 1350, 330, 1.0); switchPlate(c, 1600, 330, 1.0); });
        P.write(ctx, 'dış kısmı plastik', 1475, 470, E.seg(t, sd + 5.0, sd + 6.2), { size: 38, align: 'center', color: PAL.water });
      }
      // iş güvenliği
      const items = [[glove, 420, 'yalıtkan eldiven'], [boot, 800, 'yalıtkan bot'], [screwdriver, 1180, 'plastik saplı alet']];
      items.forEach(([fn, x, name], i) => {
        const at = sw + 0.5 + i * 1.2, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        ctx.save(); ctx.translate(x, 700); ctx.scale(P.pop(k), P.pop(k)); fn(ctx, 0, 0, 0.95); ctx.restore();
        INK.label(ctx, name, x, 850, { size: 36, weight: 700, align: 'center', alpha: k });
      });
      // sanal deney
      const kd = E.se(t, sg + 0.3, sg + 1.0, 'out');
      if (kd > 0) {
        ctx.save(); ctx.translate(1570, 690); ctx.scale(P.pop(kd), P.pop(kd)); P.icon.laptop(ctx, 0, 0, 1.3); ctx.restore();
        P.write(ctx, 'sanal deney (güvenilir site)', 1570, 850, E.seg(t, sg + 0.8, sg + 2.0), { size: 34, align: 'center' });
        P.check(ctx, 1690, 600, 44, E.se(t, sg + 2.6, sg + 3.2), { w: 7, color: PAL.life });
      }
      ctx.restore();
    }
  });
})();
