// SAHNE 4 — Potansiyel enerji (FB.7.2.2 a): çekim (yükseklik, kütle) ve esneklik potansiyel enerjisi
(function () {
  const { PAL, line, stroke, dashed } = INK;
  const F = F7E, A = F75;
  const dline = (ctx, x0, x1, y, a = 0.55) => { const p = []; for (let x = x0; x <= x1; x += 4) p.push([x, y]); ctx.save(); ctx.globalAlpha *= a; dashed(ctx, p, { w: 2, on: 10, off: 8 }); ctx.restore(); };
  const vdim = (ctx, x, y0, y1, lab, k = 1, o = {}) => { if (k <= 0) return; ctx.save(); ctx.globalAlpha *= k; line(ctx, [x, y0], [x, y1], { w: 2.2, dry: false }); INK.arrowHead(ctx, [x, y0 + 20], [x, y0], 12, { w: 2.2 }); INK.arrowHead(ctx, [x, y1 - 20], [x, y1], 12, { w: 2.2 }); if (lab) F.txt(ctx, lab, x + (o.right ? 16 : -16), (y0 + y1) / 2 + 12, { size: 34, align: o.right ? 'left' : 'right' }); ctx.restore(); };

  E.scene({
    name: 'Potansiyel enerji', concept: 'Konum ya da durumdan kaynaklanan enerji; çekim potansiyel enerjisi', from: 'pe', to: 'grav', trFrom: [960, 400],
    draw(ctx, t) {
      const sp = E.s('pe'), sg = E.s('grav');
      F.card(ctx, 200, 190, 1560, 390, { seed: 5600 });
      P.write(ctx, 'Potansiyel enerji', 250, 270, E.seg(t, sp + 0.3, sp + 1.2), { size: 64, color: F.PE });
      P.write(ctx, 'Konumundan ya da durumundan dolayı depolanan enerji', 250, 350, E.seg(t, sp + 1.2, sp + 3.0), { size: 44 });
      F.floor(ctx, 860, 9);
      const gk = E.se(t, sg, sg + 0.8);
      const ap = A.tree(ctx, 520, 860, 1.25, t);
      if (gk > 0) E.layer(ctx, gk, c => {
        vdim(c, ap[0] + 70, ap[1], 860, 'yükseklik', 1, { right: true });
        F.tag(c, 'çekim potansiyel enerjisi', 1060, 560, { size: 44, color: F.PE, seed: 5610 });
        P.arrow(c, [870, 580], [ap[0] + 40, ap[1] + 10], E.se(t, sg + 1, sg + 1.8), { w: 2.6, head: 12, bend: -20, color: F.PE });
      });
      DAMLA.draw(ctx, { x: 1600, y: 860, s: 1.1, view: 'q3', flip: true, expr: 'curious', look: [-0.8, -0.4], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 1, arms: [[-1, [-90, -150]], [1, 0.4]] });
    }
  });

  // top düşer → kumda çukur. y0 bırakma, sandY kum üstü, depth çukur
  function drop(ctx, t, x, y0, r, col, t0, sandY, seed, alpha) {
    const fall = sandY - r - y0, T = Math.sqrt(2 * fall / 1400);
    const u = E.clamp((t - t0) / T); const y = y0 + fall * u * u;
    const landed = t >= t0 + T;
    return { y: landed ? null : y, landed, draw: (d) => F.ball(ctx, x, landed ? sandY + d * 0.9 - r : y, r, col, seed, { alpha }) };
  }
  E.scene({
    name: 'Yükseklik ve kütle', concept: 'Çekim potansiyel enerjisi yüksekliğe ve kütleye bağlıdır', from: 'grav-h', to: 'grav-m', trFrom: [960, 700],
    draw(ctx, t) {
      const sh = E.s('grav-h'), sm = E.s('grav-m');
      const SY = 780;
      const phaseB = t >= sm;
      if (!phaseB) {
        const a = drop(ctx, t, 560, 530, 34, F.KE, sh + 1.8, SY, 5620), b = drop(ctx, t, 1160, 270, 34, F.KE, sh + 1.8, SY, 5621);
        const da = a.landed ? 22 : 0, db = b.landed ? 55 : 0;
        A.sand(ctx, 250, 1450, SY, [[560, da, 70], [1160, db, 95]]);
        dline(ctx, 460, 660, 530 + 34); dline(ctx, 1060, 1260, 270 + 34);
        vdim(ctx, 440, 530 + 34, SY, 'alçak', E.se(t, sh + 0.4, sh + 1.0)); vdim(ctx, 1040, 270 + 34, SY, 'yüksek', E.se(t, sh + 0.6, sh + 1.2));
        a.draw(da); b.draw(db);
        E.inkText(ctx, 'aynı top', 860, 230, t, sh + 0.3, 1e9, { size: 40, align: 'center', alpha: 0.75 });
        if (a.landed) E.inkText(ctx, 'sığ çukur', 630, 745, t, sh + 3.4, 1e9, { size: 34 });
        if (b.landed) E.inkText(ctx, 'derin çukur', 1240, 745, t, sh + 3.4, 1e9, { size: 34, color: F.PE });
      } else {
        const a = drop(ctx, t, 560, 380, 36, '#C9C2B2', sm + 1.6, SY, 5630, 0.4), b = drop(ctx, t, 1160, 380, 36, '#3A3A44', sm + 1.6, SY, 5631, 0.8);
        const da = a.landed ? 22 : 0, db = b.landed ? 55 : 0;
        A.sand(ctx, 250, 1450, SY, [[560, da, 70], [1160, db, 95]]);
        dline(ctx, 400, 1320, 380 + 36);
        E.inkText(ctx, 'aynı yükseklik', 1320, 400, t, sm + 0.4, 1e9, { size: 34, align: 'right', alpha: 0.8 });
        a.draw(da); b.draw(db);
        E.inkText(ctx, 'kütlesi küçük', 560, 330, t, sm + 0.6, 1e9, { size: 36, align: 'center' });
        E.inkText(ctx, 'kütlesi büyük', 1160, 330, t, sm + 0.6, 1e9, { size: 36, align: 'center', color: F.PE });
        if (b.landed) E.inkText(ctx, 'derin çukur', 1240, 745, t, sm + 3.2, 1e9, { size: 34, color: F.PE });
        if (a.landed) E.inkText(ctx, 'sığ çukur', 630, 745, t, sm + 3.2, 1e9, { size: 34 });
        E.inkText(ctx, 'yükseklik ↑ · kütle ↑  →  çekim potansiyel enerjisi ↑', 900, 220, t, sm + 5.6, 1e9, { size: 44, align: 'center', color: F.PE });
      }
      DAMLA.draw(ctx, { x: 1690, y: 880, s: 1.0, view: 'q3', flip: true, expr: 'curious', look: [-0.8, -0.2], blink: E.blink(t, 7), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, 0.4]] });
    }
  });

  // yay fırlatıcı: x, zemin gy; comp (0..1) sıkışma, t0 bırakma, h tepe yüksekliği
  function launcher(ctx, t, x, gy, compMax, t0, tc0, h, seed) {
    const L = 170, r = 34;
    const comp = compMax * E.se(t, tc0, tc0 + 1.4) * (1 - E.seg(t, t0, t0 + 0.12));
    const top = gy - L * (1 - comp);
    line(ctx, [x - 90, gy], [x + 90, gy], { w: 3, dry: false, seed });
    F.vspring(ctx, x, gy, top + 12, { coils: 9, r: 32, seed: seed + 1 });
    const pl = F.rect(x - 52, top, x + 52, top + 14); P.fillPts(ctx, pl, '#8A6A45', 0.7); stroke(ctx, pl, { w: 2.2, closed: true, seed: seed + 2 });
    // top uçuşu
    const g = 1500, ta = Math.sqrt(2 * h / g), dt = t - t0;
    let by = top - r;
    if (dt > 0 && dt < 2 * ta) { const v = g * ta; by = (gy - L) - r - (v * dt - 0.5 * g * dt * dt); }
    F.ball(ctx, x, by, r, F.KE, seed + 3, { stripe: true });
    if (t < t0 && t > tc0) F.vec(ctx, [x, top - 2 * r - 120], [x, top - 2 * r - 20], E.se(t, tc0 - 0.2, tc0 + 0.3), { w: 5, head: 16, label: 'it', lx: 36, ly: 10, size: 32 });
    return { comp, peak: (gy - L) - r - h };
  }
  E.scene({
    name: 'Esneklik', concept: 'Esneklik potansiyel enerjisi', from: 'elastic', to: 'elastic2', trFrom: [960, 540],
    draw(ctx, t) {
      const se = E.s('elastic'), s2 = E.s('elastic2');
      const k1 = 1 - E.se(t, s2 - 0.3, s2 + 0.3);
      if (k1 > 0) E.layer(ctx, k1, c => {
        const pull = E.se(t, se + 1.0, se + 2.5);
        A.bow(c, 560, 540, 1.6, pull); F.txt(c, 'gerilmiş ok yayı', 560, 760, { size: 40, align: 'center' });
        F.floor(c, 700, 12, 1000, 1500, 760); F.vspring(c, 1250, 700, 700 - 170 + 100 * E.se(t, se + 1.5, se + 3), { coils: 9, r: 34 });
        F.vec(c, [1250, 360], [1250, 510 + 100 * E.se(t, se + 1.5, se + 3)], 1, { w: 5, head: 16 });
        F.txt(c, 'sıkışmış yay', 1250, 780, { size: 40, align: 'center' });
        E.inkText(c, 'esneklik potansiyel enerjisi', 900, 250, t, se + 3.6, 1e9, { size: 56, align: 'center', color: F.PE });
      });
      const k2 = E.se(t, s2, s2 + 0.6);
      if (k2 > 0) E.layer(ctx, k2, c => {
        const A1 = launcher(c, t, 560, 860, 0.2, s2 + 3.4, s2 + 0.8, 130, 5700);
        const A2 = launcher(c, t, 1160, 860, 0.6, s2 + 3.4, s2 + 0.8, 420, 5710);
        F.txt(c, 'az sıkıştırıldı', 560, 920 - 10, { size: 32, align: 'center' });
        F.txt(c, 'çok sıkıştırıldı', 1160, 920 - 10, { size: 32, align: 'center', color: F.PE });
        const pk = E.se(t, s2 + 3.8, s2 + 4.3);
        if (pk > 0) { c.save(); c.globalAlpha *= pk; dline(c, 470, 650, A1.peak - 34); dline(c, 1070, 1250, A2.peak - 34); F.txt(c, 'biraz yükseldi', 680, A1.peak - 24, { size: 32 }); F.txt(c, 'daha yükseğe fırladı', 1280, A2.peak - 24, { size: 32, color: F.PE }); c.restore(); }
      });
      DAMLA.draw(ctx, { x: 1760, y: 880, s: 0.95, view: 'q3', flip: true, expr: t > s2 + 4 ? 'surprised' : 'curious', look: [-0.8, -0.3], blink: E.blink(t, 8), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, 0.4]] });
    }
  });
})();
