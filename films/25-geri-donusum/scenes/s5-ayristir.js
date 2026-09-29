// SAHNE 5 — Ayrıştırma (FB.5.7.1 b): geri dönüştürülebilen / dönüştürülemeyen; besin artıkları → kompost
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const RED = W7.RED;
  const REC = ['gazete', 'karton', 'camSise', 'kavanoz', 'konserve', 'icecek', 'plastikSise', 'yogurt', 'pil', 'kumas'];
  const NON = ['pecete', 'mendil', 'porselen'];
  const ORG = ['muz', 'elma'];
  const cellRec = i => [340 + (i % 5) * 180, 370 + Math.floor(i / 5) * 140];
  const cellNon = i => [1260, 360 + i * 118];
  const cellOrg = i => [330 + i * 130, 790];
  const start = key => { const s = W7.SCATTER.find(q => q[0] === key); return [960 + (s[1] - 1360) * 0.75, 560 + (s[2] - 690) * 1.1, s[3]]; };

  E.scene({
    name: 'Ayrıştır', concept: 'Geri dönüştürülebilen / dönüştürülemeyen', from: 'sort', to: 'compost', trFrom: [960, 560],
    draw(ctx, t) {
      const ss = E.s('sort'), sn = E.s('nonrec'), sc = E.s('compost');
      ctx.fillStyle = 'rgba(138,106,69,0.18)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 70, 1620, 840);
      P.write(ctx, 'Çalışma kâğıdı: Ayrıştır', 1180, 160, E.seg(t, ss + 0.3, ss + 1.5), { size: 56, align: 'center' });
      // tablo
      const tk = E.se(t, ss + 1.0, ss + 2.2);
      if (tk > 0) {
        P.drawOn(ctx, [[1180, 205], [1182, 880]], tk, { w: 2.6 });
        P.drawOn(ctx, [[240, 280], [1740, 276]], tk, { w: 2.6 });
        W7.recycle(ctx, 290, 238, 24, E.se(t, ss + 1.4, ss + 2.2), { w: 5 });
        P.write(ctx, 'geri dönüştürülebilen', 332, 256, E.seg(t, ss + 1.6, ss + 2.8), { size: 46, color: '#3F7A3A' });
        const xk = E.se(t, ss + 2.2, ss + 2.8);
        if (xk > 0) { ctx.save(); ctx.globalAlpha *= xk; stroke(ctx, circlePts(1225, 238, 22, 22, 24), { w: 3.2, closed: true, dry: false }); line(ctx, [1210, 222], [1240, 254], { w: 3.2, dry: false }); ctx.restore(); }
        P.write(ctx, 'geri dönüştürülemeyen', 1262, 256, E.seg(t, ss + 2.4, ss + 3.6), { size: 46 });
      }
      // atıklar yığından hücrelere
      const move = (key, dest, at, s1) => {
        const [x0, y0, r0] = start(key), k = E.se(t, at, at + 0.8, 'io');
        const x = E.lerp(x0, dest[0], k), y = E.lerp(y0, dest[1], k) - Math.sin(k * Math.PI) * 60;
        W7.item(ctx, key, x, y, E.lerp(0.62, s1, k), r0 * (1 - k));
      };
      REC.forEach((key, i) => move(key, cellRec(i), ss + 3.8 + i * 0.4, 0.72));
      NON.forEach((key, i) => move(key, cellNon(i), ss + 8.0 + i * 0.4, 0.72));
      ORG.forEach((key, i) => move(key, cellOrg(i), ss + 9.3 + i * 0.4, 0.72));
      // dönüştürülemeyenler: adları ve açıklama
      NON.forEach((key, i) => {
        const [x, y] = cellNon(i);
        P.write(ctx, W7.NAME[key], 1340, y + 14, E.seg(t, sn + 0.4 + i * 1.2, sn + 1.4 + i * 1.2), { size: 40 });
      });
      if (t > sn + 4.2) {
        P.write(ctx, 'kirlenmiş ya da', 1220, 745, E.seg(t, sn + 4.2, sn + 5.0), { size: 36, weight: 400 });
        P.write(ctx, 'karışık malzeme', 1220, 790, E.seg(t, sn + 4.8, sn + 5.6), { size: 36, weight: 400 });
        P.write(ctx, 'porselen cama atılmaz!', 1220, 850, E.seg(t, sn + 5.6, sn + 6.6), { size: 36, color: '#8A4A10' });
      }
      // organik şerit
      const ok = E.se(t, sc, sc + 0.8);
      if (ok > 0) {
        ctx.save(); ctx.globalAlpha *= ok; line(ctx, [240, 640], [1160, 636], { w: 1.6, alpha: 0.6, dry: false }); ctx.restore();
        P.write(ctx, 'besin artıkları', 260, 700, E.seg(t, sc + 0.1, sc + 1.0), { size: 42, color: '#3F7A3A' });
        P.arrow(ctx, [470, 790], [580, 790], E.se(t, sc + 2.4, sc + 3.0), { w: 3, head: 13 });
        const mk = E.se(t, sc + 3.0, sc + 3.8, 'out');
        if (mk > 0) {
          const mound = P.arc(680, 830, 80 * mk, Math.PI, 2 * Math.PI, 24, 50 * mk).concat([[680 - 80 * mk, 830]]);
          P.fillPts(ctx, mound, '#8A5A34', 0.8); wash(ctx, mound, '#5A3A20', 0.5, 610); stroke(ctx, mound, { w: 2.6, closed: true, seed: 611 });
          if (mk > 0.9) [[-30, -24], [10, -34], [36, -14], [-50, -8]].forEach(([dx, dy], i) => { const pp = circlePts(680 + dx, 830 + dy, 5, 3, 8); P.fillPts(ctx, pp, '#3A2614', 0.8); });
          ctx.save(); ctx.globalAlpha *= mk; line(ctx, [680, 780], [676, 752], { w: 3, color: PAL.life }); W7.leaf(ctx, 664, 750, 10, '#9CBF5A'); W7.leaf(ctx, 690, 748, 10, '#9CBF5A'); ctx.restore();
        }
        P.write(ctx, 'kompost', 790, 790, E.seg(t, sc + 3.6, sc + 4.4), { size: 50, color: '#8A5A34' });
        P.write(ctx, '→ toprağa geri kazanılır', 790, 840, E.seg(t, sc + 4.4, sc + 5.6), { size: 36, weight: 400 });
        W7.bin(ctx, 'kahve', 1085, 760, 0.42 * P.pop(E.se(t, sc + 5.2, sc + 5.8, 'out')));
        // geri dönüşüm kutusuna değil
        const nk = E.se(t, sc + 1.2, sc + 1.8);
        if (nk > 0 && t < sc + 3.4) { ctx.save(); ctx.globalAlpha *= nk * (1 - E.se(t, sc + 2.8, sc + 3.4)); W7.recycle(ctx, 620, 720, 30, 1, { w: 6 }); P.cross(ctx, 620, 720, 40, E.se(t, sc + 1.4, sc + 2.0), { w: 7, color: RED }); ctx.restore(); }
      }
      // Damla
      const pk = E.se(t, ss + 0.2, ss + 1.0, 'out');
      DAMLA.draw(ctx, { x: 1800, y: 1075 + (1 - pk) * 300, s: 0.9, view: 'q3', flip: true, expr: t > sc + 5 ? 'happy' : 'thinking', look: [-0.8, -0.5], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 2, arms: [[-1, 0.4], [1, 2.3 + Math.sin(t * 2) * 0.08]], hold: (c, res) => W7.glove(c, res[1].hand, 1) });
    }
  });
})();
