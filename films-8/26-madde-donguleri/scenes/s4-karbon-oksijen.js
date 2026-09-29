// SAHNE 4 — Karbon ve oksijen döngüleri: fotosentez, besin zinciri, solunum, ayrıştırma, fosil yakıt ve yanma
(function () {
  const { PAL, line, stroke, circlePts, wash, dashed } = INK;
  const U = U7;
  const GY = 770, BAND = [180, 330];
  const dense = (pts, step = 4) => { const o = [pts[0]]; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], n = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / step)); for (let j = 1; j <= n; j++) o.push(E.mix(a, b, j / n)); } return o; };
  // bir canlının/aracın atmosferle gaz alışverişi: gri CO2, mavi O2
  function pair(ctx, x, yLow, co2Up, k, lbl, t) {
    if (k <= 0) return;
    const kc = E.clamp(k * 1.6), ko = E.clamp(k * 1.6 - 0.5);
    const top = BAND[1] + 12;
    if (co2Up) { U.flow(ctx, [x - 28, yLow], [x - 28, top], kc, { color: U.CO2C, w: 4.5 }); U.flow(ctx, [x + 28, top], [x + 28, yLow], ko, { color: U.O2C, w: 4.5 }); }
    else { U.flow(ctx, [x - 28, top], [x - 28, yLow], kc, { color: U.CO2C, w: 4.5 }); U.flow(ctx, [x + 28, yLow], [x + 28, top], ko, { color: U.O2C, w: 4.5 }); }
    ctx.save(); ctx.globalAlpha *= kc; U.formula(ctx, 'CO2', x - 34, 280, 40, { color: U.CO2C }); ctx.restore();
    ctx.save(); ctx.globalAlpha *= ko; U.formula(ctx, 'O2', x + 34, 280, 40, { color: U.O2C }); ctx.restore();
    if (lbl) { const my = (yLow + top) / 2; P.write(ctx, lbl, x + 60, my + 10, E.clamp(k * 2 - 1), { size: 38, color: PAL.ink }); }
  }
  E.scene({
    name: 'Karbon ve oksijen', concept: 'Karbon ve oksijen döngüleri el ele', from: 'co', to: 'fossil', trFrom: [960, 300],
    draw(ctx, t) {
      const sC = E.s('co'), sP = E.s('photo'), sR = E.s('resp'), sD = E.s('decomp'), sF = E.s('fossil');
      // atmosfer bandı
      const bk = E.se(t, sC + 0.2, sC + 1.2);
      ctx.save(); ctx.globalAlpha *= bk;
      const band = [[-10, BAND[0]], [1930, BAND[0] - 6], [1930, BAND[1]], [-10, BAND[1] + 4]];
      wash(ctx, band, PAL.water, 0.16, 2720, { bleed: 3, blooms: 2 });
      U.txt(ctx, 'atmosfer (hava)', 1880, 225, { size: 36, align: 'right', color: PAL.water });
      ctx.restore();
      // zemin, toprak, fosil yakıt katmanı
      const soil = [[-10, GY], [1930, GY - 4], [1930, 930], [-10, 930]];
      P.fillPts(ctx, soil, '#E8DCC0', 0.9); wash(ctx, soil, '#8A6A45', 0.3, 2721, { bleed: 2, blooms: 2 });
      stroke(ctx, [[-10, GY], [1930, GY - 4]], { w: 3, seed: 2722 });
      const fk = E.se(t, sF + 0.4, sF + 1.4);
      const fos = [[1250, 850], [1900, 846], [1900, 915], [1250, 918]];
      if (fk > 0) P.fillPts(ctx, fos, '#3A3530', 0.8 * fk);
      if (fk > 0) U.txt(ctx, 'fosil yakıt: kömür, petrol, doğal gaz', 1575, 896, { size: 32, align: 'center', color: PAL.white, alpha: fk });
      // canlılar ve araçlar
      const ak = E.se(t, sC + 0.8, sC + 1.8, 'out');
      ctx.save(); ctx.globalAlpha *= ak;
      U.tree(ctx, 330, GY, 1.35, t, { seed: 4 });
      U.sheep(ctx, 760, GY, 1.2, t);
      ctx.restore();
      const dk = E.se(t, sD, sD + 0.8, 'out');
      if (dk > 0) { ctx.save(); ctx.globalAlpha *= dk;
        U.leaf(ctx, 1030, GY - 12, 0.5, 0.3); U.leaf(ctx, 1100, GY - 8, 0.4, -0.5);
        // mantar ve solucan
        const cap = P.arc(1160, GY - 44, 34, Math.PI, Math.PI * 2, 20, 26); P.fillPts(ctx, cap.concat([[1194, GY - 44]]), '#C9A064'); stroke(ctx, cap.concat([[1126, GY - 44]]), { w: 2.4, closed: true, dry: false });
        const stem = U.rect(1150, GY - 44, 1170, GY); P.fillPts(ctx, stem, '#F1E6D0'); stroke(ctx, stem, { w: 2, dry: false });
        const worm = []; for (let i = 0; i <= 24; i++) { const u = i / 24; worm.push([980 + u * 90, GY + 40 + Math.sin(u * 9 + t * 2) * 6]); } stroke(ctx, worm, { w: 7, color: '#C98A6C', dry: false, taper: 0.3 });
        U.txt(ctx, 'ayrıştırıcılar', 1080, GY + 110, { size: 34, align: 'center' });
        ctx.restore(); }
      const ik = E.se(t, sF + 2.4, sF + 3.4, 'out');
      if (ik > 0) { ctx.save(); ctx.globalAlpha *= ik; U.factory(ctx, 1500, GY, 1.0, t, 0.7); U.car(ctx, 1770, GY, 0.95, t, 0.7); ctx.restore(); }

      // fotosentez: CO2 ağaca girer, O2 çıkar
      pair(ctx, 330, 470, false, E.seg(t, sP + 0.4, sP + 2.2), 'fotosentez', t);
      // besin zinciri: bitki → hayvan (karbon besinle geçer)
      const fk2 = E.seg(t, sP + 4.2, sP + 5.4);
      U.flow(ctx, [440, 640], [640, 660], fk2, { color: PAL.life, w: 4, bend: 30, label: 'besin (karbon)', ly: 590, size: 34, lcolor: U.GREEN });
      // solunum: hayvan O2 alır, CO2 verir
      pair(ctx, 760, 620, true, E.seg(t, sR + 0.4, sR + 2.2), 'solunum', t);
      E.inkText(ctx, 'bitkiler de solunum yapar', 330, 740 - 0 + 120, t, sR + 3.6, E.e('fossil') + 1, { size: 34, align: 'center', color: U.GREEN });
      // ayrıştırma: ölü kalıntılar → CO2
      const dd = E.seg(t, sD + 0.6, sD + 1.6);
      if (dd > 0) { const p = dense(P.bez([850, 740], [930, 700], [1010, 740], 20)); ctx.save(); dashed(ctx, P.partial(p, dd), { w: 3, on: 10, off: 8 }); ctx.restore(); if (dd >= 1) INK.arrowHead(ctx, p[p.length - 5], p[p.length - 1], 12, { w: 3 }); }
      pair(ctx, 1080, 700, true, E.seg(t, sD + 1.4, sD + 3.0), 'ayrıştırma', t);
      // fosil yakıta dönüşüm (milyonlarca yıl) ve yanma
      const mf = E.seg(t, sF + 0.6, sF + 1.8);
      if (mf > 0) { const p = dense(P.bez([1130, 800], [1200, 860], [1270, 870], 20)); ctx.save(); dashed(ctx, P.partial(p, mf), { w: 3, on: 10, off: 8 }); ctx.restore(); if (mf >= 1) INK.arrowHead(ctx, p[p.length - 5], p[p.length - 1], 12, { w: 3 }); }
      E.inkText(ctx, 'milyonlarca yıl', 1290, 832, t, sF + 1.4, E.e('fossil') + 1, { size: 30, align: 'left', weight: 400 });
      pair(ctx, 1560, 550, true, E.seg(t, sF + 3.6, sF + 5.4), 'yanma', t);
      // Damla gözlemci
      U.damla(ctx, t, { x: 110, y: GY, s: 0.62, view: 'q3', expr: 'curious', look: [0.8, -0.4], arms: [[-1, 0.4], [1, 1.6]], prop: 'lens', seed: 6 });
    }
  });
})();
