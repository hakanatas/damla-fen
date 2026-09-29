// SAHNE 4–5 — FB.8.7.2: fotosentez hızını etkileyen faktörler, ölçme yolu, hipotez, güvenlik;
// bağımsız / bağımlı / kontrol edilen değişkenler, veri kaydı (tablo), sonuç ve sınır (doyma)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const U = U7;
  const PX = 1360, BENCH = 830, PXCM = 16;           // bitkinin x'i, tezgâh, 1 cm = 16 px
  const RATE = { 10: 3.0, 20: 1.7, 40: 0.6 };          // görsel kabarcık/sn (hızlandırılmış)
  // deney düzeneği; d: lamba uzaklığı (cm), rate: kabarcık/sn, r0: kabarcık akışının başladığı an
  function setup(ctx, t, d, rate, r0, o = {}) {
    line(ctx, [120, BENCH], [1820, BENCH], { w: 4, seed: 4001 });
    // cetvel (bitkiden uzaklık)
    if (o.ruler !== false) {
      const x1 = PX, x0 = PX - 42 * PXCM, y = BENCH + 28;
      const r = [[x0 - 8, y - 12], [x1 + 8, y - 12], [x1 + 8, y + 24], [x0 - 8, y + 24]]; U.shape(ctx, r, '#E3C27A', 0.4, 4002, { w: 2 });
      for (let i = 0; i <= 42; i++) { const xx = x1 - i * PXCM; line(ctx, [xx, y - 12], [xx, y - 12 + (i % 10 === 0 ? 18 : i % 5 === 0 ? 12 : 6)], { w: 1.2, dry: false }); }
      [0, 10, 20, 30, 40].forEach(v => U.fit(ctx, String(v), x1 - v * PXCM, y + 21, 50, 19, { alpha: 0.85 }));
      INK.label(ctx, 'cm', x0 - 50, y + 20, { size: 24, alpha: 0.7 });
    }
    // lamba
    const lx = PX - d * PXCM - 86;
    const lp = [lx + 86, BENCH - 207];
    U.glow(ctx, lp, [PX, 690], 110, (o.on ?? 1) * E.clamp(14 / d), '227,160,58');
    U.lamp(ctx, lx, BENCH, 1.1, 1);
    // beher + su bitkisi
    const wy = U.beaker(ctx, 1240, 400, 240, 430, 0.92);
    U.elodea(ctx, PX, 590, 220, 1, t);
    INK.inkDot(ctx, PX - 2, 812, 5, { color: '110,106,100' });   // ataç ağırlık
    U.bubbles(ctx, PX, 586, wy + 6, t, r0, rate, { speed: 120 });
    if (o.thermo !== false) U.thermo(ctx, 1448, 800, 250, 0.45);
    return { wy };
  }
  const counter = (ctx, x, y, n, k, label = '1 dakikada') => { if (k <= 0) return; ctx.save(); ctx.globalAlpha *= k; U.card(ctx, x, y, 290, 130, 4050, { tint: PAL.water, tintA: 0.1 }); INK.label(ctx, label, x + 145, y + 42, { size: 30, align: 'center', alpha: 0.75 }); U.fit(ctx, n + ' kabarcık', x + 145, y + 102, 260, 46, { color: '#1F4A63' }); ctx.restore(); };

  E.scene({
    name: 'Hipotez', concept: 'Fotosentez hızını etkileyen faktörler; hipotez', from: 'rate', to: 'safety', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('rate'), sf = E.s('factors'), sm = E.s('measure'), sh = E.s('hypo'), ss = E.s('safety');
      // soru ve faktörler
      const kq = 1 - E.se(t, sm - 0.2, sm + 0.5);
      if (kq > 0) E.layer(ctx, kq, c => {
        P.write(c, 'Fotosentez hızı neye bağlı?', 960, 280, E.seg(t, sr + 0.3, sr + 1.8), { size: 70, align: 'center', color: U.LIFE_D });
        const F = [['ışık şiddeti', 520, 440, U.AMB], ['ışık rengi', 960, 420, U.AMB], ['karbondioksit miktarı', 1420, 440, '#6E6A64'], ['sıcaklık', 720, 580, U.HEAT], ['su', 1200, 580, PAL.water]];
        F.forEach(([txt, x, y, col], i) => U.chip(c, x, y, txt, col, E.se(t, sf + 0.4 + i * 0.9, sf + 1.0 + i * 0.9, 'out'), 44));
        U.damla(c, t, { x: 260, y: 900, s: 1.1, expr: 'thinking', look: [0.6, -0.6], arms: [[-1, 0.4], [1, [34, -96]]] });
      });
      // ölçme düzeneği
      const ks = E.se(t, sm, sm + 0.9);
      if (ks > 0) E.layer(ctx, ks, c => {
        setup(c, t, 20, RATE[20], sm + 0.6, { ruler: false });
        const kl = E.se(t, sm + 1.5, sm + 2.3);
        if (kl > 0) { c.save(); c.globalAlpha *= kl; INK.leader(c, [1520, 480], [1372, 500], { w: 2 }); c.restore(); U.rich(c, 'oksijen (O_2)', 1530, 470, kl, { size: 40, color: '#1F4A63' }); U.rich(c, 'kabarcıkları', 1530, 520, kl, { size: 40, color: '#1F4A63' }); }
        P.write(c, 'su bitkisi', 1560, 700, E.seg(t, sm + 2.2, sm + 3.0), { size: 38, color: U.LIFE_D });
        c.save(); c.globalAlpha *= E.se(t, sm + 2.2, sm + 3.0); INK.leader(c, [1552, 690], [1382, 700], { w: 2 }); c.restore();
        P.write(c, 'hız = 1 dakikadaki kabarcık sayısı', 180, 420, E.seg(t, sm + 3.0, sm + 4.6), { size: 44 });
        U.damla(c, t, { x: 560, y: 830, s: 0.85, expr: 'curious', look: [0.8, -0.2], prop: 'lens', arms: [[-1, 0.4], [1, 1.4]] });
      });
      // hipotez kartı
      const kh = E.se(t, sh, sh + 0.6, 'out');
      if (kh > 0) E.layer(ctx, kh, c => {
        U.card(c, 160, 200, 900, 150, 4060, { tint: U.AMB, tintA: 0.12 });
        P.write(c, 'Hipotez:', 200, 262, E.seg(t, sh + 0.3, sh + 1.0), { size: 46, color: '#8A5A12' });
        P.write(c, 'Işık şiddeti artarsa', 390, 262, E.seg(t, sh + 0.9, sh + 2.0), { size: 46 });
        P.write(c, 'fotosentez hızı artar.', 390, 322, E.seg(t, sh + 1.9, sh + 3.0), { size: 46 });
      });
      U.safety(ctx, t, ss, E.e('safety') + 0.3, ['Dikkat!', 'Lamba ve kablo suya değmemeli.', 'Deney bir yetişkin eşliğinde yapılır.'], { x: 380, y: 250, w: 1160 });
    }
  });

  E.scene({
    name: 'Deney', concept: 'Değişkenler, veri kaydı, sonuç', from: 'indep', to: 'limit', trFrom: [960, 540], tr: 0.9,
    draw(ctx, t) {
      const si = E.s('indep'), sd = E.s('dep'), sc = E.s('ctrl'), sda = E.s('data'), sr = E.s('result'), sl = E.s('limit');
      // lamba uzaklığı zaman çizelgesi
      let d = 20, rate = RATE[20], r0 = si;
      if (t < sda) { const u = E.se(t, si + 1.0, si + 2.6) - E.se(t, si + 3.2, si + 4.8); d = E.lerp(20, 10, E.clamp(u)) + E.lerp(0, 20, E.clamp(-u)); rate = RATE[20]; r0 = si - 1; }
      else { const seg = [10, 20, 40], T0 = sda + 0.4, L = 2.5; const i = E.clamp(Math.floor((t - T0) / L), 0, 2); const prev = i ? seg[i - 1] : 20; const mv = E.se(t, T0 + i * L, T0 + i * L + 0.6); d = E.lerp(prev, seg[i], mv); rate = mv >= 1 ? RATE[seg[i]] : 0; r0 = T0 + i * L + 0.6; }
      const kSet = 1 - E.se(t, sr - 0.3, sr + 0.4);
      if (kSet > 0) E.layer(ctx, kSet, c => {
        setup(c, t, d, rate, r0);
        U.fit(c, d.toFixed(0) + ' cm', PX - d * PXCM / 2, BENCH - 30, 140, 36, { color: '#8A5A12' });
        INK.label(c, '(hızlandırılmış)', 1500, 870, { size: 26, alpha: 0.6 });
      });
      // değişken çipleri
      const kv = E.se(t, si + 0.2, si + 0.9) * (1 - E.se(t, sc - 0.3, sc + 0.3));
      if (kv > 0) E.layer(ctx, kv, c => {
        U.chip(c, 620, 250, 'bağımsız: ışık şiddeti (lamba uzaklığı)', U.AMB, E.se(t, si + 0.3, si + 1.2), 42);
        U.chip(c, 620, 360, 'bağımlı: 1 dakikadaki kabarcık sayısı', PAL.water, E.se(t, sd + 0.2, sd + 1.1), 42);
      });
      const kcnt = E.se(t, sd + 0.6, sd + 1.2) * (1 - E.se(t, sr - 0.3, sr + 0.3));
      if (kcnt > 0) { const n = t < sda ? Math.min(17, Math.floor((t - sd - 0.6) * 4)) : [30, 17, 6][E.clamp(Math.floor((t - sda - 0.4) / 2.5), 0, 2)]; counter(ctx, 1520, 180, Math.max(0, n), kcnt, t < sda ? 'sayıyorum…' : '1 dakikada'); }
      const kc = E.se(t, sc, sc + 0.6) * (1 - E.se(t, sda - 0.3, sda + 0.3));
      if (kc > 0) E.layer(ctx, kc, c => {
        P.write(c, 'kontrol edilen değişkenler (hep aynı):', 170, 240, E.seg(t, sc + 0.2, sc + 1.4), { size: 42, color: U.LIFE_D });
        ['aynı bitki', 'su miktarı', 'sıcaklık', 'lamba', 'süre: 1 dk'].forEach((x, i) => U.chip(c, 280 + i * 250, 340, x, U.LIFE, E.se(t, sc + 1.2 + i * 0.7, sc + 1.8 + i * 0.7), 36));
      });
      // veri tablosu
      const ROWS = [['10 cm', '29', '31', '30', '30'], ['20 cm', '18', '16', '17', '17'], ['40 cm', '7', '5', '6', '6']];
      const kt = E.se(t, sda, sda + 0.6);
      const tShift = E.se(t, sr - 0.3, sr + 0.5);
      if (kt > 0) E.layer(ctx, kt, c => {
        const x = 170, y = E.lerp(190, 300, tShift), cols = [170, 105, 105, 105, 190], rh = 64;
        const W = cols.reduce((a, b) => a + b, 0);
        U.card(c, x - 20, y - 20, W + 40, rh * 4 + 40, 4070);
        const head = ['uzaklık', '1.', '2.', '3.', 'ortalama'];
        let cx = x; head.forEach((h, j) => { U.fit(c, h, cx + cols[j] / 2, y + 44, cols[j] - 10, 34, { color: j === 4 ? '#1F4A63' : PAL.ink }); if (j) line(c, [cx, y], [cx, y + rh * 4], { w: 1.6, dry: false }); cx += cols[j]; });
        line(c, [x, y + rh], [x + W, y + rh], { w: 2.4, dry: false });
        ROWS.forEach((r, i) => {
          const T0 = sda + 0.4 + i * 2.5; const k = E.se(t, T0 + 1.2, T0 + 2.2); if (k <= 0) return;
          let xx = x; r.forEach((cell, j) => { c.save(); c.globalAlpha *= E.clamp(k * 3 - j * 0.4); U.fit(c, cell, xx + cols[j] / 2, y + rh * (i + 1) + 44, cols[j] - 10, 38, { color: j === 4 ? '#1F4A63' : PAL.ink }); c.restore(); xx += cols[j]; });
          if (i) line(c, [x, y + rh * (i + 1)], [x + W, y + rh * (i + 1)], { w: 1, dry: false, alpha: 0.5 });
        });
        INK.label(c, 'örnek veriler (kabarcık / dakika)', x, y + rh * 4 + 60, { size: 30, alpha: 0.7 });
      });
      // sonuç: sütun grafiği
      const kg = E.se(t, sr, sr + 0.6) * (1 - E.se(t, sl - 0.3, sl + 0.3));
      if (kg > 0) E.layer(ctx, kg, c => {
        const X = 1060, Y = 700, H = 380;
        line(c, [X, Y], [X + 640, Y], { w: 3, dry: false }); line(c, [X, Y], [X, Y - H - 20], { w: 3, dry: false });
        INK.label(c, 'kabarcık / dk', X - 10, Y - H - 36, { size: 30, alpha: 0.8 });
        [[10, 30], [20, 17], [40, 6]].forEach(([dd, v], i) => { const k = E.se(t, sr + 0.4 + i * 0.5, sr + 1.2 + i * 0.5, 'out'); const h = v / 32 * H * k; const bx = X + 70 + i * 190;
          const bar = [[bx, Y], [bx + 110, Y], [bx + 110, Y - h], [bx, Y - h]]; if (h > 2) U.shape(c, bar, U.AMB, 0.25 + 0.5 * (v / 30), 4080 + i, { w: 2.2 });
          U.fit(c, dd + ' cm', bx + 55, Y + 42, 140, 34); if (k > 0.8) U.fit(c, String(v), bx + 55, Y - h - 14, 80, 36, { color: '#1F4A63' }); });
        INK.label(c, 'lamba uzaklığı → (ışık şiddeti azalır)', X + 320, Y + 90, { size: 30, align: 'center', alpha: 0.75 });
        U.stamp(c, 1500, 250, 'hipotez destekleniyor', E.se(t, sr + 2.6, sr + 3.3, 'out'), { size: 40 });
      });
      // sınır: ışık şiddeti–hız eğrisi (doyma)
      const kl = E.se(t, sl, sl + 0.6);
      if (kl > 0) E.layer(ctx, kl, c => {
        const X = 1060, Y = 700, W = 640, H = 380;
        line(c, [X, Y], [X + W + 20, Y], { w: 3, dry: false }); line(c, [X, Y], [X, Y - H - 20], { w: 3, dry: false });
        INK.label(c, 'fotosentez hızı', X - 10, Y - H - 36, { size: 30, alpha: 0.8 }); INK.label(c, 'ışık şiddeti →', X + W - 180, Y + 44, { size: 30, alpha: 0.8 });
        const pts = []; for (let i = 0; i <= 60; i++) { const u = i / 60; pts.push([X + u * W, Y - H * 0.85 * (1 - Math.exp(-u * 4.2))]); }
        P.drawOn(c, pts, E.se(t, sl + 0.4, sl + 2.6), { w: 4, color: U.LIFE_D });
        const kx = E.se(t, sl + 2.6, sl + 3.4);
        if (kx > 0) { c.save(); c.globalAlpha *= kx; INK.dashed(c, (() => { const q = []; for (let x = X + W * 0.55; x < X + W; x += 4) q.push([x, Y - H * 0.87]); return q; })(), { w: 2, color: '#8A5A12' }); c.restore();
          P.write(c, 'artık artmıyor', X + W * 0.72, Y - H * 0.87 - 24, kx, { size: 38, align: 'center', color: '#8A5A12' }); }
        U.rich(c, 'başka faktörler sınır olur (ör. CO_2 miktarı, sıcaklık)', 960, 850, E.seg(t, sl + 3.6, sl + 5.2), { size: 42, align: 'center' });
      });
      // Damla sonuçta
      const kd = E.se(t, sr, sr + 0.6);
      if (kd > 0) E.layer(ctx, kd, c => U.damla(c, t, { x: 1810, y: 900, s: 0.75, flip: true, expr: t < sl ? 'happy' : 'thinking', look: [-0.7, -0.4], arms: t < sl ? [[-1, 2.6], [1, 2.6]] : [[-1, 0.4], [1, [34, -96]]] }));
    }
  });
})();
