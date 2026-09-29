// SAHNE 6 — Büyüme-gelişme faktörleri; ipek böceği verisi toplama, kaydetme, yorumlama; hayvan sevgisi ve koruma
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F07;
  const DAYS = [1, 7, 14, 21, 28], LEN = [0.3, 1, 2.5, 4.5, 7];
  const drop = (c, x, y, s) => F.shape(c, P.arc(x, y + 6 * s, 28 * s, -0.25, Math.PI + 0.25, 20).concat([[x, y - 44 * s]]), { fill: '#D6E4EC', col: PAL.water, a: 0.6, seed: 7900 });
  const thermo = (c, x, y, s) => { const b = [[x - 9 * s, y - 50 * s], [x + 9 * s, y - 50 * s], [x + 9 * s, y + 10 * s], [x - 9 * s, y + 10 * s]]; stroke(c, b.concat([b[0]]), { w: 2.4, closed: true }); P.fillPts(c, circlePts(x, y + 22 * s, 16 * s, 16 * s, 20), F.WARM, 0.85); stroke(c, circlePts(x, y + 22 * s, 16 * s, 16 * s, 20), { w: 2.4, closed: true }); P.fillPts(c, [[x - 4 * s, y - 20 * s], [x + 4 * s, y - 20 * s], [x + 4 * s, y + 10 * s], [x - 4 * s, y + 10 * s]], F.WARM, 0.85); };
  E.scene({
    name: 'Veri ve koruma', concept: 'Büyüme faktörleri; ipek böceği verisi; hayvanları koruma', from: 'factors', to: 'protect', trFrom: [960, 540],
    draw(ctx, t) {
      const sfa = E.s('factors'), sd = E.s('data'), si = E.s('interp'), sp = E.s('protect');
      // 1) faktörler
      const a1 = 1 - E.se(t, sd - 0.3, sd + 0.4);
      if (a1 > 0) E.layer(ctx, a1, c => {
        F.cat(c, 960, 700, 1.1, { base: '#C98F5A', stripe: '#8A5A30', seed: 5280 }, t);
        const IC = [['yeterli besin', (cc, x, y) => { F.leaf(cc, x - 50, y + 10, 100, -0.3, 95); F.caterpillar(cc, x + 30, y + 20, 0.8, t); }, [420, 330]],
          ['su', (cc, x, y) => drop(cc, x, y, 1.4), [1500, 330]],
          ['uygun sıcaklık', (cc, x, y) => thermo(cc, x, y, 1.3), [420, 700]],
          ['güvenli ortam', (cc, x, y) => F.nest(cc, x, y + 30, 0.9, 3), [1500, 700]]];
        IC.forEach(([n, fn, [x, y]], i) => { const at = sfa + 1.0 + i * 1.2, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return; E.layer(c, k, cc => { fn(cc, x, y); INK.label(cc, n, x, y + 110, { size: 42, weight: 700, align: 'center' }); }); P.arrow(c, [x + (x < 960 ? 140 : -140), y], [960 + (x < 960 ? -110 : 110), y > 500 ? 620 : 520], E.se(t, at + 0.3, at + 0.9), { w: 2.4, head: 12 }); });
      });
      // 2) ipek böceği verisi: grafik + tablo
      const a2 = E.se(t, sd - 0.1, sd + 0.6) * (1 - E.se(t, sp - 0.3, sp + 0.4));
      if (a2 > 0) E.layer(ctx, a2, c => {
        const ox = 260, oy = 800, sx = 26, sy = 62; // 1 gün = 26 px, 1 cm = 62 px
        P.write(c, 'İpek böceği tırtılının boyu (örnek veri)', 260, 240, E.seg(t, sd + 0.3, sd + 1.5), { size: 44 });
        line(c, [ox, oy], [ox + 30 * sx, oy], { w: 2.8, seed: 7910 }); line(c, [ox, oy], [ox, oy - 7.6 * sy], { w: 2.8, seed: 7911 });
        for (let cm = 0; cm <= 7; cm++) { line(c, [ox - 8, oy - cm * sy], [ox + 8, oy - cm * sy], { w: 1.4, dry: false }); INK.label(c, String(cm), ox - 22, oy - cm * sy + 9, { size: 26, align: 'right', alpha: 0.75 }); }
        DAYS.forEach(d => { line(c, [ox + d * sx, oy - 8], [ox + d * sx, oy + 8], { w: 1.4, dry: false }); INK.label(c, String(d), ox + d * sx, oy + 40, { size: 26, align: 'center', alpha: 0.75 }); });
        INK.label(c, 'gün', ox + 30 * sx + 10, oy + 40, { size: 28, alpha: 0.75 }); INK.label(c, 'cm', ox - 10, oy - 7.6 * sy - 16, { size: 28, alpha: 0.75, align: 'center' });
        const at = DAYS.map((d, i) => sd + 1.6 + i * 1.4);
        const pts = DAYS.map((d, i) => [ox + d * sx, oy - LEN[i] * sy]);
        pts.forEach((p, i) => { const k = E.se(t, at[i], at[i] + 0.4, 'out'); if (k <= 0) return; if (i > 0) P.drawOn(c, [pts[i - 1], p], E.se(t, at[i] - 0.4, at[i]), { w: 3, color: F.LIFE_D }); INK.inkDot(c, p[0], p[1], 7 * k, { color: '78,102,38' }); });
        // tablo
        const rows = [['Gün', 'Boy']].concat(DAYS.map((d, i) => [String(d), String(LEN[i]).replace('.', ',') + ' cm']));
        const ka = 1 - E.se(t, si + 2.8, si + 3.6);
        if (ka > 0) E.layer(c, ka, cc => F.table(cc, t, { x: 1260, y: 300, cols: [200, 260], rh: 78, rows, at: [sd + 1.0].concat(at), size: 40, colColor: [PAL.ink, F.LIFE_D] }));
        // tırtıllar ve dut yaprağı
        const kc = E.se(t, sd + 2.0, sd + 3.0);
        if (kc > 0 && t < si + 0.6) E.layer(c, kc * (1 - E.se(t, si, si + 0.5)), cc => { F.leaf(cc, 600, 400, 170, -0.2, 96, { wr: 0.55 }); F.caterpillar(cc, 700, 405, 0.7, t, { fill: '#F4F0E4', col: '#B8B09A', n: 7 }); INK.label(cc, 'dut yaprağı', 690, 470, { size: 30, align: 'center', alpha: 0.7 }); });
        // yorum
        const ki = E.se(t, si + 0.3, si + 1.2);
        if (ki > 0) { stroke(c, [[pts[0][0] + 12, pts[0][1] - 4], [pts[4][0] - 10, pts[4][1] + 10]], { w: 2, color: PAL.light, alpha: ki }); P.write(c, '≈ 23 kat!', 330, 420, ki, { size: 60, color: '#A06A10' }); INK.label(c, '0,3 cm → 7 cm', 330, 480, { size: 34, alpha: 0.8 * ki }); }
        const kk = E.se(t, si + 3.4, si + 4.4);
        if (kk > 0) E.layer(c, kk, cc => {
          F.caterpillar(cc, 1320, 420, 1.2, t, { fill: '#F4F0E4', col: '#B8B09A', n: 8 }); INK.label(cc, 'tırtıl', 1250, 480, { size: 36, weight: 700, align: 'center' });
          P.arrow(cc, [1480, 520], [1480, 590], 1, { w: 3, head: 12 });
          F.cocoon(cc, 1400, 660, 1.4); INK.label(cc, 'koza', 1250, 670, { size: 36, weight: 700, align: 'center' });
          const kp = E.se(t, si + 5.4, si + 6.4); if (kp > 0) { cc.save(); cc.globalAlpha *= kp; P.arrow(cc, [1480, 720], [1560, 780], 1, { w: 3, head: 12 }); F.pupa(cc, 1640, 800, 0.9); INK.label(cc, 'pupa', 1700, 820, { size: 36, weight: 700 }); cc.restore(); }
        });
      });
      // 3) koruma
      const a3 = E.se(t, sp - 0.1, sp + 0.6);
      if (a3 > 0) E.layer(ctx, a3, c => {
        const tr = [[700, 820], [720, 520], [760, 520], [790, 820]]; F.shape(c, tr, { fill: '#D9C29C', col: '#6E5234', a: 0.6, seed: 7920 });
        const crown = INK.wobble(circlePts(745, 420, 260, 170, 50), 8, 7921); F.shape(c, crown, { fill: '#DDE6C2', col: F.LIFE, a: 0.5, seed: 7922 });
        F.nest(c, 820, 470, 1.1, 3);
        const kh = E.se(t, sp + 1.2, sp + 2.0, 'back');
        if (kh > 0) { c.save(); c.translate(1080, 330); c.scale(kh, kh); const hp = []; for (let i = 0; i <= 40; i++) { const a = i / 40 * 6.283; hp.push([16 * Math.pow(Math.sin(a), 3) * 3.2, -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) * 3.2]); } F.shape(c, hp, { fill: '#E9C6CF', col: '#B0607A', a: 0.6, seed: 7923 }); c.restore(); }
        P.write(c, 'Hayvanları sevelim, koruyalım.', 1300, 560, E.seg(t, sp + 1.8, sp + 3.0), { size: 50, align: 'center', color: F.LIFE_D });
        P.write(c, 'Yuvalara ve yumurtalara dokunmayalım.', 1300, 640, E.seg(t, sp + 3.2, sp + 4.4), { size: 42, align: 'center' });
        P.write(c, 'Yaşam alanlarını koruyalım.', 1300, 710, E.seg(t, sp + 4.4, sp + 5.4), { size: 42, align: 'center' });
        DAMLA.draw(c, { x: 330, y: 880, s: 1.1, view: 'q3', expr: 'happy', look: [0.8, -0.4], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 3, arms: [[-1, 0.4], [1, 1.2]] });
      });
    }
  });
})();
