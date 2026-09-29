// SAHNE 1 — Başlık + köprü: kedi (ince ses) ve aslan (kalın ses) — TYMM FB.8.4.3 uygulaması
(function () {
  const { PAL } = INK; const F = S8;
  E.scene({
    name: 'Kedi ve aslan', concept: 'Köprü: ince ve kalın sesler', from: 'title', to: 'hook',
    draw(ctx, t) {
      const sh = E.s('hook');
      const g = ctx.createRadialGradient(960, 600, 100, 960, 600, 1100); g.addColorStop(0, 'rgba(227,160,58,0.10)'); g.addColorStop(1, 'rgba(46,106,140,0.10)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      const kc = E.se(t, 1.0, 2.2, 'out'), kl = E.se(t, 1.6, 2.8, 'out');
      if (kc > 0) { ctx.save(); ctx.translate(430, 560); ctx.scale(P.pop(kc), P.pop(kc)); F.cat(ctx, 0, 0, 1.4); ctx.restore(); }
      if (kl > 0) { ctx.save(); ctx.translate(1490, 560); ctx.scale(P.pop(kl), P.pop(kl)); F.lion(ctx, 0, 0, 1.3); ctx.restore(); }
      const kr = E.se(t, sh + 0.5, sh + 1.3);
      if (kr > 0) {
        ctx.save(); ctx.globalAlpha *= kr;
        F.rings(ctx, 430, 580, t, { a0: -0.5, a1: 0.5, r0: 130, maxR: 330, gap: 22, speed: 70, w: 2.4 });
        F.rings(ctx, 1490, 600, t, { a0: Math.PI - 0.6, a1: Math.PI + 0.6, r0: 180, maxR: 440, gap: 70, speed: 70, w: 5 });
        ctx.restore();
      }
      F.graph(ctx, 250, 740, 360, 130, 10, 38, E.se(t, sh + 2.0, sh + 3.2), { axis: false, seed: 101 });
      F.graph(ctx, 1310, 740, 360, 130, 3, 38, E.se(t, sh + 3.0, sh + 4.2), { axis: false, seed: 102 });
      P.write(ctx, 'ince ses', 430, 912, E.seg(t, sh + 3.4, sh + 4.4), { size: 50, align: 'center' });
      P.write(ctx, 'kalın ses', 1490, 912, E.seg(t, sh + 4.2, sh + 5.2), { size: 50, align: 'center' });
      F.damla(ctx, t, { x: 960, y: 900, s: 1.2, view: 'front', expr: t > sh + 3 ? 'curious' : 'happy', look: [Math.sin(t * 0.8) * 0.8, -0.2], arms: [[-1, 0.4], [1, 0.5]] });
      F.title(ctx, t, '11 · Sesin Özellikleri: Frekans ve Şiddet', 'Fen Bilimleri · 8. sınıf · Ünite 4', F.AMB);
    }
  });
})();
