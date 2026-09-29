// SAHNE 7 — Gruplandır ve etiketle: katı, sıvı, gazdan ikişer örnek + anlam çözümleme tablosu (FB.5.5.1 b, c, ç)
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const F = F16;
  const RED = '#A23A2A';
  const ITEMS = [
    { name: 'taş', col: 0, d: (c, x, y) => F.stone(c, x, y, 0.95) },
    { name: 'su', col: 1, d: (c, x, y) => F.glass(c, x - 42, y - 110, 84, 108, 72, { seed: 41 }) },
    { name: 'hava', col: 2, d: (c, x, y) => { line(c, [x, y], [x + 4, y - 30], { w: 1.4, dry: false }); F.balloon(c, x + 4, y - 30, 0.8, 1); } },
    { name: 'tahta', col: 0, d: (c, x, y) => F.block(c, x - 60, y - 64, 120, 62) },
    { name: 'zeytinyağı', col: 1, d: (c, x, y) => F.bottle(c, x, y, 0.72, '#A8A03A') },
    { name: 'su buharı', col: 2, d: (c, x, y, t) => { F.cup(c, x, y, 0.75); F.steam(c, x, y - 76, 0.8, t); } }
  ];
  const CX = [520, 960, 1400], NM = ['KATI', 'SIVI', 'GAZ'];
  function sort(ctx, t) {
    const ss = E.s('sort');
    P.write(ctx, 'Gruplandır ve etiketle', 290, 190, E.seg(t, ss + 0.1, ss + 1.3), { size: 60 });
    CX.forEach((x, i) => {
      const k = E.se(t, ss + 0.4 + i * 0.3, ss + 1.0 + i * 0.3); if (k <= 0) return;
      ctx.save(); ctx.globalAlpha = k * 0.7; dashed(ctx, F.rectPts(x - 195, 300, x + 195, 690), { w: 2.4, on: 12, off: 8 }); ctx.restore();
      INK.label(ctx, NM[i], x, 280, { size: 54, weight: 700, align: 'center', alpha: k, color: PAL.water });
    });
    ITEMS.forEach((it, i) => {
      const at = ss + 1.6 + i * 0.95;
      const k0 = E.se(t, ss + 0.8 + i * 0.1, ss + 1.3 + i * 0.1, 'out'); if (k0 <= 0) return;
      const m = E.se(t, at, at + 0.8);
      const sx = 330 + i * 250, sy = 850;
      const slot = Math.floor(i / 3); const tx = CX[it.col] + (slot ? 95 : -95), ty = 590;
      const x = E.lerp(sx, tx, m), y = E.lerp(sy, ty, m) - Math.sin(m * Math.PI) * 120;
      const sc = E.lerp(0.75, 1, m) * P.pop(k0);
      ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.translate(-x, -y); it.d(ctx, x, y, t); ctx.restore();
      INK.label(ctx, it.name, x, y + 50, { size: m > 0.9 ? 36 : 30, weight: 700, align: 'center', alpha: 0.9 });
    });
  }
  function table(ctx, t) {
    const st = E.s('table');
    const x0 = 230, fw = 470, cw = 345, y0 = 175, hh = 115, rh = 82;
    const xs = [x0 + fw, x0 + fw + cw, x0 + fw + 2 * cw, x0 + fw + 3 * cw];
    const ROWS = [
      ['tanecikli', ['✓', '✓', '✓']],
      ['tanecikler arası boşluk', ['çok az', 'az', 'çok fazla']],
      ['titreşim', ['✓', '✓', '✓']],
      ['dönme ve öteleme', ['✗', '✓', '✓']],
      ['belirli şekil', ['✓', '✗', '✗']],
      ['belirli hacim', ['✓', '✓', '✗']],
      ['sıkıştırılabilir', ['✗', '✗ (varsayım)', '✓']]
    ];
    const yEnd = y0 + hh + ROWS.length * rh;
    const gk = E.se(t, st + 0.1, st + 0.9);
    ctx.save(); ctx.globalAlpha = gk;
    [y0, y0 + hh].concat(ROWS.map((_, i) => y0 + hh + (i + 1) * rh)).forEach((y, i) => line(ctx, [x0, y], [xs[3], y], { w: i < 2 ? 3 : 1.8, dry: false, seed: 60 + i, alpha: i < 2 ? 1 : 0.6 }));
    [x0].concat(xs).forEach((x, i) => line(ctx, [x, y0], [x, yEnd], { w: i === 1 ? 3 : 1.8, dry: false, seed: 70 + i }));
    P.fillPts(ctx, [[x0, y0], [xs[3], y0], [xs[3], y0 + hh], [x0, y0 + hh]], PAL.water, 0.08);
    INK.label(ctx, 'anlam çözümleme tablosu', x0 + fw / 2, y0 + 70, { size: 34, weight: 700, align: 'center', alpha: 0.7 });
    const EX = ['taş, tahta', 'su, zeytinyağı', 'hava, su buharı'];
    NM.forEach((n, i) => { const cx = (xs[i] + xs[i + 1]) / 2; INK.label(ctx, n, cx, y0 + 52, { size: 46, weight: 700, align: 'center', color: PAL.water }); INK.label(ctx, EX[i], cx, y0 + 96, { size: 34, align: 'center', alpha: 0.8 }); });
    ctx.restore();
    ROWS.forEach(([f, cells], r) => {
      const at = st + 0.9 + r * 1.05, y = y0 + hh + r * rh + rh / 2;
      P.write(ctx, f, x0 + 22, y + 13, E.seg(t, at, at + 0.6), { size: 38 });
      cells.forEach((cv, j) => {
        const cx = (xs[j] + xs[j + 1]) / 2, k = E.se(t, at + 0.3 + j * 0.15, at + 0.7 + j * 0.15);
        if (k <= 0) return;
        if (cv === '✓') P.check(ctx, cx - 6, y - 8, 40, k, { w: 6, color: PAL.life });
        else if (cv.startsWith('✗')) { P.cross(ctx, cv.length > 1 ? cx - 105 : cx, y, 15, k, { w: 5, color: RED }); if (cv.length > 1) INK.label(ctx, 'varsayım', cx - 75, y + 12, { size: 34, alpha: 0.8 * k }); }
        else INK.label(ctx, cv, cx, y + 12, { size: 38, weight: 700, align: 'center', alpha: k, color: '#8A4A10' });
      });
    });
  }
  E.scene({
    name: 'Gruplandırma', concept: 'Katı, sıvı, gaz olarak gruplandırma ve etiketleme', from: 'sort', to: 'table', trFrom: [960, 540],
    draw(ctx, t) {
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 70, 1620, 880);
      const a = E.se(t, E.s('table') - 0.4, E.s('table') + 0.3);
      if (a < 1) E.layer(ctx, 1 - a, c => sort(c, t));
      if (a > 0) E.layer(ctx, a, c => table(c, t));
    }
  });
})();
