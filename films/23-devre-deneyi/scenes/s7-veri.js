// SAHNE 7–8 — Gözlem/ölçüm, veri tablosu, 3 tekrar (b: ölçme) · veri analizi ve sonuç
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const TRIAL = 5.4;
  // her deneme: [açık: 0..2.5] [kapalı: 2.5..5.4]
  const trialAt = i => E.s('measure') + 1.2 + i * TRIAL;
  function switchState(t) {
    for (let i = 2; i >= 0; i--) { const a = trialAt(i); if (t >= a) { const u = t - a; return u < 2.4 ? 0 : E.se(t, a + 2.4, a + 2.9); } }
    return 0;
  }
  function cellMark(ctx, x, y, lit, k) {
    if (k <= 0) return;
    ctx.save(); ctx.globalAlpha *= k;
    CK.bulb(ctx, x - 70, y + 26, 0.34, lit ? 0.6 : 0, 0, { rays: false });
    ctx.restore();
    P.write(ctx, lit ? 'ışık var' : 'ışık yok', x - 30, y + 12, k, { size: 36, color: lit ? '#8A4A10' : PAL.ink });
  }
  // veri tablosu (sol üst köşe x0,y0)
  function dataTable(ctx, t, x0, y0, o = {}) {
    const W = 760, rh = 96;
    CK.card(ctx, x0, y0, W, 150 + rh * 3, { seed: 160 });
    INK.label(ctx, 'Veri tablosu', x0 + 30, y0 + 52, { size: 40, weight: 700 });
    const cx = [x0 + 120, x0 + 360, x0 + 620];
    INK.label(ctx, 'deneme', cx[0], y0 + 112, { size: 32, weight: 700, align: 'center', alpha: 0.7 });
    INK.label(ctx, 'anahtar açık', cx[1], y0 + 112, { size: 32, weight: 700, align: 'center', alpha: 0.7 });
    INK.label(ctx, 'anahtar kapalı', cx[2], y0 + 112, { size: 32, weight: 700, align: 'center', alpha: 0.7 });
    line(ctx, [x0 + 20, y0 + 132], [x0 + W - 20, y0 + 130], { w: 2, dry: false, alpha: 0.6 });
    line(ctx, [x0 + 230, y0 + 80], [x0 + 232, y0 + 140 + rh * 3], { w: 1.4, dry: false, alpha: 0.4 });
    line(ctx, [x0 + 490, y0 + 80], [x0 + 492, y0 + 140 + rh * 3], { w: 1.4, dry: false, alpha: 0.4 });
    for (let i = 0; i < 3; i++) {
      const y = y0 + 150 + i * rh + 30, a = trialAt(i);
      INK.label(ctx, String(i + 1) + '.', cx[0], y + 12, { size: 38, weight: 700, align: 'center', alpha: o.all ? 1 : E.se(t, a - 0.3, a + 0.2) });
      cellMark(ctx, cx[1], y, false, o.all ? 1 : E.seg(t, a + 1.3, a + 2.2));
      cellMark(ctx, cx[2], y, true, o.all ? 1 : E.seg(t, a + 3.6, a + 4.5));
      if (i < 2) line(ctx, [x0 + 20, y + 60], [x0 + W - 20, y + 58], { w: 1, dry: false, alpha: 0.25 });
    }
    return cx;
  }
  E.scene({
    name: 'Ölçüm', concept: 'Gözlem, veri kaydı ve tekrar', from: 'measure', to: 'table', trFrom: [1180, 580],
    draw(ctx, t) {
      const sm = E.s('measure');
      ctx.save();
      CK.table(ctx, 840);
      const k = switchState(t);
      CK.realCircuit(ctx, 560, 820, 0.95, k, E.se(k, 0.7, 1) * 0.9, t);
      // durum etiketi
      const lab = k > 0.8 ? 'anahtar kapalı' : 'anahtar açık';
      if (t > trialAt(0)) INK.label(ctx, lab, 560, 900, { size: 40, weight: 700, align: 'center', color: k > 0.8 ? '#8A4A10' : PAL.ink });
      // deneme sayacı
      const cur = [0, 1, 2].filter(i => t >= trialAt(i)).length;
      if (cur > 0) INK.label(ctx, cur + '. deneme', 300, 330, { size: 48, weight: 700, align: 'center' });
      const kt = E.se(t, sm + 0.3, sm + 1.0, 'out');
      if (kt > 0) { ctx.save(); ctx.translate(1000 + (1 - kt) * 900, 0); dataTable(ctx, t, 0, 170); ctx.restore(); }
      // Damla: gözlemci (tablonun altında, sağda)
      DAMLA.draw(ctx, {
        x: 1450, y: 842, s: 1.05, view: 'q3', flip: true, expr: k > 0.8 ? 'happy' : 'curious', look: [-0.9, 0.1], blink: E.blink(t, 5), squash: E.breath(t), t, talk: E.talk(t), seed: 2,
        arms: [[-1, 1.2], [1, 1.4 + Math.sin(t * 9) * 0.1]], prop: 'notebook'
      });
      ctx.restore();
    }
  });

  E.scene({
    name: 'Analiz', concept: 'Veri analizi ve sonuç', from: 'analyze', to: 'result', trFrom: [1380, 450],
    draw(ctx, t) {
      const sa = E.s('analyze'), sr = E.s('result');
      ctx.save();
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 80, 1620, 900);
      const cx = dataTable(ctx, t, 230, 170, { all: true });
      // sütun vurgusu
      const h1 = E.se(t, sa + 0.8, sa + 1.6), h2 = E.se(t, sr + 0.3, sr + 1.1);
      if (h1 > 0) { ctx.save(); ctx.globalAlpha = h1 * 0.18; ctx.fillStyle = PAL.light; ctx.fillRect(cx[2] - 125, 305, 250, 300); ctx.restore(); stroke(ctx, CK.rect(cx[2] - 125, 305, 250, 300), { w: 3, color: CK.AMBD, dry: false, alpha: h1 }); }
      if (h2 > 0) stroke(ctx, CK.rect(cx[1] - 125, 305, 250, 300), { w: 3, color: PAL.ink, dry: false, alpha: h2 * 0.7 });
      // sayım grafiği
      const gx = 1150, gy = 600, bw = 150, unit = 100;
      const kg = E.se(t, sa + 2.0, sa + 2.8);
      if (kg > 0) {
        ctx.save(); ctx.globalAlpha = kg;
        INK.label(ctx, 'ışık veren deneme sayısı', 1300, 220, { size: 36, weight: 700, align: 'center' });
        line(ctx, [gx - 40, gy], [gx + 420, gy], { w: 3, dry: false }); line(ctx, [gx - 40, gy], [gx - 40, gy - 340], { w: 3, dry: false });
        for (let v = 0; v <= 3; v++) { INK.label(ctx, String(v), gx - 60, gy - v * unit + 10, { size: 28, align: 'right', alpha: 0.7 }); line(ctx, [gx - 46, gy - v * unit], [gx - 34, gy - v * unit], { w: 2, dry: false }); }
        ctx.restore();
        const b1 = E.se(t, sa + 3.0, sa + 4.4) * 3;
        if (b1 > 0) { const bar = CK.rect(gx + 30, gy - b1 * unit, bw, b1 * unit); P.fillPts(ctx, bar, PAL.light, 0.55); stroke(ctx, bar, { w: 3, closed: true, dry: false }); }
        INK.label(ctx, 'kapalı', gx + 30 + bw / 2, gy + 44, { size: 32, align: 'center', alpha: kg });
        if (b1 >= 2.99) INK.label(ctx, '3', gx + 30 + bw / 2, gy - 310, { size: 40, weight: 700, align: 'center' });
        const k0 = E.se(t, sr + 0.6, sr + 1.2);
        line(ctx, [gx + 230, gy - 2], [gx + 230 + bw, gy - 2], { w: 6, dry: false, alpha: k0 });
        INK.label(ctx, 'açık', gx + 230 + bw / 2, gy + 44, { size: 32, align: 'center', alpha: kg });
        if (k0 > 0) INK.label(ctx, '0', gx + 230 + bw / 2, gy - 20, { size: 40, weight: 700, align: 'center', alpha: k0 });
      }
      // sonuç kartı
      const kc = E.se(t, sr + 2.6, sr + 3.3, 'out');
      if (kc > 0) {
        ctx.save(); ctx.translate(960, 770); ctx.rotate(-0.012); ctx.scale(P.pop(kc), P.pop(kc));
        CK.card(ctx, -700, -85, 1400, 170, { fill: '#F6E7B8', seed: 170 });
        ctx.font = '700 40px Kalam'; ctx.fillStyle = PAL.ink; ctx.textAlign = 'left';
        ctx.fillText('Sonuç: Ampulün ışık vermesi için devre tamamlanmalı.', -660, -18);
        ctx.font = '400 34px Kalam'; ctx.fillText('Anahtar kapalı → devre tamam → ışık var   ·   anahtar açık → devre kesik → ışık yok', -660, 40);
        ctx.restore();
      }
      ctx.restore();
    }
  });
})();
