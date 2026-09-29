// SAHNE 5 — Refleks (ayrıntıya girmeden): sıcak bardak, omurilik hızlı cevap verir
(function () {
  const { PAL, stroke, line, circlePts, wash } = INK; const K = KIT, F = F09;
  const HOT = '#B5553F';
  function cup(ctx, x, y) {
    const c = [[x - 45, y - 60], [x + 45, y - 60], [x + 36, y + 40], [x - 36, y + 40]]; P.fillPts(ctx, c, PAL.white); wash(ctx, c, HOT, 0.35, 8301, { bleed: 1, blooms: 0 }); stroke(ctx, c.concat([c[0]]), { w: 3, closed: true, seed: 8302 });
    stroke(ctx, P.arc(x + 52, y - 12, 22, -1.3, 1.3, 14), { w: 3, dry: false });
    for (let i = 0; i < 3; i++) { const pts = []; for (let j = 0; j <= 20; j++) { const u = j / 20; pts.push([x - 22 + i * 22 + Math.sin(u * 8 + i * 2) * 6, y - 70 - u * 70]); } stroke(ctx, pts, { w: 3, color: HOT, alpha: 0.8, seed: 8310 + i }); }
  }
  E.scene({
    name: 'Refleks', concept: 'Refleks: istemsiz, hızlı cevap', from: 'reflex', to: 'reflex2', trFrom: [800, 640],
    draw(ctx, t) {
      const s = E.s('reflex'), s2 = E.s('reflex2');
      const w = E.se(t, s + 4.3, s + 4.7, 'out');
      // masa
      stroke(ctx, [[600, 752], [960, 750]], { w: 4, seed: 8320 }); stroke(ctx, [[625, 752], [625, 880]], { w: 3 }); stroke(ctx, [[935, 750], [935, 880]], { w: 3 });
      cup(ctx, 745, 708);
      const A = F.body(ctx, 470, 560, 0.95, { cns: 1, pns: 0.8, armR: [E.lerp(0.5, 0.3, w), E.lerp(0.15, 2.0, w)], hi: t > s2 ? 'cord' : null });
      const inb = [A.handR, A.elbowR, A.shR, A.cordMid];
      F.pulse(ctx, inb, E.se(t, s + 1.8, s + 3.0));
      if (t > s + 3.0 && t < s + 4.4) F.pulse(ctx, inb.slice().reverse(), E.se(t, s + 3.0, s + 4.3));
      const ow = E.se(t, s + 4.4, s + 5.0);
      if (ow > 0) K.text(ctx, 'Hop!', 880, 560, { size: 56, color: HOT, alpha: ow * (1 - E.se(t, s2, s2 + 0.5)) });
      // omurilik cevabı + sonra beyin fark eder
      const ck = E.se(t, s2 + 0.3, s2 + 1.0);
      if (ck > 0) { ctx.save(); ctx.globalAlpha = ck; INK.leader(ctx, [250, 440], A.cordMid, { bend: -0.15 }); ctx.restore(); K.text(ctx, 'cevabı omurilik', 40, 390, { size: 36, color: K.LIFE_D, alpha: ck }); K.text(ctx, 'verdi', 40, 432, { size: 36, color: K.LIFE_D, alpha: ck }); }
      F.pulse(ctx, [A.cordMid, A.neck, A.brain], E.se(t, s2 + 3.2, s2 + 4.4));
      if (t > s2 + 4.4) K.say(ctx, ['Sıcak!'], A.head[0] + 210, A.head[1] - 70, 180, 90, [A.head[0] + 70, A.head[1] - 30], E.se(t, s2 + 4.4, s2 + 5.0, 'out'), { size: 40, seed: 5 });
      if (t > s2 + 4.8) K.text(ctx, 'beyin sonra fark eder', 40, 250, { size: 34, alpha: E.se(t, s2 + 4.8, s2 + 5.4) });
      // bilgi kartı
      const rk = E.se(t, s + 5.2, s + 5.9, 'out');
      if (rk > 0) E.layer(ctx, rk, c => {
        K.card(c, 1080, 230, 740, 560, { seed: 8330, tint: PAL.life, tintA: 0.08 });
        K.text(c, 'Refleks', 1130, 320, { size: 56, color: K.LIFE_D });
        ['• istemsizdir', '• çok hızlıdır', '• düşünmeden olur', '• vücudu korur'].forEach((l, i) => P.write(c, l, 1130, 410 + i * 62, E.seg(t, s + 6 + i * 0.5, s + 6.6 + i * 0.5), { size: 42 }));
        K.text(c, 'örnek: elini sıcaktan çekme, göz kırpma', 1130, 700, { size: 32, alpha: 0.8 * E.se(t, s2 + 1.5, s2 + 2.2), maxW: 660 });
      });
    }
  });
})();
