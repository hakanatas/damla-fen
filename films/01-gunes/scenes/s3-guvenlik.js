// SAHNE 3 — Güvenlik: Güneş'e doğrudan ya da filtresiz araçla bakılmaz (TYMM güvenlik vurgusu)
(function () {
  const { PAL, line, stroke, circlePts, arrowHead, wash, splash } = INK;
  const RED = '#A23A2A';
  E.scene({
    name: 'Güvenlik', concept: 'Güneş\'e doğrudan bakılmaz', from: 'lens', to: 'tools-no', tr: 0.01,
    draw(ctx, t) {
      const hill = P.hillLine(E.W);
      const sl = E.s('lens'), sp = E.s('stop'), sn = E.s('never'), st = E.s('tools-no');
      const pan = E.se(t, sn - 0.2, sn + 1.2);
      ctx.save();
      E.cam(ctx, E.camLerp({ x: 960, y: 520, z: 1.12 }, { x: 1180, y: 540, z: 1.12 }, pan));
      const g = ctx.createRadialGradient(1500, 290, 50, 1500, 290, 900); g.addColorStop(0, 'rgba(227,160,58,0.3)'); g.addColorStop(1, 'rgba(227,160,58,0)');
      ctx.fillStyle = g; ctx.fillRect(-200, -200, E.W + 600, E.H + 400);
      P.sun(ctx, 1500, 290, 115, t, { nrays: 22 });
      P.landscape(ctx, E.W, E.H, t, { hill });
      const dx = 820, dy = P.hillY(hill, dx) + 4;

      let o = { x: dx, y: dy, s: 1.5, view: 'front', expr: 'curious', look: [0.8, -0.6], blink: E.blink(t, 4), squash: E.breath(t), t, talk: E.talk(t), seed: 1 };
      let lensFall = null;
      if (t < sp) { // raising the lens toward the Sun
        const k = E.se(t, sl + 0.2, sl + 2.2);
        o.arms = [[-1, 0.3], [1, 2.1 + k * 0.35]]; o.prop = 'lens'; o.propTilt = -0.5 - k * 0.2; o.lean = 0.06 * k;
      } else if (t < sn) { // DUR! — recoil, lens drops
        const k = E.se(t, sp, sp + 0.35, 'out');
        o.expr = 'surprised'; o.look = [0, 0]; o.squash = 1 + 0.12 * Math.sin(Math.min(1, (t - sp) / 0.5) * Math.PI); o.lean = -0.14 * k;
        o.arms = [[-1, 0.3 + 1.3 * k], [1, 2.45 - 0.9 * k]];
        lensFall = E.seg(t, sp + 0.05, sp + 0.75);
      } else { // cover eyes, turn away from the Sun
        o.view = 'q3'; o.flip = true; o.expr = 'neutral'; o.blink = 1; o.handR = 15; o.arms = [[-1, [-2, -126]], [1, [34, -128]]]; o.look = [0, 0.3];
        lensFall = 1;
      }
      DAMLA.draw(ctx, o);
      if (lensFall !== null) { // the magnifier falls to the grass
        const k = E.ease.in(lensFall); const x = E.lerp(dx + 118, dx + 175, lensFall), y = E.lerp(dy - 300, dy - 16, k);
        ctx.save(); ctx.translate(x, y); ctx.rotate(lensFall * 2.2); DAMLA.lensProp(ctx, [0, 0], [0, 1], {}); ctx.restore();
      }
      ctx.restore();

      // DUR! stamp (screen space)
      if (t >= sp && t < sn + 0.8) {
        const k = P.pop(E.seg(t, sp, sp + 0.35)), out = E.se(t, sn, sn + 0.8);
        ctx.save(); ctx.globalAlpha = 1 - out; ctx.translate(960, 300); ctx.scale(k * (1 + out * 0.2), k * (1 + out * 0.2)); ctx.rotate(-0.06);
        const plate = INK.wobble(circlePts(0, 0, 230, 120, 70), 3, 77); P.fillPts(ctx, plate, PAL.white, 0.95); stroke(ctx, plate, { w: 7, closed: true, color: RED, seed: 78 });
        ctx.font = '700 150px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = RED; ctx.fillText('DUR!', 0, 52);
        ctx.restore();
        if (t < sp + 1.2) { ctx.save(); ctx.globalAlpha = 1 - E.seg(t, sp + 0.4, sp + 1.2); splash(ctx, 960, 300, 150, 5, { n: 10, color: RED, alpha: 0.6 }); ctx.restore(); }
      }
      // safety card
      if (t >= sn) {
        const k = E.se(t, sn + 0.4, sn + 1.1, 'out');
        ctx.save(); ctx.translate((1 - k) * 700, 0);
        const card = [[1000, 140], [1850, 128], [1860, 930], [1010, 942], [1000, 140]];
        ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 24; P.fillPts(ctx, card, '#FAF6EC'); ctx.restore();
        stroke(ctx, card, { w: 3, closed: true, color: RED, seed: 88 });
        line(ctx, [1010, 214], [1850, 204], { w: 3, color: RED, dry: false });
        ctx.font = '700 46px Kalam'; ctx.fillStyle = RED; ctx.textAlign = 'center'; ctx.fillText('⚠  GÖZ SAĞLIĞI', 1430, 190);
        const toolsK = E.se(t, st, st + 0.8);
        // part 1: eye + sun
        E.layer(ctx, 1 - toolsK, ctx => {
        P.sun(ctx, 1250, 380, 58, t, { nrays: 14, glow: false, cells: false });
        for (let i = 0; i < 3; i++) P.arrow(ctx, [1320, 360 + i * 22], [1480, 400 + i * 8], E.se(t, sn + 1.2 + i * 0.15, sn + 1.8 + i * 0.15), { w: 3, color: '#C07F1E', bend: 0, head: 12 });
        P.icon.eye(ctx, 1600, 405, 0.95, E.se(t, sn + 2.2, sn + 3));
        P.write(ctx, 'Doğrudan bakma!', 1430, 580, E.seg(t, sn + 2.6, sn + 3.8), { size: 54, align: 'center' });
        P.write(ctx, 'Işığı gözlere zarar verir.', 1430, 640, E.seg(t, sn + 3.6, sn + 4.8), { size: 38, weight: 400, align: 'center' });
        });
        // part 2: no binoculars / telescope / magnifier without a solar filter
        if (toolsK > 0) E.layer(ctx, toolsK, ctx => {
          const items = [['binoculars', 'dürbün', 1150], ['telescope', 'teleskop', 1430], ['magnifier', 'büyüteç', 1710]];
          items.forEach(([ic, name, x], i) => {
            const ki = E.se(t, st + 0.3 + i * 1.3, st + 0.9 + i * 1.3, 'out'); if (ki <= 0) return;
            ctx.save(); ctx.translate(x, 330); ctx.scale(P.pop(ki), P.pop(ki)); P.icon[ic](ctx, 0, 0, 0.8); ctx.restore();
            P.cross(ctx, x, 330, 62, E.se(t, st + 0.7 + i * 1.3, st + 1.2 + i * 1.3), { w: 11, color: RED });
            P.write(ctx, name, x, 450, ki, { size: 38, align: 'center' });
          });
          P.write(ctx, 'güneş filtresi yoksa, asla!', 1430, 520, E.seg(t, st + 3.8, st + 4.8), { size: 42, align: 'center', color: RED });
          // why: lenses collect light to a hot point
          const kd = E.se(t, st + 5.2, st + 7.2);
          if (kd > 0) {
            const lx = 1400, ly = 730;
            ctx.save(); ctx.globalAlpha = Math.min(1, kd * 2);
            stroke(ctx, circlePts(lx, ly, 16, 80, 36), { w: 3.4, closed: true }); P.fillPts(ctx, circlePts(lx, ly, 16, 80, 36), PAL.water, 0.15);
            for (let i = -2; i <= 2; i++) {
              P.drawOn(ctx, [[1090, ly + i * 30], [lx, ly + i * 30]], E.seg(kd, 0, 0.4), { w: 2.6, color: '#C07F1E', dry: false });
              P.drawOn(ctx, [[lx, ly + i * 30], [1600, ly]], E.seg(kd, 0.4, 0.8), { w: 2.6, color: '#C07F1E', dry: false });
            }
            if (kd > 0.8) { const g2 = ctx.createRadialGradient(1600, ly, 0, 1600, ly, 40); g2.addColorStop(0, 'rgba(227,120,40,0.95)'); g2.addColorStop(1, 'rgba(227,160,58,0)'); ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(1600, ly, 40, 0, 7); ctx.fill(); }
            P.write(ctx, 'mercek ışığı toplar', 1430, 870, E.seg(kd, 0.7, 1), { size: 36, align: 'center', weight: 400 });
            ctx.restore();
          }
        });
        ctx.restore();
      }
    }
  });
})();
