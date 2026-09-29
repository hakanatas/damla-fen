// SAHNE 7 — Sıra sende (grup posteri, haftalık tahmin–gözlem, iklim türleri araştırması · SDB2.1, SDB2.2, SDB2.3) + sonraki film + bitiş
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F82;
  function task(ctx, t) {
    const st = E.s('task');
    F.card(ctx, 200, 165, 1400, 720, { seed: 160 });
    P.write(ctx, 'Sıra sende!', 280, 260, E.seg(t, st + 0.2, st + 1.0), { size: 72, color: F.BROWN });
    P.drawOn(ctx, P.bez([276, 282], [470, 292], [670, 278], 20), E.se(t, st + 1.0, st + 1.5), { w: 3, color: PAL.light });
    P.write(ctx, '1. Grubunla poster hazırla:', 280, 370, E.seg(t, st + 1.2, st + 2.2), { size: 46 });
    P.write(ctx, '    hava olayları ve iklimin benzerlik ve farklılıkları', 280, 428, E.seg(t, st + 2.0, st + 3.2), { size: 42, color: PAL.water });
    P.write(ctx, '2. Bir hafta boyunca tahmini gözleminle karşılaştır.', 280, 520, E.seg(t, st + 3.4, st + 4.6), { size: 44 });
    P.write(ctx, '3. Araştır: Ülkemizde hangi iklim türleri görülür?', 280, 610, E.seg(t, st + 4.8, st + 6.0), { size: 46 });
    P.write(ctx, '    Bu iklimler bölgedeki yaşamı nasıl etkiler?', 280, 668, E.seg(t, st + 5.8, st + 7.0), { size: 42, color: PAL.water });
    INK.label(ctx, 'görev paylaş · dikkatle dinle · birbirine yardım et', 900, 800, { size: 34, align: 'center', alpha: 0.7 * E.se(t, st + 7.0, st + 7.6) });
    const bk = E.se(t, st + 1.6, st + 2.4, 'out');
    if (bk > 0) { ctx.save(); ctx.globalAlpha *= bk;
      const px = 1340, py = 215, pw = 210, ph = 250; const pg = [[px, py], [px + pw, py + 4], [px + pw - 3, py + ph], [px + 2, py + ph - 3], [px, py]];
      P.fillPts(ctx, pg, PAL.white, 1); stroke(ctx, pg, { w: 2.6, closed: true, seed: 165 });
      stroke(ctx, circlePts(px + 80, py + 140, 55, 75, 40), { w: 2.4, closed: true, seed: 166, color: PAL.water });
      stroke(ctx, circlePts(px + 130, py + 140, 55, 75, 40), { w: 2.4, closed: true, seed: 167, color: F.AMBER });
      INK.label(ctx, 'POSTER', px + pw / 2, py + 50, { size: 30, weight: 700, align: 'center' });
      ctx.restore(); }
  }
  function next(ctx, t) {
    const sn = E.s('next');
    const hill = P.hillLine(E.W, 960);
    P.landscape(ctx, E.W, E.H, t, { hill, tree: false });
    // kaldıraç: destek üzerinde tahta, bir ucunda taş
    const fx = 1350, fy = P.hillY(hill, 1350) - 4;
    const tri = [[fx - 40, fy], [fx + 40, fy], [fx, fy - 60], [fx - 40, fy]]; P.fillPts(ctx, tri, '#8C8272', 0.9); stroke(ctx, tri, { w: 3, closed: true, seed: 801 });
    const ang = -0.18 + 0.1 * E.se(t, sn + 2, sn + 4) * Math.sin(t * 2);
    const bx0 = fx - 430 * Math.cos(ang), by0 = fy - 60 - 430 * Math.sin(ang) * -1, bx1 = fx + 250 * Math.cos(ang), by1 = fy - 60 + 250 * Math.sin(ang) * -1;
    line(ctx, [fx - Math.cos(ang) * 430, fy - 60 + Math.sin(ang) * 430], [fx + Math.cos(ang) * 250, fy - 60 - Math.sin(ang) * 250], { w: 12, color: '#8A6A45', seed: 802, taper: 0.02 });
    const rx = fx + Math.cos(ang) * 210, ry = fy - 60 - Math.sin(ang) * 210 - 55;
    const rock = []; const R = INK.rng(803); for (let i = 0; i <= 12; i++) { const a = i / 12 * 6.283, q = 70 * (0.8 + R() * 0.3); rock.push([rx + Math.cos(a) * q, ry + Math.sin(a) * q * 0.8]); } rock[12] = rock[0];
    P.fillPts(ctx, rock, '#8C8272', 0.95); stroke(ctx, rock, { w: 3, closed: true, seed: 804 });
    const hx = fx - Math.cos(ang) * 400, hy = fy - 60 + Math.sin(ang) * 400;
    DAMLA.draw(ctx, { x: hx - 60, y: P.hillY(hill, hx - 60) + 4, s: 1.1, view: 'q3', expr: 'determined', look: [0.6, -0.2], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[1, [60, -170], 0.3], [-1, [40, -160], 0.3]] });
    E.inkText(ctx, 'Sıradaki gözlem:', 960, 250, t, sn + 0.6, E.e('end'), { size: 48, weight: 400, align: 'center' });
    E.inkText(ctx, '3 · Basit Makineler', 960, 330, t, sn + 1.2, E.e('end'), { size: 66, align: 'center' });
    F.endCard(ctx, t, E.s('end'), '2', 'İklim ve Hava Olayları', 'FB.8.1.2');
  }
  E.scene({
    name: 'Sıra sende', concept: 'Görev', from: 'task', to: 'task', trFrom: [960, 540],
    draw(ctx, t) {
      task(ctx, t);
      DAMLA.draw(ctx, { x: 1740, y: 905, s: 0.9, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.3], blink: E.blink(t, 9), squash: E.breath(t), t, seed: 7, arms: [[-1, 0.35], [1, 2.2]] });
    }
  });
  E.scene({
    name: 'Sıradaki', concept: 'Sonraki film', from: 'next', to: 'end', trFrom: [1350, 700],
    draw(ctx, t) { next(ctx, t); }
  });
})();
