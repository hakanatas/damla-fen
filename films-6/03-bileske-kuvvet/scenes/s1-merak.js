// SAHNE 1 — Merak: ağır kutu; tek kuvvet yetmez, aynı yönde ikinci kuvvet eklenince kutu kayar → soru
(function () {
  const { PAL, line, stroke } = INK;
  const FY = 820;
  E.scene({
    name: 'Merak', concept: 'Birden fazla kuvvet', from: 'title', to: 'question',
    draw(ctx, t) {
      const sh = E.s('hello'), sp = E.s('push'), sq = E.s('question');
      ctx.save(); E.cam(ctx, { x: 960, y: 540, z: 1 + 0.03 * E.se(t, 0, E.e('question'), 'sine') });
      ctx.save(); ctx.globalAlpha = 0.1; ctx.fillStyle = PAL.water; ctx.fillRect(-100, -100, 2200, FY + 100); ctx.restore();
      F63.floor(ctx, FY);
      // board on wall
      const bk = E.se(t, E.e('title') + 0.8, E.e('title') + 2);
      if (bk > 0) E.layer(ctx, bk, c => {
        const bd = [[1280, 150], [1760, 146], [1764, 430], [1282, 434], [1280, 150]];
        P.fillPts(c, bd, '#3F5A4A', 0.85); stroke(c, bd, { w: 4, closed: true, seed: 3101 });
        INK.label(c, 'Fen Bilimleri', 1330, 230, { size: 40, color: '#F1EADB', alpha: 0.8 });
        INK.label(c, 'Kuvvet ve hareket', 1330, 300, { size: 36, color: '#F1EADB', alpha: 0.6 });
      });
      // box motion: shakes while Damla alone, slides when friend helps
      const shake = t > sp + 0.8 && t < sp + 3.4 ? Math.sin(t * 45) * 2.5 : 0;
      const slide = 240 * E.se(t, sp + 4.6, sp + 7.4, 'in') ;
      const cx = 900 + slide + shake;
      F63.box(ctx, cx, FY, 200, 160);
      // Damla walks in during hello, pushes during push
      const wk = E.se(t, sh + 0.2, sh + 3.0, 'io');
      const pushX = cx - 100 - 58;
      const dx = E.lerp(-160, 560, wk) + (t > sh + 3.0 ? E.se(t, sp + 0.1, sp + 0.7) * (pushX - 560) : 0);
      const pushing = t > sp + 0.6 && t < sq + 0.5;
      DAMLA.draw(ctx, {
        x: dx, y: FY + 2 - (wk > 0 && wk < 1 ? Math.abs(Math.sin(t * 7)) * 8 : 0), s: 1.3, view: pushing ? 'side' : 'q3', expr: pushing ? 'determined' : (t > sq ? 'curious' : 'happy'),
        look: [1, 0], blink: E.blink(t, 3), squash: E.breath(t), t, seed: 1, lean: pushing ? 0.16 : 0,
        feet: wk > 0 && wk < 1 ? E.walk(t * 7) : (pushing && t > sp + 4.6 && t < sp + 7.4 ? E.walk(t * 5, 8, 5) : undefined),
        arms: pushing ? [[-1, 1.45], [1, 1.6]] : (t < sp ? [[-1, 0.4], [1, 2.3 + 0.3 * Math.sin(t * 7)]] : [[-1, 0.4], [1, 0.4]])
      });
      // friend pulls with a rope from the right (same direction)
      const fk = E.se(t, sp + 2.6, sp + 4.2, 'io');
      if (fk > 0) {
        const fx = E.lerp(2150, cx + 430, fk) ;
        const hand = [fx - 58, FY - 150];
        if (fk > 0.95) F63.rope(ctx, [cx + 100, FY - 90], hand, 3120);
        DAMLA.draw(ctx, { x: fx, y: FY + 2, s: 1.1, view: fk < 1 ? 'q3' : 'side', flip: true, expr: 'determined', look: [-1, 0], blink: E.blink(t, 9), squash: E.breath(t), t: t + 3, seed: 7,
          lean: fk >= 1 ? 0.18 : 0, feet: fk > 0 && fk < 1 ? E.walk(t * 7) : undefined, arms: fk >= 1 ? [[-1, 1.5], [1, 1.35]] : [[-1, 0.4], [1, 0.4]] });
      }
      // force arrows (same length = similar pushes; no numbers yet)
      const ay1 = FY - 230, ay2 = FY - 290;
      const a1 = E.se(t, sp + 0.9, sp + 1.6), a2 = E.se(t, sp + 4.0, sp + 4.7);
      if (a1 > 0) { F63.farrow(ctx, cx - 60, ay1, 2, 1, a1, { w: 5, head: 16 }); INK.label(ctx, 'Damla', cx + 78, ay1 + 10, { size: 34, weight: 700, align: 'left', alpha: a1, color: F63.BR }); }
      if (a2 > 0) { F63.farrow(ctx, cx - 60, ay2, 2, 1, a2, { w: 5, head: 16 }); INK.label(ctx, 'arkadaşım', cx + 78, ay2 + 10, { size: 34, weight: 700, align: 'left', alpha: a2, color: F63.BR }); }
      ctx.restore();
      // question card
      const qk = E.se(t, sq + 0.3, sq + 1.0, 'out');
      if (qk > 0) {
        ctx.save(); ctx.translate(520, 330); ctx.scale(P.pop(qk), P.pop(qk));
        F63.card(ctx, -380, -120, 380, 120, { seed: 3130 });
        INK.label(ctx, 'Birden fazla kuvvet', 0, -20, { size: 52, weight: 700, align: 'center' });
        INK.label(ctx, 'etki edince ne olur?', 0, 50, { size: 52, weight: 700, align: 'center', color: F63.BR });
        ctx.restore();
      }
      F63.title(ctx, t, 3, 'Kuvvetler Bir Araya Gelince', 2);
    }
  });
})();
