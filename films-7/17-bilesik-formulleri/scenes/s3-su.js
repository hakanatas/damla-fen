// SAHNE 3 — H₂O'yu okumak: sembol + alt sayı; 1 yazılmaz (a: formülleri inceleyip mantıksal ilişki kurar)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const K = K7;
  E.scene({
    name: 'H₂O’yu oku', concept: 'Sembol + alt sayı = atom çeşidi ve sayısı', from: 'model', to: 'one', trFrom: [560, 500],
    draw(ctx, t) {
      const sm = E.s('model'), sb = E.s('build'), ss = E.s('subscript'), so = E.s('one');
      const mx = 560, my = 470, r = 100;
      K.mol(ctx, 'H2O', mx, my, r, E.seg(t, sm + 0.3, sm + 2.2));
      // model etiketleri
      E.inkText(ctx, 'su molekülü modeli', mx, 250, t, sm + 0.8, 1e9, { size: 42, align: 'center', alpha: 0.8 });
      const hiH = E.se(t, ss + 0.8, ss + 1.4);
      if (hiH > 0) [[-1.35, 1.05], [1.35, 1.05]].forEach(([dx, dy], i) => stroke(ctx, circlePts(mx + dx * r, my + dy * r, 70, 70, 40), { w: 4, closed: true, color: PAL.light, alpha: hiH, seed: 3200 + i }));
      if (t > sm + 2.2) { E.inkText(ctx, '2 hidrojen', mx - 170, my + 240, t, sm + 2.4, 1e9, { size: 40, align: 'center' }); E.inkText(ctx, '1 oksijen', mx + 150, my - 140, t, sm + 3.0, 1e9, { size: 40, align: 'left' }); }
      // formül inşası: H [2] O
      const fx = 1120, fy = 560, S = 230;
      ctx.save(); ctx.font = `700 ${S}px Kalam`; const wH = ctx.measureText('H').width; ctx.font = `700 ${S * 0.6}px Kalam`; const w2 = ctx.measureText('2').width; ctx.restore();
      const xH = fx, x2 = fx + wH + S * 0.02, xO = x2 + w2 + S * 0.02;
      P.write(ctx, 'H', xH, fy, E.seg(t, sb + 1.2, sb + 1.9), { size: S, rot: 0 });
      P.write(ctx, 'O', xO, fy, E.seg(t, sb + 2.0, sb + 2.7), { size: S, rot: 0 });
      if (t > sb + 1.0 && t < ss + 1) { const a = 1 - E.se(t, ss, ss + 1); ctx.save(); ctx.globalAlpha = a; P.arrow(ctx, [mx - 1.35 * r + 40, my + 1.05 * r - 70], [xH + 20, fy - 190], E.se(t, sb + 0.4, sb + 1.2), { w: 2.4, bend: 60, head: 12 }); P.arrow(ctx, [mx + 60, my - 60], [xO + 40, fy - 200], E.se(t, sb + 1.3, sb + 2.0), { w: 2.4, bend: 50, head: 12 }); ctx.restore(); }
      const k2 = E.se(t, ss + 0.4, ss + 1.0, 'out');
      if (k2 > 0) {
        ctx.save(); ctx.translate(x2 + w2 / 2, fy + S * 0.24 - S * 0.2); ctx.scale(P.pop(k2), P.pop(k2)); ctx.font = `700 ${S * 0.6}px Kalam`; ctx.fillStyle = K.SUB; ctx.textAlign = 'center'; ctx.fillText('2', 0, S * 0.2); ctx.restore();
        const lk = E.se(t, ss + 1.4, ss + 2.2);
        if (lk > 0) { INK.leader(ctx, [x2 + w2 / 2, fy + 70], [x2 + w2 / 2 - 40, fy + 170], { bend: 0.1 }); P.write(ctx, 'alt sayı: 2 tane H atomu', x2 - 250, fy + 215, lk, { size: 44, color: K.AMBER }); }
      }
      // 1 yazılmaz
      const k1 = E.se(t, so + 0.3, so + 0.9);
      if (k1 > 0) {
        const x1 = xO + S * 0.75;
        ctx.save(); ctx.globalAlpha = 0.45 * k1; ctx.font = `700 ${S * 0.6}px Kalam`; ctx.fillStyle = PAL.ink; ctx.fillText('1', x1, fy + S * 0.24); ctx.restore();
        P.cross(ctx, x1 + 20, fy + 20, 32, E.se(t, so + 1.0, so + 1.6), { w: 7, color: K.RED });
        P.write(ctx, '1 yazılmaz', x1 - 60, fy - 230, E.seg(t, so + 1.4, so + 2.2), { size: 44, color: K.RED });
        const sk = E.seg(t, so + 3.0, so + 4.2);
        if (sk > 0) K.rich(ctx, [{ f: 'H2O' }, { t: '  →  2 H  +  1 O' }], 1330, 860, 60, { align: 'center', k: sk, subColor: K.SUB });
      }
      F17.damla(ctx, t, { x: 1780, y: 890, s: 0.95, view: 'q3', flip: true, look: [-0.8, -0.2], expr: t > so + 3 ? 'happy' : 'curious', arms: t > ss + 0.4 && t < so ? [[-1, [-60, -100]], [1, 0.35]] : [[-1, 0.4], [1, 0.4]] });
    }
  });
})();
