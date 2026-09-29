// SAHNE 2 — Sera etkisi: Güneş ışığı girer, yeryüzü kızılötesi ışınlarla ısı yayar, sera gazları bir kısmını tutar;
// doğal sera etkisi gereklidir; gazlar artınca küresel ısınma; yanılgı: "nedeni ozon deliği" → YANLIŞ
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const U = U7;
  const CX = 960, CY = 4800, R0 = 4000, R1 = 4330; // yeryüzü yayı ve atmosfer üst sınırı
  const gy = x => CY - Math.sqrt(R0 * R0 - (x - CX) * (x - CX));
  const ay = x => CY - Math.sqrt(R1 * R1 - (x - CX) * (x - CX));
  function wavy(a, b, amp = 9, n = 40) { const pts = []; const L = Math.hypot(b[0] - a[0], b[1] - a[1]), nx = -(b[1] - a[1]) / L, ny = (b[0] - a[0]) / L; for (let i = 0; i <= n; i++) { const u = i / n, w = Math.sin(u * L / 22) * amp; pts.push([a[0] + (b[0] - a[0]) * u + nx * w, a[1] + (b[1] - a[1]) * u + ny * w]); } return pts; }
  function irRay(ctx, x0, k, bounce, t, seed) { // yerden yukarı dalgalı ok; bounce: atmosferde geri döner
    if (k <= 0) return;
    const g0 = [x0, gy(x0) - 6];
    if (!bounce) { const top = [x0 + 120, 170]; const p = wavy(g0, top); P.drawOn(ctx, p, k, { w: 3.6, color: U.IR }); if (k >= 1) INK.arrowHead(ctx, p[p.length - 3], p[p.length - 1], 16, { w: 3.6, color: U.IR }); return; }
    const mid = [x0 + 90, ay(x0 + 90) + 150]; const back = [x0 + 180, gy(x0 + 180) - 8];
    const p1 = wavy(g0, mid), p2 = wavy(mid, back); const k1 = E.clamp(k * 2), k2 = E.clamp(k * 2 - 1);
    P.drawOn(ctx, p1, k1, { w: 3.6, color: U.IR }); if (k2 > 0) { P.drawOn(ctx, p2, k2, { w: 3.6, color: U.IR }); if (k2 >= 1) INK.arrowHead(ctx, p2[p2.length - 3], p2[p2.length - 1], 16, { w: 3.6, color: U.IR }); }
  }
  E.scene({
    name: 'Sera etkisi', concept: 'Sera gazları kızılötesi ısıyı tutar', from: 'sun', to: 'myth', trFrom: [330, 300],
    draw(ctx, t) {
      const sS = E.s('sun'), sT = E.s('trap'), sN = E.s('natural'), sM = E.s('more'), sY = E.s('myth');
      // uzay tonu, atmosfer, yeryüzü
      ctx.fillStyle = 'rgba(40,44,70,0.10)'; ctx.fillRect(0, 0, E.W, E.H);
      const atm = circlePts(CX, CY, R1, R1, 240), grd = circlePts(CX, CY, R0, R0, 240);
      P.fillPts(ctx, atm, '#E7EEF0', 0.8); wash(ctx, atm, PAL.water, 0.14 + 0.1 * E.se(t, sM, sM + 3), 3030, { bleed: 3, blooms: 2 });
      if (t > sM) wash(ctx, atm, '#C07F1E', 0.16 * E.se(t, sM, sM + 3), 3031, { bleed: 3, blooms: 1 });
      stroke(ctx, circlePts(CX, CY, R1, R1, 240), { w: 2, closed: true, alpha: 0.4, dry: false });
      const warm = E.se(t, sS + 1.5, sS + 4) * 0.6 + 0.4 * E.se(t, sM + 1, sM + 4);
      P.fillPts(ctx, grd, '#E3D3B3'); wash(ctx, grd, PAL.life, 0.35, 3032, { bleed: 3, blooms: 2 });
      if (warm > 0) wash(ctx, grd, U.HEAT, 0.25 * warm, 3033, { bleed: 3, blooms: 1 });
      stroke(ctx, grd, { w: 3.4, closed: true, seed: 3034 });
      U.txt(ctx, 'atmosfer', 60, ay(200) + 50, { size: 36, align: 'left', color: PAL.water });
      U.txt(ctx, 'yeryüzü', 1500, gy(1500) + 50, { size: 36, align: 'right' });
      P.sun(ctx, 300, 300, 80, t, { cells: false, nrays: 18 });
      // Güneş ışığı (kehribar) içeri girer
      [[640, 0], [820, 0.25], [1000, 0.5]].forEach(([x, d], i) => {
        const k = E.seg(t, sS + 0.4 + d, sS + 1.6 + d); if (k <= 0) return;
        P.arrow(ctx, [380 + i * 20, 360 + i * 10], [x, gy(x) - 10], k, { w: 5, color: '#E3A03A', head: 20 });
      });
      P.write(ctx, 'Güneş ışığı', 560, 470, E.seg(t, sS + 1.2, sS + 2.2), { size: 40, color: '#C07F1E' });
      // kızılötesi ışınlar (yerden)
      const nMore = E.se(t, sM + 0.5, sM + 1.5);
      irRay(ctx, 1080, E.seg(t, sS + 4.2, sS + 5.6), false, t, 1);
      irRay(ctx, 1240, E.seg(t, sS + 4.6, sS + 6.0), t > sT + 1.8, t, 2);
      irRay(ctx, 1400, E.seg(t, sS + 5.0, sS + 6.4), false, t, 3);
      if (t > sT + 1.8) irRay(ctx, 1500, E.seg(t, sT + 2.2, sT + 3.6), true, t, 4);
      if (t > sM + 0.5) { irRay(ctx, 1150, E.seg(t, sM + 0.8, sM + 2.2), true, t, 5); irRay(ctx, 1330, E.seg(t, sM + 1.2, sM + 2.6), true, t, 6); }
      P.write(ctx, 'kızılötesi ışınlar (ısı)', 1200, 300, E.seg(t, sS + 5.2, sS + 6.2), { size: 38, color: U.IR, align: 'center' });
      // sera gazları
      const gases = [['CO2', 900, 560], ['CH4', 1180, 520], ['H2O', 1460, 560], ['CO2', 1700, 610], ['CO2', 1040, 470], ['CH4', 1320, 430], ['CO2', 1600, 470], ['CO2', 760, 620]];
      gases.forEach(([f, x, y], i) => {
        const at = i < 3 ? sT + 0.3 + i * 0.5 : sM + 0.2 + (i - 3) * 0.35; const k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
        ctx.save(); ctx.globalAlpha *= k; U.gas(ctx, f, x + Math.sin(t * 0.8 + i) * 6, y + Math.cos(t * 0.7 + i) * 5, 40, f === 'H2O' ? U.H2OC : U.CO2C); ctx.restore();
      });
      E.inkText(ctx, 'sera gazları ısının bir kısmını tutar', 1210, 380, t, sT + 2.4, sN + 0.6, { size: 38, align: 'center' });
      // termometre
      const th = 0.3 + 0.25 * E.se(t, sS + 2, sN) + 0.3 * E.se(t, sM + 1, sM + 5);
      U.thermo(ctx, 1810, 780, 300, th);
      // doğal sera etkisi olmasaydı: donmuş Dünya
      const nk = Math.min(E.se(t, sN + 0.4, sN + 1.2, 'out'), 1 - E.se(t, sM - 0.3, sM + 0.2));
      if (nk > 0) E.layer(ctx, nk, c => {
        const ox = 1240, oy = 170;
        U.card(c, ox, oy, 520, 330, { seed: 3040 });
        const e = circlePts(ox + 150, oy + 160, 95, 95, 50); P.fillPts(c, e, '#E6EEF2'); wash(c, e, PAL.water, 0.3, 3041, { bleed: 2 }); stroke(c, e, { w: 3, closed: true });
        for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283; line(c, [ox + 150 + Math.cos(a) * 30, oy + 160 + Math.sin(a) * 30], [ox + 150 + Math.cos(a) * 70, oy + 160 + Math.sin(a) * 70], { w: 2, dry: false, color: PAL.water }); }
        U.txt(c, 'sera etkisi', ox + 380, oy + 100, { size: 36, align: 'center' });
        U.txt(c, 'olmasaydı:', ox + 380, oy + 145, { size: 36, align: 'center' });
        U.txt(c, 'buz gibi', ox + 380, oy + 210, { size: 46, align: 'center', color: PAL.water });
        P.check(c, ox + 235, oy + 280, 30, E.se(t, sN + 3.5, sN + 4.1), { w: 4, color: U.GREEN });
        P.write(c, 'yaşam için gerekli', ox + 268, oy + 295, E.seg(t, sN + 3.5, sN + 4.6), { size: 30, color: U.GREEN });
      });
      E.inkText(ctx, 'gazlar artar → daha çok ısı tutulur → küresel ısınma', 1100, 205, t, sM + 2.4, sY + 0.3, { size: 44, align: 'center', color: U.HEAT });
      // yanılgı kartı
      const yk = E.se(t, sY, sY + 0.6, 'out');
      if (yk > 0) E.layer(ctx, yk, c => {
        c.fillStyle = 'rgba(241,234,219,0.75)'; c.fillRect(0, 0, E.W, E.H);
        U.card(c, 330, 200, 1260, 640, { seed: 3050 });
        U.txt(c, 'Yaygın yanılgı', 960, 290, { size: 44, align: 'center', color: U.AMBER });
        P.write(c, '“Küresel ısınmanın nedeni ozon deliğidir.”', 960, 390, E.seg(t, sY + 0.5, sY + 1.8), { size: 52, align: 'center' });
        const xk = E.se(t, sY + 2.6, sY + 3.2);
        if (xk > 0) { line(c, [420, 380], [1500, 364], { w: 7, color: U.RED, alpha: xk, dry: false }); c.save(); c.globalAlpha *= xk; c.translate(1450, 460); c.rotate(-0.12); U.txt(c, 'YANLIŞ', 0, 0, { size: 50, color: U.RED, align: 'center' }); c.restore(); }
        const k2 = E.se(t, sY + 3.8, sY + 4.6);
        c.save(); c.globalAlpha *= k2;
        U.txt(c, 'Ozon tabakası:', 420, 590, { size: 42, color: '#6A5A98' }); U.txt(c, 'morötesi ışınları süzer', 780, 590, { size: 42 });
        U.txt(c, 'Sera gazları:', 420, 680, { size: 42, color: U.HEAT }); U.txt(c, 'ısıyı (kızılötesi) tutar', 780, 680, { size: 42 });
        c.restore();
        P.write(c, 'İki ayrı sorun, iki ayrı neden.', 960, 780, E.seg(t, sY + 5.4, sY + 6.4), { size: 44, align: 'center', color: PAL.water });
      });
      U.damla(ctx, t, { x: 210, y: gy(210) + 2, s: 0.8, view: 'q3', expr: t > sM ? 'surprised' : 'curious', look: [0.7, -0.5], arms: [[-1, 0.4], [1, 1.6]], prop: 'lens', seed: 2 });
    }
  });
})();
