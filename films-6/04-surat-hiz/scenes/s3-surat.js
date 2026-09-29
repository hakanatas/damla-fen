// SAHNE 3 — Sürat: birim zamanda alınan yol (görsel veriden çıkarım; hesaplama yok) · m/s, km/h · sabit sürat
(function () {
  const { PAL, line, stroke, dashed, circlePts } = INK;
  const X0 = 240, PX = 50; // 1 m = 50 px
  const LB = 470, LD = 790; // bisiklet ve Damla şeritleri (zemin y)
  function road(ctx, y, seed) {
    P.fillPts(ctx, [[100, y], [1820, y], [1820, y + 22], [100, y + 22]], '#CFC3AA', 0.8);
    line(ctx, [100, y], [1820, y + 1], { w: 3, seed, taper: 0.01 });
  }
  function ruler(ctx, y) {
    for (let m = 0; m <= 30; m++) { const x = X0 + m * PX; if (x > 1800) break; line(ctx, [x, y + 26], [x, y + (m % 5 ? 36 : 46)], { w: m % 5 ? 1.4 : 2.4, dry: false, taper: 0 }); if (m % 5 === 0) INK.label(ctx, m + ' m', x, y + 76, { size: 28, align: 'center', alpha: 0.75 }); }
  }
  E.scene({
    name: 'Sürat', concept: 'Birim zamanda alınan yol', from: 'who', to: 'surat', trFrom: [240, 600],
    draw(ctx, t) {
      const sw = E.s('who'), sr = E.s('race'), ss = E.s('surat');
      const r0 = sr + 1.0; // 5 s gerçek zaman = 5 s film zamanı
      const el = E.clamp(t - r0, 0, 5);
      road(ctx, LB, 4201); road(ctx, LD, 4202); ruler(ctx, LB); ruler(ctx, LD);
      // second marks
      for (let k = 0; k <= 5; k++) {
        if (t < r0 + k - 0.02) continue;
        const xb = X0 + 5 * PX * k, xd = X0 + 1 * PX * k;
        INK.inkDot(ctx, xb, LB - 4, 7, { color: '138,74,16' }); INK.inkDot(ctx, xd, LD - 4, 7, { color: '138,74,16' });
        if (k > 0) {
          INK.label(ctx, k + ' s', xb, LB - 250, { size: 30, weight: 700, align: 'center', alpha: 0.8 });
          // bracket "5 m"
          const a = X0 + 5 * PX * (k - 1);
          stroke(ctx, P.bez([a + 6, LB - 200], [(a + xb) / 2, LB - 225], [xb - 6, LB - 200], 16), { w: 2.4, color: F64.YOL, dry: false });
          INK.label(ctx, '5 m', (a + xb) / 2, LB - 230, { size: 32, weight: 700, align: 'center', color: F64.YOL });
        }
      }
      if (t > r0 + 1) { INK.label(ctx, 'her saniye', X0 - 40, LD - 60, { size: 30, weight: 700, align: 'right', color: F64.YOL }); INK.label(ctx, '1 m', X0 - 40, LD - 20, { size: 34, weight: 700, align: 'right', color: F64.YOL }); }
      const bx = X0 + 5 * PX * el, dx = X0 + PX * el;
      F64.bike(ctx, bx, LB, 1, bx);
      const walking = el > 0 && el < 5;
      DAMLA.draw(ctx, { x: dx, y: LD, s: 0.95, view: walking ? 'side' : 'q3', expr: t > ss ? 'happy' : 'determined', look: [1, 0], blink: E.blink(t, 3), squash: E.breath(t), t, seed: 1, feet: walking ? E.walk(t * 5) : undefined });
      // who: question text
      E.inkText(ctx, 'Kim daha hızlı?', 960, 200, t, sw + 0.4, r0, { size: 60, align: 'center' });
      E.inkText(ctx, 'bir saniyede ne kadar yol?', 960, 270, t, sw + 3.0, r0, { size: 44, align: 'center', color: F64.YOL });
      // sürat card
      const ck = E.se(t, ss + 0.3, ss + 1.0, 'out');
      if (ck > 0) {
        ctx.save(); ctx.translate(1480, 680); ctx.scale(P.pop(ck), P.pop(ck));
        F64.card(ctx, -330, -95, 330, 95, { seed: 4210 });
        INK.label(ctx, 'Sürat = birim zamanda', 0, -18, { size: 44, weight: 700, align: 'center' });
        INK.label(ctx, 'alınan yol', 0, 44, { size: 44, weight: 700, align: 'center', color: F64.YOL });
        ctx.restore();
        if (t > ss + 2.4) { F64.tag(ctx, 'sürat: 5 m/s', 1700, LB - 60, { size: 44, seed: 4211 }); }
        if (t > ss + 3.4) { F64.tag(ctx, 'sürat: 1 m/s', 640, LD - 160, { size: 44, seed: 4212 }); }
      }
    }
  });
  E.scene({
    name: 'Birimler', concept: 'm/s ve km/h; gösterge sürati gösterir', from: 'units', to: 'units', trFrom: [960, 520],
    draw(ctx, t) {
      const su = E.s('units');
      // dashboard
      const db = [[300, 260], [1160, 250], [1180, 820], [290, 830], [300, 260]];
      P.fillPts(ctx, db, '#3A3A40', 0.88); stroke(ctx, db, { w: 4, closed: true, seed: 4220 });
      const v = 50 * E.se(t, su + 0.5, su + 2.5);
      F64.gauge(ctx, 735, 560, 230, v);
      const ck = E.se(t, su + 0.4, su + 1.0);
      if (ck > 0) { ctx.save(); ctx.globalAlpha = ck; F64.tag(ctx, 'm/s', 1450, 360, { size: 64, seed: 4221 }); F64.tag(ctx, 'km/h', 1450, 500, { size: 64, seed: 4222 }); ctx.restore(); }
      E.inkText(ctx, 'sürat birimleri', 1450, 250, t, su + 0.6, 1e9, { size: 44, align: 'center' });
      E.inkText(ctx, 'Gösterge yön söylemez', 1470, 660, t, su + 3.2, 1e9, { size: 46, align: 'center', color: '#8A4A10' });
      E.inkText(ctx, '→ sürati gösterir', 1470, 730, t, su + 4.2, 1e9, { size: 46, align: 'center', color: '#8A4A10' });
    }
  });
  E.scene({
    name: 'Sabit sürat', concept: 'Eşit zamanlarda eşit yol', from: 'constant', to: 'constant', trFrom: [960, 540],
    draw(ctx, t) {
      const sc = E.s('constant');
      const RY = 640, v = 220; // 1 s → 220 px
      road(ctx, RY, 4230);
      const el = E.clamp(t - sc - 0.5, 0, 6.2), x = 200 + v * el;
      for (let k = 0; k <= 6; k++) {
        if (el < k) continue; const gx = 200 + v * k;
        line(ctx, [gx, RY + 30], [gx, RY + 60], { w: 3, dry: false }); INK.label(ctx, k + ' s', gx, RY + 100, { size: 32, weight: 700, align: 'center' });
        if (k > 0) { stroke(ctx, P.bez([gx - v + 8, RY + 130], [gx - v / 2, RY + 150], [gx - 8, RY + 130], 12), { w: 2.4, color: F64.YOL, dry: false }); }
        if (k < 6 && k > 0) { ctx.save(); ctx.globalAlpha = 0.16; F64.car(ctx, gx, RY, 1, t, 0); ctx.restore(); }
      }
      F64.car(ctx, x, RY, 1, t, x);
      E.inkText(ctx, 'eşit zaman aralıklarında eşit yollar', 960, 300, t, sc + 2.0, 1e9, { size: 54, align: 'center' });
      E.inkText(ctx, '→ sabit süratli hareket', 960, 380, t, sc + 3.2, 1e9, { size: 54, align: 'center', color: F64.YOL });
    }
  });
})();
