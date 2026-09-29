// SAHNE 8 — Sıra sende (tekerleme, atık malzemeli model, tartışma · SDB2.2, E3.5) + sonraki film + bitiş
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = G61;

  function task(ctx, t) {
    const st = E.s('task'), sd = E.s('discuss');
    F.card(ctx, 250, 170, 1420, 700, { seed: 160 });
    P.write(ctx, 'Sıra sende!', 330, 270, E.seg(t, st + 0.2, st + 1.0), { size: 72, color: '#8A4A10' });
    P.drawOn(ctx, P.bez([326, 292], [520, 302], [720, 288], 20), E.se(t, st + 1.0, st + 1.5), { w: 3, color: PAL.light });
    // 1. tekerleme
    P.write(ctx, '1. Tekerlemeni yaz:', 330, 380, E.seg(t, st + 1.2, st + 2.2), { size: 46 });
    const L = 'MVDMJSUN';
    for (let i = 0; i < 8; i++) { const k = E.se(t, st + 2.2 + i * 0.2, st + 2.6 + i * 0.2, 'out'); if (k <= 0) continue;
      const x = 800 + i * 95, y = 365; F.planet(ctx, i, x, y - 58, [8, 12, 12, 9, 22, 18, 14, 14][i], { rings: i === 5 });
      INK.label(ctx, L[i], x, y + 10, { size: 52, weight: 700, align: 'center', alpha: k }); }
    INK.label(ctx, '(Güneş’e yakınlık sırası)', 1560, 440, { size: 30, align: 'right', alpha: 0.65 * E.se(t, st + 4, st + 4.6) });
    // 2. model
    P.write(ctx, '2. Atık malzemelerle modelini kur,', 330, 520, E.seg(t, st + 3.4, st + 4.6), { size: 46 });
    P.write(ctx, '    arkadaşlarınınkiyle karşılaştır, geliştir.', 330, 580, E.seg(t, st + 4.4, st + 5.6), { size: 46 });
    // 3. tartışma
    P.write(ctx, '3. Tartışın:', 330, 690, E.seg(t, sd + 0.2, sd + 0.9), { size: 46 });
    P.write(ctx, 'Canlılar başka nerede yaşayabilir?', 590, 690, E.seg(t, sd + 0.8, sd + 2.2), { size: 46, color: PAL.life });
    INK.label(ctx, 'dinle · fikrini açıkça söyle · gerekçe göster', 590, 750, { size: 32, alpha: 0.7 * E.se(t, sd + 2.4, sd + 3.0) });
    // konuşma balonları
    const bk = E.se(t, sd + 1.0, sd + 1.8, 'out');
    if (bk > 0) { P.bubble(ctx, 1480, 620, 140, 90, [1440, 700], bk, 5); P.bubble(ctx, 1600, 540, 120, 80, [1620, 610], E.se(t, sd + 1.5, sd + 2.3, 'out'), 6);
      if (bk > 0.9) { INK.label(ctx, '?', 1480, 640, { size: 50, weight: 700, align: 'center', color: '#8A4A10' }); INK.label(ctx, '!', 1600, 560, { size: 46, weight: 700, align: 'center', color: '#8A4A10' }); } }
  }

  function next(ctx, t) {
    const sn = E.s('next');
    // gündüz gökyüzü; Güneş diski önünden geçen koyu Ay (şematik, gözle bakılmaz!)
    const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,106,140,0.25)'); g.addColorStop(1, 'rgba(46,106,140,0.05)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
    const hill = P.hillLine(E.W, 960);
    const sx = 1380, sy = 380; P.sun(ctx, sx, sy, 110, t, { nrays: 20, cells: false });
    const mk = E.se(t, sn + 1.0, sn + 5.5);
    const mx = E.lerp(sx - 260, sx + 40, mk);
    P.fillPts(ctx, circlePts(mx, sy + 10, 108, 108, 50), '#2A2A36', 0.92);
    P.landscape(ctx, E.W, E.H, t, { hill, tree: false });
    const dk = E.se(t, sn + 2, sn + 5.5); ctx.save(); ctx.globalAlpha = 0.18 * dk; ctx.fillStyle = '#1E2440'; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
    DAMLA.draw(ctx, { x: 560, y: P.hillY(hill, 560) + 4, s: 1.35, view: 'front', expr: 'happy', look: [0.1, 0], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    E.inkText(ctx, 'Sıradaki gözlem:', 700, 250, t, sn + 0.6, E.e('end'), { size: 48, weight: 400, align: 'center' });
    E.inkText(ctx, '2 · Güneş ve Ay Tutulmaları', 700, 330, t, sn + 1.2, E.e('end'), { size: 66, align: 'center' });
    E.inkText(ctx, '(şematik çizim — Güneş’e asla doğrudan bakma!)', 1380, 600, t, sn + 2.0, E.e('end'), { size: 32, align: 'center', color: '#A23A2A' });
    F.endCard(ctx, t, E.s('end'), '1', 'Güneş Sistemi ve Gezegenler', 'FB.6.1.1 · FB.6.1.2');
  }

  E.scene({
    name: 'Sıra sende', concept: 'Görev ve tartışma', from: 'task', to: 'discuss', trFrom: [960, 540],
    draw(ctx, t) {
      task(ctx, t);
      DAMLA.draw(ctx, { x: 1770, y: 905, s: 0.85, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.3], blink: E.blink(t, 9), squash: E.breath(t), t, seed: 7, arms: [[-1, 0.35], [1, 2.2]] });
    }
  });
  E.scene({
    name: 'Sıradaki', concept: 'Sonraki film', from: 'next', to: 'end', trFrom: [1380, 380],
    draw(ctx, t) { next(ctx, t); }
  });
})();
