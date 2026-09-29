// SAHNE 6 — Deney (FB.6.2.2): hipotez → düzenek ve değişkenler → 3 deneme, ölçüm, tablo → analiz → hareketli cisimde denge
(function () {
  const { PAL, line, stroke, dashed, circlePts } = INK;
  const TY = 470;
  const ROWS = [
    ['Deneme', 'Sol', 'Sağ', 'Bileşke', 'Araba'],
    ['1', '3 N', '3 N', '0', 'duruyor'],
    ['2', '2 N', '5 N', '3 N sağa', 'sağa gitti'],
    ['3', '4 N', '1 N', '3 N sola', 'sola gitti']
  ];
  function rigCar(ctx, cx, L, R, t) {
    F63.car(ctx, cx, TY, 1, t, cx - 960);
    const y = TY - 64;
    const one = (F, dir, i) => {
      const ex = cx + dir * 92, hx = ex + dir * 60;
      F63.rope(ctx, [ex, y], [hx, y], 3601 + i);
      const re = F63.hdyn(ctx, hx, y, dir, F, { s: 0.72 });
      F63.tag(ctx, Math.round(F) + ' N', re + dir * 62, y + 14, { size: 40, color: F63.BR, seed: 3605 + i });
    };
    one(L, -1, 0); one(R, 1, 1);
  }
  E.scene({
    name: 'Deney', concept: 'Dengelenmiş/dengelenmemiş kuvvet deneyi', from: 'hyp', to: 'analyze', trFrom: [960, 300],
    draw(ctx, t) {
      const sh = E.s('hyp'), su = E.s('setup'), s1 = E.s('trial1'), s2 = E.s('trial2'), s3 = E.s('trial3'), sa = E.s('analyze');
      // hypothesis card
      const hk = Math.min(E.se(t, sh + 0.3, sh + 1.0, 'out'), 1 - E.se(t, su - 0.2, su + 0.5));
      if (hk > 0) E.layer(ctx, hk, c => {
        F63.card(c, 360, 230, 1560, 620, { seed: 3610 });
        P.write(c, 'Hipotezim', 440, 330, E.seg(t, sh + 0.5, sh + 1.4), { size: 66, color: '#8A4A10' });
        P.write(c, 'Bileşke = 0  →  duran araba durur.', 440, 450, E.seg(t, sh + 1.4, sh + 3.0), { size: 54 });
        P.write(c, 'Bileşke ≠ 0  →  araba harekete geçer.', 440, 550, E.seg(t, sh + 3.0, sh + 4.6), { size: 54 });
        DAMLA.draw(c, { x: 1660, y: 900, s: 1.2, view: 'q3', flip: true, expr: 'thinking', look: [-0.6, -0.4], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.3], [1, [30, -86]]] });
      });
      const rigA = E.se(t, su + 0.2, su + 1.0);
      if (rigA <= 0) return;
      // forces & car position per trial
      let L = 0, R = 0, cx = 960;
      if (t < s2) { const k = E.se(t, s1 + 0.4, s1 + 1.6); L = 3 * k; R = 3 * k; }
      else if (t < s3) { const k = E.se(t, s2 + 0.3, s2 + 1.5); L = 2 * k; R = 5 * k; cx = 960 + 250 * E.se(t, s2 + 2.0, s2 + 5.4, 'in'); }
      else { const k = E.se(t, s3 + 0.3, s3 + 1.5); L = 4 * k; R = 1 * k; cx = 960 - 250 * E.se(t, s3 + 2.0, s3 + 5.4, 'in'); }
      const dip = t > s3 - 0.35 && t < s3 + 0.35 ? E.clamp(Math.abs(t - s3) / 0.35) : 1;
      E.layer(ctx, rigA, c => {
        line(c, [120, TY], [1800, TY + 2], { w: 3.4, seed: 3620, taper: 0.02 });
        P.fillPts(c, [[120, TY], [1800, TY + 2], [1800, TY + 26], [120, TY + 24]], '#C9A87A', 0.6);
        E.layer(c, dip, d => rigCar(d, cx, L, R, t));
        // motion hint
        const mv = cx - 960;
        if (Math.abs(mv) > 30) { const dir = Math.sign(mv); c.save(); c.globalAlpha = E.clamp(Math.abs(mv) / 80); P.arrow(c, [960 - dir * 20, TY + 60], [cx + dir * 40, TY + 60], 1, { w: 3, head: 14, color: PAL.water }); c.restore(); }
      });
      // setup labels + variables (before the table)
      const vk = Math.min(E.se(t, su + 0.8, su + 1.6), 1 - E.se(t, s1 - 0.3, s1 + 0.3));
      if (vk > 0) E.layer(ctx, vk, c => {
        INK.leader(c, [960, 250], [960, 380], { w: 2 }); INK.label(c, 'tekerlekli araba', 960, 235, { size: 40, weight: 700, align: 'center' });
        INK.leader(c, [680, 250], [840, 400], { w: 2, bend: 0.1 }); INK.label(c, 'ip', 660, 240, { size: 40, weight: 700, align: 'center' });
        INK.leader(c, [1400, 250], [1260, 395], { w: 2, bend: -0.1 }); INK.label(c, 'dinamometre', 1420, 240, { size: 40, weight: 700, align: 'center' });
        const chips = [['değiştirilen', 'kuvvetler', F63.BR], ['gözlenen', 'arabanın hareketi', PAL.water], ['sabit tutulan', 'araba ve masa', PAL.life]];
        chips.forEach(([a, b, col], i) => {
          const k = E.se(t, su + 2.4 + i * 0.9, su + 3.0 + i * 0.9, 'out'); if (k <= 0) return;
          const x = 420 + i * 540;
          c.save(); c.globalAlpha *= k;
          F63.card(c, x - 240, 600, x + 240, 780, { seed: 3630 + i, color: col });
          INK.label(c, a, x, 660, { size: 38, align: 'center', color: col, weight: 700 });
          INK.label(c, b, x, 730, { size: 44, align: 'center', weight: 700 });
          c.restore();
        });
      });
      // data table
      if (t > s1) {
        const kf = i => i === 0 ? E.se(t, s1 + 0.2, s1 + 1.0) : E.se(t, [s1, s2, s3][i - 1] + 1.8 + (i === 1 ? 0 : 2.0), [s1, s2, s3][i - 1] + 3.4 + (i === 1 ? 0 : 2.0));
        F63.table(ctx, 405, 590, [190, 160, 160, 290, 310], ROWS, 66, kf, { size: 40 });
      }
      // analysis stamp
      const ak = E.se(t, sa + 0.3, sa + 1.0, 'out');
      if (ak > 0) {
        ctx.save(); ctx.translate(960, 215); ctx.rotate(-0.03); ctx.scale(P.pop(ak), P.pop(ak));
        F63.tag(ctx, 'Hipotez desteklendi ✓', 0, 20, { size: 54, color: PAL.life, fill: '#EEF2E0', seed: 3640 });
        ctx.restore();
        const gk = E.se(t, sa + 2.2, sa + 3.0);
        if (gk > 0) { ctx.save(); ctx.globalAlpha = gk; INK.label(ctx, 'Grup A ✓   Grup B ✓   Grup C ✓', 1560, 300, { size: 36, weight: 700, align: 'center', color: PAL.life }); ctx.restore(); }
      }
    }
  });
  // moving object with balanced forces keeps constant speed
  E.scene({
    name: 'Hareket ve denge', concept: 'Dengelenmiş kuvvet: sabit süratle devam', from: 'moving', to: 'moving', trFrom: [960, 540],
    draw(ctx, t) {
      const sm = E.s('moving');
      const RY = 620;
      ctx.save(); ctx.globalAlpha = 0.1; ctx.fillStyle = PAL.water; ctx.fillRect(0, 0, E.W, RY); ctx.restore();
      P.fillPts(ctx, [[-10, RY], [1930, RY], [1930, 760], [-10, 760]], '#8C8579', 0.35);
      line(ctx, [0, RY], [1920, RY + 2], { w: 3.4, seed: 3650, taper: 0.01 });
      for (let i = 0; i < 12; i++) line(ctx, [i * 180 + 20, 700], [i * 180 + 110, 700], { w: 5, color: '#F6F0E0', dry: false, taper: 0 });
      const v = 150, x = 260 + v * (t - sm);
      // equal distances in equal times (ghosts every 1.5 s)
      for (let g = 1; g <= 5; g++) { const gt = sm + g * 1.5; if (t > gt + 0.05) { ctx.save(); ctx.globalAlpha = 0.18; F63.car(ctx, 260 + v * (gt - sm), RY, 1, t, 0); ctx.restore(); INK.label(ctx, '|', 260 + v * (gt - sm), RY + 40, { size: 30, align: 'center', alpha: 0.5 }); } }
      F63.car(ctx, x, RY, 1, t, x);
      const k = E.se(t, sm + 0.5, sm + 1.5);
      F63.farrow(ctx, x + 100, RY - 60, 3, 1, k, { label: 'iten kuvvet 3 N', size: 34, seed: 3660 });
      F63.farrow(ctx, x - 100, RY - 60, 3, -1, k, { label: 'sürtünme 3 N', size: 34, seed: 3661, color: '#A0662A' });
      E.inkText(ctx, 'bileşke = 0  →  sabit süratle yoluna devam eder', 960, 300, t, sm + 2.0, 1e9, { size: 54, align: 'center' });
      E.inkText(ctx, 'eşit zamanlarda eşit yollar', 960, 860, t, sm + 3.4, 1e9, { size: 44, align: 'center', color: PAL.water });
    }
  });
})();
