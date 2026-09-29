// SAHNE 6 — Merceklerin kullanım alanları: belirler → ayrıştırır → gruplandırır → etiketler (FB.7.4.3 a–ç) + TÜBİTAK UZAY (D19.4)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F713;
  const ITEMS = [
    { ic: 'magnifier', name: 'büyüteç', g: 0, slot: [300, 400] },
    { ic: 'microscope', name: 'mikroskop', g: 0, slot: [570, 400] },
    { ic: 'telescope', name: 'teleskop', sub: '(mercekli)', g: 0, slot: [840, 400] },
    { ic: 'camera', name: 'fotoğraf makinesi', g: 0, slot: [435, 650] },
    { ic: 'glassesC', name: 'gözlük', sub: '(yakını net görmek için)', g: 0, slot: [705, 650] },
    { ic: 'glassesD', name: 'gözlük', sub: '(uzağı net görmek için)', g: 1, slot: [1300, 400] },
    { ic: 'peephole', name: 'kapı dürbünü', g: 1, slot: [1300, 650] }
  ];
  const START = [[390, 400], [700, 400], [1010, 400], [1320, 400], [545, 650], [855, 650], [1165, 650]];

  function card(ctx, it, x, y, i) {
    const w = 125, h = 110;
    const b = [[x - w, y - h], [x + w, y - h - 3], [x + w + 3, y + h], [x - w + 2, y + h + 2], [x - w, y - h]];
    P.fillPts(ctx, b, '#FAF6EC'); stroke(ctx, b, { w: 2.4, closed: true, seed: 1400 + i, dry: false });
    const iy = y - 22;
    if (it.ic === 'magnifier') P.icon.magnifier(ctx, x - 10, iy - 10, 0.75);
    else if (it.ic === 'telescope') P.icon.telescope(ctx, x, iy - 4, 0.62);
    else if (it.ic === 'microscope') F.icon.microscope(ctx, x, iy - 6, 0.75);
    else if (it.ic === 'camera') F.icon.camera(ctx, x, iy, 0.75);
    else if (it.ic === 'glassesC') F.icon.glasses(ctx, x, iy - 18, 0.9, true);
    else if (it.ic === 'glassesD') F.icon.glasses(ctx, x, iy - 18, 0.9, false);
    else if (it.ic === 'peephole') F.icon.peephole(ctx, x, iy, 0.6);
    INK.label(ctx, it.name, x, y + (it.sub ? 62 : 80), { size: 30, weight: 700, align: 'center', rot: 0 });
    if (it.sub) INK.label(ctx, it.sub, x, y + 94, { size: 22, align: 'center', rot: 0, alpha: 0.8 });
  }

  E.scene({
    name: 'Kullanım alanları', concept: 'Belirle, ayrıştır, grupla, etiketle', from: 'uses', to: 'tubitak', trFrom: [960, 540],
    draw(ctx, t) {
      const su = E.s('uses'), so = E.s('sort'), g1 = E.s('group1'), g2 = E.s('group2'), sl = E.s('label'), stb = E.s('tubitak');
      // başlıklar (ayrıştır)
      const kh = E.se(t, so + 0.5, so + 1.2);
      if (kh > 0) E.layer(ctx, kh, c => {
        INK.label(c, 'ışığı toplayan mercek', 570, 245, { size: 42, weight: 700, align: 'center', color: '#8A4A10' });
        INK.label(c, 'ışığı dağıtan mercek', 1300, 245, { size: 42, weight: 700, align: 'center', color: '#8A4A10' });
        F.dline(c, [1080, 210], [1080, 860], { color: PAL.ink, alpha: 0.4, w: 2 });
      });
      ITEMS.forEach((it, i) => {
        const appear = E.se(t, su + 0.8 + i * 0.5, su + 1.4 + i * 0.5, 'out'); if (appear <= 0) return;
        const g0 = it.g === 0 ? g1 + 0.3 + [0, 1, 2, 3, 4][i] * 0.8 : g2 + 0.3 + (i - 5) * 1.6;
        const mv = E.se(t, g0, g0 + 1.0);
        const [x, y] = E.mix(START[i], it.slot, mv);
        ctx.save(); ctx.translate(x, y); const s = P.pop(appear); ctx.scale(s, s); ctx.translate(-x, -y); card(ctx, it, x, y, i); ctx.restore();
      });
      // etiketler
      const kl = E.se(t, sl + 0.4, sl + 1.1);
      if (kl > 0) E.layer(ctx, kl, c => {
        [[570, 'İnce kenarlı mercek', 560], [1300, 'Kalın kenarlı mercek', 420]].forEach(([x, txt, w], i) => {
          const tg = [[x - w / 2, 790], [x + w / 2, 786], [x + w / 2 + 4, 860], [x - w / 2 + 2, 864], [x - w / 2, 790]];
          P.fillPts(c, tg, '#F6E7B8', 0.95); stroke(c, tg, { w: 3, closed: true, color: F.AMB, seed: 1450 + i });
          P.write(c, txt, x, 842, E.seg(t, sl + 0.6 + i * 1.0, sl + 1.6 + i * 1.0), { size: 40, align: 'center' });
        });
      });
      // TÜBİTAK UZAY
      const kt = E.se(t, stb + 0.2, stb + 0.9);
      if (kt > 0) E.layer(ctx, kt, c => {
        c.fillStyle = 'rgba(241,234,219,0.75)'; c.fillRect(0, 0, E.W, E.H);
        F.card(c, 330, 220, 1260, 560, { seed: 1460 });
        const k = E.se(t, stb + 0.6, stb + 1.6);
        c.fillStyle = 'rgba(24,25,40,0.85)'; c.fillRect(380, 280, 400, 440);
        const r = INK.rng(1461); for (let i = 0; i < 40; i++) { c.fillStyle = 'rgba(251,243,218,' + (0.4 + r() * 0.5) + ')'; c.beginPath(); c.arc(390 + r() * 380, 290 + r() * 420, 1 + r() * 1.8, 0, 7); c.fill(); }
        F.icon.satellite(c, 580, 470 - 20 * k, 1.0);
        P.write(c, 'Biliyor musun?', 830, 330, E.seg(t, stb + 0.6, stb + 1.6), { size: 58, color: '#8A4A10' });
        P.write(c, 'Yerli uydularımızın mercek ve', 830, 430, E.seg(t, stb + 1.4, stb + 2.8), { size: 42 });
        P.write(c, 'prizma gibi optik parçaları', 830, 490, E.seg(t, stb + 2.6, stb + 3.8), { size: 42 });
        P.write(c, 'TÜBİTAK UZAY’da üretiliyor.', 830, 550, E.seg(t, stb + 3.6, stb + 4.8), { size: 42 });
        INK.label(c, 'Optik Sistemler Araştırma Laboratuvarı', 830, 640, { size: 30, alpha: 0.7 * E.se(t, stb + 4.6, stb + 5.4) });
      });
      DAMLA.draw(ctx, { x: 1730, y: 900, s: 0.85, view: 'q3', flip: true, expr: t > sl ? 'happy' : 'curious', look: [-0.9, -0.1], blink: E.blink(t, 37), squash: E.breath(t), t, talk: E.talk(t), seed: 5,
        arms: [[-1, 0.35], [1, t > so ? 2.0 : 0.35]] });
    }
  });
})();
