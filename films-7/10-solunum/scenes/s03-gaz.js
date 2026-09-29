// SAHNE 3 — Gaz değişimi: alveol ile kılcal damar arasında oksijen ve karbondioksit (vurgu)
(function () {
  const { PAL, stroke } = INK; const K = KIT, F = F10;
  const heart = (c, x, y, r) => { const pts = []; for (let i = 0; i <= 60; i++) { const a = i / 60 * Math.PI * 2; pts.push([x + r * 16 * Math.pow(Math.sin(a), 3) / 16, y - r * (13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) / 16]); }
    P.fillPts(c, pts, '#EBC1B6'); INK.wash(c, pts, F.RICH, 0.45, 10401, { bleed: 1, blooms: 0 }); stroke(c, pts, { w: 3, closed: true, seed: 10402, color: F.LUNG_D }); };
  E.scene({
    name: 'Gaz değişimi', concept: 'Alveolde O2 kana, kandan CO2 alveole', from: 'exchange', to: 'carry', trFrom: [760, 470],
    draw(ctx, t) {
      const sx = E.s('exchange'), sc = E.s('carry');
      const o2 = E.se(t, sx + 2.5, sx + 3.5), co2 = E.se(t, sx + 5.5, sx + 6.5);
      const A = F.exchange(ctx, t, 1, { cx: 880, cy: 490, o2, co2 });
      INK.label(ctx, 'bir alveol ve kılcal damar · ölçekli değildir', 60, 900, { size: 28, alpha: 0.55 });
      K.text(ctx, 'alveol', 880, 450, { size: 48, align: 'center', color: F.LUNG_D });
      K.text(ctx, 'hava', 880, 510, { size: 34, align: 'center', alpha: 0.7 });
      K.text(ctx, 'kılcal damar', 880, 800, { size: 42, align: 'center', alpha: E.se(t, sx + 1, sx + 1.6) });
      const lk = E.se(t, sx + 1.2, sx + 1.8);
      K.text(ctx, 'oksijence', 450, 470, { size: 36, color: F.POOR, align: 'center', alpha: lk }); K.text(ctx, 'fakir kan', 450, 514, { size: 36, color: F.POOR, align: 'center', alpha: lk });
      K.text(ctx, 'oksijence', 1300, 470, { size: 36, color: F.RICH, align: 'center', alpha: lk }); K.text(ctx, 'zengin kan', 1300, 514, { size: 36, color: F.RICH, align: 'center', alpha: lk });
      // lejant ve ifadeler
      const r1 = E.se(t, sx + 2.5, sx + 3.2, 'out'), r2 = E.se(t, sx + 5.5, sx + 6.2, 'out');
      if (r1 > 0) E.layer(ctx, r1, c => { INK.inkDot(c, 1440, 230, 12, { color: '46,106,140' }); K.text(c, 'oksijen', 1470, 242, { size: 44, color: PAL.water }); K.text(c, 'alveolden kana geçer', 1470, 290, { size: 36 }); });
      if (r2 > 0) E.layer(ctx, r2, c => { INK.inkDot(c, 1440, 340, 12, { color: '122,106,88' }); K.text(c, 'karbondioksit', 1470, 352, { size: 44, color: F.CO2 }); K.text(c, 'kandan alveole geçer', 1470, 400, { size: 36 }); });
      // taşınma
      const hk = E.se(t, sc + 0.6, sc + 1.4, 'out');
      if (hk > 0) E.layer(ctx, hk, c => { heart(c, 1560, 700, 70); P.arrow(c, [A.capR[0] + 90, A.capR[1] + 40], [1470, 690], E.se(t, sc + 0.6, sc + 1.8), { w: 4, color: F.RICH, bend: -40 }); K.text(c, 'kalbe', 1640, 640, { size: 40, color: F.RICH }); });
      const ok = E.se(t, sc + 3.2, sc + 4);
      if (ok > 0) E.layer(ctx, ok, c => { P.arrow(c, [A.stemTop[0], A.stemTop[1] + 120], [A.stemTop[0] - 20, A.stemTop[1] - 20], E.se(t, sc + 3.2, sc + 4.2), { w: 4, color: F.CO2 });
        K.text(c, 'soluk verme ile dışarı', A.stemTop[0] + 50, A.stemTop[1] + 20, { size: 38, color: F.CO2 }); });
      K.damla(ctx, t, { x: 1760, y: 905, s: 0.85, flip: true, expr: t > sc ? 'happy' : 'curious', look: [-0.8, -0.3], arms: [[-1, 0.5], [1, 0.5]] });
    }
  });
})();
