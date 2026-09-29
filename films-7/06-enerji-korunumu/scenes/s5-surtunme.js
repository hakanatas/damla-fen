// SAHNE 5 — Sürtünme: sönümlenen sarkaç, mekanik enerjinin bir kısmı ısıya; eller sürtünce ısınır; bazı durumlarda ihmal edilebilir
(function () {
  const { PAL, line, stroke, dashed, circlePts } = INK;
  const F = F7E, A = F76;
  const TH0 = 0.75, px = 560, py = 250, L = 420, r = 40;
  const cm = a => (1 - Math.cos(a)) / (1 - Math.cos(TH0));
  const dl = (ctx, x0, x1, y, a = 0.5) => { const p = []; for (let x = x0; x <= x1; x += 4) p.push([x, y]); ctx.save(); ctx.globalAlpha *= a; dashed(ctx, p, { w: 2, on: 10, off: 8 }); ctx.restore(); };
  const squig = (ctx, x, y, t, i, k = 1, len = 50) => { const p = []; for (let j = 0; j <= 20; j++) { const u = j / 20; p.push([x + Math.sin(u * 9 + t * 5 + i) * 5, y - u * len]); } ctx.save(); ctx.globalAlpha *= 0.8 * k; stroke(ctx, p, { w: 3, color: F.HEAT, seed: 6500 + i }); ctx.restore(); };
  E.scene({
    name: 'Sönümlenen sarkaç', concept: 'Sürtünme: enerjinin bir kısmı ısıya dönüşür', from: 'stop', to: 'friction', trFrom: [560, 500],
    draw(ctx, t) {
      const ss = E.s('stop'), sf = E.s('friction');
      const tau = Math.max(0, t - ss - 0.6);
      const a = TH0 * Math.exp(-0.12 * tau), th = a * Math.cos(tau * 2.6);
      const m = cm(a), pe = cm(th), ke = Math.max(0, m - pe), heat = 1 - m;
      dl(ctx, px - 420, px + 420, py + L * Math.cos(TH0) + r);
      E.inkText(ctx, 'ilk yükseklik', px + 420, py + L * Math.cos(TH0) + r - 12, t, ss + 0.5, 1e9, { size: 30, align: 'right', alpha: 0.7 });
      A.pend(ctx, px, py, L, th, r, { floor: 850, half: 400 });
      const fk = E.se(t, sf + 0.5, sf + 1.3);
      if (fk > 0) {
        for (let i = 0; i < 3; i++) squig(ctx, px - 30 + i * 30, py - 12, t, i, fk, 44);
        const bx = px + Math.sin(th) * L, by = py + Math.cos(th) * L, dir = -Math.sign(Math.sin(tau * 2.6)) || 1;
        for (let i = 0; i < 3; i++) { ctx.save(); ctx.globalAlpha *= 0.45 * fk; line(ctx, [bx - dir * (60 + i * 6), by - 20 + i * 20], [bx - dir * (120 + i * 6), by - 20 + i * 20], { w: 2, dry: false, seed: 6510 + i }); ctx.restore(); }
        E.inkText(ctx, 'bağlantı yerinde sürtünme', px, py - 70, t, sf + 1.2, 1e9, { size: 32, align: 'center', color: F.HEAT });
        E.inkText(ctx, 'hava sürtünmesi', px + 150, py + L + 110, t, sf + 2.2, 1e9, { size: 32, color: F.HEAT });
      }
      E.layer(ctx, E.se(t, ss + 0.3, ss + 1.0), c => {
        F.txt(c, 'enerji (nitel)', 1330, 250, { size: 36, align: 'center', alpha: 0.7 });
        A.bars(c, 1030, 700, A.std(pe, ke, heat, true), { total: true, H: 340, gap: 170 });
      });
    }
  });
  E.scene({
    name: 'Eller ısınır', concept: 'Sürtünmeyle ısınma', from: 'rub', to: 'rub', trFrom: [960, 600],
    draw(ctx, t) {
      const s = E.s('rub');
      const osc = Math.sin(t * 14) * 14 * E.se(t, s + 0.3, s + 0.8);
      const hk = E.se(t, s + 1.2, s + 3.0);
      DAMLA.draw(ctx, { x: 960, y: 880, s: 1.7, view: 'front', expr: hk > 0.6 ? 'happy' : 'determined', look: [0, 0.5], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 1, arms: [[-1, [-8 + osc, -58]], [1, [8 + osc, -62]]] });
      for (let i = 0; i < 4; i++) squig(ctx, 900 + i * 40, 880 - 1.7 * 66, t, i, hk, 50);
      // ısı çevreye yayılır
      const sk = E.se(t, s + 3.2, s + 4.2);
      if (sk > 0) for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * 0.45; const r0 = 230, r1 = 230 + 160 * sk; ctx.save(); ctx.globalAlpha *= 0.7 * sk; P.arrow(ctx, [960 + Math.cos(a) * r0, 690 + Math.sin(a) * r0 * 0.7], [960 + Math.cos(a) * r1, 690 + Math.sin(a) * r1 * 0.7], 1, { w: 2.6, head: 12, color: F.HEAT }); ctx.restore(); }
      E.inkText(ctx, 'sürtünme → ısı', 480, 420, t, s + 1.6, 1e9, { size: 54, align: 'center', color: F.HEAT });
      E.inkText(ctx, 'ısı çevreye yayılır', 1450, 420, t, s + 3.6, 1e9, { size: 46, align: 'center', color: F.HEAT });
    }
  });
  E.scene({
    name: 'İhmal', concept: 'Sürtünmenin ihmal edilebildiği durumlar', from: 'neglect', to: 'neglect', trFrom: [560, 500],
    draw(ctx, t) {
      const s = E.s('neglect');
      const th = TH0 * Math.cos((t - s) * 2.6), pe = cm(th);
      const yT = py + L * Math.cos(TH0) + r;
      dl(ctx, px - 420, px + 420, yT, 0.7);
      A.ghost(ctx, px, py, L, -TH0, r, 0.2); A.ghost(ctx, px, py, L, TH0, r, 0.2);
      A.pend(ctx, px, py, L, th, r, { floor: 850, half: 400 });
      E.inkText(ctx, 'hep aynı yükseklik', px, yT + 44, t, s + 4.0, 1e9, { size: 34, align: 'center', color: F.PE });
      F.tag(ctx, 'sürtünme ihmal edildi', 1330, 200, { size: 40, seed: 6520 });
      A.bars(ctx, 1030, 700, A.std(pe, 1 - pe, 0, true), { total: true, H: 340, gap: 170 });
    }
  });
})();
