// SAHNE 1 — Damlayan musluk (köprü kurma: kullanılan su kaynakları); problem sorusu
(function () {
  const { PAL, line, stroke, wash } = INK;
  const F = F723;
  F.tiles = (ctx, night = 0) => {
    const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,106,140,0.14)'); g.addColorStop(1, 'rgba(46,106,140,0.04)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
    ctx.save(); ctx.globalAlpha = 0.18; ctx.strokeStyle = PAL.water; ctx.lineWidth = 1.5;
    for (let x = 0; x < E.W; x += 120) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 640); ctx.stroke(); }
    for (let y = 40; y < 640; y += 120) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(E.W, y); ctx.stroke(); }
    ctx.restore();
    if (night > 0) { ctx.save(); ctx.globalAlpha = 0.35 * night; ctx.fillStyle = '#1C2440'; ctx.fillRect(0, 0, E.W, E.H); ctx.restore(); }
  };
  E.scene({
    name: 'Damlayan musluk', concept: 'Problemi fark etme', from: 'title', to: 'question',
    draw(ctx, t) {
      const sh = E.s('hook'), sq = E.s('question');
      const night = 1 - E.se(t, sh + 3.0, sh + 4.5);
      F.tiles(ctx, night);
      // tezgâh
      F.shape(ctx, [[760, 640], [1560, 640], [1560, 900], [760, 900]], '#8A6A45', 0.35, 3500);
      F.sink(ctx, 1160, 640, 420, 1);
      F.tap(ctx, 1160, 440, 1.2, t, { fall: 240 });
      // "tık" yazıları
      for (let i = 0; i < 3; i++) { const k = ((t * 0.9 + 0.1) % 1); const on = Math.floor(t * 0.9 + 0.1) % 3 === i; if (on && k < 0.4 && t > sh) F.fit(ctx, 'tık', 1260 + i * 60, 700 - i * 30, 120, 42, { alpha: 1 - k * 2.5, color: PAL.white }); }
      // gece: ay penceresi
      if (night > 0) { ctx.save(); ctx.globalAlpha *= night; P.moon(ctx, 1700, 230, 50); ctx.restore(); }
      const wake = E.se(t, sh + 2.6, sh + 3.4);
      F.damla(ctx, t, { x: 470, y: 890, s: 1.3, view: 'q3', expr: wake < 0.5 ? 'sleepy' : (t > sq ? 'thinking' : 'surprised'), look: [0.9, -0.2], blink: wake < 0.5 ? 0.7 : E.blink(t, 3) });
      const bk = E.se(t, sq + 0.2, sq + 0.9);
      if (bk > 0) {
        P.bubble(ctx, 960, 215, 900, 190, [560, 560], bk, 4);
        P.write(ctx, 'Kaynakları neden', 960, 200, E.seg(t, sq + 0.6, sq + 1.6), { size: 52, align: 'center' });
        P.write(ctx, 'tasarruflu kullanmalıyız?', 960, 265, E.seg(t, sq + 1.4, sq + 2.6), { size: 52, align: 'center', color: PAL.water });
      }
      F.title(ctx, t, '23 · Kaynakların Tasarruflu Kullanımı', 'Fen Bilimleri · 7. sınıf · Ünite 7', PAL.water);
    }
  });
})();
