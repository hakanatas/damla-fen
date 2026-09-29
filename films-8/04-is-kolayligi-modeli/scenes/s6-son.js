// SAHNE 6 — Sıra sende (performans görevi) + sonraki film: DNA (Ünite 3 "Yaşamın Gizemi")
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F8M;
  const STEPS = ['Problemi seç', 'Ölçüt ve sınırlılık yaz', 'Çiz ve yap', 'Test et, ölç', 'Karşılaştır, yenile'];
  function task(ctx, t) {
    const s = E.s('task'), s2 = E.s('task2');
    F.card(ctx, 200, 170, 1720, 870, { seed: 4500 });
    P.write(ctx, 'Sıra sende!', 270, 270, E.seg(t, s + 0.3, s + 1.2), { size: 72, color: F.FORCE });
    P.write(ctx, 'Grubunla, günlük bir işi kolaylaştıracak', 270, 360, E.seg(t, s + 1.0, s + 2.2), { size: 46 });
    P.write(ctx, 'bir basit makine modeli tasarla.', 270, 420, E.seg(t, s + 1.8, s + 3.0), { size: 46 });
    STEPS.forEach((st, i) => {
      const at = s2 + 0.2 + i * 0.8, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
      const x = 330 + i * 300, y = 620;
      ctx.save(); ctx.globalAlpha *= k;
      const c = circlePts(x, y, 110, 110, 40); P.fillPts(ctx, c, i === 4 ? '#F6E7B8' : '#FBF8F1'); stroke(ctx, INK.wobble(c, 2, 4510 + i), { w: 3, closed: true, seed: 4520 + i });
      INK.label(ctx, String(i + 1), x, y - 62, { size: 34, align: 'center', weight: 700, alpha: 0.5 });
      const words = st.split(' '); const l1 = words.slice(0, Math.ceil(words.length / 2)).join(' '), l2 = words.slice(Math.ceil(words.length / 2)).join(' ');
      F.txt(ctx, l1, x, y + 4, { size: 34, align: 'center', rot: 0 }); if (l2) F.txt(ctx, l2, x, y + 44, { size: 34, align: 'center', rot: 0 });
      if (i > 0) P.arrow(ctx, [x - 300 + 116, y], [x - 116, y], 1, { w: 3, head: 12 });
      ctx.restore();
    });
    INK.label(ctx, 'Değerlendirme: kontrol listesi ya da dereceli puanlama anahtarı', 960, 815, { size: 34, align: 'center', alpha: 0.7 * E.se(t, s2 + 4.4, s2 + 5.0) });
  }
  // DNA çift sarmal (temsilî)
  function helix(ctx, t, cx, cy, h, k) {
    const n = 160, A = 70, ph = t * 1.2; const a = [], b = [];
    for (let i = 0; i <= n; i++) { const u = i / n, y = cy - h / 2 + u * h * k; const ang = u * 3.2 * 2 * Math.PI + ph; a.push([cx + Math.sin(ang) * A, y]); b.push([cx + Math.sin(ang + Math.PI) * A, y]); }
    for (let i = 4; i < n * k; i += 8) line(ctx, a[i], b[i], { w: 3, color: [PAL.light, PAL.life, '#B5553F', PAL.water][(i / 8 | 0) % 4], dry: false, alpha: 0.8, seed: 4530 + i });
    stroke(ctx, a.slice(0, Math.max(2, Math.floor(n * k))), { w: 5, color: PAL.water, dry: false, taper: 0, noBoil: true });
    stroke(ctx, b.slice(0, Math.max(2, Math.floor(n * k))), { w: 5, color: PAL.ink, dry: false, taper: 0, noBoil: true });
  }
  function teaser(ctx, t) {
    const s = E.s('next'), se = E.s('end');
    const g = ctx.createRadialGradient(1300, 540, 50, 1300, 540, 600); g.addColorStop(0, 'rgba(111,138,58,0.18)'); g.addColorStop(1, 'rgba(111,138,58,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
    helix(ctx, t, 1300, 540, 560, E.se(t, s + 0.4, s + 3.0));
    DAMLA.draw(ctx, { x: 720, y: 870, s: 1.3, view: 'q3', expr: 'curious', look: [0.8, -0.3], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, 2.2]], prop: 'lens' });
    E.inkText(ctx, 'Sıradaki sayfa:', 700, 250, t, s + 0.4, se + 0.4, { size: 46, align: 'center', weight: 400 });
    E.inkText(ctx, 'Yaşamın Gizemi: DNA', 700, 330, t, s + 1.0, se + 0.4, { size: 64, align: 'center' });
    E.inkText(ctx, '(çizim temsilîdir)', 1300, 880, t, s + 2.0, se + 0.4, { size: 30, align: 'center', weight: 400, alpha: 0.6 });
  }
  E.scene({
    name: 'Sıra sende', concept: 'Performans görevi: model tasarla', from: 'task', to: 'task2', trFrom: [960, 540],
    draw(ctx, t) { task(ctx, t); }
  });
  E.scene({
    name: 'Sıradaki: DNA', concept: 'Ünite 3 tanıtımı', from: 'next', to: 'end', trFrom: [1300, 540],
    draw(ctx, t) { teaser(ctx, t); F.endCard(ctx, t, '4 · Kendi Makinemi Tasarlıyorum: İş Kolaylığı Modeli', 'FB.8.2.2'); }
  });
})();
