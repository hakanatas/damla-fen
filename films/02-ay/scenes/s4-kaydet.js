// SAHNE 4 — Verileri çalışma yaprağına kaydetme (FB.5.1.2 b; OB7)
(function () {
  const { PAL, line, stroke } = INK;
  const ROWS = [
    ['Işık', 'kendi ışığı yok; Güneş ışığını yansıtır'],
    ['Yüzey', 'kayalık, tozlu; kraterler, dağlar, düzlükler'],
    ['Hava', 'nefes alınacak hava yok; gökyüzü kara'],
    ['Sıcaklık', 'gündüz 100 °C’nin üzeri, gece −150 °C’nin altı'],
    ['Su', 'kutuplardaki gölgeli kraterlerde buz']
  ];
  E.scene({
    name: 'Kaydet', concept: 'Toplanan verileri kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 70, 1620, 880);
      P.write(ctx, 'Çalışma Yaprağı · Ay’ın Nitelikleri', 290, 215, E.seg(t, sr + 0.2, sr + 1.4), { size: 58 });
      if (t > sr + 1.4) P.drawOn(ctx, P.bez([286, 235], [700, 247], [1110, 231], 30), E.se(t, sr + 1.4, sr + 1.9), { w: 3, color: PAL.light });
      const hk = E.se(t, sr + 1.2, sr + 1.8);
      if (hk > 0) {
        ctx.save(); ctx.globalAlpha = hk;
        INK.label(ctx, 'Nitelik', 300, 300, { size: 40, weight: 700, color: PAL.water }); INK.label(ctx, 'Veri', 640, 300, { size: 40, weight: 700, color: PAL.water });
        line(ctx, [290, 320], [1560, 316], { w: 2.6, dry: false }); line(ctx, [600, 262], [600, 830], { w: 2, dry: false, alpha: 0.7 });
        ctx.restore();
      }
      ROWS.forEach(([a, b], i) => {
        const at = sr + 1.8 + i * 1.5, y = 395 + i * 92;
        P.write(ctx, a, 300, y, E.seg(t, at, at + 0.5), { size: 44 });
        ctx.save(); ctx.font = '400 38px Kalam'; const w = ctx.measureText(b).width; ctx.restore();
        P.write(ctx, b, 640, y, E.seg(t, at + 0.4, at + 1.4), { size: w > 900 ? 34 : 38, weight: 400 });
        if (t > at + 1.4) { ctx.save(); ctx.globalAlpha = 0.35; line(ctx, [290, y + 30], [1560, y + 28], { w: 1.2, dry: false }); ctx.restore(); }
      });
      DAMLA.draw(ctx, { x: 1660, y: 1045, s: 1.05, view: 'q3', flip: true, expr: 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, talk: E.talk(t), seed: 5,
        arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
})();
