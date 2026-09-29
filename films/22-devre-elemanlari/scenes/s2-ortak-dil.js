// SAHNE 2 — Merak: herkes farklı çizerse kafalar karışır → semboller ortak dildir (TYMM: sembol kullanmanın ortak bilimsel dil açısından önemi; köprü kurma: günlük hayattaki semboller)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const BLUE = '#2E6A8C';
  // üç farklı "pil" çizimi
  const doodles = [
    (ctx) => { const b = CK.densify([[-80, -34], [70, -34], [70, 34], [-80, 34], [-80, -34]]); stroke(ctx, INK.wobble(b, 3, 5), { w: 3, closed: true }); stroke(ctx, [[70, -12], [86, -12], [86, 12], [70, 12]], { w: 3 }); stroke(ctx, circlePts(-80, 0, 12, 34, 20, Math.PI / 2).slice(0, 11), { w: 2 }); },
    (ctx) => { const b = [[-70, -50], [70, -50], [70, 50], [-70, 50], [-70, -50]]; stroke(ctx, INK.wobble(CK.densify(b), 3, 7), { w: 3, closed: true }); ctx.font = '700 44px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText('PİL', -8, 14); stroke(ctx, [[42, -38], [28, -4], [46, -4], [30, 34]], { w: 3, color: CK.AMBD }); },
    (ctx) => { stroke(ctx, INK.wobble(circlePts(0, 0, 58, 58, 40), 3, 9), { w: 3, closed: true }); ctx.font = '700 46px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText('+  −', 0, 16); line(ctx, [0, -58], [0, -80], { w: 3 }); line(ctx, [0, 58], [0, 80], { w: 3 }); }
  ];
  function sign(ctx, kind) {
    if (kind === 'yon') { const c = circlePts(0, 0, 70, 70, 50); P.fillPts(ctx, c, BLUE, 0.92); stroke(ctx, c, { w: 3, closed: true }); stroke(ctx, circlePts(0, 0, 62, 62, 50), { w: 3, closed: true, color: PAL.white, dry: false }); P.arrow(ctx, [-34, 26], [36, -10], 1, { w: 9, color: PAL.white, head: 22, bend: 30 }); return; }
    const b = [[-68, -68], [68, -68], [68, 68], [-68, 68], [-68, -68]]; P.fillPts(ctx, b, BLUE, 0.92); stroke(ctx, b, { w: 3, closed: true });
    stroke(ctx, [[-58, -58], [58, -58], [58, 58], [-58, 58], [-58, -58]], { w: 3, closed: true, color: PAL.white, dry: false });
    ctx.font = '700 96px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.white; ctx.fillText(kind, 0, 34);
  }
  E.scene({
    name: 'Ortak dil', concept: 'Sembol: bilimin ortak dili', from: 'confuse', to: 'common', trFrom: [760, 330],
    draw(ctx, t) {
      const sc = E.s('confuse'), sdl = E.s('daily'), scm = E.s('common');
      ctx.save();
      ctx.fillStyle = 'rgba(138,106,69,0.18)'; ctx.fillRect(0, 0, E.W, E.H);
      E.cam(ctx, { x: 960, y: 540, z: 1 + 0.015 * Math.sin(t * 0.3) });
      P.notebook(ctx, 150, 80, 1620, 900);

      // --- 1) aynı pil, üç farklı çizim ---
      const outA = 1 - E.se(t, sdl - 0.2, sdl + 0.6);
      if (outA > 0) E.layer(ctx, outA, c => {
        P.write(c, 'Aynı pil, üç farklı çizim!', 300, 200, E.seg(t, sc + 0.3, sc + 1.8), { size: 60 });
        [480, 900, 1320].forEach((x, i) => {
          const at = sc + 1.0 + i * 1.1, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          c.save(); c.translate(x, 500); c.rotate([-0.04, 0.03, -0.02][i]); c.scale(P.pop(k), P.pop(k));
          CK.card(c, -170, -150, 340, 300, { seed: 200 + i });
          c.save(); c.scale(1.45, 1.45); doodles[i](c); c.restore();
          c.restore();
          INK.label(c, (i + 1) + '. çizim', x, 700, { size: 36, align: 'center', weight: 700, alpha: k });
          const kq = E.se(t, sc + 4.6 + i * 0.35, sc + 5.2 + i * 0.35, 'out');
          if (kq > 0) INK.label(c, '?', x + 130, 380, { size: 90 * P.pop(kq), weight: 700, color: CK.AMBD, align: 'center' });
        });
      });

      // --- 2) günlük hayatta semboller: trafik levhaları ---
      const inB = E.se(t, sdl + 0.2, sdl + 0.9), outB = 1 - E.se(t, scm - 0.2, scm + 0.6);
      if (inB * outB > 0) E.layer(ctx, inB * outB, c => {
        P.write(c, 'Günlük hayatta semboller', 300, 200, E.seg(t, sdl + 0.4, sdl + 1.8), { size: 60 });
        [['P', 'park yeri', 520], ['H', 'hastane', 960], ['yon', 'mecburi yön', 1400]].forEach(([kind, name, x], i) => {
          const at = sdl + 1.0 + i * 0.9, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          c.save(); c.translate(x, 470); c.scale(P.pop(k) * 1.25, P.pop(k) * 1.25); line(c, [0, 60], [0, 170], { w: 7, color: '#6B6660' }); sign(c, kind); c.restore();
          P.write(c, name, x, 720, E.seg(t, at + 0.4, at + 1.3), { size: 42, align: 'center' });
        });
        P.write(c, 'Herkes aynı anlamı okur.', 960, 830, E.seg(t, sdl + 4.4, sdl + 5.8), { size: 50, align: 'center', color: '#8A4A10' });
      });

      // --- 3) bir sembol, her dilde aynı ---
      const inC = E.se(t, scm + 0.2, scm + 1.0);
      if (inC > 0) E.layer(ctx, inC, c => {
        P.write(c, 'Bir sembol, herkes için aynı', 300, 200, E.seg(t, scm + 0.4, scm + 1.8), { size: 60 });
        CK.sym(c, 'pil', 960, 500, 2.2, { k: E.seg(t, scm + 0.6, scm + 2.2) });
        const words = [['pil', 'Türkçe', 470, 360], ['battery', 'İngilizce', 1450, 360], ['pile', 'Fransızca', 470, 650], ['Batterie', 'Almanca', 1450, 650]];
        words.forEach(([w, lang, x, y], i) => {
          const at = scm + 2.0 + i * 0.6, k = E.se(t, at, at + 0.5); if (k <= 0) return;
          c.save(); c.globalAlpha = k;
          INK.label(c, w, x, y, { size: 50, weight: 700, align: 'center' });
          INK.label(c, lang, x, y + 42, { size: 30, align: 'center', alpha: 0.6 });
          INK.leader(c, [x + (x < 960 ? 90 : -90), y - 10], [x < 960 ? 800 : 1120, y < 500 ? 440 : 560], { bend: 0.1 });
          c.restore();
        });
        const kb = E.se(t, scm + 4.4, scm + 5.0, 'out');
        if (kb > 0) {
          c.save(); c.translate(960, 815); c.rotate(-0.015); c.scale(P.pop(kb), P.pop(kb));
          CK.card(c, -420, -60, 840, 110, { fill: '#F6E7B8', seed: 230 });
          c.font = '700 54px Kalam'; c.textAlign = 'center'; c.fillStyle = PAL.ink; c.fillText('Semboller = ortak bilimsel dil', 0, 16);
          c.restore();
        }
      });

      // Damla köşeden bakıyor
      const pk = E.se(t, sc + 0.2, sc + 1.0, 'out');
      const expr = t < sdl ? (t > sc + 4.5 ? 'thinking' : 'curious') : t < scm ? 'happy' : 'determined';
      DAMLA.draw(ctx, {
        x: 1650, y: 990 + (1 - pk) * 300, s: 0.95, view: 'q3', flip: true, expr, look: [-0.8, -0.4], blink: E.blink(t, 6), squash: E.breath(t), t, talk: E.talk(t), seed: 2,
        arms: t > sc + 4.5 && t < sdl ? [[-1, 0.4], [1, [30, -86]]] : [[-1, 0.35], [1, 0.4]]
      });
      ctx.restore();
    }
  });
})();
