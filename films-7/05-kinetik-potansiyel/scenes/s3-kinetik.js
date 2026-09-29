// SAHNE 3 — Kinetik enerji (FB.7.2.2 a): sürat ve kütle etkisi; top kutuyu ne kadar iterse o kadar çok iş → o kadar çok enerji
(function () {
  const { PAL, line, stroke } = INK;
  const F = F7E, A = F75;
  const BOX = 1130;
  // tek şerit: top t0..t1 arasında kutuya ulaşır, sonra kutu 'push' px kayar
  function lane(ctx, t, fy, t0, t1, r, col, push, name, seed, o = {}) {
    F.floor(ctx, fy, seed, 150, 1560, fy + 60);
    F.txt(ctx, name, 190, fy - 150, { size: 42, color: o.lc ?? PAL.ink });
    const m = E.seg(t, t0, t1);
    const bx = E.lerp(260, BOX - 70 - r, m);
    const pk = E.se(t, t1, t1 + 1.0, 'out');
    F.box(ctx, BOX + push * pk, fy, 140, 110, seed + 10);
    F.ball(ctx, bx, fy - r, r, col, seed + 20, { stripe: o.stripe });
    if (m > 0.02 && m < 1) A.motion(ctx, bx - r - 16, fy - r, o.fast ? 4 : 2, o.fast ? 90 : 36, 0.55);
    if (pk > 0) F.disp(ctx, [BOX, fy + 34], [BOX + push, fy + 34], pk, { label: o.plab, lx: push / 2 + 20, ly: 12, size: 30, align: 'left' });
  }
  E.scene({
    name: 'Kinetik enerji', concept: 'Hareketten kaynaklanan enerji', from: 'ke', to: 'ke', trFrom: [960, 540],
    draw(ctx, t) {
      const s = E.s('ke');
      F.card(ctx, 250, 220, 1500, 420, { seed: 5300 });
      P.write(ctx, 'Kinetik enerji', 300, 300, E.seg(t, s + 0.3, s + 1.2), { size: 64, color: '#9A6412' });
      P.write(ctx, 'Cismin hareketinden dolayı sahip olduğu enerji', 300, 380, E.seg(t, s + 1.2, s + 2.8), { size: 44 });
      F.floor(ctx, 780, 7);
      const x = E.lerp(150, 1500, E.seg(t, s + 1.0, s + 6.5));
      F.ball(ctx, x, 780 - 44, 44, F.KE, 5310, { stripe: true }); A.motion(ctx, x - 60, 736, 3, 60, 0.5);
      DAMLA.draw(ctx, { x: 1740, y: 780, s: 1.0, view: 'q3', flip: true, expr: 'happy', look: [-0.8, 0.2], blink: E.blink(t, 4), squash: E.breath(t), t, seed: 1, arms: [[-1, [-90, -140]], [1, 0.4]] });
    }
  });
  E.scene({
    name: 'Sürat ve kütle', concept: 'Kinetik enerji sürate ve kütleye bağlıdır', from: 'ke-speed', to: 'ke-rest', trFrom: [700, 540],
    draw(ctx, t) {
      const sv = E.s('ke-speed'), sm = E.s('ke-mass'), sr = E.s('ke-rest');
      const kA = 1 - E.se(t, sm - 0.4, sm + 0.2), kB = E.se(t, sm, sm + 0.6);
      if (kA > 0) E.layer(ctx, kA, c => {
        lane(c, t, 470, sv + 1.0, sv + 4.4, 38, F.KE, 70, 'yavaş', 5400, { ease: 'io', plab: 'az' });
        lane(c, t, 800, sv + 2.2, sv + 3.6, 38, F.KE, 250, 'hızlı', 5430, { fast: true, plab: 'çok', lc: '#9A6412' });
        E.inkText(c, 'aynı top', 760, 250, t, sv + 0.4, 1e9, { size: 40, align: 'center', alpha: 0.75 });
        E.inkText(c, 'sürat ↑ → kinetik enerji ↑', 1440, 610, t, sv + 6.2, 1e9, { size: 44, align: 'center', color: '#9A6412' });
      });
      if (kB > 0) E.layer(ctx, kB, c => {
        lane(c, t, 470, sm + 1.6, sm + 3.4, 24, '#A8B83A', 70, 'tenis topu', 5460, { plab: 'az' });
        lane(c, t, 800, sm + 1.6, sm + 3.4, 50, '#2B2A33', 250, 'bowling topu', 5490, { plab: 'çok', lc: '#9A6412' });
        E.inkText(c, 'aynı sürat', 760, 250, t, sm + 0.6, 1e9, { size: 40, align: 'center', alpha: 0.75 });
        E.inkText(c, 'kütle ↑ → kinetik enerji ↑', 1440, 610, t, sr + 0.2, 1e9, { size: 44, align: 'center', color: '#9A6412' });
        const rk = E.se(t, sr + 3.4, sr + 4.2);
        if (rk > 0) { c.save(); c.globalAlpha *= rk; F.tag(c, 'duran cisim → kinetik enerji yok', 1400, 320, { size: 36, seed: 5520 }); c.restore(); }
      });
      DAMLA.draw(ctx, { x: 1790, y: 470, s: 0.75, view: 'q3', flip: true, expr: 'curious', look: [-0.8, 0.3], blink: E.blink(t, 5), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, 0.4]] });
    }
  });
})();
