// SAHNE 6 — Binalarda ısı yalıtkanı malzemeler (tür adı verilmeden) + aile ve ülke ekonomisine katkı (D19.3, D17.2, SDB2.3)
(function () {
  const { PAL, line, stroke, circlePts, wash, rng, hatch, arrowHead } = INK;
  const F = F20;
  function house(ctx, x0, base, w, h, ins, t, k) {
    const x1 = x0 + w, top = base - h, th = 26, it = ins ? 22 : 0;
    // inside warm
    const inner = [[x0 + th, top + th], [x1 - th, top + th], [x1 - th, base], [x0 + th, base]];
    P.fillPts(ctx, inner, '#F6E3C4'); wash(ctx, inner, PAL.light, 0.3, 3700 + (ins ? 1 : 0), { bleed: 1 });
    // walls
    [[x0, top, th, h], [x1 - th, top, th, h], [x0, top, w, th]].forEach(([x, y, ww, hh], i) => { const r = [[x, y], [x + ww, y], [x + ww, y + hh], [x, y + hh], [x, y]]; P.fillPts(ctx, r, '#D8C9B0'); stroke(ctx, r, { w: 2.2, closed: true, dry: false, seed: 3710 + i }); });
    if (ins) [[x0 - it, top - it, it, h + it], [x1, top - it, it, h + it], [x0 - it, top - it, w + 2 * it, it]].forEach(([x, y, ww, hh], i) => { const r = [[x, y], [x + ww, y], [x + ww, y + hh], [x, y + hh], [x, y]]; P.fillPts(ctx, r, '#F1E6A8'); hatch(ctx, x, y + hh / 2, ww, Math.min(hh, 40), { n: Math.max(3, Math.round(ww / 12)), ang: -0.9, w: 1.2, alpha: 0.6 }); stroke(ctx, r, { w: 2, closed: true, dry: false, seed: 3720 + i }); });
    // roof
    const roof = [[x0 - it - 30, top - it], [x0 + w / 2, top - it - 150], [x1 + it + 30, top - it]];
    P.fillPts(ctx, roof, '#C98E6A'); stroke(ctx, roof.concat([roof[0]]), { w: 3, closed: true, seed: 3730 });
    P.fillPts(ctx, [[x0 - it - 30, top - it], [x0 + w / 2, top - it - 150], [x0 + w / 2 + 20, top - it - 140], [x0 - it - 10, top - it + 2]], PAL.white, 0.9);
    // radiator
    const rx = x0 + w / 2 - 50, ry = base - 90; for (let i = 0; i < 5; i++) { const r = [[rx + i * 20, ry], [rx + i * 20 + 16, ry], [rx + i * 20 + 16, ry + 70], [rx + i * 20, ry + 70], [rx + i * 20, ry]]; P.fillPts(ctx, r, '#E8E1D3'); stroke(ctx, r, { w: 1.6, closed: true, dry: false }); }
    for (let i = 0; i < 3; i++) { const p = []; for (let j = 0; j <= 14; j++) { const u = j / 14; p.push([rx + 20 + i * 25 + Math.sin(u * 8 + t * 5 + i) * 4, ry - 8 - u * 40]); } stroke(ctx, p, { w: 2.2, color: F.HEAT, dry: false }); }
    // heat leaving through walls: arrows (many/thick vs few/thin)
    if (k > 0) {
      const n = ins ? 1 : 3, W = ins ? 3 : 7;
      const flows = [];
      for (let i = 0; i < n; i++) { const y = top + 70 + i * (h - 190) / Math.max(1, n - 1) * (n > 1 ? 1 : 0) + (n === 1 ? (h - 190) / 2 : 0); flows.push([[x0 + th + 10, y], [x0 - 110, y]]); flows.push([[x1 - th - 10, y], [x1 + 110, y]]); }
      flows.push([[x0 + w / 2, top + th + 20], [x0 + w / 2, top - it - 190]]);
      flows.forEach(([a, b], i) => {
        const u = ((t * 0.5 + i * 0.37) % 1);
        ctx.save(); ctx.globalAlpha = k * (0.35 + 0.65 * Math.sin(u * Math.PI));
        P.arrow(ctx, a, b, 1, { w: W, color: F.HEAT, head: ins ? 12 : 20 });
        ctx.restore();
      });
    }
  }
  function gauge(ctx, x, y, v, label) {
    const arc = P.arc(x, y, 70, Math.PI, 2 * Math.PI, 30); stroke(ctx, arc, { w: 4 });
    for (let i = 0; i <= 4; i++) { const a = Math.PI + i / 4 * Math.PI; line(ctx, [x + Math.cos(a) * 58, y + Math.sin(a) * 58], [x + Math.cos(a) * 70, y + Math.sin(a) * 70], { w: 2, dry: false }); }
    const a = Math.PI + v * Math.PI; line(ctx, [x, y], [x + Math.cos(a) * 60, y + Math.sin(a) * 60], { w: 4, color: v > 0.6 ? F.RED : PAL.life, taper: 0.1 }); INK.inkDot(ctx, x, y, 6);
    INK.label(ctx, label, x + 95, y - 8, { size: 34, weight: 700 });
  }
  function piggy(ctx, x, y) {
    const b = circlePts(x, y, 80, 58, 40); P.fillPts(ctx, b, '#E9B7A6'); stroke(ctx, b, { w: 3, closed: true });
    stroke(ctx, circlePts(x + 80, y - 4, 16, 20, 20), { w: 3, closed: true }); INK.inkDot(ctx, x + 40, y - 20, 4);
    [[-40, 50], [30, 50]].forEach(([dx, dy]) => line(ctx, [x + dx, y + dy], [x + dx, y + dy + 26], { w: 8 }));
    line(ctx, [x - 20, y - 56], [x + 16, y - 56], { w: 5 });
  }
  function coin(ctx, x, y, r = 22) { P.fillPts(ctx, circlePts(x, y, r, r, 24), PAL.light, 0.95); stroke(ctx, circlePts(x, y, r, r, 24), { w: 2.4, closed: true, dry: false }); INK.label(ctx, '₺', x, y + 9, { size: 26, weight: 700, align: 'center', rot: 0 }); }
  function skyline(ctx, x, y) {
    [[-90, 60, 90], [-30, 50, 140], [20, 60, 110], [80, 44, 70]].forEach(([dx, w, h], i) => { const r = [[x + dx, y], [x + dx + w, y], [x + dx + w, y - h], [x + dx, y - h], [x + dx, y]]; P.fillPts(ctx, r, '#D9D2C4'); stroke(ctx, r, { w: 2.4, closed: true, seed: 3750 + i }); for (let j = 0; j < 3; j++) P.fillPts(ctx, [[x + dx + 10, y - h + 16 + j * 26], [x + dx + 22, y - h + 16 + j * 26], [x + dx + 22, y - h + 30 + j * 26], [x + dx + 10, y - h + 30 + j * 26]], PAL.light, 0.8); });
  }
  E.scene({
    name: 'Binalar ve tasarruf', concept: 'Binalarda ısı yalıtkanı malzeme; aile ve ülke ekonomisi', from: 'home', to: 'economy', trFrom: [700, 500],
    draw(ctx, t) {
      const sh = E.s('home'), se = E.s('economy');
      // winter
      const sky = ctx.createLinearGradient(0, 0, 0, E.H); sky.addColorStop(0, 'rgba(120,150,175,0.35)'); sky.addColorStop(1, 'rgba(120,150,175,0.08)'); ctx.fillStyle = sky; ctx.fillRect(0, 0, E.W, E.H);
      const R = rng(3760); ctx.save(); ctx.fillStyle = PAL.white; ctx.globalAlpha = 0.8; for (let i = 0; i < 50; i++) { const x = R() * 1420, y = 160 + ((R() * 700 + t * (25 + R() * 25)) % 700); ctx.beginPath(); ctx.arc(x + Math.sin(t + i) * 6, y, 2.5 + R() * 2, 0, 7); ctx.fill(); } ctx.restore();
      const g = [[-20, 760], [1940, 756], [1940, 1100], [-20, 1100]]; P.fillPts(ctx, g, '#F4F1EA'); stroke(ctx, g.slice(0, 2), { w: 3 });
      const k = E.se(t, sh + 1.5, sh + 2.5);
      house(ctx, 170, 760, 440, 330, false, t, k);
      house(ctx, 900, 760, 440, 330, true, t, k);
      INK.label(ctx, 'yalıtımsız', 250, 240, { size: 44, weight: 700, align: 'center' });
      INK.label(ctx, 'yalıtımlı', 980, 240, { size: 44, weight: 700, align: 'center' });
      const lk = E.se(t, sh + 3, sh + 4) * (1 - E.se(t, se, se + 0.4));
      if (lk > 0) { ctx.save(); ctx.globalAlpha = lk; INK.leader(ctx, [1250, 830], [1352, 700]); ctx.restore(); P.write(ctx, 'ısı yalıtkanı malzeme', 1040, 860, lk, { size: 38, color: '#8A6A10' }); }
      // fuel gauges
      const gk = E.se(t, se + 0.3, se + 1.0);
      if (gk > 0) E.layer(ctx, gk, c => { gauge(c, 300, 870, 0.85, 'çok yakıt'); gauge(c, 1560 - 530, 870 + 0, 0.25, 'az yakıt'); });
      // economy panel
      const ek = E.se(t, se + 2.5, se + 3.3, 'out');
      if (ek > 0) {
        ctx.save(); ctx.translate((1 - ek) * 600, 0);
        F.card(ctx, 1470, 170, 390, 700, { seed: 3770 });
        INK.label(ctx, 'Tasarruf', 1665, 235, { size: 46, weight: 700, align: 'center', color: '#8A4A10' });
        piggy(ctx, 1640, 380); coin(ctx, 1640, 300 - 30 * Math.abs(Math.sin(t * 2)));
        INK.label(ctx, 'aile bütçesi', 1665, 500, { size: 38, weight: 700, align: 'center' });
        const k2 = E.se(t, se + 4.5, se + 5.3);
        if (k2 > 0) { ctx.save(); ctx.globalAlpha = k2; skyline(ctx, 1665, 720); coin(ctx, 1590, 600); coin(ctx, 1740, 610); ctx.restore(); INK.label(ctx, 'ülke ekonomisi', 1665, 780, { size: 38, weight: 700, align: 'center', alpha: k2 }); }
        ctx.restore();
      }
      DAMLA.draw(ctx, { x: 760, y: 900, s: 0.95, view: 'front', t, seed: 7, blink: E.blink(t, 8), squash: E.breath(t), talk: E.talk(t), expr: t > se + 3 ? 'happy' : 'curious', look: [0, -0.5], arms: [[-1, 0.4], [1, 0.4]] });
    }
  });
})();
