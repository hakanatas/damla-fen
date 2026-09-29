// SAHNE 1 — Kış akşamı: bacalardan duman; merak sorusu
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F622;
  const HILL = P.hillLine(E.W, 820);
  F.HILL = HILL;
  F.winter = (ctx, t, o = {}) => {
    const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,70,110,0.28)'); g.addColorStop(0.75, 'rgba(180,170,190,0.12)'); g.addColorStop(1, 'rgba(46,70,110,0.05)');
    ctx.fillStyle = g; ctx.fillRect(-200, -200, E.W + 400, E.H + 400);
    // kış havası: pus
    if (o.haze) { ctx.save(); ctx.globalAlpha = o.haze; const hz = ctx.createLinearGradient(0, 200, 0, 800); hz.addColorStop(0, 'rgba(111,107,102,0)'); hz.addColorStop(1, 'rgba(111,107,102,0.55)'); ctx.fillStyle = hz; ctx.fillRect(-200, 0, E.W + 400, 900); ctx.restore(); }
    const houses = o.houses ?? [[1000, 0.8, '#B5553F'], [1230, 0.95, '#8A6A45'], [1470, 0.85, '#6F6B66'], [1720, 1.0, '#B5553F']];
    houses.forEach(([x, s, col], i) => F.house(ctx, x, P.hillY(HILL, x) + 10, s, t, { col, seed: i * 3, smokeA: o.smokeA ?? 0.5 }));
    const gr = HILL.concat([[E.W + 200, E.H + 200], [-200, E.H + 200]]);
    P.fillPts(ctx, gr, '#F4F1EA', 1); wash(ctx, gr, '#9CB3C4', 0.2, 601, { bleed: 3, blooms: 2 }); stroke(ctx, HILL, { w: 4, seed: 602, taper: 0.03 });
    F.pine(ctx, 180, P.hillY(HILL, 180) + 8, 1.6, '#4F6E4A'); F.pine(ctx, 290, P.hillY(HILL, 290) + 8, 1.2, '#4F6E4A');
    F.snow(ctx, t, o.flakes ?? 45, 7, 0.9);
  };
  F.damla = (ctx, t, o = {}) => {
    const dx = o.x ?? 560, dy = o.y ?? (P.hillY(HILL, dx) + 4);
    DAMLA.draw(ctx, { x: dx, y: dy, s: o.s ?? 1.35, view: o.view ?? 'q3', expr: o.expr ?? 'curious', look: o.look ?? [0.7, -0.3], blink: E.blink(t, 3), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: o.arms ?? [[-1, 0.4], [1, 0.5]], prop: o.prop, flip: o.flip });
  };
  E.scene({
    name: 'Kış akşamı', concept: 'Isınma ihtiyacı; merak', from: 'title', to: 'question',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('question');
      ctx.save(); E.cam(ctx, { x: 960, y: 540, z: 1.06 - 0.06 * E.se(t, 0, sh + 3) });
      F.winter(ctx, t);
      const shiver = t < sq ? Math.sin(t * 30) * 0.02 : 0;
      F.damla(ctx, t, { expr: t > sq ? 'curious' : 'surprised', view: 'q3', arms: [[-1, [-30, -120]], [1, [30, -118]]], look: t > sh ? [0.8, -0.4] : [0, 0] });
      ctx.restore();
      // soru baloncuğu
      const bk = E.se(t, sq + 0.2, sq + 0.9);
      if (bk > 0) {
        P.bubble(ctx, 1000, 330, 900, 230, [700, 560], bk, 4);
        P.write(ctx, 'Hangi yakıtlarla ısınıyoruz?', 1000, 315, E.seg(t, sq + 0.6, sq + 1.8), { size: 50, align: 'center' });
        P.write(ctx, 'Bizi ve çevreyi nasıl etkiliyor?', 1000, 385, E.seg(t, sq + 2.2, sq + 3.4), { size: 46, align: 'center', color: F.HEAT });
      }
      // başlık
      const t1 = E.e('title') + 1.2;
      if (t < t1) { const k = Math.min(E.se(t, 0.3, 1.0), 1 - E.se(t, t1 - 0.6, t1)); ctx.save(); ctx.globalAlpha = 0.82 * k; ctx.fillStyle = PAL.paper; ctx.fillRect(0, 120, E.W, 270); ctx.restore(); }
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '22 · Isınma Yakıtları ve Çevre', 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 6. sınıf · Ünite 7', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: F.HEAT }); ctx.restore(); }
    }
  });
})();
