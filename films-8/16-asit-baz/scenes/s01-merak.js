// SAHNE 1 — Merak: mutfak ve banyodaki asit/baz içeren ürünler (FB.8.5.5 · merak E1.1)
(function () {
  const { PAL, line } = INK;
  const U = U5;
  const BY = 800;
  // [ad, çizim, x, sıra (0..5)]
  const ITEMS = [
    ['limon', 'lemon', 250, 0], ['sirke', 'vinegar', 430, 1], ['yoğurt', 'yogurt', 620, 2],
    ['sabun', 'soap', 1000, 3], ['şampuan', 'shampoo', 1190, 4], ['çamaşır suyu', 'bleach', 1390, 5]
  ];
  function item(ctx, kind, x) {
    if (kind === 'lemon') { U.lemon(ctx, x - 30, BY - 36, 1.1); U.halfLemon(ctx, x + 50, BY - 40, 0.9); }
    else if (kind === 'vinegar') U.product(ctx, x, BY, 0.95, { col: '#EFE3C4', cap: '#8A6A45', label: 'SİRKE', seed: 4600 });
    else if (kind === 'yogurt') U.bowl(ctx, x, BY, 0.95, '#FFFFFF');
    else if (kind === 'soap') U.soap(ctx, x, BY, 0.95);
    else if (kind === 'shampoo') U.product(ctx, x, BY, 0.95, { col: '#F2C6D6', cap: '#B8406E', label: 'ŞAMPUAN', seed: 4610, h: 250 });
    else if (kind === 'bleach') U.product(ctx, x, BY, 0.95, { col: '#DDE9F2', cap: '#3D6FBE', label: 'ÇAMAŞIR SUYU', seed: 4620, w: 130, h: 250, ghs: 'corr' });
  }
  E.scene({
    name: 'Merak', concept: 'Günlük yaşamda asitler ve bazlar', from: 'title', to: 'hello2',
    draw(ctx, t) {
      const sh = E.s('hello'), s2 = E.s('hello2');
      U.bench(ctx, -40, 1960, BY, 1601);
      // mutfak | banyo ayırıcı
      const dk = E.se(t, sh, sh + 0.6);
      if (dk > 0) { ctx.save(); ctx.globalAlpha *= dk * 0.5; line(ctx, [810, BY - 330], [812, BY - 10], { w: 2.4, dry: false, color: '#8A6A45' }); ctx.restore();
        U.txt(ctx, 'mutfak', 430, 460, { size: 40, align: 'center', alpha: dk * 0.8, color: U.AMBER }); U.txt(ctx, 'banyo', 1190, 460, { size: 40, align: 'center', alpha: dk * 0.8, color: PAL.water }); }
      ITEMS.forEach(([nm, kind, x, j]) => {
        const at = sh + 0.4 + j * 0.9;
        const ak = E.se(t, at - 0.3, at + 0.4, 'out'); if (ak <= 0) return;
        E.layer(ctx, ak, c => { item(c, kind, x); U.txt(c, nm, x, BY + 92, { size: 34, align: 'center' }); });
      });
      // soru
      const qk = E.se(t, s2 + 0.5, s2 + 1.3);
      if (qk > 0) {
        P.write(ctx, 'asit mi?', 560, 330, qk, { size: 64, color: U.ACID, align: 'center' });
        P.write(ctx, 'baz mı?', 1060, 330, E.se(t, s2 + 1.2, s2 + 2.0), { size: 64, color: U.BASE, align: 'center' });
      }
      U.damla(ctx, t, { x: 1720, y: BY, s: 1.05, flip: true, expr: t > s2 ? 'thinking' : 'curious', look: [-0.9, -0.1], arms: t > s2 ? [[-1, 2.6], [1, 0.4]] : [[-1, 1.2], [1, 0.4]] });
      U.title(ctx, t, '16 · Asitler ve Bazlar');
    }
  });
})();
