// SAHNE 3 — Nedenler: fosil yakıtlar, ormansızlaşma; karbon ayak izi; tüketim ve tasarruf (birikim)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const U = U7;
  const GY = 780;
  const bulb = (c, x, y, s) => { const b = circlePts(x, y, 26 * s, 30 * s, 24); P.fillPts(c, b, '#F6D9A0'); stroke(c, b, { w: 2.4, closed: true, dry: false }); const bs = U.rect(x - 12 * s, y + 26 * s, x + 12 * s, y + 42 * s); P.fillPts(c, bs, '#8E8E8E'); stroke(c, bs, { w: 2, dry: false }); };
  const apple = (c, x, y, s) => { const a = circlePts(x, y, 28 * s, 26 * s, 24); P.fillPts(c, a, '#C8553F'); stroke(c, a, { w: 2.4, closed: true, dry: false }); line(c, [x, y - 24 * s], [x + 4 * s, y - 38 * s], { w: 3, dry: false }); };
  const shirt = (c, x, y, s) => { const p = [[-30, -34], [-12, -40], [0, -32], [12, -40], [30, -34], [44, -16], [30, -8], [26, 36], [-26, 36], [-30, -8], [-44, -16], [-30, -34]].map(q => [x + q[0] * s, y + q[1] * s]); P.fillPts(c, p, '#8FB8D0'); stroke(c, p, { w: 2.4, closed: true, dry: false }); };
  function footprint(c, x, y, s, t) {
    c.save(); c.translate(x, y); c.scale(s, s);
    const sole = []; for (let i = 0; i <= 60; i++) { const a = i / 60 * 6.283; const w = 150 * (1 - 0.28 * Math.max(0, Math.sin(a))) * (1 + 0.12 * Math.cos(a) * 0); sole.push([Math.cos(a) * w * (Math.sin(a) > 0 ? 0.8 : 1), Math.sin(a) * 250 + 40]); }
    P.fillPts(c, sole, '#9A9387', 0.35); wash(c, sole, '#4A4750', 0.3, 3100, { bleed: 3, blooms: 2 }); stroke(c, sole, { w: 3.4, closed: true, seed: 3101 });
    [[-110, -260, 44], [-40, -300, 38], [25, -300, 32], [80, -280, 28], [125, -245, 24]].forEach(([tx, ty, r], i) => { const p = circlePts(tx, ty, r, r * 1.15, 20); P.fillPts(c, p, '#9A9387', 0.35); wash(c, p, '#4A4750', 0.3, 3102 + i, { bleed: 1, blooms: 0 }); stroke(c, p, { w: 2.6, closed: true, dry: false }); });
    U.car(c, -40, -60, 0.6, t, 0); bulb(c, 70, -100, 1.1); apple(c, -60, 90, 1.2); shirt(c, 60, 90, 1.2);
    c.restore();
  }
  function piggy(c, x, y, s, t, coins) {
    c.save(); c.translate(x, y); c.scale(s, s);
    const b = circlePts(0, 0, 90, 64, 40); P.fillPts(c, b, '#E9B8A8'); stroke(c, b, { w: 3, closed: true, dry: false });
    [[-50, 50], [40, 50]].forEach(([lx, ly]) => { const l = U.rect(lx - 12, ly, lx + 12, ly + 30); P.fillPts(c, l, '#E9B8A8'); stroke(c, l, { w: 2.4, dry: false }); });
    const sn = circlePts(92, 6, 16, 20, 16); P.fillPts(c, sn, '#DDA090'); stroke(c, sn, { w: 2.4, closed: true, dry: false });
    INK.inkDot(c, 50, -18, 5); line(c, [-24, -62], [20, -62], { w: 5, dry: false });
    for (let i = 0; i < coins; i++) { const u = E.clamp(((t * 0.8) + i * 0.33) % 1); const cy = -170 + u * 110; const cp = circlePts(0, cy, 20, 8, 16); c.save(); c.globalAlpha *= 1 - u * 0.8; P.fillPts(c, cp, '#E3A03A'); stroke(c, cp, { w: 2, closed: true, dry: false }); c.restore(); }
    c.restore();
  }
  E.scene({
    name: 'Nedenler', concept: 'Fosil yakıtlar, ormansızlaşma, karbon ayak izi, tasarruf', from: 'causes', to: 'save', trFrom: [960, 540],
    draw(ctx, t) {
      const sC = E.s('causes'), sF = E.s('fossil'), sP = E.s('footprint'), sV = E.s('save');
      const ck = 1 - E.se(t, sP - 0.2, sP + 0.6);
      if (ck > 0) E.layer(ctx, ck, c => {
        const g = c.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(110,100,90,0.18)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, E.W, E.H);
        const land = [[-20, GY], [1940, GY - 4], [1940, 1100], [-20, 1100]]; P.fillPts(c, land, '#E3D8BE'); wash(c, land, PAL.life, 0.2, 3110, { bleed: 2 }); stroke(c, [[-20, GY], [1940, GY - 4]], { w: 3 });
        U.factory(c, 420, GY, 1.1, t, 1); U.car(c, 780, GY, 1.1, t, 1); U.house(c, 1040, GY, 1.1);
        U.smoke(c, 1040, GY - 170, t, 0.8, 0.6, 3111);
        [1360, 1450, 1540, 1640].forEach((x, i) => U.stump(c, x, GY, 1.2)); U.tree(c, 1690, GY, 0.9, t, { seed: 7 });
        // CO2 yükselişi
        const src = [[495, 560], [700, 720], [1040, 600], [1500, 700]];
        src.forEach(([x, y], i) => { for (let j = 0; j < 2; j++) { const u = ((t - sC) * 0.18 + j * 0.5 + i * 0.13) % 1; if (t < sC + 0.8 + i * 0.4) continue; const yy = E.lerp(y, 260, u); c.save(); c.globalAlpha *= Math.sin(u * Math.PI) * 0.9; U.gas(c, 'CO2', x + Math.sin(u * 6 + i) * 20, yy, 34, U.CO2C); c.restore(); } });
        P.write(c, 'insan etkinlikleri', 960, 230, E.seg(t, sC + 2.4, sC + 3.6), { size: 56, align: 'center', color: U.HEAT });
        const lab = [['kömür, petrol, doğal gaz yanar', 720, 860, sF + 0.3], ['kesilen ormanlar', 1500, 860, sF + 3.6]];
        lab.forEach(([s, x, y, at]) => P.write(c, s, x, y, E.seg(t, at, at + 1.2), { size: 40, align: 'center' }));
        if (t > sF + 4) { c.save(); c.globalAlpha *= E.se(t, sF + 4, sF + 4.6); U.txt(c, 'karbondioksit tutan bitkiler azalır', 1500, 905, { size: 30, align: 'center', color: U.GREEN }); c.restore(); }
      });
      const fk = E.se(t, sP, sP + 0.8, 'out');
      if (fk > 0) E.layer(ctx, fk, c => {
        const shrink = 1 - 0.3 * E.se(t, sV + 3, sV + 7);
        footprint(c, 560, 610, 1.0 * shrink, t);
        P.write(c, 'karbon ayak izi', 560, 215, E.seg(t, sP + 0.4, sP + 1.4), { size: 56, align: 'center', color: '#4A4750' });
        P.write(c, 'saldığımız sera gazlarının ölçüsü', 1300, 300, E.seg(t, sP + 1.6, sP + 2.8), { size: 42, align: 'center' });
        const lb = [['ulaşım', 0], ['elektrik', 1], ['yiyecek', 2], ['giysi', 3]];
        lb.forEach(([s, i]) => P.write(c, s, 1000 + (i % 2) * 280, 420 + Math.floor(i / 2) * 70, E.seg(t, sP + 3 + i * 0.6, sP + 3.8 + i * 0.6), { size: 42, color: '#4A4750' }));
        // tasarruf listesi
        const tk = E.se(t, sV, sV + 0.6);
        if (tk > 0) {
          c.save(); c.globalAlpha *= tk; P.fillPts(c, U.rect(960, 250, 1830, 580), '#F1EADB', 0.97); c.restore();
          P.write(c, 'Tasarruf edelim:', 1000, 330, E.seg(t, sV + 0.2, sV + 1), { size: 48, color: U.GREEN });
          ['ışığı ve cihazları kapat', 'yürü, bisiklet, toplu taşıma', 'israf etme, onar, yeniden kullan'].forEach((s, i) => { const at = sV + 1.2 + i * 1.1, y = 410 + i * 70; P.check(c, 1020, y - 16, 32, E.se(t, at + 0.5, at + 0.9), { w: 5, color: U.GREEN }); P.write(c, s, 1065, y, E.seg(t, at, at + 1), { size: 40 }); });
          const pk = E.se(t, sV + 4.4, sV + 5.2, 'out');
          if (pk > 0) { c.save(); c.globalAlpha *= pk; piggy(c, 1200, 760, 0.9, t, 2); c.restore(); P.write(c, 'tasarruf → birikim', 1500, 780, E.seg(t, sV + 5, sV + 6), { size: 42, color: U.AMBER, align: 'center' }); }
        }
      });
      U.damla(ctx, t, { x: 1800, y: 900, s: 0.75, view: 'q3', flip: true, expr: t > sV ? 'happy' : 'thinking', look: [-0.8, -0.3], arms: t > sV ? [[-1, 2.3], [1, 0.4]] : [[-1, 0.4], [1, [22, -150], 1]], seed: 3 });
    }
  });
})();
