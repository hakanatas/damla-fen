// SAHNE 4 — Atomun yapısı: çekirdek (proton +, nötron yüksüz), elektron (−) katmanlarda; yük/kütle karşılaştırması;
// kütlenin neredeyse tamamı çekirdekte; kimlik = proton sayısı (FB.7.5.1 a, b)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F7M;
  E.scene({
    name: 'Atomun yapısı', concept: 'Proton, nötron, elektron', from: 'parts', to: 'identity', trFrom: [620, 520],
    draw(ctx, t) {
      const sp = E.s('parts'), sn = E.s('nucleus'), se = E.s('electron'), sm = E.s('mass'), si = E.s('identity');
      const bigA = 1 - E.se(t, si - 0.2, si + 0.5);
      if (bigA > 0) E.layer(ctx, bigA, c => {
        const ax = 560, ay = 500;
        const kN = E.se(t, sp + 0.2, sp + 1.0, 'out');
        F.bohr(c, ax, ay, 6, 6, [2, 4], t, { R0: 130, dR: 95, er: 17, nr: 15, spin: 0.6, seed: 8,
          kE: (k, i) => E.se(t, sp + 1.0 + (k * 2 + i) * 0.15, sp + 1.4 + (k * 2 + i) * 0.15) });
        INK.label(c, '(karbon atomu · çizim ölçekli değildir)', ax, 860, { size: 30, align: 'center', alpha: 0.65 * kN });
        // etiketler
        const l1 = E.se(t, sp + 1.6, sp + 2.4);
        if (l1 > 0) { c.save(); c.globalAlpha *= l1; INK.leader(c, [ax - 250, 250], [ax - 30, ay - 30], { w: 2 }); c.restore(); P.write(c, 'çekirdek', ax - 400, 240, l1, { size: 48 }); }
        const l2 = E.se(t, sp + 2.6, sp + 3.4);
        if (l2 > 0) { const a = t * 0.6 / 1.5 + 0.4 + 0 * 6.283; const ex = ax + Math.cos(a) * 225, ey = ay + Math.sin(a) * 225; c.save(); c.globalAlpha *= l2; INK.leader(c, [ax + 260, 205], [ex, ey], { w: 2, bend: 0.1 }); c.restore(); P.write(c, 'elektron', ax + 200, 195, l2, { size: 48, color: PAL.water }); }
        // çekim okları (zıt yükler)
        const ak = E.se(t, se + 2.5, se + 3.2);
        if (ak > 0) [0.9, 2.6, 4.3].forEach((a, i) => { const r1 = 205, r2 = 80; P.arrow(c, [ax + Math.cos(a) * r1, ay + Math.sin(a) * r1], [ax + Math.cos(a) * r2, ay + Math.sin(a) * r2], ak, { w: 2.4, head: 11, color: F.BR }); });
        if (ak > 0) INK.label(c, 'zıt yükler çeker', ax, 790, { size: 38, weight: 700, align: 'center', color: F.BR, alpha: ak });
        // sağ: açıklama listesi → tablo
        const listA = 1 - E.se(t, sm - 0.2, sm + 0.4);
        if (listA > 0) E.layer(c, listA, c2 => {
          const rows = [
            [sn + 0.3, F.proton, 'proton', '+ yüklü · çekirdekte'],
            [sn + 2.2, F.neutron, 'nötron', 'yüksüz · çekirdekte'],
            [se + 0.3, F.electron, 'elektron', '− yüklü · katmanlarda']
          ];
          rows.forEach(([at, fn, nm, d], i) => {
            const k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return; const y = 330 + i * 150;
            fn(c2, 1000, y - 16, 30 * P.pop(k));
            P.write(c2, nm, 1060, y, E.seg(t, at + 0.2, at + 1.0), { size: 52, color: i === 2 ? PAL.water : PAL.ink });
            P.write(c2, d, 1060, y + 56, E.seg(t, at + 0.8, at + 1.8), { size: 40, weight: 400 });
          });
        });
        const tk = E.se(t, sm, sm + 0.5, 'out');
        if (tk > 0) E.layer(c, tk, c2 => {
          F.card(c2, 950, 210, 1840, 700, { seed: 411 });
          const rows = [['parçacık', 'yük', 'kütle'], ['proton', '+', '≈ 1'], ['nötron', 'yüksüz', '≈ 1'], ['elektron', '−', '≈ 1/1836']];
          F.table(c2, 990, 240, [260, 220, 330], rows, 72, i => E.seg(t, sm + 0.3 + i * 0.6, sm + 1.2 + i * 0.6), { size: 42, cellColor: (i, j) => (i === 3 ? PAL.water : null) });
          INK.label(c2, '(proton kütlesi 1 kabul edilirse)', 1000, 570, { size: 30, alpha: 0.65 * E.se(t, sm + 2.4, sm + 3) });
          P.write(c2, 'Kütlenin neredeyse tamamı çekirdekte!', 1000, 650, E.seg(t, sm + 4.2, sm + 5.6), { size: 44, color: F.BR });
        });
        // kütle vurgusu: çekirdek halkası
        const hk = E.se(t, sm + 4.2, sm + 5);
        if (hk > 0) { c.save(); c.globalAlpha *= hk; stroke(c, circlePts(ax, ay, 62, 62, 40), { w: 5, closed: true, color: F.BR, seed: 421 }); c.restore(); }
      });
      // kimlik: H, C, O
      const ik = E.se(t, si + 0.2, si + 0.9, 'out');
      if (ik > 0) E.layer(ctx, ik, c => {
        const A = [['hidrojen', 1, 0, [1], 420], ['karbon', 6, 6, [2, 4], 960], ['oksijen', 8, 8, [2, 6], 1500]];
        A.forEach(([nm, p, n, sh, x], i) => {
          const at = si + 0.4 + i * 1.3; const k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          E.layer(c, k, c2 => F.bohr(c2, x, 470, p, n, sh, t, { R0: 95, dR: 70, er: 13, nr: 12, spin: 0.6, seed: 30 + i }));
          P.write(c, nm, x, 740, E.seg(t, at + 0.3, at + 1.1), { size: 50, align: 'center' });
          P.write(c, p + ' proton', x, 800, E.seg(t, at + 0.7, at + 1.5), { size: 46, align: 'center', color: F.BR });
        });
        P.write(c, 'Proton sayısı farklı → farklı atom', 960, 885, E.seg(t, si + 4.6, si + 6.0), { size: 40, align: 'center', color: PAL.water });
      });
    }
  });
})();
