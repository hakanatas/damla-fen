// SAHNE 7 — Kimyasal tepkime: suyun oluşumu boncuk modeli (formülsüz, denklem denkleştirmesiz) · atom sayısı ve cinsi korunur · yeni bileşik
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const U = U5;
  const R = 34;
  // önce: 2 hidrojen molekülü + 1 oksijen molekülü (sol tepsi); sonra: 2 su molekülü (sağ tepsi)
  const Hb = [[330, 380], [398, 380], [330, 540], [398, 540]], Ob = [[610, 450], [690, 450]];
  const a = 104.5 / 2 * Math.PI / 180, d = 64;
  const W1 = [1270, 420], W2 = [1560, 560];
  const Oa = [W1, W2], Ha = [[W1[0] - Math.sin(a) * d, W1[1] + Math.cos(a) * d], [W1[0] + Math.sin(a) * d, W1[1] + Math.cos(a) * d], [W2[0] - Math.sin(a) * d, W2[1] + Math.cos(a) * d], [W2[0] + Math.sin(a) * d, W2[1] + Math.cos(a) * d]];
  // H eşlemesi: H0,H1 → ilk su; H2,H3 → ikinci su
  E.scene({
    name: 'Boncuk modeli', concept: 'Suyun oluşumu: atomlar korunur', from: 'reaction', to: 'newprop', trFrom: [960, 500],
    draw(ctx, t) {
      const sr = E.s('reaction'), sb = E.s('beads'), sc = E.s('count'), sn = E.s('newprop');
      // tepsiler
      [[180, 'önce'], [1080, 'sonra']].forEach(([x, lb], i) => { U.card(ctx, x, 250, 660, 440, { seed: 1900 + i, tint: i ? PAL.water : PAL.light, tintA: 0.08 }); U.txt(ctx, lb, x + 330, 305, { size: 44, align: 'center', color: U.AMBER }); });
      P.arrow(ctx, [870, 470], [1050, 470], E.se(t, sb + 1.5, sb + 2.3), { w: 5, head: 20 });
      // parçalan → yeniden düzenlen
      const split = E.se(t, sb + 2.0, sb + 3.2), move = E.se(t, sb + 3.0, sb + 6.0, 'io');
      const jig = (i) => split * (1 - move) * 26;
      const Hp = Hb.map((p, i) => { const dir = i % 2 ? 1 : -1; return [E.lerp(p[0] + dir * jig(i), Ha[i][0], move), E.lerp(p[1] - 20 * split * (1 - move), Ha[i][1], move)]; });
      const Op = Ob.map((p, i) => { const dir = i ? 1 : -1; return [E.lerp(p[0] + dir * jig(i), Oa[i][0], move), E.lerp(p[1], Oa[i][1], move)]; });
      const bk = E.se(t, sb + 0.5, sb + 1.2);
      const gh = 0.28 * E.se(t, sb + 5.0, sb + 6.0);
      if (gh > 0) { ctx.save(); ctx.globalAlpha *= gh; U.bondLine(ctx, Hb[0], Hb[1], 8); U.bondLine(ctx, Hb[2], Hb[3], 8); U.bondLine(ctx, Ob[0], Ob[1], 8); Hb.forEach((p, i) => U.atom(ctx, p[0], p[1], R, 'H', { seed: i })); Ob.forEach((p, i) => U.atom(ctx, p[0], p[1], R, 'O', { seed: 10 + i })); ctx.restore(); }
      if (bk > 0) {
        ctx.save(); ctx.globalAlpha *= bk;
        const before = 1 - E.clamp(split * 2), after = E.clamp(move * 3 - 2);
        if (before > 0) { ctx.save(); ctx.globalAlpha *= before; U.bondLine(ctx, Hp[0], Hp[1], 8); U.bondLine(ctx, Hp[2], Hp[3], 8); U.bondLine(ctx, Op[0], Op[1], 8); ctx.restore(); }
        if (after > 0) { ctx.save(); ctx.globalAlpha *= after; [0, 1].forEach(j => { U.bondLine(ctx, Op[j], Hp[2 * j], 8); U.bondLine(ctx, Op[j], Hp[2 * j + 1], 8); }); ctx.restore(); }
        Hp.forEach((p, i) => U.atom(ctx, p[0], p[1], R, 'H', { seed: i }));
        Op.forEach((p, i) => U.atom(ctx, p[0], p[1], R, 'O', { seed: 10 + i }));
        ctx.restore();
        // anahtar
        U.txt(ctx, 'beyaz boncuk: hidrojen atomu', 190, 745, { size: 34, alpha: bk * (1 - E.se(t, sc, sc + 0.4)) });
        U.txt(ctx, 'mavi boncuk: oksijen atomu', 190, 790, { size: 34, alpha: bk * (1 - E.se(t, sc, sc + 0.4)), color: '#3E6E8E' });
      }
      // etiketler (molekül adları)
      const lk = E.se(t, sb + 1.0, sb + 1.6) * (1 - E.se(t, sb + 2.0, sb + 2.6));
      if (lk > 0) { U.txt(ctx, 'hidrojen molekülleri', 364, 640, { size: 32, align: 'center', alpha: lk }); U.txt(ctx, 'oksijen molekülü', 650, 540, { size: 32, align: 'center', alpha: lk }); }
      const wk = E.se(t, sb + 6.0, sb + 6.8);
      if (wk > 0) U.txt(ctx, 'iki su molekülü', 1410, 660, { size: 38, align: 'center', alpha: wk, color: PAL.water });
      // sayım tablosu
      const ck = E.se(t, sc + 0.3, sc + 0.9);
      if (ck > 0) E.layer(ctx, ck, c => {
        const k1 = E.se(t, sc + 1.0, sc + 2.2), k2 = E.se(t, sc + 3.0, sc + 4.2);
        P.write(c, 'hidrojen: 4 · oksijen: 2', 510, 800, k1, { size: 46, align: 'center' });
        P.write(c, 'hidrojen: 4 · oksijen: 2', 1410, 800, k2, { size: 46, align: 'center' });
        P.write(c, '= atomların sayısı ve cinsi korunur', 960, 872, E.seg(t, sc + 4.6, sc + 5.8), { size: 44, align: 'center', color: U.AMBER });
      });
      // yeni özellikler (newprop)
      const nk = E.se(t, sn + 0.3, sn + 1.0);
      if (nk > 0) {
        P.write(ctx, 'hidrojen ve oksijen: gaz', 510, 736, nk, { size: 34, align: 'center', color: U.AMBER });
        P.write(ctx, 'su: sıvı → yeni bir bileşik', 1410, 736, E.seg(t, sn + 1.6, sn + 2.8), { size: 34, align: 'center', color: PAL.water });
      }
      U.damla(ctx, t, { x: 960, y: 250 + 2, s: 0.6, view: 'front', expr: move > 0.99 ? 'happy' : 'curious', look: [0, 0.6], arms: [[-1, 0.5], [1, 0.5]] });
    }
  });
})();
