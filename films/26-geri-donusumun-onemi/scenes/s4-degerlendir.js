// SAHNE 4–5 — Verileri değerlendirme (FB.5.7.2 c) ve bilimsel çıkarım
(function () {
  const { PAL, line, stroke, circlePts, rng, wash } = INK;
  const CARDS = [[520, 385], [1400, 385], [520, 722], [1400, 722]];
  function card(ctx, x, y, k, seed) {
    ctx.save(); ctx.translate(x, y); ctx.scale(P.pop(k), P.pop(k));
    const c = [[-390, -150], [390, -154], [394, 150], [-386, 154], [-390, -150]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.2)'; ctx.shadowBlur = 16; P.fillPts(ctx, c, '#FAF6EC'); ctx.restore();
    stroke(ctx, c, { w: 2.6, closed: true, seed });
    ctx.restore();
  }
  function mound(ctx, x, y, w, h, seed) {
    const m = P.arc(x, y, w, Math.PI, 2 * Math.PI, 30, h).concat([[x - w, y]]);
    P.fillPts(ctx, m, '#C9BFA8'); wash(ctx, m, '#6B6358', 0.45, seed); stroke(ctx, m, { w: 2.6, closed: true, seed: seed + 1 });
    const R = rng(seed); for (let i = 0; i < Math.round(w / 6); i++) { const a = Math.PI + 0.2 + R() * (Math.PI - 0.4), d = 0.3 + R() * 0.6; ctx.save(); ctx.globalAlpha *= 0.7; ctx.fillStyle = ['#3E74B0', '#E2B737', '#4F8A45', '#8E8E8E', '#2E2D33'][i % 5]; ctx.fillRect(x + Math.cos(a) * w * d - 4, y + Math.sin(a) * h * d - 3, 9, 6); ctx.restore(); }
  }
  E.scene({
    name: 'Değerlendir', concept: 'Verileri değerlendirme: geri dönüşüm neyi korur?', from: 'evaluate', to: 'landfill', trFrom: [960, 540],
    draw(ctx, t) {
      const sv = E.s('evaluate'), sr = E.s('raw'), se = E.s('energy'), sg = E.s('glass'), sl = E.s('landfill');
      ctx.save(); ctx.globalAlpha = 0.1; ctx.fillStyle = PAL.life; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
      P.write(ctx, 'Geri dönüşüm neleri korur?', 1180, 180, E.seg(t, sv + 0.5, sv + 1.8), { size: 60, align: 'center' });
      if (t > sv + 1.8) P.drawOn(ctx, P.bez([860, 202], [1180, 212], [1500, 198], 30), E.se(t, sv + 1.8, sv + 2.3), { w: 3, color: PAL.life });
      const at = [sr, se, sg, sl];
      CARDS.forEach(([x, y], i) => { const k = E.se(t, at[i] + 0.1, at[i] + 0.7, 'out'); if (k > 0) card(ctx, x, y, k, 880 + i); });
      // 1) ham madde: kâğıt → geri dönüşüm → ağaç korunur
      if (t > sr + 0.6) {
        const [x, y] = CARDS[0];
        W7.item(ctx, 'gazete', x - 270, y - 30, 0.9);
        P.arrow(ctx, [x - 200, y - 30], [x - 130, y - 30], E.se(t, sr + 0.9, sr + 1.4), { w: 3, head: 12 });
        W7.recycle(ctx, x - 70, y - 30, 38, E.se(t, sr + 1.2, sr + 2.0), { w: 7 });
        P.arrow(ctx, [x - 20, y - 30], [x + 50, y - 30], E.se(t, sr + 2.0, sr + 2.5), { w: 3, head: 12 });
        const tk = E.se(t, sr + 2.4, sr + 3.0, 'out');
        if (tk > 0) { W7.tree(ctx, x + 130, y + 60, 0.62 * P.pop(tk), 9, t); W7.tree(ctx, x + 260, y + 60, 0.55 * P.pop(tk), 10, t); }
        P.write(ctx, 'ağaç korunur, ham madde korunur', x, y + 118, E.seg(t, sr + 3.2, sr + 4.6), { size: 38, align: 'center', color: '#3F7A3A' });
      }
      // 2) enerji: madenden vs geri dönüşümle (alüminyum)
      if (t > se + 0.6) {
        const [x, y] = CARDS[1];
        W7.item(ctx, 'icecek', x - 320, y - 20, 0.8);
        INK.label(ctx, 'madenden', x - 240, y - 58, { size: 34, weight: 700 });
        INK.label(ctx, 'geri dönüşümle', x - 240, y + 30, { size: 34, weight: 700 });
        const b1 = E.se(t, se + 1.2, se + 3.0), b2 = E.se(t, se + 3.0, se + 3.6);
        const L = 360, bx = x - 10;
        if (b1 > 0) { const b = [[bx, y - 82], [bx + L * b1, y - 84], [bx + L * b1, y - 48], [bx, y - 46], [bx, y - 82]]; P.fillPts(ctx, b, PAL.light, 0.8); stroke(ctx, b, { w: 2.4, closed: true, dry: false }); }
        if (b2 > 0) { const w = L * 0.05 * b2 + 2; const b = [[bx, y + 6], [bx + w, y + 5], [bx + w, y + 41], [bx, y + 42], [bx, y + 6]]; P.fillPts(ctx, b, PAL.light, 0.8); stroke(ctx, b, { w: 2.4, closed: true, dry: false }); }
        INK.label(ctx, 'enerji', x + 250, y + 36, { size: 34, alpha: 0.6 * b2 });
        P.write(ctx, 'çok daha az enerji', x, y + 100, E.seg(t, se + 4.0, se + 5.0), { size: 40, align: 'center', color: '#C07F1E' });
        INK.label(ctx, '(alüminyumda yaklaşık %95 daha az)', x, y + 138, { size: 30, align: 'center', alpha: 0.7 * E.se(t, se + 5.0, se + 5.8) });
      }
      // 3) cam tekrar tekrar
      if (t > sg + 0.6) {
        const [x, y] = CARDS[2];
        [-270, -20, 230].forEach((dx, j) => {
          const k = E.se(t, sg + 0.8 + j * 0.9, sg + 1.3 + j * 0.9, 'out'); if (k <= 0) return;
          W7.item(ctx, 'camSise', x + dx, y - 20, 0.9 * P.pop(k));
          if (j < 2) { W7.recycle(ctx, x + dx + 125, y - 30, 26, E.se(t, sg + 1.2 + j * 0.9, sg + 1.7 + j * 0.9), { w: 6 }); }
        });
        INK.label(ctx, '…', x + 330, y - 10, { size: 50, alpha: E.se(t, sg + 3.0, sg + 3.4) });
        P.write(ctx, 'kalitesi bozulmadan, tekrar tekrar', x, y + 112, E.seg(t, sg + 3.0, sg + 4.4), { size: 38, align: 'center', color: '#3F7A3A' });
      }
      // 4) depolama alanı
      if (t > sl + 0.6) {
        const [x, y] = CARDS[3];
        const k1 = E.se(t, sl + 0.8, sl + 1.6, 'out'), k2 = E.se(t, sl + 2.0, sl + 2.8, 'out');
        if (k1 > 0) mound(ctx, x - 190, y + 40, 150 * k1, 120 * k1, 890);
        if (k2 > 0) mound(ctx, x + 200, y + 40, 90 * k2, 55 * k2, 895);
        INK.label(ctx, 'geri dönüşüm olmadan', x - 190, y - 100, { size: 32, align: 'center', alpha: k1 });
        INK.label(ctx, 'geri dönüşümle', x + 200, y - 100, { size: 32, align: 'center', alpha: k2 });
        P.write(ctx, 'depolama alanı daha yavaş dolar', x, y + 112, E.seg(t, sl + 3.4, sl + 4.8), { size: 38, align: 'center', color: '#3F7A3A' });
      }
    }
  });

  E.scene({
    name: 'Çıkarım', concept: 'Bilimsel çıkarım', from: 'infer', to: 'infer', trFrom: [960, 540],
    draw(ctx, t) {
      const si = E.s('infer');
      ctx.save(); ctx.globalAlpha = 0.14; ctx.fillStyle = PAL.life; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
      // kaynak döngüsü süsü
      W7.tree(ctx, 330, 800, 1.1, 11, t); W7.tree(ctx, 1600, 800, 0.9, 12, t);
      const card = [[420, 220], [1500, 210], [1510, 760], [430, 772], [420, 220]];
      const k = E.se(t, si + 0.1, si + 0.8, 'out');
      E.layer(ctx, k, c => {
        c.save(); c.shadowColor = 'rgba(40,30,20,0.25)'; c.shadowBlur = 26; P.fillPts(c, card, '#FAF6EC'); c.restore(); stroke(c, card, { w: 3.4, closed: true, color: '#3F7A3A' });
        P.write(c, 'Çıkarımım', 960, 320, E.seg(t, si + 0.6, si + 1.4), { size: 60, align: 'center', color: '#3F7A3A' });
        P.write(c, 'Geri dönüşüm, kaynaklarımızı', 960, 430, E.seg(t, si + 1.4, si + 2.8), { size: 54, align: 'center' });
        P.write(c, 've enerjimizi korur.', 960, 500, E.seg(t, si + 2.6, si + 3.8), { size: 54, align: 'center' });
        P.drawOn(c, P.bez([620, 536], [960, 548], [1300, 530], 30), E.se(t, si + 3.8, si + 4.4), { w: 3, color: PAL.life });
        P.write(c, '→ Kaynakların etkili kullanımı için önemlidir.', 960, 640, E.seg(t, si + 4.8, si + 6.4), { size: 44, align: 'center', color: '#3F7A3A' });
      });
      W7.recycle(ctx, 960, 850, 42, E.se(t, si + 6.4, si + 7.6), { w: 8 });
      DAMLA.draw(ctx, { x: 1740, y: 1075, s: 0.95, view: 'q3', flip: true, expr: 'determined', look: [-0.7, -0.4], blink: E.blink(t, 7), squash: E.breath(t), t, talk: E.talk(t), seed: 2, arms: [[-1, 0.4], [1, 2.4 + 0.1 * Math.sin(t * 3)]] });
    }
  });
})();
