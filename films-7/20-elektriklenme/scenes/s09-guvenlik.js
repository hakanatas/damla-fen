// SAHNE 9 — Güvenlik: yalnızca balon, kumaş, kâğıt; priz ve kablolarla deney yapılmaz; Van de Graaff yalnızca öğretmen gözetiminde.
(function () {
  const { PAL, line, stroke } = INK;
  const F = F720;
  E.scene({
    name: 'Güvenlik', concept: 'Güvenli deney', from: 'safety', to: 'vdg', trFrom: [960, 540],
    draw(ctx, t) {
      const ss = E.s('safety'), sv = E.s('vdg');
      const card = [[200, 170], [1720, 160], [1730, 880], [210, 890], [200, 170]];
      ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 24; P.fillPts(ctx, card, '#FAF6EC'); ctx.restore();
      stroke(ctx, card, { w: 3.4, closed: true, color: F.RED, seed: 901 });
      line(ctx, [210, 250], [1720, 240], { w: 3, color: F.RED, dry: false });
      ctx.font = '700 50px Kalam'; ctx.fillStyle = F.RED; ctx.textAlign = 'center'; ctx.fillText('⚠  GÜVENLİK', 960, 225);
      // izin verilen malzemeler
      const k1 = E.se(t, ss + 0.6, ss + 1.4);
      ctx.save(); ctx.globalAlpha *= k1;
      F.balloon(ctx, 360, 440, 55, F.HEAT, { strLen: 60 }); F.wool(ctx, 540, 500, 150, 80); for (let i = 0; i < 6; i++) F.bit(ctx, 680 + (i % 3) * 36, 500 + Math.floor(i / 3) * 24, 1.2, i);
      F.fit(ctx, 'balon · kumaş · kâğıt', 540, 640, 520, 42);
      ctx.restore();
      P.check(ctx, 540, 720, 80, E.se(t, ss + 1.6, ss + 2.2), { w: 11, color: F.GREEN });
      // priz ve kablo
      const k2 = E.se(t, ss + 3.0, ss + 3.8);
      ctx.save(); ctx.globalAlpha *= k2;
      F.outlet(ctx, 1080, 460, 1.3);
      stroke(ctx, P.bez([1220, 520], [1300, 380], [1420, 470], 24), { w: 9, color: '#3C3B45' }); const pl = F.rr(1410, 450, 60, 40, 6, 2); F.shape(ctx, pl, '#6F6B66', 0.5, 911);
      line(ctx, [1470, 460], [1500, 460], { w: 4 }); line(ctx, [1470, 480], [1500, 480], { w: 4 });
      F.fit(ctx, 'priz · elektrik kablosu', 1260, 640, 560, 42);
      ctx.restore();
      P.cross(ctx, 1080, 460, 90, E.se(t, ss + 4.0, ss + 4.6), { w: 14, color: F.RED });
      P.cross(ctx, 1400, 460, 70, E.se(t, ss + 4.4, ss + 5.0), { w: 12, color: F.RED });
      F.wfit(ctx, 'Prizle ve kablolarla asla deney yapılmaz!', 1260, 730, E.seg(t, ss + 5.0, ss + 6.2), 40, 760, { align: 'center', color: F.RED });
      // Van de Graaff
      const k3 = E.se(t, sv + 0.2, sv + 0.9);
      if (k3 > 0) E.layer(ctx, k3, c => {
        const b = F.rr(240, 280, 1440, 590, 20, 4); P.fillPts(c, b, '#FAF6EC', 1);
        F.vdg(c, 560, 800, 1.5, t);
        F.kid(c, 820, 860, 0.85, t, 0.9, { sit: 0 });
        F.wfit(c, 'Van de Graaff jeneratörü', 1000, 420, E.seg(t, sv + 0.6, sv + 1.8), 50, 700);
        F.wfit(c, 'yalnızca öğretmen gözetiminde', 1000, 510, E.seg(t, sv + 1.6, sv + 2.8), 50, 700, { color: F.RED });
        F.wfit(c, 'Deneyleri bir yetişkin eşliğinde yap.', 1000, 610, E.seg(t, sv + 3.0, sv + 4.2), 40, 700);
        F.teacher(c, 1500, 760, 0.9);
      });
    }
  });
})();
