// SAHNE 7 — Özel toplama: atık pil kutusu, atık yağ kumbarası, tekstil kutusu (TYMM: atık pil kutuları, atık yağ kumbaraları)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const RED = W7.RED;
  const GY = 800;
  const BOX = [{ x: 640, draw: (c, s) => W7.pilBox(c, 640, GY, s), top: GY - 186, lab: 'atık pil kutusu' },
    { x: 1140, draw: (c, s) => W7.oilBin(c, 1140, GY, s), top: GY - 206, lab: 'atık yağ kumbarası' },
    { x: 1630, draw: (c, s) => W7.textileBox(c, 1630, GY, s), top: GY - 206, lab: 'tekstil kutusu' }];
  function sink(ctx, x, y) {
    const b = [[x - 110, y - 20], [x + 110, y - 20], [x + 80, y + 50], [x - 80, y + 50], [x - 110, y - 20]];
    P.fillPts(ctx, b, PAL.white); INK.wash(ctx, b, '#9A9387', 0.35, 640); stroke(ctx, b, { w: 3, closed: true, seed: 641 });
    stroke(ctx, [[x + 60, y - 20], [x + 60, y - 90], [x + 20, y - 90], [x + 20, y - 72]], { w: 6, taper: 0.02, seed: 642 });
    P.fillPts(ctx, circlePts(x, y + 30, 12, 5, 16), PAL.ink, 0.8);
  }
  E.scene({
    name: 'Özel kutular', concept: 'Atık pil, atık yağ, tekstil', from: 'battery', to: 'textile', trFrom: [640, 700],
    draw(ctx, t) {
      const sb = E.s('battery'), so = E.s('oil'), sx = E.s('textile');
      ctx.save(); ctx.globalAlpha = 0.1; ctx.fillStyle = PAL.water; ctx.fillRect(0, 0, E.W, GY); ctx.restore();
      const fl = [[-10, GY + 2], [E.W + 10, GY - 2], [E.W + 10, E.H + 10], [-10, E.H + 10], [-10, GY + 2]];
      P.fillPts(ctx, fl, '#E3DCCB', 1); INK.wash(ctx, fl, '#9A9387', 0.25, 650, { bleed: 2 }); stroke(ctx, [[-10, GY + 2], [E.W + 10, GY - 2]], { w: 3.4, taper: 0.02 });
      for (let i = 0; i < 12; i++) line(ctx, [i * 170 + 40, GY + 4], [i * 170 - 20, E.H], { w: 1.2, alpha: 0.3, dry: false, seed: 660 + i });
      // kutular
      BOX.forEach((b, i) => {
        const k = E.se(t, sb + 0.2 + i * 0.35, sb + 0.8 + i * 0.35, 'out'); if (k <= 0) return;
        b.draw(ctx, P.pop(k));
        const la = [sb + 3.0, so + 0.5, sx + 0.5][i];
        P.write(ctx, b.lab, b.x, GY + 62, E.seg(t, la, la + 1.0), { size: 40, align: 'center' });
      });
      // PİL: çöp kovasına değil
      const pk = E.se(t, sb + 3.6, sb + 4.2, 'out');
      if (pk > 0) {
        const fade = 1 - E.se(t, sb + 8.0, sb + 8.6);
        E.layer(ctx, fade, c => {
          W7.kitchenCan(c, 560, 470, 0.55 * P.pop(pk));
          W7.item(c, 'pil', 560, 330, 0.7, 0.4);
          P.arrow(c, [560, 360], [560, 400], pk, { w: 3, head: 11 });
          P.cross(c, 560, 400, 70, E.se(t, sb + 4.2, sb + 4.8), { w: 10, color: RED });
          P.write(c, 'çöpe değil!', 700, 390, E.seg(t, sb + 4.6, sb + 5.4), { size: 44, color: RED });
        });
      }
      // pil kutuya
      const pf = E.seg(t, sb + 8.2, sb + 9.2);
      if (pf > 0 && pf < 1) W7.item(ctx, 'pil', E.lerp(560, 640, pf), E.lerp(330, BOX[0].top - 10, E.ease.in(pf)), 0.6, -0.4 + pf * 1.2);
      // YAĞ: lavaboya değil
      const ok = E.se(t, so + 0.8, so + 1.4, 'out');
      if (ok > 0) {
        const fade = 1 - E.se(t, so + 6.2, so + 6.8);
        E.layer(ctx, fade, c => {
          c.save(); c.translate(1140, 420); c.scale(0.8 * P.pop(ok), 0.8 * P.pop(ok)); sink(c, 0, 0); c.restore();
          const drop = P.bez([1110, 300], [1090, 334], [1110, 344], 8).concat(P.bez([1110, 344], [1130, 334], [1110, 300], 8)); P.fillPts(c, drop, '#C8962E', 0.9); stroke(c, drop, { w: 2, closed: true, dry: false });
          P.cross(c, 1140, 410, 80, E.se(t, so + 1.6, so + 2.2), { w: 10, color: RED });
          P.write(c, 'lavaboya değil!', 1140, 300, E.seg(t, so + 2.0, so + 2.8), { size: 44, align: 'center', color: RED });
        });
        // soğuyunca şişeye → kumbaraya
        const bk = E.se(t, so + 3.4, so + 4.0, 'out');
        if (bk > 0) {
          const f = E.seg(t, so + 6.0, so + 7.2);
          const x = E.lerp(1300, 1140, f), y = E.lerp(520, BOX[1].top - 40, E.ease.in(f));
          if (f < 1) W7.item(ctx, 'yag', x, y, 0.8 * P.pop(bk) * (1 - 0.3 * f), -f * 0.6);
          if (f === 0) P.write(ctx, 'soğuyunca şişeye', 1390, 470, E.seg(t, so + 3.8, so + 4.8), { size: 38, weight: 400 });
        }
      }
      // TEKSTİL
      const tk = E.se(t, sx + 0.3, sx + 0.9, 'out');
      if (tk > 0) {
        const f = E.seg(t, sx + 2.0, sx + 3.2);
        if (f < 1) W7.item(ctx, 'kumas', E.lerp(1630, 1630, f), E.lerp(420, BOX[2].top + 10, E.ease.in(f)), 0.8 * P.pop(tk) * (1 - 0.4 * f), f * 0.5);
        P.write(ctx, 'temiz kumaşlar', 1630, 300, E.seg(t, sx + 0.6, sx + 1.6), { size: 44, align: 'center' });
      }
      // Damla solda
      DAMLA.draw(ctx, { x: 220, y: GY + 6, s: 1.2, view: 'q3', expr: t > sx + 3 ? 'happy' : 'determined', look: [0.8, -0.2], blink: E.blink(t, 12), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.4], [1, 1.9 + Math.sin(t * 2) * 0.08]], hold: (c, res) => { W7.glove(c, res[1].hand, 1); W7.glove(c, res[-1].hand, -1); } });
    }
  });
})();
