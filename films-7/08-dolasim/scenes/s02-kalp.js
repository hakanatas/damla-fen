// SAHNE 2 — Dolaşım sistemi: kalp, damarlar, kan; kalbin yeri ve pompa görevi
(function () {
  const { PAL, leader } = INK; const K = KIT, F = F08;
  const beatK = t => { const ph = (t % 0.8) / 0.8; return ph < 0.3 ? Math.sin(ph / 0.3 * Math.PI) : 0; };
  E.scene({
    name: 'Kalp', concept: 'Dolaşım sistemi ve kalp', from: 'system', to: 'pump', trFrom: [590, 520],
    draw(ctx, t) {
      const ss = E.s('system'), sj = E.s('job'), sh = E.s('heart'), sp = E.s('pump');
      F.silhouette(ctx);
      const lk = E.se(t, sh + 0.3, sh + 1.2);
      ctx.save(); ctx.globalAlpha *= 0.25 + 0.75 * lk; F.lung(ctx, 480, 520, 1.0, -1); F.lung(ctx, 690, 520, 0.95, 1); ctx.restore();
      const vk = E.se(t, sj + 0.3, sj + 3.0);
      F.vessels(ctx, vk, { a: t > sh ? 0.35 : 0.8 });
      if (t > sj + 2 && t < sh + 0.5) { ctx.save(); ctx.globalAlpha *= E.se(t, sj + 2, sj + 2.6) * (1 - E.se(t, sh, sh + 0.5)); F.flow(ctx, t); ctx.restore(); }
      F.heart(ctx, 596, 530, 0.55, { beat: beatK(t), glow: t > sh });
      INK.label(ctx, 'model · ölçekli değildir', 60, 205, { size: 28, alpha: 0.55 });
      // bileşenler
      const nk = E.se(t, ss + 2.0, ss + 2.6, 'out'), no = 1 - E.se(t, sh - 0.3, sh + 0.3);
      if (nk * no > 0) E.layer(ctx, nk * no, c => {
        K.node(c, 'Dolaşım sistemi', 1360, 280, 1, { size: 48, nopop: true, seed: 1 });
        [['kalp', F.HEART], ['kan damarları', F.OXY], ['kan', '#7A2F26']].forEach(([n, col], i) => { const k = E.se(t, ss + 3 + i * 0.8, ss + 3.6 + i * 0.8, 'out'); if (k <= 0) return; P.drawOn(c, [[1360, 320], [1060 + i * 300, 400]], k, { w: 2.4 }); K.node(c, n, 1060 + i * 300, 440, k, { size: 40, tint: col, tintA: 0.2, seed: 2 + i }); });
        const jk = E.se(t, sj + 0.5, sj + 1.2); if (jk > 0) { c.save(); c.globalAlpha *= jk; K.card(c, 980, 560, 780, 260, { seed: 8300, tint: PAL.light, tintA: 0.08 }); c.restore();
          K.text(c, 'bütün vücuda taşır:', 1030, 640, { size: 42, alpha: jk, color: K.AMBER_D }); P.write(c, 'oksijen · besin · atık madde', 1030, 730, E.seg(t, sj + 1.2, sj + 2.6), { size: 44 }); }
      });
      // kalbin yeri
      const hk = E.se(t, sh + 0.5, sh + 1.2);
      if (hk > 0) { ctx.save(); ctx.globalAlpha = hk; leader(ctx, [880, 560], [640, 548], { bend: -0.05 }); leader(ctx, [880, 380], [700, 470], { bend: 0.05 }); ctx.restore();
        K.text(ctx, 'kalp', 890, 572, { size: 44, color: F.HEART, alpha: hk }); K.text(ctx, 'akciğerler', 890, 392, { size: 38, alpha: hk });
        const mk = E.se(t, sh + 2.5, sh + 3.2); ctx.save(); ctx.globalAlpha = mk; INK.dashed(ctx, F.cr([[560, 420], [560, 900]], 60), { w: 2, color: PAL.ink, alpha: 0.5 }); ctx.restore();
        K.text(ctx, 'orta çizgi', 470, 950 - 60, { size: 26, alpha: mk * 0.6, align: 'right' }); K.text(ctx, 'biraz solda', 890, 640, { size: 32, alpha: mk * 0.8 }); }
      // pompa kartı
      const pk = E.se(t, sp + 0.2, sp + 0.9, 'out');
      if (pk > 0) E.layer(ctx, pk, c => {
        K.card(c, 1150, 230, 690, 560, { seed: 8310, tint: F.HEART, tintA: 0.07 });
        K.text(c, 'Kalp bir pompadır', 1195, 310, { size: 50, color: F.HEART });
        F.heart(c, 1350, 520, 1.25, { beat: beatK(t) });
        // yumruk (sade)
        const fx = 1640, fy = 520; const fist = F.closed([[fx - 70, fy - 40], [fx + 40, fy - 60], [fx + 72, fy - 10], [fx + 60, fy + 60], [fx - 40, fy + 70], [fx - 76, fy + 20]], 5); P.fillPts(c, fist, F.SKIN); INK.stroke(c, fist, { w: 3, closed: true });
        [-40, -8, 24].forEach(dx => INK.line(c, [fx + dx, fy - 52], [fx + dx + 6, fy - 12], { w: 2, dry: false })); INK.stroke(c, F.cr([[fx - 60, fy + 10], [fx - 20, fy + 20], [fx + 10, fy + 6]], 6), { w: 2.4, dry: false });
        K.text(c, '≈ yumruk kadar', 1640, 640, { size: 34, align: 'center', alpha: E.se(t, sp + 1, sp + 1.6) });
        P.write(c, 'kasılır → kanı damarlara iter', 1195, 715, E.seg(t, sp + 2.5, sp + 3.8), { size: 38 });
        P.write(c, 'gevşer → kan kalbe dolar', 1195, 770, E.seg(t, sp + 3.8, sp + 5.0), { size: 38 });
      });
    }
  });
})();
