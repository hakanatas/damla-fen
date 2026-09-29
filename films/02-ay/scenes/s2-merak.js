// SAHNE 2 — Merak: sorular (E3.8) + güncel bilgi: Ay'da su buzu
(function () {
  const { PAL, line, stroke, circlePts, arrowHead } = INK;
  function spin(ctx, x, y, t) { P.moon(ctx, x, y, 16); const a0 = -t * 2; const pts = P.arc(x, y, 28, a0, a0 - 4.8, 30); stroke(ctx, pts, { w: 3 }); arrowHead(ctx, pts[27], pts[30], 11, { w: 2.6 }); }
  function shine(ctx, x, y) { P.moon(ctx, x, y, 22); for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283; line(ctx, [x + Math.cos(a) * 30, y + Math.sin(a) * 30], [x + Math.cos(a) * 40, y + Math.sin(a) * 40], { w: 2.4, color: '#C07F1E', dry: false }); } }
  function mag(ctx, x, y) { P.icon.magnifier(ctx, x, y, 0.42); }
  E.scene({
    name: 'Merak', concept: 'Soru sorma ve güncel bilgi', from: 'questions', to: 'news', tr: 0.01,
    draw(ctx, t) {
      const sq = E.s('questions'), sn = E.s('news');
      ctx.save();
      E.cam(ctx, { x: 980, y: 540, z: 1.05 });
      const hill = F02.nightLand(ctx, t);
      const dx = 820, dy = P.hillY(hill, dx) + 4;
      const think = t < sn;
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.5, view: 'front', expr: think ? 'thinking' : 'determined', look: think ? [-0.5, -0.7] : [0.6, -0.2],
        blink: E.blink(t, 3), squash: E.breath(t), t, talk: E.talk(t), seed: 1, lean: think ? Math.sin(t * 1.2) * 0.03 : 0,
        arms: think ? [[-1, 0.3], [1, [30, -86]]] : [[-1, 0.35], [1, 2.2]] });
      const Q = [
        { at: sq + 2.0, x: 430, y: 330, h: 140, txt: 'Ay neden parlıyor?', ic: shine, tail: [720, 560] },
        { at: sq + 4.2, x: 1330, y: 520, h: 140, txt: 'Yüzeyi nasıl?', ic: mag, tail: [930, 600] },
        { at: sq + 6.2, x: 470, y: 640, h: 140, txt: 'Ay da döner mi?', ic: spin, tail: [730, 650] }
      ];
      const out = E.se(t, sn - 0.2, sn + 0.6);
      Q.forEach((q, i) => {
        const k = E.se(t, q.at, q.at + 0.55, 'out'); if (k <= 0 || out >= 1) return;
        E.layer(ctx, 1 - out, c => {
          c.font = '700 40px Kalam'; const w = c.measureText(q.txt).width + 190;
          P.bubble(c, q.x, q.y, w, q.h, q.tail, k, 3 + i);
          if (k > 0.6) { q.ic(c, q.x - w / 2 + 72, q.y + 2, t); P.write(c, q.txt, q.x - w / 2 + 125, q.y + 14, E.seg(t, q.at + 0.3, q.at + 1.3), { size: 40 }); }
        });
      });
      ctx.restore();
      // gazete kupürü: Ay'da buz
      const kn = E.se(t, sn + 0.4, sn + 1.2, 'out');
      if (kn > 0) {
        ctx.save(); ctx.translate(1290 + (1 - kn) * 900, 480); ctx.rotate(0.03);
        const W = 640, H = 500;
        F02.card(ctx, -W / 2, -H / 2, W, H, { fill: '#F4EEDD', seed: 31 });
        ctx.font = '700 30px Kalam'; ctx.fillStyle = PAL.ink; ctx.globalAlpha = 0.7; ctx.textAlign = 'left'; ctx.fillText('BİLİM HABERİ', -W / 2 + 40, -H / 2 + 56); ctx.globalAlpha = 1;
        line(ctx, [-W / 2 + 36, -H / 2 + 76], [W / 2 - 36, -H / 2 + 74], { w: 3, dry: false });
        P.write(ctx, 'Ay’da donmuş su bulundu!', -W / 2 + 40, -H / 2 + 140, E.seg(t, sn + 1.0, sn + 2.4), { size: 46 });
        // krater + buz çizimi
        const cx = -W / 2 + 190, cy = 110;
        const rim = P.arc(cx, cy, 150, Math.PI, 2 * Math.PI, 30, 60);
        P.fillPts(ctx, rim.concat([[cx + 150, cy + 60], [cx - 150, cy + 60]]), '#9A9387', 0.35);
        P.fillPts(ctx, P.arc(cx, cy, 150, 0, Math.PI, 30, 60), '#3B3F55', 0.75);
        stroke(ctx, circlePts(cx, cy, 150, 60, 50), { w: 2.6, closed: true, seed: 32 });
        const ice = circlePts(cx, cy + 32, 70, 16, 24); P.fillPts(ctx, ice, '#CFE3EE', 1); INK.wash(ctx, ice, PAL.water, 0.4, 33, { bleed: 1, blooms: 0 });
        INK.label(ctx, 'buz', cx + 90, cy + 110, { size: 32, weight: 700, color: PAL.water });
        ctx.font = '400 30px Kalam'; ctx.fillStyle = PAL.ink;
        ['Kutuplardaki', 'gölgeli kraterlerde', 'su buzu var.'].forEach((s, i) => { ctx.globalAlpha = E.se(t, sn + 2.4 + i * 0.4, sn + 3 + i * 0.4); ctx.fillText(s, 30, 20 + i * 44); });
        ctx.restore();
      }
    }
  });
})();
