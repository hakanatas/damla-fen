// SAHNE 1–2 — Merak ve beyin fırtınası; hayvanlarda eşeyli ve eşeysiz üreme (sorgulama sonucunda fark ettirilir)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F07;
  const CARDS = [['kedi', 'doğurur'], ['tavuk', 'yumurtlar'], ['hidra', '?'], ['deniz yıldızı', '?']];
  E.scene({
    name: 'Merak', concept: 'Beyin fırtınası: hayvanlar nasıl çoğalır?', from: 'title', to: 'storm',
    draw(ctx, t) {
      const hill = P.hillLine(E.W);
      const sh = E.s('hello'), ss = E.s('storm');
      P.landscape(ctx, E.W, E.H, t, { hill, treeAt: [160, P.hillY(hill, 160) + 6] });
      const cx = 1120; F.cat(ctx, cx, P.hillY(hill, cx) + 6, 0.8, { base: '#C98F5A', seed: 5200 }, t); F.cat(ctx, cx + 110, P.hillY(hill, cx + 110) + 6, 0.42, { base: '#C98F5A', stripe: '#8A5A30', seed: 5280 }, t + 1);
      const hx = 1500; F.hen(ctx, hx, P.hillY(hill, hx) + 6, 0.9, t); F.chick(ctx, hx + 150, P.hillY(hill, hx + 150) + 6, 0.9, t, 1); F.chick(ctx, hx + 230, P.hillY(hill, hx + 230) + 6, 0.8, t, 2);
      const dx = 560, dy = P.hillY(hill, dx) + 4;
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.35, view: 'q3', expr: t > ss ? 'thinking' : 'happy', look: [0.8, -0.2], blink: E.blink(t, 2), squash: E.breath(t), t, seed: 1,
        arms: t > ss ? [[-1, 0.3], [1, [30, -86]]] : (t > sh + 0.3 ? [[-1, 0.35], [1, 2.35 + 0.35 * Math.sin(t * 9)]] : [[-1, 0.35], [1, 0.5]]) });
      CARDS.forEach(([a, b], i) => {
        const at = ss + [1.5, 3.2, 5.2, 6.3][i], k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
        const x = 420 + i * 360, y = 300, s = P.pop(k);
        ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
        const c = F.rrect(0, 0, 320, 150, 22, 6); P.fillPts(ctx, c, '#FBF8F1'); INK.wash(ctx, c, i < 2 ? PAL.light : F.LIFE, 0.2, 40 + i, { bleed: 1, blooms: 0 }); stroke(ctx, c, { w: 2.6, closed: true, seed: 44 + i });
        ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.font = `700 ${F.fit(ctx, a, 44, 290)}px Kalam`; ctx.fillText(a, 0, -8);
        ctx.font = `700 ${b === '?' ? 60 : 40}px Kalam`; ctx.fillStyle = b === '?' ? F.LIFE_D : PAL.ink; ctx.fillText(b, 0, b === '?' ? 58 : 48);
        ctx.restore();
      });
      F.title(ctx, t, '7', 'Yumurtadan Kelebeğe: Hayvanlarda Üreme', '3');
    }
  });

  E.scene({
    name: 'Eşeyli · eşeysiz', concept: 'Hayvanlarda eşeyli ve eşeysiz üreme', from: 'both', to: 'both', trFrom: [960, 540],
    draw(ctx, t) {
      const s0 = E.s('both');
      line(ctx, [960, 200], [960, 880], { w: 3, seed: 60, alpha: E.se(t, s0, s0 + 0.6) });
      P.write(ctx, 'Eşeyli üreme', 480, 250, E.seg(t, s0 + 0.3, s0 + 1.3), { size: 60, align: 'center', color: '#8E4A6A' });
      P.write(ctx, '(hayvanların çoğu)', 480, 310, E.seg(t, s0 + 1.0, s0 + 2.0), { size: 36, align: 'center', weight: 400 });
      F.cat(ctx, 330, 700, 1.0, { base: '#C98F5A', seed: 5200 }, t); F.cat(ctx, 630, 700, 1.0, { base: '#8E8A80', stripe: '#4E4A44', seed: 5240 }, t);
      F.fish(ctx, 480, 820, 0.8, t);
      const kr = E.se(t, s0 + 3.2, s0 + 4.2);
      P.write(ctx, 'Eşeysiz de üreyebilir', 1440, 250, kr, { size: 56, align: 'center', color: F.LIFE_D });
      if (kr > 0) E.layer(ctx, kr, c => {
        const water = [[1000, 340], [1880, 336], [1880, 880], [1000, 880]]; INK.wash(c, water, PAL.water, 0.1, 61, { bleed: 3, blooms: 0 });
        F.hydra(c, 1180, 860, 1.4, t, E.se(t, s0 + 4.0, s0 + 8.5, 'sine'));
        INK.label(c, 'hidra: tomurcuklanma', 1200, 420, { size: 34, weight: 700, align: 'center' });
        const g = E.se(t, s0 + 5.0, s0 + 8.5); F.starfish(c, 1640, 650, 110, 0, [1, E.lerp(0.14, 1, g), E.lerp(0.14, 1, g), E.lerp(0.14, 1, g), E.lerp(0.14, 1, g)], 3, { newArms: g < 1 ? [1, 2, 3, 4] : [] });
        INK.label(c, 'deniz yıldızı: rejenerasyon', 1620, 830, { size: 34, weight: 700, align: 'center' });
      });
    }
  });
})();
