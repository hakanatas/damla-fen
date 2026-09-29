// SAHNE 3 — Tanecik düzeyi: erime (tanecik yapısı aynı) vs yanma (atomlar yeniden düzenlenir, yeni maddeler) · bağ kırılması/oluşması
(function () {
  const { PAL, stroke, line, circlePts, rng } = INK;
  const U = U5;
  const LX = 500, RX = 1340, CY = 520, RAD = 290;
  // --- sol: buz → sıvı su (9 su molekülü; molekül şekli korunur)
  const A = 104.5 / 2 * Math.PI / 180;
  function water(ctx, x, y, r, rot, seed) {
    const d = r * 1.55;
    const p1 = [x + Math.cos(rot + Math.PI / 2 + A) * d, y + Math.sin(rot + Math.PI / 2 + A) * d], p2 = [x + Math.cos(rot + Math.PI / 2 - A) * d, y + Math.sin(rot + Math.PI / 2 - A) * d];
    U.bondLine(ctx, [x, y], p1, 5); U.bondLine(ctx, [x, y], p2, 5);
    U.atom(ctx, x, y, r, 'O', { seed }); U.atom(ctx, p1[0], p1[1], r, 'H', { seed: seed + 1 }); U.atom(ctx, p2[0], p2[1], r, 'H', { seed: seed + 2 });
  }
  // --- sağ: basitleştirilmiş mum taneciği (3 karbonlu zincir) + oksijen → karbondioksit + su
  const Cb = [[-60, -30], [0, -30], [60, -30]];
  const Hb = [[-104, -30], [-60, -74], [-60, 14], [0, -74], [0, 14], [104, -30], [60, -74], [60, 14]];
  const O2c = [[-160, 110], [-60, 150], [60, 150], [160, 110], [0, 230]];
  const Ob = []; O2c.forEach(([x, y]) => { Ob.push([x - 20, y]); Ob.push([x + 20, y]); });
  const Ca = [[-150, -140], [0, -170], [150, -140]];
  const Oa = [[-192, -140], [-108, -140], [-42, -170], [42, -170], [108, -140], [192, -140], [-170, 80], [-60, 110], [60, 110], [170, 80]];
  const Ha = []; [[-170, 80], [-60, 110], [60, 110], [170, 80]].forEach(([x, y]) => { Ha.push([x - 30, y + 26]); Ha.push([x + 30, y + 26]); });
  E.scene({
    name: 'Tanecik modeli', concept: 'Fiziksel: tanecik yapısı değişmez · kimyasal: yeni madde', from: 'phys', to: 'bonds', trFrom: [960, 500],
    draw(ctx, t) {
      const sp = E.s('phys'), sc = E.s('chem'), sb = E.s('bonds');
      // SOL daire
      const melt = E.se(t, sp + 1.2, sp + 4.5);
      ctx.save(); ctx.beginPath(); ctx.arc(LX, CY, RAD, 0, 7); ctx.clip();
      ctx.fillStyle = '#E4EEF2'; ctx.fillRect(LX - RAD, CY - RAD, 2 * RAD, 2 * RAD);
      const r = rng(1601);
      for (let i = 0; i < 9; i++) {
        const gx = i % 3, gy = Math.floor(i / 3);
        const ix = LX - 150 + gx * 150 + (gy % 2) * 30, iy = CY - 150 + gy * 150, irot = (gx + gy) % 2 ? 0.4 : -0.4;
        const lx = LX - 170 + gx * 170 + (r() - 0.5) * 60 + Math.sin(t * 1.4 + i) * 24, ly = CY - 150 + gy * 160 + (r() - 0.5) * 50 + Math.cos(t * 1.2 + i * 2) * 24, lrot = r() * 6 + t * (0.5 + r());
        water(ctx, E.lerp(ix, lx, melt), E.lerp(iy, ly, melt), 24, E.lerp(irot, lrot, melt), 1610 + i * 3);
      }
      ctx.restore(); stroke(ctx, circlePts(LX, CY, RAD, RAD, 80), { w: 5, closed: true, seed: 1620 });
      U.txt(ctx, melt < 0.5 ? 'buz (katı)' : 'su (sıvı)', LX, CY - RAD - 22, { size: 46, align: 'center', color: PAL.water });
      P.write(ctx, 'aynı su tanecikleri → fiziksel', LX, CY + RAD + 62, E.seg(t, sp + 4.0, sp + 5.4), { size: 40, align: 'center', color: PAL.water });
      // SAĞ daire (chem beat'ten sonra)
      const rk = E.se(t, sc - 0.3, sc + 0.4);
      if (rk > 0) E.layer(ctx, rk, c => {
        const k = E.se(t, sc + 1.6, sc + 5.0, 'io');
        c.save(); c.beginPath(); c.arc(RX, CY, RAD, 0, 7); c.clip(); c.fillStyle = '#F4EAD8'; c.fillRect(RX - RAD, CY - RAD, 2 * RAD, 2 * RAD);
        const P2 = (a, b) => [RX + E.lerp(a[0], b[0], k), CY + E.lerp(a[1], b[1], k)];
        const Cp = Cb.map((b, i) => P2(b, Ca[i])), Op = Ob.map((b, i) => P2(b, Oa[i])), Hp = Hb.map((b, i) => P2(b, Ha[i]));
        const bA = 1 - E.clamp(k * 3), aA = E.clamp(k * 3 - 2);
        if (bA > 0) { c.save(); c.globalAlpha *= bA; U.bondLine(c, Cp[0], Cp[1], 5); U.bondLine(c, Cp[1], Cp[2], 5); [0, 0, 0, 1, 1, 2, 2, 2].forEach((ci, hi) => U.bondLine(c, Cp[ci], Hp[hi], 4)); for (let j = 0; j < 5; j++) U.bondLine(c, Op[2 * j], Op[2 * j + 1], 5); c.restore(); }
        if (aA > 0) { c.save(); c.globalAlpha *= aA; for (let j = 0; j < 3; j++) { U.bondLine(c, Cp[j], Op[2 * j], 5); U.bondLine(c, Cp[j], Op[2 * j + 1], 5); } for (let j = 0; j < 4; j++) { U.bondLine(c, Op[6 + j], Hp[2 * j], 4); U.bondLine(c, Op[6 + j], Hp[2 * j + 1], 4); } c.restore(); }
        Hp.forEach((p, i) => U.atom(c, p[0], p[1], 20, 'H', { seed: i }));
        Op.forEach((p, i) => U.atom(c, p[0], p[1], 20, 'O', { seed: 20 + i }));
        Cp.forEach((p, i) => U.atom(c, p[0], p[1], 20, 'C', { seed: 40 + i }));
        c.restore();
        stroke(c, circlePts(RX, CY, RAD, RAD, 80), { w: 5, closed: true, seed: 1621 });
        U.txt(c, k < 0.5 ? 'mum taneciği + oksijen' : 'karbondioksit + su buharı', RX, CY - RAD - 22, { size: 42, align: 'center', color: U.HEAT });
        P.write(c, 'yeni maddeler → kimyasal', RX, CY + RAD + 62, E.seg(t, sc + 5.0, sc + 6.2), { size: 40, align: 'center', color: U.HEAT });
        U.flame(c, RX + RAD - 30, CY + RAD - 40, 0.8, t, 1);
      });
      // bağ notu
      const bk = E.se(t, sb + 0.3, sb + 1.0);
      if (bk > 0) E.layer(ctx, bk, c => {
        U.card(c, 740, 36, 1150, 100, { seed: 1630, tint: PAL.light, tintA: 0.12 });
        U.txt(c, 'kimyasal: bağlar kırılır, yeni bağlar oluşur · fiziksel: kırılmaz', 1315, 100, { size: 36, align: 'center' });
      });
      INK.label(ctx, '(model, ölçekli değildir; mum taneciği basitleştirildi)', 1880, 912, { size: 24, align: 'right', alpha: 0.5 });
    }
  });
})();
