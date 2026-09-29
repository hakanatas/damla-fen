// SAHNE 8 — Kaydet (FB.5.1.1 ç: bilgileri kaydeder) + bilimsel süreç özeti + sonraki gözlem: Ay
(function () {
  const { PAL, line, stroke, circlePts, arrowHead } = INK;
  const RED = '#A23A2A';
  const ITEMS = [
    'Güneş bir yıldızdır; ısı ve ışık kaynağıdır.',
    'Çok sıcak gazlardan ve katmanlardan oluşur.',
    'Çapı, Dünya’nınkinin ≈ 109 katıdır.',
    'Bize uzaklığı ≈ 150 milyon km’dir.',
    'Kendi ekseni etrafında ≈ 25 günde döner.'
  ];
  const STEPS = ['Soru sor', 'Araç seç', 'Bilgi topla', 'Doğrula', 'Kaydet'];

  function page(ctx, t) {
    const sr = E.s('record'), sm = E.s('method');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 60, 1620, 900);
    P.write(ctx, 'Gözlem Defteri · Güneş', 290, 170, E.seg(t, sr + 0.3, sr + 1.5), { size: 66 });
    if (t > sr + 1.5) P.drawOn(ctx, P.bez([286, 192], [640, 204], [1010, 188], 30), E.se(t, sr + 1.5, sr + 2.0), { w: 3, color: PAL.light });
    const listA = 1 - E.se(t, sm - 0.2, sm + 0.6);
    if (listA > 0) E.layer(ctx, listA, c => {
      ITEMS.forEach((txt, i) => {
        const at = sr + 2.0 + i * 1.7, y = 290 + i * 100;
        const box = [[300, y - 44], [350, y - 46], [352, y + 4], [302, y + 6], [300, y - 44]];
        if (t > at - 0.3) stroke(c, box, { w: 2.4, closed: true, seed: 90 + i });
        P.check(c, 324, y - 22, 46, E.se(t, at + 1.0, at + 1.4), { w: 6 });
        P.write(c, txt, 385, y, E.seg(t, at, at + 1.2), { size: 50 });
      });
      const wy = 290 + 5 * 100, wat = sr + 2.0 + 5 * 1.7;
      P.write(c, '⚠  Güneş’e asla doğrudan bakma!', 300, wy, E.seg(t, wat, wat + 1.2), { size: 50, color: RED });
    });
    // inquiry chain
    const chA = E.se(t, sm - 0.1, sm + 0.6);
    if (chA > 0) E.layer(ctx, chA, c => {
      const xs = [390, 690, 990, 1290, 1590], y = 470;
      STEPS.forEach((s, i) => {
        const at = sm + 0.1 + i * 1.25, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const r = 110 * P.pop(k); const cp = INK.wobble(circlePts(xs[i], y, r, r, 50), 2, 110 + i);
        P.fillPts(c, cp, i === 4 ? '#F6E7B8' : '#FBF8F1'); stroke(c, cp, { w: 3.4, closed: true, seed: 120 + i });
        c.save(); c.font = '700 40px Kalam'; c.textAlign = 'center'; c.fillStyle = PAL.ink; const [a, b] = s.split(' '); if (b) { c.fillText(a, xs[i], y - 4); c.fillText(b, xs[i], y + 42); } else c.fillText(a, xs[i], y + 18); c.restore();
        INK.label(c, String(i + 1), xs[i], y - 70, { size: 34, align: 'center', alpha: 0.5, weight: 700 });
        if (i > 0) { const ak = E.se(t, at - 0.3, at + 0.2); if (ak > 0) P.arrow(c, [xs[i - 1] + 118, y], [xs[i] - 118, y], ak, { w: 3, head: 13 }); }
      });
      E.inkText(c, 'Bilim insanları da böyle çalışır!', 960, 740, t, sm + 6.6, 1e9, { size: 62, align: 'center' });
    });
    // Damla writing, then celebrating
    const cheer = t > sm + 6.4;
    DAMLA.draw(ctx, {
      x: 1660, y: 1050, s: 1.15, view: 'q3', flip: true, expr: cheer ? 'happy' : 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t) * (cheer ? 1 + 0.06 * Math.abs(Math.sin((t - sm) * 5)) : 1), t, talk: E.talk(t), seed: 5,
      arms: cheer ? [[-1, 2.7], [1, 2.7]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: cheer ? null : 'notebook'
    });
    if (cheer) { const k = E.se(t, sm + 6.4, sm + 7.0, 'out'); const x = 1660, y = 1050 - 360; INK.wash(c2(ctx), circlePts(x, y, 20 * k, 20 * k, 24), PAL.light, 0.85, 222); for (let i = 0; i < 8; i++) { const a = i / 8 * 6.28 + t; line(ctx, [x + Math.cos(a) * 28 * k, y + Math.sin(a) * 28 * k], [x + Math.cos(a) * 44 * k, y + Math.sin(a) * 44 * k], { w: 3, color: '#B7791C', dry: false }); } }
  }
  const c2 = c => c;

  function dusk(ctx, t) {
    const sn = E.s('next'), sres = E.s('research'), se = E.s('end');
    const hill = P.hillLine(E.W);
    const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,70,110,0.32)'); g.addColorStop(0.7, 'rgba(227,150,70,0.22)'); g.addColorStop(1, 'rgba(227,150,70,0.1)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
    const set = E.se(t, sn - 0.5, sn + 5);
    P.sun(ctx, 160, E.lerp(760, 900, set), 90, t, { cells: false, nrays: 18 });   // setting in the west
    const mr = E.se(t, sn, sn + 4);
    const mx = 1560, my = E.lerp(900, 420, mr);                                  // Moon rising in the east
    const mg = ctx.createRadialGradient(mx, my, 40, mx, my, 220); mg.addColorStop(0, 'rgba(251,248,241,0.5)'); mg.addColorStop(1, 'rgba(251,248,241,0)'); ctx.fillStyle = mg; ctx.fillRect(mx - 240, my - 240, 480, 480);
    P.moon(ctx, mx, my, 80);
    P.landscape(ctx, E.W, E.H, t, { hill });
    const dx = 820, dy = P.hillY(hill, dx) + 4;
    DAMLA.draw(ctx, { x: dx, y: dy, s: 1.5, view: 'q3', expr: 'happy', look: [0.8, -0.6], blink: E.blink(t, 12), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    E.inkText(ctx, 'Sıradaki gözlem:', 960, 200, t, sn + 0.8, sres + 0.2, { size: 50, align: 'center', weight: 400 });
    E.inkText(ctx, 'Gökyüzündeki Komşumuz: Ay', 960, 285, t, sn + 1.4, sres + 0.2, { size: 72, align: 'center' });
    if (t > sn + 1.6) E.inkText(ctx, 'Ay', mx, my + 140, t, sn + 2.4, sres + 0.2, { size: 46, align: 'center' });
    // research card
    const rk = Math.min(E.se(t, sres, sres + 0.7, 'out'), 1 - E.se(t, se - 0.4, se + 0.3));
    if (rk > 0) E.layer(ctx, rk, c => {
      const card = [[360, 190], [1560, 180], [1570, 700], [370, 712], [360, 190]];
      c.save(); c.shadowColor = 'rgba(40,30,20,0.3)'; c.shadowBlur = 30; P.fillPts(c, card, '#FAF6EC'); c.restore(); stroke(c, card, { w: 3, closed: true });
      P.icon.books(c, 520, 440, 1.1);
      P.write(c, 'Sen de araştır!', 700, 330, E.seg(t, sres + 0.4, sres + 1.4), { size: 70, color: '#8A4A10' });
      P.write(c, 'Battani ve Fergani,', 700, 450, E.seg(t, sres + 1.2, sres + 2.4), { size: 58 });
      P.write(c, 'Güneş hakkında neler keşfetti?', 700, 530, E.seg(t, sres + 2.2, sres + 3.6), { size: 58 });
      INK.label(c, 'kütüphane · güvenilir dijital kaynaklar · öğretmenin', 700, 620, { size: 30, alpha: 0.6 * E.se(t, sres + 3.4, sres + 4.2) });
    });
    // end card
    const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.9; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, '1 · Gökyüzündeki Komşumuz: Güneş', 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · 5. sınıf · FB.5.1.1 · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  }

  E.scene({
    name: 'Kaydet', concept: 'Bilgileri kaydetme; bilimsel süreç', from: 'record', to: 'method', trFrom: [960, 540],
    draw(ctx, t) { page(ctx, t); }
  });
  E.scene({
    name: 'Sıradaki: Ay', concept: 'Araştırma görevi ve sonraki konu', from: 'next', to: 'end', trFrom: [1560, 420],
    draw(ctx, t) { dusk(ctx, t); }
  });
})();
