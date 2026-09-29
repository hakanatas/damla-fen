// Film 5'e özel çizimler (sahne değil): elma ağacı, saksı, ok yayı, bisiklet, kum havuzu, kuş. Global: window.F75
window.F75 = (function () {
  const { PAL, line, stroke, circlePts, wash, wobble } = INK;
  const A = {};
  A.apple = (ctx, x, y, r = 22, seed = 5000) => { const b = wobble(circlePts(x, y, r, r * 0.92, 30), 1, seed); P.fillPts(ctx, b, '#F2D3B8'); wash(ctx, b, '#B5553F', 0.65, seed + 1, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.4, closed: true, seed: seed + 2 }); line(ctx, [x, y - r * 0.9], [x + 3, y - r * 1.4], { w: 2, dry: false }); };
  A.tree = (ctx, x, gy, s = 1, t = 0, apple = true) => {
    line(ctx, [x, gy], [x + 6 * s, gy - 170 * s], { w: 10 * s, seed: 5010, taper: 0.1 });
    line(ctx, [x + 4 * s, gy - 120 * s], [x + 70 * s, gy - 190 * s], { w: 5 * s, seed: 5011 });
    const crown = wobble(circlePts(x + 10 * s + Math.sin(t * 0.9) * 2, gy - 240 * s, 120 * s, 95 * s, 50), 8 * s, 5012);
    wash(ctx, crown, PAL.life, 0.45, 5013, { bleed: 3 }); stroke(ctx, crown, { w: 3, closed: true, seed: 5014 });
    if (apple) A.apple(ctx, x + 60 * s, gy - 170 * s, 20 * s, 5020);
    return [x + 60 * s, gy - 170 * s];
  };
  A.pot = (ctx, x, by, s = 1) => { // saksı (alt orta by)
    const p = [[x - 40 * s, by - 70 * s], [x + 40 * s, by - 70 * s], [x + 30 * s, by], [x - 30 * s, by], [x - 40 * s, by - 70 * s]];
    P.fillPts(ctx, p, '#E6C3A8'); wash(ctx, p, '#B5553F', 0.5, 5030, { bleed: 1, blooms: 0 }); stroke(ctx, p, { w: 2.6, closed: true, seed: 5031 });
    for (let i = -1; i <= 1; i++) { const lf = wobble(circlePts(x + i * 22 * s, by - 100 * s - (i ? 0 : 14 * s), 16 * s, 30 * s, 20, i * 0.4), 1, 5032 + i); wash(ctx, lf, PAL.life, 0.6, 5035 + i, { bleed: 1, blooms: 0 }); stroke(ctx, lf, { w: 2, closed: true, seed: 5038 + i }); }
  };
  A.bow = (ctx, x, y, s = 1, pull = 1) => { // okçuluk yayı, sağa bakar; pull 0..1 gerilme
    const top = [x, y - 90 * s], bot = [x, y + 90 * s], back = [x - 70 * s * pull, y];
    stroke(ctx, P.bez(top, [x + 70 * s, y], bot, 30), { w: 6 * s, seed: 5040, color: '#6B5236' });
    line(ctx, top, back, { w: 1.6, dry: false }); line(ctx, back, bot, { w: 1.6, dry: false });
    line(ctx, back, [back[0] + 150 * s, y], { w: 3, dry: false, seed: 5041 }); INK.arrowHead(ctx, [back[0] + 100 * s, y], [back[0] + 150 * s, y], 12 * s, { w: 3 });
  };
  A.bike = (ctx, x, y, s = 1, t = 0) => { // y = zemin
    const r = 34 * s; const w1 = [x - 55 * s, y - r], w2 = [x + 55 * s, y - r];
    [w1, w2].forEach((w, i) => { stroke(ctx, circlePts(w[0], w[1], r, r, 30), { w: 3, closed: true, seed: 5050 + i }); const a = -t * 6; line(ctx, [w[0] - Math.cos(a) * r, w[1] - Math.sin(a) * r], [w[0] + Math.cos(a) * r, w[1] + Math.sin(a) * r], { w: 1.2, dry: false }); });
    const seat = [x - 18 * s, y - r - 50 * s], bar = [x + 40 * s, y - r - 58 * s], ped = [x, y - r];
    [[w1, ped], [ped, seat], [seat, w1], [ped, [x + 30 * s, y - r - 40 * s]], [[x + 30 * s, y - r - 40 * s], seat], [[x + 30 * s, y - r - 40 * s], w2], [[x + 30 * s, y - r - 40 * s], bar]].forEach(([a, b], i) => line(ctx, a, b, { w: 3.4, color: PAL.water, dry: false, seed: 5060 + i }));
    line(ctx, [seat[0] - 12 * s, seat[1]], [seat[0] + 12 * s, seat[1]], { w: 5, dry: false });
  };
  A.motion = (ctx, x, y, n = 3, len = 60, a = 0.5) => { for (let i = 0; i < n; i++) line(ctx, [x - i * 8, y - 16 + i * 16], [x - len - i * 8, y - 16 + i * 16], { w: 2.4, alpha: a, dry: false, seed: 5070 + i }); };
  // kum havuzu: x0..x1, üst y; çukur (cx, derinlik d, genişlik w)
  A.sand = (ctx, x0, x1, y, pits = []) => {
    const top = []; for (let x = x0; x <= x1; x += 6) { let yy = y; pits.forEach(([cx, d, w]) => { const u = (x - cx) / w; if (Math.abs(u) < 1) yy += d * (1 - u * u); }); top.push([x, yy]); }
    const poly = top.concat([[x1, y + 110], [x0, y + 110]]);
    P.fillPts(ctx, poly, '#EBD9AE'); wash(ctx, poly, '#C9A55A', 0.45, 5080, { bleed: 1.5, blooms: 2 });
    stroke(ctx, top, { w: 2.6, seed: 5081, taper: 0.02 });
    stroke(ctx, F7E.rect(x0 - 12, y - 20, x1 + 12, y + 110), { w: 3, closed: true, seed: 5082 });
  };
  A.bird = (ctx, x, y, s = 1, t = 0) => {
    const b = circlePts(x, y, 46 * s, 24 * s, 30); P.fillPts(ctx, b, PAL.white); wash(ctx, b, '#6F7E8A', 0.5, 5090, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.6, closed: true, seed: 5091 });
    const hd = circlePts(x + 46 * s, y - 16 * s, 17 * s, 16 * s, 20); P.fillPts(ctx, hd, PAL.white); wash(ctx, hd, '#6F7E8A', 0.5, 5092, { bleed: 1, blooms: 0 }); stroke(ctx, hd, { w: 2.4, closed: true, seed: 5093 });
    P.fillPts(ctx, [[x + 62 * s, y - 20 * s], [x + 84 * s, y - 14 * s], [x + 62 * s, y - 10 * s]], PAL.light); INK.inkDot(ctx, x + 50 * s, y - 20 * s, 2.4 * s);
    const f = Math.sin(t * 10) * 50 * s; stroke(ctx, P.bez([x - 10 * s, y - 8 * s], [x - 30 * s, y - 40 * s - f * 0.5], [x - 70 * s, y - 20 * s - f], 16), { w: 3.4, seed: 5094 });
    stroke(ctx, [[x - 44 * s, y], [x - 80 * s, y - 8 * s], [x - 76 * s, y + 10 * s], [x - 44 * s, y + 4 * s]], { w: 2.4, seed: 5095 });
  };
  return A;
})();
