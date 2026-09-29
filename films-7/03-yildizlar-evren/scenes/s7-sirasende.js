// SAHNE 7 — Sıra sende (afiş, kavram haritası · D16.3, E2.5, SDB2.1) + sonraki film + bitiş
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = U7;
  E.scene({
    name: 'Sıra sende', concept: 'Afiş ve kavram haritası', from: 'task', to: 'task', trFrom: [960, 540],
    draw(ctx, t) {
      const st = E.s('task');
      F.card(ctx, 230, 170, 1440, 700, { seed: 160 });
      P.write(ctx, 'Sıra sende!', 310, 270, E.seg(t, st + 0.2, st + 1.0), { size: 72, color: F.AMBER_D });
      P.drawOn(ctx, P.bez([306, 292], [500, 302], [700, 288], 20), E.se(t, st + 1.0, st + 1.5), { w: 3, color: PAL.light });
      P.write(ctx, '1. Yıldızların yaşam süreci afişini hazırla:', 310, 380, E.seg(t, st + 1.2, st + 2.6), { size: 44 });
      // mini afiş taslağı
      const pk = E.se(t, st + 2.6, st + 3.4);
      if (pk > 0) E.layer(ctx, pk, c => { const b = [[380, 420], [1000, 420], [1000, 600], [380, 600], [380, 420]]; P.fillPts(c, b, '#2A3050', 1); stroke(c, b, { w: 2.6, closed: true, seed: 620 });
        F.nebula(c, 450, 510, 50, ['#C78FB0', '#7FA7D8'], 30); F.star(c, 580, 510, 8, '#FFF1B0', t); F.star(c, 700, 470, 10, '#FF9A6A', t); F.star(c, 820, 470, 4, '#FFFFFF', t); F.star(c, 700, 560, 12, '#9DB8FF', t); F.star(c, 880, 560, 5, '#CFE0FF', t);
        [[500, 510, 555, 505], [600, 500, 680, 475], [600, 520, 680, 555], [720, 470, 800, 470], [720, 560, 860, 560]].forEach(([a, b, x, y]) => line(c, [a, b], [x, y], { w: 1.6, color: '#F6D58A', dry: false })); });
      P.write(ctx, '2. Grubunla yıldız, galaksi, evren kavram haritası kur.', 310, 690, E.seg(t, st + 4.0, st + 5.6), { size: 42 });
      P.write(ctx, '3. Olumlu dille konuş, görev paylaş, eğlenerek öğren!', 310, 780, E.seg(t, st + 5.8, st + 7.2), { size: 42, color: PAL.water });
      DAMLA.draw(ctx, { x: 1770, y: 905, s: 0.85, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.3], blink: E.blink(t, 9), squash: E.breath(t), t, seed: 7, arms: [[-1, 0.35], [1, 2.2]] });
    }
  });
  E.scene({
    name: 'Sıradaki', concept: 'Sonraki film', from: 'next', to: 'end', trFrom: [1300, 600],
    draw(ctx, t) {
      const sn = E.s('next');
      const hill = P.hillLine(E.W, 930);
      P.landscape(ctx, E.W, E.H, t, { hill, treeAt: [1700, P.hillY(hill, 1700) + 6] });
      // kutuyu iten Damla (kuvvet ve yol)
      const k = E.se(t, sn + 1, sn + 6);
      const bx = 1180 + k * 260, by = P.hillY(hill, 1300) + 4;
      const box = [[bx - 90, by - 170], [bx + 90, by - 170], [bx + 90, by], [bx - 90, by], [bx - 90, by - 170]];
      P.fillPts(ctx, box, '#C9A56A', 1); INK.wash(ctx, box, '#8A6A45', 0.3, 630, { bleed: 1, blooms: 0 }); stroke(ctx, box, { w: 3, closed: true, seed: 631 });
      DAMLA.draw(ctx, { x: bx - 225, y: by, s: 1.1, view: 'side', expr: 'determined', look: [1, 0], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, lean: 0.25, feet: E.walk(t * 6), arms: [[-1, [60, -120], 0.2], [1, [70, -110], 0.2]] });
      if (k > 0.2) { ctx.save(); ctx.globalAlpha = E.clamp(k * 2); P.arrow(ctx, [1180, by + 40], [bx, by + 40], 1, { w: 3, head: 12 }); ctx.restore(); INK.label(ctx, 'yol', (1180 + bx) / 2, by + 90, { size: 36, weight: 700, align: 'center', alpha: E.clamp(k * 2) }); }
      E.inkText(ctx, 'Sıradaki gözlem:', 700, 260, t, sn + 0.6, E.e('end'), { size: 48, weight: 400, align: 'center' });
      E.inkText(ctx, 'Fiziksel anlamda iş', 700, 345, t, sn + 1.2, E.e('end'), { size: 70, align: 'center' });
      F.endCard(ctx, t, E.s('end'), '3', 'Yıldızlar, Galaksiler ve Evren', 'FB.7.1.4 · FB.7.1.5');
    }
  });
})();
