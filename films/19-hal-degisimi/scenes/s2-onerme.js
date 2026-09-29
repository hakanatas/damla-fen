// SAHNE 2 — Önerme (FB.5.5.4 a) + gözleme dayalı olan/olmayan önermelerin karşılaştırılması (b)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F19;
  function miniWindow(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const g = [[-70, -60], [70, -60], [70, 60], [-70, 60], [-70, -60]];
    P.fillPts(ctx, g, '#F3E4C4'); P.sun(ctx, 30, -20, 22, 0, { nrays: 10, cells: false, glow: false });
    stroke(ctx, g, { w: 5, closed: true, color: '#8A6A45', seed: 2201 }); line(ctx, [0, -60], [0, 60], { w: 4, color: '#8A6A45', dry: false }); line(ctx, [-70, 0], [70, 0], { w: 4, color: '#8A6A45', dry: false });
    ctx.restore();
  }
  function row(ctx, x, y, txt, ok, k) {
    if (k <= 0) return;
    const box = [[x, y - 36], [x + 44, y - 38], [x + 46, y + 6], [x + 2, y + 8], [x, y - 36]];
    stroke(ctx, box, { w: 2.4, closed: true, seed: 2210 + (y | 0) });
    if (ok) P.check(ctx, x + 20, y - 16, 42, E.seg(k, 0.4, 1), { w: 6 });
    else P.cross(ctx, x + 23, y - 15, 15, E.seg(k, 0.4, 1), { w: 5, color: F.RED });
    P.write(ctx, txt, x + 66, y, E.seg(k, 0, 0.6), { size: 40 });
  }
  E.scene({
    name: 'Önerme', concept: 'Gözleme dayalı olan ve olmayan önermeler', from: 'guess', to: 'science', trFrom: [960, 540],
    draw(ctx, t) {
      const sg = E.s('guess'), sc = E.s('compare'), ss = E.s('science');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 90, 1620, 810);
      // proposition
      P.write(ctx, 'Önermem:', 290, 215, E.seg(t, sg + 0.4, sg + 1.2), { size: 50, color: '#8A4A10' });
      P.write(ctx, 'Maddeler ısı alınca ya da verince', 520, 215, E.seg(t, sg + 1.2, sg + 3.0), { size: 50 });
      P.write(ctx, 'hâl değiştirebilir.', 520, 285, E.seg(t, sg + 3.0, sg + 4.2), { size: 50 });
      if (t > sg + 4.2) P.drawOn(ctx, P.bez([520, 305], [700, 314], [900, 300], 30), E.se(t, sg + 4.2, sg + 4.8), { w: 3, color: PAL.light });
      // mini sketch next to the claim: ice → water
      const mk = E.se(t, sg + 4.6, sg + 5.6, 'out');
      if (mk > 0 && t < sc + 0.6) E.layer(ctx, mk * (1 - E.se(t, sc, sc + 0.6)), c => {
        DAMLA.draw(c, { x: 1200, y: 780, s: 1.0, state: 'ice', expr: 'neutral', t, seed: 1, shadow: false });
        P.arrow(c, [1290, 660], [1420, 660], 1, { w: 3.4, color: F.HEAT, bend: 26 });
        INK.label(c, 'ısı', 1355, 610, { size: 38, weight: 700, color: F.HEAT, align: 'center' });
        DAMLA.draw(c, { x: 1520, y: 780, s: 1.0, state: 'liquid', expr: 'happy', t, seed: 1, shadow: false });
      });
      // two cards: günlük deneyim vs gösteri deneyi
      const cols = [
        { x: 270, at: sc + 0.3, head: 'Günlük deneyim', sub: '“Pencerede dondum, Güneş’te eridim.”', ok: false, foot: 'gözleme dayalı değil', icon: (c) => miniWindow(c, 440, 590, 1.25) },
        { x: 1010, at: ss + 0.2, head: 'Gösteri deneyi', sub: '“Buzu ısıttım, sıcaklığını ölçtüm.”', ok: true, foot: 'bilimsel gözleme dayalı', icon: (c) => { F.beaker(c, 1180, 660, 160, 170, { level: 0.25, ice: 0.8, t }); F.heater(c, 1180, 666, 200, 0, t); line(c, [1215, 648], [1245, 470], { w: 5, seed: 2230 }); INK.inkDot(c, 1216, 640, 6, { color: '181,85,63' }); } }
      ];
      cols.forEach((cd, i) => {
        const k = E.se(t, cd.at, cd.at + 0.7, 'out'); if (k <= 0) return;
        ctx.save(); ctx.translate(cd.x + 320, 600); ctx.scale(P.pop(k), P.pop(k)); ctx.translate(-(cd.x + 320), -600);
        F.card(ctx, cd.x, 355, 640, 535, { seed: 2240 + i, fill: i ? '#FBF6E8' : '#F6F2EA' });
        INK.label(ctx, cd.head, cd.x + 320, 420, { size: 48, weight: 700, align: 'center', color: i ? '#8A4A10' : PAL.ink });
        cd.icon(ctx);
        ctx.restore();
        if (k < 1) return;
        const b = cd.at + 0.8;
        [['ölçüm', 0], ['kayıt', 1], ['tekrar', 2]].forEach(([w, j]) => row(ctx, cd.x + 380, 530 + j * 80, w, cd.ok, E.seg(t, b + j * 0.7, b + j * 0.7 + 0.9)));
        P.write(ctx, cd.sub, cd.x + 30, 790, E.seg(t, b + 2.2, b + 3.6), { size: 34, weight: 400 });
        const fk = E.se(t, b + 3.4, b + 4.2);
        if (fk > 0) { INK.label(ctx, cd.foot, cd.x + 320, 860, { size: 42, weight: 700, align: 'center', color: i ? PAL.water : '#7a6f62', alpha: fk }); }
      });
      // Damla peeking at the right edge
      const pk = E.se(t, sg + 0.1, sg + 0.9, 'out');
      DAMLA.draw(ctx, {
        x: 1745, y: 1070 + (1 - pk) * 300, s: 1.0, view: 'q3', flip: true, t, seed: 2, blink: E.blink(t, 6), squash: E.breath(t), talk: E.talk(t),
        expr: t > ss ? 'determined' : (t > sc ? 'thinking' : 'curious'), look: [-0.7, -0.4],
        arms: t > ss + 1 ? [[-1, 0.4], [1, 2.3 + Math.sin(t * 2) * 0.08]] : [[-1, 0.35], [1, 0.4]]
      });
    }
  });
})();
