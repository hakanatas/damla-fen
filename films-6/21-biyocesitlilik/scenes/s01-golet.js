// SAHNE 1–2 — Gölet kenarı: doğal yaşam gözlemi, habitat, ekosistem, biyoçeşitlilik (FB.6.7.1 a)
(function () {
  const { PAL, line, stroke, circlePts, dashed, wash } = INK;
  const F = F621;
  const HILL = P.hillLine(E.W, 800);
  F.HILL = HILL;
  // canlılar: [ad, x, y, çizim]
  F.CRITTERS = [
    ['papatya', 790, 700, (c, t) => F.flower(c, 790, 700, 1, '#FBF8F1', 1, t)],
    ['gelincik', 880, 694, (c, t) => F.flower(c, 880, 694, 0.9, '#C8553D', 3, t, 70)],
    ['arı', 840, 560, (c, t) => F.bee(c, 840 + Math.sin(t * 1.7) * 30, 580 + Math.sin(t * 2.3) * 14, 1.1, t)],
    ['kelebek', 960, 520, (c, t) => F.butterfly(c, 970 + Math.sin(t * 0.9) * 50, 520 + Math.sin(t * 1.9) * 24, 1.1, t)],
    ['kurbağa', 1060, 770, (c, t) => F.frog(c, 1080, 772, 1.1)],
    ['balık', 1300, 830, (c, t) => { F.fish(c, 1260 + Math.sin(t * 0.6) * 40, 828, 0.9, 1, '#D98A2B', 1); F.fish(c, 1440 - Math.sin(t * 0.5) * 30, 846, 0.7, -1, '#D98A2B', 2); }],
    ['balıkçıl', 1600, 800, (c, t) => F.heron(c, 1600, 805, 1.25, t)],
    ['serçe', 300, 745, (c, t) => F.bird(c, 300, 746, 1.1, t)],
    ['söğüt', 1780, 805, (c, t) => F.tree(c, 1790, 805, 1.2, 4, t, { col: '#5E8F45', rx: 80, ry: 70 })],
    ['saz', 1020, 790, (c, t) => { F.reeds(c, 1010, 800, 1, t, 1); F.reeds(c, 1660, 830, 0.9, t, 2); }]
  ];
  F.world = (ctx, t, o = {}) => {
    const hl = o.hl ?? {};
    P.landscape(ctx, E.W, E.H, t, { hill: HILL, tree: false });
    F.tree(ctx, 170, P.hillY(HILL, 170) + 6, 1.15, 2, t);
    F.pond(ctx, 1330, 822, 300, 55, t);
    F.CRITTERS.forEach(([name, x, y, draw]) => {
      const a = o.dim && !hl[name] ? 0.35 : 1;
      if (a < 1) E.layer(ctx, a, c => draw(c, t)); else draw(ctx, t);
    });
  };
  F.damla = (ctx, t, o = {}) => {
    const dx = o.x ?? 560, dy = P.hillY(HILL, dx) + 4;
    DAMLA.draw(ctx, { x: dx, y: dy, s: o.s ?? 1.35, view: o.view ?? 'q3', expr: o.expr ?? 'curious', look: o.look ?? [0.7, -0.2], blink: E.blink(t, 3), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: o.arms ?? [[-1, 0.4], [1, 0.5]], prop: o.prop, propTilt: o.propTilt, flip: o.flip });
  };
  const LBL = { 'papatya': [735, 748], 'gelincik': [905, 748], 'arı': [870, 505], 'kelebek': [1110, 450], 'kurbağa': [1110, 700], 'balık': [1330, 910], 'balıkçıl': [1480, 610], 'serçe': [300, 650], 'söğüt': [1790, 540], 'saz': [990, 640] };

  E.scene({
    name: 'Gölet', concept: 'Doğal yaşamı gözlemleme', from: 'title', to: 'look',
    draw(ctx, t) {
      const sl = E.s('look');
      const z = 1.08 - 0.08 * E.se(t, 0, sl + 2);
      ctx.save(); E.cam(ctx, { x: 980, y: 560, z });
      F.world(ctx, t);
      const wave = t > sl && t < sl + 2.2;
      F.damla(ctx, t, { expr: t > sl ? 'happy' : 'curious', view: wave ? 'front' : 'q3', arms: wave ? [[-1, 0.4], [1, 2.4 + 0.35 * Math.sin(t * 8)]] : [[-1, 0.4], [1, 1.9]], prop: wave ? null : 'lens', propTilt: -0.2 });
      ctx.restore();
      // canlı etiketleri (sırayla)
      F.CRITTERS.forEach(([name], i) => {
        const at = sl + 2.2 + i * 0.42; const [x, y] = LBL[name];
        if (name === 'balık') E.inkText(ctx, name, 1330, 900, t, at, E.e('look') + 1, { size: 34, align: 'center', color: '#2F5A73' });
        else E.inkText(ctx, name, x, y, t, at, E.e('look') + 1, { size: 34, align: 'center', color: '#2F4A1E' });
      });
      // başlık kartı
      const t1 = E.e('title') + 1.2;
      if (t < t1) {
        const bk = Math.min(E.se(t, 0.3, 1.0), 1 - E.se(t, t1 - 0.6, t1));
        ctx.save(); ctx.globalAlpha = 0.82 * bk; ctx.fillStyle = PAL.paper; ctx.fillRect(0, 120, E.W, 270); ctx.restore();
      }
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '21 · Canlıların Zenginliği: Biyoçeşitlilik', 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 6. sınıf · Ünite 7', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([600, 230], [960, 240], [1320, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.life }); ctx.restore(); }
    }
  });

  E.scene({
    name: 'Kavramlar', concept: 'Habitat · ekosistem · biyoçeşitlilik', from: 'habitat', to: 'biodiv', tr: 0.01,
    draw(ctx, t) {
      const sh = E.s('habitat'), se = E.s('ecosystem'), sb = E.s('biodiv');
      const inEco = t >= se, inBio = t >= sb;
      const hl = inBio ? null : (inEco ? null : { 'kurbağa': 1, 'saz': 1, 'balık': 1 });
      ctx.save(); E.cam(ctx, { x: 960, y: 540, z: 1 });
      if (inEco) {
        const sk = E.se(t, se + 0.4, se + 1.6);
        if (sk > 0) { ctx.save(); ctx.globalAlpha = sk; P.sun(ctx, 1620, 250, 58, t, { nrays: 14, cells: false }); ctx.restore(); }
      }
      F.world(ctx, t, { dim: !!hl, hl: hl || {} });
      F.damla(ctx, t, { expr: 'curious', view: 'q3', arms: [[-1, 0.4], [1, 2.0]], look: [0.9, -0.1] });
      ctx.restore();
      // --- habitat
      const hA = 1 - E.se(t, se - 0.3, se + 0.3);
      if (hA > 0) E.layer(ctx, hA, c => {
        const k = E.se(t, sh + 0.3, sh + 1.8);
        const ring = P.partial(circlePts(1290, 800, 360, 110, 90, Math.PI), k);
        dashed(c, ring, { w: 3.2, color: PAL.life, on: 14, off: 10 });
        const ck = E.se(t, sh + 1.2, sh + 2.0, 'out');
        if (ck > 0) {
          c.save(); c.globalAlpha *= ck;
          F.card(c, 1010, 330, 640, 190, 11, { tint: PAL.life, tintA: 0.12 });
          P.write(c, 'Habitat', 1330, 400, E.seg(t, sh + 1.4, sh + 2.2), { size: 58, align: 'center', color: '#2F4A1E' });
          P.write(c, 'yaşadığı · beslendiği · barındığı ortam', 1330, 460, E.seg(t, sh + 2.0, sh + 3.2), { size: 34, align: 'center', weight: 400 });
          P.write(c, 'kurbağanın habitatı: gölet', 1330, 500, E.seg(t, sh + 3.0, sh + 4.2), { size: 34, align: 'center', color: '#2F4A1E' });
          if (t > sh + 3.6) INK.leader(c, [1200, 526], [1090, 730], { color: '#2F4A1E', seed: 21 });
          c.restore();
        }
      });
      // --- ekosistem
      const eA = Math.min(E.se(t, se, se + 0.5), 1 - E.se(t, sb - 0.3, sb + 0.3));
      if (eA > 0) E.layer(ctx, eA, c => {
        const g1 = E.se(t, se + 1.0, se + 2.0), g2 = E.se(t, se + 3.0, se + 4.0), g3 = E.se(t, se + 5.2, se + 6.2, 'out');
        if (g1 > 0) {
          c.save(); c.globalAlpha *= g1;
          P.write(c, 'canlılar', 1000, 410, g1, { size: 44, align: 'center', color: '#2F4A1E' });
          [[880, 600], [1080, 740], [1560, 620]].forEach((p, i) => INK.leader(c, [1000 + (i - 1) * 40, 424], p, { color: '#2F4A1E', seed: 30 + i }));
          c.restore();
        }
        if (g2 > 0) {
          c.save(); c.globalAlpha *= g2;
          P.write(c, 'cansız ögeler:', 1420, 400, g2, { size: 40, align: 'center', color: '#2F5A73' });
          P.write(c, 'su · toprak · ışık', 1420, 450, E.seg(t, se + 3.4, se + 4.4), { size: 40, align: 'center', color: '#2F5A73' });
          INK.leader(c, [1380, 470], [1330, 800], { color: '#2F5A73', seed: 41 }); INK.leader(c, [1500, 470], [1540, 730], { color: '#2F5A73', seed: 42 }); INK.leader(c, [1520, 380], [1580, 290], { color: '#2F5A73', seed: 43 });
          c.restore();
        }
        if (g3 > 0) {
          c.save(); c.globalAlpha *= g3;
          F.card(c, 1030, 170, 560, 110, 12, { tint: PAL.life, tintA: 0.14 });
          F.fit(c, 'canlılar + cansız ögeler = EKOSİSTEM', 1310, 244, 520, 42, { color: '#2F4A1E' });
          c.restore();
        }
      });
      // --- biyoçeşitlilik
      const bk = E.se(t, sb + 0.2, sb + 1.0, 'out');
      if (bk > 0) E.layer(ctx, bk, c => {
        F.card(c, 900, 170, 860, 240, 13, { tint: PAL.life, tintA: 0.16 });
        P.write(c, 'Biyoçeşitlilik', 1330, 250, E.seg(t, sb + 0.4, sb + 1.4), { size: 66, align: 'center', color: '#2F4A1E' });
        P.write(c, 'bir bölgedeki canlı türlerinin çeşitliliği', 1330, 320, E.seg(t, sb + 1.2, sb + 2.6), { size: 40, align: 'center', weight: 400 });
        P.write(c, 'çok tür → zengin biyoçeşitlilik', 1330, 380, E.seg(t, sb + 2.6, sb + 3.8), { size: 36, align: 'center', color: '#2F4A1E' });
        // her türün yanında yeşil nokta
        F.CRITTERS.forEach(([name, x, y], i) => { const k = E.se(t, sb + 1.4 + i * 0.2, sb + 1.8 + i * 0.2, 'out'); if (k > 0) { const p = circlePts(x, y - 40, 12 * P.pop(k), 12 * P.pop(k), 16); P.fillPts(c, p, PAL.life, 0.8); stroke(c, p, { w: 2, closed: true, dry: false }); } });
      });
    }
  });
})();
