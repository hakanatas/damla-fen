// SAHNE 5 — Gelen ışın, yansıyan ışın, yüzey normali, gelme/yansıma açısı (FB.6.4.2)
// Yansıyan ışın r = d − 2(d·n)n ile hesaplanır; açılar V.angle ile ölçülüp yazılır.
(function () {
  const { PAL, line, stroke, dashed } = INK;
  const F = F611, V = F.V, DEG = Math.PI / 180;
  const O = [860, 760], N = [0, -1], R = 470, TH = 40 * DEG;
  const S = [O[0] - R * Math.sin(TH), O[1] - R * Math.cos(TH)];
  const D = V.norm(V.sub(O, S)), RF = V.reflect(D, N), END = V.add(O, V.mul(RF, R));

  E.scene({
    name: 'Normal ve açılar', concept: 'Gelen ışın, yansıyan ışın, normal', from: 'mirror', to: 'angles', trFrom: [860, 760],
    draw(ctx, t) {
      const sm = E.s('mirror'), si = E.s('incident'), sn = E.s('normal'), sa = E.s('angles');
      F.mirror(ctx, 240, 1480, O[1]);
      INK.label(ctx, 'ayna', 1400, O[1] + 70, { size: 38, weight: 700, align: 'center' });
      F.flashlight(ctx, S[0], S[1], Math.atan2(D[1], D[0]), 1.2, 1);
      const k1 = E.se(t, sm + 1.2, sm + 2.4), k2 = E.se(t, sm + 2.4, sm + 3.6);
      F.ray(ctx, S, O, k1, { seed: 741, heads: [0.55] });
      F.ray(ctx, O, END, k2, { seed: 742, heads: [0.55] });
      // etiketler
      const mi = V.mul(V.add(S, O), 0.5), mr = V.mul(V.add(O, END), 0.5);
      E.inkText(ctx, 'gelen ışın', 300, 540, t, si + 0.5, 1e9, { size: 42, color: '#8A4A10' });
      E.inkText(ctx, 'yansıyan ışın', 1190, 480, t, si + 2.6, 1e9, { size: 42, color: '#8A4A10' });
      // normal
      const kn = E.se(t, sn + 0.4, sn + 1.6);
      if (kn > 0) {
        const top = [O[0], O[1] - 420 * kn];
        const pts = []; for (let i = 0; i <= 40; i++) pts.push(E.mix(O, top, i / 40));
        dashed(ctx, pts, { w: 3, on: 14, off: 10, color: PAL.water });
        // dik açı işareti
        ctx.save(); ctx.globalAlpha *= E.se(t, sn + 1.4, sn + 2); line(ctx, [O[0] + 26, O[1]], [O[0] + 26, O[1] - 26], { w: 2, dry: false, color: PAL.water }); line(ctx, [O[0] + 26, O[1] - 26], [O[0], O[1] - 26], { w: 2, dry: false, color: PAL.water }); ctx.restore();
        E.inkText(ctx, 'normal', O[0] + 24, O[1] - 390, t, sn + 1.4, 1e9, { size: 42, align: 'left', color: PAL.water });
        E.inkText(ctx, '(yüzeye dik)', O[0] + 24, O[1] - 350, t, sn + 2.0, 1e9, { size: 30, align: 'left', color: PAL.water, alpha: 0.8 });
      }
      // açılar
      const ka = E.se(t, sa + 0.3, sa + 1.3), kb = E.se(t, sa + 3.2, sa + 4.2);
      const toS = V.norm(V.sub(S, O));
      if (ka > 0) { const m = F.angleArc(ctx, O, N, toS, 150, { k: ka, fill: PAL.water, fillA: 0.18, color: PAL.water, seed: 751 });
        const a = V.angle(N, toS) / DEG;
        E.inkText(ctx, 'gelme açısı', 470, 660, t, sa + 0.9, 1e9, { size: 40, color: PAL.water });
        E.inkText(ctx, Math.round(a) + '°', O[0] - 70, O[1] - 175, t, sa + 1.1, 1e9, { size: 36, align: 'center', color: PAL.water }); }
      if (kb > 0) { F.angleArc(ctx, O, N, RF, 150, { k: kb, fill: PAL.light, fillA: 0.25, color: '#8A4A10', seed: 752 });
        const b = V.angle(N, RF) / DEG;
        E.inkText(ctx, 'yansıma açısı', 1000, 660, t, sa + 3.8, 1e9, { size: 40, color: '#8A4A10' });
        E.inkText(ctx, Math.round(b) + '°', O[0] + 70, O[1] - 175, t, sa + 4.0, 1e9, { size: 36, align: 'center', color: '#8A4A10' }); }
      DAMLA.draw(ctx, { x: 1680, y: 900, s: 1.05, view: 'q3', flip: true, expr: 'curious', look: [-0.8, -0.2], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 5,
        arms: [[-1, 0.35], [1, t > si ? 2.0 : 0.35]] });
    }
  });
})();
