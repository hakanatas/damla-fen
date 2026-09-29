// SAHNE 7 — Karadeniz takası; Türk denizcileri, Piri Reis'in dünya haritası (1513), Mavi Vatan (D19.2, OB5)
(function () {
  const { PAL, stroke, line, wash, circlePts } = INK;
  const F = F618, BR = '#8A4A10';
  function mapCard(ctx, t, k) {
    const x0 = 1080, y0 = 160, x1 = 1780, y1 = 560;
    const pg = INK.wobble([[x0, y0], [x1, y0 + 6], [x1 - 6, y1], [x0 + 4, y1 - 4], [x0, y0]], 4, 2071);
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 20; P.fillPts(ctx, pg, '#EAD7AE'); ctx.restore();
    wash(ctx, pg, '#A07A3A', 0.35, 2072, { bleed: 2, blooms: 3 });
    stroke(ctx, pg, { w: 2.6, closed: true, seed: 2073, color: '#6A4A20' });
    // soyut kıyı çizgileri (temsilî) + pusula gülü
    ctx.save(); ctx.globalAlpha *= k;
    stroke(ctx, P.bez([x0 + 60, y0 + 60], [x0 + 200, y0 + 200], [x0 + 110, y1 - 60], 30), { w: 2.4, color: '#6A4A20', seed: 2074 });
    stroke(ctx, P.bez([x1 - 70, y0 + 50], [x1 - 240, y0 + 220], [x1 - 120, y1 - 50], 30), { w: 2.4, color: '#6A4A20', seed: 2075 });
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283; line(ctx, [cx, cy], [cx + Math.cos(a) * 170, cy + Math.sin(a) * 170], { w: 1, color: '#6A4A20', alpha: 0.45, dry: false, seed: 2076 + i }); }
    stroke(ctx, circlePts(cx, cy, 40, 40, 30), { w: 2.4, closed: true, color: '#6A4A20', dry: false });
    [[0, -1, 'K']].forEach(([dx, dy, s]) => F.txt(ctx, s, cx + dx * 62, cy + dy * 52 + 12, { size: 30, align: 'center', color: '#6A4A20' }));
    ctx.restore();
  }
  E.scene({
    name: 'Taka ve Piri Reis', concept: 'Denizcilik kültürümüz', from: 'taka', to: 'taka', trFrom: [500, 600],
    draw(ctx, t) {
      const s0 = E.s('taka');
      const g = ctx.createLinearGradient(0, 0, 0, 700); g.addColorStop(0, 'rgba(46,106,140,0.18)'); g.addColorStop(1, 'rgba(227,160,58,0.10)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      // fırtınalı Karadeniz ve taka
      F.sea(ctx, -40, 1960, 700, 1100, t, { amp: 12, alpha: 0.5, seed: 2077 });
      F.taka(ctx, 520, 700, 1.15, t);
      F.sea(ctx, -40, 1960, 730, 1100, t + 1, { amp: 10, alpha: 0.35, seed: 2078 });
      P.write(ctx, 'taka', 520, 300, E.seg(t, s0 + 0.4, s0 + 1.2), { size: 54, align: 'center', color: BR });
      INK.label(ctx, 'Karadeniz’in fırtınalarına dayanıklı ahşap tekne', 520, 350, { size: 32, align: 'center', alpha: 0.8 * E.se(t, s0 + 1.0, s0 + 1.8) });
      // harita
      const km = E.se(t, s0 + 4.0, s0 + 4.8, 'out');
      if (km > 0) E.layer(ctx, km, c => {
        mapCard(c, t, E.se(t, s0 + 4.6, s0 + 5.6));
        P.write(c, 'Piri Reis’in dünya haritası · 1513', 1430, 615, E.seg(t, s0 + 5.0, s0 + 6.4), { size: 40, align: 'center' });
        INK.label(c, '(temsilî çizim)', 1430, 655, { size: 28, align: 'center', alpha: 0.6 });
      });
      // alt şerit bilgisi
      const kn = E.se(t, s0 + 7.0, s0 + 7.8, 'out');
      if (kn > 0) E.layer(ctx, kn, c => {
        F.card(c, 300, 790, 1620, 895, { seed: 2079, fill: '#FBF3DE' });
        F.txt(c, 'Üç yanı denizlerle çevrili Mavi Vatan · Çaka Bey · Piri Reis · Barbaros Hayrettin Paşa', 960, 855, { size: 30, align: 'center' });
      });
    }
  });
})();
