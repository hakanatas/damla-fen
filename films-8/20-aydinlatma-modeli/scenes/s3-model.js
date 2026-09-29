// SAHNE 4 — Model 1 (öner, dene, kanıt topla) · SAHNE 5 — Model 2 (kanıtlara göre yenile, yeniden dene)
(function () {
  const { PAL, stroke, line, circlePts, wash } = INK;
  const U = U6, M = window.F20M;
  const MX = 430, MY = 800;
  // okuma lambası modeli. o: {b:[b0,b1], out (0..1 sağ ampul sökülüyor), hood (0..1), rays:'all'|'book', sw (0..1), lbl (0..1)}
  function lamp(ctx, t, o) {
    const x = MX, y = MY;
    const box = CK.densify(CK.densify([[x - 190, y - 170], [x + 190, y - 170], [x + 190, y], [x - 190, y], [x - 190, y - 170]]));
    P.fillPts(ctx, box, '#E2C799'); wash(ctx, box, '#8A6A45', 0.35, 2201, { bleed: 1, blooms: 1 }); stroke(ctx, box, { w: 3.2, closed: true, seed: 2202 });
    const win = CK.rect(x - 170, y - 125, 250, 105); P.fillPts(ctx, win, '#5B5560', 0.35); stroke(ctx, win, { w: 2.2, closed: true, dry: false });
    U.pack(ctx, x - 45, y - 72, 0.42, 2, { label: false });
    CK.switch(ctx, x + 140, y - 50, 0.38, o.sw ?? 1);
    const bs = o.b ?? [0, 0], cs = [];
    [-80, 80].forEach((dx, i) => {
      const so = CK.socket(ctx, x + dx, y - 170, 0.7);
      if (i === 1 && (o.out ?? 0) > 0) { const k = o.out; ctx.save(); ctx.translate(so.top[0] + 50 * k, so.top[1] + 4 - 70 * Math.sin(k * 1.57)); ctx.rotate(0.5 * k); CK.bulb(ctx, 0, 0, 0.7, 0, t); ctx.restore(); cs.push(null); }
      else cs.push(CK.bulb(ctx, so.top[0], so.top[1] + 4, 0.7, bs[i], t, { rays: false }).center);
    });
    // ışınlar
    const on = cs.map((c, i) => c && bs[i] > 0.05 ? [c, bs[i]] : null).filter(Boolean);
    on.forEach(([c, b], j) => {
      const n = o.rays === 'book' ? 7 : 12;
      for (let i = 0; i < n; i++) {
        const a = o.rays === 'book' ? -0.05 + i / (n - 1) * 0.75 : i / n * 6.283 + 0.2 + j * 0.25;
        const r1 = 48, r2 = r1 + (o.rays === 'book' ? 150 + 50 * b : 18 + 45 * b);
        line(ctx, [c[0] + Math.cos(a) * r1, c[1] + Math.sin(a) * r1], [c[0] + Math.cos(a) * r2, c[1] + Math.sin(a) * r2], { w: 2.4, color: CK.AMBD, alpha: 0.35 + 0.5 * b, dry: false, seed: 2210 + i });
      }
    });
    // yansıtıcı kapak (alüminyum folyo)
    const hk = o.hood ?? 0;
    if (hk > 0) { const hood = P.bez([x - 210, y - 250], [x - 40, y - 470], [x + 250, y - 330], 30); ctx.save(); ctx.globalAlpha *= hk; stroke(ctx, hood, { w: 16, color: '#B8B2A6', dry: false, taper: 0.02 }); stroke(ctx, hood, { w: 4, color: PAL.white, alpha: 0.7, dry: false, taper: 0.1 }); line(ctx, [x + 190, y - 170], [x + 170, y - 360], { w: 5, color: '#8C877E', dry: false }); ctx.restore(); }
    const bookLight = on.length ? (o.rays === 'book' ? 1 : 0.25) * Math.min(1, on.reduce((s, q) => s + q[1], 0)) : 0;
    M.book(ctx, x + 420, y - 30, 0.8, bookLight);
    const lk = o.lbl ?? 0;
    if (lk > 0) { ctx.save(); ctx.globalAlpha *= lk; U.txt(ctx, 'karton gövde', x - 50, y + 50, { size: 32, align: 'center' }); U.txt(ctx, 'anahtar', x + 150, y + 50, { size: 32, align: 'center' }); U.txt(ctx, 'kitap', x + 420, y + 70, { size: 32, align: 'center' }); ctx.restore(); }
  }
  // şemalar (sağ üst)
  function schem(ctx, par, k, lit, gap) {
    const x0 = 1100, y0 = 210, x1 = 1700, y1 = 420;
    if (!par) { U.schSeries(ctx, x0, y0, x1 - x0, y1 - y0, 2, { k, sw: 1, lit, gapAt: gap ? 1 : undefined }); return; }
    const xa = 1420, comps = [{ type: 'pil', n: 2, x: x0, y: (y0 + y1) / 2, rot: Math.PI / 2 }, { type: 'anahtar', x: 1250, y: y0, closed: 1 }, { type: 'ampul', x: xa, y: (y0 + y1) / 2, rot: Math.PI / 2, lit }, { type: 'ampul', x: x1, y: (y0 + y1) / 2, rot: Math.PI / 2, lit: gap ? 0 : lit, gap }];
    U.sch(ctx, [[[x0, y1], [x0, y0], [x1, y0], [x1, y1], [x0, y1]], [[xa, y0], [xa, y1]]], comps, { k });
    if (k > 0.8) { INK.inkDot(ctx, xa, y0, 5); INK.inkDot(ctx, xa, y1, 5); }
  }
  const EV = ['Kanıt 1: Işık sönük (seri bağlı).', 'Kanıt 2: Biri gevşeyince hepsi söndü.', 'Kanıt 3: Işık her yöne dağılıyor.'];
  const FIX = ['→ Ampulleri paralel bağla.', '→ Folyo yansıtıcı ekle.', '→ Kullanmayınca anahtarı kapat.'];
  E.scene({
    name: 'Model 1', concept: 'Model önerme, deneme, kanıt toplama', from: 'model1', to: 'ev3', trFrom: [430, 640],
    draw(ctx, t) {
      const sm = E.s('model1'), st = E.s('test1'), e1 = E.s('ev1'), e2 = E.s('ev2'), e3 = E.s('ev3');
      CK.table(ctx, 800);
      const mk = E.se(t, sm + 0.2, sm + 1.2);
      const sw = t < st + 0.5 ? 0 : E.se(t, st + 0.5, st + 1);
      const out = t > e2 && t < e3 ? E.se(t, e2 + 0.6, e2 + 1.4) : 0;
      const b = sw > 0.95 && out < 0.2 ? 0.4 : 0;
      E.layer(ctx, mk, c => lamp(c, t, { b: [b, b], out, sw, rays: 'all', lbl: E.seg(t, sm + 1.5, sm + 2.5) }));
      P.write(ctx, 'Model 1', MX, 330, E.seg(t, sm + 0.4, sm + 1.2), { size: 58, align: 'center', color: U.AMBER });
      schem(ctx, false, E.se(t, sm + 1.5, sm + 3.5), b > 0 ? 0.35 : 0, out > 0.2);
      U.txt(ctx, 'seri bağlı iki ampul', 1400, 490, { size: 38, align: 'center', alpha: E.seg(t, sm + 3.2, sm + 4) });
      if (t > st) CK.card(ctx, 1020, 530, 800, 350, { seed: 2230, alpha: E.se(t, st + 0.2, st + 0.8) });
      if (t > st) P.write(ctx, 'Test notlarım', 1070, 590, E.seg(t, st + 0.6, st + 1.6), { size: 42, color: U.AMBER });
      [e1, e2, e3].forEach((at, i) => { if (t > at) { P.write(ctx, EV[i], 1070, 670 + i * 72, E.seg(t, at + 0.3, at + 1.8), { size: 38, weight: 400 }); P.cross(ctx, 1790, 656 + i * 72, 14, E.se(t, at + 1.8, at + 2.3), { w: 5, color: U.AMBER }); } });
      U.damla(ctx, t, { x: 160, y: 960, s: 0.8, view: 'q3', expr: t > e1 ? 'thinking' : 'curious', look: [0.8, -0.4], arms: [[-1, 0.35], [1, 1.9]] });
    }
  });
  E.scene({
    name: 'Model 2', concept: 'Modeli yeni kanıtlara göre yenileme', from: 'revise', to: 'test2', trFrom: [430, 640], tr: 0.9,
    draw(ctx, t) {
      const sr = E.s('revise'), f1 = E.s('fix1'), f2 = E.s('fix2'), f3 = E.s('fix3'), t2 = E.s('test2');
      CK.table(ctx, 800);
      const par = t > f1 + 0.6;
      const out = t > f1 + 3 && t < f2 ? E.se(t, f1 + 3, f1 + 3.8) * (1 - E.se(t, f1 + 5.8, f1 + 6.6)) : 0;
      let sw = 1; if (t > f3 + 2 && t < t2) sw = 1 - E.se(t, f3 + 2.4, f3 + 2.9) + E.se(t, f3 + 4.8, f3 + 5.3);
      const b = sw > 0.95 ? (par ? 1 : 0.4) : 0;
      const hood = E.se(t, f2 + 0.6, f2 + 1.8);
      lamp(ctx, t, { b: [b, out > 0.2 ? 0 : b].map((v, i) => i === 0 ? v : v), out, sw, hood, rays: hood > 0.5 ? 'book' : 'all' });
      P.write(ctx, t > f1 ? 'Model 2' : 'Model 1 → ?', MX, 330, 1, { size: 58, align: 'center', color: U.AMBER });
      if (t > f1) schem(ctx, true, E.se(t, f1 + 0.2, f1 + 1.6), b > 0 ? 0.9 : 0, out > 0.2); else schem(ctx, false, 1, 0.35, false);
      if (t > f1 + 1.4) U.txt(ctx, 'paralel bağlı iki ampul', 1400, 490, { size: 38, align: 'center', alpha: E.seg(t, f1 + 1.4, f1 + 2) });
      CK.card(ctx, 1020, 530, 800, 350, { seed: 2231 });
      if (t < t2) {
        P.write(ctx, 'Yenilemeler', 1070, 590, 1, { size: 42, color: PAL.water });
        [sr + 1.5, f2 + 0.2, f3 + 0.2].forEach((at, i) => { if (t > at) P.write(ctx, FIX[i], 1070, 670 + i * 72, E.seg(t, at, at + 1.5), { size: 38, weight: 400 }); });
        if (t > sr + 1.5 && t < f1) U.txt(ctx, '(kanıt 1 ve 2)', 1600, 670, { size: 30, alpha: 0.6 });
      } else {
        P.write(ctx, 'Yeniden test: ölçütlerim', 1070, 590, 1, { size: 42, color: PAL.life });
        M.CRIT.forEach((s, i) => { P.write(ctx, s, 1070, 670 + i * 72, 1, { size: 36, weight: 400 }); P.check(ctx, 1780, 650 + i * 72, 36, E.se(t, t2 + 0.8 + i * 0.9, t2 + 1.3 + i * 0.9), { w: 6, color: PAL.life }); });
      }
      const happy = t > t2 + 1;
      U.damla(ctx, t, { x: 160, y: 960, s: 0.8, view: 'q3', expr: happy ? 'happy' : 'determined', look: [0.8, -0.4], arms: happy ? [[-1, 2.6], [1, 2.6]] : [[-1, 0.35], [1, 1.9]] });
    }
  });
})();
