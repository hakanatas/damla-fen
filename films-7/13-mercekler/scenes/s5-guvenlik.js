// SAHNE 5 — Güvenlik: mercekle güneş ışığı toplanmaz. Çevre: ormana atılan cam kırıkları / su dolu pet şişeler yangına yol açabilir (D16.2, SDB3.3)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F713, RED = F.RED;
  const GROUND = 860;

  function tree(ctx, x, s, seed) {
    line(ctx, [x, GROUND], [x + 4, GROUND - 120 * s], { w: 7 * s, seed, taper: 0.1, color: '#5A4630' });
    const cr = INK.wobble(circlePts(x + 4, GROUND - 170 * s, 70 * s, 80 * s, 40), 5, seed + 1);
    wash(ctx, cr, PAL.life, 0.5, seed + 2, { bleed: 2 }); stroke(ctx, cr, { w: 2.6, closed: true, seed: seed + 3 });
  }
  function bottle(ctx, x, y) {
    const b = [[x - 80, y - 26], [x + 50, y - 26], [x + 70, y - 12], [x + 96, y - 12], [x + 96, y + 12], [x + 70, y + 12], [x + 50, y + 26], [x - 80, y + 26], [x - 80, y - 26]];
    P.fillPts(ctx, b, '#D3E6EE', 0.9); P.fillPts(ctx, [[x - 78, y - 6], [x + 48, y - 6], [x + 48, y + 24], [x - 78, y + 24]], PAL.water, 0.3);
    stroke(ctx, b, { w: 2.6, closed: true, seed: 1201 });
  }

  E.scene({
    name: 'Güvenlik ve çevre', concept: 'Güneş ışığı mercekle toplanmaz; çevreyi koru', from: 'safety', to: 'protect', trFrom: [960, 400],
    draw(ctx, t) {
      const ss = E.s('safety'), sf = E.s('forest'), sp = E.s('protect');
      // uyarı kartı
      const kc = E.se(t, ss + 0.2, ss + 0.9, 'out');
      if (kc > 0) E.layer(ctx, kc, c => {
        const pts = [[240, 170], [1640, 164], [1646, 520], [244, 526], [240, 170]];
        c.save(); c.shadowColor = 'rgba(60,20,10,0.25)'; c.shadowBlur = 18; P.fillPts(c, pts, '#FBEDE6'); c.restore();
        stroke(c, pts, { w: 4, closed: true, color: RED, seed: 1211 });
        F.warnTri(c, 330, 280);
        P.write(c, 'DİKKAT!', 410, 290, E.seg(t, ss + 0.6, ss + 1.4), { size: 58, color: RED });
        P.write(c, 'Mercekle güneş ışığını asla', 300, 390, E.seg(t, ss + 1.2, ss + 2.6), { size: 42 });
        P.write(c, 'bir noktada toplama!', 300, 445, E.seg(t, ss + 2.4, ss + 3.6), { size: 42 });
        P.write(c, 'Yangın çıkabilir, gözler zarar görebilir.', 300, 500, E.seg(t, ss + 3.4, ss + 4.8), { size: 34, color: RED });
        // şema: güneş ışınları → mercek → sıcak nokta (üstü çizili)
        P.sun(c, 1110, 340, 44, t, { nrays: 12, glow: false, cells: false });
        const ln = F.lens(1330, 340, 80, 30, 150, true); F.drawLens(c, ln, { seed: 1213, w: 2.4 });
        [-50, -25, 0, 25, 50].forEach((h, i) => { line(c, [1170, 340 + h], [1330, 340 + h], { w: 2.2, color: F.AMB, dry: false, seed: 1220 + i }); line(c, [1330, 340 + h], [1500, 340], { w: 2.2, color: F.AMB, dry: false, seed: 1230 + i }); });
        F.glow(c, 1500, 340, 50, 1, '230,110,40');
        P.cross(c, 1480, 340, 70, E.se(t, ss + 2.0, ss + 2.8), { w: 11, color: RED });
      });
      // orman
      const kf = E.se(t, sf + 0.2, sf + 1.0);
      if (kf > 0) E.layer(ctx, kf, c => {
        const g = [[-20, GROUND], [1940, GROUND - 4], [1940, 1100], [-20, 1100]];
        P.fillPts(c, g, '#D9C99A', 0.9); wash(c, g, '#9A8A4A', 0.3, 1241, { bleed: 3 });
        line(c, [-20, GROUND], [1940, GROUND - 4], { w: 3, seed: 1242 });
        tree(c, 180, 1.1, 1250); tree(c, 360, 0.9, 1260); tree(c, 1260, 1.0, 1270); tree(c, 1440, 1.15, 1280);
        for (let i = 0; i < 40; i++) { const x = 60 + i * 46; line(c, [x, GROUND + 2], [x + 4 - (i % 3) * 3, GROUND - 16 - (i % 4) * 4], { w: 1.6, color: '#8A7A3A', dry: false, seed: 1300 + i }); }
        bottle(c, 820, GROUND - 60);
        // cam kırığı
        const sh = [[560, GROUND - 6], [600, GROUND - 40], [640, GROUND - 22], [620, GROUND - 4]]; P.fillPts(c, sh, '#CFE1EA', 0.9); stroke(c, sh.concat([sh[0]]), { w: 2.4, closed: true, seed: 1310 });
        INK.label(c, 'cam kırığı', 600, GROUND + 50, { size: 32, align: 'center', weight: 700 });
        INK.label(c, 'su dolu pet şişe', 830, GROUND + 50, { size: 32, align: 'center', weight: 700 });
        // güneş ışınları şişede toplanır (şematik)
        const kr = E.se(t, sf + 1.6, sf + 3.2);
        [-50, -25, 0, 25, 50].forEach((h, i) => {
          F.ray(c, [800 + h, 560], [800 + h, GROUND - 86], kr, { w: 2.4, heads: [0.5], head: 11, seed: 1320 + i });
          if (kr >= 1) F.ray(c, [800 + h, GROUND - 34], [800, GROUND - 2], E.se(t, sf + 3.2, sf + 3.8), { w: 2.4, heads: [], seed: 1330 + i });
        });
        const kh = E.se(t, sf + 3.8, sf + 4.6);
        if (kh > 0) { F.glow(c, 800, GROUND, 60, kh, '230,110,40');
          for (let i = 0; i < 3; i++) { const pts = []; for (let j = 0; j <= 20; j++) { const u = j / 20; pts.push([800 + Math.sin(u * 8 + t * 4 + i) * 8 + i * 10 - 10, GROUND - 10 - u * 70 * kh]); } stroke(c, pts, { w: 2.4, color: '#7A6F66', alpha: 0.6, seed: 1340 + i }); }
          E.inkText(c, 'yangın tehlikesi!', 960, 596, t, sf + 4.2, E.s('protect') + 0.4, { size: 44, color: RED }); }
      });
      // koruyalım: çöp kutusu
      const kp = E.se(t, sp + 0.2, sp + 0.9);
      if (kp > 0) E.layer(ctx, kp, c => {
        const bin = [[1560, 700], [1660, 700], [1648, GROUND], [1572, GROUND], [1560, 700]];
        P.fillPts(c, bin, PAL.life, 0.55); stroke(c, bin, { w: 3, closed: true, seed: 1350 }); line(c, [1548, 694], [1672, 694], { w: 5, seed: 1351 });
        P.check(c, 1610, 640, 60, E.se(t, sp + 1.0, sp + 1.6), { w: 8, color: PAL.life });
        P.write(c, 'Çöpünü doğada bırakma!', 1380, 582, E.seg(t, sp + 1.2, sp + 2.4), { size: 40, align: 'right', color: PAL.life });
      });
      DAMLA.draw(ctx, { x: 1790, y: GROUND + 2, s: 0.95, view: 'q3', flip: true, expr: t < sp ? 'determined' : 'happy', look: [-0.9, 0], blink: E.blink(t, 31), squash: E.breath(t), t, talk: E.talk(t), seed: 5,
        arms: t < sf ? [[-1, 0.35], [1, 2.6]] : [[-1, 0.35], [1, 1.6]] });
    }
  });
})();
