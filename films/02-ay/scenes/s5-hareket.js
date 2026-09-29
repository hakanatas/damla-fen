// SAHNE 5 — Dönme ve dolanma (süre ≈ 27,3 gün, yön: kuzeyden bakınca saat yönünün tersi)
(function () {
  const { PAL, line, stroke, circlePts, dashed, arrowHead } = INK;
  const AMB = '#C07F1E';
  // Ay + Dünya'ya bakan yüzünü gösteren işaret (kehribar nokta)
  function markedMoon(ctx, x, y, r, faceAng, a = 1) {
    ctx.save(); ctx.globalAlpha *= a;
    P.moon(ctx, x, y, r);
    const fx = x + Math.cos(faceAng) * r * 0.62, fy = y + Math.sin(faceAng) * r * 0.62;
    line(ctx, [x, y], [fx, fy], { w: 3, dry: false, color: AMB });
    P.fillPts(ctx, circlePts(fx, fy, r * 0.22, r * 0.22, 16), AMB, 0.95);
    ctx.restore();
  }
  E.scene({
    name: 'Dönme ve dolanma', concept: 'Ay\'ın dönme ve dolanma hareketleri, süre ve yön', from: 'revolve', to: 'dir', trFrom: [700, 560],
    draw(ctx, t) {
      const sv = E.s('revolve'), sr = E.s('rotate'), sd = E.s('dir');
      const ex = 700, ey = 560, R = 290;
      ctx.save(); ctx.fillStyle = 'rgba(30,38,72,0.10)'; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
      ctx.save(); ctx.globalAlpha = 0.7; dashed(ctx, circlePts(ex, ey, R, R, 120), { w: 2.4, on: 12, off: 9 }); ctx.restore();
      P.earth(ctx, ex, ey, 80);
      INK.label(ctx, 'Dünya', ex, ey + 125, { size: 36, weight: 700, align: 'center' });
      // yörünge oku (saat yönünün tersi)
      const ko = E.se(t, sv + 1.5, sv + 2.5);
      if (ko > 0) { ctx.save(); ctx.globalAlpha = ko; F02.orbitArrow(ctx, ex, ey, R + 44, R + 44, 0.5, -0.9, { w: 5, head: 20 }); F02.orbitArrow(ctx, ex, ey, R + 44, R + 44, 0.5 + Math.PI, -0.9 + Math.PI, { w: 5, head: 20 }); ctx.restore(); }
      // hayalet konumlar: yüz işareti hep Dünya'ya dönük → Ay bir turda bir kez döner
      const kg = E.se(t, sr + 0.6, sr + 2.0);
      if (kg > 0) for (let i = 0; i < 8; i++) { const a = -i / 8 * 6.283; markedMoon(ctx, ex + Math.cos(a) * R, ey + Math.sin(a) * R, 34, a + Math.PI, 0.45 * E.se(t, sr + 0.6 + i * 0.15, sr + 1.0 + i * 0.15)); }
      // hareket eden Ay: 1 tur / 8 sn (gerçekte ≈ 27,3 gün)
      const a = -((t - sv) / 8) * 6.283 + 0.3;
      const mx = ex + Math.cos(a) * R, my = ey + Math.sin(a) * R;
      markedMoon(ctx, mx, my, 48, a + Math.PI);
      if (t > sr + 0.3) { const sp = P.arc(mx, my, 70, a + 1.2, a - 2.6, 24); ctx.save(); ctx.globalAlpha = E.se(t, sr + 0.3, sr + 1); stroke(ctx, sp, { w: 3.4, color: PAL.water, dry: false }); arrowHead(ctx, sp[20], sp[24], 13, { w: 3, color: PAL.water }); ctx.restore(); }
      INK.label(ctx, 'Ay', mx, my - 62, { size: 34, weight: 700, align: 'center' });
      INK.label(ctx, '(çizim ölçekli değildir)', 120, 900, { size: 28, alpha: 0.6 });
      // sağ panel
      E.inkText(ctx, 'Kuzeyden bakış', 1480, 190, t, sv + 0.3, 1e9, { size: 50, align: 'center' });
      const k1 = E.se(t, sv + 2.2, sv + 3.0, 'out');
      if (k1 > 0) E.layer(ctx, k1, c => {
        F02.card(c, 1150, 250, 660, 190, { seed: 61 });
        P.write(c, 'Dolanma', 1190, 320, 1, { size: 46, color: AMB });
        INK.label(c, 'Dünya’nın çevresinde', 1190, 372, { size: 34 });
        P.write(c, '≈ 27,3 gün', 1520, 410, E.seg(t, sv + 4.0, sv + 5.0), { size: 50 });
      });
      const k2 = E.se(t, sr + 0.4, sr + 1.2, 'out');
      if (k2 > 0) E.layer(ctx, k2, c => {
        F02.card(c, 1150, 470, 660, 190, { seed: 62 });
        P.write(c, 'Dönme', 1190, 540, 1, { size: 46, color: PAL.water });
        INK.label(c, 'kendi ekseni etrafında', 1190, 592, { size: 34 });
        P.write(c, '≈ 27,3 gün', 1520, 630, E.seg(t, sr + 3.4, sr + 4.4), { size: 50 });
      });
      const k3 = E.se(t, sd + 0.4, sd + 1.2, 'out');
      if (k3 > 0) E.layer(ctx, k3, c => {
        F02.card(c, 1150, 690, 660, 190, { seed: 63 });
        P.icon.clock(c, 1235, 785, 0.6, 0);
        const ca = P.arc(1235, 785, 60, -0.6, -2.6, 20); stroke(c, ca, { w: 3.6, color: AMB, dry: false }); arrowHead(c, ca[16], ca[20], 12, { w: 3, color: AMB });
        P.write(c, 'iki hareket de', 1320, 770, E.seg(t, sd + 1.0, sd + 1.8), { size: 38 });
        P.write(c, 'saat yönünün tersine', 1320, 822, E.seg(t, sd + 1.6, sd + 2.8), { size: 38, color: AMB });
      });
    }
  });
})();
