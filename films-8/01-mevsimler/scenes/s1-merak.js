// SAHNE 1 — Merak: 21 Aralık öğle vakti uzun gölge; yazın kısa gölge; sorular (E3.8)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F81;
  // İstanbul (≈41° K), 1 m çubuk = 220 px → 21 Aralık gölge ≈ 2,09 m, 21 Haziran ≈ 0,32 m
  const GY = 800, SX = 900, H = 220;
  const SH_W = 2.09 * H, SH_S = 0.32 * H;
  E.scene({
    name: 'Merak', concept: 'Soru sorma', from: 'title', to: 'q',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('q');
      ctx.save();
      E.cam(ctx, { x: 960 + 20 * E.se(t, 0, E.e('q'), 'sine'), y: 540, z: 1 + 0.04 * E.se(t, 0, E.e('q'), 'sine') });
      // kış göğü (soluk mavi)
      const g = ctx.createLinearGradient(0, 0, 0, GY); g.addColorStop(0, 'rgba(46,106,140,0.16)'); g.addColorStop(1, 'rgba(46,106,140,0.02)');
      ctx.fillStyle = g; ctx.fillRect(-200, -200, E.W + 400, GY + 200);
      // alçak kış Güneşi (öğle yüksekliği ≈ 26°): ışın çubuk tepesinden gölge ucuna
      const slope = SH_W / H; // yatay/dikey
      const sunX = 250, sunY = GY - H - (SX - sunX) / slope;
      P.sun(ctx, sunX, sunY, 62, t, { nrays: 18, cells: false });
      // zemin
      const ground = [[-200, GY], [E.W + 200, GY], [E.W + 200, E.H + 200], [-200, E.H + 200]];
      P.fillPts(ctx, ground, PAL.paper, 1); wash(ctx, ground, '#8C8272', 0.18, 971, { bleed: 3, blooms: 2 });
      stroke(ctx, [[-200, GY], [E.W + 200, GY]], { w: 4, seed: 972, taper: 0.02 });
      // kar lekeleri
      [[200, 830, 90], [1500, 850, 120], [620, 880, 70]].forEach(([x, y, r], i) => P.fillPts(ctx, circlePts(x, y, r, r * 0.18, 24), PAL.white, 0.8));
      // gölgeler
      const wk = E.se(t, 2.0, 4.5);
      F.stick(ctx, SX, GY, H, SH_W, wk);
      const rk = E.se(t, sh + 1.0, sh + 2.5);
      if (rk > 0) { ctx.save(); ctx.globalAlpha = 0.7; const a0 = [sunX + 95, sunY + 95 / slope]; F.dash(ctx, a0, E.mix(a0, [SX + SH_W, GY], rk), { color: F.AMBER, w: 3 }); ctx.restore(); }
      E.inkText(ctx, '21 Aralık · öğle', SX + SH_W / 2 + 40, GY + 60, t, sh + 1.2, E.e('q'), { size: 40, align: 'center' });
      // yazın gölgesi (hayalet)
      const gk = E.se(t, sh + 4.2, sh + 5.2);
      if (gk > 0) {
        ctx.save(); ctx.globalAlpha = gk;
        const gx = 1430;
        stroke(ctx, [[gx, GY], [gx + 1, GY - H]], { w: 3, color: PAL.ink, alpha: 0.5, dry: false, seed: 580 });
        P.fillPts(ctx, [[gx, GY - 4], [gx + SH_S, GY - 2], [gx + SH_S, GY + 5], [gx, GY + 6]], '#3A3440', 0.3);
        INK.label(ctx, 'yazın · öğle', gx + 40, GY + 60, { size: 40, weight: 700, align: 'center', color: PAL.water });
        ctx.restore();
      }
      ctx.restore();
      // Damla
      const qd = t > sq;
      DAMLA.draw(ctx, { x: 1690, y: GY + 4, s: 1.15, view: 'q3', flip: true, expr: qd ? 'thinking' : 'surprised', look: [-0.8, 0.4], blink: E.blink(t, 2), squash: E.breath(t), t, seed: 1,
        arms: qd ? [[-1, [30, -150], 0.4], [1, 0.35]] : [[-1, 0.35 + 1.8 * E.se(t, sh + 0.5, sh + 1.2)], [1, 0.35]] });
      // soru balonu
      const bk = E.se(t, sq + 0.3, sq + 1.1, 'out') * (1 - E.se(t, E.e('q') - 0.5, E.e('q')));
      if (bk > 0) {
        P.bubble(ctx, 1030, 390, 900, 330, [1600, 830], bk, 3);
        if (bk > 0.9) {
          P.write(ctx, 'Mevsimler neden oluşur?', 1030, 320, E.seg(t, sq + 0.9, sq + 2.0), { size: 50, align: 'center' });
          P.write(ctx, 'Gölge neden uzayıp kısalır?', 1030, 400, E.seg(t, sq + 2.2, sq + 3.4), { size: 50, align: 'center' });
          P.write(ctx, 'Kışın günler neden kısalır?', 1030, 480, E.seg(t, sq + 3.6, sq + 4.8), { size: 50, align: 'center' });
          INK.label(ctx, '?', 660, 300, { size: 70, weight: 700, color: PAL.light });
          INK.label(ctx, '?', 1400, 470, { size: 70, weight: 700, color: PAL.light });
        }
      }
      F.title(ctx, t, E.e('title') + 1.4, '1', 'Mevsimler Nasıl Oluşur?', 1);
    }
  });
})();
