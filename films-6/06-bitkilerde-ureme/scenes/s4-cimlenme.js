// SAHNE 7–8 — FB.6.3.3: hipotez, deney düzeneği, bağımsız/bağımlı/kontrol edilen değişkenler, gözlem-kayıt, sonuç, oksijen (öğretmen açıklar), önerme
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F06;
  const RED = F.RED, PURP = '#8E4A6A', BLUE = PAL.water;
  const JX = [520, 960, 1400], JY = 800;
  const chip = (c, x, y, txt, col, k, size = 40) => { if (k <= 0) return; c.save(); c.font = `700 ${size}px Kalam`; const w = c.measureText(txt).width + 40; c.restore(); const b = F.rrect(x, y - size * 0.35, w, size * 1.5, 18, 6); c.save(); c.globalAlpha *= k; P.fillPts(c, b, '#FBF8F1'); INK.wash(c, b, col, 0.3, 7300 + x % 97, { bleed: 1, blooms: 0 }); stroke(c, b, { w: 2.4, closed: true, seed: 7310 + y % 13, dry: false }); c.restore(); P.write(c, txt, x, y + size * 0.2, k, { size, align: 'center' }); };

  E.scene({
    name: 'Hipotez', concept: 'Hipotez kurma; değişkenleri belirleme', from: 'hypo', to: 'ctrl', trFrom: [960, 540],
    draw(ctx, t) {
      const sh = E.s('hypo'), ss = E.s('setup'), sv = E.s('vars'), sc = E.s('ctrl');
      // hipotez kartı (üstte kalır, küçülür)
      const up = E.se(t, ss - 0.4, ss + 0.6);
      const cy = E.lerp(420, 215, up), cs = E.lerp(1, 0.62, up);
      ctx.save(); ctx.translate(960, cy); ctx.scale(cs, cs);
      F.card(ctx, -640, -170, 640, 170, { seed: 7320 });
      P.write(ctx, 'Hipotez 1: Tohumun çimlenmesi için su gerekir.', -590, -40, E.seg(t, sh + 2.4, sh + 4.2), { size: 54, color: BLUE });
      P.write(ctx, 'Hipotez 2: Tohumun çimlenmesi için ışık gerekir.', -590, 70, E.seg(t, sh + 4.4, sh + 6.2), { size: 54, color: '#A06A10' });
      ctx.restore();
      if (up < 0.5) DAMLA.draw(ctx, { x: 1700, y: 900, s: 1.0, view: 'q3', flip: true, expr: 'thinking', look: [-0.6, -0.5], blink: E.blink(t, 4), squash: E.breath(t), t, seed: 3, arms: [[-1, 0.3], [1, [30, -86]]] });
      if (up < 0.5) { F.seed(ctx, 560, 760, 2.2, 1); F.seed(ctx, 700, 780, 2.0, 2); F.seed(ctx, 820, 750, 2.1, 3); INK.label(ctx, 'fasulye tohumları', 690, 860, { size: 36, align: 'center', alpha: 0.8 }); }
      // düzenek
      const ka = E.se(t, ss + 0.2, ss + 1.0);
      if (ka > 0) E.layer(ctx, ka, c => {
        const L = [['A', 1, 0, 'ıslak · ışıkta'], ['B', 0, 0, 'kuru · ışıkta'], ['C', 1, 1, 'ıslak · karanlıkta']];
        L.forEach(([n, wet, dark, d], i) => { const k = E.se(t, ss + 1.0 + i * 2.2, ss + 1.8 + i * 2.2, 'out'); if (k <= 0) return; E.layer(c, k, cc => { F.jar(cc, JX[i], JY, 1.0, { wet, dark, label: n, sprout: 0 }); INK.label(cc, d, JX[i], JY + 60, { size: 36, weight: 700, align: 'center' }); if (wet) for (let j = 0; j < 3; j++) INK.inkDot(cc, JX[i] - 60 + j * 60, JY - 20, 4, { color: '46,106,140', alpha: 0.7 }); }); });
        P.sun(c, 1740, 420, 46, t, { nrays: 14, cells: false });
      });
      // bağımsız / bağımlı
      const kv = E.se(t, sv - 0.2, sv + 0.5) * (1 - E.se(t, sc + 0.2, sc + 0.9));
      if (kv > 0) E.layer(ctx, kv, c => {
        chip(c, 690, 420, 'bağımsız: su  (A ↔ B)', BLUE, E.se(t, sv + 0.5, sv + 1.5));
        chip(c, 1250, 420, 'bağımsız: ışık  (A ↔ C)', '#C07F1E', E.se(t, sv + 1.8, sv + 2.8));
        chip(c, 960, 520, 'bağımlı: çimlenen tohum sayısı', PURP, E.se(t, sv + 4.0, sv + 5.0));
      });
      // kontrol edilen değişkenler
      const kc = E.se(t, sc + 0.3, sc + 1.0);
      if (kc > 0) E.layer(ctx, kc, c => {
        const C = ['tohum cinsi', 'tohum sayısı: 5', 'pamuk miktarı', 'sıcaklık'];
        INK.label(c, 'kontrol edilen değişkenler (hepsinde aynı):', 960, 385, { size: 40, weight: 700, align: 'center' });
        C.forEach((x, i) => chip(c, 420 + i * 360, 462, x, F.LIFE, E.se(t, sc + 1.0 + i * 0.9, sc + 1.8 + i * 0.9), 38));
      });
    }
  });

  const LOG = ['A', 'B', 'C'];
  E.scene({
    name: 'Gözlem ve sonuç', concept: 'Gözlem, kayıt, sonuç ve önerme', from: 'observe', to: 'prop', trFrom: [960, 540], tr: 0.9,
    draw(ctx, t) {
      const so = E.s('observe'), sr = E.s('result'), sc = E.s('conclude'), sx = E.s('oxygen'), sp = E.s('prop');
      const g = E.clamp((t - so - 0.8) / 6.5); const day = 1 + Math.floor(g * 4.999);
      const shift = E.se(t, sc - 0.3, sc + 0.6);
      const fadeJ = 1 - E.se(t, sp - 0.4, sp + 0.4);
      if (fadeJ > 0) E.layer(ctx, fadeJ, c => {
        c.save(); c.translate(0, -120 * shift);
        [[1, 0], [0, 0], [1, 1]].forEach(([wet, dark], i) => { F.jar(c, JX[i], JY, 1.0, { wet, dark: dark ? 0.35 : 0, label: LOG[i], sprout: wet ? g : 0 }); });
        P.sun(c, 1740, 420, 46, t, { nrays: 14, cells: false });
        P.icon.calendar(c, 180, 420, 0.9, String(day)); INK.label(c, 'gün', 180, 500, { size: 30, align: 'center', alpha: 0.7 });
        // sonuç işaretleri
        const kr = E.se(t, sr + 0.2, sr + 1.0);
        if (kr > 0) { [[0, '5/5 çimlendi'], [1, '0/5'], [2, '5/5 çimlendi']].forEach(([i, txt]) => INK.label(c, txt, JX[i], JY + 70, { size: 38, weight: 700, align: 'center', alpha: kr, color: i === 1 ? RED : F.LIFE_D })); const kx = kr * (1 - shift); P.check(c, JX[0] + 150, JY - 250, 50, kx, { w: 7, color: F.LIFE_D }); P.check(c, JX[2] + 150, JY - 330, 50, kx, { w: 7, color: F.LIFE_D }); P.cross(c, JX[1] + 150, JY - 250, 30, kx, { w: 7, color: RED }); }
        c.restore();
      });
      // defterde günlük çizimler (gözlemlerini çizer)
      const kl = E.se(t, so + 0.5, so + 1.2) * (1 - E.se(t, sr - 0.3, sr + 0.3));
      if (kl > 0) E.layer(ctx, kl, c => {
        F.card(c, 1130, 160, 1810, 420, { seed: 7400 });
        INK.label(c, 'gözlem günlüğü', 1160, 210, { size: 34, weight: 700 });
        for (let d = 1; d <= day; d++) { const x = 1170 + (d - 1) * 122; INK.label(c, d + '. gün', x, 256, { size: 28, alpha: 0.7 }); LOG.forEach((n, i) => { const y = 300 + i * 38; const ok = n !== 'B' && d >= 3; INK.label(c, n + (ok ? ' ✓' : ' –'), x + 6, y, { size: 32, weight: 700, alpha: 0.85, color: ok ? F.LIFE_D : PAL.ink }); }); }
      });
      // sonuç: hipotezler
      const kh = E.se(t, sc - 0.1, sc + 0.6) * (1 - E.se(t, sx - 0.3, sx + 0.3));
      if (kh > 0) E.layer(ctx, kh, c => {
        F.card(c, 260, 170, 1660, 420, { seed: 7410 });
        P.write(c, 'Hipotez 1 (su gerekir):', 320, 250, 1, { size: 48, color: BLUE });
        P.write(c, 'doğrulandı ✓', 1000, 250, E.seg(t, sc + 0.6, sc + 1.6), { size: 52, color: F.LIFE_D });
        P.write(c, 'Hipotez 2 (ışık gerekir):', 320, 360, 1, { size: 48, color: '#A06A10' });
        P.write(c, 'çürütüldü ✗', 1000, 360, E.seg(t, sc + 2.8, sc + 3.8), { size: 52, color: RED });
      });
      // oksijen: öğretmen açıklar
      const ko = E.se(t, sx - 0.1, sx + 0.6) * (1 - E.se(t, sp - 0.4, sp + 0.3));
      if (ko > 0) E.layer(ctx, ko, c => {
        F.card(c, 360, 170, 1560, 430, { seed: 7420 });
        [0, 1, 2, 3, 4].forEach(i => { const bx = 480 + (i % 3) * 36, by = 300 - ((t * 40 + i * 30) % 90); const cp = circlePts(bx, by, 12 + (i % 2) * 5, 12 + (i % 2) * 5, 16); stroke(c, cp, { w: 2, closed: true, color: BLUE, dry: false }); });
        P.write(c, 'Oksijen de gerekir.', 620, 270, E.seg(t, sx + 0.4, sx + 1.4), { size: 56 });
        P.write(c, 'Oksijensiz ortamı sınıfta kuramayız:', 620, 350, E.seg(t, sx + 1.4, sx + 2.6), { size: 42 });
        P.write(c, 'öğretmenimiz açıklar.', 620, 404, E.seg(t, sx + 2.4, sx + 3.4), { size: 42, color: F.LIFE_D });
      });
      // önerme
      const kp = E.se(t, sp - 0.1, sp + 0.6);
      if (kp > 0) E.layer(ctx, kp, c => {
        c.fillStyle = 'rgba(138,106,69,0.14)'; c.fillRect(0, 0, E.W, E.H);
        P.notebook(c, 200, 180, 1520, 700);
        P.write(c, 'Önerme', 330, 290, E.seg(t, sp + 0.2, sp + 1.0), { size: 70, color: F.LIFE_D });
        P.write(c, 'Fasulye tohumu; su, uygun sıcaklık ve oksijen', 330, 420, E.seg(t, sp + 0.8, sp + 2.8), { size: 54 });
        P.write(c, 'olduğunda çimlenir. Çimlenmek için ışık gerekmez.', 330, 500, E.seg(t, sp + 2.6, sp + 4.6), { size: 54 });
        P.write(c, 'Ama fidenin sağlıklı büyümesi için ışık gerekir!', 330, 620, E.seg(t, sp + 4.8, sp + 6.4), { size: 48, color: '#A06A10' });
        P.write(c, 'Bazı bitki tohumları ise ışıkta daha iyi çimlenir: tohumun cinsi de önemli.', 330, 720, E.seg(t, sp + 6.4, sp + 8.0), { size: 36, weight: 400 });
        DAMLA.draw(c, { x: 1760, y: 1045, s: 1.0, view: 'q3', flip: true, expr: 'happy', look: [-0.7, -0.2], blink: E.blink(t, 5), squash: E.breath(t), t, seed: 4, arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
      });
    }
  });
})();
