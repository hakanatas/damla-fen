// SAHNE 4 — Gruplandır (c) ve etiketle (ç): yenilenebilir / yenilenemeyen kaynak kullanan santraller
(function () {
  const { PAL, stroke, dashed } = INK;
  const W = W6;
  const S = ST22;
  const GREY = '#6B6460';
  // hedefler: sol grup 3+2, sağ grup 2
  const TGT = { hes: [300, 420], jeo: [610, 420], ruzgar: [920, 420], dalga: [455, 650], gunes: [765, 650], termik: [1490, 420], nukleer: [1490, 650] };
  function box(ctx, x0, y0, x1, y1, col, k) {
    if (k <= 0) return; ctx.save(); ctx.globalAlpha *= k;
    P.fillPts(ctx, W.rect(x0, y0, x1, y1), col, 0.06);
    const pts = []; const c = [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
    for (let s = 0; s < 4; s++) for (let i = 0; i < 60; i++) pts.push([c[s][0] + (c[s + 1][0] - c[s][0]) * i / 60, c[s][1] + (c[s + 1][1] - c[s][1]) * i / 60]);
    dashed(ctx, pts, { w: 2.4, color: col, on: 12, off: 9 }); ctx.restore();
  }
  E.scene({
    name: 'Gruplandır', concept: 'Yenilenebilir ve yenilenemeyen', from: 'group', to: 'nonrenew', trFrom: [960, 540],
    draw(ctx, t) {
      const sg = E.s('group'), sr = E.s('renew'), sn = E.s('nonrenew');
      box(ctx, 120, 300, 1100, 790, W.MOVE, E.se(t, sg + 0.2, sg + 0.8));
      box(ctx, 1290, 300, 1690, 790, GREY, E.se(t, sg + 0.2, sg + 0.8));
      // başlık etiketleri
      const hk1 = E.se(t, sr + 0.2, sr + 0.8, 'out'), hk2 = E.se(t, sn + 0.2, sn + 0.8, 'out');
      if (hk1 > 0) { W.card(ctx, 360, 222, 500, 64, { seed: 6400, tint: W.MOVE, tintA: 0.3 }); W.txt(ctx, 'YENİLENEBİLİR', 610, 268, { size: 44, align: 'center', color: W.MOVE }); }
      if (hk2 > 0) { W.card(ctx, 1250, 222, 480, 64, { seed: 6401, tint: GREY, tintA: 0.3 }); W.txt(ctx, 'YENİLENEMEYEN', 1490, 268, { size: 44, align: 'center', color: GREY }); }
      P.write(ctx, 'güneş · rüzgâr · akarsu · dalga · yer altı ısısı', 610, 860, E.seg(t, sr + 3.0, sr + 5.0), { size: 36, align: 'center', color: W.MOVE });
      P.write(ctx, 'kömür · doğal gaz · uranyum', 1490, 860, E.seg(t, sn + 2.0, sn + 3.6), { size: 36, align: 'center', color: GREY });
      // kartlar: sıra hâlinde gelir, sonra gruplarına taşınır
      S.KEYS.forEach((k, i) => {
        const pk = E.se(t, sg - 0.3 + i * 0.12, sg + 0.2 + i * 0.12, 'out'); if (pk <= 0) return;
        const x0 = 180 + i * 260, y0 = 560;
        const mv = E.se(t, sg + 1.2 + i * 0.35, sg + 2.4 + i * 0.35);
        const [x1, y1] = TGT[k];
        const x = E.lerp(x0, x1, mv), y = E.lerp(y0, y1, mv) - Math.sin(mv * Math.PI) * 80, sc = E.lerp(0.8, 1, mv) * P.pop(pk);
        const renew = k !== 'termik' && k !== 'nukleer';
        const hl = renew ? (t > sr + 0.5 ? W.MOVE : null) : (t > sn + 0.5 ? GREY : null);
        ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
        W.card(ctx, -140, -100, 280, 200, { seed: 6410 + i, color: hl ?? PAL.ink, w: hl ? 3.4 : 2.4, tint: hl, tintA: 0.12 });
        S.draw(ctx, k, -125, -88, 0.25, t);
        W.txt(ctx, S.NAMES[k], 0, 88, { size: W.fit(ctx, S.NAMES[k], 250, 34), align: 'center' });
        ctx.restore();
      });
      W.damla(ctx, t, { x: 1845, y: 905, s: 0.62, flip: true, expr: 'happy', look: [-0.8, -0.3], arms: [[-1, 2.2], [1, 0.4]], seed: 6 });
    }
  });
})();
