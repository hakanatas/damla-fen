// SAHNE 8 — Sıra sende (performans görevi özendirme), sonraki film, bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const BR = '#8A4A10', RED = '#A23A2A';
  function balance(ctx, x, y) { // equal-arm balance sketch
    line(ctx, [x, y], [x, y - 200], { w: 6, taper: 0 }); P.fillPts(ctx, [[x - 60, y], [x + 60, y], [x + 40, y - 20], [x - 40, y - 20]], PAL.paperDeep); stroke(ctx, [[x - 60, y], [x + 60, y], [x + 40, y - 20], [x - 40, y - 20], [x - 60, y]], { w: 2.6, closed: true });
    line(ctx, [x - 170, y - 200], [x + 170, y - 200], { w: 6, taper: 0 }); INK.arrowHead(ctx, [x, y - 170], [x, y - 196], 12, { w: 3 });
    [-1, 1].forEach(s => { line(ctx, [x + s * 170, y - 200], [x + s * 140, y - 110], { w: 1.8, dry: false }); line(ctx, [x + s * 170, y - 200], [x + s * 200, y - 110], { w: 1.8, dry: false }); stroke(ctx, P.arc(x + s * 170, y - 110, 60, 0, Math.PI, 16, 22), { w: 3 }); line(ctx, [x + s * 170 - 60, y - 110], [x + s * 170 + 60, y - 110], { w: 3, dry: false }); });
  }
  E.scene({
    name: 'Sıra sende', concept: 'Performans görevi', from: 'task', to: 'task', trFrom: [960, 540],
    draw(ctx, t) {
      const st = E.s('task');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      F06.card(ctx, 240, 120, 1680, 860, { seed: 3800 });
      P.write(ctx, 'Sıra sende!', 330, 225, E.seg(t, st + 0.3, st + 1.3), { size: 80, color: BR });
      F06.cycle(ctx, 1380, 470, 170, 7 * E.seg(t, st + 0.6, st + 2.4), -1, { r: 60, size: 22 });
      const S = ['Problemini ve ölçütlerini yaz.', 'Esnek, uygun kalınlıkta malzeme seç.', 'Modelini çiz ve üret.', 'Gerçek dinamometreyle ölçeklendir.', 'Test et; yeni kanıta göre yenile.', 'Sınıfta paylaş, öneri al.'];
      S.forEach((s, i) => P.write(ctx, (i + 1) + '. ' + s, 330, 320 + i * 72, E.seg(t, st + 1.2 + i * 1.1, st + 2.2 + i * 1.1), { size: 42 }));
      P.write(ctx, '⚠ Kesici araçları bir yetişkin eşliğinde kullan.', 330, 790, E.seg(t, st + 8.0, st + 9.0), { size: 38, color: RED });
    }
  });
  E.scene({
    name: 'Sıradaki', concept: 'Sonraki film: kütle ve ağırlık', from: 'next', to: 'end', trFrom: [960, 700],
    draw(ctx, t) {
      const sn = E.s('next');
      ctx.save(); ctx.globalAlpha = 0.1; ctx.fillStyle = PAL.water; ctx.fillRect(0, 0, E.W, 880); ctx.restore();
      F06.floor(ctx, 880, 8);
      E.inkText(ctx, 'Sıradaki gözlem:', 960, 200, t, sn + 0.5, 1e9, { size: 50, align: 'center', weight: 400 });
      E.inkText(ctx, '7 · Kütle ve Ağırlık', 960, 285, t, sn + 1.1, 1e9, { size: 72, align: 'center' });
      const k = E.se(t, sn + 1.8, sn + 3.0);
      if (k > 0) E.layer(ctx, k, c => {
        balance(c, 520, 880);
        line(c, [1300, 400], [1500, 400], { w: 6, taper: 0 });
        const r = F06.dyn(c, 1400, 400, { L: 260, W: 70, max: 10, F: 3, num: 26 }); F06.apple(c, 1400, r.hook[1] - 4, 0.7);
        INK.label(c, 'eşit kollu terazi', 520, 610, { size: 38, weight: 700, align: 'center' });
        INK.label(c, 'dinamometre', 1560, 560, { size: 38, weight: 700 });
      });
      DAMLA.draw(ctx, { x: 960, y: 880, s: 1.4, view: 'front', expr: 'curious', look: [0, -0.3], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 1.8], [1, 1.8]] });
      F06.endCard(ctx, t, '6 · Kendi Dinamometremi Tasarlıyorum', 'FB.5.2.2');
    }
  });
})();
