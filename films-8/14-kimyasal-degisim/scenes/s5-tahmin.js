// SAHNE 6 — Gözlenmemiş durumlar için tahmin (ç) ve tahminleri ölçüte göre sorgulama (d): yağmur oluşumu, hamurun mayalanması
(function () {
  const { PAL, stroke, line, circlePts, rng, wobble } = INK;
  const U = U5;
  function cloud(ctx, x, y, s) {
    const pts = []; for (let i = 0; i <= 60; i++) { const a = i / 60 * 6.283; const b = 1 + 0.12 * Math.abs(Math.sin(a * 4)); pts.push([x + Math.cos(a) * 150 * s * b, y + Math.sin(a) * 60 * s * b]); }
    P.fillPts(ctx, pts, '#E8EDF0'); INK.wash(ctx, pts, '#8FA9B8', 0.3, 1801, { bleed: 2, blooms: 1 }); stroke(ctx, pts, { w: 2.6, closed: true, seed: 1802 });
  }
  E.scene({
    name: 'Tahmin', concept: 'Yağmur ve mayalanma: ölçüte göre sorgulama', from: 'rain', to: 'criteria', trFrom: [960, 450],
    draw(ctx, t) {
      const sr = E.s('rain'), sd = E.s('dough'), sc = E.s('criteria');
      // yağmur paneli
      U.card(ctx, 120, 170, 800, 470, { seed: 1810 });
      U.txt(ctx, 'yağmur oluşumu', 520, 230, { size: 44, align: 'center' });
      cloud(ctx, 520, 350, 1.2);
      const r = rng(1811);
      for (let i = 0; i < 14; i++) { const x = 360 + r() * 320, u = ((t * 0.9 + r()) % 1); const y = 420 + u * 170; ctx.save(); ctx.globalAlpha *= 0.85; P.fillPts(ctx, circlePts(x, y, 6, 10, 12), PAL.water); ctx.restore(); }
      for (let i = 0; i < 5; i++) { const x = 250 + i * 18, y = 590 - ((t * 40 + i * 30) % 160); U.ball(ctx, x, y, 4, '#BFD4DF'); }
      P.write(ctx, 'su buharı → su damlası', 520, 620, E.seg(t, sr + 2.0, sr + 3.4), { size: 36, align: 'center', color: PAL.water });
      // hamur paneli
      const dk = E.se(t, sd - 0.2, sd + 0.5);
      if (dk > 0) E.layer(ctx, dk, c => {
        U.card(c, 1000, 170, 800, 470, { seed: 1812 });
        U.txt(c, 'hamurun mayalanması', 1400, 230, { size: 44, align: 'center' });
        const rise = E.se(t, sd + 0.3, sd + 5);
        const bowl = P.arc(1400, 470, 200, 0, Math.PI, 30, 110); P.fillPts(c, bowl, '#D9CDB4'); stroke(c, bowl, { w: 3, seed: 1813 }); line(c, [1190, 470], [1610, 468], { w: 3, dry: false });
        const dough = []; for (let i = 0; i <= 30; i++) { const a = Math.PI + i / 30 * Math.PI; dough.push([1400 + Math.cos(a) * 170, 470 + Math.sin(a) * (40 + 90 * rise)]); }
        P.fillPts(c, dough, '#F1DDB0'); stroke(c, dough, { w: 2.6, seed: 1814 });
        const rr = rng(1815); for (let i = 0; i < 14 * rise; i++) { const a = Math.PI + 0.2 + rr() * (Math.PI - 0.4), d = rr() * 0.8; stroke(c, circlePts(1400 + Math.cos(a) * 150 * d, 470 + Math.sin(a) * (30 + 80 * rise) * d, 6, 6, 12), { w: 1.4, closed: true, dry: false }); }
        U.steam(c, 1400, 470 - 50 - 90 * rise, 200, 70, rise, t, 1816, '#9C8A5A');
        P.write(c, 'kabarma · gaz · koku', 1400, 620, E.seg(t, sd + 2.0, sd + 3.4), { size: 36, align: 'center', color: U.HEAT });
      });
      // ölçüt tablosu
      const ck = E.se(t, sc + 0.2, sc + 0.8);
      if (ck > 0) E.layer(ctx, ck, c => {
        U.card(c, 120, 680, 1680, 215, { seed: 1820, tint: PAL.light, tintA: 0.12 });
        U.txt(c, 'ölçüt:', 160, 750, { size: 40, color: U.AMBER });
        U.txt(c, 'yeni madde oluştu mu?', 300, 750, { size: 40 });
        U.txt(c, 'kimyasal bağlar değişti mi?', 300, 815, { size: 40 });
        const k1 = E.se(t, sc + 2.0, sc + 2.6), k2 = E.se(t, sc + 3.2, sc + 3.8);
        P.cross(c, 830, 735, 16, k1, { w: 4 }); P.cross(c, 830, 800, 16, k1, { w: 4 });
        P.write(c, '→ yağmur: fiziksel', 870, 790, k1, { size: 40, color: PAL.water });
        P.check(c, 1230, 732, 38, k2, { w: 5, color: PAL.life }); P.check(c, 1230, 797, 38, k2, { w: 5, color: PAL.life });
        P.write(c, '→ hamur: kimyasal', 1280, 790, k2, { size: 40, color: U.HEAT });
        U.txt(c, '(tanecikleri göremesek de olay ipucu verir)', 960, 875, { size: 30, align: 'center', alpha: 0.7 * E.se(t, sc + 4.0, sc + 4.6) });
      });
    }
  });
})();
