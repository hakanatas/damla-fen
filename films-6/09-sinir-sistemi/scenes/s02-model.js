// SAHNE 2 — Sinir sistemi modeli: merkezî ve çevresel bölümler (a: özellikleri tanımlar, b: model üzerinde inceler)
(function () {
  const { PAL, leader } = INK; const K = KIT, F = F09;
  E.scene({
    name: 'Model', concept: 'Merkezî ve çevresel sinir sistemi', from: 'system', to: 'peripheral', trFrom: [560, 400],
    draw(ctx, t) {
      const ss = E.s('system'), sm = E.s('model'), sc = E.s('central'), sp = E.s('peripheral');
      const on = E.se(t, ss + 1.0, ss + 3.0);
      const cns = t < sc ? on : t < sp ? 1 : 0.4, pns = t < sc ? on : t < sp ? 0.25 : 1;
      E.layer(ctx, E.se(t, ss, ss + 0.8), c => F.body(c, 560, 545, 0.98, { cns, pns }));
      INK.label(ctx, 'model · ölçekli değildir', 60, 890, { size: 28, alpha: 0.55 });
      // tanım kartı
      const dk = E.se(t, ss + 1.5, ss + 2.2, 'out') * (1 - E.se(t, sm - 0.2, sm + 0.4));
      if (dk > 0) E.layer(ctx, dk, c => {
        K.card(c, 1000, 260, 800, 400, { seed: 8100, tint: PAL.life, tintA: 0.1 });
        K.text(c, 'Sinir sistemi', 1060, 350, { size: 54, color: K.LIFE_D });
        ['vücudu denetler ve düzenler,', 'sistemlerin uyum içinde', 'çalışmasını sağlar.'].forEach((l, i) => P.write(c, l, 1060, 450 + i * 64, E.seg(t, ss + 2.5 + i * 1.0, ss + 3.5 + i * 1.0), { size: 44 }));
      });
      // ağaç
      const tk = E.se(t, sm + 0.2, sm + 0.8, 'out');
      if (tk > 0) {
        K.node(ctx, 'Sinir sistemi', 1400, 250, tk, { size: 46, seed: 4 });
        const kA = E.se(t, sm + 3.0, sm + 3.6, 'out'), kB = E.se(t, sm + 5.0, sm + 5.6, 'out');
        if (kA > 0) { P.drawOn(ctx, P.bez([1340, 290], [1200, 320], [1150, 380], 16), kA, { w: 2.6 }); K.node(ctx, 'Merkezî', 1150, 420, kA, { size: 44, tint: PAL.life, seed: 5 }); }
        if (kB > 0) { P.drawOn(ctx, P.bez([1460, 290], [1600, 320], [1650, 380], 16), kB, { w: 2.6 }); K.node(ctx, 'Çevresel', 1650, 420, kB, { size: 44, seed: 6 }); }
        ['beyin', 'beyincik', 'omurilik soğanı', 'omurilik'].forEach((n, i) => { const k = E.se(t, sc + 0.6 + i * 0.9, sc + 1.1 + i * 0.9, 'out'); if (k <= 0) return; K.node(ctx, n, 1150, 530 + i * 90, k, { size: 38, w: 320, h: 70, tint: PAL.life, tintA: 0.15, seed: 7 + i }); });
        if (t > sc + 0.5) P.drawOn(ctx, [[1150, 460], [1150, 495]], E.se(t, sc + 0.4, sc + 0.8), { w: 2.4 });
        const kp = E.se(t, sp + 1.0, sp + 1.6, 'out');
        if (kp > 0) { P.drawOn(ctx, [[1650, 460], [1650, 495]], kp, { w: 2.4 }); K.node(ctx, ['beyin ve omurilikten', 'çıkan sinirler'], 1650, 565, kp, { size: 38, seed: 12 }); K.text(ctx, 'bütün vücuda uzanır', 1650, 700, { size: 34, align: 'center', alpha: E.se(t, sp + 2.5, sp + 3.2) }); }
      }
      // koruyan kemikler
      const bk = E.se(t, sc + 5.5, sc + 6.2) * (1 - E.se(t, sp, sp + 0.5));
      if (bk > 0) { ctx.save(); ctx.globalAlpha = bk; leader(ctx, [365, 250], [505, 230], { bend: 0.1 }); leader(ctx, [345, 520], [548, 450], { bend: -0.1 }); ctx.restore();
        K.text(ctx, 'kafatası korur', 150, 262, { size: 34, color: '#8A6A45', alpha: bk }); K.text(ctx, 'omurga korur', 130, 532, { size: 34, color: '#8A6A45', alpha: bk }); }
      // renk anahtarı
      const lk = E.se(t, sm + 3.0, sm + 3.6);
      if (lk > 0) { ctx.save(); ctx.globalAlpha = lk; INK.stroke(ctx, [[1000, 870], [1060, 870]], { w: 10, color: F.CNS_D, dry: false }); INK.stroke(ctx, [[1400, 870], [1460, 870]], { w: 2.4, color: '#5A4A3A', dry: false }); ctx.restore();
        K.text(ctx, 'merkezî', 1075, 882, { size: 34, alpha: lk }); K.text(ctx, 'çevresel (sinirler)', 1475, 882, { size: 34, alpha: lk }); }
    }
  });
})();
