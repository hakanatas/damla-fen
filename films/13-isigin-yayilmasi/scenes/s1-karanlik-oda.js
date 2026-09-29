// SAHNE 1 — Karanlık oda: Damla ışığı kapatır, anahtar deliğinden süzülen ışık hüzmesi dümdüz ilerler
// (TYMM köprü kurma: "Kapının anahtar deliğinden karanlık odaya süzülen ışık hüzmesi")
(function () {
  const { PAL, line, stroke, circlePts, wash, rng, dashed } = INK;
  const F = F13;
  const FLOOR = 850, KH = [470, 600];           // keyhole
  const SPOT = [985, FLOOR];                      // where the beam meets the floor
  const DUST = (() => { const r = rng(131), a = []; for (let i = 0; i < 70; i++) a.push([r(), r(), r(), r()]); return a; })();

  function room(ctx, t, lampOn) {
    // wall + floor
    P.fillPts(ctx, [[-50, FLOOR], [2000, FLOOR], [2000, 1200], [-50, 1200]], '#D9C8A6', 0.55);
    stroke(ctx, [[-50, FLOOR], [1990, FLOOR - 4]], { w: 3, seed: 5 });
    for (let i = 0; i < 9; i++) line(ctx, [i * 240 - 40, FLOOR + 4], [i * 240 - 180, 1100], { w: 1.4, alpha: 0.35, dry: false, seed: 10 + i });
    // skirting
    line(ctx, [-50, FLOOR - 26], [1990, FLOOR - 30], { w: 1.6, alpha: 0.5, dry: false, seed: 6 });
    // door
    const door = [[180, FLOOR], [178, 250], [540, 246], [542, FLOOR]];
    P.fillPts(ctx, door, '#B98C5A', 0.55); wash(ctx, door, '#8A6A45', 0.35, 21, { bleed: 2, blooms: 1 });
    stroke(ctx, door.concat([door[0]]), { w: 4, closed: true, seed: 22 });
    stroke(ctx, [[160, FLOOR], [158, 230], [562, 226], [562, FLOOR]], { w: 3, seed: 23 });
    [[215, 290, 290, 250], [215, 590, 290, 210]].forEach(([x, y, w, h], i) => stroke(ctx, [[x, y], [x + w, y - 2], [x + w + 2, y + h], [x, y + h + 2], [x, y]], { w: 2, closed: true, alpha: 0.6, seed: 24 + i, dry: false }));
    // handle + keyhole
    P.fillPts(ctx, circlePts(KH[0], KH[1] - 42, 14, 14, 20), '#C9A45C'); stroke(ctx, circlePts(KH[0], KH[1] - 42, 14, 14, 20), { w: 2.4, closed: true, dry: false });
    line(ctx, [KH[0], KH[1] - 42], [KH[0] - 58, KH[1] - 40], { w: 9, seed: 26, taper: 0.05 });
    P.fillPts(ctx, circlePts(KH[0], KH[1] - 3, 7, 7, 16), PAL.ink); P.fillPts(ctx, [[KH[0] - 4, KH[1]], [KH[0] + 4, KH[1]], [KH[0] + 7, KH[1] + 16], [KH[0] - 7, KH[1] + 16]], PAL.ink);
    // window with night sky (curtain closed)
    const win = [[1330, 300], [1640, 296], [1642, 600], [1332, 604], [1330, 300]];
    P.fillPts(ctx, win, '#2B3550', 0.55); stroke(ctx, win, { w: 3, closed: true, seed: 31 });
    const cur = [[1310, 280], [1500, 278], [1470, 640], [1300, 640]]; P.fillPts(ctx, cur, '#6F8A3A', 0.35); wash(ctx, cur, PAL.life, 0.35, 32, { bleed: 2 }); stroke(ctx, cur.concat([cur[0]]), { w: 2.4, closed: true, seed: 33 });
    const cur2 = [[1500, 278], [1662, 280], [1664, 640], [1520, 640]]; P.fillPts(ctx, cur2, '#6F8A3A', 0.35); wash(ctx, cur2, PAL.life, 0.35, 34, { bleed: 2 }); stroke(ctx, cur2.concat([cur2[0]]), { w: 2.4, closed: true, seed: 35 });
    line(ctx, [1290, 276], [1690, 272], { w: 5, seed: 36 });
    // ceiling lamp
    line(ctx, [1760, -10], [1760, 200], { w: 2.4, seed: 41 });
    const shade = [[1700, 250], [1820, 250], [1790, 196], [1730, 196], [1700, 250]];
    if (lampOn > 0) { F.glow(ctx, 1760, 280, 700, lampOn * 0.8); }
    P.fillPts(ctx, shade, '#E6DCC6'); stroke(ctx, shade, { w: 3, closed: true, seed: 42 });
    P.fillPts(ctx, P.arc(1760, 252, 22, 0, Math.PI, 16), lampOn > 0.5 ? '#FFF1C4' : PAL.white); stroke(ctx, P.arc(1760, 252, 22, 0, Math.PI, 16), { w: 2.2, dry: false });
    // light switch
    const sw = [[995, 628], [1027, 627], [1028, 676], [996, 677], [995, 628]];
    P.fillPts(ctx, sw, PAL.white); stroke(ctx, sw, { w: 2.4, closed: true, seed: 43, dry: false });
    line(ctx, [1011, 650 + (lampOn > 0.5 ? -8 : 8)], [1011, 654], { w: 6, dry: false, seed: 44 });
  }

  E.scene({
    name: 'Karanlık oda', concept: 'Anahtar deliğinden süzülen ışık', from: 'title', to: 'beam',
    draw(ctx, t) {
      const sh = E.s('hello'), sk = E.s('keyhole'), sb = E.s('beam');
      const off = E.se(t, sh + 2.6, sh + 3.4);          // lamp switched off
      const lampOn = 1 - off;
      const dark = 0.62 * off;
      const zoom = E.se(t, sb - 0.2, sb + 2.5);
      ctx.save();
      E.cam(ctx, E.camLerp({ x: 960, y: 540, z: 1 }, { x: 900, y: 600, z: 1.12 }, zoom));
      room(ctx, t, lampOn);
      F.dark(ctx, dark);

      // ---- Damla ----
      const dx = 1150, dy = FLOOR + 2;
      const reach = Math.sin(Math.PI * E.seg(t, sh + 1.6, sh + 3.8));
      const watch = t > sk;
      let arms = [[-1, 0.35], [1, 0.35]];
      if (t > sh && t < sh + 1.6) arms = [[-1, 0.35], [1, 2.35 + 0.35 * Math.sin(t * 9)]]; // wave
      if (reach > 0) arms = [[-1, [-100 * reach - 30 * (1 - reach), -140 * reach - 70 * (1 - reach)]], [1, 0.35]];
      let expr = 'happy', look = [0, 0.1], view = 'front', flip = false;
      if (t > sh + 1.6) { expr = 'curious'; look = [-0.8, 0]; }
      if (watch) { view = 'q3'; flip = true; expr = t > sk + 1.2 ? 'surprised' : 'curious'; look = [-0.5, 0.35]; }
      if (t > sb + 1.5) { expr = 'happy'; arms = [[-1, 0.35], [1, [60 + 15 * Math.sin(t * 2), -150]]]; }
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.4, view, flip, expr, look, blink: E.blink(t, 2), squash: E.breath(t), arms, t, seed: 1 });
      F.dark(ctx, 0.18 * off);

      // ---- keyhole beam (hallway light) ----
      const bk = E.se(t, sk + 0.3, sk + 1.6);
      if (bk > 0) {
        const tip = F.at(KH, SPOT, bk);
        const u = [SPOT[0] - KH[0], SPOT[1] - KH[1]], L = Math.hypot(...u), n = [-u[1] / L, u[0] / L];
        const w0 = 5, w1 = 5 + 34 * bk;
        const beam = [[KH[0] + n[0] * w0, KH[1] + 8 + n[1] * w0], [tip[0] + n[0] * w1, tip[1] + n[1] * w1], [tip[0] - n[0] * w1, tip[1] - n[1] * w1], [KH[0] - n[0] * w0, KH[1] + 8 - n[1] * w0]];
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        const g = ctx.createLinearGradient(KH[0], KH[1], SPOT[0], SPOT[1]); g.addColorStop(0, 'rgba(240,180,80,0.5)'); g.addColorStop(1, 'rgba(240,180,80,0.22)');
        ctx.fillStyle = g; P.path(ctx, beam); ctx.closePath(); ctx.fill();
        ctx.restore();
        stroke(ctx, [beam[0], beam[1]], { w: 1.4, color: F.AMB, alpha: 0.6, dry: false });
        stroke(ctx, [beam[3], beam[2]], { w: 1.4, color: F.AMB, alpha: 0.6, dry: false });
        if (bk > 0.95) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(240,180,80,0.35)'; ctx.beginPath(); ctx.ellipse(SPOT[0], SPOT[1] + 4, 70, 14, 0, 0, 7); ctx.fill(); ctx.restore(); }
        F.glow(ctx, KH[0], KH[1] + 8, 40, bk);
        // dust motes: bright only inside the beam
        DUST.forEach(([a, b, c, d]) => {
          const x = 480 + a * 560 + Math.sin(t * 0.4 + d * 9) * 20, y = 420 + ((b * 480 + t * (6 + c * 10)) % 480);
          const px = x - KH[0], py = y - KH[1], along = (px * u[0] + py * u[1]) / L, perp = Math.abs(px * n[0] + py * n[1]);
          const halfW = 5 + 34 * E.clamp(along / L);
          const inside = along > 0 && along < L * bk && perp < halfW;
          ctx.save(); ctx.fillStyle = inside ? 'rgba(255,236,190,0.95)' : 'rgba(200,190,170,0.10)';
          ctx.beginPath(); ctx.arc(x, y, inside ? 2.4 + c * 1.6 : 1.4, 0, 7); ctx.fill(); ctx.restore();
        });
      }
      // ruler check: the beam is straight
      const rk = E.se(t, sb + 2.2, sb + 3.2);
      if (rk > 0) {
        const u = [SPOT[0] - KH[0], SPOT[1] - KH[1]], L = Math.hypot(...u), n = [-u[1] / L, u[0] / L], o = 58;
        const a = [KH[0] + n[0] * o - u[0] / L * 30, KH[1] + n[1] * o - u[1] / L * 30], b = [SPOT[0] + n[0] * o, SPOT[1] + n[1] * o - 10];
        ctx.save(); ctx.globalAlpha = rk;
        dashed(ctx, P.partial(P.bez(a, F.at(a, b, 0.5), b, 40), rk), { w: 3, on: 14, off: 9, color: PAL.white });
        ctx.restore();
        P.write(ctx, 'dümdüz!', 830, 610, E.se(t, sb + 3.0, sb + 4.0), { size: 56, color: '#F6D9A0' });
      }
      ctx.restore();

      // ---- Title card ----
      const t1 = E.e('title') + 1.2;
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 170, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '13 · Işığın Yolculuğu', 960, 250, t, 1.2, t1, { size: 58, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 5. sınıf · Ünite 4', 960, 305, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 195], [960, 205], [1280, 191], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
    }
  });
})();
