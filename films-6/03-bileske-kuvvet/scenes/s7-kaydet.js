// SAHNE 7 — Kaydet + Sıra sende (poster görevi) + sonraki film + bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const ITEMS = [
    ['Bileşke kuvvet: kuvvetlerin etkisini tek başına yapan kuvvet.', PAL.ink],
    ['Aynı yön → topla.  Zıt yön → farkı al, büyük kuvvetin yönü.', PAL.ink],
    ['Bileşke = 0 → dengelenmiş: duran cisim durur.', PAL.life],
    ['Bileşke ≠ 0 → dengelenmemiş: duran cisim harekete geçer.', '#8A4A10'],
    ['Dengeleyici kuvvet: bileşkeye eşit büyüklükte, zıt yönde.', PAL.life]
  ];
  E.scene({
    name: 'Kaydet', concept: 'Bileşke kuvvet ve denge özeti', from: 'record', to: 'task', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record'), st = E.s('task');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 170, 1620, 740);
      P.write(ctx, 'Gözlem Defteri · Bileşke Kuvvet', 290, 260, E.seg(t, sr + 0.3, sr + 1.5), { size: 60 });
      if (t > sr + 1.5) P.drawOn(ctx, P.bez([286, 282], [700, 294], [1160, 278], 30), E.se(t, sr + 1.5, sr + 2.0), { w: 3, color: PAL.light });
      const la = 1 - E.se(t, st - 0.2, st + 0.5);
      if (la > 0) E.layer(ctx, la, c => ITEMS.forEach(([txt, col], i) => {
        const at = sr + 2.0 + i * 1.7, y = 380 + i * 104;
        const box = [[300, y - 44], [350, y - 46], [352, y + 4], [302, y + 6], [300, y - 44]];
        if (t > at - 0.3) stroke(c, box, { w: 2.4, closed: true, seed: 3700 + i });
        P.check(c, 324, y - 22, 46, E.se(t, at + 1.0, at + 1.4), { w: 6 });
        P.write(c, txt, 385, y, E.seg(t, at, at + 1.3), { size: 44, color: col });
      }));
      // task card
      const tk = E.se(t, st, st + 0.7, 'out');
      if (tk > 0) E.layer(ctx, tk, c => {
        F63.card(c, 330, 290, 1590, 840, { seed: 3720 });
        P.write(c, 'Sıra sende!', 420, 390, E.seg(t, st + 0.3, st + 1.2), { size: 70, color: '#8A4A10' });
        P.write(c, 'Günlük yaşamdan dengelenmiş ve', 420, 490, E.seg(t, st + 1.0, st + 2.2), { size: 50 });
        P.write(c, 'dengelenmemiş kuvvet örnekleri bul.', 420, 555, E.seg(t, st + 1.8, st + 3.0), { size: 50 });
        P.write(c, 'Bir poster hazırla; okları ölçekli çiz.', 420, 640, E.seg(t, st + 2.8, st + 4.0), { size: 50 });
        INK.label(c, 'Araştır: İbni Sina kuvvet ve hareket hakkında ne düşünüyordu?', 420, 750, { size: 34, alpha: 0.65 * E.se(t, st + 4.2, st + 5.0) });
        // mini poster sketch
        const px = 1340, py = 520;
        const pp = [[px - 120, py - 150], [px + 120, py - 152], [px + 122, py + 150], [px - 120, py + 152], [px - 120, py - 150]];
        P.fillPts(c, pp, '#FBF8F1'); stroke(c, pp, { w: 2.6, closed: true, seed: 3730 });
        INK.label(c, 'POSTER', px, py - 105, { size: 30, weight: 700, align: 'center' });
        F63.box(c, px, py - 20, 60, 50, 3731);
        INK.line(c, [px + 30, py - 45], [px + 100, py - 45], { w: 4, color: F63.BR, dry: false }); INK.arrowHead(c, [px + 30, py - 45], [px + 100, py - 45], 12, { w: 3, color: F63.BR });
        INK.line(c, [px - 30, py - 45], [px - 100, py - 45], { w: 4, color: F63.BR, dry: false }); INK.arrowHead(c, [px - 30, py - 45], [px - 100, py - 45], 12, { w: 3, color: F63.BR });
        [30, 60, 90].forEach((dy, i) => line(c, [px - 90, py + dy], [px + 90 - i * 30, py + dy], { w: 2, alpha: 0.5, dry: false, seed: 3735 + i }));
      });
      const cheer = t > st + 0.6;
      DAMLA.draw(ctx, { x: 1690, y: 1040, s: 1.05, view: 'q3', flip: true, expr: cheer ? 'happy' : 'neutral', look: [-0.7, 0.2], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 1,
        arms: cheer ? [[-1, 0.4], [1, 2.6]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: cheer ? null : 'notebook' });
    }
  });
  E.scene({
    name: 'Sıradaki', concept: 'Sonraki film: Sürat ve hız', from: 'next', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sn = E.s('next');
      ctx.save(); ctx.globalAlpha = 0.1; ctx.fillStyle = PAL.water; ctx.fillRect(0, 0, E.W, 700); ctx.restore();
      line(ctx, [0, 700], [1920, 702], { w: 3.4, seed: 3750, taper: 0.01 });
      const x = -200 + 380 * (t - sn);
      F63.car(ctx, x, 700, 1, t, x);
      for (let i = 0; i < 3; i++) line(ctx, [x - 120 - i * 10, 640 + i * 16], [x - 190 - i * 18, 640 + i * 16], { w: 2.4, alpha: 0.5, dry: false, seed: 3751 + i });
      DAMLA.draw(ctx, { x: 1500, y: 700, s: 1.3, view: 'q3', flip: true, expr: 'happy', look: [-0.8, 0], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      E.inkText(ctx, 'Sıradaki gözlem:', 960, 250, t, sn + 0.6, 1e9, { size: 50, align: 'center', weight: 400 });
      E.inkText(ctx, '4 · Sürat ve Hız', 960, 340, t, sn + 1.2, 1e9, { size: 76, align: 'center' });
      F63.endCard(ctx, t, '3 · Kuvvetler Bir Araya Gelince', 'FB.6.2.1 · FB.6.2.2');
    }
  });
})();
