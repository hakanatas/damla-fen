// SAHNE 1 — Güneşli oda (FB.6.4.7 köprü sorusu: güneş alan odalar kışın neden daha sıcak?)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F614;
  E.scene({
    name: 'Güneşli oda', concept: 'Güneş ışığı odayı ısıtır', from: 'title', to: 'energy',
    draw(ctx, t) {
      const sh = E.s('hello'), sw = E.s('window'), se = E.s('energy');
      const zoomOut = E.se(t, se - 0.2, se + 1.6);
      ctx.save();
      E.cam(ctx, E.camLerp({ x: 960, y: 560, z: 1 }, { x: 1080, y: 470, z: 0.8 }, zoomOut));
      // winter sky + sun
      const g = ctx.createRadialGradient(1780, 220, 40, 1780, 220, 1000); g.addColorStop(0, 'rgba(227,160,58,0.3)'); g.addColorStop(1, 'rgba(227,160,58,0)');
      ctx.fillStyle = g; ctx.fillRect(-400, -300, E.W + 800, E.H + 600);
      P.sun(ctx, 1780, 220, 85, t, { nrays: 18 });
      // snowy ground
      const gr = [[-400, 880], [2400, 880], [2400, 1400], [-400, 1400]]; P.fillPts(ctx, gr, '#F7F4EE'); line(ctx, [-400, 880], [2400, 880], { w: 3, seed: 5 });
      const R = INK.rng(3); for (let i = 0; i < 40; i++) { const x = -300 + R() * 2600, y = (R() * 1200 + t * 40) % 1100 - 100; if (x > 340 && x < 1580 && y > 300) continue; INK.inkDot(ctx, x, y, 3, { color: '140,160,180', alpha: 0.6 }); }
      // house section
      const X0 = 360, X1 = 1560, Yt = 470, Yb = 880, Xm = 960;
      P.fillPts(ctx, [[X0, Yt], [X1, Yt], [X1, Yb], [X0, Yb]], '#EFE6D3');
      const roof = [[X0 - 50, Yt], [(X0 + X1) / 2, 350], [X1 + 50, Yt], [X0 - 50, Yt]]; P.fillPts(ctx, roof, F.HEAT, 0.6); stroke(ctx, roof, { w: 3, closed: true, seed: 6 });
      stroke(ctx, [[X0, Yt], [X0, Yb]], { w: 4 }); stroke(ctx, [[X1, Yt], [X1, 560]], { w: 4 }); stroke(ctx, [[X1, 740], [X1, Yb]], { w: 4 });
      line(ctx, [Xm, Yt], [Xm, Yb], { w: 4, seed: 7 }); line(ctx, [X0, Yb], [X1, Yb], { w: 4, seed: 8 });
      // window glass (right wall)
      const win = [[X1 - 8, 560], [X1 + 8, 560], [X1 + 8, 740], [X1 - 8, 740], [X1 - 8, 560]]; P.fillPts(ctx, win, '#CFE3EA', 0.8); stroke(ctx, win, { w: 2.4, closed: true, dry: false });
      // shaded left room tint
      ctx.save(); ctx.globalAlpha = 0.12; ctx.fillStyle = '#2E4A66'; ctx.fillRect(X0, Yt, Xm - X0, Yb - Yt); ctx.restore();
      // sun rays through the window to the floor
      const rk = E.se(t, sw + 0.3, sw + 1.6);
      [[560, 1280], [620, 1200], [680, 1120], [735, 1050]].forEach(([wy, fx], i) => {
        const a = [1700, 300 + i * 20]; const w0 = [X1, wy];
        F.ray(ctx, a, w0, E.clamp(rk * 2), { w: 3, heads: [0.5], head: 12, seed: 20 + i });
        F.ray(ctx, w0, [fx, Yb - 4], E.clamp(rk * 2 - 1), { w: 3, heads: [0.6], head: 12, seed: 30 + i });
      });
      // lit floor patch + rug + heat
      const hk = E.se(t, sw + 2.2, sw + 3.4);
      if (hk > 0) { ctx.save(); ctx.globalAlpha *= hk * 0.5; P.fillPts(ctx, [[1040, Yb - 4], [1290, Yb - 4], [1290, Yb - 18], [1040, Yb - 18]], PAL.light); ctx.restore(); for (let i = 0; i < 4; i++) F.squiggle(ctx, 1070 + i * 60, Yb - 30, t, i, E.se(t, sw + 3 + i * 0.2, sw + 3.8 + i * 0.2), 55); }
      // thermometers
      const tk = E.se(t, sh + 1.5, sh + 2.5);
      if (tk > 0) {
        ctx.save(); ctx.globalAlpha *= tk;
        F.thermo(ctx, 560, 760, 190, 0.35); F.thermo(ctx, 1420, 760, 190, 0.35 + 0.35 * E.se(t, sh + 2.5, sh + 5));
        INK.label(ctx, 'gölgedeki oda', 660, 530, { size: 36, weight: 700, align: 'center' });
        INK.label(ctx, 'güneş alan oda', 1260, 530, { size: 36, weight: 700, align: 'center' });
        INK.label(ctx, 'daha serin', 620, 850, { size: 34, weight: 700, align: 'left', color: PAL.water });
        INK.label(ctx, 'daha sıcak', 1450, 850, { size: 34, weight: 700, align: 'center', color: F.HEAT, alpha: E.se(t, sh + 4.5, sh + 5.2) });
        ctx.restore();
      }
      if (t > sw + 4.2) E.inkText(ctx, 'ışık camdan geçer → soğurulur → oda ısınır', 960, 300, t, sw + 4.2, se + 0.4, { size: 40, align: 'center', color: '#8A4A10' });
      // Damla in the sunny room
      DAMLA.draw(ctx, { x: 1180, y: Yb - 4, s: 0.95, view: 'q3', expr: t > sw + 3 ? 'happy' : 'curious', look: [0.7, -0.3], blink: E.blink(t, 2), squash: E.breath(t), t: t * (1 + hk), talk: E.talk(t), seed: 1, arms: t > sh + 5 && t < sw ? [[-1, 0.3], [1, [30, -86]]] : [[-1, 0.4], [1, 0.4]] });
      ctx.restore();
      // energy card (screen space)
      const ek = E.se(t, se + 1.2, se + 2.0, 'out');
      if (ek > 0) E.layer(ctx, ek, c => {
        F.card(c, 150, 170, 640, 230, { fill: '#FBF3DC', color: F.AMB, seed: 40 });
        P.write(c, 'Güneş → ışık + enerji', 190, 255, E.seg(t, se + 1.4, se + 2.6), { size: 52 });
        P.write(c, 'Nasıl yararlanıyoruz?', 190, 345, E.seg(t, se + 4.4, se + 5.6), { size: 50, color: '#8A4A10' });
      });
      // title
      const t1 = E.e('title') + 1.4;
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 170, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '14 · Güneş Enerjisinden Yararlanma', 960, 250, t, 1.2, t1, { size: 56, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 6. sınıf · Ünite 4', 960, 303, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    }
  });
})();
