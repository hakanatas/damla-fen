// SAHNE 3 — Veri toplama: gelme açısı 0°, 30°, 60° (su) ve 30°, 60° (cam); tabloya kayıt; normale yaklaşma; dik gelen ışın
// Her karedeki kırılan ışın ve yazılan dereceler, o anki gelme açısından V.refract ile hesaplanır.
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F712, V = F.V, DEG = F.DEG;
  const WS = 600, O = [560, WS], RI = 330, RR = 270;
  const ROWS = [['su', 0], ['su', 30], ['su', 60], ['cam', 30], ['cam', 60]];
  const COLX = [1150, 1420, 1690], ROW0 = 330, RH = 72;

  function state(t) { // gelme açısı (derece) ve ortam
    const sd = E.s('data'), stw = E.s('toward'), sp = E.s('perp');
    let th = 30, med = 'su';
    const keys = [[sd, 0], [sd + 2.5, 30], [sd + 5, 60], [sd + 7.5, 30], [sd + 10, 60]];
    if (t >= sd) { th = 30; for (let i = 0; i < keys.length; i++) { if (t >= keys[i][0]) { const prev = i ? keys[i - 1][1] : 30; th = E.lerp(prev, keys[i][1], E.se(t, keys[i][0], keys[i][0] + 0.9)); } } }
    if (t >= sd + 7.5) med = 'cam';
    if (t >= sp) th = E.lerp(60, 0, E.se(t, sp + 0.2, sp + 1.4));
    const camK = E.se(t, sd + 7.2, sd + 7.9);
    return { th, med, camK };
  }

  E.scene({
    name: 'Veri topla', concept: 'Gelme ve kırılma açısı verileri (su, cam)', from: 'measure', to: 'perp', trFrom: [560, 600],
    draw(ctx, t) {
      const sm = E.s('measure'), sd = E.s('data'), stw = E.s('toward'), sg = E.s('glass'), sp = E.s('perp');
      const st = state(t);
      const n2 = E.lerp(F.N.su, F.N.cam, st.camK);
      // ortam (su → cam blok geçişi)
      E.layer(ctx, 1 - st.camK, c => F.medium(c, 140, 980, WS, 880, 'su', { walls: true }));
      E.layer(ctx, st.camK, c => F.medium(c, 180, 940, WS, 860, 'cam'));
      INK.label(ctx, 'hava', 170, WS - 26, { size: 38, weight: 700, alpha: 0.8 });
      E.layer(ctx, 1 - st.camK, c => INK.label(c, 'su', 170, WS + 60, { size: 38, weight: 700, color: PAL.water }));
      E.layer(ctx, st.camK, c => INK.label(c, 'cam', 210, WS + 60, { size: 38, weight: 700, color: '#4E6A78' }));
      // normal
      F.dline(ctx, [O[0], O[1] - 360], [O[0], O[1] + 270], { w: 2.6, color: PAL.water });
      // ışınlar
      const th = st.th * DEG, dirIn = [Math.sin(th), Math.cos(th)];       // aşağı doğru ilerleyen gelen ışın
      const S = [O[0] - RI * dirIn[0], O[1] - RI * dirIn[1]];
      const RF = V.refract(dirIn, [0, -1], F.N.hava, n2);
      const END = V.add(O, V.mul(RF, RR));
      F.lightbox(ctx, S[0], S[1], Math.atan2(dirIn[1], dirIn[0]), 0.7);
      // "düz gitseydi" ve su-cam karşılaştırması
      const kStr = E.se(t, stw + 0.6, stw + 1.4) * (1 - E.se(t, sp, sp + 0.5));
      if (kStr > 0) { F.dline(ctx, O, V.add(O, V.mul(dirIn, RR * kStr)), { color: PAL.ink, alpha: 0.45, w: 2.2 }); }
      const kW = E.se(t, sg + 0.5, sg + 1.3) * (1 - E.se(t, sp, sp + 0.5));
      if (kW > 0) { const RW = V.refract(dirIn, [0, -1], F.N.hava, F.N.su); F.ray(ctx, O, V.add(O, V.mul(RW, RR)), 1, { color: PAL.water, alpha: 0.7 * kW, w: 2.6, heads: [0.8], seed: 309 });
        E.inkText(ctx, 'suda', O[0] + RW[0] * RR + 10, O[1] + RW[1] * RR + 40, t, sg + 1.0, sp, { size: 32, color: PAL.water }); }
      F.ray(ctx, S, O, 1, { seed: 301 });
      F.ray(ctx, O, END, 1, { seed: 302 });
      // açı yayları + canlı değerler
      const thI = V.angle([0, -1], V.mul(dirIn, -1)) / DEG, thR = V.angle([0, 1], RF) / DEG;
      if (thI > 1.5) { F.angleArc(ctx, O, [0, -1], V.mul(dirIn, -1), 120, { fill: PAL.water, fillA: 0.18, color: PAL.water, seed: 311 });
        F.angleArc(ctx, O, [0, 1], RF, 120, { fill: PAL.light, fillA: 0.25, color: '#8A4A10', seed: 312 }); }
      INK.label(ctx, 'gelme: ' + Math.round(thI) + '°', 610, 330, { size: 40, weight: 700, color: PAL.water, rot: 0 });
      INK.label(ctx, 'kırılma: ' + Math.round(thR) + '°', 200, 840, { size: 40, weight: 700, color: '#8A4A10', rot: 0 });
      if (kStr > 0) E.inkText(ctx, 'normale yaklaştı', 760, 660, t, stw + 1.2, sp, { size: 32 });
      // tablo
      F.card(ctx, 1030, 175, 820, 590, { seed: 321 });
      ctx.save(); ctx.font = '700 38px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink;
      ['ortam', 'gelme açısı', 'kırılma açısı'].forEach((h, i) => ctx.fillText(h, COLX[i], 250)); ctx.restore();
      line(ctx, [1060, 272], [1820, 268], { w: 2.4, dry: false, seed: 322 });
      line(ctx, [1285, 210], [1285, 740], { w: 1.6, dry: false, alpha: 0.5, seed: 323 }); line(ctx, [1555, 210], [1555, 740], { w: 1.6, dry: false, alpha: 0.5, seed: 324 });
      const fillAt = [sd + 1.6, sd + 4.1, sd + 6.6, sd + 9.1, sd + 11.6];
      ROWS.forEach(([m, a], i) => {
        const y = ROW0 + i * RH + 20, k = E.seg(t, fillAt[i], fillAt[i] + 0.8); if (k <= 0) return;
        const r = Math.round(F.refrAngle(a, F.N.hava, F.N[m]));
        P.write(ctx, m, COLX[0], y, k, { size: 40, align: 'center', color: m === 'cam' ? '#4E6A78' : PAL.water });
        P.write(ctx, a + '°', COLX[1], y, k, { size: 40, align: 'center' });
        P.write(ctx, r + '°', COLX[2], y, k, { size: 40, align: 'center', color: '#8A4A10' });
      });
      // yorum satırları
      const kt = E.se(t, stw + 0.3, stw + 1.0);
      if (kt > 0) P.write(ctx, 'kırılma açısı < gelme açısı', 1440, 710, E.seg(t, stw + 0.3, stw + 1.6), { size: 36, align: 'center', color: '#8A4A10' });
      const kc = E.se(t, sg + 0.3, sg + 1.0) * (1 - E.se(t, sp, sp + 0.4));
      if (kc > 0) { ctx.save(); ctx.globalAlpha *= kc;
        [[1, 3], [2, 4]].forEach(([a, b], j) => { const ya = ROW0 + a * RH + 6, yb = ROW0 + b * RH + 6; stroke(ctx, circlePts(COLX[2], ya, 58, 30, 30), { w: 2.6, closed: true, color: PAL.water, seed: 330 + j }); stroke(ctx, circlePts(COLX[2], yb, 58, 30, 30), { w: 2.6, closed: true, color: '#4E6A78', seed: 332 + j }); });
        ctx.restore(); }
      const kp = E.se(t, sp + 1.2, sp + 1.8);
      if (kp > 0) { ctx.save(); ctx.globalAlpha *= kp; stroke(ctx, circlePts(1440, ROW0 + 6, 390, 34, 50), { w: 3, closed: true, color: F.AMB, seed: 340 }); ctx.restore();
        E.inkText(ctx, 'dik gelen ışın kırılmaz', O[0] + 30, 460, t, sp + 1.6, 1e9, { size: 40, color: '#8A4A10' }); }
      DAMLA.draw(ctx, { x: 1790, y: 905, s: 0.62, view: 'q3', flip: true, expr: t > stw ? 'happy' : 'curious', look: [-0.8, -0.3], blink: E.blink(t, 13), squash: E.breath(t), t, talk: E.talk(t), seed: 5, prop: 'notebook', arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.1]] });
    }
  });
})();
