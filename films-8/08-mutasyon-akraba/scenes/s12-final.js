// SAHNE 12 — Kaydet (FB.8.3.7 ç), Sıra sende (afiş performans görevi), Sıradaki: Canlıların Çevreye Uyumu, bitiş kartı
(function () {
  const { PAL, stroke, line, wash, circlePts, wobble } = INK;
  const F = F808;
  const ITEMS = [
    'Akrabalar aynı çekinik aleli taşıma olasılığı daha yüksek kişilerdir.',
    ['Aa × Aa: her çocuk için aa olasılığı 1/4 (her çocukta görülmez).', F.AMB],
    'Akraba olmayanlarda da daha düşük olasılıkla görülebilir.',
    'Mutasyon: DNA’da kalıcı değişiklik · radyasyon, UV, kimyasallar',
    ['Üreme hücresindeki mutasyon kalıtsaldır.', F.AMB],
    'Etkisi zararlı, fark edilmez ya da yararlı olabilir.'
  ];
  E.scene({
    name: 'Kaydet', concept: 'Bilgileri kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      F.notebookPage(ctx, t, E.s('record'), 'Gözlem Defteri · Akraba Evliliği ve Mutasyon', ITEMS, { col: F.AMB, gap: 1.05, dy: 86, maxW: 1150 });
      F.damla(ctx, t, { x: 1660, y: 900, s: 0.95, flip: true, expr: 'neutral', look: [-0.7, 0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
  const cactus = (c, x, y, s) => {
    c.save(); c.translate(x, y); c.scale(s, s);
    const body = [[-26, 0], [-28, -170], [-14, -196], [14, -196], [28, -170], [26, 0]];
    F.shape(c, body, PAL.life, 0.6, 4700);
    F.shape(c, [[26, -80], [70, -84], [72, -140], [54, -146], [52, -104], [26, -104]], PAL.life, 0.6, 4701);
    F.shape(c, [[-26, -60], [-64, -64], [-66, -118], [-50, -122], [-48, -84], [-26, -84]], PAL.life, 0.6, 4702);
    for (let i = 0; i < 10; i++) { const yy = -20 - i * 17; line(c, [-26, yy], [-34, yy - 4], { w: 1.4, dry: false }); line(c, [26, yy], [34, yy - 4], { w: 1.4, dry: false }); }
    c.restore();
  };
  E.scene({
    name: 'Sıra sende', concept: 'Performans görevi; sıradaki film', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sk = E.s('task'), sn = E.s('next'), se = E.s('end');
      F.warmBg(ctx);
      // sıradaki: çöl manzarası
      const nk = E.se(t, sn, sn + 1.0);
      if (nk > 0) E.layer(ctx, nk, c => {
        const g = c.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(227,160,58,0.25)'); g.addColorStop(1, 'rgba(227,160,58,0.05)'); c.fillStyle = g; c.fillRect(0, 0, E.W, E.H);
        P.sun(c, 1680, 200, 70, t, { nrays: 16, cells: false });
        const dune = []; for (let i = 0; i <= 60; i++) { const x = -20 + i / 60 * 1960; dune.push([x, 800 - Math.sin(i / 60 * 5 + 1) * 40]); }
        const df = dune.concat([[1960, 1100], [-20, 1100]]); P.fillPts(c, df, PAL.paper); wash(c, df, '#E3C98A', 0.5, 4710, { bleed: 3 }); stroke(c, dune, { w: 3.4, seed: 4711 });
        cactus(c, 1450, 790, 1.3); cactus(c, 1700, 800, 0.8);
      });
      const wave = t > sn;
      F.damla(ctx, t, { x: wave ? 560 : 1775, y: wave ? 860 : 900, s: wave ? 1.3 : 0.85, expr: 'happy', view: wave ? 'front' : 'q3', flip: !wave, look: wave ? [0.6, -0.5] : [-0.7, -0.3], arms: wave ? F.wave(t) : [[-1, 1.1], [1, 1.4]], prop: wave ? null : 'notebook' });
      const ck = Math.min(E.se(t, sk, sk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
      F.taskCard(ctx, t, sk, ck, ['Bir araç seç: güvenilir genel ağ adresi, kitap, uzman.', 'Mutasyon hakkında bilgi topla ve doğrula.', 'Nedenlerini, etkilerini, korunma yollarını yaz.', 'Bir afiş hazırla ve sınıfta sun.'], {
        col: F.GREEN, maxW: 1150
      });
      if (wave) {
        E.inkText(ctx, 'Sıradaki gözlem:', 1150, 250, t, sn + 0.5, se + 0.4, { size: 46, align: 'center', weight: 400 });
        E.inkText(ctx, '9 · Canlıların Çevreye Uyumu', 1150, 340, t, sn + 1.0, se + 0.4, { size: 66, align: 'center', color: '#8A5A20' });
      }
      F.endCard(ctx, t, '8 · Akraba Evliliği ve Mutasyon', 'FB.8.3.6 · FB.8.3.7', F.AMB);
    }
  });
})();
