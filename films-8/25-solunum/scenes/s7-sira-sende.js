// SAHNE 7 — Sıra sende (araştırma + grup tartışması), sıradaki film: Madde Döngüleri, bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const U = U7;
  E.scene({
    name: 'Sıra sende', concept: 'Araştırma görevi ve grup tartışması', from: 'task', to: 'task', trFrom: [960, 500],
    draw(ctx, t) {
      const sk = E.s('task');
      const k = Math.min(E.se(t, sk, sk + 0.7, 'out'), 1 - E.se(t, E.e('task') - 0.4, E.e('task') + 0.2));
      U.taskCard(ctx, t, sk, k, [
        'Bir besin seç: ekmek, elma ya da peynir.',
        'Vücuduna girdikten sonraki yolculuğunu araştır.',
        'Besinden enerjiye giden yolu kavram haritasıyla göster.',
        'Grubunla tartış, bulgularını sınıfla paylaş.'
      ], { gap: 1.3, maxW: 1080, extra: c => { U.atp(c, 1500, 740, 44); U.sugar(c, 1400, 750, 26); P.arrow(c, [1430, 748], [1452, 748], 1, { w: 2.4, head: 10 }); } });
    }
  });
  E.scene({
    name: 'Sıradaki', concept: 'Sıradaki: Madde Döngüleri', from: 'next', to: 'end', trFrom: [1300, 400],
    draw(ctx, t) {
      const sn = E.s('next');
      const hill = P.hillLine(E.W, 930);
      P.sun(ctx, 1660, 230, 66, t, { nrays: 16, cells: false });
      P.landscape(ctx, E.W, E.H, t, { hill, tree: false });
      const tx = 1320, ty = P.hillY(hill, tx) + 6;
      U.tree(ctx, tx, ty, 1.1, t);
      const dx = 620, dy = P.hillY(hill, dx) + 4;
      U.damla(ctx, t, { x: dx, y: dy, s: 1.3, expr: 'happy', look: [0.8, -0.3], arms: U.wave(t) });
      // döngü: O₂ ve CO₂ Damla ile ağaç arasında dolaşır
      const kc = E.se(t, sn + 0.6, sn + 1.4);
      if (kc > 0) {
        const cx = 980, cy = 560, rx = 330, ry = 130;
        ctx.save(); ctx.globalAlpha *= kc * 0.6; INK.dashed(ctx, circlePts(cx, cy, rx, ry, 200), { w: 2.4, color: U.LIFE_D, on: 10, off: 8 }); ctx.restore();
        for (let j = 0; j < 4; j++) { const a = t * 0.6 + j * Math.PI / 2; const x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry; ctx.save(); ctx.globalAlpha *= kc; U.gas(ctx, x, y, j % 2 ? 'CO_2' : 'O_2', 26); ctx.restore(); }
      }
      E.inkText(ctx, 'Sıradaki gözlem:', 960, 230, t, sn + 0.8, E.s('end') + 0.4, { size: 50, align: 'center', weight: 400 });
      E.inkText(ctx, 'Madde Döngüleri', 960, 320, t, sn + 1.4, E.s('end') + 0.4, { size: 76, align: 'center' });
      U.endCard(ctx, t, '25 · Besinden Enerjiye: Canlılarda Solunum', 'FB.8.7.3', U.LIFE);
    }
  });
})();
