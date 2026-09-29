// SAHNE 1 — Ay bir ışık kaynağı mı? (FB.6.4.1 tartışma sorusu) → yansıma tanımı
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F611;
  const STARS = (() => { const r = INK.rng(611); const s = []; for (let i = 0; i < 60; i++) s.push([r() * 1920, 160 + r() * 520, 1 + r() * 2.2, r() * 6]); return s; })();

  E.scene({
    name: 'Ay parlıyor', concept: 'Ay ışık kaynağı mı? Yansıma', from: 'title', to: 'define',
    draw(ctx, t) {
      const sa = E.s('moona'), sd = E.s('define');
      const hill = P.hillLine(E.W);
      // --- gece manzarası ---
      const night = 1 - E.se(t, sa, sa + 0.9);
      if (night > 0) E.layer(ctx, night, c => {
        c.fillStyle = 'rgba(30,42,78,0.42)'; c.fillRect(0, 0, E.W, E.H);
        STARS.forEach(([x, y, r, p]) => { c.save(); c.globalAlpha = 0.5 + 0.4 * Math.sin(t * 2 + p); c.fillStyle = '#FBF3DA'; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.restore(); });
        const mx = 1450, my = 400;
        F.glow(c, mx, my, 260, 0.7, '251,244,220');
        P.moon(c, mx, my, 95);
        P.landscape(c, E.W, E.H, t, { hill });
        const dx = 640, dy = P.hillY(hill, dx) + 4, sh = E.s('hello');
        const lookUp = E.se(t, sh + 0.5, sh + 1.5);
        DAMLA.draw(c, { x: dx, y: dy, s: 1.45, view: 'q3', expr: t > sh + 4.2 ? 'thinking' : 'happy', look: [0.8 * lookUp, -0.5 * lookUp], blink: E.blink(t, 3), squash: E.breath(t), t, talk: E.talk(t), seed: 1,
          arms: t > sh + 4.2 ? [[-1, 0.35], [1, [34, -150], 1]] : [[-1, 0.35], [1, 2.3 + 0.25 * Math.sin(t * 6) * (t > sh + 0.5 && t < sh + 3 ? 1 : 0)]] });
        if (t > sh + 4.4) { const k = E.se(t, sh + 4.4, sh + 5.2, 'out'); INK.label(c, '?', mx - 150, my - 60, { size: 110 * P.pop(k), weight: 700, color: '#FBF3DA', alpha: 0.95 }); }
      });
      // --- şema: Güneş → Ay → göz ---
      const dk = E.se(t, sa + 0.2, sa + 1.0);
      if (dk > 0) E.layer(ctx, dk, c => {
        F.card(c, 150, 175, 1620, 715, { seed: 611 });
        const S = [370, 500], Mo = [1080, 330], Ey = [1480, 690];
        P.sun(c, S[0], S[1], 105, t, { nrays: 18 });
        P.moon(c, Mo[0], Mo[1], 62);
        P.earth(c, Ey[0] + 170, Ey[1] + 90, 66);
        P.icon.eye(c, Ey[0] - 90, Ey[1] - 70, 0.55);
        // ışınlar Güneş'ten Ay'ın yüzeyine (üç ışın)
        const k1 = E.se(t, sa + 1.0, sa + 2.6);
        [-40, 0, 40].forEach((dy, i) => {
          const tgt = [Mo[0] - Math.sqrt(62 * 62 - dy * dy) * 0.98, Mo[1] + dy];
          const dir = F.V.norm(F.V.sub(tgt, S)); const st = F.V.add(S, F.V.mul(dir, 125));
          F.ray(c, st, tgt, k1, { seed: 30 + i, w: 3.2, heads: [0.5] });
        });
        // Ay'dan göze giden ışın (Ay'ın aydınlık yüzeyinden)
        const k2 = E.se(t, sa + 2.6, sa + 3.8);
        const from = [Mo[0] - 20, Mo[1] + 58], eye = [Ey[0] - 150, Ey[1] - 88];
        F.ray(c, from, eye, k2, { seed: 40, w: 3.2, heads: [0.55] });
        INK.label(c, 'Güneş', S[0], S[1] + 165, { size: 40, weight: 700, align: 'center', alpha: E.se(t, sa + 0.8, sa + 1.4) });
        INK.label(c, '(ışık kaynağı)', S[0], S[1] + 205, { size: 32, align: 'center', alpha: 0.75 * E.se(t, sa + 0.8, sa + 1.4) });
        INK.label(c, 'Ay', Mo[0] + 90, Mo[1] - 30, { size: 40, weight: 700, alpha: E.se(t, sa + 0.8, sa + 1.4) });
        INK.label(c, '(ışığı yansıtır)', Mo[0] + 90, Mo[1] + 10, { size: 32, alpha: 0.75 * E.se(t, sa + 3.2, sa + 4) });
        INK.label(c, 'Dünya’dan bakan göz', Ey[0] - 90, Ey[1] + 20, { size: 30, align: 'center', alpha: 0.75 * E.se(t, sa + 3.6, sa + 4.2) });
        INK.label(c, '(çizim ölçekli değildir)', 1740, 865, { size: 26, align: 'right', alpha: 0.55 });
        // tanım
        const tk = E.se(t, sd + 0.2, sd + 0.8);
        if (tk > 0) {
          const b = [[300, 745], [1260, 740], [1266, 842], [304, 848], [300, 745]];
          c.save(); c.globalAlpha *= tk; P.fillPts(c, b, '#F6E7B8', 0.95); stroke(c, b, { w: 3, closed: true, color: F.AMB, seed: 612 }); c.restore();
          P.write(c, 'yansıma: ışığın yüzeye çarpıp geri dönmesi', 782, 810, E.seg(t, sd + 0.5, sd + 2.2), { size: 44, align: 'center' });
        }
      });
      // --- başlık kartı ---
      const t1 = E.e('title') + 1.4;
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '11 · Işığın Yansıması', 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 6. sınıf · Ünite 4', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.8 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
    }
  });
})();
