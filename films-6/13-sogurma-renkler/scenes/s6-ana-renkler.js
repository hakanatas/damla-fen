// SAHNE 6 — Işığın ana ve ara renkleri (FB.6.4.5; TYMM: spektrum ve filtrelere girilmeden ana ve ara renkler)
// Karanlık bir duvara üç renkli ışık tutulur; ışıklar TOPLANARAK karışır ('lighter' birleştirme = ışık toplama).
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F613;
  const WALL = [[330, 170], [1590, 164], [1596, 880], [336, 886], [330, 170]];
  const L = [
    { n: 'kırmızı', rgb: [255, 40, 30], c: [850, 440] },
    { n: 'yeşil', rgb: [30, 225, 40], c: [1070, 440] },
    { n: 'mavi', rgb: [40, 70, 255], c: [960, 630] }
  ];
  const R = 205;
  function spot(ctx, l, a) {
    if (a <= 0) return;
    const [x, y] = l.c, [r, g, b] = l.rgb;
    const gr = ctx.createRadialGradient(x, y, R * 0.55, x, y, R * 1.06);
    gr.addColorStop(0, `rgba(${r},${g},${b},${a})`); gr.addColorStop(0.8, `rgba(${r},${g},${b},${a * 0.95})`); gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x, y, R * 1.06, 0, 7); ctx.fill();
  }
  E.scene({
    name: 'Ana ve ara renkler', concept: 'Işığın ana ve ara renkleri', from: 'primary', to: 'secondary', trFrom: [960, 520],
    draw(ctx, t) {
      const sp = E.s('primary'), ss = E.s('secondary');
      // dark wall
      P.fillPts(ctx, WALL, '#26242E', 0.96); stroke(ctx, WALL, { w: 3, closed: true, seed: 640 });
      // coloured spots (additive)
      ctx.save(); P.path(ctx, WALL); ctx.closePath(); ctx.clip();
      ctx.globalCompositeOperation = 'lighter';
      L.forEach((l, i) => spot(ctx, l, 0.92 * E.se(t, sp + 0.6 + i * 1.3, sp + 1.4 + i * 1.3)));
      ctx.restore();
      // primary labels (on the dark wall, paper-coloured)
      L.forEach((l, i) => {
        const k = E.se(t, sp + 1.0 + i * 1.3, sp + 1.6 + i * 1.3); if (k <= 0) return;
        const off = [[-170, -150], [170, -150], [0, 250]][i];
        INK.label(ctx, l.n, l.c[0] + off[0], l.c[1] + off[1], { size: 44, weight: 700, align: 'center', color: '#F4EEDF', alpha: k });
      });
      // white centre after all three
      const wk = E.se(t, sp + 5.0, sp + 5.6);
      if (wk > 0) INK.label(ctx, 'beyaz', 960, 520, { size: 40, weight: 700, align: 'center', alpha: wk, rot: 0 });
      // secondary labels on the overlaps
      const SEC = [['sarı', 960, 350], ['magenta', 845, 600], ['camgöbeği', 1078, 600]];
      SEC.forEach(([n, x, y], i) => { const k = E.se(t, ss + 2.6 + i * 0.9, ss + 3.2 + i * 0.9); if (k > 0) INK.label(ctx, n, x, y, { size: 34, weight: 700, align: 'center', alpha: k, rot: 0 }); });
      // side legend cards: ANA / ARA
      const ak = E.se(t, sp + 5.8, sp + 6.6);
      if (ak > 0) E.layer(ctx, ak, c => {
        F.card(c, 1640, 230, 240, 250, { seed: 650 });
        INK.label(c, 'ana renkler', 1760, 285, { size: 34, weight: 700, align: 'center' });
        L.forEach((l, i) => { P.fillPts(c, circlePts(1700, 340 + i * 48, 16, 16, 16), `rgb(${l.rgb})`, 0.9); INK.label(c, l.n, 1730, 352 + i * 48, { size: 30, weight: 700 }); });
      });
      const bk = E.se(t, ss + 5.4, ss + 6.2);
      if (bk > 0) E.layer(ctx, bk, c => {
        F.card(c, 1640, 540, 240, 250, { seed: 651 });
        INK.label(c, 'ara renkler', 1760, 595, { size: 34, weight: 700, align: 'center' });
        [['sarı', '#F2E23C'], ['camgöbeği', '#3FE3E6'], ['magenta', '#E94BD8']].forEach(([n, col], i) => { P.fillPts(c, circlePts(1700, 650 + i * 48, 16, 16, 16), col, 0.9); INK.label(c, n, 1730, 662 + i * 48, { size: 30, weight: 700 }); });
      });
      DAMLA.draw(ctx, { x: 170, y: 1000, s: 0.85, view: 'q3', expr: t > ss ? 'happy' : 'curious', look: [0.8, -0.4], blink: E.blink(t, 8), squash: E.breath(t), t, talk: E.talk(t), seed: 4, arms: [[-1, 0.4], [1, 2.1]] });
      INK.label(ctx, 'karanlık duvar · üç renkli ışık kaynağı', 960, 912, { size: 30, align: 'center', alpha: 0.7 * E.se(t, sp + 0.2, sp + 1) });
    }
  });
})();
