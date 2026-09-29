// SAHNE 1 — Problemi belirleme ve ölçütler (TYMM: sınırlılıkları belirlenmiş problem durumu)
(function () {
  const { PAL, line, stroke } = INK;
  const BR = '#8A4A10', FY = 880;
  E.scene({
    name: 'Problem', concept: 'Problem durumu ve ölçütler', from: 'title', to: 'criteria',
    draw(ctx, t) {
      const sh = E.s('hello'), sp = E.s('problem'), sc = E.s('criteria');
      ctx.save(); ctx.globalAlpha = 0.12; ctx.fillStyle = PAL.water; ctx.fillRect(0, 0, E.W, FY); ctx.restore();
      F06.floor(ctx, FY, 1);
      // real dynamometer on a small stand (from film 5)
      const dk = E.se(t, sh + 0.5, sh + 1.3);
      if (dk > 0) E.layer(ctx, dk, c => {
        line(c, [250, 196], [420, 196], { w: 6, taper: 0 }); stroke(c, [[420, 196], [424, FY]], { w: 6, taper: 0.02 });
        const r = F06.dyn(c, 330, 190, { L: 340, W: 80, max: 10, F: 2 + Math.sin(t * 1.5) * 0.3 });
        F06.apple(c, 330, r.hook[1] - 4, 0.8);
      });
      const cheer = t > sh && t < sp;
      DAMLA.draw(ctx, { x: 640, y: FY, s: 1.4, view: t < sp ? 'front' : 'q3', expr: t < sh + 0.6 ? 'happy' : (t < sp ? 'happy' : 'thinking'), look: t < sp ? [0, 0] : [0.8, -0.4], blink: t < 1.2 ? 1 : E.blink(t, 2), squash: E.breath(t), t, seed: 1,
        arms: cheer ? [[-1, 0.4], [1, 2.35 + 0.35 * Math.sin(t * 9)]] : (t >= sp ? [[-1, 0.3], [1, 2.0]] : [[-1, 0.35], [1, 0.35]]) });
      // problem card
      const pk = E.se(t, sp + 0.2, sp + 1.0, 'out');
      if (pk > 0) E.layer(ctx, pk, c => {
        F06.card(c, 940, 170, 1840, 800, { seed: 3201 });
        P.write(c, 'PROBLEM', 1000, 250, E.seg(t, sp + 0.6, sp + 1.4), { size: 56, color: BR });
        P.write(c, 'Basit malzemelerle 0–5 N arasındaki', 1000, 320, E.seg(t, sp + 1.2, sp + 2.8), { size: 40 });
        P.write(c, 'kuvvetleri ölçen bir araç tasarla.', 1000, 370, E.seg(t, sp + 2.6, sp + 4.2), { size: 40 });
        line(c, [1000, 410], [1780, 406], { w: 1.8, dry: false, alpha: E.se(t, sc, sc + 0.5) });
        P.write(c, 'Ölçütler', 1000, 470, E.seg(t, sc + 0.2, sc + 1.0), { size: 48, color: BR });
        const C = ['ölçeği kolay okunur', 'tekrar ölçünce aynı sonuç', 'basit ve güvenli malzeme'];
        C.forEach((s, i) => {
          const at = sc + 0.9 + i * 1.3, y = 545 + i * 72; if (t < at - 0.2) return;
          stroke(c, [[1004, y - 36], [1044, y - 38], [1046, y + 2], [1006, y + 4], [1004, y - 36]], { w: 2.4, closed: true, seed: 3210 + i });
          P.write(c, s, 1070, y, E.seg(t, at, at + 1.0), { size: 40 });
        });
      });
      if (t > sp) F06.badge(ctx, t, 0, E.se(t, sp + 0.5, sp + 1.2));
      F06.title(ctx, t, 6, 'Kendi Dinamometremi Tasarlıyorum', 2);
    }
  });
})();
