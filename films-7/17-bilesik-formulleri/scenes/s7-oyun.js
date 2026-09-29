// SAHNE 7 — Kart eşleştirme: model ↔ formül ↔ isim (OB2, OB4; b: uyumlu bir bütün oluşturur)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const K = K7;
  const YS = [330, 545, 760];
  const MODELS = ['H2O', 'NH3', 'CO2'];           // sol sütun sırası
  const FORMS = ['CO2', 'H2O', 'NH3'];            // orta sütun (karışık)
  const NAMES = ['amonyak', 'karbondioksit', 'su']; // sağ sütun (karışık)
  const NAME_OF = { H2O: 'su', NH3: 'amonyak', CO2: 'karbondioksit' };
  E.scene({
    name: 'Kart eşleştirme', concept: 'Model, formül ve isim bir bütündür', from: 'match', to: 'whole', trFrom: [960, 540],
    draw(ctx, t) {
      const sm = E.s('match'), sw = E.s('whole');
      const X = [380, 960, 1540];
      ['Model', 'Formül', 'İsim'].forEach((h, i) => E.inkText(ctx, h, X[i], 205, t, sm + 0.3 + i * 0.3, 1e9, { size: 46, align: 'center', alpha: 0.7 }));
      for (let i = 0; i < 3; i++) {
        const k = E.se(t, sm + 0.6 + i * 0.3, sm + 1.2 + i * 0.3, 'out'); if (k <= 0) continue;
        E.layer(ctx, k, c => {
          K.card(c, X[0] - 170, YS[i] - 85, 340, 170, { seed: 3600 + i }); K.mol(c, MODELS[i], X[0], YS[i] - 5, MODELS[i] === 'CO2' ? 36 : 44, 1, { seed: 40 + i });
          K.card(c, X[1] - 130, YS[i] - 85, 260, 170, { seed: 3610 + i }); K.formula(c, FORMS[i], X[1], YS[i] + 30, 92, { align: 'center', subColor: K.SUB });
          K.card(c, X[2] - 180, YS[i] - 85, 360, 170, { seed: 3620 + i }); INK.label(c, NAMES[i], X[2], YS[i] + 16, { size: 50, weight: 700, align: 'center' });
        });
      }
      // eşleştirme çizgileri
      MODELS.forEach((m, i) => {
        const at = sm + 2.4 + i * 2.2;
        const fi = FORMS.indexOf(m), ni = NAMES.indexOf(NAME_OF[m]);
        P.drawOn(ctx, P.bez([X[0] + 172, YS[i]], [(X[0] + X[1]) / 2, (YS[i] + YS[fi]) / 2 - 30], [X[1] - 132, YS[fi]], 30), E.se(t, at, at + 0.7), { w: 4, color: PAL.light });
        P.drawOn(ctx, P.bez([X[1] + 132, YS[fi]], [(X[1] + X[2]) / 2, (YS[fi] + YS[ni]) / 2 - 30], [X[2] - 182, YS[ni]], 30), E.se(t, at + 0.7, at + 1.4), { w: 4, color: PAL.light });
        P.check(ctx, X[2] + 205, YS[ni] - 10, 44, E.se(t, at + 1.4, at + 1.8), { w: 6 });
      });
      // bütün vurgusu
      const wk = E.se(t, sw + 0.4, sw + 1.2);
      if (wk > 0) {
        const fr = [[170, 240], [1790, 232], [1800, 862], [176, 870], [170, 240]];
        stroke(ctx, fr, { w: 4, closed: true, color: PAL.light, alpha: wk, seed: 3640 });
        E.inkText(ctx, 'çeşit + sayı  ↔  formül  ↔  isim : uyumlu bir bütün', 1250, 128, t, sw + 0.8, 1e9, { size: 44, align: 'center', color: K.AMBER });
      }
    }
  });
})();
