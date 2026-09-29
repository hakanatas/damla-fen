// SAHNE 10 — Sıra sende (poster performans görevi) · Sıradaki: Sinir Sistemi · Bitiş kartı
(function () {
  const { PAL, stroke, line, circlePts } = INK; const K = KIT;
  function nerveIcon(c, t) { // sade sinir ağı simgesi: merkez + dallanan çizgiler, kehribar sinyal
    const cx = 960, cy = 600, sn = E.s('next');
    const k = E.se(t, sn + 1.2, sn + 2.4);
    if (k <= 0) return;
    c.save(); c.globalAlpha = k;
    const br = []; for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.5; const p = P.bez([cx, cy], [cx + Math.cos(a) * 90, cy + Math.sin(a) * 90 + 40], [cx + Math.cos(a) * 190, cy + Math.sin(a) * 150 + 90], 20); br.push(p); stroke(c, p, { w: 3, color: PAL.ink, seed: 7900 + i }); }
    const body = K.blob(cx, cy, 34, 30, 7910, 0.1); P.fillPts(c, body, '#F6ECCF'); INK.wash(c, body, PAL.life, 0.4, 7911, { bleed: 1, blooms: 0 }); stroke(c, body, { w: 3, closed: true });
    br.forEach((p, i) => { const u = ((t * 0.6 + i * 0.37) % 1); const q = p[Math.floor(u * (p.length - 1))]; INK.inkDot(c, q[0], q[1], 6, { color: '227,160,58' }); });
    c.restore();
  }
  E.scene({
    name: 'Sıra sende', concept: 'Poster görevi; sıradaki konu', from: 'task', to: 'end', trFrom: [960, 450],
    draw(ctx, t) {
      K.outro(ctx, t, {
        task: ['Ergenliği sağlıklı geçirmek için neler', 'yapılabilir? Arkadaşlarınla bir poster', 'hazırla ve sınıfta sun.'],
        taskNote: 'İpucu: Bir sağlık uzmanıyla kısa bir röportaj yapabilirsin.',
        nextTitle: '9 · Vücudumuzun Haberleşme Ağı: Sinir Sistemi', icon: nerveIcon
      });
      K.end(ctx, t, 8, 'İnsanda Üreme ve Ergenlik', 'FB.6.3.5 · FB.6.3.8');
    }
  });
})();
