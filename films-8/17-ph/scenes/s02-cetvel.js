// SAHNE 2 — pH cetveli (0–14) · ölçüm araçları · veri → örüntü → genelleme (FB.8.5.7 a, b — tümevarımsal akıl yürütme)
(function () {
  const { PAL, line, circlePts } = INK;
  const U = U5;
  const X0 = 172, CW = 105, RY = 250, RH = 96;
  const X = ph => U.phX(X0, CW, ph);
  // yaklaşık pH değerleri (25 °C); [ad, pH, gösterim, satır, beat, gecikme]
  const DATA = [
    ['limon suyu', 2, '≈ 2', 0, 'data', 0.5], ['sirke', 3, '≈ 3', 1, 'data', 2.0], ['yoğurt', 4.5, '≈ 4,5', 2, 'data', 3.4], ['süt', 6.5, '≈ 6,5', 0, 'data', 4.8],
    ['saf su', 7, '7', 2, 'data2', 0.4], ['karbonatlı su', 8.3, '≈ 8,3', 1, 'data2', 1.8], ['sabunlu su', 10, '≈ 10', 0, 'data2', 3.3], ['çamaşır suyu', 12.5, '≈ 12,5', 1, 'data2', 4.8]
  ];
  const ROWS = [520, 610, 700];
  function meter(ctx, x, by, t) {
    U.beaker(ctx, x, by, 1.1, { liq: U.SAMP[0].col, lvl: 0.55, name: 'limon suyu', nameSize: 32, seed: 6100 });
    const box = U.rect(x + 110, by - 330, x + 290, by - 170);
    P.fillPts(ctx, box, '#5A6470'); INK.stroke(ctx, box, { w: 2.6, closed: true, dry: false });
    const dsp = U.rect(x + 128, by - 312, x + 272, by - 250); P.fillPts(ctx, dsp, '#2F3A33');
    U.txt(ctx, 'pH 2,0', x + 200, by - 266, { size: 36, align: 'center', color: '#B9F0A0' });
    line(ctx, [x + 200, by - 170], [x + 30, by - 250], { w: 3, dry: false });
    line(ctx, [x + 30, by - 250], [x + 20, by - 40], { w: 9, dry: false, color: '#8C9198' });
    U.txt(ctx, 'pH metre', x + 200, by - 350, { size: 34, align: 'center' });
  }
  E.scene({
    name: 'pH cetveli', concept: 'pH cetveli, veri, örüntü, genelleme', from: 'scale', to: 'strength', trFrom: [960, 300],
    draw(ctx, t) {
      const ss = E.s('scale'), sm = E.s('measure'), sp = E.s('pattern'), sg = E.s('general'), st = E.s('strength');
      U.phRuler(ctx, X0, RY, CW, RH, E.se(t, ss + 0.4, ss + 4.0));
      U.txt(ctx, '(renkler: mor lahana suyunun yaklaşık tonları)', 1747, RY + RH + 92, { size: 26, align: 'right', alpha: 0.5 * Math.min(E.se(t, ss + 4, ss + 5), 1 - E.se(t, E.s('data') - 0.3, E.s('data') + 0.2)) });
      // ölçüm araçları
      const mk = Math.min(E.se(t, sm + 0.2, sm + 0.8), 1 - E.se(t, E.s('data') - 0.2, E.s('data') + 0.4));
      if (mk > 0) E.layer(ctx, mk, c => {
        meter(c, 520, 880, t);
        // pH kâğıdı + renk skalası
        U.strip(c, 1150, 520, 44, 260, '#E8D9A8', '#C8233F', 0.35, E.se(t, sm + 1.5, sm + 2.5), { seed: 6110 });
        U.txt(c, 'pH kâğıdı', 1150, 830, { size: 34, align: 'center' });
        P.arrow(c, [1200, 740], [1300, 700], E.se(t, sm + 2.5, sm + 3.2), { w: 3, head: 12 });
        for (let i = 0; i <= 6; i++) { const r = U.rect(1320 + i * 56, 670, 1370 + i * 56, 720); P.fillPts(c, r, U.cab(i * 2 + 1), 0.7); INK.stroke(c, r, { w: 1.4, closed: true, dry: false, alpha: 0.6 }); }
        U.txt(c, 'renk skalasıyla karşılaştır', 1515, 770, { size: 30, align: 'center', alpha: E.se(t, sm + 3, sm + 3.6) });
      });
      // veri noktaları
      DATA.forEach(([nm, ph, show, row, beat, d]) => {
        const at = E.s(beat) + d, k = E.se(t, at, at + 0.6); if (k <= 0) return;
        const x = X(ph), y = ROWS[row];
        ctx.save(); ctx.globalAlpha *= k;
        const pts = []; for (let yy = RY + RH + 56; yy < y - 70; yy += 4) pts.push([x, yy]);
        if (pts.length > 1) INK.dashed(ctx, pts, { w: 2, on: 8, off: 6, color: PAL.inkSoft });
        const dot = circlePts(x, y - 52, 14, 14, 20); P.fillPts(ctx, dot, U.cab(ph), 0.9); INK.stroke(ctx, dot, { w: 2, closed: true, dry: false });
        U.txt(ctx, nm, x, y, { size: 34, align: 'center' });
        U.txt(ctx, show, x, y + 42, { size: 36, align: 'center', color: PAL.water });
        ctx.restore();
      });
      // örüntü: bölge ayraçları
      const zk = E.se(t, sp + 0.5, sp + 1.3);
      if (zk > 0) {
        ctx.save(); ctx.globalAlpha *= zk;
        const Z = [[0, 6, 'ASİT', U.ACID], [7, 7, 'NÖTR', PAL.ink], [8, 14, 'BAZ', U.BASE]];
        Z.forEach(([a, b, w, col]) => { const xa = X0 + a * CW + 8, xb = X0 + (b + 1) * CW - 8, y = RY - 18; line(ctx, [xa, y + 12], [xa, y], { w: 3, dry: false, color: col }); line(ctx, [xa, y], [xb, y], { w: 3, dry: false, color: col }); line(ctx, [xb, y], [xb, y + 12], { w: 3, dry: false, color: col }); U.txt(ctx, w, (xa + xb) / 2, y - 12, { size: w === 'NÖTR' ? 32 : 42, align: 'center', color: col }); });
        ctx.restore();
      }
      // genelleme kartı
      const gk = Math.min(E.se(t, sg + 0.3, sg + 0.9), 1 - E.se(t, st - 0.2, st + 0.3));
      if (gk > 0) E.layer(ctx, gk, c => {
        U.card(c, 300, 790, 1320, 100, { seed: 6120, tint: PAL.light, tintA: 0.14 });
        c.font = '700 46px Kalam';
        P.write(c, 'pH < 7 → asit', 360, 857, E.seg(t, sg + 0.8, sg + 1.6), { size: 46, color: U.ACID });
        P.write(c, 'pH = 7 → nötr', 820, 857, E.seg(t, sg + 1.8, sg + 2.6), { size: 46 });
        P.write(c, 'pH > 7 → baz', 1260, 857, E.seg(t, sg + 2.8, sg + 3.6), { size: 46, color: U.BASE });
      });
      // şiddet okları
      const sk = E.se(t, st + 0.3, st + 1.5), sk2 = E.se(t, st + 2.8, st + 4.0);
      if (sk > 0) { P.arrow(ctx, [X(7) - 30, 820], [X(0), 820], sk, { w: 5, head: 20, color: U.ACID }); P.write(ctx, 'asitlik artar', X(3.5), 870, sk, { size: 42, align: 'center', color: U.ACID }); }
      if (sk2 > 0) { P.arrow(ctx, [X(7) + 30, 820], [X(14), 820], sk2, { w: 5, head: 20, color: U.BASE }); P.write(ctx, 'bazlık artar', X(10.5), 870, sk2, { size: 42, align: 'center', color: U.BASE }); }
      const dk = E.se(t, E.s('data') - 0.4, E.s('data') + 0.3);
      if (dk > 0 && t < sg) E.layer(ctx, dk, c => U.damla(c, t, { x: 1830, y: 900, s: 0.55, flip: true, expr: 'curious', look: [-0.9, -0.3], arms: [[-1, 1.2], [1, 0.4]], prop: 'notebook' }));
    }
  });
})();
