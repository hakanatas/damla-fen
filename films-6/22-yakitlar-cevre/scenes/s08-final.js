// SAHNE 8 — Kaydet, Sıra sende (sosyal sorumluluk projesi, 5 Haziran), 6. sınıfa veda + sıradaki (7. sınıf · Uzay Çağı), bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F622;
  const ITEMS = [
    ['Katı: odun, kömür · Sıvı: fuel-oil · Gaz: doğal gaz, tüp gaz', PAL.ink],
    ['Yanan yakıt havayı kirletir; kirli hava sağlığımızı etkiler.', PAL.ink],
    ['Karbon monoksit renksiz, kokusuz ve zehirlidir!', '#A23A2A'],
    ['Az tüket, güvenli kullan, evini yalıt.', PAL.ink],
    ['Sorunu yapılandır → özetle → tahmin et → değerlendir.', PAL.ink]
  ];
  // P.write'ı genişliğe sığdır
  function wfit(c, txt, x, y, k, size, maxW, o = {}) {
    c.save(); let sz = size; c.font = `700 ${sz}px Kalam`;
    while (c.measureText(txt).width > maxW && sz > 24) { sz -= 1; c.font = `700 ${sz}px Kalam`; }
    c.restore(); P.write(c, txt, x, y, k, Object.assign({ size: sz }, o));
  }
  function rocket(c, x, y, s, t) {
    c.save(); c.translate(x, y); c.scale(s, s); c.rotate(0.5);
    const fl = [[-14, 60], [0, 100 + Math.sin(t * 14) * 10], [14, 60]]; P.fillPts(c, fl.concat([fl[0]]), '#E3A03A', 0.9);
    const b = [[-26, 60], [-26, -30], [0, -80], [26, -30], [26, 60], [-26, 60]]; P.fillPts(c, b, PAL.white); wash(c, b, '#B5553F', 0.18, 961, { bleed: 1, blooms: 0 }); stroke(c, b, { w: 2.6, closed: true, seed: 962 });
    const w1 = [[-26, 20], [-46, 64], [-26, 56]], w2 = [[26, 20], [46, 64], [26, 56]]; stroke(c, w1, { w: 2.4, seed: 963 }); stroke(c, w2, { w: 2.4, seed: 964 });
    P.fillPts(c, circlePts(0, -14, 11, 11, 16), PAL.water, 0.6); stroke(c, circlePts(0, -14, 11, 11, 16), { w: 2, closed: true, seed: 965 });
    c.restore();
  }
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 170, 1620, 740);
      P.write(ctx, 'Gözlem Defteri · Yakıtlar ve Çevre', 290, 270, E.seg(t, sr + 0.3, sr + 1.5), { size: 60 });
      if (t > sr + 1.5) P.drawOn(ctx, P.bez([286, 292], [720, 304], [1180, 288], 30), E.se(t, sr + 1.5, sr + 2.0), { w: 3, color: F.HEAT });
      ITEMS.forEach(([txt, col], i) => {
        const at = sr + 1.6 + i * 1.1, y = 385 + i * 100;
        const box = [[300, y - 44], [350, y - 46], [352, y + 4], [302, y + 6], [300, y - 44]];
        if (t > at - 0.3) stroke(ctx, box, { w: 2.4, closed: true, seed: 90 + i });
        P.check(ctx, 324, y - 22, 46, E.se(t, at + 0.9, at + 1.3), { w: 6, color: '#3F7A3A' });
        wfit(ctx, txt, 385, y, E.seg(t, at, at + 1.1), 44, 1150, { color: col });
      });
      F.damla(ctx, t, { x: 1640, y: 900, s: 1.0, flip: true, expr: 'neutral', look: [-0.7, 0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
  E.scene({
    name: 'Sıra sende', concept: 'Sosyal sorumluluk projesi; 7. sınıfa geçiş', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sk = E.s('task'), sb = E.s('bye'), se = E.s('end');
      ctx.save(); E.cam(ctx, { x: 960, y: 540, z: 1 });
      F.winter(ctx, t, { smokeA: 0.3, flakes: 30 });
      ctx.restore();
      // veda: gece gökyüzü, yıldızlar ve roket (sıradaki: Uzay Çağı)
      const nk = E.se(t, sb, sb + 1.4);
      if (nk > 0) E.layer(ctx, nk, c => {
        const g = c.createLinearGradient(0, 0, 0, 800); g.addColorStop(0, 'rgba(28,40,72,0.55)'); g.addColorStop(1, 'rgba(28,40,72,0)');
        c.fillStyle = g; c.fillRect(0, 0, E.W, 800);
        const r = INK.rng(977);
        for (let i = 0; i < 40; i++) { const x = r() * E.W, y = 170 + r() * 420; if (x < 720 && y < 160) continue; const tw = 0.5 + 0.5 * Math.sin(t * 2 + i); INK.inkDot(c, x, y, 2 + 2.5 * r() * tw, { color: '250,236,190' }); }
        const rk = E.se(t, sb + 1.0, se + 3, 'io');
        rocket(c, 1500 + rk * 220, 700 - rk * 420, 1.1, t);
      });
      const dx = 560;
      const wave = t > sb;
      F.damla(ctx, t, { x: dx, expr: 'happy', view: wave ? 'front' : 'q3', look: wave ? [0.6, -0.5] : [0.7, -0.3], arms: wave ? [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] : [[-1, 1.1], [1, 1.4]], prop: wave ? null : 'notebook' });
      // görev kartı
      const ck = Math.min(E.se(t, sk, sk + 0.7, 'out'), 1 - E.se(t, sb - 0.3, sb + 0.4));
      if (ck > 0) E.layer(ctx, ck, c => {
        const card = [[300, 160], [1620, 150], [1630, 830], [310, 842], [300, 160]];
        c.save(); c.shadowColor = 'rgba(40,30,20,0.3)'; c.shadowBlur = 30; P.fillPts(c, card, '#FAF6EC'); c.restore(); stroke(c, card, { w: 3, closed: true });
        P.write(c, 'Sıra sende!', 960, 270, E.seg(t, sk + 0.4, sk + 1.4), { size: 76, align: 'center', color: F.GREEN });
        const L = ['Grubunla bir çevre sorunu seç.', 'Sorunu yapılandır ve özetle.', 'Veriye dayalı çözüm önerileri üret.', 'Bir sosyal sorumluluk projesi tasarla.'];
        L.forEach((s, i) => { const at = sk + 1.3 + i * 1.1; wfit(c, (i + 1) + '. ' + s, 400, 390 + i * 92, E.seg(t, at, at + 1.1), 48, 880); });
        // 5 Haziran takvim yaprağı
        c.save(); c.translate(1420, 560); c.rotate(0.06);
        const ps = [[-120, -130], [120, -130], [120, 150], [-120, 150], [-120, -130]]; P.fillPts(c, ps, PAL.white); stroke(c, ps, { w: 2.6, closed: true, seed: 941 });
        const top = [[-120, -130], [120, -130], [120, -70], [-120, -70], [-120, -130]]; P.fillPts(c, top, F.GREEN, 0.75); stroke(c, top, { w: 2.2, closed: true, seed: 942 });
        F.fit(c, 'Haziran', 0, -88, 200, 38, { color: PAL.white });
        F.fit(c, '5', 0, 40, 200, 110, { font: 'Fraunces', weight: 600 });
        F.fit(c, 'Dünya Çevre Günü', 0, 115, 220, 30, { color: F.GREEN });
        c.restore();
      });
      if (wave) {
        E.inkText(ctx, '6. sınıf gözlemleri tamam!', 1180, 250, t, sb + 0.5, se + 0.4, { size: 48, align: 'center', weight: 400, color: PAL.white });
        E.inkText(ctx, 'Sıradaki: 7. sınıf · Uzay Çağı', 1180, 340, t, sb + 1.1, se + 0.4, { size: 68, align: 'center', color: '#F3D48A' });
      }
      // bitiş kartı
      const ek = E.se(t, se, se + 0.8);
      if (ek > 0) E.layer(ctx, ek, c => {
        c.fillStyle = PAL.paper; c.globalAlpha = 0.92; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
        INK.label(c, 'Damla’nın Gözlem Defteri', 960, 400, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
        INK.label(c, '22 · Isınma Yakıtları ve Çevre', 960, 485, { size: 56, weight: 700, align: 'center' });
        P.drawOn(c, P.bez([600, 515], [960, 526], [1320, 510], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: F.HEAT });
        INK.label(c, 'Fen Bilimleri · 6. sınıf · FB.6.7.3 · FB.6.7.4 · Türkiye Yüzyılı Maarif Modeli', 960, 610, { size: 32, align: 'center', alpha: 0.7 });
        INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 670, { size: 32, align: 'center', alpha: 0.7 });
        DAMLA.draw(c, { x: 960, y: 900, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      });
    }
  });
})();
