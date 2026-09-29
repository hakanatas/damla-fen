// SAHNE 5 — Değişken: kaynak–cisim mesafesi (ekran ve lamba sabit). Gölge boyu hesaplanır: G = h · D / d
// (TYMM: "noktasal ışık kaynağı ile saydam olmayan cisim arasındaki mesafeye göre tam gölgenin boyu"; "Ekran sabit tutularak")
(function () {
  const { PAL, line, stroke, circlePts, arrowHead } = INK;
  const F = F15;
  const X0 = 400, PX = 10, D = 100, h = 10, AY = 500;   // lamp at 0 cm, screen at 100 cm, object 10 cm tall, 10 px per cm
  const fmt = v => (Math.round(v * 10) / 10).toString().replace('.', ',');

  function dist(t) {
    const sc = E.s('closer'), sf = E.s('farther'), sd = E.s('data');
    let d = 50;
    if (t >= sc) d = E.lerp(50, 20, E.se(t, sc + 0.5, sc + 3.5));
    if (t >= sf) d = E.lerp(20, 80, E.se(t, sf + 0.5, sf + 4.0));
    if (t >= sd) d = E.lerp(80, 50, E.se(t, sd + 0.2, sd + 1.4));
    return d;
  }

  E.scene({
    name: 'Mesafe', concept: 'Kaynak–cisim mesafesi ve gölge boyu', from: 'varq', to: 'data', trFrom: [960, 500],
    draw(ctx, t) {
      const sv = E.s('varq'), sg = E.s('guess'), sc = E.s('closer'), sf = E.s('farther'), sd = E.s('data');
      ctx.fillStyle = 'rgba(24,25,40,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      const d = dist(t), OX = X0 + d * PX, SX = X0 + D * PX, L = [X0, AY];
      const top = [OX, AY - h * PX / 2], bot = [OX, AY + h * PX / 2], sT = F.proj(L, top, SX), sB = F.proj(L, bot, SX), G = h * D / d;
      // bench + ruler
      stroke(ctx, [[300, 800], [1500, 796]], { w: 4, seed: 1000 });
      for (let c = 0; c <= 100; c += 10) line(ctx, [X0 + c * PX, 800], [X0 + c * PX, c % 50 ? 814 : 826], { w: 2, dry: false, seed: 1001 + c });
      [0, 20, 50, 80, 100].forEach(c => INK.label(ctx, c + (c === 100 ? ' cm' : ''), X0 + c * PX, 866, { size: 34, weight: 700, align: 'center', alpha: 0.8 }));
      // screen (fixed)
      const scr = [[SX, 220], [SX + 16, 220], [SX + 16, 796], [SX, 796], [SX, 220]];
      P.fillPts(ctx, scr, '#FBF8F1'); P.fillPts(ctx, [[SX, 220], [SX + 6, 220], [SX + 6, 796], [SX, 796]], '#F2C46A', 0.85);
      P.fillPts(ctx, [[OX + 5, top[1]], sT, sB, [OX + 5, bot[1]]], 'rgba(28,27,34,0.22)');
      P.fillPts(ctx, [[SX - 1, sT[1]], [SX + 17, sT[1]], [SX + 17, sB[1]], [SX - 1, sB[1]]], F.SHADOW);
      stroke(ctx, scr, { w: 2.6, closed: true, seed: 1002 });
      // edge rays
      [top, bot].forEach((e, i) => F.ray(ctx, [L[0] + 30, L[1] + (e[1] - L[1]) * 30 / (OX - L[0])], F.proj(L, e, SX), 1, { w: 3.2, head: 13, heads: [0.35, 0.8], seed: 1010 + i }));
      // lamp (fixed) + object on a straw
      line(ctx, [X0, AY + 46], [X0, 796], { w: 5, seed: 1003 }); P.fillPts(ctx, circlePts(X0, 794, 50, 8, 20), '#8A6A45', 0.9);
      F.bulb(ctx, X0, AY, 1, 1);
      line(ctx, [OX, bot[1]], [OX, 796], { w: 5, color: '#D0605A', seed: 1004 });
      const ob = [[OX - 6, top[1]], [OX + 6, top[1]], [OX + 6, bot[1]], [OX - 6, bot[1]], [OX - 6, top[1]]];
      P.fillPts(ctx, ob, '#B98C5A'); stroke(ctx, ob, { w: 2.4, closed: true, dry: false });
      const lk = E.se(t, sv + 1.5, sv + 2.5) * (1 - E.se(t, sd + 0.8, sd + 1.3));
      INK.label(ctx, 'lamba (sabit)', X0, 250, { size: 36, weight: 700, align: 'center', alpha: lk });
      line(ctx, [X0, 262], [X0, AY - 40], { w: 1.4, alpha: 0.4 * lk, dry: false });
      INK.label(ctx, 'ekran (sabit)', SX + 8, 200, { size: 36, weight: 700, align: 'center', alpha: lk });
      INK.label(ctx, 'cisim', OX, top[1] - 24, { size: 34, weight: 700, align: 'center' });
      // distance arrow (the variable)
      const vk = E.se(t, sv + 3.0, sv + 4.0) * (1 - E.se(t, sd, sd + 0.5));
      if (vk > 0) {
        ctx.save(); ctx.globalAlpha = vk; const y = 740;
        line(ctx, [X0 + 4, y], [OX - 4, y], { w: 3, color: '#8A4A10', dry: false }); arrowHead(ctx, [OX - 20, y], [OX - 4, y], 14, { w: 3, color: '#8A4A10' }); arrowHead(ctx, [X0 + 20, y], [X0 + 4, y], 14, { w: 3, color: '#8A4A10' });
        ctx.restore();
        INK.label(ctx, Math.round(d) + ' cm', (X0 + OX) / 2, y - 16, { size: 38, weight: 700, align: 'center', color: '#8A4A10', alpha: vk });
      }
      // shadow height bracket
      const bk = E.se(t, sv + 4.0, sv + 5.0);
      if (bk > 0) {
        ctx.save(); ctx.globalAlpha = bk; stroke(ctx, [[SX + 30, sT[1]], [SX + 50, sT[1]], [SX + 50, sB[1]], [SX + 30, sB[1]]], { w: 3, dry: false }); ctx.restore();
        INK.label(ctx, 'tam gölge', SX + 70, AY - 8, { size: 36, weight: 700, alpha: bk });
        INK.label(ctx, '≈ ' + fmt(G) + ' cm', SX + 70, AY + 40, { size: 44, weight: 700, color: '#8A4A10', alpha: bk });
      }
      // guess bubble
      const gk = Math.min(E.se(t, sg + 0.3, sg + 0.9, 'out'), 1 - E.se(t, sc, sc + 0.5));
      if (gk > 0) { P.bubble(ctx, 900, 250, 560, 150, null, gk, 5); if (gk > 0.6) P.write(ctx, 'büyür mü?  küçülür mü?', 900, 266, E.seg(t, sg + 0.6, sg + 1.8), { size: 46, align: 'center' }); }
      // result words
      if (t > sc + 3.6 && t < sf) P.write(ctx, 'yaklaştı → gölge büyüdü', 900, 200, E.seg(t, sc + 3.6, sc + 4.8), { size: 46, align: 'center', color: '#8A4A10' });
      if (t > sf + 4.1 && t < sd) P.write(ctx, 'uzaklaştı → gölge küçüldü', 900, 200, E.seg(t, sf + 4.1, sf + 5.3), { size: 46, align: 'center', color: '#8A4A10' });
      // data table
      const tk = E.se(t, sd + 1.2, sd + 1.9, 'out');
      if (tk > 0) {
        ctx.save(); ctx.globalAlpha = tk;
        F.card(ctx, 470, 150, 760, 250, { seed: 1020 });
        line(ctx, [490, 214], [1210, 210], { w: 2.4, dry: false }); line(ctx, [850, 160], [852, 392], { w: 2, dry: false });
        ctx.restore();
        INK.label(ctx, 'lamba–cisim mesafesi', 660, 198, { size: 34, weight: 700, align: 'center', alpha: tk });
        INK.label(ctx, 'tam gölgenin boyu', 1030, 198, { size: 34, weight: 700, align: 'center', alpha: tk });
        [20, 50, 80].forEach((dd, i) => { const k = E.seg(t, sd + 1.9 + i * 0.9, sd + 2.7 + i * 0.9); P.write(ctx, dd + ' cm', 660, 262 + i * 50, k, { size: 38, align: 'center' }); P.write(ctx, fmt(h * D / dd) + ' cm', 1030, 262 + i * 50, k, { size: 38, align: 'center' }); });
      }
      DAMLA.draw(ctx, { x: 1740, y: 900, s: 0.8, view: 'q3', flip: true, expr: t > sg && t < sc ? 'thinking' : (t > sc + 3.5 ? 'surprised' : 'curious'), look: [-0.8, -0.3], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 3, arms: t > sg && t < sc ? [[-1, 0.3], [1, [30, -86]]] : [[-1, 0.35], [1, 0.35]] });
    }
  });
})();
