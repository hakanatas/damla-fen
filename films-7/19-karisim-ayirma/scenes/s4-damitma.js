// SAHNE 5 — Damıtma (tuz-su: suyu geri kazanma; etil alkol-su: kaynama noktası farkı) · Cabir bin Hayyan (D19.2)
(function () {
  const { PAL, line, stroke, circlePts, rng } = INK;
  const K = K7;
  // damıtma düzeneği: ısıtıcı üstünde balon (cx=420), eğik soğutucu → toplama kabı (x≈1330)
  function still(ctx, t, heat, prog, o = {}) {
    const fx = 420, fy = 600, R = 110;
    K.heater(ctx, fx, 770, 300, heat, t);
    // balon içi sıvı
    ctx.save(); ctx.beginPath(); ctx.arc(fx, fy, R, 0, 7); ctx.clip();
    const lvl = fy + R * (0.05 + 0.35 * prog); ctx.fillStyle = o.alcohol ? 'rgba(46,106,140,0.25)' : 'rgba(46,106,140,0.35)'; ctx.fillRect(fx - R, lvl, 2 * R, R * 2);
    if (heat > 0.3) { const r = rng(7400); for (let i = 0; i < 12; i++) { const u = (t * 0.8 + r()) % 1; stroke(ctx, circlePts(fx - 70 + r() * 140, fy + R - u * (fy + R - lvl), 5, 5, 10), { w: 1.3, closed: true, dry: false, color: PAL.water }); } }
    if (!o.alcohol && prog > 0.2) { const r = rng(7410); ctx.fillStyle = '#FFFFFF'; ctx.strokeStyle = '#6F8FA0'; for (let i = 0; i < 18 * prog; i++) { ctx.beginPath(); ctx.rect(fx - 60 + r() * 120, fy + R - 14 - r() * 12, 6, 6); ctx.fill(); ctx.stroke(); } }
    ctx.restore();
    const flask = circlePts(fx, fy, R, R, 60); ctx.save(); ctx.globalAlpha *= 0.12; ctx.fillStyle = PAL.white; P.path(ctx, flask); ctx.fill(); ctx.restore();
    stroke(ctx, P.arc(fx, fy, R, -Math.PI / 2 + 0.2, 1.5 * Math.PI - 0.2, 60), { w: 3.2, seed: 7401 });
    stroke(ctx, [[fx - 22, fy - R + 2], [fx - 22, fy - R - 90]], { w: 3, dry: false }); stroke(ctx, [[fx + 22, fy - R + 2], [fx + 22, fy - R - 60]], { w: 3, dry: false });
    // termometre
    stroke(ctx, [[fx - 6, fy - R - 150], [fx - 6, fy - R - 40]], { w: 2.4, dry: false }); stroke(ctx, [[fx + 6, fy - R - 150], [fx + 6, fy - R - 40]], { w: 2.4, dry: false });
    P.fillPts(ctx, circlePts(fx, fy - R - 36, 9, 9, 14), K.HEAT, 0.85);
    // yan boru → soğutucu
    const a = [fx + 22, fy - R - 60], b = [1180, 520];
    stroke(ctx, [a, [fx + 110, fy - R - 60]], { w: 3, dry: false });
    const c0 = [fx + 110, fy - R - 60];
    // soğutucu ceket (dış boru)
    const ang = Math.atan2(b[1] - c0[1], b[0] - c0[0]), nx = -Math.sin(ang), ny = Math.cos(ang);
    const J = 34, j0 = E.mix(c0, b, 0.15), j1 = E.mix(c0, b, 0.88);
    const jacket = [[j0[0] + nx * J, j0[1] + ny * J], [j1[0] + nx * J, j1[1] + ny * J], [j1[0] - nx * J, j1[1] - ny * J], [j0[0] - nx * J, j0[1] - ny * J]];
    P.fillPts(ctx, jacket, '#CFE0EA', 0.9); INK.wash(ctx, jacket, PAL.water, 0.25, 7402, { bleed: 1, blooms: 0 }); stroke(ctx, jacket.concat([jacket[0]]), { w: 3, closed: true, seed: 7403 });
    stroke(ctx, [[c0[0] + nx * 8, c0[1] + ny * 8], [b[0] + nx * 8, b[1] + ny * 8]], { w: 2.4, dry: false }); stroke(ctx, [[c0[0] - nx * 8, c0[1] - ny * 8], [b[0] - nx * 8, b[1] - ny * 8]], { w: 2.4, dry: false });
    // soğuk su giriş/çıkış
    line(ctx, [j1[0] + nx * J, j1[1] + ny * J], [j1[0] + nx * J, j1[1] + ny * J + 60], { w: 3, dry: false }); line(ctx, [j0[0] - nx * J, j0[1] - ny * J], [j0[0] - nx * J, j0[1] - ny * J - 60], { w: 3, dry: false });
    P.arrow(ctx, [j1[0] + nx * J + 30, j1[1] + ny * J + 70], [j1[0] + nx * J + 8, j1[1] + ny * J + 30], 1, { w: 2, head: 9, color: PAL.water });
    // buhar noktacıkları → damlalar
    if (heat > 0.3) for (let i = 0; i < 8; i++) { const u = (t * 0.35 + i / 8) % 1; const p = E.mix(c0, b, u); const cond = E.clamp((u - 0.35) * 3); ctx.save(); ctx.fillStyle = cond > 0.5 ? 'rgba(46,106,140,0.8)' : 'rgba(143,169,184,0.7)'; ctx.beginPath(); ctx.arc(p[0], p[1], 5 + 2 * cond, 0, 7); ctx.fill(); ctx.restore(); }
    if (heat > 0.3) for (let i = 0; i < 3; i++) { const u = (t * 1.5 + i / 3) % 1; ctx.save(); ctx.fillStyle = 'rgba(46,106,140,0.7)'; ctx.beginPath(); ctx.ellipse(b[0], b[1] + 10 + u * 130, 4, 7, 0, 0, 7); ctx.fill(); ctx.restore(); }
    K.beaker(ctx, 1190, 860, 170, 190, { level: 0.05 + 0.55 * prog, t, seed: 50 });
    return { c0, b, jacket, j0, j1 };
  }
  E.scene({
    name: 'Damıtma', concept: 'Damıtma: buharlaşma + yoğuşma', from: 'distill-q', to: 'alcohol', trFrom: [700, 500],
    draw(ctx, t) {
      const sq = E.s('distill-q'), sd = E.s('distill'), sa = E.s('alcohol');
      K.bench(ctx, -40, 1960, 860, 7420);
      const heat = E.se(t, sd - 1, sd);
      const prog = E.se(t, sd, E.e('alcohol'));
      const alc = t > sa;
      const g = still(ctx, t, heat, prog, { alcohol: false });
      const lk = E.se(t, sd + 1.0, sd + 1.8);
      if (lk > 0) E.layer(ctx, lk, c => {
        INK.label(c, 'tuzlu su', 215, 600, { size: 36, weight: 700, align: 'center' });
        INK.label(c, 'soğutucu', 900, 300, { size: 40, weight: 700, align: 'center', color: PAL.water });
        INK.label(c, '(soğuk su)', 900, 342, { size: 30, align: 'center', alpha: 0.7 });
        INK.label(c, 'saf su', 1190, 600, { size: 40, weight: 700, align: 'center', color: PAL.water });
      });
      E.inkText(ctx, 'buharlaşma → yoğuşma', 820, 200, t, sd + 3.0, sa, { size: 48, align: 'center', color: K.AMBER });
      // kaynama noktası karşılaştırması
      const ak = E.se(t, sa + 0.4, sa + 1.2);
      if (ak > 0) E.layer(ctx, ak, c => {
        K.card(c, 1330, 180, 520, 470, { seed: 7430 });
        INK.label(c, 'etil alkol + su', 1590, 250, { size: 44, weight: 700, align: 'center' });
        INK.label(c, 'kaynama noktası', 1590, 300, { size: 32, align: 'center', alpha: 0.7 });
        const base = 610;
        [['etil alkol', 78, K.AMBER, 1480], ['su', 100, PAL.water, 1700]].forEach(([n, v, col, x], i) => {
          const h = v * 2.5 * E.se(t, sa + 1.2 + i * 0.6, sa + 2.2 + i * 0.6);
          const bar = [[x - 45, base], [x - 45, base - h], [x + 45, base - h], [x + 45, base]]; P.fillPts(c, bar, col, 0.55); stroke(c, bar, { w: 2.4, dry: false });
          INK.label(c, '≈ ' + v + ' °C', x, base - h - 14, { size: 34, weight: 700, align: 'center', alpha: E.se(t, sa + 2.0 + i * 0.6, sa + 2.4 + i * 0.6) });
          INK.label(c, n, x, base + 34, { size: 32, weight: 700, align: 'center' });
        });
        INK.label(c, '(deniz seviyesinde)', 1590, base + 70, { size: 26, align: 'center', alpha: 0.6 });
        P.write(c, 'alkol önce buharlaşır', 1590, 780, E.seg(t, sa + 3.4, sa + 4.4), { size: 42, align: 'center', color: K.AMBER });
      });
    }
  });
  // Cabir bin Hayyan: imbik + deney tüpleri
  function alembic(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const pot = P.arc(0, 0, 90, -0.2, Math.PI + 0.2, 40, 80).concat([[-60, -40], [60, -40]].reverse()); P.fillPts(ctx, pot, '#C99A6A', 0.8); stroke(ctx, pot.concat([pot[0]]), { w: 3, closed: true, seed: 7501 });
    const head = P.arc(0, -70, 60, Math.PI, 2 * Math.PI, 30, 50); P.fillPts(ctx, head.concat([[60, -40], [-60, -40]]), '#D9B488', 0.8); stroke(ctx, head, { w: 3, seed: 7502 });
    line(ctx, [50, -90], [230, -10], { w: 8, taper: 0.1, color: '#8A6A45' }); line(ctx, [230, -10], [236, 30], { w: 5, color: '#8A6A45' });
    stroke(ctx, [[-60, -40], [60, -40]], { w: 3 });
    ctx.restore();
  }
  E.scene({
    name: 'Cabir bin Hayyan', concept: 'Bilim tarihi: imbik, deney tüpü, ilk kimya laboratuvarı', from: 'cabir', to: 'cabir', trFrom: [960, 540],
    draw(ctx, t) {
      const sc = E.s('cabir');
      P.notebook(ctx, 180, 150, 1560, 720);
      P.write(ctx, 'Cabir bin Hayyan', 960, 270, E.seg(t, sc + 0.3, sc + 1.4), { size: 72, align: 'center', font: 'Kalam' });
      INK.label(ctx, '(8. yüzyıl)', 960, 320, { size: 32, align: 'center', alpha: 0.6 * E.se(t, sc + 1, sc + 1.6) });
      const ak = E.se(t, sc + 1.4, sc + 2.2); if (ak > 0) E.layer(ctx, ak, c => alembic(c, 560, 560, 1.2));
      INK.label(ctx, 'imbik', 620, 720, { size: 44, weight: 700, align: 'center', alpha: E.se(t, sc + 2.2, sc + 2.8) });
      for (let i = 0; i < 3; i++) { const k = E.se(t, sc + 3.0 + i * 0.3, sc + 3.5 + i * 0.3, 'out'); if (k <= 0) continue; const x = 1140 + i * 90, y = 430; const tube = [[x - 22, y], [x - 22, y + 200]].concat(P.arc(x, y + 200, 22, Math.PI, 0, 16, 22)).concat([[x + 22, y]]); E.layer(ctx, k, c => { P.fillPts(c, tube.slice(1, -1).concat([[x + 22, y + 120], [x - 22, y + 120]]), [PAL.water, PAL.light, PAL.life][i], 0.4); stroke(c, tube, { w: 3, seed: 7510 + i }); }); }
      INK.label(ctx, 'deney tüpleri', 1230, 720, { size: 44, weight: 700, align: 'center', alpha: E.se(t, sc + 3.8, sc + 4.4) });
      P.write(ctx, 'İlk kimya laboratuvarını kurdu.', 960, 830, E.seg(t, sc + 5.4, sc + 6.6), { size: 50, align: 'center', color: K.AMBER });
    }
  });
})();
