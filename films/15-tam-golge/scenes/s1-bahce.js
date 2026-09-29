// SAHNE 1 — Bahçede gölgeler: Damla'nın, ağacın ve binanın gölgesi (köprü kurma)
// (TYMM: "Yüksek binaların ya da kendi gölgelerinin oluşumu ile tam gölge arasında bağlantı")
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F15;
  const GY = 860;                                  // ground contact line for figures
  const sh = (fx, fy, dx, h) => [fx + dx - h * 0.8, fy + h * 0.22];   // ground shadow of a point dx right of foot, h above ground

  E.scene({
    name: 'Bahçede gölgeler', concept: 'Gölge nasıl oluşur?', from: 'title', to: 'bridge',
    draw(ctx, t) {
      const shl = E.s('hello'), sb = E.s('bridge');
      // sky glow + small sun (upper right)
      const g = ctx.createRadialGradient(1720, 150, 40, 1720, 150, 800); g.addColorStop(0, 'rgba(227,160,58,0.28)'); g.addColorStop(1, 'rgba(227,160,58,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      P.sun(ctx, 1760, 140, 62, t, { cells: false, nrays: 16 });
      // ground
      const gp = [[-20, 740], [1940, 730], [1940, 1100], [-20, 1100]];
      P.fillPts(ctx, gp, '#C9D39E', 0.9); wash(ctx, gp, PAL.life, 0.22, 501, { bleed: 3, blooms: 3 }); stroke(ctx, [[-20, 740], [1940, 730]], { w: 3, seed: 502 });
      // building (right) and its shadow
      const bx0 = 1420, bx1 = 1680, bh = 460, by = 800;
      const bs = [[bx0, by], sh(bx0, by, 0, bh), sh(bx1, by, 0, bh), [bx1, by]];
      P.fillPts(ctx, bs, F.SHADOW, 0.55);
      const bd = [[bx0, by], [bx0, by - bh], [bx1, by - bh], [bx1, by], [bx0, by]];
      P.fillPts(ctx, bd, '#E6DCC6'); wash(ctx, bd, '#B5553F', 0.25, 503, { bleed: 2 }); stroke(ctx, bd, { w: 3.4, closed: true, seed: 504 });
      for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) { const w = [[bx0 + 40 + c * 75, by - bh + 40 + r * 95], [bx0 + 90 + c * 75, by - bh + 40 + r * 95], [bx0 + 90 + c * 75, by - bh + 100 + r * 95], [bx0 + 40 + c * 75, by - bh + 100 + r * 95]]; P.fillPts(ctx, w, '#CFE3EC'); stroke(ctx, w.concat([w[0]]), { w: 2, closed: true, dry: false, seed: 505 + r * 3 + c }); }
      // tree and its shadow
      const tx = 1150, ty = 830, th = 190, cr = 90;
      const tsh = circlePts(0, 0, cr, cr * 0.85, 40).map(p => sh(tx, ty, p[0], th + cr - p[1]));
      line(ctx, [tx, ty], sh(tx, ty, 0, th), { w: 16, color: F.SHADOW, alpha: 0.55, dry: false, taper: 0 });
      P.fillPts(ctx, tsh, F.SHADOW, 0.55);
      line(ctx, [tx, ty], [tx + 4, ty - th], { w: 14, seed: 506, taper: 0.05 });
      const crown = INK.wobble(circlePts(tx, ty - th - cr, cr, cr * 0.85, 50), 6, 507); wash(ctx, crown, PAL.life, 0.55, 508); stroke(ctx, crown, { w: 3, closed: true, seed: 509 });
      // Damla walking + her shadow
      const wk = E.seg(t, shl, sb + 0.8), dx = E.lerp(560, 860, E.ease.out(wk)), walking = wk > 0 && wk < 1;
      const feet = walking ? E.walk(t * 9) : [[0, 0], [0, 0]], bob = walking ? Math.abs(Math.sin(t * 9)) * 5 : 0;
      const s = 1.35, body = DAMLA.bodyPts({ squash: 1 });
      P.fillPts(ctx, body.map(p => sh(dx, GY, p[0] * s, -p[1] * s)), F.SHADOW, 0.55);
      line(ctx, sh(dx, GY, -14 * s, 0), sh(dx, GY, -14 * s, 50 * s), { w: 7, color: F.SHADOW, alpha: 0.55, dry: false });
      line(ctx, sh(dx, GY, 14 * s, 0), sh(dx, GY, 14 * s, 50 * s), { w: 7, color: F.SHADOW, alpha: 0.55, dry: false });
      const pointing = t > sb + 1.0;
      DAMLA.draw(ctx, { x: dx, y: GY - bob, s, view: 'q3', flip: pointing, expr: pointing ? 'curious' : 'happy', look: pointing ? [-0.6, 0.5] : [0.4, 0.1], blink: E.blink(t, 2), squash: E.breath(t), feet, t, seed: 1, shadow: false,
        arms: pointing ? [[-1, 0.35], [1, 1.9]] : [[-1, 0.35 + Math.sin(t * 9) * 0.2 * (walking ? 1 : 0)], [1, 0.35 - Math.sin(t * 9) * 0.2 * (walking ? 1 : 0)]] });
      // labels
      const lk = E.se(t, sb + 0.6, sb + 1.4);
      if (lk > 0) {
        P.write(ctx, 'gölgem', 470, 905, E.seg(t, sb + 0.8, sb + 1.6), { size: 42, align: 'center' });
        P.write(ctx, 'binanın gölgesi', 1330, 880, E.seg(t, sb + 2.0, sb + 2.8), { size: 42, align: 'center', color: PAL.white });
        const qk = E.se(t, sb + 3.0, sb + 3.6, 'out');
        P.bubble(ctx, 560, 400, 420, 170, [800, 620], qk, 3);
        if (qk > 0.6) P.write(ctx, 'Gölge nasıl oluşur?', 560, 415, E.seg(t, sb + 3.4, sb + 4.4), { size: 44, align: 'center' });
      }
      // title
      const t1 = E.e('title') + 1.2;
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 900, 190, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '15 · Tam Gölge', 900, 272, t, 1.2, t1, { size: 58, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 5. sınıf · Ünite 4', 900, 328, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([580, 215], [900, 225], [1220, 211], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
    }
  });
})();
