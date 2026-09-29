// SAHNE 2 — İki mercek: yandan şekil (ince / kalın kenarlı) + yakındaki yazıya bakış (büyük / küçük) ve kayıt (FB.7.4.2 a, b)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F713;
  const XC = 560, XD = 1260, YP = 340;
  const LC = F.lens(XC, YP, 130, 96, 230, true), LD = F.lens(XD, YP, 130, 16, 230, false);
  const STRIP = 'FEN BİLİMLERİ';

  function strip(ctx, cx, y) {
    const b = [[cx - 300, y - 58], [cx + 300, y - 62], [cx + 302, y + 40], [cx - 298, y + 44], [cx - 300, y - 58]];
    P.fillPts(ctx, b, '#FBF8F1'); stroke(ctx, b, { w: 2.2, closed: true, seed: cx | 0, dry: false });
    ctx.save(); ctx.font = '700 44px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText(STRIP, cx, y + 12); ctx.restore();
  }
  function looking(ctx, cx, y, mag, k) { // yazının üstünde önden görünen mercek
    const r = 100, lx = cx + 20;
    ctx.save(); ctx.beginPath(); ctx.arc(lx, y - 8, r, 0, 7); ctx.clip();
    P.fillPts(ctx, circlePts(lx, y - 8, r, r, 40), '#FBF8F1');
    ctx.translate(lx, y - 8); const m = E.lerp(1, mag, k); ctx.scale(m, m); ctx.translate(-lx, -(y - 8));
    ctx.font = '700 44px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText(STRIP, cx, y + 12);
    ctx.restore();
    P.fillPts(ctx, circlePts(lx, y - 8, r, r, 40), '#CFE1EA', 0.22);
    stroke(ctx, circlePts(lx, y - 8, r, r, 50), { w: 6, closed: true, color: '#4E6A78', seed: 950 });
  }

  E.scene({
    name: 'Mercek çeşitleri', concept: 'İnce ve kalın kenarlı mercek; görüntü gözlemi', from: 'two', to: 'smaller', trFrom: [960, 400],
    draw(ctx, t) {
      const s2 = E.s('two'), st = E.s('thin'), sk = E.s('thick'), sl = E.s('look'), sb = E.s('bigger'), ss = E.s('smaller');
      const k1 = E.se(t, s2 + 0.5, s2 + 1.3, 'out'), k2 = E.se(t, s2 + 1.0, s2 + 1.8, 'out');
      E.layer(ctx, k1, c => F.drawLens(c, LC, { seed: 951 }));
      E.layer(ctx, k2, c => F.drawLens(c, LD, { seed: 953 }));
      // kalınlık vurguları
      const kt = E.se(t, st + 0.3, st + 1.2);
      if (kt > 0) { ctx.save(); ctx.globalAlpha *= kt;
        P.arrow(ctx, [XC - 48, YP], [XC + 48, YP], 1, { w: 2.6, head: 10, color: '#8A4A10' }); P.arrow(ctx, [XC + 48, YP], [XC - 48, YP], 1, { w: 2.6, head: 10, color: '#8A4A10' });
        INK.label(ctx, 'kalın orta', XC + 70, YP - 150, { size: 30, color: '#8A4A10' });
        INK.label(ctx, 'ince kenar', XC + 40, YP + 170, { size: 30, color: '#8A4A10' });
        ctx.restore();
        E.inkText(ctx, 'ince kenarlı mercek', XC, YP + 225, t, st + 0.8, 1e9, { size: 44, align: 'center' }); }
      const kk = E.se(t, sk + 0.3, sk + 1.2);
      if (kk > 0) { ctx.save(); ctx.globalAlpha *= kk;
        const e = LD.pts[0], e2 = LD.pts[LD.pts.length - 1];
        P.arrow(ctx, [e[0] - 4, YP - 128], [e2[0] + 4, YP - 128], 1, { w: 2.6, head: 10, color: '#8A4A10' });
        INK.label(ctx, 'kalın kenar', XD + 70, YP - 150, { size: 30, color: '#8A4A10' });
        INK.label(ctx, 'ince orta', XD + 50, YP + 10, { size: 30, color: '#8A4A10' });
        ctx.restore();
        E.inkText(ctx, 'kalın kenarlı mercek', XD, YP + 225, t, sk + 0.8, 1e9, { size: 44, align: 'center' }); }
      // yazıya bakış
      const kl = E.se(t, sl + 0.3, sl + 1.0);
      if (kl > 0) E.layer(ctx, kl, c => {
        strip(c, XC, 720); strip(c, XD, 720);
        const mb = E.se(t, sb + 0.2, sb + 1.6), ms = E.se(t, ss + 0.2, ss + 1.6);
        if (t > sl + 1.4) looking(c, XC, 720, 1.8, mb);
        if (t > sl + 2.0) looking(c, XD, 720, 0.55, ms);
        if (mb > 0.9) { P.write(c, 'yazı büyük görünür', XC, 870, E.seg(t, sb + 1.6, sb + 2.8), { size: 42, align: 'center', color: '#8A4A10' }); }
        if (ms > 0.9) { P.write(c, 'yazı küçük görünür', XD, 870, E.seg(t, ss + 1.6, ss + 2.8), { size: 42, align: 'center', color: '#8A4A10' }); }
      });
      DAMLA.draw(ctx, { x: 1770, y: 900, s: 0.8, view: 'q3', flip: true, expr: t > sb ? 'happy' : 'curious', look: [-0.9, -0.2], blink: E.blink(t, 7), squash: E.breath(t), t, talk: E.talk(t), seed: 5,
        prop: t > sl ? 'notebook' : null, arms: t > sl ? [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.1]] : [[-1, 0.35], [1, 2.0]] });
    }
  });
})();
