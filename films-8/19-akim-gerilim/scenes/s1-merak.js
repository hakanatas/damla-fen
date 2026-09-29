// SAHNE 1 — Merak ve beyin fırtınası  (+ film içi ortak yardımcılar: window.F19)
(function () {
  const { PAL, stroke, line, circlePts, wash, inkDot } = INK;
  const U = U6;
  const F19 = window.F19 = {};
  // şema devresi: o = {x0,y0,x1,y1, cells, el:'ampul'|'direnc', n (seri ampul), sw (kapalılık | null), A:'top'|'right'|null, V:bool, lit, k}
  F19.loop = (ctx, o) => {
    const { x0, y0, x1, y1 } = o, mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
    const wires = [[[x0, y1], [x0, y0], [x1, y0], [x1, y1], [x0, y1]]];
    const comps = [{ type: 'pil', n: o.cells ?? 2, x: mx, y: y1, pm: true }];
    const n = o.n ?? 1, el = o.el ?? 'ampul';
    const ex = []; for (let i = 0; i < n; i++) ex.push(n === 1 ? mx : x0 + (x1 - x0) * (0.42 + i * 0.3));
    ex.forEach(x => comps.push({ type: el === 'direnc' ? 'direnc' : 'ampul', x, y: y0, lit: o.lit ?? 0 }));
    if (o.sw != null) comps.push({ type: 'anahtar', x: x0, y: my, rot: -Math.PI / 2, closed: o.sw });
    if (o.A === 'top') comps.push({ type: 'A', x: x0 + (x1 - x0) * 0.2, y: y0 });
    if (o.A === 'right') comps.push({ type: 'A', x: x1, y: my });
    if (o.V) { const a = ex[0] - 90, b = ex[0] + 90, vy = y0 - 110; wires.push([[a, y0], [a, vy], [b, vy], [b, y0]]); comps.push({ type: 'V', x: ex[0], y: vy }); }
    U.sch(ctx, wires, comps, { k: o.k ?? 1, w: 4.4 });
    if (o.V && (o.k ?? 1) > 0.8) { inkDot(ctx, ex[0] - 90, y0, 5.5); inkDot(ctx, ex[0] + 90, y0, 5.5); }
    return { ex };
  };
  // akım yönü okları (geleneksel yön: + uçtan dış devre üzerinden − uca). Pilin + ucu solda.
  F19.arrows = (ctx, o, k) => {
    const { x0, y0, x1, y1 } = o, d = 26;
    const L = [[[x0 - d, y1 - 70], [x0 - d, y1 - 150]], [[x0 + 60, y0 - d], [x0 + 150, y0 - d]], [[x1 + d, y0 + 70], [x1 + d, y0 + 150]], [[x1 - 60, y1 + d], [x1 - 150, y1 + d]]];
    L.forEach(([a, b], i) => { const kk = E.clamp(k * 4 - i); if (kk > 0) P.arrow(ctx, a, b, kk, { w: 3.6, color: CK.AMBD, head: 14 }); });
  };
  // "akım var" ışıltısı: kablo boyunca yönsüz, düzgün parıltı
  F19.shimmer = (ctx, o, a, t) => {
    if (a <= 0) return; const { x0, y0, x1, y1 } = o;
    ctx.save(); ctx.globalAlpha *= a * (0.35 + 0.15 * Math.sin(t * 5));
    stroke(ctx, [[x0, y1], [x0, y0], [x1, y0], [x1, y1], [x0, y1]], { w: 16, color: PAL.light, dry: false, taper: 0, closed: true });
    ctx.restore();
  };
  // gerçekçi sabit direnç (renk bantlı). (x,y) merkez
  F19.resistor = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    line(ctx, [-150, 0], [-60, 0], { w: 4, color: '#8C877E', dry: false }); line(ctx, [60, 0], [150, 0], { w: 4, color: '#8C877E', dry: false });
    const body = CK.densify(CK.densify([[-62, -24], [62, -24], [62, 24], [-62, 24], [-62, -24]]));
    P.fillPts(ctx, body, '#E3C99A'); stroke(ctx, body, { w: 3, closed: true, seed: 1901 });
    ['#E07B2A', '#1C1B22', '#1C1B22', '#C9A43A'].forEach((c, i) => P.fillPts(ctx, CK.rect(-44 + i * 24 + (i === 3 ? 12 : 0), -23, 10, 46), c, 0.85));
    ctx.restore();
  };
  // tablo hücresi yazısı (virgüllü sayılar)
  F19.fmt = (v, d) => v.toFixed(d).replace('.', ',');

  E.scene({
    name: 'Merak', concept: 'Beyin fırtınası', from: 'title', to: 'brain',
    draw(ctx, t) {
      const sh = E.s('hello'), sb = E.s('brain');
      CK.table(ctx, 780);
      const sw = E.se(t, sh + 1.0, sh + 1.6);
      const h = CK.holder(ctx, 700, 830, 0.9);
      const s1 = CK.switch(ctx, 1000, 850, 0.9, sw);
      const so = CK.socket(ctx, 1300, 850, 0.9);
      CK.wire(ctx, h.pos, s1.a, { sag: 30 }); CK.wire(ctx, s1.b, so.a, { sag: 30 });
      CK.wire(ctx, so.b, h.neg, { c: [1000, 560], color: '#3A3842' });
      CK.bulb(ctx, so.top[0], so.top[1] + 5, 0.9, sw > 0.95 ? 1 : 0, t);
      // büyüteç altında kablo: "?"
      const mk = E.se(t, sh + 2.5, sh + 3.4);
      if (mk > 0) E.layer(ctx, mk, c => {
        const cx = 1000, cy = 470, r = 130;
        P.fillPts(c, circlePts(cx, cy, r, r, 60), PAL.white, 0.95);
        c.save(); c.beginPath(); c.arc(cx, cy, r, 0, 7); c.clip();
        stroke(c, [[cx - 200, cy + 10], [cx + 200, cy - 10]], { w: 50, color: PAL.water, dry: false, taper: 0 });
        stroke(c, [[cx - 200, cy + 10], [cx + 200, cy - 10]], { w: 22, color: CK.COPPER, dry: false, taper: 0 });
        c.restore();
        stroke(c, circlePts(cx, cy, r, r, 60), { w: 6, closed: true, seed: 1902 });
        line(c, [cx + 92, cy + 92], [cx + 170, cy + 170], { w: 14, taper: 0.02 });
        U.txt(c, '?', cx, cy - 40, { size: 90, align: 'center', color: U.AMBER });
      });
      // beyin fırtınası kartları
      const Q = [['Bir şey mi akıyor?', 330, 230], ['Pil neyi itiyor?', 1560, 230], ['Bunu ölçebilir miyiz?', 1560, 470]];
      Q.forEach(([q, x, y], i) => { const at = sb + 0.8 + i * 1.6; const k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return; ctx.save(); ctx.globalAlpha = k; CK.card(ctx, x - 230, y - 70, 460, 110, { seed: 1910 + i, fill: i === 2 ? '#F6E7B8' : '#FAF6EC' }); U.txt(ctx, q, x, y + 8, { size: 44, align: 'center' }); ctx.restore(); });
      U.damla(ctx, t, { x: 330, y: 900, s: 1.3, view: 'q3', expr: t > sb ? 'thinking' : 'curious', look: [0.8, -0.3], arms: t > sb ? [[-1, 0.35], [1, [40, -150]]] : [[-1, 0.35], [1, 1.9]] });
      U.title(ctx, t, '19 · Akım ve Gerilim');
    }
  });
})();
