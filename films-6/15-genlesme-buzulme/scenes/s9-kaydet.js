// SAHNE 10 — Kaydet + Sıra sende (çöl kayalarının ufalanması: gözlemlenmemiş durum) + sıradaki film + bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts, wash, rng } = INK;
  const F = G15, RED = F.RED;
  const ITEMS = [
    'Isı alan madde genleşebilir, ısı veren büzülebilir.',
    'Gazlar, sıvılar ve katılar genleşip büzülebilir.',
    'Tanecikler büyümez; aralarındaki mesafe değişir.',
    'Termometre, sıvının genleşmesiyle çalışır.',
    'Genleşme miktarı, saf maddeler için ayırt edicidir.'
  ];
  function rock(ctx, x, y, s, crack, t) {
    const R = rng(3001);
    const pts = INK.wobble(circlePts(x, y, 190 * s, 120 * s, 50), 10 * s, 3002);
    P.fillPts(ctx, pts, '#D9B98C'); wash(ctx, pts, '#8A6A45', 0.5, 3003, { bleed: 1.5, blooms: 2 }); stroke(ctx, pts, { w: 3, closed: true, seed: 3004 });
    if (crack > 0) for (let i = 0; i < 4; i++) { const a = -2.4 + i * 0.9 + R() * 0.3; const p = [[x + Math.cos(a) * 20, y + Math.sin(a) * 14]]; for (let j = 1; j <= 5; j++) { const u = j / 5; p.push([x + Math.cos(a) * 170 * s * u + (R() - 0.5) * 20, y + Math.sin(a) * 105 * s * u + (R() - 0.5) * 14]); } P.drawOn(ctx, p, E.seg(crack, i * 0.15, i * 0.15 + 0.6), { w: 2.4 }); }
    // kum
    const r2 = rng(3010); ctx.save(); ctx.fillStyle = '#C9A777'; for (let i = 0; i < 70; i++) { ctx.globalAlpha = 0.7; ctx.beginPath(); ctx.arc(x - 260 * s + r2() * 520 * s, y + 110 * s + r2() * 40 * s, 3 + r2() * 3, 0, 7); ctx.fill(); } ctx.restore();
  }
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme ve Sıra sende', from: 'record', to: 'yourturn', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record'), sy = E.s('yourturn');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 70, 1620, 850);
      P.write(ctx, 'Gözlem Defteri · Genleşme ve Büzülme', 290, 180, E.seg(t, sr + 0.3, sr + 1.5), { size: 60 });
      if (t > sr + 1.5) P.drawOn(ctx, P.bez([286, 200], [800, 212], [1300, 196], 30), E.se(t, sr + 1.5, sr + 2.0), { w: 3, color: PAL.light });
      const la = 1 - E.se(t, sy - 0.2, sy + 0.5);
      if (la > 0) E.layer(ctx, la, c => {
        ITEMS.forEach((txt, i) => {
          const at = sr + 1.4 + i * 1.3, y = 300 + i * 96;
          const box = [[300, y - 44], [350, y - 46], [352, y + 4], [302, y + 6], [300, y - 44]];
          if (t > at - 0.3) stroke(c, box, { w: 2.4, closed: true, seed: 3020 + i });
          P.check(c, 324, y - 22, 46, E.se(t, at + 1.0, at + 1.4), { w: 6 });
          P.write(c, txt, 385, y, E.seg(t, at, at + 1.2), { size: 44 });
        });
        const wy = 300 + 5 * 96, wat = sr + 1.4 + 5 * 1.3;
        P.write(c, '⚠  Sıcak su ve ısıtıcıyı yalnızca bir yetişkin kullanır!', 300, wy, E.seg(t, wat, wat + 1.4), { size: 44, color: RED });
      });
      const yk = E.se(t, sy, sy + 0.7);
      if (yk > 0) E.layer(ctx, yk, c => {
        const day = 0.5 + 0.5 * Math.sin((t - sy) * 1.4);
        rock(c, 520, 600, 1.0, E.se(t, sy + 2, sy + 7), t);
        P.sun(c, 330, 330, 40, t, { nrays: 12, cells: false, glow: false });
        P.moon(c, 700, 330, 34);
        INK.label(c, 'gündüz sıcak', 330, 420, { size: 34, weight: 700, align: 'center', color: F.HEAT, alpha: 0.4 + 0.6 * day });
        INK.label(c, 'gece soğuk', 700, 420, { size: 34, weight: 700, align: 'center', color: PAL.water, alpha: 0.4 + 0.6 * (1 - day) });
        INK.label(c, 'çöldeki kaya', 520, 830, { size: 30, align: 'center', alpha: 0.7 });
        P.write(c, 'Sıra sende!', 900, 330, E.seg(t, sy + 0.4, sy + 1.4), { size: 72, color: F.AMBER });
        P.write(c, 'Kayalar gece-gündüz sıcaklık', 900, 440, E.seg(t, sy + 1.2, sy + 2.6), { size: 50 });
        P.write(c, 'farkıyla neden ufalanır?', 900, 505, E.seg(t, sy + 2.4, sy + 3.4), { size: 50 });
        [['1', 'Tahmin et.'], ['2', 'Araştır, kanıt topla.'], ['3', 'Defterine kaydet.']].forEach(([n, s], i) => {
          const at = sy + 3.6 + i * 0.9, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
          const y = 620 + i * 80; c.save(); c.translate(930, y - 16); c.scale(P.pop(k), P.pop(k)); P.fillPts(c, circlePts(0, 0, 26, 26, 24), PAL.light, 0.85); stroke(c, circlePts(0, 0, 26, 26, 24), { w: 2.2, closed: true }); c.font = '700 32px Kalam'; c.textAlign = 'center'; c.fillStyle = PAL.white; c.fillText(n, 0, 11); c.restore();
          P.write(c, s, 980, y, E.seg(t, at + 0.2, at + 1.0), { size: 46 });
        });
      });
      const cheer = t > sy + 7.5;
      DAMLA.draw(ctx, {
        x: 1640, y: 1040, s: 1.1, view: 'q3', flip: true, expr: cheer ? 'happy' : (t > sy ? 'curious' : 'neutral'), look: [-0.7, 0.2], blink: E.blink(t, 25), squash: E.breath(t), t, talk: E.talk(t), seed: 5,
        arms: t > sy ? [[-1, 0.4], [1, 2.3 + Math.sin(t * 2) * 0.1]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: t > sy ? null : 'notebook'
      });
    }
  });
  E.scene({
    name: 'Sıradaki: Erime ve kaynama noktası', concept: 'Sonraki konu ve bitiş', from: 'next', to: 'end', trFrom: [960, 600],
    draw(ctx, t) {
      const sn = E.s('next'), se = E.s('end');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      F.bench(ctx, 200, 1720, 800, 3101);
      // buz küpü + termometre + beher (teaser)
      const bx = 1180, by = 800;
      const glass = [[bx - 120, by - 260], [bx - 110, by], [bx + 110, by], [bx + 120, by - 260]];
      P.fillPts(ctx, [[bx - 112, by - 120], [bx - 108, by - 4], [bx + 108, by - 4], [bx + 112, by - 120]], PAL.water, 0.25);
      const cube = [[bx - 50, by - 190], [bx + 30, by - 196], [bx + 36, by - 116], [bx - 44, by - 110], [bx - 50, by - 190]];
      P.fillPts(ctx, cube, '#F2F7FA', 0.95); wash(ctx, cube, F.COLD, 0.45, 3102, { bleed: 0.6, blooms: 0 }); stroke(ctx, cube, { w: 2.4, closed: true, seed: 3103 });
      stroke(ctx, glass, { w: 3.4, seed: 3104 });
      line(ctx, [bx + 60, by - 20], [bx + 90, by - 330], { w: 7, seed: 3105 }); INK.inkDot(ctx, bx + 61, by - 26, 8, { color: '181,85,63' });
      const q = E.se(t, sn + 1.5, sn + 3);
      if (q > 0) { ['erime ?', 'donma ?', 'kaynama ?'].forEach((s, i) => INK.label(ctx, s, bx + 250, by - 280 + i * 70, { size: 40, weight: 700, alpha: q, color: i === 2 ? F.HEAT : (i === 1 ? PAL.water : F.AMBER) })); }
      DAMLA.draw(ctx, { x: 600, y: 800, s: 1.35, view: 'q3', expr: 'curious', look: [0.8, -0.4], blink: E.blink(t, 27), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 2.3 + 0.2 * Math.sin(t * 3)]] });
      E.inkText(ctx, 'Sıradaki gözlem:', 960, 190, t, sn + 0.6, se + 0.2, { size: 48, align: 'center', weight: 400 });
      E.inkText(ctx, '16 · Erime, Donma ve Kaynama Noktası', 960, 270, t, sn + 1.2, se + 0.2, { size: 66, align: 'center' });
      const ek = E.se(t, se, se + 0.8);
      if (ek > 0) E.layer(ctx, ek, c => {
        c.fillStyle = PAL.paper; c.globalAlpha = 0.92; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
        INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
        INK.label(c, '15 · Genleşme ve Büzülme', 960, 515, { size: 56, weight: 700, align: 'center' });
        P.drawOn(c, P.bez([640, 545], [960, 556], [1280, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
        INK.label(c, 'Fen Bilimleri · 6. sınıf · FB.6.5.1 · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
        INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
        DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      });
    }
  });
})();
