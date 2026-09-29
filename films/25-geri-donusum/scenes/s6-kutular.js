// SAHNE 6 — Gruplandırma ve etiketleme (FB.5.7.1 c, ç): Sıfır Atık kutu renkleri
(function () {
  const { PAL, line, stroke } = INK;
  const ORDER = ['mavi', 'sari', 'yesil', 'gri', 'kahve', 'siyah'];
  const GROUPS = { mavi: ['gazete', 'karton'], sari: ['plastikSise', 'yogurt'], yesil: ['camSise', 'kavanoz'], gri: ['konserve', 'icecek'], kahve: ['muz', 'elma'], siyah: ['mendil', 'pecete', 'porselen'] };
  const BX = i => 330 + i * 280, BY = 810, BS = 0.8;
  const ALL = ORDER.flatMap(k => GROUPS[k]).concat(['pil', 'kumas']);

  E.scene({
    name: 'Kutular', concept: 'Gruplandır ve etiketle: Sıfır Atık', from: 'group', to: 'colors', trFrom: [960, 300],
    draw(ctx, t) {
      const sg = E.s('group'), sc = E.s('colors');
      // zemin
      ctx.save(); ctx.globalAlpha = 0.12; ctx.fillStyle = PAL.life; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
      const fl = [[-10, BY + 2], [E.W + 10, BY - 2], [E.W + 10, E.H + 10], [-10, E.H + 10], [-10, BY + 2]];
      P.fillPts(ctx, fl, '#E8DDC6', 1); INK.wash(ctx, fl, '#8A6A45', 0.2, 620, { bleed: 2 }); stroke(ctx, [[-10, BY + 2], [E.W + 10, BY - 2]], { w: 3.4, taper: 0.02 });
      P.write(ctx, 'Sıfır Atık kutuları', 1180, 170, E.seg(t, sg + 5.0, sg + 6.2), { size: 62, align: 'center' });
      if (t > sg + 6.2) P.drawOn(ctx, P.bez([900, 190], [1180, 200], [1460, 186], 30), E.se(t, sg + 6.2, sg + 6.7), { w: 3, color: PAL.life });
      // kutular
      ORDER.forEach((key, i) => {
        const k = E.se(t, sg + 4.2 + i * 0.18, sg + 4.8 + i * 0.18, 'out'); if (k <= 0) return;
        const at = sc + 0.3 + i * 1.8;
        const lid = Math.min(E.se(t, at, at + 0.4), 1 - E.se(t, at + 1.4, at + 1.8));
        const labA = E.se(t, at + 0.6, at + 1.2);
        W7.bin(ctx, key, BX(i), BY, BS * P.pop(k), { lid });
        if (labA > 0) { // etiket
          ctx.save(); ctx.globalAlpha *= labA;
          const tag = W7.rr(BX(i) - 115, BY + 22, 230, 60, 10); P.fillPts(ctx, tag, PAL.white, 0.95); stroke(ctx, tag, { w: 2.2, closed: true, dry: false, seed: 630 + i });
          INK.inkDot(ctx, BX(i) - 98, BY + 52, 4);
          W7.fit(ctx, W7.BINS[key].name, BX(i) + 8, BY + 66, 190, 40);
          ctx.restore();
          P.write(ctx, W7.BINS[key].tr, BX(i), 580, labA, { size: 46, align: 'center', color: key === 'sari' ? '#A4801A' : W7.BINS[key].col });
        }
      });
      // atıklar: önce üstte sıra, sonra kutularının üstünde gruplar, sonra kutuya
      ALL.forEach((key, j) => {
        const bin = ORDER.find(b => GROUPS[b].includes(key));
        const x0 = 150 + j * 108, y0 = 300;
        let x, y, s = 0.62, a = 1;
        const ap = E.se(t, sg + 0.2 + j * 0.08, sg + 0.8 + j * 0.08, 'out');
        if (ap <= 0) return;
        if (bin) {
          const i = ORDER.indexOf(bin), g = GROUPS[bin], n = g.indexOf(key);
          const gx = BX(i) + (n - (g.length - 1) / 2) * (g.length > 2 ? 78 : 92), gy = 440;
          const km = E.se(t, sg + 1.8 + i * 0.3, sg + 2.8 + i * 0.3);
          x = E.lerp(x0, gx, km); y = E.lerp(y0, gy, km) - Math.sin(km * Math.PI) * 50;
          const at = sc + 0.3 + i * 1.8, kd = E.seg(t, at + 0.3 + n * 0.12, at + 0.9 + n * 0.12);
          if (kd > 0) { x = E.lerp(gx, BX(i), kd); y = E.lerp(gy, BY - 170, E.ease.in(kd)); s = 0.62 * (1 - 0.5 * kd); a = 1 - E.seg(kd, 0.7, 1); }
        } else { // pil ve kumaş ayrı: sağ üstte bekler
          const km = E.se(t, sg + 3.8, sg + 4.6), n = key === 'pil' ? 0 : 1;
          x = E.lerp(x0, 1590 + n * 140, km); y = E.lerp(y0, 250, km);
          if (km > 0.5) W7.fit(ctx, '(ayrı toplanır)', 1660, 322, 300, 34, { alpha: E.se(t, sg + 4.4, sg + 5.0), color: '#8A4A10' });
        }
        W7.item(ctx, key, x, y, s * P.pop(ap), 0, a);
      });
      // Damla sol altta
      DAMLA.draw(ctx, { x: 110, y: 1075, s: 0.95, view: 'q3', expr: t > sc + 11 ? 'happy' : 'curious', look: [0.8, -0.5], blink: E.blink(t, 10), squash: E.breath(t), t, talk: E.talk(t), seed: 3, arms: [[-1, 0.4], [1, 2.2 + Math.sin(t * 2) * 0.08]], hold: (c, res) => W7.glove(c, res[1].hand, 1) });
    }
  });
})();
