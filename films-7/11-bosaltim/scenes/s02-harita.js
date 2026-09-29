// SAHNE 2 — Kavram haritası: boşaltım sistemi yapıları ve atık uzaklaştıran diğer organlar (programda kavram haritası)
(function () {
  const { PAL } = INK; const K = KIT;
  E.scene({
    name: 'Kavram haritası', concept: 'Boşaltım sistemi kavram haritası', from: 'map', to: 'parts', trFrom: [960, 300],
    draw(ctx, t) {
      const sm = E.s('map'), sp = E.s('parts');
      ctx.fillStyle = 'rgba(217,182,74,0.08)'; ctx.fillRect(0, 0, E.W, E.H);
      K.node(ctx, 'Boşaltım sistemi', 960, 250, E.se(t, sm + 0.5, sm + 1.1, 'out'), { size: 60, tint: '#D9B64A', tintA: 0.3, seed: 1 });
      const dk = E.se(t, sm + 2.5, sm + 3.2);
      K.text(ctx, 'kandaki atıkları süzer, idrarla dışarı atar', 960, 350, { size: 40, align: 'center', alpha: dk });
      const M = [[330, 'böbrekler'], [770, 'üreter'], [1190, 'idrar kesesi'], [1600, 'üretra']];
      M.forEach(([x, l], i) => { const k = E.se(t, sp + 0.4 + i * 0.9, sp + 1 + i * 0.9, 'out'); if (k <= 0) return; P.drawOn(ctx, P.bez([960, 380], [(960 + x) / 2, 400], [x, 450], 16), k, { w: 2.6 }); K.node(ctx, l, x, 500, k, { size: 44, tint: '#D9B64A', tintA: 0.2, seed: 10 + i }); });
      const ok = E.se(t, sp + 4.6, sp + 5.2, 'out');
      if (ok > 0) { ctx.save(); ctx.globalAlpha *= ok; INK.dashed(ctx, P.partial(P.bez([960, 380], [960, 560], [960, 640], 60), ok), { w: 2.4 }); ctx.restore();
        K.text(ctx, 'atık uzaklaştıran diğer organlar', 960, 640 + 30, { size: 40, align: 'center', alpha: ok, color: K.AMBER_D }); }
      [[560, 'deri'], [960, 'akciğerler'], [1360, 'kalın bağırsak']].forEach(([x, l], i) => K.node(ctx, l, x, 770, E.se(t, sp + 5.4 + i * 0.7, sp + 6 + i * 0.7, 'out'), { size: 42, tint: PAL.life, tintA: 0.2, seed: 20 + i }));
      K.damla(ctx, t, { x: 1790, y: 905, s: 0.8, flip: true, expr: 'curious', look: [-0.7, -0.3], arms: [[-1, 0.5], [1, 0.5]] });
    }
  });
})();
