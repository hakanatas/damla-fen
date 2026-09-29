// SAHNE 1 — Başlık + Merak: Damla topu yakalar; haberi kim taşıdı?
(function () {
  const { PAL, stroke } = INK; const K = KIT, F = F09;
  E.scene({
    name: 'Merak', concept: 'Topu yakalama: haberleşme sorusu', from: 'title', to: 'question',
    draw(ctx, t) {
      const sc = E.s('catch'), sq = E.s('question');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,106,140,0.08)'); g.addColorStop(1, 'rgba(111,138,58,0.12)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      stroke(ctx, [[60, 884], [1860, 880]], { w: 3, seed: 8001 });
      const fly = E.se(t, sc + 1.0, sc + 3.0, 'out'), caught = t > sc + 3.0;
      const bx = E.lerp(1900, 760, fly), by = E.lerp(260, 505, fly) - Math.sin(fly * Math.PI) * 160;
      K.damla(ctx, t, { x: 760, y: 880, s: 1.5, view: 'front', expr: caught ? (t < sq ? 'happy' : 'thinking') : 'surprised', look: caught ? [0, -0.8] : [0.9, -0.6],
        arms: t > sc + 2.2 ? [[-1, 2.75], [1, 2.75]] : [[-1, 0.4], [1, 0.4]] });
      if (t > sc + 0.9) F.ball(ctx, bx, by, 44, t * (caught ? 0 : 6));
      if (caught && t < sq) K.text(ctx, 'Hop!', 960, 450, { size: 70, color: PAL.light, alpha: E.se(t, sc + 3.0, sc + 3.4) * (1 - E.se(t, sq - 0.6, sq)) });
      // soru zinciri
      const n1 = E.se(t, sq + 0.3, sq + 0.9, 'out'), n2 = E.se(t, sq + 2.0, sq + 2.6, 'out'), n3 = E.se(t, sq + 1.2, sq + 1.8, 'out');
      K.node(ctx, 'Göz topu gördü', 1450, 290, n1, { size: 44, seed: 1 });
      K.node(ctx, 'Kollar harekete geçti', 1450, 650, n3, { size: 44, seed: 2 });
      if (n2 > 0) { P.arrow(ctx, [1450, 340], [1450, 410], n2, { w: 3, head: 12 }); P.arrow(ctx, [1450, 530], [1450, 600], n2, { w: 3, head: 12 }); K.node(ctx, '? haberi kim taşıdı', 1450, 470, n2, { size: 44, tint: PAL.light, seed: 3 }); }
      K.title(ctx, t, 9, 'Vücudumuzun Haberleşme Ağı: Sinir Sistemi', 3);
    }
  });
})();
