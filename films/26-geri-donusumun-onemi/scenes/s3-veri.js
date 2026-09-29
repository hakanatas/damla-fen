// SAHNE 3 — Veri toplama ve kaydetme (FB.5.7.2 b): Damla'nın bir haftalık örnek verisi (tablo + sütun grafik)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const DATA = [
    { bin: 'mavi', item: 'gazete', name: 'kâğıt-karton', kg: 2.0 },
    { bin: 'sari', item: 'plastikSise', name: 'plastik', kg: 1.5 },
    { bin: 'yesil', item: 'camSise', name: 'cam', kg: 2.5 },
    { bin: 'gri', item: 'icecek', name: 'metal', kg: 0.5 }
  ];
  const fmt = v => v.toFixed(1).replace('.', ',');
  function scaleIcon(ctx, x, y, s) { // mutfak tartısı
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = W7.rr(-70, -30, 140, 60, 12); P.fillPts(ctx, b, PAL.white); INK.wash(ctx, b, '#9A9387', 0.4, 850); stroke(ctx, b, { w: 3, closed: true, seed: 851 });
    const d = W7.rr(-36, -16, 72, 30, 5); P.fillPts(ctx, d, '#DDE8D0'); stroke(ctx, d, { w: 2, closed: true, dry: false });
    ctx.font = '700 22px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText('kg', 0, 7);
    line(ctx, [-80, -34], [80, -34], { w: 5 });
    ctx.restore();
  }
  E.scene({
    name: 'Veri', concept: 'Verileri toplama ve kaydetme', from: 'data', to: 'total', trFrom: [960, 540],
    draw(ctx, t) {
      const sd = E.s('data'), st = E.s('total');
      ctx.fillStyle = 'rgba(138,106,69,0.18)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 70, 1620, 840);
      P.write(ctx, 'Ayrıştırdığım atıklar · 1 hafta', 1180, 170, E.seg(t, sd + 0.3, sd + 1.6), { size: 58, align: 'center' });
      INK.label(ctx, 'örnek veri: Damla’nın evi', 1180, 222, { size: 34, align: 'center', alpha: 0.6 * E.se(t, sd + 1.4, sd + 2.2) });
      scaleIcon(ctx, 340, 230, P.pop(E.se(t, sd + 0.6, sd + 1.2, 'out')));
      // tablo
      const tk = E.se(t, sd + 1.8, sd + 2.6);
      if (tk > 0) {
        ctx.save(); ctx.globalAlpha *= tk;
        INK.label(ctx, 'atık', 300, 320, { size: 36, alpha: 0.6 }); INK.label(ctx, 'kütle', 690, 320, { size: 36, alpha: 0.6 });
        line(ctx, [270, 336], [860, 332], { w: 2.4, dry: false }); line(ctx, [660, 290], [662, 790], { w: 2.4, dry: false });
        ctx.restore();
      }
      DATA.forEach((d, i) => {
        const at = sd + 2.6 + i * 1.3, y = 400 + i * 100;
        const k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
        W7.item(ctx, d.item, 320, y - 14, 0.5 * P.pop(k));
        P.write(ctx, d.name, 380, y, E.seg(t, at + 0.1, at + 0.9), { size: 42 });
        P.write(ctx, fmt(d.kg) + ' kg', 690, y, E.seg(t, at + 0.5, at + 1.1), { size: 44 });
        ctx.save(); ctx.globalAlpha *= 0.3; line(ctx, [270, y + 34], [860, y + 32], { w: 1, dry: false, seed: 860 + i }); ctx.restore();
      });
      // sütun grafik
      const gx = 1000, gy = 780, gw = 640, unit = 150; // 1 kg = 150 px
      const ak = E.se(t, sd + 2.2, sd + 3.0);
      if (ak > 0) {
        P.drawOn(ctx, [[gx, gy], [gx + gw, gy - 2]], ak, { w: 3 });
        P.drawOn(ctx, [[gx, gy], [gx + 2, gy - 3 * unit - 40]], ak, { w: 3 });
        if (ak > 0.95) {
          for (let v = 1; v <= 3; v++) { line(ctx, [gx - 10, gy - v * unit], [gx + 6, gy - v * unit], { w: 2, dry: false }); INK.label(ctx, v + ' kg', gx - 18, gy - v * unit + 10, { size: 30, align: 'right', alpha: 0.7 }); }
        }
      }
      DATA.forEach((d, i) => {
        const at = sd + 2.8 + i * 1.3, k = E.se(t, at, at + 0.9, 'out'); if (k <= 0) return;
        const bx = gx + 40 + i * 150, h = d.kg * unit * k, bw = 100;
        const bar = [[bx, gy], [bx, gy - h], [bx + bw, gy - h - 1], [bx + bw, gy], [bx, gy]];
        P.fillPts(ctx, bar, PAL.white); INK.wash(ctx, bar, W7.BINS[d.bin].col, 0.8, 870 + i, { bleed: 1 }); stroke(ctx, bar, { w: 2.6, closed: true, seed: 875 + i });
        if (k > 0.9) W7.fit(ctx, fmt(d.kg), bx + bw / 2, gy - h - 14, 120, 34);
        W7.item(ctx, d.item, bx + bw / 2, gy + 50, 0.42);
      });
      // toplam
      const sk = E.se(t, st + 0.2, st + 1.0);
      if (sk > 0) {
        P.drawOn(ctx, [[270, 800], [860, 796]], sk, { w: 3 });
        P.write(ctx, 'toplam', 380, 860, E.seg(t, st + 0.4, st + 1.2), { size: 46 });
        P.write(ctx, '6,5 kg', 690, 860, E.seg(t, st + 0.8, st + 1.6), { size: 52, color: '#3F7A3A' });
        const ck = E.se(t, st + 3.0, st + 3.8);
        if (ck > 0) {
          ctx.save(); ctx.globalAlpha *= ck; W7.kitchenCan(ctx, 1690, 470, 0.5); P.cross(ctx, 1690, 420, 60, E.se(t, st + 3.4, st + 4.0), { w: 9, color: W7.RED }); ctx.restore();
          P.write(ctx, 'çöpe gitseydi →', 1630, 330, E.seg(t, st + 3.2, st + 4.0), { size: 38, align: 'right' });
          P.write(ctx, 'malzemeler', 1640, 545, E.seg(t, st + 4.2, st + 4.8), { size: 36, align: 'center', color: '#8A4A10' }); P.write(ctx, 'boşa giderdi', 1640, 590, E.seg(t, st + 4.6, st + 5.4), { size: 36, align: 'center', color: '#8A4A10' });
        }
      }
      // Damla
      const pk = E.se(t, sd + 0.2, sd + 1.0, 'out');
      DAMLA.draw(ctx, { x: 1760, y: 1075 + (1 - pk) * 300, s: 0.9, view: 'q3', flip: true, expr: t > st ? 'surprised' : 'neutral', look: [-0.8, -0.4], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 2, prop: 'notebook', arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]] });
    }
  });
})();
