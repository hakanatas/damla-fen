// SAHNE 5 — Yakından uzağa: sınıf → ev → sokak; çevredeki maddeleri etiketleme
// (TYMM: "Günlük yaşamda yakından uzağa ilkesi ile ... saydam, yarı saydam ve opak cisim olarak etiketlemeleri")
(function () {
  const { PAL, line, stroke, circlePts, wash, hatch } = INK;
  const F = F14;
  const PX = [120, 690, 1260], PY0 = 250, PY1 = 780, PW = 540;

  function classroom(ctx, x) {
    const w = [[x + 60, 300], [x + 300, 298], [x + 302, 520], [x + 62, 522], [x + 60, 300]];
    P.fillPts(ctx, w, '#CFE3EC'); stroke(ctx, w, { w: 4, closed: true, seed: 501 }); line(ctx, [x + 180, 300], [x + 181, 520], { w: 3 });
    line(ctx, [x + 90, 340], [x + 130, 310], { w: 3, color: PAL.white, dry: false });
    const d = [[x + 200, 610], [x + 500, 606], [x + 500, 640], [x + 200, 644], [x + 200, 610]];
    P.fillPts(ctx, d, '#B98C5A'); stroke(ctx, d, { w: 3, closed: true, seed: 502 });
    line(ctx, [x + 220, 642], [x + 222, 760], { w: 5 }); line(ctx, [x + 480, 640], [x + 478, 760], { w: 5 });
  }
  function home(ctx, x, t) {
    const w = [[x + 70, 300], [x + 330, 298], [x + 332, 560], [x + 72, 562], [x + 70, 300]];
    P.fillPts(ctx, w, '#CFE3EC'); stroke(ctx, w, { w: 4, closed: true, seed: 511 });
    F.glow(ctx, x + 200, 430, 180, 0.6);
    const tul = [[x + 60, 285], [x + 340, 285], [x + 345, 590], [x + 55, 590]]; P.fillPts(ctx, tul, 'rgba(250,248,242,0.65)');
    for (let i = 0; i < 8; i++) stroke(ctx, P.bez([x + 75 + i * 36, 288], [x + 85 + i * 36, 440], [x + 75 + i * 36, 588], 12), { w: 1.2, alpha: 0.4, dry: false, seed: 512 + i });
    stroke(ctx, tul.concat([tul[0]]), { w: 2, closed: true, alpha: 0.6, dry: false });
    const door = [[x + 390, 400], [x + 500, 398], [x + 502, 760], [x + 390, 762], [x + 390, 400]];
    P.fillPts(ctx, door, '#8A6A45', 0.85); stroke(ctx, door, { w: 3, closed: true, seed: 520 }); INK.inkDot(ctx, x + 480, 590, 5);
  }
  function street(ctx, x) {
    const wall = [[x + 20, 290], [x + 520, 286], [x + 520, 760], [x + 20, 762]]; P.fillPts(ctx, wall, '#C98F6A', 0.8);
    for (let r = 0; r < 12; r++) for (let c = 0; c < 8; c++) { const bx = x + 20 + c * 64 + (r % 2) * 32, by = 290 + r * 40; if (bx > x + 500) continue; stroke(ctx, [[bx, by], [bx + 60, by], [bx + 60, by + 38], [bx, by + 38], [bx, by]], { w: 1, alpha: 0.35, dry: false, closed: true, seed: 530 + r * 8 + c }); }
    const vit = [[x + 80, 400], [x + 400, 398], [x + 402, 700], [x + 82, 702], [x + 80, 400]];
    P.fillPts(ctx, vit, '#E4EEF2'); stroke(ctx, vit, { w: 5, closed: true, seed: 540 });
    [[x + 150, 640, '#D0605A'], [x + 240, 620, PAL.light], [x + 330, 650, PAL.life]].forEach(([cx, cy, col], i) => { const p = circlePts(cx, cy, 34, 40, 20); P.fillPts(ctx, p, col, 0.8); stroke(ctx, p, { w: 2, closed: true, dry: false, seed: 541 + i }); });
    line(ctx, [x + 110, 450], [x + 170, 410], { w: 3, color: PAL.white, dry: false });
  }

  E.scene({
    name: 'Yakından uzağa', concept: 'Çevredeki maddeleri etiketleme', from: 'near', to: 'far', trFrom: [400, 500],
    draw(ctx, t) {
      const sn = E.s('near'), sf = E.s('far');
      ctx.fillStyle = 'rgba(138,106,69,0.10)'; ctx.fillRect(0, 0, E.W, E.H);
      const ak = E.se(t, sn + 0.2, sn + 1.6);
      if (ak > 0) { P.arrow(ctx, [420, 185], [1560, 185], ak, { w: 4, head: 20, bend: 10, color: '#8A4A10' }); }
      P.write(ctx, 'yakından', 330, 200, E.seg(t, sn + 0.2, sn + 1.0), { size: 42, align: 'right', color: '#8A4A10' });
      P.write(ctx, 'uzağa', 1590, 200, E.seg(t, sn + 1.4, sn + 2.0), { size: 42, color: '#8A4A10' });
      const panels = [['sınıfım', sn + 0.4, x => classroom(ctx, x)], ['evim', sf + 0.2, x => home(ctx, x, t)], ['sokağım', sf + 3.0, x => street(ctx, x)]];
      panels.forEach(([name, at, fn], i) => {
        const k = E.se(t, at, at + 0.7, 'out'); if (k <= 0) return;
        const x = PX[i];
        ctx.save(); ctx.globalAlpha = k;
        const fr = F.card(ctx, x, PY0, PW, PY1 - PY0, { seed: 550 + i });
        ctx.save(); P.path(ctx, fr); ctx.clip(); fn(x); ctx.restore();
        ctx.restore();
        P.write(ctx, name, x + PW / 2, PY1 + 60, k, { size: 44, align: 'center' });
      });
      // stickers
      const tags = [[0, PX[0] + 180, 470, sn + 2.4], [2, PX[0] + 350, 580, sn + 4.4], [1, PX[1] + 200, 450, sf + 1.4], [2, PX[1] + 445, 700, sf + 2.2], [0, PX[2] + 240, 470, sf + 4.4], [2, PX[2] + 380, 340, sf + 5.6]];
      tags.forEach(([c, x, y, at]) => F.tag(ctx, c, x, y, E.se(t, at, at + 0.5)));
    }
  });
})();
