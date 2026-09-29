// SAHNE 3 — Tanecikli, boşluklu, hareketli yapı (FB.5.5.1 a: niteliklerini belirler)
// Hayali büyüteçle suyun içine bakılır; model olduğu ve ölçekli olmadığı yazılır.
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const F = F16;
  const CX = 900, CY = 520, RMAX = 370;
  E.scene({
    name: 'Tanecikler', concept: 'Madde tanecikli, boşluklu ve hareketlidir', from: 'zoom', to: 'moving', trFrom: [900, 520],
    draw(ctx, t) {
      const sz = E.s('zoom'), sp = E.s('particles'), sg = E.s('gaps'), sm = E.s('moving');
      F.desk(ctx);
      // yavaş → normal hız: tanecikleri önce seçilebilir kılmak için hareket yavaş, 'hareketli' beat'inde hızlanır
      const ramp = E.se(t, sm, sm + 1.2);
      const te = (t - sz) * 0.18 + Math.max(0, t - sm - 0.6) * 0.82 * Math.min(1, Math.max(0, (t - sm) / 1.2));
      // bardak
      const open = E.se(t, sz + 1.2, sz + 3.0);
      const gx = 760, gy = 330, gw = 280, gh = 470;
      E.layer(ctx, 1 - E.se(t, sz + 2.2, sz + 3.2), c => { F.glass(c, gx, gy, gw, gh, 360, { seed: 31 }); });
      // büyüteç: bardağın üzerine gelir, sonra açılır
      const lx = E.lerp(1500, 900, E.se(t, sz + 0.1, sz + 1.2)), ly = E.lerp(760, 560, E.se(t, sz + 0.1, sz + 1.2));
      const x = E.lerp(lx, CX, open), y = E.lerp(ly, CY, open), r = E.lerp(95, RMAX, open);
      ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip();
      ctx.fillStyle = '#E4EDF0'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
      INK.wash(ctx, circlePts(x, y, r, r, 60), PAL.water, 0.12, 33, { bleed: 2, blooms: 1 });
      const pr = E.lerp(9, 30, open);
      const R = [x - r - 10, y - r - 10, 2 * r + 20, 2 * r + 20];
      const pts = F.liquidPts(R, te, { r: pr, rows: 13, speed: 1, seed: 7 });
      // hareket izleri (moving)
      if (ramp > 0) { ctx.save(); ctx.globalAlpha = ramp * 0.5; pts.forEach((p, i) => { if (i % 3) return; const dir = Math.floor(i / 7) % 2 ? 1 : -1; dashed(ctx, [[p[0] - dir * pr * 1.3, p[1]], [p[0] - dir * pr * 2.8, p[1]]], { w: 2.4, on: 8, off: 6, color: PAL.water }); }); ctx.restore(); }
      F.drawPts(ctx, pts, pr * 0.74, { mark: true });
      ctx.restore();
      F.lensRing(ctx, x, y, r, { w: 6 + 4 * open, ang: 0.7 });
      // ---- tanecik (particles): birkaç tanecik vurgulanır
      const kp = Math.min(E.se(t, sp + 0.3, sp + 1.0), 1 - E.se(t, sg - 0.2, sg + 0.4));
      if (kp > 0 && open > 0.99) {
        ctx.save(); ctx.globalAlpha = kp;
        const pick = pts.filter(p => Math.hypot(p[0] - CX, p[1] - CY) < 200).slice(0, 3);
        pick.forEach((p, i) => stroke(ctx, circlePts(p[0], p[1], pr + 9, pr + 9, 30), { w: 4, closed: true, color: PAL.light, seed: 34 + i }));
        if (pick[0]) INK.leader(ctx, [1380, 330], [pick[0][0] + pr, pick[0][1] - pr * 0.4], { w: 2.4, bend: 0.12 });
        ctx.restore();
      }
      P.write(ctx, 'tanecik', 1390, 320, Math.min(E.seg(t, sp + 0.6, sp + 1.6), 1 - E.seg(t, sg - 0.2, sg + 0.4)), { size: 58 });
      // ---- boşluk (gaps): iki tanecik arasındaki boşluk izlenir
      const kg = Math.min(E.se(t, sg + 0.2, sg + 0.9), 1 - E.se(t, sm - 0.2, sm + 0.3));
      if (kg > 0 && open > 0.99) {
        // en yakın iki komşu (aynı satırda ardışık) → aradaki nokta
        let best = null; for (let i = 0; i < pts.length - 1; i++) { const a = pts[i], b = pts[i + 1]; const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2; const d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (d < pr * 3 && Math.hypot(mx - (CX + 120), my - (CY - 60)) < (best ? best.d : 1e9)) best = { x: mx, y: my, d: Math.hypot(mx - (CX + 120), my - (CY - 60)) }; }
        ctx.save(); ctx.globalAlpha = kg;
        if (best) { stroke(ctx, circlePts(best.x, best.y, 12, 12, 20), { w: 3, closed: true, color: '#8A4A10', seed: 38 }); INK.leader(ctx, [1380, 450], [best.x + 14, best.y], { w: 2.4, bend: -0.1 }); }
        ctx.restore();
      }
      P.write(ctx, 'boşluk', 1390, 470, Math.min(E.seg(t, sg + 0.6, sg + 1.4), 1 - E.seg(t, sm - 0.2, sm + 0.3)), { size: 58, color: '#8A4A10' });
      // boşluklar her maddede farklı: iki küçük örnek
      const kd = Math.min(E.se(t, sg + 2.6, sg + 3.4, 'out'), 1 - E.se(t, sm - 0.2, sm + 0.3));
      if (kd > 0) E.layer(ctx, kd, c => {
        [[1470, 690, 'solid', 'sıkı'], [1720, 690, 'gas', 'seyrek']].forEach(([mx, my, kind, nm], i) => {
          const rr = 105; c.save(); c.beginPath(); c.arc(mx, my, rr, 0, 7); c.clip(); c.fillStyle = '#F4F1E8'; c.fillRect(mx - rr, my - rr, 2 * rr, 2 * rr);
          F.field(c, kind, [mx - rr, my - rr, 2 * rr, 2 * rr], t * 0.3, { r: 13, n: 6, clip: false, cols: 8, rows: 8, lift: 0, seed: 40 });
          c.restore(); stroke(c, circlePts(mx, my, rr, rr, 50), { w: 3.4, closed: true, seed: 41 + i });
          INK.label(c, nm, mx, my + rr + 45, { size: 36, weight: 700, align: 'center' });
        });
        INK.label(c, 'boşluklar farklı olabilir', 1595, 540, { size: 36, weight: 700, align: 'center', color: '#8A4A10' });
      });
      // ---- hareketli
      const km = E.se(t, sm + 0.4, sm + 1.2);
      P.write(ctx, 'hiç durmaz,', 1390, 360, E.seg(t, sm + 0.5, sm + 1.4), { size: 58 });
      P.write(ctx, 'hep hareket eder!', 1390, 430, E.seg(t, sm + 1.2, sm + 2.2), { size: 58, color: PAL.water });
      // not: model
      const nk = E.se(t, sz + 3.0, sz + 3.8);
      if (nk > 0) { INK.label(ctx, '(model: tanecikler gözle görülmez;', 1590, 190, { size: 30, align: 'center', alpha: 0.7 * nk }); INK.label(ctx, 'çizim ölçekli değildir)', 1590, 228, { size: 30, align: 'center', alpha: 0.7 * nk }); }
      // Damla, büyüteçle bakıyor (sol altta)
      DAMLA.draw(ctx, { x: 250, y: 832, s: 1.3, view: 'q3', expr: km > 0.5 ? 'surprised' : 'curious', look: [0.8, -0.2], blink: E.blink(t, 4), squash: E.breath(t), t: t * (1 + ramp), seed: 1, arms: [[-1, 0.35], [1, 2.0]], prop: 'lens', propTilt: -0.3 });
    }
  });
})();
