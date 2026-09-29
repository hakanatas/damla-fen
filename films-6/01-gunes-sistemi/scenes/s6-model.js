// SAHNE 6 — Model önerme ve yeni kanıtla yenileme (FB.6.1.2 a, b · D5.2 atık malzeme · OB8)
(function () {
  const { PAL, line, stroke, circlePts, rng } = INK;
  const F = G61;
  const TY = 640;    // masa üstü (topların oturduğu çizgi)
  // Model 1: eşit toplar, eşit aralık · Model 2: çaplar oranlı (Dünya=7px), aralıklar giderek artar
  const X1 = [420, 570, 720, 870, 1020, 1170, 1320, 1470];
  const X2 = [390, 435, 490, 555, 800, 1100, 1380, 1600];
  const R1 = 26;
  const R2 = F.PLANETS.map(p => Math.max(3.5, p.d * 7));

  function cap(ctx, x, y, w, seed) { // atık şişe kapağı (altlık)
    const c = [[x - w, y], [x + w, y], [x + w * 0.85, y + 22], [x - w * 0.85, y + 22], [x - w, y]];
    P.fillPts(ctx, c, seed % 2 ? '#7FA7B8' : '#C9A56A', 0.9); stroke(ctx, c, { w: 2, closed: true, dry: false, seed });
    for (let i = -2; i <= 2; i++) line(ctx, [x + i * w * 0.3, y + 4], [x + i * w * 0.27, y + 18], { w: 1, alpha: 0.5, dry: false });
  }

  function table(ctx) {
    const tb = [[-50, TY + 20], [E.W + 50, TY + 20], [E.W + 50, 880], [-50, 880]];
    P.fillPts(ctx, tb, '#D9BE8E', 1); INK.wash(ctx, tb, '#8A6A45', 0.35, 101, { blooms: 1 });
    stroke(ctx, [[-50, TY + 20], [E.W + 50, TY + 18]], { w: 3.4, seed: 102, taper: 0.01 });
    for (let i = 0; i < 6; i++) line(ctx, [-50, TY + 70 + i * 34], [E.W + 50, TY + 72 + i * 34], { w: 1, alpha: 0.2, dry: false, seed: 103 + i, bend: 0.002 });
  }

  E.scene({
    name: 'Model', concept: 'Model önerme ve yenileme', from: 'model', to: 'scale', trFrom: [960, 600],
    draw(ctx, t) {
      const sm = E.s('model'), se = E.s('evidence'), sv = E.s('revise'), ss = E.s('scale');
      table(ctx);
      const mv = E.se(t, sv + 0.6, sv + 3.2);
      // Güneş (oyun hamuru, büyük top — gerçek oranda değil)
      const sunK = P.pop(E.seg(t, sm + 0.3, sm + 1.0));
      if (sunK > 0) { const sr = 110 * sunK; P.fillPts(ctx, circlePts(180, TY + 20 - sr, sr, sr, 50), '#F2B45A', 1); INK.wash(ctx, circlePts(180, TY + 20 - sr, sr, sr, 50), '#E08A2A', 0.5, 110); stroke(ctx, INK.wobble(circlePts(180, TY + 20 - sr, sr, sr, 60), 2, 111), { w: 3.4, closed: true }); }
      // gezegenler
      F.PLANETS.forEach((p, i) => {
        const k = P.pop(E.seg(t, sm + 1.0 + i * 0.35, sm + 1.6 + i * 0.35)); if (k <= 0) return;
        const x = E.lerp(X1[i], X2[i], mv), r = E.lerp(R1, R2[i], mv) * k, y = TY - 2 - r;
        cap(ctx, x, TY - 2, Math.max(16, r * 0.55), 120 + i);
        F.planet(ctx, i, x, y - 2, r, { rings: mv > 0.6 && i === 5 });
        ctx.save(); ctx.globalAlpha = 1 - E.se(t, sv, sv + 0.6); INK.label(ctx, F.PLANETS[i].n, x, TY + 76 + (i % 2) * 40, { size: 32, weight: 700, align: 'center' }); ctx.restore();
      });
      // asteroit kuşağı: taş parçaları (yenilenmiş modelde)
      const bk = E.se(t, sv + 3.4, sv + 4.6);
      if (bk > 0) { const R = rng(140); for (let i = 0; i < 26 * bk; i++) F.rock(ctx, 640 + R() * 100, TY + 2 - R() * 26, 3 + R() * 5, 141 + i, { fill: '#8C8272' }); }
      // Model başlıkları
      E.inkText(ctx, 'Model 1', 960, 250, t, sm + 1.0, sv + 0.4, { size: 64, align: 'center' });
      E.inkText(ctx, 'oyun hamuru · atık kapaklar · taş parçaları', 960, 320, t, sm + 3.2, se, { size: 38, align: 'center', weight: 400 });
      E.inkText(ctx, 'Model 2 (yenilendi)', 960, 250, t, sv + 0.8, 1e9, { size: 64, align: 'center', color: '#8A4A10' });
      // kanıt kartı
      const ek = E.se(t, se + 0.3, se + 1.0, 'out') * (1 - E.se(t, sv + 0.2, sv + 0.8));
      if (ek > 0) E.layer(ctx, ek, c => {
        F.card(c, 1180, 300, 640, 250, { seed: 150 });
        INK.label(c, 'Bilimsel kaynak: çaplar', 1220, 350, { size: 36, weight: 700, color: '#8A4A10' });
        let x = 1230; F.PLANETS.forEach((p, i) => { const r = Math.max(2, p.d * 3.6); F.planet(c, i, x + r, 460, r, { rings: false }); x += 2 * r + 12; });
        INK.label(c, 'Hepsi aynı büyüklükte değil!', 1220, 530, { size: 32 });
      });
      if (t > se + 1.2 && t < sv + 0.5) X1.forEach((x, i) => { if (i % 2 === 0 && i < 5) E.inkText(ctx, '?', x + 10, TY - 90, t, se + 1.4 + i * 0.1, sv + 0.5, { size: 54, color: '#8A4A10' }); });
      // yenileme notları
      if (bk > 0) { ctx.save(); ctx.globalAlpha = bk; INK.leader(ctx, [560, 500], [680, TY - 12], { bend: 0.2 }); ctx.restore(); E.inkText(ctx, 'asteroit kuşağı', 540, 480, t, sv + 4.4, 1e9, { size: 36, align: 'center' }); }
      const dk = E.se(t, sv + 3.0, sv + 4.0);
      if (dk > 0) { ctx.save(); ctx.globalAlpha = dk; P.arrow(ctx, [800, 780], [1560, 780], dk, { w: 3, head: 14, bend: -8 }); ctx.restore(); INK.label(ctx, 'aralıklar giderek artar', 1180, 830, { size: 36, align: 'center', alpha: dk }); }
      // ölçek notu
      E.inkText(ctx, 'Gerçekte Neptün’ün Güneş’e uzaklığı, Dünya’nınkinin ≈ 30 katıdır.', 960, 335, t, ss + 1.0, 1e9, { size: 42, align: 'center' });
      E.inkText(ctx, '(model ölçekli değildir)', 960, 890, t, ss + 2.5, 1e9, { size: 34, weight: 400, align: 'center', alpha: 0.75 });
      // Damla
      const surprised = t > se && t < sv;
      DAMLA.draw(ctx, { x: 1790, y: 900, s: 1.0, view: 'q3', flip: true, expr: surprised ? 'surprised' : (t > sv ? 'happy' : 'curious'), look: [-0.8, -0.2], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 4,
        arms: [[-1, 0.35], [1, t > sv + 0.2 && t < sv + 3.4 ? 1.6 + Math.sin(t * 6) * 0.3 : 0.4]] });
    }
  });
})();
