// SAHNE 7 — Sıra sende (deney düzeneği + TGA raporu, afiş), sıradaki film: Canlılarda Solunum, bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const U = U7;
  E.scene({
    name: 'Sıra sende', concept: 'Performans görevi: deney düzeneği ve afiş', from: 'task', to: 'task', trFrom: [960, 500],
    draw(ctx, t) {
      const sk = E.s('task');
      const k = Math.min(E.se(t, sk, sk + 0.7, 'out'), 1 - E.se(t, E.e('task') - 0.4, E.e('task') + 0.2));
      U.taskCard(ctx, t, sk, k, [
        'Bir faktör seç: ışık rengi, sıcaklık ya da karbondioksit.',
        'Değişkenlerini belirle; diğerlerini sabit tut.',
        'Düzeneğini kur, verilerini tabloya kaydet.',
        'Önermeni yaz, raporla ya da afiş hazırla.'
      ], { gap: 1.3, maxW: 1060, extra: c => { U.potPlant(c, 1500, 720, 0.45, t); INK.label(c, 'deneyi bir yetişkin eşliğinde yap', 960, 790, { size: 30, align: 'center', color: U.RED, alpha: 0.85 * E.se(t, sk + 6.5, sk + 7.2) }); } });
    }
  });
  E.scene({
    name: 'Sıradaki', concept: 'Sıradaki: Canlılarda Solunum', from: 'next', to: 'end', trFrom: [1500, 400],
    draw(ctx, t) {
      const sn = E.s('next');
      const hill = P.hillLine(E.W, 930);
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,70,110,0.26)'); g.addColorStop(0.7, 'rgba(227,150,70,0.18)'); g.addColorStop(1, 'rgba(227,150,70,0.08)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      P.sun(ctx, 200, E.lerp(700, 860, E.se(t, sn, sn + 5)), 70, t, { cells: false, nrays: 14 });
      P.landscape(ctx, E.W, E.H, t, { hill, tree: false });
      const tx = 1320, ty = P.hillY(hill, tx) + 6;
      U.tree(ctx, tx, ty, 1.2, t);
      // ağaç da solunum yapar: O₂ girer, CO₂ çıkar (ipucu)
      const kk = E.se(t, sn + 2.0, sn + 2.8);
      if (kk > 0) for (let j = 0; j < 2; j++) { const u = ((t - sn) * 0.3 + j / 2) % 1; ctx.save(); ctx.globalAlpha *= kk * Math.min(1, u * 5, (1 - u) * 5); U.gas(ctx, 1600 - u * 140, 380 + j * 60, 'O_2', 24); U.gas(ctx, 1140 - u * 160, 420 + j * 70, 'CO_2', 26); ctx.restore(); }
      const dx = 760, dy = P.hillY(hill, dx) + 4;
      U.damla(ctx, t, { x: dx, y: dy, s: 1.3, expr: 'curious', look: [0.8, -0.4], arms: [[-1, 0.4], [1, 1.9]] });
      E.inkText(ctx, 'Sıradaki gözlem:', 960, 230, t, sn + 0.8, E.s('end') + 0.4, { size: 50, align: 'center', weight: 400 });
      E.inkText(ctx, 'Canlılarda Solunum', 960, 320, t, sn + 1.4, E.s('end') + 0.4, { size: 76, align: 'center' });
      U.endCard(ctx, t, '24 · Işıktan Besine: Fotosentez', 'FB.8.7.1 · FB.8.7.2', U.LIFE);
    }
  });
})();
