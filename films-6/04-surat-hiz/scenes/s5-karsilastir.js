// SAHNE 5 — Benzerlik/farklılık listesi (KB2.7), kaydet, Sıra sende (rol oynama + tablo), sonraki film, bitiş
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const COLS = [
    { x: 420, head: 'Sürat', col: F64.YOL, items: ['alınan yola bakar', 'yalnızca büyüklük', 'yön söylemez'] },
    { x: 960, head: 'İkisinde de', col: PAL.ink, items: ['hareketi anlatır', 'zaman önemlidir', 'birim: m/s, km/h'] },
    { x: 1500, head: 'Hız', col: F64.YER, items: ['yer değiştirmeye bakar', 'büyüklük + yön', 'ör. 5 m/s doğuya'] }
  ];
  E.scene({
    name: 'Karşılaştır', concept: 'Sürat ve hız: benzerlik ve farklılıklar', from: 'compare', to: 'task', trFrom: [960, 540],
    draw(ctx, t) {
      const sc = E.s('compare'), sr = E.s('record'), st = E.s('task');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 170, 1620, 740);
      P.write(ctx, 'Gözlem Defteri · Sürat ve Hız', 290, 260, E.seg(t, sc + 0.2, sc + 1.3), { size: 58 });
      const la = 1 - E.se(t, st - 0.2, st + 0.5);
      if (la > 0) E.layer(ctx, la, c => {
        // column headers + dividers
        COLS.forEach((cl, j) => {
          const at = sc + 1.2 + j * 3.6;
          P.write(c, cl.head, cl.x, 350, E.seg(t, at, at + 0.8), { size: 52, align: 'center', color: cl.col });
          if (t > at + 0.6) P.drawOn(c, P.bez([cl.x - 200, 372], [cl.x, 380], [cl.x + 200, 370], 20), E.se(t, at + 0.6, at + 1.0), { w: 3, color: cl.col });
          cl.items.forEach((it, i) => P.write(c, '• ' + it, cl.x - 225, 450 + i * 70, E.seg(t, at + 0.9 + i * 0.8, at + 1.7 + i * 0.8), { size: 40 }));
        });
        [690, 1230].forEach((x, i) => { if (t > sc + 1.0) line(c, [x, 320], [x, 650], { w: 2, alpha: 0.5, dry: false, seed: 4400 + i }); });
        INK.label(c, 'farklılık', 420, 690, { size: 30, align: 'center', alpha: 0.55 * E.se(t, sc + 11, sc + 12) });
        INK.label(c, 'benzerlik', 960, 690, { size: 30, align: 'center', alpha: 0.55 * E.se(t, sc + 11, sc + 12) });
        INK.label(c, 'farklılık', 1500, 690, { size: 30, align: 'center', alpha: 0.55 * E.se(t, sc + 11, sc + 12) });
        // summary line
        const rk = E.se(t, sr + 0.3, sr + 1.0);
        if (rk > 0) { c.save(); c.globalAlpha = rk; P.fillPts(c, [[300, 745], [1640, 740], [1642, 830], [302, 834]], PAL.light, 0.22); c.restore();
          P.write(c, 'Sürat: ne kadar hızlı?   Hız: ne kadar hızlı ve hangi yöne?', 960, 805, E.seg(t, sr + 0.6, sr + 2.6), { size: 46, align: 'center' }); }
      });
      // task card
      const tk = E.se(t, st, st + 0.7, 'out');
      if (tk > 0) E.layer(ctx, tk, c => {
        F64.card(c, 330, 290, 1590, 840, { seed: 4420 });
        P.write(c, 'Sıra sende!', 420, 390, E.seg(t, st + 0.3, st + 1.2), { size: 70, color: '#8A4A10' });
        P.write(c, 'Arkadaşınla sınıfta bir yol yürüyün.', 420, 490, E.seg(t, st + 1.0, st + 2.2), { size: 50 });
        P.write(c, 'Alınan yolu ve yer değiştirmeyi', 420, 560, E.seg(t, st + 1.8, st + 3.0), { size: 50 });
        P.write(c, 'tabloya kaydedin, karşılaştırın.', 420, 630, E.seg(t, st + 2.6, st + 3.8), { size: 50 });
        INK.label(c, 'Merak ettiğin soruları da deftere yaz!', 420, 740, { size: 38, alpha: 0.7 * E.se(t, st + 4.0, st + 4.8) });
        // footsteps sketch
        for (let i = 0; i < 6; i++) { const x = 1250 + (i % 2) * 40 + i * 18, y = 700 - i * 60; c.save(); c.globalAlpha = E.se(t, st + 1 + i * 0.3, st + 1.3 + i * 0.3); P.fillPts(c, circlePts(x, y, 14, 22, 16), PAL.ink, 0.6); c.restore(); }
        c.save(); c.globalAlpha = E.se(t, st + 3, st + 3.6); F64.varrow(c, [1240, 720], [1370, 400], 1, { w: 4, head: 16 }); c.restore();
      });
      const cheer = t > st + 0.6;
      DAMLA.draw(ctx, { x: 1690, y: 1040, s: 1.05, view: 'q3', flip: true, expr: cheer ? 'happy' : 'neutral', look: [-0.7, 0.2], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 1,
        arms: cheer ? [[-1, 0.4], [1, 2.6]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: cheer ? null : 'notebook' });
    }
  });
  E.scene({
    name: 'Sıradaki', concept: 'Sonraki film: Üreme çeşitleri', from: 'next', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sn = E.s('next');
      const hill = P.hillLine(E.W, 880);
      P.landscape(ctx, E.W, E.H, t, { hill, treeAt: [1500, P.hillY(hill, 1500) + 6] });
      // sprouting seedling
      const gk = E.se(t, sn + 0.5, sn + 3.5);
      const bx = 700, by = P.hillY(hill, 700) + 2;
      if (gk > 0) { line(ctx, [bx, by], [bx + 4, by - 120 * gk], { w: 5, color: PAL.life, dry: false }); if (gk > 0.5) { const s = (gk - 0.5) * 2; [[-1, 0.6], [1, 0.8]].forEach(([d, f], i) => { const lf = circlePts(bx + d * 32 * s, by - 120 * gk * f, 30 * s, 14 * s, 20, d * -0.4); P.fillPts(ctx, lf, PAL.life, 0.75); stroke(ctx, lf, { w: 2, closed: true, dry: false, seed: 4450 + i }); }); } }
      DAMLA.draw(ctx, { x: 960, y: P.hillY(hill, 960) + 4, s: 1.3, view: 'q3', flip: true, expr: 'happy', look: [-0.7, 0.3], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      E.inkText(ctx, 'Sıradaki gözlem:', 960, 250, t, sn + 0.6, 1e9, { size: 50, align: 'center', weight: 400 });
      E.inkText(ctx, '5 · Canlılar Nasıl Çoğalır?', 960, 340, t, sn + 1.2, 1e9, { size: 76, align: 'center' });
      F64.endCard(ctx, t, '4 · Ne Kadar Hızlı, Hangi Yöne?', 'FB.6.2.3');
    }
  });
})();
