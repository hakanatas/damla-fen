// SAHNE 1 — Merak: serbest atomlar birleşip molekül oluşturur (FB.7.5.3 giriş)
(function () {
  const { PAL, rng } = INK;
  const F = F7M;
  // gruplar: molekül adı, hedef merkez, ölçek, atomların başlangıç noktaları
  const G1 = [
    { mol: 'H2', cx: 470, cy: 560, s: 1.2, from: [[260, 420], [600, 700]], at: 0.8 },
    { mol: 'O2', cx: 930, cy: 560, s: 1.0, from: [[800, 450], [1080, 720]], at: 2.0 },
    { mol: 'H2O', cx: 1400, cy: 560, s: 1.1, from: [[1400, 440], [1200, 740], [1640, 700]], at: 3.2 }
  ];
  function group(c, g, t, t0) {
    const m = F.MOL[g.mol]; const k = E.se(t, t0 + g.at, t0 + g.at + 1.6, 'io');
    const pts = m.atoms.map(([el, dx, dy], i) => {
      const f = g.from[i]; const fx = f[0] + Math.sin(t * 0.9 + i * 2 + g.cx) * 18, fy = f[1] + Math.cos(t * 0.7 + i * 3) * 14;
      return [E.lerp(fx, g.cx + dx * g.s, k), E.lerp(fy, g.cy + dy * g.s, k)];
    });
    const bk = E.se(t, t0 + g.at + 1.3, t0 + g.at + 1.8);
    if (bk > 0) { c.save(); c.globalAlpha *= bk; m.bonds.forEach(([i, j, n]) => F.bond(c, pts[i], pts[j], n, { w: 9 * g.s, gap: 13 * g.s })); c.restore(); }
    m.atoms.forEach(([el], i) => { const d = F.EL[el]; F.ball(c, pts[i][0], pts[i][1], d.r * g.s, d.fill, { sym: el, txt: d.txt, symSize: d.r * g.s * 0.85 }); });
  }
  E.scene({
    name: 'Atomlar birleşir', concept: 'Molekül', from: 'title', to: 'moldef',
    draw(ctx, t) {
      const sh = E.s('hello'), sm = E.s('moldef');
      // arka plandaki serbest atomlar (soluk)
      const R = rng(3); const bgA = E.se(t, E.e('title') + 0.8, E.e('title') + 2.0);
      for (let i = 0; i < 12; i++) { const el = ['H', 'O', 'N', 'C'][i % 4], d = F.EL[el]; const x = 120 + R() * 1680, y = 200 + R() * 650; if (Math.abs(y - 560) < 200 && x > 250 && x < 1700) continue; F.ball(ctx, x + Math.sin(t * 0.6 + i) * 20, y + Math.cos(t * 0.5 + i * 2) * 16, d.r * 0.6, d.fill, { alpha: 0.35 * bgA }); }
      G1.forEach(g => group(ctx, g, t, sh));
      // etiketler
      const lk = E.se(t, sm + 0.4, sm + 1.2);
      if (lk > 0) {
        P.write(ctx, 'hidrojen molekülü', 470, 720, lk, { size: 40, align: 'center' });
        P.write(ctx, 'oksijen molekülü', 930, 720, lk, { size: 40, align: 'center' });
        P.write(ctx, 'su molekülü', 1400, 720, lk, { size: 40, align: 'center' });
        const k2 = E.se(t, sm + 1.8, sm + 2.8);
        P.drawOn(ctx, P.bez([300, 760], [700, 772], [1100, 760], 30), k2, { w: 3, color: PAL.water });
        P.write(ctx, 'aynı cins atomlar', 700, 820, k2, { size: 42, align: 'center', color: PAL.water });
        P.drawOn(ctx, P.bez([1250, 760], [1400, 770], [1560, 760], 20), E.se(t, sm + 2.6, sm + 3.4), { w: 3, color: F.BR });
        P.write(ctx, 'farklı cins atomlar', 1400, 820, E.seg(t, sm + 2.6, sm + 3.6), { size: 42, align: 'center', color: F.BR });
      }
      F.damla(ctx, t, { x: 1760, y: 905, s: 0.85, flip: true, expr: t > sh + 3 ? 'surprised' : 'curious', look: [-0.8, -0.3], seed: 2, arms: [[-1, 0.35], [1, 1.9]] });
      F.title(ctx, t, '15 · Molekül Modelleri: Element mi, Bileşik mi?');
    }
  });
})();
