// SAHNE 1 — Başlık + Merak: nabız; 15 sn say × 4; dinlenirken 60–100
(function () {
  const { PAL, stroke, line, circlePts, wash } = INK; const K = KIT, F = F08;
  const pulseK = t => { const ph = (t % 0.75) / 0.75; return Math.exp(-ph * 9); };
  function wrist(c, t, cx, cy, R) {
    c.save(); c.beginPath(); c.arc(cx, cy, R, 0, 7); c.clip();
    c.fillStyle = '#F7F0E2'; c.fillRect(cx - R, cy - R, 2 * R, 2 * R);
    // ön kol (yatay) ve el
    const arm = F.closed([[cx - R - 20, cy - 10], [cx + 40, cy - 30], [cx + R + 20, cy - 50], [cx + R + 20, cy + 110], [cx + 40, cy + 110], [cx - R - 20, cy + 120]], 4);
    P.fillPts(c, arm, F.SKIN); stroke(c, [[cx - R - 20, cy - 10], [cx + 40, cy - 30], [cx + R + 20, cy - 50]], { w: 3 }); stroke(c, [[cx - R - 20, cy + 120], [cx + 40, cy + 110], [cx + R + 20, cy + 110]], { w: 3 });
    // atardamar (bilek, başparmak tarafı) — soluk
    stroke(c, F.cr([[cx - R, cy + 30], [cx, cy + 22], [cx + R, cy + 10]], 10), { w: 6, color: F.OXY, alpha: 0.35 + 0.4 * pulseK(t), dry: false });
    // iki parmak (yukarıdan bastırır)
    [[-40, 0], [30, -6]].forEach(([dx, dy], i) => { const f = K.rrect(cx + dx, cy - 70 + dy, 56, 170, 26); P.fillPts(c, f, '#EBD2BA'); stroke(c, f, { w: 3, closed: true, seed: 8200 + i }); const nl = K.rrect(cx + dx, cy + 0 + dy, 30, 22, 8); stroke(c, nl, { w: 1.6, closed: true, dry: false, alpha: 0.6 }); });
    const pk = pulseK(t); if (pk > 0.05) { c.save(); c.globalAlpha = pk; [0, 1].forEach(j => stroke(c, circlePts(cx - 5, cy + 26, 60 + j * 22 + (1 - pk) * 30, 24 + j * 10, 30), { w: 3, color: PAL.light, closed: true, dry: false })); c.restore(); }
    c.restore(); stroke(c, circlePts(cx, cy, R, R, 80), { w: 5, closed: true, seed: 8210 });
  }
  E.scene({
    name: 'Nabız', concept: 'Nabzı ölçme', from: 'title', to: 'range',
    draw(ctx, t) {
      const sp = E.s('pulse'), sc = E.s('count'), sr = E.s('range');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(196,80,60,0.07)'); g.addColorStop(1, 'rgba(227,160,58,0.10)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      K.kid(ctx, 380, 700, 1.35, { shirt: PAL.life, hair: 'long', seed: 3, expr: t > sp + 3 ? 'o' : 'smile' });
      K.text(ctx, 'Ela', 380, 490, { size: 40, align: 'center', alpha: E.se(t, sp + 0.3, sp + 1) });
      const wk = E.se(t, sp + 1.0, sp + 1.8, 'out');
      if (wk > 0) E.layer(ctx, wk, c => { wrist(c, t, 900, 520, 230); INK.line(c, [520, 640], [680, 580], { w: 2.4, alpha: 0.6 }); K.text(c, 'bilek', 900, 800, { size: 36, align: 'center', alpha: 0.8 * (1 - E.se(t, sr - 0.3, sr + 0.3)) }); });
      if (t > sp + 3 && t < sc) { const pk = pulseK(t); K.text(ctx, 'tık', 1180, 330, { size: 50, color: '#C07F1E', alpha: pk }); }
      // sayım
      const ck = E.se(t, sc + 0.2, sc + 0.9, 'out');
      if (ck > 0) E.layer(ctx, ck, c => {
        K.card(c, 1230, 200, 520, 560, { seed: 8220, tint: PAL.light, tintA: 0.08 });
        const tt = E.clamp((t - sc - 0.8) / 5) * 15; P.icon.clock(c, 1380, 330, 0.9, tt / 15 * Math.PI * 2 * 0.25);
        K.text(c, Math.round(tt) + ' sn', 1500, 345, { size: 50 });
        const n = Math.min(20, Math.floor(E.clamp((t - sc - 0.8) / 5) * 20 + 0.001));
        K.text(c, 'atış: ' + n, 1490, 490, { size: 60, align: 'center', color: F.OXY });
        const rk = E.se(t, sc + 6, sc + 6.8); if (rk > 0) { K.text(c, '20 × 4 = 80', 1490, 600, { size: 60, align: 'center', alpha: rk }); K.text(c, 'atım / dakika', 1490, 670, { size: 40, align: 'center', alpha: rk }); }
      });
      // aralık çubuğu
      const rk = E.se(t, sr + 0.3, sr + 1.0);
      if (rk > 0) { ctx.save(); ctx.globalAlpha = rk;
        const x0 = 700, x1 = 1700, v2x = v => E.lerp(x0, x1, (v - 40) / 120), y = 875;
        const band = [[v2x(60), y - 20], [v2x(100), y - 20], [v2x(100), y + 20], [v2x(60), y + 20]]; P.fillPts(ctx, band, PAL.life, 0.35);
        stroke(ctx, [[x0, y], [x1, y]], { w: 3 }); [40, 60, 80, 100, 120, 140, 160].forEach(v => { line(ctx, [v2x(v), y - 10], [v2x(v), y + 10], { w: 2, dry: false }); });
        K.text(ctx, '60', v2x(60), y - 30, { size: 30, align: 'center' }); K.text(ctx, '100', v2x(100), y - 30, { size: 30, align: 'center' });
        K.text(ctx, 'dinlenirken', v2x(80), y - 30, { size: 30, align: 'center', color: K.LIFE_D });
        const ak = E.se(t, sr + 2.5, sr + 3.5); P.arrow(ctx, [v2x(105), y - 45], [v2x(145), y - 45], ak, { w: 3, head: 12, color: F.OXY }); if (ak > 0.9) K.text(ctx, 'koşunca', v2x(125), y - 60, { size: 30, align: 'center', color: F.OXY });
        ctx.restore(); }
      K.title(ctx, t, 8, 'Vücudumuzun Taşıma Ağı: Dolaşım Sistemi', 3);
    }
  });
})();
