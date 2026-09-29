// SAHNE 2 — Suyun katı ve sıvı hâllerinin nitelikleri (FB.6.5.5 a)
(function () {
  const { PAL, stroke } = INK;
  const F = F618;
  E.scene({
    name: 'Suyun iki hâli', concept: 'Sıvı su ve buz', from: 'states', to: 'states', trFrom: [960, 540],
    draw(ctx, t) {
      const s0 = E.s('states');
      F.desk(ctx, 860, 2);
      // sol: sıvı su iki farklı kapta
      const kL = E.se(t, s0 + 1.8, s0 + 3.0);
      P.write(ctx, 'sıvı su', 460, 250, E.seg(t, s0 + 1.2, s0 + 2.0), { size: 56, align: 'center', color: PAL.water });
      F.beaker(ctx, 230, 520, 170, 300, { layers: [{ h: 150 * kL, color: PAL.water }], seed: 1 });
      // geniş kase
      const bowl = P.arc(620, 700, 130, 0, Math.PI, 30, 120);
      P.fillPts(ctx, bowl, PAL.white, 0.5);
      if (kL > 0) { const wl = P.arc(620, 700, 124, 0.25 + (1 - kL) * 1.0, Math.PI - 0.25 - (1 - kL) * 1.0, 24, 114); INK.wash(ctx, wl.concat([wl[0]]), PAL.water, 0.42, 2011, { bleed: 1, blooms: 0 }); }
      stroke(ctx, bowl, { w: 3.2, seed: 2012 });
      P.write(ctx, 'akar, kabın şeklini alır', 460, 360, E.seg(t, s0 + 3.2, s0 + 4.6), { size: 42, align: 'center' });
      // sağ: buz
      const kR = E.se(t, s0 + 5.4, s0 + 6.2, 'out');
      P.write(ctx, 'buz (katı su)', 1460, 250, E.seg(t, s0 + 5.2, s0 + 6.0), { size: 56, align: 'center', color: '#3E6E88' });
      if (kR > 0) E.layer(ctx, kR, c => { F.ice(c, 1330, 780, 150, { seed: 2013 }); F.ice(c, 1580, 780, 110, { seed: 2016 }); });
      P.write(ctx, 'belirli bir şekli var, akmaz', 1460, 360, E.seg(t, s0 + 7.0, s0 + 8.4), { size: 42, align: 'center' });
      // orta: Damla hâl değiştirir
      const iceK = t > s0 + 5.4 ? 'ice' : 'liquid';
      F.damla(ctx, t, { x: 960, y: 862, s: 1.15, view: 'front', state: iceK, expr: 'curious', look: [t > s0 + 5 ? 0.8 : -0.8, 0], seed: 1 });
    }
  });
})();
