// SAHNE 11–12 — Kaydet, Sıra sende (poster görevi), sıradaki film, bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F621;
  const ITEMS = [
    'Biyoçeşitlilik: bir bölgedeki canlı türlerinin çeşitliliği',
    'Canlılar birbirine bağlıdır; bir tür, diğerlerini etkiler.',
    'Zengin çeşitlilik → dengeli ve dayanıklı ekosistem',
    'Tehditler: habitat kaybı, yangın, kirlilik, aşırı otlatma...',
    'Önermeleri verilerle karşılaştır, tahminini sorgula.'
  ];
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 60, 1620, 850);
      P.write(ctx, 'Gözlem Defteri · Biyoçeşitlilik', 290, 175, E.seg(t, sr + 0.3, sr + 1.5), { size: 62 });
      if (t > sr + 1.5) P.drawOn(ctx, P.bez([286, 196], [700, 208], [1150, 192], 30), E.se(t, sr + 1.5, sr + 2.0), { w: 3, color: PAL.life });
      ITEMS.forEach((txt, i) => {
        const at = sr + 1.6 + i * 1.3, y = 300 + i * 105;
        const box = [[300, y - 44], [350, y - 46], [352, y + 4], [302, y + 6], [300, y - 44]];
        if (t > at - 0.3) stroke(ctx, box, { w: 2.4, closed: true, seed: 90 + i });
        P.check(ctx, 324, y - 22, 46, E.se(t, at + 0.9, at + 1.3), { w: 6, color: '#3F7A3A' });
        P.write(ctx, txt, 385, y, E.seg(t, at, at + 1.1), { size: 46 });
      });
      DAMLA.draw(ctx, { x: 1660, y: 1010, s: 1.0, view: 'q3', flip: true, expr: 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 13), squash: E.breath(t), t, talk: E.talk(t), seed: 10, arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
  E.scene({
    name: 'Sıra sende', concept: 'Poster görevi ve sıradaki konu', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sk = E.s('task'), sn = E.s('next'), se = E.s('end');
      const hill = F.HILL;
      // akşamüstü: kış yaklaşıyor
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,70,110,0.22)'); g.addColorStop(0.7, 'rgba(227,150,70,0.2)'); g.addColorStop(1, 'rgba(227,150,70,0.08)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      P.landscape(ctx, E.W, E.H, t, { hill, tree: false });
      F.tree(ctx, 170, P.hillY(hill, 170) + 6, 1.15, 2, t);
      F.pond(ctx, 1330, 822, 300, 55, t);
      F.frog(ctx, 1080, 772, 1.1); F.heron(ctx, 1600, 805, 1.25, t); F.flower(ctx, 790, 700, 1, '#FBF8F1', 1, t);
      // uzakta bacası tüten ev (sıradaki konu)
      const hk = E.se(t, sn, sn + 1.2);
      if (hk > 0) E.layer(ctx, hk, c => {
        const hx = 1790, hy = P.hillY(hill, 1790) + 4;
        const b = [[hx - 80, hy], [hx - 80, hy - 100], [hx, hy - 160], [hx + 80, hy - 100], [hx + 80, hy], [hx - 80, hy]];
        P.fillPts(c, b, PAL.white); wash(c, b, '#B5553F', 0.3, 230, { bleed: 1, blooms: 0 }); stroke(c, b, { w: 2.6, closed: true, seed: 231 });
        const ch = [[hx + 30, hy - 138], [hx + 30, hy - 180], [hx + 54, hy - 180], [hx + 54, hy - 118]]; P.fillPts(c, ch.concat([ch[0]]), PAL.white); stroke(c, ch, { w: 2.4, seed: 232 });
        for (let i = 0; i < 4; i++) { const k = ((t * 0.3 + i / 4) % 1); c.save(); c.globalAlpha *= (1 - k) * 0.6; P.fillPts(c, circlePts(hx + 42 - k * 60, hy - 200 - k * 150, 14 + k * 26, 10 + k * 18, 20), '#6F6B66', 0.55); c.restore(); }
        P.fillPts(c, F.rr(hx - 50, hy - 80, 36, 34, 3), PAL.light, 0.7);
      });
      const dx = 560, dy = P.hillY(hill, dx) + 4;
      const wave = t > sn;
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.35, view: wave ? 'front' : 'q3', expr: 'happy', look: [0.6, -0.3], blink: E.blink(t, 14), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: wave ? [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] : [[-1, 1.1], [1, 1.4]], prop: wave ? null : 'notebook' });
      // görev kartı
      const ck = Math.min(E.se(t, sk, sk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
      if (ck > 0) E.layer(ctx, ck, c => {
        const card = [[300, 150], [1620, 140], [1630, 820], [310, 832], [300, 150]];
        c.save(); c.shadowColor = 'rgba(40,30,20,0.3)'; c.shadowBlur = 30; P.fillPts(c, card, '#FAF6EC'); c.restore(); stroke(c, card, { w: 3, closed: true });
        P.write(c, 'Sıra sende!', 960, 260, E.seg(t, sk + 0.4, sk + 1.4), { size: 76, align: 'center', color: '#3F7A3A' });
        const L = ['Yakın çevrendeki canlıları araştır.', 'Onları neyin tehdit ettiğini bul.', 'Korumak için bir poster hazırla.', 'Kaynaklarını posterine yaz!'];
        L.forEach((s, i) => { const at = sk + 1.4 + i * 1.2; P.write(c, (i + 1) + '. ' + s, 420, 380 + i * 95, E.seg(t, at, at + 1.2), { size: 50, color: i === 3 ? '#8A4A10' : PAL.ink }); });
        c.save(); c.translate(1420, 560); c.rotate(0.06);
        const ps = [[-110, -150], [110, -150], [110, 150], [-110, 150], [-110, -150]]; P.fillPts(c, ps, PAL.white); wash(c, ps, PAL.life, 0.2, 240, { bleed: 1, blooms: 0 }); stroke(c, ps, { w: 2.6, closed: true, seed: 241 });
        F.fit(c, 'Canlıları koru!', 0, -104, 200, 30, { color: '#2F4A1E' }); F.bee(c, -40, -30, 1, t); F.flower(c, 40, 30, 0.6, '#C8553D', 3, t, 60); F.frog(c, -30, 110, 0.8);
        c.restore();
      });
      if (wave) {
        E.inkText(ctx, 'Sıradaki gözlem:', 1180, 250, t, sn + 0.6, se + 0.4, { size: 48, align: 'center', weight: 400 });
        E.inkText(ctx, 'Isınma Yakıtları ve Çevre', 1180, 335, t, sn + 1.2, se + 0.4, { size: 68, align: 'center' });
      }
      // bitiş kartı
      const ek = E.se(t, se, se + 0.8);
      if (ek > 0) E.layer(ctx, ek, c => {
        c.fillStyle = PAL.paper; c.globalAlpha = 0.92; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
        INK.label(c, 'Damla’nın Gözlem Defteri', 960, 400, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
        INK.label(c, '21 · Canlıların Zenginliği: Biyoçeşitlilik', 960, 485, { size: 56, weight: 700, align: 'center' });
        P.drawOn(c, P.bez([560, 515], [960, 526], [1360, 510], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.life });
        INK.label(c, 'Fen Bilimleri · 6. sınıf · FB.6.7.1 · FB.6.7.2 · Türkiye Yüzyılı Maarif Modeli', 960, 610, { size: 32, align: 'center', alpha: 0.7 });
        INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 670, { size: 32, align: 'center', alpha: 0.7 });
        DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      });
    }
  });
})();
