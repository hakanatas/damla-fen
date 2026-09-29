// SAHNE 3 — Gerilim (potansiyel fark): pil, su benzetmesi, voltmetre paralel, volt (V)
(function () {
  const { PAL, stroke, line, wash } = INK;
  const U = U6;
  const BOX = { x0: 250, y0: 400, x1: 850, y1: 720 };
  // su deposu benzetmesi
  function tanks(c, t, k) {
    const hL = 300, hR = E.lerp(110, 140, k * 0);
    [[300, hL], [820, hR]].forEach(([x, h], i) => {
      const tank = CK.rect(x - 110, 700 - 330, 220, 330);
      const water = CK.rect(x - 106, 700 - h, 212, h - 4); P.fillPts(c, water, PAL.water, 0.45); wash(c, water, PAL.water, 0.4, 1930 + i, { bleed: 1, blooms: 0 });
      stroke(c, CK.densify(CK.densify(tank)), { w: 3.2, closed: true, seed: 1932 + i });
    });
    // boru ve akış
    stroke(c, [[410, 660], [710, 660]], { w: 26, color: PAL.ink, dry: false, taper: 0 }); stroke(c, [[410, 660], [710, 660]], { w: 18, color: '#BFD4DF', dry: false, taper: 0 });
    for (let i = 0; i < 6; i++) { const u = ((t * 0.5 + i / 6) % 1); INK.inkDot(c, 420 + u * 280, 660, 4, { color: '46,106,140' }); }
    P.arrow(c, [470, 620], [650, 620], 1, { w: 3, color: PAL.water, head: 12 });
    // seviye farkı ölçüsü
    line(c, [170, 400], [950, 400], { w: 1.6, dry: false, alpha: 0.5 }); line(c, [700, 590], [950, 590], { w: 1.6, dry: false, alpha: 0.5 });
    P.arrow(c, [930, 590], [930, 404], 1, { w: 2.6, head: 12 }); P.arrow(c, [930, 404], [930, 588], 1, { w: 2.6, head: 12 });
    U.txt(c, 'seviye farkı', 960, 505, { size: 36 });
  }
  E.scene({
    name: 'Gerilim', concept: 'Potansiyel fark (gerilim)', from: 'vq', to: 'vdef', trFrom: [960, 540],
    draw(ctx, t) {
      const sq = E.s('vq'), sw = E.s('water'), sv = E.s('voltm'), se = E.s('vexp'), sdf = E.s('vdef');
      // 1) pil: uçları arasında potansiyel fark
      const pA = 1 - E.se(t, sw - 0.2, sw + 0.4);
      if (pA > 0) E.layer(ctx, pA, c => {
        CK.battery(c, 960, 520, 2.6);
        U.txt(c, '+', 1215, 420, { size: 70, align: 'center' }); U.txt(c, '−', 705, 420, { size: 70, align: 'center' });
        const k = E.se(t, sq + 2.5, sq + 3.5);
        if (k > 0) { P.drawOn(c, [[745, 660], [745, 700], [1175, 700], [1175, 660]], k, { w: 3.6, color: U.AMBER, dry: false }); }
        E.inkText(c, 'uçları arasında potansiyel fark = gerilim', 960, 790, t, sq + 3.2, 1e9, { size: 50, align: 'center', color: U.AMBER });
      });
      // 2) benzetme
      const wA = Math.min(E.se(t, sw, sw + 0.6), 1 - E.se(t, sv - 0.2, sv + 0.4));
      if (wA > 0) E.layer(ctx, wA, c => {
        tanks(c, t, 1);
        const at = sw + 1.5;
        [['seviye farkı', 'gerilim'], ['su akışı', 'akım']].forEach(([a, b], i) => { const k = E.seg(t, at + i * 1.4, at + i * 1.4 + 1.2); P.write(c, a + '  ↔  ' + b, 1450, 420 + i * 90, k, { size: 48, align: 'center', color: i ? PAL.water : U.AMBER }); });
        U.txt(c, '(yalnızca bir benzetme)', 1450, 640, { size: 32, align: 'center', alpha: 0.65 * E.seg(t, at + 3, at + 4) });
      });
      // 3) voltmetre paralel + ölçüm
      const vA = E.se(t, sv, sv + 0.6);
      if (vA > 0) E.layer(ctx, vA, c => {
        const cells = t > se + 3.4 ? 2 : 1;
        F19.loop(c, Object.assign({ cells, lit: cells === 2 ? 1 : 0.45, V: true, k: E.se(t, sv, sv + 1.4) }, BOX));
        E.inkText(c, 'voltmetre: elemanın iki ucuna paralel', 560, 200, t, sv + 1.2, sdf, { size: 42, align: 'center', color: U.AMBER });
        if (t > se) {
          const rd = cells === 2 ? '3,0 V' : '1,5 V';
          if (t < sdf + 0.3) E.layer(c, Math.min(E.se(t, se, se + 0.6), 1 - E.se(t, sdf - 0.2, sdf + 0.3)), cc => {
            U.meter(cc, 1150, 470, 1.15, 'V', rd, { name: 'voltmetre' });
            U.grid(cc, 1420, 300, [200, 230], 76, [['Pil sayısı', 'Gerilim'], ['1', '1,5 V'], ['2', '3,0 V']], r => E.seg(t, r === 1 ? se + 1 : se + 4, (r === 1 ? se + 1 : se + 4) + 0.8), { hs: 34, fs: 40 });
            U.txt(cc, 'kontrol: 1 ampul', 1650, 580, { size: 34, align: 'center', alpha: 0.75 });
            U.txt(cc, 'birim: volt (V)', 1650, 650, { size: 42, align: 'center', color: U.AMBER });
          });
        }
        const dk = E.se(t, sdf + 0.2, sdf + 0.9);
        if (dk > 0) E.layer(c, dk, cc => {
          CK.card(cc, 990, 250, 820, 420, { seed: 1921, fill: '#FAF6EC' });
          U.txt(cc, 'Operasyonel tanım', 1400, 320, { size: 40, align: 'center', color: U.AMBER });
          P.write(cc, 'Gerilim (potansiyel fark):', 1050, 410, E.seg(t, sdf + 0.8, sdf + 1.8), { size: 50 });
          P.write(cc, 'voltmetre ile ölçülen,', 1050, 490, E.seg(t, sdf + 1.6, sdf + 2.8), { size: 46, weight: 400 });
          P.write(cc, 'birimi volt (V) olan büyüklük.', 1050, 560, E.seg(t, sdf + 2.6, sdf + 3.8), { size: 46, weight: 400 });
        });
      });
      U.damla(ctx, t, { x: t < sv ? 1700 : 560, y: 960, s: t < sv ? 1.0 : 0.72, view: 'q3', flip: t < sv, expr: 'curious', look: t < sv ? [-0.8, -0.2] : [0.6, -0.6], arms: [[-1, t < sv ? 1.9 : 0.35], [1, t < sv ? 0.4 : 2.0]] });
    }
  });
})();
