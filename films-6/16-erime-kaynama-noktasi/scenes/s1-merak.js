// SAHNE 1 — Merak: buz 0 °C'de erir; bütün katılar aynı sıcaklıkta mı erir?
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = G16;
  function plate(ctx, x, y, w) { const p = circlePts(x, y, w, w * 0.18, 40); P.fillPts(ctx, p, PAL.white, 0.95); stroke(ctx, p, { w: 2.6, closed: true, seed: 1201 }); }
  E.scene({
    name: 'Merak', concept: 'Bütün katılar aynı sıcaklıkta mı erir?', from: 'title', to: 'hello',
    draw(ctx, t) {
      const sh = E.s('hello');
      ctx.fillStyle = 'rgba(160,130,95,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      F.bench(ctx, 80, 1840, 780, 1210);
      // buz küpü (yavaşça eriyor) + su birikintisi
      const m = E.clamp((t - 2) / 16);
      plate(ctx, 820, 776, 170);
      P.fillPts(ctx, circlePts(820, 772, 60 + 70 * m, 12 + 8 * m, 30), PAL.water, 0.3);
      const s = 110 * (1 - 0.35 * m);
      const cube = [[820 - s / 2, 770 - s], [820 + s / 2, 770 - s - 4], [820 + s / 2 + 3, 770], [820 - s / 2 - 2, 772], [820 - s / 2, 770 - s]];
      P.fillPts(ctx, cube, '#F2F7FA', 0.95); wash(ctx, cube, F.COLD, 0.45, 1212, { bleed: 0.6, blooms: 0 }); stroke(ctx, cube, { w: 2.6, closed: true, seed: 1213 });
      line(ctx, [820 - s * 0.3, 770 - s * 0.8], [820 - s * 0.05, 770 - s * 0.86], { w: 2.4, color: PAL.white, dry: false });
      // termometre ucu buzun yanında
      F.miniThermo(ctx, 930, 460, 740, 0, { min: -20, max: 40 });
      INK.label(ctx, '0 °C', 985, 520, { size: 44, weight: 700, color: F.HEAT, rot: 0 });
      INK.label(ctx, 'buz', 820, 850, { size: 38, weight: 700, align: 'center', color: PAL.water, rot: 0 });
      // demir çivi ve soru
      const qk = E.se(t, sh + 3.0, sh + 4.0);
      if (qk > 0) E.layer(ctx, qk, c => {
        plate(c, 1330, 776, 170);
        const nail = [[1230, 742], [1420, 736], [1450, 746], [1420, 756], [1230, 752]];
        P.fillPts(c, nail, '#8A8378'); stroke(c, nail, { w: 2.4, closed: true, seed: 1220 });
        P.fillPts(c, [[1222, 724], [1236, 724], [1236, 770], [1222, 770]], '#6E6A66'); stroke(c, [[1222, 724], [1236, 724], [1236, 770], [1222, 770], [1222, 724]], { w: 2, closed: true, dry: false });
        INK.label(c, 'demir', 1330, 850, { size: 38, weight: 700, align: 'center', rot: 0 });
        INK.label(c, '? °C', 1330, 640, { size: 80, weight: 700, align: 'center', color: F.AMBER });
      });
      const ak = E.se(t, sh + 4.5, sh + 5.5);
      if (ak > 0) P.write(ctx, 'Bütün katılar aynı sıcaklıkta mı erir?', 960, 440, ak, { size: 54, align: 'center', color: F.AMBER });
      DAMLA.draw(ctx, {
        x: 400, y: 790, s: 1.3, view: 'q3', t, seed: 1, blink: E.blink(t, 2), squash: E.breath(t), talk: E.talk(t),
        expr: t > sh + 4 ? 'thinking' : 'curious', look: [0.8, -0.2], arms: t > sh + 4 ? [[-1, 0.3], [1, [30, -86]]] : [[-1, 0.4], [1, 1.2]], prop: t > sh + 4 ? null : 'lens'
      });
      // başlık kartı
      const t1 = E.e('title') + 1.0;
      if (t < t1) {
        const a = 1 - E.se(t, t1 - 0.8, t1);
        ctx.save(); ctx.globalAlpha = 0.92 * a; ctx.translate(960, 265); ctx.scale(1.9, 1); const g = ctx.createRadialGradient(0, 0, 40, 0, 0, 430); g.addColorStop(0, 'rgba(241,234,219,1)'); g.addColorStop(0.55, 'rgba(241,234,219,0.9)'); g.addColorStop(1, 'rgba(241,234,219,0)'); ctx.fillStyle = g; ctx.fillRect(-500, -430, 1000, 860); ctx.restore();
      }
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '16 · Erime, Donma ve Kaynama Noktası', 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 6. sınıf · Ünite 5', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([600, 230], [960, 240], [1320, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
    }
  });
})();
