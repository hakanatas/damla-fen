// SAHNE 1–2 — Mutfak: merak (çöp torbası) → güvenlik (eldiven, kırık cam, pil) → evsel katı atıklar yere serilir
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const RED = W7.RED;
  const FY = 820, DX = 640, DY = FY + 6, BAG = [1000, FY - 70];
  // dökülme sonrası dağınık yerleşim (sahne 3–5 bu listeyi kullanır)
  const SCATTER = [
    ['gazete', 1000, 575, -0.1], ['camSise', 1150, 560, 0.25], ['kumas', 1310, 585, 0.1], ['konserve', 1470, 565, -0.2], ['mendil', 1630, 590, 0], ['porselen', 1785, 580, 0.3],
    ['karton', 930, 700, 0.05], ['muz', 1090, 705, 0.4], ['pil', 1240, 700, -0.3], ['yogurt', 1390, 695, 0.15], ['elma', 1540, 700, -0.2], ['icecek', 1690, 690, 1.2],
    ['plastikSise', 1030, 800, 1.45], ['kavanoz', 1200, 795, 0], ['pecete', 1370, 800, 0.2]
  ];
  W7.SCATTER = SCATTER;

  function damla(ctx, t, o) {
    DAMLA.draw(ctx, Object.assign({ x: DX, y: DY, s: 1.45, view: 'front', expr: 'neutral', look: [0.3, 0.1], blink: E.blink(t, 3), squash: E.breath(t), t, talk: E.talk(t), seed: 1 }, o));
  }
  function gloves(ctx, res, k) { if (k <= 0) return; ctx.save(); ctx.globalAlpha *= k; [-1, 1].forEach(sd => res[sd] && W7.glove(ctx, res[sd].hand, sd)); ctx.restore(); }

  function room(ctx, t) {
    W7.room(ctx, t, { floor: FY, wx: 1480, night: true });
    W7.kitchenCan(ctx, 330, FY + 2, 1, 0);
  }

  E.scene({
    name: 'Mutfak', concept: 'Merak: çöp torbasındakiler', from: 'title', to: 'bag',
    draw(ctx, t) {
      const sh = E.s('hello'), sb = E.s('bag');
      ctx.save();
      const z = E.se(t, sh, E.e('bag'), 'sine');
      E.cam(ctx, E.camLerp({ x: 960, y: 540, z: 1 }, { x: 980, y: 560, z: 1.06 }, z));
      room(ctx, t);
      W7.item(ctx, 'torba', BAG[0], BAG[1], 1);
      // Damla
      let arms = [[-1, 0.35], [1, 0.35]], expr = 'neutral', look = [0, 0.1], lean = 0, flip = false, view = 'front';
      if (t > sh + 0.4 && t < sb) { arms = [[-1, 0.35], [1, 2.35 + 0.35 * Math.sin(t * 9)]]; expr = 'happy'; }
      if (t >= sb) { view = 'q3'; expr = 'thinking'; look = [0.8, 0.2]; arms = [[-1, 0.3], [1, [30, -86]]]; lean = Math.sin(t * 1.2) * 0.03; }
      damla(ctx, t, { arms, expr, look, lean, view, flip });
      // soru işareti torbanın üstünde
      if (t > sb + 1.0) {
        const k = E.se(t, sb + 1.0, sb + 2.0); const qx = BAG[0] + 10, qy = BAG[1] - 250;
        P.drawOn(ctx, P.arc(qx, qy, 34, Math.PI * 1.1, Math.PI * 2.45, 30).concat([[qx + 12, qy + 58], [qx + 2, qy + 82]]), k, { w: 9 });
        if (k > 0.95) INK.inkDot(ctx, qx + 2, qy + 110, 7);
      }
      ctx.restore();
      // başlık kartı
      const t1 = E.e('title') + 1.4;
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '25 · Atıklarımızı Tanıyalım', 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 5. sınıf · Ünite 7', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.life }); ctx.restore(); }
    }
  });

  E.scene({
    name: 'Güvenlik', concept: 'Eldiven; kırık cam ve pil', from: 'stop', to: 'spill', tr: 0.01,
    draw(ctx, t) {
      const ss = E.s('stop'), sa = E.s('adult'), sp = E.s('spill');
      ctx.save();
      E.cam(ctx, E.camLerp({ x: 980, y: 560, z: 1.06 }, { x: 960, y: 540, z: 1 }, E.se(t, sp - 0.5, sp + 1)));
      room(ctx, t);
      // torba: dökülürken devrilir
      const tip = E.se(t, sp + 0.2, sp + 1.0);
      ctx.save(); ctx.globalAlpha *= 1 - 0.55 * E.se(t, sp + 1.2, sp + 2.4);
      ctx.translate(BAG[0] - 90 * tip, BAG[1] + 20 * tip); ctx.rotate(-1.35 * tip); W7.D.torba(ctx); ctx.restore();
      // atıklar yere dökülür
      if (t > sp + 0.7) SCATTER.forEach(([key, x, y, r], i) => {
        const a = sp + 0.7 + i * 0.13, k = E.seg(t, a, a + 0.7); if (k <= 0) return;
        const e = E.ease.out(k); const x0 = BAG[0] - 150, y0 = BAG[1] - 20;
        const px = E.lerp(x0, x, e), py = E.lerp(y0, y, e) - Math.sin(k * Math.PI) * 120;
        W7.item(ctx, key, px, py, 0.8 * (0.5 + 0.5 * e), r * e + (1 - e) * 2);
      });
      // Damla
      const gk = E.se(t, ss + 3.6, ss + 4.4);
      let o = { expr: 'determined', look: [0.2, 0], view: 'front' };
      if (t < ss + 2.8) { const k = E.se(t, ss, ss + 0.4, 'out'); o.arms = [[-1, 0.35], [1, 0.35 + 2.6 * k]]; o.expr = 'surprised'; }
      else if (t < sa) { const w = Math.sin((t - ss) * 6); o.arms = [[-1, 1.4 + 0.15 * w], [1, 1.4 - 0.15 * w]]; o.look = [0, 0.6]; }
      else if (t < sp) { o.arms = [[-1, 0.4], [1, 0.4]]; o.look = [0.8, -0.1]; o.expr = 'neutral'; }
      else { o.arms = [[-1, 0.4], [1, 1.9]]; o.look = [0.8, 0.3]; o.expr = 'curious'; o.view = 'q3'; }
      o.hold = (c, res) => gloves(c, res, gk);
      damla(ctx, t, o);
      ctx.restore();

      // güvenlik kartı
      const ck = Math.min(E.se(t, ss + 0.5, ss + 1.2, 'out'), 1 - E.se(t, sp - 0.3, sp + 0.4));
      if (ck > 0) {
        ctx.save(); ctx.translate((1 - ck) * 900, 0);
        const card = [[1010, 150], [1850, 138], [1860, 890], [1020, 900], [1010, 150]];
        ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 24; P.fillPts(ctx, card, '#FAF6EC'); ctx.restore();
        stroke(ctx, card, { w: 3, closed: true, color: RED, seed: 88 });
        line(ctx, [1020, 226], [1850, 216], { w: 3, color: RED, dry: false });
        ctx.font = '700 46px Kalam'; ctx.fillStyle = RED; ctx.textAlign = 'center'; ctx.fillText('⚠  GÜVENLİK', 1435, 200);
        const rows = [
          { at: ss + 1.3, draw: c => { c.save(); c.scale(3.2, 3.2); W7.glove(c, [0, 0], 1); c.restore(); }, a: 'Eldiven tak.', b: 'Atıkları çıplak elle karıştırma.' },
          { at: sa + 0.3, draw: c => W7.item(c, 'porselen', 0, 0, 0.9), a: 'Kırık cam, porselen:', b: 'bir yetişkin toplar.', red: true },
          { at: sa + 3.6, draw: c => W7.item(c, 'pil', 0, 0, 0.9, -0.3), a: 'Pil:', b: 'asla açma, ısırma, ateşe atma.', red: true }
        ];
        rows.forEach((r, i) => {
          const k = E.se(t, r.at, r.at + 0.6, 'out'); if (k <= 0) return;
          const y = 330 + i * 200;
          ctx.save(); ctx.translate(1130, y); ctx.scale(P.pop(k), P.pop(k)); r.draw(ctx); ctx.restore();
          P.write(ctx, r.a, 1230, y - 8, E.seg(t, r.at + 0.2, r.at + 1.2), { size: 44, color: r.red ? RED : PAL.ink });
          P.write(ctx, r.b, 1230, y + 46, E.seg(t, r.at + 0.8, r.at + 1.8), { size: 34, weight: 400 });
        });
        ctx.restore();
      }
      // evsel atık tanımı
      const dk = E.se(t, sp + 2.8, sp + 3.6);
      if (dk > 0) {
        P.write(ctx, 'evsel atık', 960, 250, E.seg(t, sp + 2.8, sp + 3.8), { size: 76, align: 'center' });
        P.write(ctx, '= evlerimizde oluşan atıklar', 960, 318, E.seg(t, sp + 3.6, sp + 4.8), { size: 44, weight: 400, align: 'center' });
        P.write(ctx, 'bu filmde: katı atıklar', 960, 378, E.seg(t, sp + 5.2, sp + 6.2), { size: 38, align: 'center', color: '#3F7A3A' });
        P.drawOn(ctx, P.bez([790, 272], [960, 282], [1130, 268], 20), E.se(t, sp + 3.6, sp + 4.2), { w: 3, color: PAL.life });
      }
    }
  });
})();
