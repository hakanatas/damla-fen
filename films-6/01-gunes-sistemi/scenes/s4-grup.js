// SAHNE 4 — Ayrıştır → grupla → etiketle: karasal/iç gezegenler · gazsal/dış gezegenler (FB.6.1.1 b, c, ç)
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const F = G61;
  const X = [230, 340, 460, 575, 830, 1115, 1400, 1640], Y = 470;
  const VR = [20, 34, 35, 26, 80, 64, 48, 46];
  const SH = [-90, -90, -90, -90, 95, 95, 95, 95];

  E.scene({
    name: 'Grupla', concept: 'Ayrıştırma, gruplandırma, etiketleme', from: 'sort', to: 'label', trFrom: [960, 470],
    draw(ctx, t) {
      const ss = E.s('sort'), sg = E.s('groups'), sl = E.s('label');
      const mv = E.se(t, ss + 2.2, ss + 4.2);
      const xs = X.map((x, i) => x + SH[i] * mv);
      // ayırma çizgisi (Damla kalemle çizer)
      const cut = E.se(t, ss + 0.8, ss + 2.2);
      if (cut > 0) { ctx.save(); ctx.globalAlpha = 0.8; dashed(ctx, P.partial(P.bez([700, 220], [712, 480], [700, 740], 50), cut), { w: 3, on: 14, off: 10, color: '#8A4A10' }); ctx.restore(); }
      // gruplar (çerçeve)
      const ek = E.se(t, ss + 4.0, ss + 5.2);
      if (ek > 0) {
        const L = INK.wobble(circlePts(360, Y, 300, 175, 70), 6, 71), R = INK.wobble(circlePts(1330, Y, 540, 205, 90), 6, 72);
        ctx.save(); ctx.globalAlpha = ek;
        INK.wash(ctx, L, PAL.water, 0.12, 73, { blooms: 0 }); INK.wash(ctx, R, PAL.light, 0.14, 74, { blooms: 0 });
        stroke(ctx, P.partial(L, ek), { w: 3, seed: 75 }); stroke(ctx, P.partial(R, ek), { w: 3, seed: 76 });
        ctx.restore();
        E.inkText(ctx, 'kayalık yüzey', 360, 690, t, ss + 4.6, sg + 0.2, { size: 38, align: 'center', alpha: 0.8 });
        E.inkText(ctx, 'gazlardan oluşur', 1330, 715, t, ss + 4.6, sg + 0.2, { size: 38, align: 'center', alpha: 0.8 });
      }
      F.PLANETS.forEach((p, i) => {
        F.planet(ctx, i, xs[i], Y, VR[i]);
        INK.label(ctx, p.n, xs[i], Y + VR[i] + (i === 5 ? 62 : 46), { size: 34, weight: 700, align: 'center' });
      });
      // özellik listeleri
      const LA = ['küçük', 'karasal', 'halkasız'], RA = ['büyük', 'gazsal', 'halkalı'];
      P.write(ctx, LA.join(' · '), 360, 790, E.seg(t, sg + 0.6, sg + 3.6), { size: 42, align: 'center' });
      P.write(ctx, RA.join(' · '), 1330, 790, E.seg(t, sg + 4.2, sg + 7.0), { size: 42, align: 'center' });
      // etiketler
      [['İç gezegenler', 360, PAL.water], ['Dış gezegenler', 1330, '#8A4A10']].forEach(([txt, x, col], j) => {
        const at = sl + 0.8 + j * 1.6, k = E.se(t, at, at + 0.7, 'out'); if (k <= 0) return;
        const w = 360, h = 84, y = 205;
        ctx.save(); ctx.translate(x, y); ctx.rotate(-0.02 + j * 0.03); ctx.scale(P.pop(k), P.pop(k));
        F.card(ctx, -w / 2, -h / 2, w, h, { seed: 80 + j, fill: '#FBF8F1' });
        INK.hatch(ctx, -w / 2 + 8, 0, 10, 60, { n: 1, ang: 1.57, w: 6, alpha: 0.85, color: col, seed: 3 });
        INK.label(ctx, txt, 8, 16, { size: 50, weight: 700, align: 'center', rot: 0 });
        ctx.restore();
      });
      // Damla kalemle ayırıyor
      const writing = t < ss + 2.4;
      DAMLA.draw(ctx, { x: 740, y: 910, s: 0.95, view: 'q3', flip: false, expr: t > sl ? 'happy' : 'determined', look: [-0.4, -0.5], blink: E.blink(t, 5), squash: E.breath(t), t, seed: 3,
        arms: writing ? [[-1, 0.35], [1, [70, -190 + 60 * Math.sin((t - ss) * 1.6)], 0.2]] : [[-1, 0.35], [1, t > sl ? 2.5 : 0.4]],
        hold: writing ? (c, res) => { const h = res[1].hand; line(c, [h[0] - 6, h[1] + 16], [h[0] + 8, h[1] - 22], { w: 5, color: PAL.light }); } : null });
    }
  });
})();
