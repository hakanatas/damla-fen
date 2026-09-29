// SAHNE 5 — Yenilenmiş model: lamba (Güneş), top (Ay), baş (Dünya). Topun hep yarısı aydınlık; döndürünce görünen kısım değişir.
(function () {
  const { PAL, line, stroke, circlePts, dashed, arrowHead } = INK;
  const AMB = '#C07F1E';
  const HX = 1000, HY = 625, RX = 360, RY = 85;   // top yörüngesi (baş çevresinde)
  const LX = 190, LY = 640;                         // lamba ampulü
  function phiAt(t) {
    const st = E.s('turn');
    return Math.PI - 0.35 - 6.2832 * E.se(t, st + 0.5, E.e('turn') - 0.3, 'sine');   // saat yönünün tersi (üstten)
  }
  function lamp(ctx, t, k) {
    const g = ctx.createRadialGradient(LX, LY, 10, LX, LY, 520); g.addColorStop(0, `rgba(240,180,90,${0.45 * k})`); g.addColorStop(1, 'rgba(240,180,90,0)');
    ctx.save(); ctx.fillStyle = g; ctx.fillRect(0, 0, 1100, 1080); ctx.restore();
    line(ctx, [LX - 40, 900], [LX - 40, LY + 40], { w: 7, taper: 0.02 });
    P.fillPts(ctx, circlePts(LX - 40, 905, 70, 16, 30), PAL.paperDeep, 1); stroke(ctx, circlePts(LX - 40, 905, 70, 16, 30), { w: 2.4, closed: true });
    const sock = [[LX - 60, LY - 16], [LX - 30, LY - 18], [LX - 30, LY + 18], [LX - 60, LY + 16], [LX - 60, LY - 16]]; P.fillPts(ctx, sock, '#8A6A45', 0.9); stroke(ctx, sock, { w: 2.4, closed: true });
    line(ctx, [LX - 40, LY + 40], [LX - 45, LY + 16], { w: 6, taper: 0.02 });
    P.fillPts(ctx, circlePts(LX, LY, 42, 40, 30), '#FFE7A8', 1); stroke(ctx, circlePts(LX, LY, 42, 40, 30), { w: 2.6, closed: true });
    stroke(ctx, [[LX - 20, LY + 6], [LX - 8, LY - 10], [LX + 4, LY + 6], [LX + 16, LY - 10]], { w: 1.8, dry: false, color: '#C07F1E' });
    for (let i = 0; i < 8; i++) { const a = -1.2 + i * 0.34; line(ctx, [LX + Math.cos(a) * 56, LY + Math.sin(a) * 54], [LX + Math.cos(a) * 76, LY + Math.sin(a) * 74], { w: 2.4, color: '#C07F1E', dry: false }); }
  }
  E.scene({
    name: 'Model 2', concept: 'Yenilenen model: lamba-top-baş', from: 'model2', to: 'turn', trFrom: [960, 540],
    draw(ctx, t) {
      const s2 = E.s('model2'), sh = E.s('half'), st = E.s('turn');
      ctx.save(); ctx.fillStyle = 'rgba(30,34,58,0.22)'; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();   // karartılmış oda
      lamp(ctx, t, 1);
      const phi = phiAt(t);
      const bx = HX + Math.cos(phi) * RX, by = HY + Math.sin(phi) * RY;
      const ball = () => {
        F03.halfLit(ctx, bx, by, 40, Math.atan2(LY - by, LX - bx), { alpha: 0.78 });
      };
      // Damla topa bakar
      const f = [Math.cos(phi), Math.sin(phi)];
      const v = f[1] > 0.75 ? { view: 'front', flip: false } : f[1] > 0.15 ? { view: 'q3', flip: f[0] < 0 } : f[1] > -0.55 ? { view: 'side', flip: f[0] < 0 } : { view: 'back', flip: false };
      const dam = () => DAMLA.draw(ctx, { x: HX, y: 895, s: 1.6, view: v.view, flip: v.flip, expr: 'curious', look: [0, -0.3], blink: E.blink(t, 4), squash: E.breath(t), t, seed: 1,
        arms: [[-1, 0.35], [1, 0.35]] });
      if (Math.sin(phi) < 0) { ball(); dam(); } else { dam(); ball(); }
      // etiketler
      const kl = E.se(t, s2 + 0.8, s2 + 1.6);
      if (kl > 0 && t < st) {
        ctx.save(); ctx.globalAlpha = kl * (1 - E.se(t, st - 0.5, st));
        INK.label(ctx, 'lamba = Güneş', LX - 40, LY - 120, { size: 40, weight: 700 });
        INK.label(ctx, 'top = Ay', bx - 60, by - 70, { size: 40, weight: 700 });
        INK.label(ctx, 'baş = Dünya', HX + 150, HY - 150, { size: 40, weight: 700 });
        ctx.restore();
      }
      if (t > sh && t < st) {
        const k = E.se(t, sh + 0.6, sh + 1.4);
        for (let i = -1; i <= 1; i++) { ctx.save(); ctx.globalAlpha = 0.8 * k; P.arrow(ctx, [LX + 60, LY + i * 12], [bx - 50, by + i * 22], k, { w: 3, color: AMB, bend: 0, head: 12 }); ctx.restore(); }
        P.write(ctx, 'hep yarısı aydınlık', bx - 200, by + 110, E.seg(t, sh + 1.6, sh + 2.8), { size: 42, color: '#8A4A10' });
      }
      // gördüğüm penceresi
      const kw = E.se(t, sh + 3.0, sh + 3.8, 'out');
      if (kw > 0) E.layer(ctx, kw, c => {
        const ix = 1640, iy = 300, ir = 150;
        const e = ((Math.PI - phi) % 6.2832 + 6.2832) % 6.2832;
        c.save(); c.beginPath(); c.arc(ix, iy, ir, 0, 7); c.fillStyle = '#2A2E44'; c.fill(); c.restore();
        F03.phaseMoon(c, ix, iy, 118, e, { alpha: 0.85 });
        stroke(c, circlePts(ix, iy, ir, ir, 50), { w: 4, closed: true });
        INK.label(c, 'başımdan görünen', ix, iy + ir + 50, { size: 36, weight: 700, align: 'center' });
      });
      if (t > st + 0.5) { const ka = E.se(t, st + 0.5, st + 1.3); ctx.save(); ctx.globalAlpha = ka; const pts = P.arc(HX, HY, RX + 40, 2.4, 0.8, 30, RY + 40); stroke(ctx, pts, { w: 3.4, color: AMB, dry: false }); arrowHead(ctx, pts[26], pts[30], 14, { w: 3, color: AMB }); ctx.restore(); }
    }
  });
})();
