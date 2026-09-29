// SAHNE 7–8 — Kaydet; Sıra sende (yaşam döngüsü posteri, ipek böceği zenginleştirmesi); sıradaki film; bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F07;
  const ITEMS = [
    ['Eşeyli üreme:', 'hayvanların çoğu'], ['Eşeysiz de üreyebilir:', 'hidra, deniz yıldızı'],
    ['Doğurarak:', 'kedi, inek, yunus, yarasa'], ['Yumurtayla:', 'tavuk, kaplumbağa, balık, kelebek'],
    ['Tam başkalaşım:', 'kelebek, ipek böceği'], ['Eksik başkalaşım:', 'çekirge'], ['Başkalaşım:', 'kurbağa (iribaş → kurbağa)']
  ];
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record');
      ctx.fillStyle = 'rgba(138,106,69,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 150, 1620, 760);
      P.write(ctx, 'Gözlem Defteri · Hayvanlarda üreme', 260, 235, E.seg(t, sr + 0.1, sr + 1.1), { size: 52 });
      ITEMS.forEach(([a, b], i) => { const at = sr + 1.2 + i * 1.2, y = 330 + i * 80;
        P.check(ctx, 290, y - 18, 40, E.se(t, at + 0.8, at + 1.2), { w: 5, color: F.LIFE_D });
        P.write(ctx, a, 340, y, E.seg(t, at, at + 0.8), { size: 44, color: F.LIFE_D });
        ctx.save(); ctx.font = '700 44px Kalam'; const w = ctx.measureText(a).width; ctx.restore();
        P.write(ctx, b, 360 + w, y, E.seg(t, at + 0.4, at + 1.2), { size: 44 }); });
      DAMLA.draw(ctx, { x: 1790, y: 1045, s: 1.0, view: 'q3', flip: true, expr: 'neutral', look: [-0.7, 0.2], blink: E.blink(t, 8), squash: E.breath(t), t, seed: 6, arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
  E.scene({
    name: 'Sıra sende', concept: 'Yaşam döngüsü posteri; sıradaki film', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const st = E.s('task'), sn = E.s('next'), se = E.s('end');
      const hill = P.hillLine(E.W);
      P.landscape(ctx, E.W, E.H, t, { hill, treeAt: [1760, P.hillY(hill, 1760) + 6] });
      const dx = 820, dy = P.hillY(hill, dx) + 4;
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.35, view: 'q3', expr: 'happy', look: [0.6, -0.3], blink: E.blink(t, 9), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      E.inkText(ctx, 'Sıradaki gözlem:', 960, 230, t, sn + 0.6, se + 0.2, { size: 50, align: 'center', weight: 400 });
      E.inkText(ctx, 'İnsanda Üreme ve Ergenlik', 960, 320, t, sn + 1.2, se + 0.2, { size: 70, align: 'center' });
      F.taskCard(ctx, t, st, sn, 'Sıra sende!', [
        { txt: 'Bir hayvanın yaşam döngüsünü araştır.', at: st + 1.4 },
        { txt: 'Evrelerini çizerek bir poster hazırla.', at: st + 2.8 },
        { txt: 'Merak ettiğin soruları da yaz.', at: st + 4.2 },
        { txt: 'İstersen öğretmeninle ipek böceği besleyin', at: st + 5.6, color: F.LIFE_D, size: 44 },
        { txt: 've başkalaşımı gözleyin.', at: st + 6.8, color: F.LIFE_D, size: 44 }
      ], (c, x, y) => { F.leaf(c, x - 110, y + 120, 200, -0.2, 97, { wr: 0.5 }); F.caterpillar(c, x + 10, y + 110, 1.0, t, { fill: '#F4F0E4', col: '#B8B09A' }); F.cocoon(c, x - 10, y - 20, 1.2); F.butterfly(c, x + 20, y - 170, 0.8, t); });
      F.endCard(ctx, t, '7', 'Yumurtadan Kelebeğe: Hayvanlarda Üreme', 'FB.6.3.4');
    }
  });
})();
