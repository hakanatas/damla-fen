// SAHNE 1 — Köprü: çaydanlıktaki görüntü (küçük, şişkin) ve boy aynasındaki görüntü (aynı boy)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F612;
  const DX = 960, FLOOR = 880, S = 1.25;

  E.scene({
    name: 'Çaydanlık', concept: 'Köprü: farklı görüntüler', from: 'title', to: 'kettle',
    draw(ctx, t) {
      const sh = E.s('hello'), sk = E.s('kettle');
      line(ctx, [60, FLOOR], [1860, FLOOR], { w: 3, seed: 1001 });
      // masa + çaydanlık
      const top = [[260, 700], [760, 696], [760, 716], [260, 720], [260, 700]];
      P.fillPts(ctx, top, '#B08A5A', 0.9); stroke(ctx, top, { w: 2.6, closed: true, seed: 1002 });
      line(ctx, [290, 718], [296, FLOOR], { w: 4, seed: 1003 }); line(ctx, [730, 716], [724, FLOOR], { w: 4, seed: 1004 });
      const ik = E.se(t, sh + 1.0, sh + 2.0);
      F.kettle(ctx, 500, 580, 0.95, c => {
        // tümsek yüzeyde görüntü: küçük ve şişkin (yatayda geniş)
        if (ik > 0) E.layer(c, 0.75 * ik, cc => { cc.save(); cc.translate(40, 70); cc.scale(0.6, 0.46); cc.translate(-40, -70); DAMLA.draw(cc, { x: 40, y: 70, s: 1, view: 'q3', flip: true, expr: 'surprised', blink: E.blink(t, 2), t, seed: 1, shadow: false }); cc.restore(); });
      });
      INK.label(ctx, 'çaydanlık: küçük ve şişkin', 500, 360, { size: 36, weight: 700, align: 'center', alpha: E.se(t, sh + 2.4, sh + 3.0) });
      // boy aynası
      const mk = E.se(t, E.e('title') - 0.5, E.e('title') + 0.5);
      if (mk > 0) E.layer(ctx, mk, c => {
        const M = [[1340, 360], [1640, 356], [1644, 878], [1344, 880], [1340, 360]];
        P.fillPts(c, M, '#E3ECF0');
        const k2 = E.se(t, sk + 0.3, sk + 1.2);
        if (k2 > 0) { c.save(); P.path(c, M); c.clip(); E.layer(c, 0.7 * k2, cc => DAMLA.draw(cc, { x: 1492, y: FLOOR - 4, s: S, view: 'q3', flip: true, expr: 'happy', look: [-0.6, 0], blink: E.blink(t, 2), squash: E.breath(t), t, seed: 1, shadow: false })); c.restore(); }
        c.save(); c.globalAlpha *= 0.45; stroke(c, [[1380, 420], [1470, 380]], { w: 5, color: '#FFFFFF', dry: false }); c.restore();
        stroke(c, M, { w: 12, closed: true, color: '#8A6A45', seed: 1005, dry: false });
        INK.label(c, 'boy aynası: aynı boyda', 1490, 330, { size: 36, weight: 700, align: 'center', alpha: E.se(t, sk + 1.2, sk + 1.8) });
      });
      // Damla
      const turn = t > sk;
      DAMLA.draw(ctx, { x: DX, y: FLOOR, s: S, view: 'q3', flip: !turn, expr: t > sk + 3 ? 'thinking' : (t > sh + 1 ? 'surprised' : 'happy'), look: turn ? [0.8, 0] : [-0.8, 0.2], blink: E.blink(t, 3), squash: E.breath(t), t, talk: E.talk(t), seed: 1,
        arms: t > sk + 3 ? [[-1, 0.35], [1, [34, -150], 1]] : [[-1, 0.35], [1, 0.35]] });
      if (t > sk + 3.2) { const k = E.se(t, sk + 3.2, sk + 4, 'out'); INK.label(ctx, '?', DX + 30, FLOOR - 330, { size: 100 * P.pop(k), weight: 700, color: '#8A4A10' }); }
      // başlık
      const t1 = E.e('title') + 1.4;
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '12 · Aynalar', 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 6. sınıf · Ünite 4', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.8 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
    }
  });
})();
