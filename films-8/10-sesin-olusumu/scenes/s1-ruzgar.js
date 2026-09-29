// SAHNE 1 — Başlık + köprü: "Rüzgâr eserken ağaçtan ses duyarsınız. Ağaç nasıl ses çıkarır?" (TYMM köprü kurma)
(function () {
  const { PAL } = INK; const F = S8;
  E.scene({
    name: 'Rüzgâr', concept: 'Köprü: ağaç nasıl ses çıkarır?', from: 'title', to: 'hook',
    draw(ctx, t) {
      const sh = E.s('hook');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,106,140,0.13)'); g.addColorStop(1, 'rgba(111,138,58,0.06)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      const hill = P.hillLine(E.W, 880);
      ctx.save();
      E.cam(ctx, E.camLerp({ x: 960, y: 540, z: 1 }, { x: 960, y: 560, z: 1.06 }, E.se(t, sh, sh + 5, 'sine')));
      P.landscape(ctx, E.W, E.H, t, { hill, tree: false });
      const wind = E.se(t, 0.8, 2.8);
      F.windLines(ctx, 80, 430, t, wind);
      const tx = 1330, ty = P.hillY(hill, tx) + 6;
      F.tree(ctx, tx, ty, 1.45, t, wind);
      // yapraklar titreşir → ses dalgaları Damla'ya doğru
      const kk = E.se(t, sh + 2.2, sh + 3.4);
      if (kk > 0) E.layer(ctx, kk, c => {
        F.vib(c, tx, ty - 360, t, { r0: 150, gap: 16, span: 0.5 });
        F.rings(c, tx - 40, ty - 330, t, { a0: Math.PI - 0.45, a1: Math.PI + 0.35, r0: 170, maxR: 580, gap: 70, speed: 110 });
      });
      const dx = 600, dy = P.hillY(hill, dx) + 4, listen = t > sh + 2;
      F.damla(ctx, t, { x: dx, y: dy, s: 1.4, view: 'q3', expr: listen ? 'curious' : 'happy', look: [0.85, -0.45], arms: listen ? [[-1, 0.4], [1, [58, -150]]] : [[-1, 0.4], [1, 0.5]] });
      ctx.restore();
      F.title(ctx, t, '10 · Sesin Oluşumu ve Yayılması', 'Fen Bilimleri · 8. sınıf · Ünite 4', F.AMB);
      E.inkText(ctx, 'Ağaç nasıl ses çıkarır?', 960, 250, t, sh + 3.8, E.e('hook') + 0.6, { size: 66, align: 'center' });
    }
  });
})();
