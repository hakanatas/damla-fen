// SAHNE 3 — Model üzerinde: böbrekler, üreter, idrar kesesi, üretra; idrarın yolu (FB.7.3.8 a, b, c; nefron vb. verilmez)
(function () {
  const { PAL, leader } = INK; const K = KIT, F = F11;
  const OX = 620, OY = 500, S = 0.85;
  const LABELS = [['böbrek', 'kidney', 330, 'kidney', 'kanı süzer · idrar oluşturur'], ['kan damarları', 'vessels', 250, 'balance', 'kan gelir, temizlenen kan döner'], ['üreter (idrar borusu)', 'ureter', 520, 'ureter', 'idrarı keseye taşır'],
    ['idrar kesesi (mesane)', 'bladder', 700, 'bladder', 'idrarı biriktirir'], ['üretra (idrar kanalı)', 'urethra', 840, 'urethra', 'idrarı dışarı atar']];
  const HI = { kidney: ['kidney'], balance: ['kidney', 'vessels'], ureter: ['ureter'], bladder: ['bladder'], urethra: ['urethra'], path: null };
  E.scene({
    name: 'Model', concept: 'Boşaltım sistemi yapı ve organları', from: 'kidney', to: 'path', trFrom: [620, 400],
    draw(ctx, t) {
      const ids = ['kidney', 'balance', 'ureter', 'bladder', 'urethra', 'path']; const cur = ids.filter(id => t >= E.s(id)).pop();
      const sp = E.s('path'), sb = E.s('bladder');
      const fill = t < sb ? 0.3 : t < sp ? E.lerp(0.3, 0.75, E.se(t, sb + 0.5, sb + 4)) : 0.5;
      const urine = t >= E.s('ureter') ? (t - E.s('ureter')) * 0.12 : null;
      const A = F.body(ctx, OX, OY, S, { hi: HI[cur], fill, urine: cur === 'path' || cur === 'ureter' ? urine : null });
      INK.label(ctx, 'model · ölçekli değildir', 60, 900, { size: 28, alpha: 0.55 });
      LABELS.forEach(([txt, key, ly, beat, note], i) => { const b0 = E.s(beat) + 0.4, k = E.se(t, b0, b0 + 0.6, 'out'); if (k <= 0) return;
        ctx.save(); ctx.globalAlpha *= k; leader(ctx, A[key], [1010, ly - 12], { bend: 0.08, seed: 11100 + i }); INK.inkDot(ctx, A[key][0], A[key][1], 4); ctx.restore();
        const isCur = cur === beat; K.text(ctx, txt, 1022, ly, { size: 42, color: isCur ? F.KID_D : PAL.ink, alpha: k * (isCur || cur === 'path' ? 1 : 0.7) });
        if (isCur) K.text(ctx, note, 1022, ly + 46, { size: 34, alpha: 0.8 * E.se(t, b0 + 0.8, b0 + 1.4) }); });
      if (cur === 'kidney') { const ak = E.se(t, E.s('kidney') + 3, E.s('kidney') + 3.6); K.text(ctx, 'fasulye biçimli', 1022, 420, { size: 34, alpha: ak * 0.8, color: K.AMBER_D }); }
      if (cur === 'balance') { const bk = E.se(t, E.s('balance') + 1, E.s('balance') + 1.6); K.node(ctx, 'su ve tuz dengesi', 1300, 420, bk, { size: 40, tint: PAL.water, tintA: 0.2, seed: 5 }); }
      // idrarın yolu şeridi
      const pk = E.se(t, sp + 0.3, sp + 1);
      if (pk > 0) E.layer(ctx, pk, c => { K.card(c, 1000, 372, 860, 100, { seed: 11150, tint: '#D9B64A', tintA: 0.15 });
        const W = ['böbrek', 'üreter', 'idrar kesesi', 'üretra']; let xx = 1030;
        W.forEach((w, i) => { const a = E.se(t, sp + 0.6 + i * 1.1, sp + 1.2 + i * 1.1); K.font(c, 40); const ww = c.measureText(w).width; K.text(c, w, xx, 436, { size: 40, alpha: a, color: F.KID_D }); xx += ww + 12; if (i < 3) { if (a > 0.9) P.arrow(c, [xx, 422], [xx + 44, 422], 1, { w: 3, head: 10 }); xx += 60; } }); });
      K.damla(ctx, t, { x: 1790, y: 905, s: 0.8, flip: true, expr: 'curious', look: [-0.8, -0.3], arms: [[-1, 0.5], [1, 0.5]] });
    }
  });
})();
