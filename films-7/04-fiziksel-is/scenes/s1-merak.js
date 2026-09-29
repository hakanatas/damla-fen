// SAHNE 1 — Merak: "Çok iş yaptın!" (günlük dil) → fizikte iş? + kuvvetin etkileri beyin fırtınası (köprü kurma, E3.5)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F7E;
  function desk(ctx) {
    const top = F.rect(360, 600, 900, 624); P.fillPts(ctx, top, '#E8D2A8'); wash(ctx, top, '#8A6A45', 0.5, 4001, { bleed: 1, blooms: 0 }); stroke(ctx, top, { w: 3, closed: true, seed: 4002 });
    line(ctx, [390, 624], [396, 820], { w: 5, seed: 4003 }); line(ctx, [870, 624], [864, 820], { w: 5, seed: 4004 });
    // kitap yığını
    [['#6F8A3A', 0], ['#2E6A8C', 1], ['#B5553F', 2]].forEach(([c, i]) => { const b = F.rect(420 + i * 6, 600 - (i + 1) * 34, 620 - i * 8, 600 - i * 34); P.fillPts(ctx, b, PAL.paper); wash(ctx, b, c, 0.55, 4010 + i, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.4, closed: true, seed: 4020 + i }); });
    // açık defter
    const nb = [[660, 596], [760, 584], [860, 596], [860, 600], [660, 600]]; P.fillPts(ctx, nb, PAL.white); stroke(ctx, [[660, 598], [760, 584], [860, 598]], { w: 2.4, seed: 4030 }); line(ctx, [760, 584], [760, 600], { w: 1.6, dry: false });
    P.icon.pencil(ctx, 800, 590, 0.5, -0.2);
  }
  E.scene({
    name: 'Merak', concept: 'Günlük dilde iş ve fizikte iş', from: 'title', to: 'tired',
    draw(ctx, t) {
      const sh = E.s('hello'), st = E.s('tired');
      ctx.save(); E.cam(ctx, { x: 960, y: 540, z: 1 + 0.05 * E.se(t, 0, E.e('tired'), 'sine') });
      F.floor(ctx, 820, 1);
      desk(ctx);
      const tiredK = E.se(t, sh + 3.2, sh + 4.2);
      const think = t > st + 4.5;
      DAMLA.draw(ctx, {
        x: 1080, y: 820, s: 1.3, view: think ? 'q3' : 'front', expr: think ? 'thinking' : (tiredK > 0.5 && t < st ? 'sleepy' : 'happy'), look: think ? [0.6, -0.5] : [0, 0.1],
        blink: E.blink(t, 2), squash: E.breath(t) * (1 - 0.05 * tiredK * (t < st ? 1 : 0)), t, seed: 1,
        arms: t < sh + 3 ? [[-1, 0.35], [1, 2.35 + 0.35 * Math.sin(t * 9)]] : (think ? [[-1, 0.4], [1, [30, -150]]] : [[-1, 0.2], [1, 0.2]])
      });
      ctx.restore();
      // anne sözü kartı
      const qk = E.se(t, st + 0.2, st + 0.9, 'out');
      if (qk > 0) E.layer(ctx, qk, c => {
        F.card(c, 1250, 210, 1830, 350, { seed: 4040 });
        F.txt(c, 'Annem:', 1285, 262, { size: 34, alpha: 0.7 });
        F.txt(c, '“Bugün çok iş yaptın!”', 1285, 322, { size: 48 });
      });
      if (t > st + 4.2) P.bubble(ctx, 1520, 470, 430, 150, [1200, 560], E.se(t, st + 4.2, st + 4.9, 'out'), 3);
      if (t > st + 4.8) { ctx.save(); ctx.globalAlpha = E.se(t, st + 4.8, st + 5.3); F.txt(ctx, 'Fizikte de iş mi?', 1520, 488, { size: 50, align: 'center', color: '#8A4A10' }); ctx.restore(); }
      F.title(ctx, t, 4, 'Her Çaba İş mi? Fiziksel Anlamda İş');
    }
  });

  const NODES = [['hareket ettirir', 430, 330, 2.6], ['durdurur', 1210, 330, 4.2], ['yönünü değiştirir', 420, 760, 5.6], ['şeklini değiştirir', 1210, 760, 6.9]];
  E.scene({
    name: 'Beyin fırtınası', concept: 'Kuvvetin cisimler üzerindeki etkileri', from: 'brainstorm', to: 'brainstorm', trFrom: [820, 540],
    draw(ctx, t) {
      const sb = E.s('brainstorm');
      const cx = 820, cy = 545;
      NODES.forEach(([txt, x, y, d], i) => {
        const k = E.se(t, sb + d, sb + d + 0.7, 'out'); if (k <= 0) return;
        P.drawOn(ctx, P.bez([cx, cy], [(cx + x) / 2 + (i % 2 ? 30 : -30), (cy + y) / 2], [x, y], 24), k, { w: 2.6, seed: 4100 + i });
        const w = F.tw(ctx, txt, 44) + 50;
        ctx.save(); ctx.globalAlpha *= E.se(t, sb + d + 0.3, sb + d + 0.9);
        const r = [[x - w / 2, y - 46], [x + w / 2, y - 50], [x + w / 2 + 4, y + 36], [x - w / 2 + 2, y + 38], [x - w / 2, y - 46]];
        P.fillPts(ctx, r, '#FBF8F1'); stroke(ctx, r, { w: 2.6, closed: true, seed: 4110 + i });
        F.txt(ctx, txt, x, y + 12, { size: 44, align: 'center' });
        ctx.restore();
      });
      const ck = P.pop(E.se(t, sb + 0.4, sb + 1.2, 'out'));
      if (ck > 0) {
        const c = circlePts(cx, cy, 130 * ck, 100 * ck, 50);
        P.fillPts(ctx, c, '#FBF8F1'); wash(ctx, c, F.FORCE, 0.3, 4120, { bleed: 2, blooms: 1 }); stroke(ctx, c, { w: 3.4, closed: true, seed: 4121 });
        if (ck > 0.8) { F.txt(ctx, 'Kuvvet', cx, cy + 20, { size: 62, align: 'center' }); }
      }
      DAMLA.draw(ctx, { x: 1690, y: 880, s: 1.1, view: 'q3', flip: true, expr: t > sb + 7.5 ? 'happy' : 'thinking', look: [-0.8, -0.3], blink: E.blink(t, 4), squash: E.breath(t), t, seed: 1, arms: [[-1, [-40, -150]], [1, 0.4]] });
    }
  });
})();
