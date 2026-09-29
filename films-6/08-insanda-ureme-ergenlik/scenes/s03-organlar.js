// SAHNE 3 — Üreme yapı ve organları poster/şema üzerinde (FB.6.3.5 a) ve aralarındaki ilişkiler (b)
(function () {
  const { PAL, leader, inkDot } = INK; const K = KIT, F = F08;
  const MALE = [['Testisler', 'sperm üretir'], ['Sperm kanalları', 'spermleri taşır'], ['Salgı bezleri', 'sıvı ekler'], ['Üretra', 'dışarı iletir']];
  E.scene({
    name: 'Üreme organları', concept: 'Poster: üreme yapı ve organları, görev ilişkileri', from: 'female', to: 'male', trFrom: [960, 540],
    draw(ctx, t) {
      const sf = E.s('female'), su = E.s('uterus'), sm = E.s('male');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      K.card(ctx, 110, 165, 840, 735, { seed: 6101 });
      E.layer(ctx, E.se(t, sm - 0.4, sm + 0.5), c => K.card(c, 980, 165, 830, 735, { seed: 6102 }));
      K.text(ctx, 'Dişi üreme sistemi', 150, 240, { size: 48, color: K.LIFE_D });
      K.text(ctx, 'Erkek üreme sistemi', 1020, 240, { size: 48, color: K.LIFE_D, alpha: E.se(t, sm, sm + 0.8) });
      // dişi şema
      const A = F.femaleA(530, 510, 0.95);
      E.layer(ctx, E.se(t, sf + 0.2, sf + 1.2), c => F.female(c, 530, 510, 0.95));
      const lab = (txt, tx, ty, to, a0, o = {}) => { const k = E.se(t, a0, a0 + 0.7); if (k <= 0) return; ctx.save(); ctx.globalAlpha = k; leader(ctx, [tx + (o.dx ?? 0), ty - 12], to, { bend: o.bend ?? 0.12 }); ctx.restore(); K.text(ctx, txt, tx, ty, { size: 36, alpha: k, align: o.align ?? 'left', color: o.color }); };
      lab('yumurtalık', 150, 680, A.ovL, sf + 1.8, { dx: 90, bend: -0.15 });
      lab('yumurta kanalı', 150, 330, A.tubeL[12], sf + 3.0, { dx: 130 });
      lab('rahim (dölyatağı)', 610, 690, [A.uterus[0] + 30, A.uterus[1] + 40], su + 2.6, { dx: 20, bend: 0.15 });
      lab('dölyolu (vajina)', 600, 820, [A.vag[0] + 16, A.vag[1] + 10], su + 4.6, { dx: -10, bend: 0.1 });
      // yumurtanın yolu: yumurtalık → yumurta kanalı → rahim
      const u = E.se(t, sf + 4.5, sf + 8.5);
      if (u > 0 && t < su + 7) {
        const path = [A.ovR].concat(A.tubeR.slice().reverse(), [A.cav]);
        const f = u * (path.length - 1), i = Math.min(path.length - 2, Math.floor(f)), r = f - i;
        const p = E.mix(path[i], path[i + 1], r);
        ctx.save(); ctx.globalAlpha = 1 - E.se(t, su + 6, su + 7); P.fillPts(ctx, INK.circlePts(p[0], p[1], 11, 11, 16), PAL.light); INK.stroke(ctx, INK.circlePts(p[0], p[1], 11, 11, 16), { w: 2, closed: true, dry: false }); ctx.restore();
      }
      // döllenme yeri
      const dk = E.se(t, su + 0.3, su + 1.0);
      if (dk > 0) { const p = A.tubeMidR; ctx.save(); ctx.globalAlpha = dk; for (let j = 0; j < 8; j++) { const a = j / 8 * 6.283 + t * 0.6; INK.line(ctx, [p[0] + Math.cos(a) * 16, p[1] + Math.sin(a) * 16], [p[0] + Math.cos(a) * 28, p[1] + Math.sin(a) * 28], { w: 2.6, color: K.AMBER_D, dry: false }); } ctx.restore(); K.text(ctx, 'döllenme genellikle burada', 690, 330, { size: 32, color: K.AMBER_D, alpha: dk, align: 'center' }); }
      // rahim vurgusu (bebek burada gelişir)
      const rk = E.se(t, su + 2.4, su + 3.2) * (1 - E.se(t, sm - 0.5, sm));
      if (rk > 0) { ctx.save(); ctx.globalAlpha = 0.35 * rk; ctx.strokeStyle = PAL.light; ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(A.uterus[0], A.uterus[1] + 10, 120, 150, 0, 0, 7); ctx.stroke(); ctx.restore(); }
      INK.label(ctx, 'şema · ölçekli değildir', 530, 880, { size: 28, align: 'center', alpha: 0.55 * E.se(t, sf + 1, sf + 2) });
      // erkek: görev zinciri şeması
      MALE.forEach(([a, b], i) => {
        const at = sm + 0.6 + i * 1.9, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const y = 350 + i * 150;
        K.node(ctx, a + ': ' + b, 1395, y, k, { size: 40, w: 680, h: 90, tint: i === 0 ? PAL.life : null, tintA: 0.2, seed: 10 + i });
        if (i > 0) P.arrow(ctx, [1395, y - 102], [1395, y - 50], E.se(t, at - 0.4, at), { w: 3, head: 12, color: K.LIFE_D });
      });
      const nk = E.se(t, sm + 8.2, sm + 9.0);
      if (nk > 0) K.text(ctx, 'Organlar birlikte çalışır.', 1395, 865, { size: 38, align: 'center', color: K.LIFE_D, alpha: nk });
    }
  });
})();
