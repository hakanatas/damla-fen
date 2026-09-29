// SAHNE 3 — Atom modellerinin tarihsel gelişimi: Dalton → Thomson → Rutherford → Bohr → modern (elektron bulutu)
// Detaylara girilmeden; her model yeni kanıtla yenilenir; doğrulama; teori; çıkarım (FB.7.5.2 a, c, ç, d)
(function () {
  const { PAL, line, stroke, circlePts, rng, dashed } = INK;
  const F = F7M;
  const IDS = ['dalton', 'thomson', 'rutherford', 'bohr', 'modern'];
  const NAMES = ['Dalton', 'Thomson', 'Rutherford', 'Bohr', 'Modern model'];
  const YEARS = ['1803', '1904', '1911', '1913', 'günümüz'];
  const DESC = [
    ['içi dolu küre', 'bölünemez'],
    ['artı (+) yüklü küre', 'içinde elektronlar (−)'],
    ['küçük, artı yüklü çekirdek', 'çevresi çoğunlukla boşluk'],
    ['elektronlar belirli', 'katmanlarda dolanır'],
    ['elektron bulutu', 'elektronun yeri saptanamaz']
  ];
  const XS = [420, 750, 1080, 1410, 1740], TY = 800;

  // modeli (x,y) merkezli, R yarıçaplı çiz (kanonik R = 200)
  function model(c, i, x, y, R, t) {
    c.save(); c.translate(x, y); const s = R / 200; c.scale(s, s);
    if (i === 0) {
      F.ball(c, 0, 0, 170, '#8FA9BC');
    } else if (i === 1) {
      F.ball(c, 0, 0, 180, '#E9B9A6');
      const R0 = rng(5);
      for (let k = 0; k < 11; k++) { const a = R0() * 6.283, d = Math.sqrt(R0()) * 140; INK.label(c, '+', Math.cos(a) * d, Math.sin(a) * d + 12, { size: 40, weight: 700, align: 'center', alpha: 0.75 }); }
      const R1 = rng(9);
      for (let k = 0; k < 9; k++) { const a = k / 9 * 6.283 + R1() * 0.4, d = 50 + R1() * 95; F.electron(c, Math.cos(a) * d, Math.sin(a) * d, 17); }
    } else if (i === 2) {
      dashed(c, F.densePts(circlePts(0, 0, 185, 185, 60), 4), { w: 2.4, on: 10, off: 9, alpha: 0.6 });
      F.ball(c, 0, 0, 18, F.C.p, { sym: '+', symSize: 22 });
      const R1 = rng(13);
      for (let k = 0; k < 7; k++) { const a = k / 7 * 6.283 + R1() * 0.6 + t * 0.4, d = 110 + R1() * 60; F.electron(c, Math.cos(a) * d, Math.sin(a) * d, 15); }
    } else if (i === 3) {
      F.bohr(c, 0, 0, 6, 6, [2, 4], t, { R0: 95, dR: 75, er: 15, nr: 10, spin: 0.7 });
    } else {
      F.cloud(c, 0, 0, 200, t, { n: s > 0.5 ? 900 : 700, alpha: s > 0.5 ? 0.75 : 1 });
      F.ball(c, 0, 0, 16, F.C.p, { sym: '+', symSize: 20 });
    }
    c.restore();
  }

  E.scene({
    name: 'Atom modelleri', concept: 'Bilimsel bilgi yeni kanıtlarla değişir', from: 'dalton', to: 'change', trFrom: [420, 800],
    draw(ctx, t) {
      const sv = E.s('verify'), sth = E.s('theory'), sc = E.s('change');
      const cur = IDS.reduce((a, id, i) => t >= E.s(id) ? i : a, 0);
      // zaman çizgisi
      const lk = E.se(t, E.s('dalton') + 0.2, E.s('modern') + 1.0, 'sine');
      P.drawOn(ctx, P.bez([300, TY], [1080, TY + 6], [1850, TY], 60), E.lerp(0.12, 1, lk), { w: 3.4 });
      XS.forEach((x, i) => {
        const s0 = E.s(IDS[i]); const k = E.se(t, s0 + 0.1, s0 + 0.7, 'out'); if (k <= 0) return;
        INK.inkDot(ctx, x, TY, 7);
        model(ctx, i, x, TY - 78, 58 * P.pop(k), t);
        INK.label(ctx, NAMES[i] === 'Modern model' ? 'Modern' : NAMES[i], x, TY + 50, { size: 36, weight: 700, align: 'center', alpha: k });
        INK.label(ctx, YEARS[i], x, TY + 88, { size: 30, align: 'center', alpha: 0.7 * k });
        // yeni kanıt oku
        if (i > 0) {
          const ak = E.se(t, s0 - 0.1, s0 + 0.5); const mx = (XS[i - 1] + x) / 2;
          if (ak > 0) P.arrow(ctx, [XS[i - 1] + 70, TY - 150], [x - 70, TY - 150], ak, { w: 2.6, head: 11, bend: 26, color: F.BR });
          const bk = Math.min(E.se(t, s0, s0 + 0.5, 'out'), 1 - E.se(t, s0 + 2.8, s0 + 3.4)) || 0;
          const always = E.se(t, sc + 0.6, sc + 1.4, 'out');
          const kk = Math.max(bk, always);
          if (kk > 0) { ctx.save(); ctx.globalAlpha *= Math.min(1, kk * 1.4); ctx.translate(mx, TY - 158); ctx.scale(0.62, 0.62); F.evidence(ctx, 0, 0, 1, 'yeni kanıt'); ctx.restore(); }
        }
      });
      // büyük model + açıklama (verify'e kadar)
      const bigA = 1 - E.se(t, sv - 0.2, sv + 0.5);
      if (bigA > 0) E.layer(ctx, bigA, c => {
        const s0 = E.s(IDS[cur]); const k = E.se(t, s0 + 0.1, s0 + 0.9, 'out');
        const prevA = cur > 0 ? 1 - E.se(t, s0, s0 + 0.5) : 0;
        if (prevA > 0) E.layer(c, prevA, c2 => model(c2, cur - 1, 820, 400, 200, t));
        E.layer(c, k, c2 => model(c2, cur, 820, 400, 200, t));
        P.write(c, NAMES[cur], 1100, 300, E.seg(t, s0 + 0.3, s0 + 1.2), { size: 64, color: PAL.water });
        INK.label(c, YEARS[cur], 1100, 350, { size: 36, alpha: 0.7 * k });
        DESC[cur].forEach((d, j) => P.write(c, '• ' + d, 1100, 430 + j * 58, E.seg(t, s0 + 1.0 + j * 0.9, s0 + 2.0 + j * 0.9), { size: 42 }));
        if (cur === 2) INK.label(c, 'boşluk', 590, 240, { size: 34, align: 'center', alpha: 0.6 * k });
        if (cur === 3) INK.label(c, 'katman', 1000, 250, { size: 34, align: 'center', alpha: 0.7 * k });
      });
      // doğrulama kartı
      const vk = Math.min(E.se(t, sv, sv + 0.6, 'out'), 1 - E.se(t, sth - 0.2, sth + 0.4));
      if (vk > 0) E.layer(ctx, vk, c => {
        F.card(c, 380, 180, 1660, 560, { seed: 311 });
        P.icon.books(c, 530, 330, 0.9); P.icon.laptop(c, 530, 480, 0.75);
        P.write(c, 'Güvenilir kaynaklar: kitap, dijital kaynak, öğretmen', 680, 290, E.seg(t, sv + 0.4, sv + 1.6), { size: 40 });
        P.write(c, 'Modelleri modern atom teorisiyle karşılaştır', 680, 380, E.seg(t, sv + 1.4, sv + 2.6), { size: 40 });
        P.check(c, 720, 470, 50, E.se(t, sv + 2.6, sv + 3.1)); P.write(c, 'doğrulandı', 780, 490, E.seg(t, sv + 2.9, sv + 3.6), { size: 44, color: PAL.water });
      });
      // teori + çıkarım kartı
      const tk = E.se(t, sth, sth + 0.6, 'out');
      if (tk > 0) E.layer(ctx, tk, c => {
        F.card(c, 380, 180, 1560, 560, { seed: 312, tint: PAL.water, tintA: 0.06 });
        P.write(c, 'Teori', 440, 270, E.seg(t, sth + 0.2, sth + 0.9), { size: 62, color: PAL.water });
        P.write(c, 'doğadaki olayları açıklamaya çalışan bilimsel bilgi', 440, 345, E.seg(t, sth + 0.7, sth + 2.2), { size: 42 });
        if (t > sc) {
          P.write(c, 'Çıkarım: Atom modeli yeni kanıtlarla değişti.', 440, 440, E.seg(t, sc + 0.3, sc + 1.6), { size: 44 });
          P.write(c, 'Bilimsel bilgi değişebilir!', 440, 515, E.seg(t, sc + 1.6, sc + 2.6), { size: 56, color: F.BR });
        }
      });
      F.damla(ctx, t, { x: 170, y: 905, s: 0.85, view: 'q3', expr: t > sc + 2 ? 'happy' : 'curious', look: [0.8, -0.4], seed: 5, arms: t > sc + 2 ? [[-1, 2.6], [1, 2.6]] : [[-1, 0.35], [1, 1.2]] });
    }
  });
})();
