// SAHNE 5 — Ülkemizden bir problem: kuraklık. Yapılandır → özetle → veriye dayalı tahmin → önermeler → değerlendir → sosyal sorumluluk projesi
(function () {
  const { PAL, line, stroke, circlePts, wash, dashed } = INK;
  const U = U7;
  const dense = (pts, step = 4) => { const o = [pts[0]]; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], n = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / step)); for (let j = 1; j <= n; j++) o.push(E.mix(a, b, j / n)); } return o; };
  function lake(c, x, y, s, k, t) {
    const land = circlePts(x, y, 460 * s, 250 * s, 60); P.fillPts(c, land, '#E3CFA2'); wash(c, land, '#B98A55', 0.3, 3300, { bleed: 2, blooms: 1 });
    [1, 0.82].forEach((f, i) => { if (k > i * 0.4) { c.save(); dashed(c, dense(circlePts(x, y, 400 * s * f, 210 * s * f, 60), 4), { w: 2, on: 8, off: 8, alpha: 0.6, color: PAL.water }); c.restore(); } });
    const f = 1 - 0.38 * k; const w = INK.wobble(circlePts(x + 20 * k * s, y + 10 * k * s, 400 * s * f, 210 * s * f, 60), 6 * s, 3301);
    P.fillPts(c, w, '#CFE0EA'); wash(c, w, PAL.water, 0.45, 3302, { bleed: 2, blooms: 1 }); stroke(c, w, { w: 3, closed: true, seed: 3303 });
    const r = INK.rng(3304); for (let i = 0; i < 10; i++) { const a = r() * 6.283, d = 0.72 + r() * 0.2; const sx = x + Math.cos(a) * 420 * s * d, sy = y + Math.sin(a) * 225 * s * d; c.save(); c.globalAlpha *= k; line(c, [sx, sy], [sx + 16 * s, sy + 8 * s], { w: 1.6, dry: false }); c.restore(); }
  }
  const OPTS = [
    ['muslukları onarmak', (c, x, y, t) => U.faucet(c, x - 10, y - 10, 0.9, t, 0), [1, 1, 1]],
    ['yağmur suyu toplamak', (c, x, y, t) => { U.cloud(c, x, y - 50, 0.3); U.rain(c, x, y - 30, 70, 40, t, 1, { n: 5, seed: 3310 }); const b = U.rect(x - 30, y + 10, x + 30, y + 60); P.fillPts(c, b, '#8FB8D0'); stroke(c, b, { w: 2.4, dry: false }); }, [1, 1, 1]],
    ['damla sulama', (c, x, y, t) => { line(c, [x - 80, y - 10], [x + 80, y - 10], { w: 5, color: '#4A4750', dry: false }); [-50, 0, 50].forEach((dx, i) => { const u = (t * 0.8 + i * 0.3) % 1; P.fillPts(c, circlePts(x + dx, y - 4 + u * 30, 5, 7, 10), PAL.water, 0.9); U.leaf(c, x + dx, y + 40, 0.3, -1.2); }); }, [1, 1, 1]],
    ['bahçeyi hiç sulamamak', (c, x, y) => { line(c, [x, y + 50], [x + 4, y - 20], { w: 4, color: '#8A6A45', dry: false }); U.leaf(c, x - 22, y + 10, 0.3, 1.9); U.leaf(c, x + 26, y + 20, 0.28, 1.2); }, [1, 1, 0]]
  ];
  const CRIT = ['etkili mi?', 'uygulanabilir mi?', 'yan etkisi yok mu?'];
  E.scene({
    name: 'Kuraklık: problem', concept: 'Problemi yapılandırma ve özetleme', from: 'problem', to: 'summary', trFrom: [960, 540],
    draw(ctx, t) {
      const sP = E.s('problem'), sS = E.s('struct'), sY = E.s('summary');
      const pk = 1 - E.se(t, sS - 0.2, sS + 0.6);
      if (pk > 0) E.layer(ctx, pk, c => {
        const g = c.createRadialGradient(960, 540, 100, 960, 540, 1000); g.addColorStop(0, 'rgba(227,160,58,0.18)'); g.addColorStop(1, 'rgba(181,85,63,0.12)'); c.fillStyle = g; c.fillRect(0, 0, E.W, E.H);
        lake(c, 820, 560, 1.0, E.se(t, sP + 1, sP + 6), t);
        P.sun(c, 1480, 300, 80, t, { cells: false, nrays: 18 });
        P.write(c, 'Kuraklık', 820, 240, E.seg(t, sP + 0.3, sP + 1.3), { size: 70, align: 'center', color: U.HEAT });
        E.inkText(c, 'eski kıyı çizgileri', 820, 875, t, sP + 3, sS + 1, { size: 36, color: PAL.water, align: 'center' });
        U.thermo(c, 1560, 820, 280, 0.8);
      });
      const sk = E.se(t, sS, sS + 0.7);
      if (sk > 0) E.layer(ctx, sk, c => {
        c.save(); c.translate(960, 510); c.scale(P.pop(E.se(t, sS, sS + 0.8)), P.pop(E.se(t, sS, sS + 0.8)));
        U.card(c, -170, -70, 340, 140, { tint: U.HEAT, tintA: 0.2, seed: 3320 }); U.txt(c, 'kuraklık', 0, 18, { size: 54, align: 'center', color: U.HEAT });
        c.restore();
        U.txt(c, 'Nedenler', 360, 250, { size: 46, align: 'center', color: U.AMBER, alpha: E.se(t, sS + 0.4, sS + 1) });
        U.txt(c, 'Etkiler', 1560, 250, { size: 46, align: 'center', color: U.AMBER, alpha: E.se(t, sS + 4, sS + 4.6) });
        ['azalan yağış', 'artan sıcaklık', 'suyun israfı'].forEach((s, i) => { const at = sS + 0.8 + i * 0.9, y = 360 + i * 150; P.write(c, s, 360, y, E.seg(t, at, at + 0.8), { size: 42, align: 'center' }); U.flow(c, [520, y - 12], [780, 510 + (i - 1) * 30], E.seg(t, at + 0.4, at + 1.0), { w: 3 }); });
        ['tarım', 'içme suyu', 'sağlık'].forEach((s, i) => { const at = sS + 4.4 + i * 0.8, y = 360 + i * 150; U.flow(c, [1140, 510 + (i - 1) * 30], [1420, y - 12], E.seg(t, at, at + 0.6), { w: 3 }); P.write(c, s, 1560, y, E.seg(t, at + 0.3, at + 1.1), { size: 42, align: 'center' }); });
        const yk = E.se(t, sY, sY + 0.6, 'out');
        if (yk > 0) { c.save(); c.globalAlpha *= yk; U.card(c, 260, 740, 1400, 120, { tint: PAL.water, tintA: 0.12, seed: 3321 }); c.restore();
          P.write(c, 'Özet: Isınan iklim + bilinçsiz kullanım → su kaynakları azalıyor', 960, 815, E.seg(t, sY + 0.4, sY + 2.2), { size: 40, align: 'center' }); }
      });
      U.damla(ctx, t, { x: 1800, y: 900, s: 0.75, view: 'q3', flip: true, expr: t > sS ? 'thinking' : 'sad', look: [-0.8, -0.2], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook', seed: 5 });
    }
  });
  E.scene({
    name: 'Kuraklık: çözüm', concept: 'Veriye dayalı tahmin, önermeler, değerlendirme, proje', from: 'predict', to: 'project', trFrom: [960, 540],
    draw(ctx, t) {
      const sP = E.s('predict'), sO = E.s('options'), sE = E.s('evaluate'), sJ = E.s('project');
      // tahmin: su sayacı + haftalık okuma (temsilî, sayısız)
      const pk = 1 - E.se(t, sO - 0.2, sO + 0.5);
      if (pk > 0) E.layer(ctx, pk, c => {
        const d = circlePts(360, 480, 130, 130, 50); P.fillPts(c, d, '#FBF8F1'); stroke(c, d, { w: 4, closed: true });
        const d2 = circlePts(360, 480, 150, 150, 50); stroke(c, d2, { w: 3, closed: true, color: '#8E8E8E' });
        const a = -2.2 + ((t - sP) * 0.9) % 4.4; line(c, [360, 480], [360 + Math.cos(a) * 100, 480 + Math.sin(a) * 100], { w: 4, color: U.HEAT }); INK.inkDot(c, 360, 480, 6);
        U.txt(c, 'su sayacı', 360, 700, { size: 40, align: 'center' });
        const days = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum'];
        line(c, [700, 640], [1260, 640], { w: 2.6, dry: false });
        const r = INK.rng(3330);
        days.forEach((dname, i) => { const k = E.se(t, sP + 0.6 + i * 0.4, sP + 1.2 + i * 0.4); const h = (170 + r() * 90) * k; const x = 740 + i * 105; P.fillPts(c, U.rect(x, 640 - h, x + 60, 640), PAL.water, 0.55); stroke(c, U.rect(x, 640 - h, x + 60, 640), { w: 2, dry: false, alpha: k }); U.txt(c, dname, x + 30, 690, { size: 32, align: 'center' }); });
        U.txt(c, 'bir haftalık okuma (temsilî)', 980, 330, { size: 36, align: 'center', color: PAL.water });
        U.faucet(c, 1560, 400, 1.2, t, 1);
        U.txt(c, 'damlatan musluk', 1560, 560, { size: 36, align: 'center' });
        P.write(c, 'Tahmin: musluklar onarılırsa tüketim azalır.', 960, 820, E.seg(t, sP + 3.4, sP + 5.0), { size: 46, align: 'center', color: U.AMBER });
      });
      // önermeler
      const ok = E.se(t, sO, sO + 0.6);
      if (ok > 0) E.layer(ctx, ok, c => {
        OPTS.forEach(([name, icon, marks], i) => {
          const x = 290 + i * 420, at = sO + 0.3 + i * 0.5, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
          const bad = i === 3, ev = E.se(t, sE + 0.3, sE + 1.2);
          c.save(); c.globalAlpha *= k * (bad ? 1 - 0.45 * ev : 1);
          U.card(c, x - 190, 200, 380, 600, { seed: 3340 + i, tint: !bad && ev > 0 ? PAL.life : null, tintA: 0.15 * ev });
          U.fit(c, name, x, 270, 340, 40);
          icon(c, x, 400, t);
          CRIT.forEach((cr, j) => { const y = 560 + j * 70, ck = E.se(t, sO + 3 + j * 1.3 + i * 0.15, sO + 3.5 + j * 1.3 + i * 0.15); U.txt(c, cr, x - 150, y, { size: 30 }); if (marks[j]) P.check(c, x + 140, y - 14, 28, ck, { w: 4, color: U.GREEN }); else P.cross(c, x + 140, y - 10, 16, ck, { w: 4, color: U.RED }); });
          if (bad) { const bk = E.se(t, sO + 6.2, sO + 7); c.save(); c.globalAlpha *= bk; U.txt(c, 'bitkiler kurur!', x, 780, { size: 34, align: 'center', color: U.RED }); c.restore(); }
          c.restore();
          if (!bad && ev > 0) { c.save(); c.globalAlpha *= ev; stroke(c, [[x - 202, 186], [x + 204, 182], [x + 208, 814], [x - 198, 818], [x - 202, 186]], { w: 5, closed: true, color: U.GREEN, dry: false, seed: 3350 + i }); c.restore(); }
        });
      });
      // proje afişi
      const jk = E.se(t, sJ, sJ + 0.7, 'out');
      if (jk > 0) E.layer(ctx, jk, c => {
        c.fillStyle = 'rgba(241,234,219,0.92)'; c.fillRect(0, 0, E.W, E.H);
        const poster = U.card(c, 560, 170, 800, 700, { tint: PAL.water, tintA: 0.16, seed: 3360 });
        INK.label(c, 'Her Damla Değerli', 960, 280, { font: 'Fraunces', weight: 600, size: 72, align: 'center', color: PAL.water, rot: -0.01 });
        U.txt(c, 'sosyal sorumluluk projesi', 960, 335, { size: 34, align: 'center', color: U.AMBER });
        DAMLA.draw(c, { x: 960, y: 640, s: 1.2, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 2.3], [1, 2.3]], blink: E.blink(t, 7) });
        U.faucet(c, 700, 480, 0.7, t, 0); U.leaf(c, 1220, 520, 0.6, -0.5);
        P.write(c, 'Sağlıklı çevre: hakkımız ve sorumluluğumuz', 960, 760, E.seg(t, sJ + 3.4, sJ + 5), { size: 38, align: 'center' });
        P.write(c, 'afiş · okul panosu · aile bilgilendirme', 960, 830, E.seg(t, sJ + 1.2, sJ + 2.8), { size: 32, align: 'center', color: PAL.water });
      });
    }
  });
})();
