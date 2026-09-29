// SAHNE 3 — İleri dönüşüm; yeniden kullanım / geri dönüşüm / ileri dönüşüm farkı; atıktan sanata (OB9, D7.3)
(function () {
  const { PAL, line, stroke, circlePts, wash, rng } = INK;
  const DEN = '#4A6A9A';
  function jeans(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const p = [[-50, -80], [50, -80], [56, 80], [18, 80], [4, -20], [-8, 80], [-50, 80], [-50, -80]];
    P.fillPts(ctx, p, PAL.white); wash(ctx, p, DEN, 0.75, 1000, { bleed: 1 }); stroke(ctx, p, { w: 3, closed: true, seed: 1001 });
    line(ctx, [-50, -66], [50, -66], { w: 2, dry: false }); line(ctx, [0, -80], [2, -30], { w: 1.6, dry: false, color: '#E3A03A' });
    stroke(ctx, P.arc(-30, -60, 16, 0, Math.PI, 10), { w: 1.6, dry: false, color: '#E3A03A' });
    ctx.restore();
  }
  function bag(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    stroke(ctx, P.arc(0, -46, 38, Math.PI, 2 * Math.PI, 16, 40), { w: 6, color: '#6B4A2A' });
    const b = [[-66, -46], [66, -46], [60, 60], [-60, 60], [-66, -46]];
    P.fillPts(ctx, b, PAL.white); wash(ctx, b, DEN, 0.75, 1002, { bleed: 1 }); stroke(ctx, b, { w: 3, closed: true, seed: 1003 });
    const pk = [[-30, -6], [26, -6], [24, 36], [-28, 36], [-30, -6]]; P.fillPts(ctx, pk, DEN, 0.4); INK.dashed(ctx, pk, { w: 1.6, on: 5, off: 4, color: '#E3A03A' });
    ctx.restore();
  }
  function sparkle(ctx, x, y, r, k) { if (k <= 0) return; for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + 0.3; line(ctx, [x + Math.cos(a) * r * 0.3 * k, y + Math.sin(a) * r * 0.3 * k], [x + Math.cos(a) * r * k, y + Math.sin(a) * r * k], { w: 3, color: '#C07F1E', dry: false }); } }
  function mosaic(ctx, x, y, k, t) { // şişe kapaklarından resim
    const C = 15, R = 10, S = 32, W = C * S, H = R * S;
    const fr = [[x - W / 2 - 24, y - H / 2 - 24], [x + W / 2 + 24, y - H / 2 - 24], [x + W / 2 + 24, y + H / 2 + 24], [x - W / 2 - 24, y + H / 2 + 24], [x - W / 2 - 24, y - H / 2 - 24]];
    P.fillPts(ctx, fr, '#8A6A45', 0.9); stroke(ctx, fr, { w: 3.4, closed: true, seed: 1010 });
    P.fillPts(ctx, [[x - W / 2 - 6, y - H / 2 - 6], [x + W / 2 + 6, y - H / 2 - 6], [x + W / 2 + 6, y + H / 2 + 6], [x - W / 2 - 6, y + H / 2 + 6]], '#FBF8F1');
    const n = Math.floor(C * R * k);
    for (let idx = 0; idx < n; idx++) {
      const i = idx % C, j = Math.floor(idx / C);
      const cx = x - W / 2 + S / 2 + i * S, cy = y - H / 2 + S / 2 + j * S;
      let col = '#7FB0CF';                                               // gökyüzü
      if (Math.hypot(i - 11, j - 2.2) < 2.1) col = '#E2B737';             // güneş
      if (j >= 7) col = '#4F8A45';                                        // çimen
      if (Math.hypot(i - 4.5, j - 3.6) < 2.4) col = '#3F7A3A';            // ağaç tacı
      if (i === 4 || i === 5) { if (j >= 5 && j < 7) col = '#8A5A34'; }  // gövde
      if (j === 8 && (i === 9 || i === 12)) col = '#E3A03A';              // çiçek
      P.fillPts(ctx, circlePts(cx, cy, 13, 13, 16), col, 0.95);
      stroke(ctx, circlePts(cx, cy, 13, 13, 16), { w: 1.2, closed: true, dry: false, alpha: 0.7 });
      stroke(ctx, circlePts(cx, cy, 8, 8, 12), { w: 0.8, closed: true, dry: false, alpha: 0.35 });
    }
    // şövale
    line(ctx, [x - 160, y + H / 2 + 24], [x - 220, y + H / 2 + 200], { w: 6, color: '#6B4A2A' });
    line(ctx, [x + 160, y + H / 2 + 24], [x + 220, y + H / 2 + 200], { w: 6, color: '#6B4A2A' });
  }
  E.scene({
    name: 'İleri dönüşüm', concept: 'İleri dönüşüm, farklar ve atıktan sanata', from: 'upcycle', to: 'art', trFrom: [960, 540],
    draw(ctx, t) {
      const su = E.s('upcycle'), sc = E.s('compare'), sa = E.s('art');
      ctx.save(); ctx.globalAlpha = 0.1; ctx.fillStyle = '#C07F1E'; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
      const partA = 1 - E.se(t, sa - 0.2, sa + 0.6);
      if (partA > 0) E.layer(ctx, partA, c => {
        // 1) kot → çanta (büyük) ; karşılaştırmada sağ sütuna küçülür
        const mv = E.se(t, sc + 0.2, sc + 1.2);
        const jx = E.lerp(640, 1440, mv), bx = E.lerp(1280, 1700, mv), yy = E.lerp(560, 480, mv), s = E.lerp(1.9, 1.0, mv);
        P.write(c, 'İleri dönüşüm', 1180, 180, E.seg(t, su + 0.4, su + 1.4) * (1 - mv), { size: 70, align: 'center', color: '#C07F1E' });
        const jk = E.se(t, su + 1.0, su + 1.6, 'out'); if (jk > 0) jeans(c, jx, yy, s * P.pop(jk));
        const ak = E.se(t, su + 2.2, su + 2.8); if (ak > 0) P.arrow(c, [jx + 130 * s / 1.9 * 1.4, yy], [bx - 130 * s / 1.9 * 1.4, yy], ak, { w: 4, head: 16 });
        const bk = E.se(t, su + 2.8, su + 3.4, 'out'); if (bk > 0) { bag(c, bx, yy, s * P.pop(bk)); sparkle(c, bx + 90 * s, yy - 80 * s, 26 * s / 1.4, E.se(t, su + 3.4, su + 3.8)); }
        if (mv < 1) P.write(c, 'atıktan daha değerli, yeni bir ürün', 960, 830, E.seg(t, su + 4.0, su + 5.4) * (1 - mv), { size: 48, align: 'center' });
        P.write(c, 'Farkı görelim', 1180, 180, E.seg(t, sc + 0.8, sc + 2.0), { size: 64, align: 'center' });
        // 2) üç sütun
        if (mv > 0) {
          const cols = [
            { x: 360, name: 'yeniden kullanım', a: c2 => W7.item(c2, 'kavanoz', 250, 480, 1.0), b: c2 => W7.item(c2, 'kavanoz', 470, 480, 1.0), d: 'şekli değişmez', at: sc + 0.8 },
            { x: 960, name: 'geri dönüşüm', a: c2 => W7.item(c2, 'camSise', 850, 480, 1.0), b: c2 => W7.item(c2, 'camSise', 1070, 480, 1.0), d: 'ham maddeye döner', at: sc + 3.0, mid: c2 => W7.recycle(c2, 960, 480, 26, 1, { w: 6 }) },
            { x: 1570, name: 'ileri dönüşüm', d: 'daha değerli yeni ürün', at: sc + 5.6 }
          ];
          cols.forEach((col, i) => {
            const k = E.se(t, col.at, col.at + 0.6, 'out'); if (k <= 0) return;
            c.save(); c.globalAlpha *= k;
            const fr = [[col.x - 280, 300], [col.x + 280, 296], [col.x + 284, 800], [col.x - 276, 804], [col.x - 280, 300]];
            stroke(c, fr, { w: 2.4, closed: true, seed: 1020 + i, color: i === 1 ? '#3F7A3A' : i === 2 ? '#C07F1E' : PAL.ink });
            W7.fit(c, col.name, col.x, 370, 520, 48, { color: i === 1 ? '#3F7A3A' : i === 2 ? '#C07F1E' : PAL.ink });
            if (col.a) { col.a(c); col.b(c); if (col.mid) col.mid(c); else P.arrow(c, [col.x - 50, 480], [col.x + 50, 480], 1, { w: 3, head: 12 }); }
            W7.fit(c, col.d, col.x, 720, 520, 40, { weight: 400 });
            c.restore();
          });
        }
      });
      // 3) atıktan sanata
      const artK = E.se(t, sa + 0.1, sa + 0.8);
      if (artK > 0) E.layer(ctx, artK, c => {
        P.write(c, 'Atıktan sanata', 1180, 180, E.seg(t, sa + 0.5, sa + 1.6), { size: 70, align: 'center', color: '#C07F1E' });
        mosaic(c, 860, 500, E.seg(t, sa + 0.8, sa + 5.0), t);
        const ck = E.se(t, sa + 5.2, sa + 6.0, 'out');
        if (ck > 0) { [[1330, 420], [1400, 470], [1350, 520]].forEach(([x, y], i) => { const col = ['#3E74B0', '#E2B737', '#4F8A45'][i]; P.fillPts(c, circlePts(x, y, 16 * ck, 16 * ck, 16), col); stroke(c, circlePts(x, y, 16 * ck, 16 * ck, 16), { w: 1.6, closed: true, dry: false }); }); P.write(c, 'şişe kapakları', 1370, 600, E.seg(t, sa + 5.6, sa + 6.6), { size: 40, align: 'center' }); P.arrow(c, [1290, 470], [1140, 470], E.se(t, sa + 6.0, sa + 6.6), { w: 3, head: 13 }); }
      });
      const artOn = t > sa;
      DAMLA.draw(ctx, { x: artOn ? 1620 : 1800, y: artOn ? 900 : 1075, s: artOn ? 1.2 : 0.85, view: 'q3', flip: true, expr: artOn ? 'happy' : 'curious', look: [-0.8, -0.4], blink: E.blink(t, 6), squash: E.breath(t), t, talk: E.talk(t), seed: 2, arms: [[-1, 0.4], [1, 2.2]], prop: artOn ? 'lens' : null, propTilt: -0.6 });
    }
  });
})();
