// SAHNE 5 — Eğik düzlem (rampa: yol 2 kat → kuvvet yarı) ve vida (sarılmış eğik düzlem)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F8M;
  const X0 = 520, X1 = 1040, YB = 760, H = 300, U = 3.6, W = 40;   // rampa: yükseklik H, eğik yüzey 2H (30°)
  const ANG = -Math.asin(0.5);

  function ramp(ctx, t) {
    const s = E.s('ramp');
    F.floor(ctx, YB, 7);
    F.ramp(ctx, X0, YB, X1, YB - H, 3500);
    // kutu eğik yüzeyde yukarı kayar
    const L = Math.hypot(X1 - X0, H), u = [(X1 - X0) / L, -H / L], n = [-u[1] * -1, -u[0]];
    const p = E.se(t, s + 1.6, s + 5.2) * 0.72 + 0.1;
    const bx = X0 + u[0] * L * p, by = YB + u[1] * L * p;
    F.block(ctx, bx, by, 100, 80, W + ' N', { ang: ANG, seed: 3510, size: 30 });
    // eğik yüzey boyunca kuvvet (20 N)
    const kf = E.se(t, s + 0.8, s + 1.5);
    const c0 = [bx - u[0] * 70 - Math.sin(-ANG) * 0 + 0, by - u[1] * 70 - 40];
    F.vec(ctx, [c0[0] - u[0] * (W / 2) * U, c0[1] - u[1] * (W / 2) * U], c0, kf, { label: '20 N', lx: -60, ly: -50, size: 38 });
    // dik kaldırma: 40 N, yol h
    const kv = E.se(t, s + 2.6, s + 3.3);
    if (kv > 0) {
      ctx.save(); ctx.globalAlpha *= kv;
      F.block(ctx, X1 + 190, YB, 100, 80, W + ' N', { seed: 3511, size: 30 });
      F.vec(ctx, [X1 + 300, YB - 40], [X1 + 300, YB - 40 - W * U], 1, { label: '40 N', lx: 50, ly: 20, size: 38 });
      F.dim(ctx, X1 + 26, YB, YB - H, 'yol: h', { size: 38 });
      ctx.restore();
    }
    const kd = E.se(t, s + 3.6, s + 4.3);
    if (kd > 0) { ctx.save(); ctx.globalAlpha *= kd; const o = [-65, -113]; F.dash(ctx, [X0 + o[0], YB + o[1]], [X1 + o[0], YB - H + o[1]], 1); F.txt(ctx, 'yol: 2h', (X0 + X1) / 2 + o[0] - 50, YB - H / 2 + o[1] - 30, { size: 40, color: F.PATH, rot: ANG, align: 'center' }); ctx.restore(); }
    const ke = E.se(t, s + 5.0, s + 5.6);
    if (ke > 0) { ctx.save(); ctx.globalAlpha *= ke; F.txt(ctx, 'örnek: yükleme rampası, engelli rampası', 960, 860, { size: 38, align: 'center', alpha: 0.85 }); ctx.restore(); }
    INK.label(ctx, '(sürtünme ihmal edildi)', 1880, 100, { size: 30, align: 'right', alpha: 0.6 * E.se(t, s + 1, s + 2) });
  }

  function screw(ctx, t) {
    const s = E.s('screw');
    // 1) kâğıt dik üçgen (eğik düzlem)
    const k1 = E.se(t, s + 0.2, s + 0.9);
    if (k1 > 0) {
      ctx.save(); ctx.globalAlpha *= k1;
      const tri = [[260, 700], [640, 700], [640, 420], [260, 700]];
      P.fillPts(ctx, tri, PAL.white); stroke(ctx, tri, { w: 2.6, closed: true, seed: 3520 });
      line(ctx, [260, 700], [640, 420], { w: 7, color: PAL.light, dry: false, seed: 3521 });
      F.txt(ctx, 'eğik düzlem', 450, 770, { size: 40, align: 'center' });
      ctx.restore();
    }
    // 2) kaleme sarılınca sarmal
    const k2 = E.se(t, s + 1.4, s + 2.2);
    if (k2 > 0) {
      ctx.save(); ctx.globalAlpha *= k2;
      P.arrow(ctx, [680, 560], [800, 560], 1, { w: 3.4, head: 16 });
      F.txt(ctx, 'sar', 740, 530, { size: 36, align: 'center' });
      const cx = 900, r = 34, y0 = 400, y1 = 720;
      const cyl = F.rect(cx - r, y0, cx + r, y1); P.fillPts(ctx, cyl, '#F2E3BF'); wash(ctx, cyl, PAL.light, 0.25, 3522, { bleed: 1 }); stroke(ctx, cyl, { w: 2.6, closed: true, seed: 3523 });
      const pts = []; for (let i = 0; i <= 400; i++) { const u = i / 400, a = u * 5 * 2 * Math.PI; if (Math.cos(a) > 0) pts.push([cx + Math.sin(a) * r, y1 - 20 - u * (y1 - y0 - 40)]); else if (pts.length > 1) { stroke(ctx, pts.splice(0), { w: 5, color: '#C07F1E', dry: false, taper: 0 }); } else pts.length = 0; }
      if (pts.length > 1) stroke(ctx, pts, { w: 5, color: '#C07F1E', dry: false, taper: 0 });
      ctx.restore();
    }
    // 3) vida tahtaya ilerler
    const k3 = E.se(t, s + 2.8, s + 3.4);
    if (k3 > 0) {
      ctx.save(); ctx.globalAlpha *= k3;
      P.arrow(ctx, [990, 560], [1110, 560], 1, { w: 3.4, head: 16 });
      const turn = Math.max(0, t - (s + 3.4)) * 5, adv = turn / (2 * Math.PI) * 22 * 0.9;
      const wx = 1360, hy = 360 + adv;
      F.screw(ctx, wx, hy, 280, 22, turn, { pitch: 22 });
      const wood = F.rect(1180, 560, 1560, 720); P.fillPts(ctx, wood, '#E8D2A8', 0.9); wash(ctx, wood, F.WOOD, 0.45, 3530, { bleed: 1 }); stroke(ctx, wood, { w: 3, closed: true, seed: 3531 });
      F.spin(ctx, wx, hy - 20, 70, true, E.se(t, s + 3.4, s + 4.2));
      F.txt(ctx, 'vida', 1370, 790, { size: 44, align: 'center' });
      F.txt(ctx, 'az kuvvet · çok tur · yavaş ilerleme', 1370, 850, { size: 36, align: 'center', color: F.FORCE });
      ctx.restore();
    }
  }

  E.scene({
    name: 'Eğik düzlem', concept: 'Yol uzar, kuvvet azalır', from: 'ramp', to: 'ramp', trFrom: [960, 600],
    draw(ctx, t) {
      ramp(ctx, t);
      DAMLA.draw(ctx, { x: 300, y: YB, s: 0.95, view: 'q3', expr: 'curious', look: [0.8, -0.3], blink: E.blink(t, 7), squash: E.breath(t), t, seed: 4, arms: [[-1, 0.4], [1, [60, -140]]] });
    }
  });
  E.scene({
    name: 'Vida', concept: 'Vida: sarılmış eğik düzlem', from: 'screw', to: 'screw', trFrom: [960, 540],
    draw(ctx, t) {
      screw(ctx, t);
      DAMLA.draw(ctx, { x: 1740, y: 880, s: 0.9, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.2], blink: E.blink(t, 8), squash: E.breath(t), t, seed: 4, arms: [[-1, [-50, -150]], [1, 0.4]] });
    }
  });
})();
