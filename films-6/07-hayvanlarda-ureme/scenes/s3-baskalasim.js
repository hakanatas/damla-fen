// SAHNE 5 — Başkalaşım: kelebek (tam), çekirge (eksik), kurbağa (başkalaşım); görsellere odaklanarak inceleme
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F07;
  const stageCircle = (ctx, x, y, r, k, sd) => { const b = circlePts(x, y, r * P.pop(k), r * 0.86 * P.pop(k), 40); P.fillPts(ctx, b, '#FBF8F1'); INK.wash(ctx, b, F.LIFE, 0.14, 7800 + sd, { bleed: 2, blooms: 0 }); stroke(ctx, b, { w: 2.4, closed: true, seed: 7810 + sd }); };
  E.scene({
    name: 'Başkalaşım', concept: 'Tam ve eksik başkalaşım; kurbağa', from: 'meta', to: 'frog', trFrom: [960, 540],
    draw(ctx, t) {
      const sm = E.s('meta'), sb = E.s('butterfly'), sg = E.s('grass'), sf = E.s('frog');
      // 1) giriş: tırtıl ve kelebek — aynı hayvan mı?
      const a1 = 1 - E.se(t, sb - 0.3, sb + 0.4);
      if (a1 > 0) E.layer(ctx, a1, c => {
        F.leaf(c, 280, 640, 360, -0.1, 90, { wr: 0.3 }); F.caterpillar(c, 520, 610, 1.6, t);
        F.butterfly(c, 1400, 520, 1.6, t);
        P.write(c, '=', 960, 590, E.seg(t, sm + 1.5, sm + 2.2), { size: 120, align: 'center' });
        P.write(c, 'aynı hayvan!', 960, 720, E.seg(t, sm + 2.2, sm + 3.2), { size: 50, align: 'center', color: F.LIFE_D });
        P.write(c, 'başkalaşım = gelişirken şekil değiştirme', 960, 300, E.seg(t, sm + 3.4, sm + 4.8), { size: 50, align: 'center' });
      });
      // 2) kelebek döngüsü
      const a2 = E.se(t, sb - 0.2, sb + 0.5) * (1 - E.se(t, sg - 0.3, sg + 0.4));
      if (a2 > 0) E.layer(ctx, a2, c => {
        const C = [960, 540], ST = [
          { n: 'yumurta', p: [960, 290], d: (cc, x, y) => { F.leaf(cc, x - 70, y + 20, 140, -0.2, 91, { wr: 0.35 }); F.eggs(cc, x, y + 4, 4, 9, { fill: '#F6ECC0' }); } },
          { n: 'tırtıl (larva)', p: [1350, 540], d: (cc, x, y) => F.caterpillar(cc, x + 70, y + 20, 1.1, t) },
          { n: 'pupa', p: [960, 790], d: (cc, x, y) => { line(cc, [x - 60, y - 70], [x + 60, y - 70], { w: 4, color: '#6E5234' }); F.pupa(cc, x, y + 6, 1.1); } },
          { n: 'ergin kelebek', p: [570, 540], d: (cc, x, y) => F.butterfly(cc, x, y, 1.0, t) }
        ];
        ST.forEach((st, i) => { const at = sb + 0.8 + i * 1.6, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return; const [x, y] = st.p; stageCircle(c, x, y, 120, k, i); E.layer(c, k, cc => st.d(cc, x, y)); INK.label(c, st.n, x, y + (i === 2 ? -122 : 138), { size: 38, weight: 700, align: 'center', alpha: k });
          const nx = ST[(i + 1) % 4].p, ka = E.se(t, at + 0.7, at + 1.3); if (ka > 0 && (i < 3 || t > sb + 7.4)) { const m = [(st.p[0] + nx[0]) / 2 + (nx[1] - st.p[1]) * 0.25 * -1, (st.p[1] + nx[1]) / 2 + (nx[0] - st.p[0]) * 0.25]; const v = [nx[0] - st.p[0], nx[1] - st.p[1]], L = Math.hypot(v[0], v[1]); const a = [st.p[0] + v[0] / L * 150, st.p[1] + v[1] / L * 150], b = [nx[0] - v[0] / L * 150, nx[1] - v[1] / L * 150]; P.arrow(c, a, b, i === 3 ? E.se(t, sb + 7.4, sb + 8.0) : ka, { w: 3, head: 13, c: m, color: F.LIFE_D }); } });
        const kt = E.se(t, sb + 8.2, sb + 9.0, 'back');
        if (kt > 0) { c.save(); c.translate(C[0], C[1]); c.scale(kt, kt); c.font = '700 50px Kalam'; c.textAlign = 'center'; c.fillStyle = F.LIFE_D; c.fillText('tam', 0, -6); c.fillText('başkalaşım', 0, 50); c.restore(); }
      });
      // 3) çekirge: eksik başkalaşım
      const a3 = E.se(t, sg - 0.2, sg + 0.5) * (1 - E.se(t, sf - 0.3, sf + 0.4));
      if (a3 > 0) E.layer(ctx, a3, c => {
        const gy = 700; line(c, [120, gy], [1800, gy - 4], { w: 3, seed: 92 });
        const S = [
          { n: 'yumurta', x: 260, d: cc => { F.eggs(cc, 260, gy + 40, 6, 9, { fill: '#F2E6C8' }); } },
          { n: 'nimf', x: 640, d: cc => F.hopper(cc, 610, gy, 0.8, 0) },
          { n: 'nimf (büyümüş)', x: 1060, d: cc => F.hopper(cc, 1020, gy, 1.05, 0.3) },
          { n: 'ergin çekirge', x: 1540, d: cc => F.hopper(cc, 1490, gy, 1.35, 1) }
        ];
        S.forEach((st, i) => { const at = sg + 0.6 + i * 1.3, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return; E.layer(c, k, st.d); INK.label(c, st.n, st.x, gy + 120, { size: 40, weight: 700, align: 'center', alpha: k });
          if (i > 0) { const ka = E.se(t, at - 0.4, at + 0.2); P.arrow(c, [S[i - 1].x + 120, gy - 200], [st.x - 120, gy - 200], ka, { w: 3, head: 13, bend: 30 }); if (i > 1) INK.label(c, 'deri değiştirir', (S[i - 1].x + st.x) / 2, gy - 250, { size: 30, align: 'center', alpha: 0.75 * ka }); } });
        P.write(c, 'Yavru erginine benzer; kanatları gelişmemiştir.', 960, 330, E.seg(t, sg + 1.5, sg + 3.2), { size: 46, align: 'center' });
        const kt = E.se(t, sg + 7.0, sg + 7.8);
        P.write(c, 'eksik başkalaşım', 960, 250, kt, { size: 58, align: 'center', color: F.LIFE_D });
      });
      // 4) kurbağa
      const a4 = E.se(t, sf - 0.2, sf + 0.5);
      if (a4 > 0) E.layer(ctx, a4, c => {
        const water = [[100, 480], [1820, 476], [1820, 820], [100, 824]]; INK.wash(c, water, PAL.water, 0.2, 93, { bleed: 3, blooms: 1 });
        const S = [
          { n: 'yumurtalar', x: 250, d: cc => F.eggs(cc, 250, 640, 9, 13, { dot: 1, fill: '#F1F0E4', col: '#8A9A9E' }) },
          { n: 'iribaş', x: 600, d: cc => F.tadpole(cc, 620, 650, 1.3, t, 0, 1) },
          { n: 'arka bacaklar', x: 960, d: cc => F.tadpole(cc, 990, 650, 1.5, t + 1, 1, 1) },
          { n: 'ön bacaklar', x: 1320, d: cc => F.tadpole(cc, 1340, 650, 1.6, t + 2, 2, 0.5) },
          { n: 'kurbağa', x: 1660, d: cc => F.frog(cc, 1660, 700, 1.3) }
        ];
        S.forEach((st, i) => { const at = sf + 0.8 + i * 1.3, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return; E.layer(c, k, st.d); INK.label(c, st.n, st.x, 880, { size: 38, weight: 700, align: 'center', alpha: k });
          if (i > 0) P.arrow(c, [S[i - 1].x + 100, 520], [st.x - 100, 520], E.se(t, at - 0.4, at + 0.2), { w: 3, head: 13, bend: 20 }); });
        P.write(c, 'Kurbağa da başkalaşım geçirir.', 960, 300, E.seg(t, sf + 0.4, sf + 1.8), { size: 54, align: 'center', color: F.LIFE_D });
        INK.label(c, 'suda', 150, 520, { size: 30, alpha: 0.6 }); INK.label(c, 'karada ve suda', 1760, 520, { size: 30, alpha: 0.6, align: 'right' });
      });
    }
  });
})();
