// SAHNE 1 — Merak: akşam gökyüzünde göz kırpmayan parlak nokta; sorular (FB.6.1.1 · E3.8 soru sorma)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = G61;
  E.scene({
    name: 'Merak', concept: 'Soru sorma', from: 'title', to: 'q',
    draw(ctx, t) {
      const hill = P.hillLine(E.W, 930);
      const sh = E.s('hello'), sq = E.s('q');
      ctx.save();
      E.cam(ctx, { x: 960 + 30 * E.se(t, 0, E.e('q'), 'sine'), y: 540 - 20 * E.se(t, 0, E.e('q'), 'sine'), z: 1 + 0.05 * E.se(t, 0, E.e('q'), 'sine') });
      const nk = 0.2 + 0.8 * E.se(t, 5, 8.5);
      F.night(ctx, nk);
      F.stars(ctx, t, nk, { n: 70, seed: 5, area: [0, 0, E.W, 700], avoid: [[1420, 250, 90], [960, 260, 420]] });
      // gezegen: parlak ama göz kırpmıyor (sabit ışık)
      const px = 1420, py = 250;
      const g = ctx.createRadialGradient(px, py, 2, px, py, 60); g.addColorStop(0, 'rgba(255,240,200,0.95)'); g.addColorStop(0.25, 'rgba(255,230,180,0.4)'); g.addColorStop(1, 'rgba(255,230,180,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, 60, 0, 7); ctx.fill();
      ctx.fillStyle = '#FFF6DE'; ctx.beginPath(); ctx.arc(px, py, 7, 0, 7); ctx.fill();
      P.landscape(ctx, E.W, E.H, t, { hill, treeAt: [1650, P.hillY(hill, 1650) + 6] });
      ctx.save(); ctx.globalAlpha = 0.45 * nk; P.fillPts(ctx, hill.concat([[E.W + 200, E.H + 200], [-200, E.H + 200]]), '#1E2440', 1); ctx.restore();
      // Damla
      const dx = 640, dy = P.hillY(hill, dx) + 4;
      const point = E.se(t, sh + 3.5, sh + 4.3);
      DAMLA.draw(ctx, {
        x: dx, y: dy, s: 1.4, view: 'q3', expr: t > sq ? 'thinking' : 'curious', look: [0.9, -0.8], blink: E.blink(t, 2), squash: E.breath(t), t, seed: 1,
        arms: t > sq + 0.5 ? [[-1, 0.35], [1, [40, -150], 0.4]] : [[-1, 0.35], [1, 0.35 + point * 2.2]]
      });
      if (t > sh + 4.5 && t < sq + 0.5) {
        const k = Math.min(E.se(t, sh + 4.5, sh + 5.3), 1 - E.se(t, sq, sq + 0.5));
        ctx.save(); ctx.globalAlpha = k; P.arrow(ctx, [1330, 330], [1400, 270], 1, { w: 3, color: '#FBF3DC', bend: 14, head: 14 }); ctx.restore();
        E.inkText(ctx, 'göz kırpmıyor!', 1180, 390, t, sh + 4.8, sq + 0.4, { size: 40, color: '#FBF3DC' });
      }
      ctx.restore();
      // soru balonu
      const bk = E.se(t, sq + 0.3, sq + 1.1, 'out') * (1 - E.se(t, E.e('q') - 0.5, E.e('q')));
      if (bk > 0) {
        P.bubble(ctx, 1150, 540, 780, 330, [760, 700], bk, 3);
        if (bk > 0.9) {
          P.write(ctx, 'Yıldız mı, gezegen mi?', 1150, 470, E.seg(t, sq + 0.9, sq + 2.0), { size: 50, align: 'center' });
          P.write(ctx, 'Kaç gezegen var?', 1150, 545, E.seg(t, sq + 2.4, sq + 3.4), { size: 50, align: 'center' });
          P.write(ctx, 'Hepsi birbirine benzer mi?', 1150, 620, E.seg(t, sq + 4.2, sq + 5.4), { size: 50, align: 'center' });
          ['?', '?'].forEach((q, i) => INK.label(ctx, q, 820 + i * 660, 470 + i * 120, { size: 70, weight: 700, color: PAL.light, alpha: 0.9 }));
        }
      }
      F.title(ctx, t, E.e('title') + 1.4, '1', 'Güneş Sistemi ve Gezegenler', 1);
    }
  });
})();
