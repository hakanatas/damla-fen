// SAHNE 1 — Merak: kış; neden su boruları patlar, dondurucudaki şişe çatlar? (E1.1)
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const F = F618;
  function flake(ctx, x, y, r, a) {
    for (let k = 0; k < 3; k++) { const an = a + k * Math.PI / 3; line(ctx, [x - Math.cos(an) * r, y - Math.sin(an) * r], [x + Math.cos(an) * r, y + Math.sin(an) * r], { w: 1.8, dry: false, color: '#5E7F96', alpha: 0.8 }); }
  }
  F.flakes = (ctx, t, n = 40, seed = 3) => {
    const R = INK.rng(seed);
    for (let i = 0; i < n; i++) { const x0 = R() * 1920, sp = 40 + R() * 50, ph = R() * 1200; const y = (ph + t * sp) % 1200 - 60; flake(ctx, x0 + Math.sin(t * 0.8 + i) * 20, y, 6 + R() * 6, t * 0.5 + i); }
  };
  F.pipe = (ctx, x, y, s, crackK) => { // çatlak boru (yatay)
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = F.rect(-150, -34, 150, 34); P.fillPts(ctx, b, '#A7A9AE'); INK.wash(ctx, b, '#3E4049', 0.35, 1101, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 3, closed: true, seed: 1102 });
    [-150, 150].forEach(ex => stroke(ctx, F.rect(ex - 12, -44, ex + 12, 44), { w: 3, closed: true, seed: 1103, dry: false }));
    if (crackK > 0) { P.drawOn(ctx, [[-10, -34], [6, -14], [-8, 2], [10, 18], [0, 34]], crackK, { w: 3.4, color: F.RED }); F.ice(ctx, 40, -34, 26); }
    ctx.restore();
  };
  F.glassBottle = (ctx, x, y, s, crackK) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-40, 0], [-40, -110], [-16, -150], [-14, -190], [14, -190], [16, -150], [40, -110], [40, 0], [-40, 0]];
    P.fillPts(ctx, b, ICEC, 0.9); INK.wash(ctx, b.slice(0, 2).concat([[40, -110], [40, 0]]), PAL.water, 0.2, 1104, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 3, closed: true, seed: 1105 });
    P.fillPts(ctx, F.rect(-16, -205, 16, -190), PAL.ink, 0.85);
    if (crackK > 0) { P.drawOn(ctx, [[-40, -60], [-18, -70], [-26, -90], [0, -100], [-6, -122]], crackK, { w: 3, color: F.RED }); P.drawOn(ctx, [[40, -40], [20, -52], [28, -70]], crackK, { w: 3, color: F.RED }); }
    ctx.restore();
  };
  const ICEC = '#E4F0F6';
  E.scene({
    name: 'Merak', concept: 'Kışın neden borular patlar?', from: 'title', to: 'hello',
    draw(ctx, t) {
      const sh = E.s('hello');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,106,140,0.20)'); g.addColorStop(1, 'rgba(46,106,140,0.05)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      const hill = P.hillLine(E.W, 880);
      P.landscape(ctx, E.W, E.H, t, { hill, tree: false });
      // karla örtülü tepe
      ctx.save(); ctx.globalAlpha = 0.7; P.fillPts(ctx, hill.concat([[2120, 1300], [-200, 1300]]), '#F4F7F8'); ctx.restore();
      F.flakes(ctx, t, 36, 3);
      const dx = 520, dy = P.hillY(hill, dx) + 4;
      const shiver = Math.sin(t * 40) * 3 * (t > sh ? 1 : 0.3);
      F.damla(ctx, t, { x: dx + shiver, y: dy, s: 1.45, view: 'front', expr: t > sh + 2 ? 'thinking' : 'surprised', look: [0.6, -0.2], arms: [[-1, [-30, -130]], [1, [30, -130]]], seed: 1 });
      // düşünce balonu: boru ve şişe
      const kb = E.se(t, sh + 1.6, sh + 2.4);
      if (kb > 0) {
        P.bubble(ctx, 1260, 450, 900, 480, [dx + 110, dy - 330], kb, 4);
        if (kb > 0.9) {
          F.pipe(ctx, 1080, 430, 1, E.se(t, sh + 2.6, sh + 3.4));
          F.glassBottle(ctx, 1500, 570, 1, E.se(t, sh + 5.0, sh + 5.8));
          INK.label(ctx, 'su borusu', 1080, 540, { size: 36, align: 'center', alpha: E.se(t, sh + 3.0, sh + 3.6) });
          INK.label(ctx, 'şişe', 1590, 470, { size: 36, alpha: E.se(t, sh + 5.4, sh + 6.0) });
          P.write(ctx, '?', 1330, 330, E.seg(t, sh + 6.0, sh + 6.6), { size: 90, color: '#8A4A10' });
        }
      }
      F.title(ctx, t, 18, 'Buz Neden Yüzer?', 5);
    }
  });
})();
