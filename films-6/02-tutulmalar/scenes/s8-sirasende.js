// SAHNE 8 — Sıra sende (atık malzemeli model, araştırma) + sonraki film + bitiş
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = G62;

  function task(ctx, t) {
    const st = E.s('task'), sr = E.s('research');
    F.card(ctx, 250, 170, 1420, 700, { seed: 160 });
    P.write(ctx, 'Sıra sende!', 330, 270, E.seg(t, st + 0.2, st + 1.0), { size: 72, color: '#8A4A10' });
    P.drawOn(ctx, P.bez([326, 292], [520, 302], [720, 288], 20), E.se(t, st + 1.0, st + 1.5), { w: 3, color: PAL.light });
    P.write(ctx, '1. Atık malzemelerle tutulma modelini kur:', 330, 390, E.seg(t, st + 1.2, st + 2.6), { size: 46 });
    P.write(ctx, 'el feneri · oyun hamuru · tel ya da karton çember', 380, 450, E.seg(t, st + 2.6, st + 3.8), { size: 38, weight: 400, color: '#8A4A10' });
    P.write(ctx, '2. Arkadaşlarınınkiyle karşılaştır, birlikte geliştir.', 330, 540, E.seg(t, st + 3.6, st + 5.0), { size: 46 });
    P.write(ctx, '3. Araştır: En son tutulma ne zaman oldu?', 330, 650, E.seg(t, sr + 0.3, sr + 1.8), { size: 46 });
    P.write(ctx, 'En yakın tutulma ne zaman olacak?', 400, 715, E.seg(t, sr + 2.2, sr + 3.6), { size: 46 });
    const ck = E.se(t, sr + 0.5, sr + 1.2, 'out');
    if (ck > 0) { ctx.save(); ctx.globalAlpha = ck; P.icon.calendar(ctx, 1480, 680, 1.0 * P.pop(ck), '?'); ctx.restore(); }
    INK.label(ctx, 'güvenilir kaynaklar: kütüphane · resmî gözlemevleri · öğretmenin', 330, 810, { size: 30, alpha: 0.6 * E.se(t, sr + 4.2, sr + 5.0) });
  }

  function next(ctx, t) {
    const sn = E.s('next');
    const hill = P.hillLine(E.W, 960);
    P.landscape(ctx, E.W, E.H, t, { hill, tree: false });
    // bir kutuya aynı yönde iki kuvvet (bileşke kuvvet ipucu)
    const bx = 1320, by = P.hillY(hill, 1320) - 2;
    const box = [[bx - 90, by], [bx + 90, by], [bx + 90, by - 150], [bx - 90, by - 150], [bx - 90, by]];
    P.fillPts(ctx, box, '#D9BE8E', 1); INK.wash(ctx, box, '#8A6A45', 0.4, 5, { blooms: 0 }); stroke(ctx, box, { w: 3, closed: true });
    const k1 = E.se(t, sn + 1.0, sn + 1.8), k2 = E.se(t, sn + 1.8, sn + 2.6);
    if (k1 > 0) P.arrow(ctx, [bx - 330, by - 110], [bx - 100, by - 110], k1, { w: 6, head: 22, color: PAL.water });
    if (k2 > 0) P.arrow(ctx, [bx - 330, by - 50], [bx - 100, by - 50], k2, { w: 6, head: 22, color: PAL.water });
    const k3 = E.se(t, sn + 3.0, sn + 3.8); if (k3 > 0) P.arrow(ctx, [bx + 100, by - 80], [bx + 420, by - 80], k3, { w: 10, head: 28, color: '#8A4A10' });
    E.inkText(ctx, '?', bx + 460, by - 60, t, sn + 3.8, E.e('end'), { size: 70, color: '#8A4A10' });
    DAMLA.draw(ctx, { x: 560, y: P.hillY(hill, 560) + 4, s: 1.35, view: 'front', expr: 'happy', look: [0.2, 0], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    E.inkText(ctx, 'Sıradaki gözlem:', 960, 230, t, sn + 0.6, E.e('end'), { size: 48, weight: 400, align: 'center' });
    E.inkText(ctx, '3 · Kuvvetler Bir Araya Gelince: Bileşke Kuvvet', 960, 320, t, sn + 1.2, E.e('end'), { size: 62, align: 'center' });
    E.inkText(ctx, 'Ünite 2 · Kuvvetin Etkisinde Hareket', 960, 380, t, sn + 1.8, E.e('end'), { size: 34, weight: 400, align: 'center', alpha: 0.7 });
    F.endCard(ctx, t, E.s('end'), '2', 'Güneş ve Ay Tutulmaları', 'FB.6.1.3 · FB.6.1.4');
  }

  E.scene({
    name: 'Sıra sende', concept: 'Model görevi ve araştırma', from: 'task', to: 'research', trFrom: [960, 540],
    draw(ctx, t) {
      task(ctx, t);
      DAMLA.draw(ctx, { x: 1770, y: 905, s: 0.85, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.3], blink: E.blink(t, 9), squash: E.breath(t), t, seed: 7, arms: [[-1, 0.35], [1, 2.2]] });
    }
  });
  E.scene({
    name: 'Sıradaki', concept: 'Sonraki film', from: 'next', to: 'end', trFrom: [960, 540],
    draw(ctx, t) { next(ctx, t); }
  });
})();
