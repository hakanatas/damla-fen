// SAHNE 1 — Ön deneyim: sıkışan metal kavanoz kapağı sıcak suya tutulunca açılır (merak sorusu: neden?)
(function () {
  const { PAL, line, stroke, circlePts, wash, rng } = INK;
  const F = G15;
  function jar(ctx, x, by, s, lidLift, t) { // (x, by) alt orta
    ctx.save(); ctx.translate(x, by); ctx.scale(s, s);
    const g = [[-70, 0], [-76, -30], [-76, -150], [-64, -170], [64, -170], [76, -150], [76, -30], [70, 0], [-70, 0]];
    const honey = [[-70, -6], [-73, -30], [-73, -120], [73, -120], [73, -30], [70, -6]];
    P.fillPts(ctx, honey, PAL.light, 0.75); wash(ctx, honey, '#C07F1E', 0.4, 1101, { bleed: 1, blooms: 1 });
    ctx.save(); ctx.globalAlpha *= 0.15; ctx.fillStyle = PAL.white; P.path(ctx, g); ctx.fill(); ctx.restore();
    stroke(ctx, g, { w: 3.2, closed: true, seed: 1102 });
    line(ctx, [-54, -150], [-54, -40], { w: 3, color: PAL.white, dry: false, alpha: 0.85 });
    // etiket
    const lb = [[-46, -104], [46, -106], [46, -58], [-46, -56], [-46, -104]]; P.fillPts(ctx, lb, '#FAF6EC', 0.95); stroke(ctx, lb, { w: 1.8, closed: true, dry: false, seed: 1103 });
    INK.label(ctx, 'bal', 0, -70, { size: 30, weight: 700, align: 'center', rot: 0 });
    // metal kapak
    ctx.save(); ctx.translate(0, -lidLift); ctx.rotate(-lidLift * 0.004);
    const lid = [[-72, -168], [-72, -200], [72, -200], [72, -168], [-72, -168]];
    P.fillPts(ctx, lid, '#B9B7B2'); wash(ctx, lid, '#5C5850', 0.4, 1104, { bleed: 0.6, blooms: 0 }); stroke(ctx, lid, { w: 3, closed: true, seed: 1105 });
    for (let i = -60; i <= 60; i += 12) line(ctx, [i, -196], [i, -172], { w: 1.4, dry: false, alpha: 0.6 });
    ctx.restore();
    ctx.restore();
  }
  E.scene({
    name: 'Sıkışan kapak', concept: 'Ön deneyim ve merak', from: 'title', to: 'hello',
    draw(ctx, t) {
      const sh = E.s('hello');
      // mutfak duvarı (fayans)
      ctx.fillStyle = 'rgba(160,130,95,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      ctx.save(); ctx.globalAlpha = 0.12; for (let x = 0; x < E.W; x += 110) line(ctx, [x, 0], [x + 2, 760], { w: 1.6, dry: false, color: '#8A6A45', seed: x }); for (let y = 40; y < 760; y += 110) line(ctx, [0, y], [E.W, y + 2], { w: 1.6, dry: false, color: '#8A6A45', seed: y + 7 }); ctx.restore();
      // tezgâh + evye
      F.bench(ctx, 60, 1860, 780, 1110);
      const sink = [[1090, 782], [1470, 780], [1440, 850], [1120, 852], [1090, 782]]; P.fillPts(ctx, sink, '#CFD6D8', 0.9); stroke(ctx, sink, { w: 2.6, closed: true, seed: 1112 });
      // musluk
      const fx = 1280;
      line(ctx, [fx + 120, 780], [fx + 120, 420], { w: 16, color: '#9AA0A4', seed: 1113, taper: 0.02 });
      stroke(ctx, P.arc(fx + 60, 420, 60, Math.PI, 2 * Math.PI, 20), { w: 16, color: '#9AA0A4', seed: 1114 });
      line(ctx, [fx, 420], [fx, 450], { w: 16, color: '#9AA0A4', seed: 1115, taper: 0.02 });
      stroke(ctx, P.arc(fx + 60, 420, 68, Math.PI, 2 * Math.PI, 20), { w: 2.4, seed: 1116, dry: false });
      P.fillPts(ctx, circlePts(fx + 150, 470, 16, 16, 16), F.HEAT, 0.85); INK.label(ctx, 'sıcak', fx + 175, 480, { size: 30, weight: 700, color: F.HEAT, rot: 0 });
      // zaman çizelgesi
      const move = E.se(t, sh + 2.6, sh + 3.8);            // kavanoz musluğun altına
      const under = E.clamp((t - (sh + 3.8)) / 2.2);         // sıcak su akıyor
      const back = E.se(t, sh + 6.0, sh + 6.8);             // tezgâha geri
      const open = E.se(t, sh + 6.8, sh + 7.6, 'back');       // kapak açılır
      const water = t > sh + 3.6 && t < sh + 6.2;
      if (water) { const k = Math.min(E.se(t, sh + 3.6, sh + 3.9), 1 - E.se(t, sh + 5.9, sh + 6.2)); ctx.save(); ctx.globalAlpha = 0.75 * k; for (let i = 0; i < 3; i++) { const p = []; for (let j = 0; j <= 20; j++) { const u = j / 20; p.push([fx - 6 + i * 6 + Math.sin(u * 12 + t * 14 + i) * 2, 452 + u * 150]); } stroke(ctx, p, { w: 3.4, color: PAL.water, dry: false, seed: 1117 + i }); } ctx.restore(); F.steam(ctx, fx, 560, 140, 90, k, t, 1120); }
      const jx = E.lerp(E.lerp(760, fx, move), 760, back), jy = E.lerp(E.lerp(780, 770, move), 780, back);
      const shake = t > sh + 0.8 && t < sh + 2.4 ? Math.sin(t * 38) * 4 : 0;
      jar(ctx, jx + shake, jy, 1.15, open * 70, t);
      // yetişkin eli (kol) kavanozu tutar
      const hk = E.se(t, sh + 2.2, sh + 2.7) * (1 - E.se(t, sh + 6.8, sh + 7.4));
      if (hk > 0) E.layer(ctx, hk, c => {
        const hx = jx + 92, hy = jy - 90;
        const sleeve = [[hx + 40, hy - 40], [hx + 700, hy - 90], [hx + 700, hy + 30], [hx + 44, hy + 40], [hx + 40, hy - 40]];
        P.fillPts(c, sleeve, '#6F8A3A', 0.7); wash(c, sleeve, PAL.life, 0.35, 1131, { bleed: 1 }); stroke(c, sleeve, { w: 3, closed: true, seed: 1132 });
        const hand = circlePts(hx + 10, hy, 44, 38, 30); P.fillPts(c, hand, '#E8C9A8'); stroke(c, hand, { w: 3, closed: true, seed: 1133 });
        for (let f = 0; f < 3; f++) line(c, [hx - 20, hy - 20 + f * 18], [hx - 34, hy - 14 + f * 18], { w: 2.2, dry: false });
        INK.label(c, 'bir yetişkin', hx + 240, hy - 110, { size: 32, weight: 700, alpha: 0.8, rot: 0 });
      });
      // Damla
      const cheer = t > sh + 7.4;
      DAMLA.draw(ctx, {
        x: 420, y: 790, s: 1.25, view: 'q3', t, seed: 1, blink: E.blink(t, 2), squash: E.breath(t), talk: E.talk(t),
        expr: cheer ? 'surprised' : (t > sh + 2.4 ? 'curious' : 'determined'), look: [0.8, cheer ? -0.4 : 0],
        arms: t > sh + 0.6 && t < sh + 2.4 ? [[-1, [70, -110]], [1, [95, -100]]] : (cheer ? [[-1, 2.4], [1, 2.4]] : [[-1, 0.4], [1, 0.5]])
      });
      // notlar
      E.inkText(ctx, 'sıkışmış!', 700, 470, t, sh + 1.0, sh + 2.6, { size: 50, color: F.RED, align: 'center' });
      if (t > sh + 3.9) P.write(ctx, 'metal kapak + sıcak su', 1250, 290, E.seg(t, sh + 3.9, sh + 5.2), { size: 44, align: 'center', color: F.HEAT });
      if (t > sh + 7.0) P.write(ctx, 'açıldı!', 760, 480, E.seg(t, sh + 7.0, sh + 7.8), { size: 60, align: 'center', color: PAL.water });
      if (t > sh + 7.6) INK.label(ctx, 'Neden?', 960, 250, { size: 80, weight: 700, color: F.AMBER, align: 'center', alpha: E.se(t, sh + 7.6, sh + 8.3) });
      // başlık kartı
      const t1 = E.e('title') + 1.0;
      if (t < t1) {
        const a = 1 - E.se(t, t1 - 0.8, t1);
        ctx.save(); ctx.globalAlpha = 0.92 * a; ctx.translate(960, 265); ctx.scale(1.9, 1); const g = ctx.createRadialGradient(0, 0, 40, 0, 0, 430); g.addColorStop(0, 'rgba(241,234,219,1)'); g.addColorStop(0.55, 'rgba(241,234,219,0.9)'); g.addColorStop(1, 'rgba(241,234,219,0)'); ctx.fillStyle = g; ctx.fillRect(-500, -430, 1000, 860); ctx.restore();
      }
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '15 · Genleşme ve Büzülme', 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 6. sınıf · Ünite 5', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
    }
  });
})();
