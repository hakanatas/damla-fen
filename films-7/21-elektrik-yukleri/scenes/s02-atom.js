// SAHNE 2 — Atomdaki yükler (temel kabul): proton (+), elektron (−), nötron (yüksüz); yer değiştiren yalnızca elektronlardır.
(function () {
  const { PAL, line, stroke } = INK;
  const F = F721;
  E.scene({
    name: 'Atomdaki yükler', concept: 'Proton, elektron', from: 'atom', to: 'move', trFrom: [700, 520],
    draw(ctx, t) {
      const sa = E.s('atom'), sm = E.s('move');
      F.bg(ctx);
      const mv = E.se(t, sm - 0.2, sm + 0.8);
      const ax = E.lerp(760, 460, mv), s = E.lerp(1.5, 1.0, mv);
      F.atom(ctx, ax, 520, s, t, { p: 3, n: 4, e: 3 });
      F.fit(ctx, '(çizim ölçekli değildir)', ax, 800 - mv * 80, 400, 28, { weight: 400, alpha: 0.65 });
      // etiketler
      E.layer(ctx, 1 - mv, c => {
        [['çekirdek: proton (+)', F.POS, 390], ['nötron: yüksüz', PAL.ink, 470], ['elektron (−)', F.NEG, 610]].forEach(([txt, col, y], i) => {
          const at = sa + 1.5 + i * 1.4; if (t < at) return;
          c.save(); c.globalAlpha *= E.se(t, at, at + 0.5);
          INK.leader(c, [1160, y - 12], [i === 2 ? 990 : 790, i === 2 ? 560 : 510], { bend: 0.1 });
          F.fit(c, txt, 1180, y, 600, 44, { align: 'left', color: col });
          c.restore();
        });
      });
      // elektronun atlaması
      if (mv > 0) E.layer(ctx, mv, c => {
        const lock = E.se(t, sm + 1.0, sm + 1.6);
        c.save(); c.globalAlpha *= lock;
        F.fit(c, 'protonlar çekirdekte kalır', 460, 250, 560, 40, { color: F.POS });
        c.restore();
        const bx = 1400, by = 520;
        F.card(c, 1000, 330, 800, 380, 211, { tint: PAL.water, tintA: 0.08 });
        F.fit(c, 'cisim A', 1180, 390, 200, 38); F.fit(c, 'cisim B', 1620, 390, 200, 38);
        const k = E.se(t, sm + 2.2, sm + 4.0);
        [[1100, 480], [1250, 560], [1130, 640]].forEach(([x, y], i) => { F.charge(c, x, y, 1, 16); if (i < 2) F.charge(c, x + 40, y, -1, 16); });
        [[1540, 480], [1690, 560], [1560, 640]].forEach(([x, y], i) => { F.charge(c, x, y, 1, 16); F.charge(c, x + 40, y, -1, 16); });
        const p = E.mix([1170, 640], [1640, 470], k); F.charge(c, p[0], p[1] - Math.sin(k * Math.PI) * 80, -1, 16);
        P.arrow(c, [1260, 690], [1560, 690], E.se(t, sm + 2.2, sm + 3.2), { w: 3, color: F.NEG, bend: 30, head: 14 });
        F.wfit(c, 'yer değiştiren: yalnızca elektronlar', 1400, 780, E.seg(t, sm + 3.6, sm + 4.8), 42, 800, { align: 'center', color: F.NEG });
      });
      F.damla(ctx, t, { x: 1830, y: 900, s: 0.85, view: 'q3', flip: true, expr: 'curious', look: [-0.8, -0.3] });
    }
  });
})();
