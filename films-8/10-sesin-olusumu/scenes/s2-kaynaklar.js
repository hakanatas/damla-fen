// SAHNE 2 — Ses kaynakları: cetvel, davul (pirinç taneleri), bağlama teli, flütteki hava; titreşim durunca ses durur.
// FB.8.4.1 a) sesi oluşturan nitelikleri tanımlar · b) veri toplar ve kaydeder (tablo) · çıkarım: ses titreşimle oluşur
(function () {
  const { PAL, stroke, line, wash, circlePts } = INK; const F = S8;
  const ROWS = [['cetvel', 'cetvelin ucu', 'var'], ['davul', 'deri (zar)', 'var'], ['bağlama', 'tel', 'var'], ['flüt', 'borudaki hava', 'var']];
  E.scene({
    name: 'Ses kaynakları', concept: 'Titreşim: sesi oluşturan ortak nitelik', from: 'ruler', to: 'infer', trFrom: [560, 600],
    draw(ctx, t) {
      const sr = E.s('ruler'), sd = E.s('drum'), ss = E.s('string'), sp = E.s('stop'), si = E.s('infer');
      ctx.fillStyle = 'rgba(138,106,69,0.10)'; ctx.fillRect(0, 0, E.W, E.H);
      const aR = 1 - E.se(t, sd - 0.3, sd + 0.4);
      const aD = Math.min(E.se(t, sd - 0.3, sd + 0.4), 1 - E.se(t, ss - 0.3, ss + 0.4));
      const aS = E.se(t, ss - 0.3, ss + 0.4);
      // --- cetvel ---
      if (aR > 0) E.layer(ctx, aR, c => {
        F.desk(c, 110, 700, 640, { legH: 250 });
        let amp = 0; [sr + 0.8, sr + 4.2].forEach(h => { if (t > h) amp = Math.max(amp, 46 * Math.exp(-(t - h) * 0.8)); });
        const tip = F.ruler(c, 700, 640, 280, t, amp, { fq: 6, inLen: 330 });
        if (amp > 3) F.rings(c, tip[0] + 10, 628, t, { a0: -0.8, a1: 0.8, r0: 40, maxR: 280, gap: 50, speed: 140, alpha: Math.min(1, amp / 30) });
        [sr + 0.8, sr + 4.2].forEach(h => { if (t > h - 0.6 && t < h + 0.2) P.arrow(c, [960, 430], [955, 600], E.se(t, h - 0.6, h - 0.1), { w: 3 }); });
        P.write(c, 'titreşim', 780, 470, E.seg(t, sr + 2.2, sr + 3.2), { size: 50, color: F.AMB });
        F.fit(c, 'ileri ↔ geri', 470, 560, 300, 38, { alpha: 0.7 * E.se(t, sr + 2.6, sr + 3.4) });
      });
      // --- davul ---
      if (aD > 0) E.layer(ctx, aD, c => {
        const ph = t - sd - 1.2, per = 1.7, q = ((ph % per) + per) % per, on = ph > 0;
        const vib = on ? Math.exp(-q * 2.2) : 0, stick = on ? 0.05 + 0.95 * Math.exp(-q * 9) : 0.05;
        F.drum(c, 520, 800, 1.35, t, vib, { grains: true, stick });
        if (vib > 0.05) F.rings(c, 520, 560, t, { a0: -Math.PI + 0.4, a1: -0.4, r0: 200, maxR: 420, gap: 55, speed: 150, alpha: vib });
        P.write(c, 'pirinç taneleri zıplıyor', 520, 330, E.seg(t, sd + 2.2, sd + 3.4), { size: 44, align: 'center' });
        P.write(c, 'deri titreşiyor', 520, 395, E.seg(t, sd + 3.4, sd + 4.4), { size: 44, align: 'center', color: F.AMB });
      });
      // --- bağlama + flüt + durdurma ---
      if (aS > 0) E.layer(ctx, aS, c => {
        const hold = E.se(t, sp + 1.4, sp + 1.9);
        const pl = t - ss - 0.8, sv = pl > 0 ? 0.35 + 0.65 * Math.exp(-((pl % 2.4) * 1.2)) : 0;
        const vib = sv * (1 - hold);
        F.baglama(c, 640, 560, 1.0, t, vib, { rot: 0.35 });
        if (vib > 0.05) F.rings(c, 780, 520, t, { a0: -0.9, a1: 0.5, r0: 60, maxR: 330, gap: 55, speed: 150, alpha: vib });
        const fv = E.se(t, ss + 2.6, ss + 3.2) * (1 - E.se(t, sp - 0.4, sp + 0.2));
        F.flute(c, 150, 820, 1.0, t, fv);
        if (fv > 0.05) F.rings(c, 590, 820, t, { a0: -0.6, a1: 0.6, r0: 30, maxR: 240, gap: 50, speed: 150, alpha: fv });
        c.save(); c.globalAlpha *= E.se(t, ss + 0.8, ss + 1.6) * (1 - hold * 0.5); INK.label(c, 'tel', 420, 400, { size: 42, weight: 700, color: F.AMB }); INK.leader(c, [440, 410], [480, 488], { w: 1.6 }); c.restore();
        c.save(); c.globalAlpha *= fv; INK.label(c, 'borudaki hava', 250, 900, { size: 40, weight: 700, color: F.AMB }); c.restore();
        if (hold > 0) { // durduran el
          const hx = 405, hy = 474 - (1 - hold) * 120;
          const m = INK.wobble(circlePts(hx, hy, 40, 30, 30), 2, 77); P.fillPts(c, m, PAL.water, 0.55); stroke(c, m, { w: 2.6, closed: true, seed: 78 });
          P.write(c, 'tel durdu → ses kesildi', 380, 300, E.seg(t, sp + 2.2, sp + 3.3), { size: 46 });
        }
      });
      // --- veri tablosu ---
      const kH = E.se(t, sr + 0.5, sr + 1.5);
      const kr = [E.se(t, sr + 3.4, sr + 4.2), E.se(t, sd + 3.6, sd + 4.4), E.se(t, ss + 1.6, ss + 2.4), E.se(t, ss + 3.6, ss + 4.4)];
      P.write(ctx, 'Veri tablom', 1110, 180, kH, { size: 46 });
      F.table(ctx, 1110, 210, [['ses kaynağı', 230], ['titreşen kısım', 300], ['ses', 160]], ROWS, 80, kH, kr, { size: 36 });
      const kHl = E.se(t, si + 2.4, si + 3.2);
      if (kHl > 0) { ctx.save(); ctx.globalAlpha *= kHl; stroke(ctx, INK.wobble(circlePts(1490, 450, 175, 185, 50), 4, 91), { w: 4, closed: true, color: F.AMB, seed: 92 }); ctx.restore(); }
      if (t > sp + 3) P.write(ctx, 'Titreşim durunca ses de durur.', 1110, 690, E.seg(t, sp + 3, sp + 4.2), { size: 42 });
      const kc = E.se(t, si + 4.2, si + 5);
      if (kc > 0) E.layer(ctx, kc, c => {
        F.card(c, 1095, 740, 730, 110, 95, { tint: PAL.light, tintA: 0.2 });
        F.fit(c, 'Ses, titreşim sonucunda oluşur.', 1460, 812, 690, 52);
      });
      // Damla
      const inf = t > si;
      F.damla(ctx, t, { x: 990, y: 905, s: 0.85, flip: !inf, expr: inf ? 'thinking' : 'curious', look: inf ? [0.7, -0.4] : [0.8, -0.2], arms: inf ? [[-1, 0.4], [1, [30, -86]]] : [[-1, 0.4], [1, 2.1]] });
    }
  });
})();
