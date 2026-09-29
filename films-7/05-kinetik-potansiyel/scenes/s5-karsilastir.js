// SAHNE 5 — Karşılaştırma (KB2.7; FB.7.2.2 b, c): Venn şemasıyla benzerlik ve farklılıkları listeleme; uçan kuş: ikisi birden
(function () {
  const { PAL, stroke, circlePts, wash } = INK;
  const F = F7E, A = F75;
  const L = [700, 515], R = [1140, 515], RX = 400, RY = 285;
  const MID = ['enerjidir', 'iş yapabilir', 'birimi: joule', 'kütle (çekim PE)'];
  const LEFT = ['hareketten', 'kaynaklanır', 'sürate bağlı', 'duran cisimde yok'];
  const RIGHT = ['konumdan ya da', 'durumdan', 'kaynaklanır', 'yüksekliğe ya da', 'esnekliğe bağlı'];
  function venn(ctx, t) {
    const sc = E.s('compare'), ss = E.s('similar'), sd = E.s('differ');
    const k1 = E.se(t, sc + 0.4, sc + 1.4), k2 = E.se(t, sc + 1.0, sc + 2.0);
    if (k1 > 0) { const c = circlePts(L[0], L[1], RX, RY, 80); ctx.save(); ctx.globalAlpha *= k1; wash(ctx, c, F.KE, 0.25, 5800, { bleed: 3, blooms: 1 }); ctx.restore(); P.drawOn(ctx, c, k1, { w: 3.2, color: '#9A6412' }); }
    if (k2 > 0) { const c = circlePts(R[0], R[1], RX, RY, 80); ctx.save(); ctx.globalAlpha *= k2; wash(ctx, c, F.PE, 0.18, 5801, { bleed: 3, blooms: 1 }); ctx.restore(); P.drawOn(ctx, c, k2, { w: 3.2, color: F.PE }); }
    E.inkText(ctx, 'Kinetik', 520, 290, t, sc + 1.2, 1e9, { size: 56, align: 'center', color: '#9A6412' });
    E.inkText(ctx, 'Potansiyel', 1330, 290, t, sc + 1.6, 1e9, { size: 56, align: 'center', color: F.PE });
    MID.forEach((m, i) => P.write(ctx, m, 920, 430 + i * 62, E.seg(t, ss + 1.2 + i * 1.5, ss + 2.2 + i * 1.5), { size: 36, align: 'center' }));
    LEFT.forEach((m, i) => P.write(ctx, m, 500, 430 + i * 62, E.seg(t, sd + 1.0 + i * 0.9, sd + 1.9 + i * 0.9), { size: 36, align: 'center' }));
    RIGHT.forEach((m, i) => P.write(ctx, m, 1340, 410 + i * 58, E.seg(t, sd + 3.6 + i * 0.9, sd + 4.5 + i * 0.9), { size: 36, align: 'center' }));
    E.inkText(ctx, 'benzer', 920, 362, t, ss + 0.4, 1e9, { size: 34, align: 'center', alpha: 0.6 });
  }
  E.scene({
    name: 'Karşılaştırma', concept: 'Benzerlik ve farklılıklar', from: 'compare', to: 'both', trFrom: [920, 560],
    draw(ctx, t) {
      const sb = E.s('both');
      const dim = 1 - 0.8 * E.se(t, sb, sb + 0.6);
      E.layer(ctx, dim, c => venn(c, t));
      const bk = E.se(t, sb + 0.3, sb + 0.9);
      if (bk > 0) E.layer(ctx, bk, c => {
        const x = E.lerp(260, 1250, E.seg(t, sb + 0.3, sb + 7.5)), y = 470 + Math.sin(t * 2) * 14;
        A.bird(c, x, y, 1.6, t);
        A.motion(c, x - 150, y, 3, 70, 0.4);
        F.floor(c, 860, 14);
        const gy = 860; const p = []; for (let yy = y + 50; yy <= gy; yy += 4) p.push([x, yy]); c.save(); c.globalAlpha *= 0.6; INK.dashed(c, p, { w: 2, on: 10, off: 8, color: F.PE }); c.restore();
        F.tag(c, 'hareket → kinetik enerji', x + 20, 300, { size: 40, color: '#9A6412', seed: 5820 });
        F.tag(c, 'yükseklik → çekim potansiyel enerjisi', Math.max(x + 30, 560), 820, { size: 38, color: F.PE, seed: 5821 });
      });
      DAMLA.draw(ctx, { x: 1760, y: 880, s: 0.95, view: 'q3', flip: true, expr: t > sb ? 'happy' : 'curious', look: [-0.8, -0.2], blink: E.blink(t, 9), squash: E.breath(t), t, seed: 1, arms: [[-1, [-90, -140]], [1, 0.4]] });
    }
  });
})();
