// SAHNE 8 — Deney: sirke + karbonat, kapalı şişede kütlenin korunumu (veri topla, kaydet, yorumla)
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const U = U5;
  const BX = 560, BY = 800;   // terazi alt orta
  E.scene({
    name: 'Kütlenin korunumu', concept: 'Sirke-karbonat deneyi; veri kaydı', from: 'expq', to: 'concl', trFrom: [960, 540],
    draw(ctx, t) {
      const sq = E.s('expq'), sb = E.s('before'), sm = E.s('mix'), sa = E.s('after'), so = E.s('open'), sc = E.s('concl');
      U.bench(ctx, -40, 1960, BY, 1950);
      // düzenek
      const setK = E.se(t, sb - 0.2, sb + 0.6);
      const tilt = Math.sin(Math.PI * E.se(t, sm + 0.3, sm + 2.3)) * -0.35;
      const react = E.se(t, sm + 1.2, sm + 3.5), fade = 1 - 0.6 * E.se(t, sa, so + 3);
      const capOn = t < so + 0.8;
      const reading = t < sm ? '215,6 g' : t < so + 1.5 ? '215,6 g' : '215,1 g';
      if (setK > 0) E.layer(ctx, setK, c => {
        const top = U.scale(c, BX, BY, 420, reading);
        U.bottle(c, BX, top, 1.05, t, { level: 0.32, cap: capOn, tilt, cup: 1 - react, foam: react * fade, gas: react * (capOn ? 1 : 0.4) });
        if (!capOn) { const gk = E.se(t, so + 0.8, so + 3.0); for (let i = 0; i < 3; i++) { const u = ((t * 0.7 + i / 3) % 1); c.save(); c.globalAlpha *= gk * (1 - u); P.arrow(c, [BX - 30 + i * 30, top - 290 - u * 80], [BX - 30 + i * 30 + 10, top - 350 - u * 80], 1, { w: 3, head: 10, color: PAL.water }); c.restore(); } U.txt(c, 'gaz dışarı çıkar', BX + 90, top - 330, { size: 36, color: PAL.water, alpha: gk }); }
        U.txt(c, 'kapak', BX - 150, top - 262, { size: 30, alpha: 0.6 * (capOn ? 1 : 0) });
        U.txt(c, 'sirke', BX - 190, top - 40, { size: 32, alpha: 0.7 });
        if (react < 1) U.txt(c, 'karbonat (az)', BX + 80, top - 150, { size: 32, alpha: 0.7 * (1 - react) });
      });
      // veri tablosu
      const tk = E.se(t, sb + 1.5, sb + 2.2);
      if (tk > 0) E.layer(ctx, tk, c => {
        U.card(c, 960, 190, 850, 470, { seed: 1960 });
        U.txt(c, 'Veri tablosu', 1400, 250, { size: 46, align: 'center', color: U.AMBER });
        const rows = [['tepkimeden önce (kapalı)', '215,6 g', sb + 3.0], ['tepkimeden sonra (kapalı)', '215,6 g', sa + 1.0], ['kapak açıldıktan sonra', '215,1 g', so + 2.2]];
        rows.forEach(([a, b, at], i) => {
          const y = 340 + i * 100; line(c, [1000, y + 30], [1780, y + 28], { w: 1.6, dry: false, alpha: 0.6 });
          P.write(c, a, 1010, y, E.seg(t, at, at + 1.0), { size: 38 });
          P.write(c, b, 1770, y, E.seg(t, at + 0.6, at + 1.2), { size: 42, align: 'right', color: i === 2 ? U.HEAT : PAL.water });
        });
        const eq = E.se(t, sa + 2.0, sa + 2.8);
        if (eq > 0) P.write(c, 'önce = sonra → kütle korundu', 1400, 620, eq, { size: 40, align: 'center', color: PAL.life });
      });
      // güvenlik kartı (expq)
      U.safety(ctx, 300, 180, 1320, ['Koruyucu gözlük tak; öğretmenin eşliğinde çalış.', 'Hiçbir maddenin tadına bakma, doğrudan koklama.', 'Az karbonat kullan; kapağı öğretmen yavaşça açar.', 'Deneyden sonra masanı ve malzemeleri temizle.'], t, sq + 1.4, { step: 1.0, t1: sb + 0.2, lh: 80, size: 42 });
      // sonuç
      const ck = E.se(t, sc + 0.2, sc + 0.9);
      if (ck > 0) E.layer(ctx, ck, c => { U.card(c, 880, 680, 860, 100, { seed: 1970, tint: PAL.light, tintA: 0.16 }); U.txt(c, 'Tepkimede toplam kütle korunur.', 1310, 746, { size: 46, align: 'center' }); });
      U.damla(ctx, t, { x: 1855, y: BY, s: 0.75, view: 'q3', flip: true, expr: t > sa && t < so ? 'surprised' : (t > sc ? 'happy' : 'curious'), look: [-0.9, 0], arms: [[-1, 1.3], [1, 0.4]] });
    }
  });
})();
