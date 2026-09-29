// SAHNE 7 — Kaydet: problem çözümlerinden toplanan veriler (FB.8.3.5 b) ve kavramlar (FB.8.3.4)
(function () {
  const { PAL } = INK; const K = KIT, F = G8;
  const ITEMS = [
    'Kalıtım: özelliklerin genlerle aktarılması',
    'S: sarı (baskın) · s: yeşil (çekinik)',
    'Saf döl: SS, ss · Melez döl: Ss',
    'SS × ss → 1. döl: hepsi Ss (sarı)',
    'Ss × Ss → 1 SS : 2 Ss : 1 ss (genotip)',
    '→ 3 sarı : 1 yeşil (fenotip) · Mendel: 6022 : 2001',
    'İnsanda cinsiyet: babadan gelen X ya da Y'
  ];
  E.scene({
    name: 'Kaydet', concept: 'Verileri kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 60, 1620, 840);
      P.write(ctx, 'Gözlem Defteri · Kalıtım', 1690, 165, E.seg(t, sr + 0.2, sr + 1.3), { size: 60, align: 'right' });
      ITEMS.forEach((txt, i) => {
        const at = sr + 1.2 + i * 1.2, y = 270 + i * 88;
        P.check(ctx, 300, y - 20, 40, E.se(t, at + 0.9, at + 1.3), { w: 5, color: K.LIFE_D });
        P.write(ctx, txt, 350, y, E.seg(t, at, at + 1.1), { size: 44 });
      });
      K.damla(ctx, t, { x: 1640, y: 890, s: 0.9, flip: true, expr: 'happy', look: [-0.6, -0.3], talk: E.talk(t), prop: 'notebook', arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]] });
    }
  });
})();
