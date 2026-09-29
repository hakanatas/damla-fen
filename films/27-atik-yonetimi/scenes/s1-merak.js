// SAHNE 1 — Merak: okul bahçesi; atık yönetimi üzerine açık uçlu soru
(function () {
  const { PAL, line, stroke, wash } = INK;
  W7.school = (ctx, x, y, s) => { // basit okul binası (ayak ortası x,y)
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-230, 0], [-230, -220], [230, -220], [230, 0], [-230, 0]];
    P.fillPts(ctx, b, PAL.white); wash(ctx, b, '#C98A5A', 0.45, 950, { bleed: 2 }); stroke(ctx, b, { w: 3, closed: true, seed: 951 });
    const r = [[-250, -220], [0, -290], [250, -220], [-250, -220]]; P.fillPts(ctx, r, PAL.white); wash(ctx, r, '#8A5A34', 0.6, 952); stroke(ctx, r, { w: 3, closed: true, seed: 953 });
    for (let row = 0; row < 2; row++) for (let i = 0; i < 4; i++) { if (row === 1 && (i === 1 || i === 2)) continue; const w = W7.rr(-190 + i * 100, -190 + row * 90, 60, 56, 4); P.fillPts(ctx, w, '#BFD6E2', 0.9); stroke(ctx, w, { w: 2.2, closed: true, dry: false }); }
    const d = [[-40, 0], [-40, -80], [40, -80], [40, 0]]; P.fillPts(ctx, d.concat([d[0]]), '#6B4A2A', 0.6); stroke(ctx, d, { w: 2.6 });
    P.icon.clock(ctx, 0, -245, 0.3, 0.6);
    ctx.restore();
  };
  E.scene({
    name: 'Merak', concept: 'Soru: atıklarımızı nasıl yönetiyoruz?', from: 'title', to: 'question',
    draw(ctx, t) {
      const hill = P.hillLine(E.W);
      const sh = E.s('hello'), sq = E.s('question');
      ctx.save();
      const z = E.se(t, sh, E.e('question'), 'sine');
      E.cam(ctx, E.camLerp({ x: 960, y: 540, z: 1 }, { x: 980, y: 540, z: 1.05 }, z));
      const g = ctx.createRadialGradient(300, 200, 40, 300, 200, 900); g.addColorStop(0, 'rgba(227,160,58,0.22)'); g.addColorStop(1, 'rgba(227,160,58,0)'); ctx.fillStyle = g; ctx.fillRect(-200, -200, E.W + 400, E.H + 400);
      W7.school(ctx, 1480, P.hillY(hill, 1480) + 20, 1.0);
      P.landscape(ctx, E.W, E.H, t, { hill });
      ['mavi', 'sari', 'yesil', 'gri', 'kahve', 'siyah'].forEach((k, i) => W7.bin(ctx, k, 1080 + i * 90, P.hillY(hill, 1080 + i * 90) + 30, 0.38));
      const dx = 760, dy = P.hillY(hill, dx) + 4;
      let arms = [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.1]], expr = 'neutral', look = [0.2, 0.3], prop = 'notebook';
      if (t > sh + 0.3 && t < sh + 2.6) { arms = [[-1, 1.1], [1, 2.35 + 0.35 * Math.sin(t * 9)]]; expr = 'happy'; prop = null; }
      if (t >= sq) { expr = 'thinking'; look = [0.6, -0.6]; arms = [[-1, 1.1], [1, [30, -86]]]; prop = null; }
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.5, view: 'front', expr, look, blink: E.blink(t, 3), squash: E.breath(t), arms, t, talk: E.talk(t), seed: 1, prop, hold: (c, res) => { if (!prop && res[-1]) DAMLA.notebookProp(c, res[-1].hand); } });
      const bk = E.se(t, sq + 0.6, sq + 1.2, 'out');
      if (bk > 0) {
        P.bubble(ctx, 1150, 330, 700, 190, [860, 520], bk, 5);
        if (bk > 0.6) {
          P.write(ctx, 'Atıklarımızı nasıl yönetiyoruz?', 1150, 318, E.seg(t, sq + 1.0, sq + 2.3), { size: 42, align: 'center' });
          P.write(ctx, 'Daha iyisini yapabilir miyiz?', 1150, 374, E.seg(t, sq + 2.2, sq + 3.4), { size: 42, align: 'center', color: '#3F7A3A' });
        }
      }
      ctx.restore();
      const t1 = E.e('title') + 1.4;
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '27 · Atık Yönetimi ve Sıfır Atık', 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 5. sınıf · Ünite 7', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.life }); ctx.restore(); }
    }
  });
})();
