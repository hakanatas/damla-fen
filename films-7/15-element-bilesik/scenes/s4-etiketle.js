// SAHNE 4 — Çevredeki saf maddeleri element / bileşik olarak etiketleme (FB.7.5.4 ç)
(function () {
  const { PAL, stroke } = INK;
  const F = F7M;
  // etil alkol (C₂H₅OH) — 2B şematik top-çubuk çizim
  const ETH = { atoms: [['C', -50, 0], ['C', 50, 0], ['O', 125, -48], ['H', 185, -22], ['H', -100, -40], ['H', -95, 48], ['H', -40, -62], ['H', 40, -64], ['H', 62, 62]],
    bonds: [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 4, 1], [0, 5, 1], [0, 6, 1], [1, 7, 1], [1, 8, 1]] };
  const ITEMS = [
    ['oksijen', 0, c => F.mol(c, 'O2', 0, 0, 0.5, { sym: false })],
    ['azot', 0, c => F.mol(c, 'N2', 0, 0, 0.5, { sym: false })],
    ['demir', 0, c => { [[-26, 12], [26, 12], [0, -30]].forEach(([x, y]) => F.ball(c, x, y, 24, F.EL.Fe.fill, { sym: 'Fe', txt: '#FBF8F1', symSize: 18 })); }],
    ['bakır', 0, c => { [[-26, 12], [26, 12], [0, -30]].forEach(([x, y]) => F.ball(c, x, y, 24, F.EL.Cu.fill, { sym: 'Cu', txt: '#FBF8F1', symSize: 18 })); }],
    ['su', 1, c => F.mol(c, 'H2O', 0, 8, 0.5, { sym: false })],
    ['karbondioksit', 1, c => F.mol(c, 'CO2', 0, 0, 0.45, { sym: false })],
    ['etil alkol', 1, c => F.molecule(c, -10, 8, 0.42, ETH.atoms, ETH.bonds, { sym: false })]
  ];
  const CW = 220, CH = 170;
  function start(i) { return [110 + i * 250, 200]; }
  function target(i) {
    const [, kind] = ITEMS[i];
    if (kind === 0) { const j = i; return [150 + (j % 2) * 260 + 60, 475 + Math.floor(j / 2) * 205]; }
    const j = i - 4; return [1090 + (j % 2) * 260 + 60, 475 + Math.floor(j / 2) * 205];
  }
  E.scene({
    name: 'Etiketle', concept: 'Çevredeki maddeleri sınıflandırma', from: 'label', to: 'rule', trFrom: [960, 300],
    draw(ctx, t) {
      const sl = E.s('label'), sr = E.s('rule');
      // kutular
      [[130, 'ELEMENT', PAL.water, 'tek cins atom'], [1070, 'BİLEŞİK', F.BR, 'farklı cins atomlar']].forEach(([x, nm, col, sub], i) => {
        const b = [[x, 440], [x + 720, 436], [x + 724, 896], [x + 3, 900], [x, 440]];
        P.fillPts(ctx, b, col, 0.08); stroke(ctx, b, { w: 3.2, closed: true, color: col, seed: 900 + i });
        INK.label(ctx, nm + ' · ' + sub, x + 360, 425, { size: 44, weight: 700, align: 'center', color: col, alpha: 0.9 });
      });
      ITEMS.forEach(([nm, kind, draw], i) => {
        const at = sl + 1.0 + i * 1.6; const appear = E.se(t, sl + 0.2 + i * 0.15, sl + 0.7 + i * 0.15, 'out');
        const mv = E.se(t, at, at + 1.0, 'io');
        const [x0, y0] = start(i), [x1, y1] = target(i);
        const x = E.lerp(x0, x1, mv), y = E.lerp(y0, y1, mv) - Math.sin(mv * Math.PI) * 60;
        E.layer(ctx, appear, c => {
          F.card(c, x, y, x + CW, y + CH, { seed: 920 + i, tint: kind ? F.BR : PAL.water, tintA: 0.14 * mv });
          c.save(); c.translate(x + CW / 2, y + 70); draw(c); c.restore();
          F.txt(c, nm, x + CW / 2, y + CH - 16, { size: F.fit(c, nm, CW - 20, 34), align: 'center' });
        });
      });
      // kural sorusu
      const qk = E.se(t, sr + 0.2, sr + 1.0);
      if (qk > 0) E.layer(ctx, qk, c => {
        F.card(c, 360, 170, 1560, 350, { seed: 951 });
        P.write(c, 'Tek cins atom mu?  →  element', 420, 245, E.seg(t, sr + 0.4, sr + 1.6), { size: 46, color: PAL.water });
        P.write(c, 'Farklı cins atomlar mı?  →  bileşik', 420, 315, E.seg(t, sr + 1.6, sr + 2.8), { size: 46, color: F.BR });
      });
    }
  });
})();
