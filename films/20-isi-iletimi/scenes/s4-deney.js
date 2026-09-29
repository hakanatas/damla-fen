// SAHNE 4 — Deney: sıcak sudaki çubukların uçlarındaki tereyağı + boncuk (FB.5.5.5 b: ayrıştırma için kanıt)
// Metallerin (çelik kaşık, bakır çubuk) boncukları AYNI ANDA düşer: TYMM gereği metaller kendi aralarında karşılaştırılmaz.
(function () {
  const { PAL, line, stroke, circlePts, wash, rng } = INK;
  const F = F20;
  const RODS = [
    { name: 'metal kaşık', col: F.STEEL, w: 12, x: 470, metal: true },
    { name: 'tahta çubuk', col: F.WOOD, w: 18, x: 730, metal: false },
    { name: 'bakır çubuk', col: F.COPPER, w: 12, x: 990, metal: true },
    { name: 'plastik kaşık', col: '#5E8FAE', w: 14, x: 1250, metal: false }
  ];
  E.scene({
    name: 'Boncuk deneyi', concept: 'Kanıt: ısı metal çubuklarda hızlı ilerler', from: 'setup', to: 'result', trFrom: [860, 700],
    draw(ctx, t) {
      const ss = E.s('setup'), sp = E.s('predict'), sw = E.s('watch'), sr = E.s('result');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      const bench = [[150, 830], [1500, 826], [1510, 866], [140, 870], [150, 830]]; P.fillPts(ctx, bench, '#E3D3B3'); wash(ctx, bench, '#8A6A45', 0.4, 3501); stroke(ctx, bench, { w: 3, closed: true, seed: 3502 });
      // wide bowl of hot water
      const bx0 = 320, bx1 = 1400, by = 828, wy = 700;
      const heatM = E.se(t, sw + 0.3, sr + 0.2, 'io'), heatN = E.se(t, sw + 0.3, sr + 6, 'io') * 0.22;
      const dropT = sr + 0.2;
      RODS.forEach((r, i) => {
        const a = [r.x, 790], b = [r.x + (i - 1.5) * 18, 330];
        F.rod(ctx, a, b, r.w, r.col, (r.metal ? heatM : heatN) * 1.05, t, { shimmer: r.metal, seed: 3510 + i * 3 });
        // butter + bead at the top
        const top = [b[0], b[1] + 16];
        const melt = r.metal ? E.se(t, dropT - 1.2, dropT) : 0;
        P.fillPts(ctx, circlePts(top[0] + r.w * 0.6, top[1], 12 * (1 - melt * 0.7), 16 * (1 - melt * 0.5), 20), '#F2D98A', 0.95);
        stroke(ctx, circlePts(top[0] + r.w * 0.6, top[1], 12 * (1 - melt * 0.7), 16 * (1 - melt * 0.5), 20), { w: 1.8, closed: true, dry: false });
        let bxp = top[0] + r.w * 0.6 + 16, byp = top[1];
        if (r.metal && t > dropT) { const u = E.clamp((t - dropT) / 0.7); byp = top[1] + 330 * u * u; bxp += 20 * u; if (u >= 1) byp = 800 - 12; }
        P.fillPts(ctx, circlePts(bxp, byp, 14, 14, 20), F.RED, 0.85); stroke(ctx, circlePts(bxp, byp, 14, 14, 20), { w: 2, closed: true, dry: false });
        INK.label(ctx, r.name, b[0], 250, { size: 36, weight: 700, align: 'center', rot: 0 });
        // prediction marks
        const qk = E.se(t, sp + 1.2 + i * 0.4, sp + 1.8 + i * 0.4) * (1 - E.se(t, sw, sw + 0.5));
        if (qk > 0) INK.label(ctx, '?', b[0], 200, { size: 60, weight: 700, color: '#8A4A10', align: 'center', alpha: qk });
        // result marks
        const rk = E.se(t, sr + 1.5 + (r.metal ? 0 : 1.2), sr + 2.2 + (r.metal ? 0 : 1.2));
        if (rk > 0) { P.write(ctx, r.metal ? 'düştü' : 'duruyor', b[0], 200, rk, { size: 40, align: 'center', color: r.metal ? F.HEAT : PAL.water }); }
      });
      // water + bowl drawn over the rod bottoms
      const bowl = [[bx0, wy - 10], [bx1, wy - 10], [bx1 - 40, by], [bx0 + 40, by], [bx0, wy - 10]];
      const water = [[bx0 + 8, wy], [bx1 - 8, wy], [bx1 - 44, by - 6], [bx0 + 44, by - 6]];
      P.fillPts(ctx, water, '#E7C9B6', 0.75); wash(ctx, water, F.HEAT, 0.28, 3520, { bleed: 1.2 });
      ctx.save(); ctx.globalAlpha = 0.14; ctx.fillStyle = PAL.white; P.path(ctx, bowl); ctx.fill(); ctx.restore();
      stroke(ctx, bowl, { w: 3.4, seed: 3521 });
      F.steam(ctx, 860, wy - 6, 900, 70, 0.6, t, 3530);
      INK.label(ctx, 'sıcak su', 860, 790, { size: 36, weight: 700, color: F.HEAT, align: 'center' });
      // clock
      const ck = E.se(t, sw, sw + 0.6) * (1 - E.se(t, sr + 3.6, sr + 4.2));
      if (ck > 0) { ctx.save(); ctx.globalAlpha = ck; P.icon.clock(ctx, 1600, 330, 0.9, (t - sw) * 1.4); ctx.restore(); INK.label(ctx, 'bekle, gözle', 1600, 430, { size: 34, align: 'center', alpha: ck }); }
      // evidence card
      const ek = E.se(t, sr + 4.2, sr + 5, 'out');
      if (ek > 0) E.layer(ctx, ek, c => {
        F.card(c, 1500, 170, 370, 330, { fill: '#F6E7B8', seed: 3540 });
        INK.label(c, 'Kanıt', 1685, 228, { size: 44, weight: 700, align: 'center', color: '#8A4A10' });
        ['Isı metallerde', 'uca hızla ulaştı.', 'Tahta ve plastikte', 'çok yavaş ilerledi.'].forEach((s, i) => INK.label(c, s, 1685, 295 + i * 48 + (i > 1 ? 18 : 0), { size: 34, align: 'center', rot: 0 }));
      });
      DAMLA.draw(ctx, {
        x: 1680, y: 900, s: 1.0, view: 'q3', flip: true, t, seed: 4, blink: E.blink(t, 5), squash: E.breath(t), talk: E.talk(t),
        expr: t > sr ? 'surprised' : (t > sp ? 'thinking' : 'curious'), look: [-0.8, -0.4], arms: [[-1, 0.35], [1, 2.2]]
      });
    }
  });
})();
