// SAHNE 4 — CO ve CO₂: küçük sayı, farklı bileşik; isimdeki "mono/di" ipucu (mantıksal ilişki)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const K = K7;
  const COL = [
    { x: 540, kind: 'CO', f: 'CO', name: 'karbonmonoksit', parts: ['karbon', 'mono', 'oksit'], num: '1', cnt: '1 C  ·  1 O' },
    { x: 1380, kind: 'CO2', f: 'CO2', name: 'karbondioksit', parts: ['karbon', 'di', 'oksit'], num: '2', cnt: '1 C  ·  2 O' }
  ];
  E.scene({
    name: 'CO ve CO₂', concept: 'Alt sayı değişirse bileşik değişir', from: 'co', to: 'name', trFrom: [960, 450],
    draw(ctx, t) {
      const sc = E.s('co'), sr = E.s('co-read'), sd = E.s('co-diff'), sn = E.s('name');
      // orta ayraç
      stroke(ctx, K.linePts([960, 220], [960, 860], 40), { w: 2, alpha: 0.3, dry: false, seed: 3300 });
      COL.forEach((c, i) => {
        const a0 = sc + 0.4 + i * 1.6;
        E.inkText(ctx, c.name, c.x, 250, t, a0, sn + 0.2, { size: 54, align: 'center' });
        K.mol(ctx, c.kind, c.x, 410, 72, E.seg(t, a0 + 0.3, a0 + 1.3), { seed: i * 5 });
        K.formula(ctx, c.f, c.x, 640, 150, { align: 'center', k: E.seg(t, sr + 0.3 + i * 3.4, sr + 1.3 + i * 3.4), subColor: K.SUB });
        P.write(ctx, c.cnt, c.x, 752, E.seg(t, sr + 1.4 + i * 3.4, sr + 2.4 + i * 3.4), { size: 46, align: 'center' });
        // isim ayrıştırma
        const nk = E.seg(t, sn + 0.4 + i * 1.2, sn + 1.4 + i * 1.2);
        if (nk > 0) {
          E.layer(ctx, Math.min(1, nk * 2), c2 => {
            c2.save(); c2.font = '700 50px Kalam'; const ws = c.parts.map(p => c2.measureText(p).width); c2.restore();
            const W = ws.reduce((a, b) => a + b, 0) + 40; let x = c.x - W / 2;
            c.parts.forEach((p, j) => {
              const hi = j === 1; if (hi) { const box = [[x - 8, 790], [x + ws[j] + 8, 788], [x + ws[j] + 10, 850], [x - 6, 852], [x - 8, 790]]; P.fillPts(c2, box, PAL.light, 0.35); stroke(c2, box, { w: 2.4, closed: true, color: K.AMBER, dry: false }); }
              INK.label(c2, p, x, 836, { size: 50, weight: 700, color: hi ? K.AMBER : PAL.ink, rot: 0 });
              x += ws[j] + 20;
            });
            INK.label(c2, c.parts[1] + ' = ' + c.num, c.x, 900, { size: 38, align: 'center', color: K.AMBER, weight: 700, alpha: E.clamp(nk * 2 - 1) });
          });
        }
      });
      // fark vurgusu
      const dk = E.se(t, sd + 0.3, sd + 1.0);
      if (dk > 0) {
        stroke(ctx, circlePts(1470, 642, 34, 40, 36), { w: 4.5, closed: true, color: PAL.light, alpha: dk, seed: 3310 });
        INK.label(ctx, '≠', 960, 660, { size: 120, weight: 700, align: 'center', alpha: dk, rot: 0 });
        const gk = E.se(t, sd + 1.2, sd + 1.8, 'out');
        if (gk > 0) { const g = ctx.createRadialGradient(1380, 410, 10, 1380, 410, 260); g.addColorStop(0, `rgba(227,160,58,${0.2 * gk})`); g.addColorStop(1, 'rgba(227,160,58,0)'); ctx.fillStyle = g; ctx.fillRect(1100, 180, 560, 460); }
      }
    }
  });
})();
