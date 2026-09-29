// SAHNE 4 — Çiçeğin kısımları, tozlaşma, döllenme → meyve ve tohum (kısımlar gösterilerek)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F06;
  E.scene({
    name: 'Çiçek', concept: 'Çiçeğin kısımları; tozlaşma; meyve ve tohum', from: 'flower', to: 'fruit', trFrom: [700, 500],
    draw(ctx, t) {
      const sf = E.s('flower'), sfe = E.s('female'), sp = E.s('pollin'), sr = E.s('fruit');
      const cx = 720, cy = 500, s = 1.1;
      let hi = null;
      if (t >= sf + 0.8 && t < sf + 5.0) hi = t < sf + 2.9 ? 'canak' : 'tac';
      else if (t >= sf + 5.0 && t < sfe) hi = 'erkek';
      else if (t >= sfe && t < sp) hi = 'disi';
      const fr = E.se(t, sr + 1.5, sr + 5.5);
      const A = F.flowerX(ctx, cx, cy, s, t, { hi, fruit: fr });
      INK.label(ctx, 'çiçeğin kesiti · şematik', cx, 920 - 40, { size: 26, align: 'center', alpha: 0.5 });
      // etiketler (sol: çanak, taç ; sağ: erkek, dişi)
      const lk = (a, b) => Math.min(E.se(t, a, a + 0.8), 1 - E.se(t, sr + 0.8, sr + 1.6));
      F.tag(ctx, 'çanak yaprak', 330, 760, A.canak, lk(sf + 0.8, 0), { size: 40, align: 'right', seed: 40 });
      F.tag(ctx, 'taç yaprak', 330, 300, A.tac, lk(sf + 2.9, 0), { size: 40, align: 'right', seed: 41 });
      F.tag(ctx, 'başçık (polen)', 1110, 330, A.basicik2, lk(sf + 5.0, 0), { size: 40, seed: 42 });
      F.tag(ctx, 'sapçık', 1110, 440, [cx + 120 * s, cy + 40 * s], lk(sf + 5.6, 0), { size: 36, seed: 43 });
      if (t > sf + 5.4) INK.label(ctx, 'erkek organ', 1110, 270, { size: 34, alpha: 0.7 * lk(sf + 5.4, 0), weight: 700, color: '#8A6A20' });
      F.tag(ctx, 'tepecik', 1110, 560, A.tepecik, lk(sfe + 1.2, 0), { size: 40, seed: 44 });
      F.tag(ctx, 'dişicik borusu', 1110, 640, A.borusu, lk(sfe + 2.2, 0), { size: 40, seed: 45 });
      F.tag(ctx, 'yumurtalık', 1110, 720, A.yumurtalik, lk(sfe + 3.2, 0), { size: 40, seed: 46 });
      F.tag(ctx, 'tohum taslakları', 1110, 800, [A.yumurtalik[0] + 6, A.yumurtalik[1] + 18], lk(sfe + 4.4, 0), { size: 40, seed: 47 });
      if (t > sfe) INK.label(ctx, 'dişi organ', 1110, 500, { size: 34, alpha: 0.7 * lk(sfe + 0.6, 0), weight: 700, color: F.LIFE_D });
      // tozlaşma: arı başçıktan tepeciğe polen taşır
      const kb = E.se(t, sp - 0.3, sp + 0.8) * (1 - E.se(t, sr + 0.2, sr + 1.0));
      if (kb > 0) {
        const path = [A.basicik, [A.basicik[0] - 40, A.basicik[1] - 120], [A.tepecik[0] + 10, A.tepecik[1] - 130], [A.tepecik[0], A.tepecik[1] - 30]];
        const u = E.se(t, sp + 1.0, sp + 5.0, 'sine');
        const bez3 = (u) => { const [a, b, c, d] = path, v = 1 - u; return [v * v * v * a[0] + 3 * v * v * u * b[0] + 3 * v * u * u * c[0] + u * u * u * d[0], v * v * v * a[1] + 3 * v * v * u * b[1] + 3 * v * u * u * c[1] + u * u * u * d[1]]; };
        const bp = t < sp + 1.0 ? E.mix([1500, 200], [A.basicik[0], A.basicik[1] - 50], E.se(t, sp - 0.3, sp + 1.0)) : [bez3(u)[0], bez3(u)[1] - 50];
        E.layer(ctx, kb, c => {
          // taşınan polenler
          if (t > sp + 1.0) for (let i = 0; i < 5; i++) { const q = bez3(Math.max(0, u - i * 0.03)); INK.inkDot(c, q[0] + (i - 2) * 5, q[1] + 8, 4, { color: '210,170,40' }); }
          if (u > 0.95) for (let i = 0; i < 5; i++) INK.inkDot(c, A.tepecik[0] + (i - 2) * 7, A.tepecik[1] - 10 + (i % 2) * 4, 4, { color: '210,170,40' });
          F.bee(c, bp[0], bp[1], 1.2, t);
          P.drawOn(c, [[A.basicik[0], A.basicik[1] + 30], [A.basicik[0] - 20, A.basicik[1] + 100]], 0, {});
        });
        const kt = E.se(t, sp + 5.0, sp + 5.8);
        if (kt > 0) {
          E.layer(ctx, kt * (1 - E.se(t, sr + 0.2, sr + 1.0)), c => {
            const bx = 1480, by = 250; F.card(c, 1380, 160, 1820, 470, { seed: 48 });
            P.write(c, 'Polen taşıyanlar', 1600, 225, 1, { size: 38, align: 'center' });
            F.icoAir(c, 1470, 320, 0.9, t); INK.label(c, 'rüzgâr', 1470, 400, { size: 32, align: 'center', weight: 700 });
            F.icoWater(c, 1600, 320, 0.9); INK.label(c, 'su', 1600, 400, { size: 32, align: 'center', weight: 700 });
            F.bee(c, 1730, 320, 0.8, t); INK.label(c, 'hayvanlar', 1730, 400, { size: 32, align: 'center', weight: 700 });
          });
        }
      }
      // döllenme → meyve ve tohum
      const kd = E.se(t, sr + 0.4, sr + 1.2) ;
      if (kd > 0) {
        P.write(ctx, 'döllenme', 1150, 300, E.seg(t, sr + 0.6, sr + 1.6), { size: 48, color: F.LIFE_D });
        const k1 = E.se(t, sr + 4.2, sr + 5.2), k2 = E.se(t, sr + 5.4, sr + 6.4);
        P.write(ctx, 'yumurtalık → meyve', 1150, 460, k1, { size: 50 });
        P.write(ctx, 'tohum taslağı → tohum', 1150, 560, k2, { size: 50 });
        if (k1 > 0.5) INK.leader(ctx, [1140, 445], [A.yumurtalik[0] + 70, A.yumurtalik[1] - 60], { w: 1.8 });
        if (k2 > 0.5) INK.leader(ctx, [1140, 545], [A.yumurtalik[0] + 18, A.yumurtalik[1] + 40], { w: 1.8 });
        INK.label(ctx, '(örnek: fasulye kını bir meyvedir)', 1150, 640, { size: 32, alpha: 0.7 * k2 });
      }
    }
  });
})();
