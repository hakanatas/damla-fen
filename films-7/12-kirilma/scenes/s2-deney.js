// SAHNE 2 — Deney: havadan suya geçen ışın; kırılma tanımı; normal, gelen/kırılan ışın, gelme/kırılma açısı
// Kırılan ışın F712.V.refract ile (n_hava = 1,00 → n_su = 1,33) hesaplanır; açılar çizilen ışınlardan ölçülür.
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F712, V = F.V, DEG = F.DEG;
  const WS = 560, O = [860, WS], TH = 40 * DEG, R = 400;
  const S = [O[0] - R * Math.sin(TH), O[1] - R * Math.cos(TH)];
  const D = V.norm(V.sub(O, S));
  const RF = V.refract(D, [0, -1], F.N.hava, F.N.su);
  const END = V.add(O, V.mul(RF, 300)), STRAIGHT = V.add(O, V.mul(D, 300));
  const thI = Math.round(V.angle([0, -1], V.mul(D, -1)) / DEG), thR = Math.round(V.angle([0, 1], RF) / DEG);

  E.scene({
    name: 'Havadan suya', concept: 'Kırılma; normal, gelen ve kırılan ışın, açılar', from: 'setup', to: 'angles', trFrom: [860, 560],
    draw(ctx, t) {
      const ss = E.s('setup'), sb = E.s('bend'), sd = E.s('define'), sn = E.s('normal'), sr = E.s('rays'), sa = E.s('angles');
      F.medium(ctx, 260, 1460, WS, 880, 'su');
      INK.label(ctx, 'hava', 300, WS - 30, { size: 40, weight: 700, alpha: 0.8 });
      INK.label(ctx, 'su', 300, WS + 60, { size: 40, weight: 700, color: PAL.water });
      F.lightbox(ctx, S[0], S[1], Math.atan2(D[1], D[0]), 0.8);
      INK.label(ctx, 'ışık kutusu', S[0] - 120, S[1] - 70, { size: 32, alpha: 0.8 * E.se(t, ss + 0.5, ss + 1.2) });
      const k1 = E.se(t, ss + 3.2, ss + 4.6), k2 = E.se(t, ss + 4.6, ss + 5.8);
      F.ray(ctx, S, O, k1, { seed: 201 });
      F.ray(ctx, O, END, k2, { seed: 202 });
      // düz gitseydi (karşılaştırma)
      const kg = E.se(t, sb + 0.8, sb + 1.8) * (1 - E.se(t, sn - 0.3, sn + 0.3));
      if (kg > 0) { F.dline(ctx, O, F.at(O, STRAIGHT, kg), { color: PAL.ink, alpha: 0.45, w: 2.2 }); E.inkText(ctx, 'düz gitseydi', STRAIGHT[0] + 16, STRAIGHT[1] + 6, t, sb + 1.6, sn, { size: 32, alpha: 0.7 }); }
      if (t > sb && t < sn + 0.5) { F.glow(ctx, O[0], O[1], 90, E.se(t, sb, sb + 0.6) * (1 - E.se(t, sn, sn + 0.5))); E.inkText(ctx, 'sınırda yön değiştirdi!', 1000, 470, t, sb + 0.4, sd + 0.2, { size: 44, color: '#8A4A10' }); }
      // tanım kutusu
      const tk = E.se(t, sd + 0.2, sd + 0.8) * (1 - E.se(t, sn - 0.2, sn + 0.4));
      if (tk > 0) E.layer(ctx, tk, c => {
        const b = [[790, 168], [1840, 162], [1846, 262], [794, 268], [790, 168]];
        P.fillPts(c, b, '#F6E7B8', 0.95); stroke(c, b, { w: 3, closed: true, color: F.AMB, seed: 211 });
        P.write(c, 'kırılma: saydam bir ortamdan diğerine', 1318, 208, E.seg(t, sd + 0.5, sd + 2.0), { size: 38, align: 'center' });
        P.write(c, 'geçen ışığın yön değiştirmesi', 1318, 250, E.seg(t, sd + 1.8, sd + 3.2), { size: 38, align: 'center' });
      });
      // normal
      const kn = E.se(t, sn + 0.5, sn + 1.8);
      if (kn > 0) {
        F.dline(ctx, [O[0], O[1] - 330 * kn], [O[0], O[1] + 320 * kn], { w: 3, color: PAL.water });
        ctx.save(); ctx.globalAlpha *= E.se(t, sn + 1.6, sn + 2.2);
        line(ctx, [O[0] + 26, O[1]], [O[0] + 26, O[1] - 26], { w: 2, dry: false, color: PAL.water }); line(ctx, [O[0] + 26, O[1] - 26], [O[0], O[1] - 26], { w: 2, dry: false, color: PAL.water });
        ctx.restore();
        E.inkText(ctx, 'normal', O[0] + 20, O[1] - 300, t, sn + 1.6, 1e9, { size: 42, color: PAL.water });
        E.inkText(ctx, '(yüzeye dik)', O[0] + 20, O[1] - 260, t, sn + 2.2, 1e9, { size: 30, color: PAL.water, alpha: 0.8 });
      }
      // gelen / kırılan ışın etiketleri
      E.inkText(ctx, 'gelen ışın', 610, 330, t, sr + 0.4, 1e9, { size: 42, color: '#8A4A10', align: 'right' });
      E.inkText(ctx, 'kırılan ışın', 1080, 800, t, sr + 2.6, 1e9, { size: 42, color: '#8A4A10' });
      if (t > sr && t < sr + 5) { const hk = Math.sin(E.seg(t, sr + 0.2, sr + 2.2) * Math.PI); if (hk > 0) F.ray(ctx, S, O, 1, { w: 7, alpha: 0.35 * hk, heads: [], seed: 221 });
        const hk2 = Math.sin(E.seg(t, sr + 2.4, sr + 4.4) * Math.PI); if (hk2 > 0) F.ray(ctx, O, END, 1, { w: 7, alpha: 0.35 * hk2, heads: [], seed: 222 }); }
      // açılar
      const ka = E.se(t, sa + 0.3, sa + 1.3), kb = E.se(t, sa + 4.0, sa + 5.0);
      if (ka > 0) { const m = F.angleArc(ctx, O, [0, -1], V.mul(D, -1), 130, { k: ka, fill: PAL.water, fillA: 0.18, color: PAL.water, seed: 231 });
        E.inkText(ctx, 'gelme açısı', 470, 470, t, sa + 1.0, 1e9, { size: 40, color: PAL.water });
        E.inkText(ctx, thI + '°', O[0] - 44, O[1] - 150, t, sa + 1.2, 1e9, { size: 36, align: 'center', color: PAL.water });
        if (t > sa + 1.2) INK.leader(ctx, [690, 480], [m[0] - 8, m[1] + 14], { color: PAL.water, bend: -0.2 }); }
      if (kb > 0) { const m = F.angleArc(ctx, O, [0, 1], RF, 130, { k: kb, fill: PAL.light, fillA: 0.25, color: '#8A4A10', seed: 232 });
        E.inkText(ctx, 'kırılma açısı', 470, 700, t, sa + 4.6, 1e9, { size: 40, color: '#8A4A10' });
        E.inkText(ctx, thR + '°', O[0] + 36, O[1] + 170, t, sa + 4.8, 1e9, { size: 36, align: 'center', color: '#8A4A10' });
        if (t > sa + 4.8) INK.leader(ctx, [720, 690], [m[0] - 6, m[1] - 4], { color: '#8A4A10', bend: 0.2 }); }
      DAMLA.draw(ctx, { x: 1700, y: 890, s: 1.0, view: 'q3', flip: true, expr: t > sb && t < sd ? 'surprised' : 'curious', look: [-0.9, -0.1], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 5,
        arms: [[-1, 0.35], [1, t > sr ? 2.0 : 0.35]] });
    }
  });
})();
