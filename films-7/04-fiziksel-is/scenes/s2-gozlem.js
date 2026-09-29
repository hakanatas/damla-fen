// SAHNE 2 — Gözlem (FB.7.2.1 b): dört günlük yaşam durumu; kuvvet (kahverengi) ve yer değiştirme (mavi kesikli) okları
(function () {
  const { PAL, line, stroke, circlePts, wash, hatch } = INK;
  const F = F7E;
  const PW = 830, PH = 350, FY = 270;
  const PANELS = [[110, 170], [980, 170], [110, 555], [980, 555]];
  const BEAT = ['ex1', 'ex2', 'ex3', 'ex4'];

  function frame(ctx, i, k, active) {
    const [x0, y0] = PANELS[i];
    const r = [[x0, y0], [x0 + PW, y0 - 3], [x0 + PW + 3, y0 + PH], [x0 + 2, y0 + PH + 2], [x0, y0]];
    P.fillPts(ctx, r, '#FAF6EC', 0.9 * k);
    ctx.save(); ctx.globalAlpha *= k; stroke(ctx, r, { w: active ? 3.6 : 2.4, closed: true, seed: 4200 + i, color: active ? '#8A4A10' : PAL.ink }); ctx.restore();
    const c = circlePts(x0 + 36, y0 + 38, 24, 24, 24); ctx.save(); ctx.globalAlpha *= k; P.fillPts(ctx, c, PAL.light, 0.6); stroke(ctx, c, { w: 2.2, closed: true, seed: 4210 + i }); F.txt(ctx, String(i + 1), x0 + 36, y0 + 51, { size: 34, align: 'center' }); ctx.restore();
  }
  // panel 1: kutuyu itme
  function p1(ctx, t, s) {
    const m = E.se(t, s + 1.0, s + 5.0, 'sine');
    const cx0 = 330, cx = cx0 + 230 * m, bw = 150;
    F.floor(ctx, FY, 11, 0, PW, PH);
    F.box(ctx, cx, FY, bw, 120, 4301);
    DAMLA.draw(ctx, { x: cx - bw / 2 - 58, y: FY, s: 0.7, view: 'side', lean: 0.2, expr: 'determined', look: [1, 0], blink: E.blink(t, 21), t, seed: 2,
      feet: m > 0 && m < 1 ? E.walk(t * 9) : undefined, arms: [[-1, [95, -96]], [1, [100, -120]]] });
    F.vec(ctx, [cx - 40, FY - 160], [cx + 90, FY - 160], E.se(t, s + 0.6, s + 1.4), { label: 'kuvvet', ly: -18, size: 32 });
    F.disp(ctx, [cx0, FY + 30], [cx0 + 230, FY + 30], m, { label: 'yer değiştirme', ly: 36 });
  }
  // panel 2: duvarı itme
  function p2(ctx, t, s) {
    F.floor(ctx, FY, 12, 0, PW, PH);
    const wall = F.rect(520, 30, 620, FY); P.fillPts(ctx, wall, '#E6D2C0'); wash(ctx, wall, '#B5553F', 0.35, 4310, { bleed: 1, blooms: 0 });
    for (let r = 0; r < 6; r++) { const y = 30 + r * 40; line(ctx, [520, y], [620, y], { w: 1.4, alpha: 0.6, dry: false, seed: 4320 + r }); const ox = r % 2 ? 553 : 586; line(ctx, [ox, y], [ox, y + 40], { w: 1.4, alpha: 0.6, dry: false, seed: 4330 + r }); }
    stroke(ctx, wall, { w: 3, closed: true, seed: 4311 });
    const push = 0.5 + 0.5 * Math.sin(t * 6);
    DAMLA.draw(ctx, { x: 432 - 3 * push, y: FY, s: 0.7, view: 'side', lean: 0.26, expr: 'determined', look: [1, -0.2], blink: E.blink(t, 22), t, seed: 2, squash: 1 - 0.03 * push,
      arms: [[-1, [118, -120]], [1, [120, -150]]] });
    // ter damlaları
    if (t > s + 2) for (let i = 0; i < 2; i++) { const c = ((t * 0.8 + i * 0.5) % 1); ctx.save(); ctx.globalAlpha *= Math.sin(c * Math.PI) * 0.8; const q = circlePts(400 - i * 26, 80 + c * 40, 5, 8, 12); P.fillPts(ctx, q, PAL.water, 0.6); ctx.restore(); }
    F.vec(ctx, [630, 150], [760, 150], E.se(t, s + 0.8, s + 1.6), { label: 'kuvvet', ly: -18, size: 32 });
    E.inkText(ctx, 'yer değiştirme: yok', 560, FY + 58, t, s + 3.0, 1e9, { size: 34, align: 'center', color: F.DISP });
  }
  // panel 3: çantayı yerden kaldırma
  function p3(ctx, t, s) {
    F.floor(ctx, FY, 13, 0, PW, PH);
    const m = E.se(t, s + 1.2, s + 4.2, 'io');
    const S = 0.85, dx = 330;
    const hl = E.mix([72, -86], [40, -206], m); // el (yerel)
    const bagTop = FY + hl[1] * S, bagX = dx + hl[0] * S;
    ctx.save(); ctx.globalAlpha *= 0.3 * E.se(t, s + 1.4, s + 2); F.bag(ctx, bagX, FY - 76, 0.45, '#9AA6AC', 4340); ctx.restore(); // ilk konum izi
    DAMLA.draw(ctx, { x: dx, y: FY, s: S, view: 'q3', expr: m > 0.95 ? 'happy' : 'determined', look: [0.5, -0.6 * m], blink: E.blink(t, 23), t, seed: 2,
      arms: [[-1, 0.5 + 2.1 * m], [1, hl]] });
    F.bag(ctx, bagX, bagTop, 0.45, '#4F6D7A', 4350);
    F.vec(ctx, [bagX + 80, bagTop + 70], [bagX + 80, bagTop - 40], E.se(t, s + 0.6, s + 1.4), { label: 'kuvvet', lx: 64, ly: 10, size: 32 });
    F.disp(ctx, [bagX + 150, FY - 10], [bagX + 150, FY - 10 - 120 * S], m, { label: 'yer değiştirme', lx: 120, ly: 10, size: 32 });
  }
  // panel 4: çantayı aynı yükseklikte taşıma
  function p4(ctx, t, s) {
    F.floor(ctx, FY, 14, 0, PW, PH);
    const m = E.se(t, s + 1.0, s + 6.0, 'sine');
    const S = 0.8, dx0 = 150, dx = dx0 + 340 * m;
    const hand = [88, -150];
    const bx = dx + hand[0] * S, bt = FY + hand[1] * S;
    ctx.save(); ctx.globalAlpha *= 0.55; INK.dashed(ctx, (() => { const p = []; for (let x = 170; x <= 760; x += 4) p.push([x, bt + 40]); return p; })(), { w: 1.6, on: 8, off: 8, color: PAL.inkSoft }); ctx.restore();
    DAMLA.draw(ctx, { x: dx, y: FY, s: S, view: 'side', expr: 'neutral', look: [1, 0], blink: E.blink(t, 24), t, seed: 2, feet: m > 0 && m < 1 ? E.walk(t * 8) : undefined, arms: [[-1, [80, -130]], [1, hand]] });
    F.bag(ctx, bx, bt, 0.45, '#4F6D7A', 4360);
    F.vec(ctx, [bx, bt - 4], [bx, bt - 104], E.se(t, s + 0.6, s + 1.4), { label: 'kuvvet', lx: 62, ly: 20, size: 32 });
    F.disp(ctx, [dx0 + 88 * S, FY + 30], [dx0 + 88 * S + 340, FY + 30], m, { label: 'hareket (yatay)', ly: 36 });
    E.inkText(ctx, 'aynı yükseklik', 700, bt + 30, t, s + 1.5, 1e9, { size: 28, align: 'center', alpha: 0.7 });
  }
  const FN = [p1, p2, p3, p4];

  E.scene({
    name: 'Dört durum', concept: 'Fiziksel iş örneklerini gözlemleme', from: 'intro', to: 'ex4', trFrom: [960, 540],
    draw(ctx, t) {
      const si = E.s('intro');
      PANELS.forEach(([x0, y0], i) => {
        const fk = E.se(t, si + 0.4 + i * 0.4, si + 1.2 + i * 0.4);
        const s = E.s(BEAT[i]); const active = t >= s && t < E.e(BEAT[i]);
        if (fk <= 0) return;
        frame(ctx, i, fk, active);
        ctx.save(); ctx.beginPath(); ctx.rect(x0 + 2, y0 + 2, PW - 2, PH - 2); ctx.clip(); ctx.translate(x0, y0);
        if (t < s) { ctx.globalAlpha *= fk; F.txt(ctx, '?', PW / 2, PH / 2 + 34, { size: 110, align: 'center', alpha: 0.18 }); }
        else E.layer(ctx, E.se(t, s, s + 0.6), c => FN[i](c, t, s));
        ctx.restore();
      });
    }
  });
})();
