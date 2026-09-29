// SAHNE 3 — Katı, sıvı (su direnci) ve gaz (hava direnci) ortamlardan örnekler (TYMM: günlük hayattan örnekler)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const BR = '#8A4A10';
  function waterBody(ctx, y0, t) {
    const w = []; for (let i = 0; i <= 60; i++) { const x = -20 + i * 33; w.push([x, y0 + Math.sin(i * 0.8 + t * 2) * 6]); }
    const poly = w.concat([[2000, 1100], [-20, 1100]]); P.fillPts(ctx, poly, '#A9C6D6', 0.7); wash(ctx, poly, PAL.water, 0.35, 5601, { bleed: 2, blooms: 2 }); stroke(ctx, w, { w: 3, color: PAL.water });
  }
  function solid(ctx, t, s0) {
    const cards = [[520, 'buz', 'az pürüzlü → kolay kayar', '#DDEBF2', 0.3], [1400, 'kum dökülmüş yol', 'pürüzlü → ayak kaymaz', '#E6D2A4', 2.4]];
    cards.forEach(([x, name, eff, col, at], i) => {
      const k = E.se(t, s0 + at, s0 + at + 0.6, 'out'); if (k <= 0) return;
      ctx.save(); ctx.translate(x, 500); ctx.scale(P.pop(k), P.pop(k)); ctx.translate(-x, -500);
      F08.card(ctx, x - 360, 200, x + 360, 800, { seed: 5610 + i });
      const g = F08.rect(x - 320, 580, x + 320, 650); P.fillPts(ctx, g, col); if (i) { const R = INK.rng(9); for (let j = 0; j < 120; j++) P.fillPts(ctx, circlePts(x - 310 + R() * 620, 585 + R() * 60, 3, 3, 6), '#8A6A45', 0.7); } else for (let j = 0; j < 5; j++) line(ctx, [x - 280 + j * 120, 600], [x - 220 + j * 120, 600], { w: 2, color: PAL.white, dry: false });
      line(ctx, [x - 320, 580], [x + 320, 580], { w: 3, dry: false });
      // shoe
      const sx = x - 60 + (i ? 0 : 120 * E.se(t, s0 + at + 0.6, s0 + at + 2.2, 'out'));
      const shoe = [[sx - 90, 578], [sx + 80, 578], [sx + 90, 540], [sx + 20, 530], [sx - 20, 480], [sx - 90, 480], [sx - 90, 578]]; P.fillPts(ctx, shoe, '#2E6A8C', 0.7); stroke(ctx, shoe, { w: 3, closed: true });
      if (!i) F08.farrow(ctx, [sx + 110, 520], [sx + 230, 520], '', E.se(t, s0 + at + 0.6, s0 + at + 1.2), { color: PAL.ink, w: 4 });
      else { stroke(ctx, circlePts(sx, 590, 120, 16, 30), { w: 3, closed: true, color: PAL.light }); }
      F08.txt(ctx, name, x, 300, { size: 52, align: 'center' });
      F08.txt(ctx, eff, x, 730, { size: 42, align: 'center', color: BR });
      ctx.restore();
    });
  }
  function pool(ctx, t, s0) {
    waterBody(ctx, 700, t);
    const k = E.se(t, s0 + 0.3, s0 + 1.0);
    const dx = 640 + 160 * E.seg(t, s0 + 1, s0 + 8);
    DAMLA.draw(ctx, { x: dx, y: 900, s: 1.4, view: 'q3', expr: 'determined', look: [0.8, 0], blink: E.blink(t, 5), squash: E.breath(t), t, seed: 1, feet: E.walk(t * 2.5, 6, 3), lean: 0.12, arms: [[-1, 0.9 + 0.2 * Math.sin(t * 2.5)], [1, 1.2 - 0.2 * Math.sin(t * 2.5)]] });
    // water in front of her (partial overlay)
    ctx.save(); ctx.globalAlpha = 0.5; const w = []; for (let i = 0; i <= 60; i++) w.push([-20 + i * 33, 700 + Math.sin(i * 0.8 + t * 2) * 6]); P.fillPts(ctx, w.concat([[2000, 1100], [-20, 1100]]), '#A9C6D6', 0.6); ctx.restore();
    F08.farrow(ctx, [dx + 140, 560], [dx + 380, 560], 'yürüme yönü', E.se(t, s0 + 1.0, s0 + 1.8), { color: PAL.ink, size: 38 });
    F08.farrow(ctx, [dx + 380, 790], [dx + 140, 790], 'su direnci', E.se(t, s0 + 3.6, s0 + 4.4), { size: 44, dy: 60, w: 6 });
    F08.txt(ctx, 'havuz', 200, 680, { size: 44, alpha: k });
  }
  function fish(ctx, t, s0) {
    waterBody(ctx, 260, t);
    const u = E.seg(t, s0 + 0.5, s0 + 6.5);
    const fx = 300 + 1200 * u, bx = 300 + 500 * u;
    F08.fish(ctx, fx, 480, 1.3, t);
    for (let i = 0; i < 4; i++) stroke(ctx, P.bez([fx + 110, 440 + i * 25], [fx, 400 + i * 40], [fx - 150, 440 + i * 25], 20), { w: 1.6, color: PAL.white, dry: false, alpha: 0.8 });
    const bd = F08.rect(bx - 20, 660, bx + 20, 860); P.fillPts(ctx, bd, '#C9A87A'); stroke(ctx, bd, { w: 3, closed: true });
    for (let i = 0; i < 5; i++) { const y = 680 + i * 40; stroke(ctx, P.arc(bx + 40, y, 22, -1.5, 1.5, 10), { w: 2, color: PAL.white, dry: false, alpha: 0.8 }); }
    F08.txt(ctx, 'sivri biçim → az direnç', 960, 350, { size: 46, color: BR, alpha: E.se(t, s0 + 1.5, s0 + 2.2) });
    F08.txt(ctx, 'düz, geniş yüzey → çok direnç', 960, 740, { size: 46, color: BR, alpha: E.se(t, s0 + 3.0, s0 + 3.7) });
    F08.boat(ctx, 1500 + 120 * u, 262, 0.9);
  }
  function air(ctx, t, s0) {
    const y = 820; F08.floor(ctx, y, 4);
    const bx = 760 + 200 * E.se(t, s0 + 0.2, s0 + 6, 'sine');
    const bk = F08.bike(ctx, bx, y, 1.2, t);
    // Damla riding
    DAMLA.draw(ctx, { x: bk.seat[0] + 10, y: bk.seat[1] + 60, s: 1.0, view: 'q3', expr: 'happy', look: [0.8, -0.1], blink: E.blink(t, 6), t, seed: 1, lean: 0.1, shadow: false,
      arms: [[-1, [(bk.bar[0] - bk.seat[0] - 10) / 1.0 - 10, (bk.bar[1] - bk.seat[1] - 60) / 1.0]], [1, [(bk.bar[0] - bk.seat[0] - 10) - 4, (bk.bar[1] - bk.seat[1] - 60) + 4]]] });
    // wind lines
    for (let i = 0; i < 6; i++) { const wx = 1800 - ((t * 500 + i * 330) % 1400), wy = 260 + i * 70; line(ctx, [wx, wy], [wx - 140, wy + 4], { w: 2.4, dry: false, alpha: 0.5, color: PAL.water }); }
    F08.farrow(ctx, [bx + 260, 300], [bx + 480, 300], 'hareket', E.se(t, s0 + 1.0, s0 + 1.8), { color: PAL.ink });
    F08.farrow(ctx, [bx + 520, 470], [bx + 260, 470], 'hava direnci', E.se(t, s0 + 4.2, s0 + 5.0), { dy: 70, size: 44, w: 6 });
  }
  function chute(ctx, t, s0) {
    const y = 820; F08.floor(ctx, y, 5);
    const py = 120 + 220 * E.seg(t, s0 + 0.2, s0 + 8);
    F08.parachute(ctx, 820, py, 1.0, t);
    F08.farrow(ctx, [1060, py + 280], [1060, py + 120], 'hava direnci', E.se(t, s0 + 1.0, s0 + 1.8), { dx: 150, dy: 60, size: 42 });
    F08.farrow(ctx, [1060, py + 300], [1060, py + 400], 'ağırlık', E.se(t, s0 + 1.6, s0 + 2.4), { color: PAL.water, dx: 110, dy: 80, size: 42 });
    F08.txt(ctx, 'geniş yüzey → çok hava direnci → yavaş iner', 960, 200 - 40 + 0, { size: 44, align: 'center', alpha: E.se(t, s0 + 3.0, s0 + 3.8) });
  }
  E.scene({
    name: 'Ortamlar', concept: 'Katı, sıvı ve gaz ortamlarda sürtünme', from: 'solid', to: 'chute', trFrom: [960, 600],
    draw(ctx, t) {
      const S = ['solid', 'water', 'fish', 'air', 'chute'].map(id => E.s(id));
      const fns = [solid, pool, fish, air, chute];
      ctx.save(); ctx.globalAlpha = 0.1; ctx.fillStyle = PAL.water; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
      fns.forEach((fn, i) => {
        const a = E.se(t, S[i] - 0.3, S[i] + 0.4) * (i < 4 ? 1 - E.se(t, S[i + 1] - 0.3, S[i + 1] + 0.4) : 1);
        if (a > 0) E.layer(ctx, a, c => fn(c, t, S[i]));
      });
      // medium tag (top right)
      const m = t < S[1] ? 'KATI' : t < S[3] ? 'SIVI' : 'GAZ';
      F08.txt(ctx, 'ortam: ' + m, 1860, 90, { size: 44, align: 'right', color: BR });
    }
  });
})();
