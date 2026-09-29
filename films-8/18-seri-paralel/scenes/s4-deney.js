// SAHNE 5–6 — Deney: ölçüt (tek ampul) · seri 2–3 ampul, birini sökme · paralel 2–3 ampul, birini sökme
(function () {
  const { PAL, stroke, line } = INK;
  const U = U6;
  // görsel parlaklık (yalnızca sıralama doğru olsun diye): tek ampul 1 · seri-2 0,4 · seri-3 0,18 · paralel hep 1
  const BR = { 1: 1, s2: 0.4, s3: 0.18, p2: 1, p3: 1 };
  // yapılandırmalar: [id, tür, n, başlık, parlaklık-notu]
  const CFG = [
    ['ref', 's', 0, '', ''],
    ['s2', 's', 2, '2 ampul · seri', 'ikisi de tek ampulden sönük'],
    ['s3', 's', 3, '3 ampul · seri', 'her biri daha da sönük'],
    ['sout', 's', 3, 'seri · bir ampul söküldü', 'yol kesildi → hepsi söndü'],
    ['p2', 'p', 2, '2 ampul · paralel', 'her biri tek ampul kadar parlak'],
    ['p3', 'p', 3, '3 ampul · paralel', 'parlaklık değişmedi'],
    ['pout', 'p', 3, 'paralel · bir ampul söküldü', 'diğerleri yanmaya devam ediyor']
  ];
  function rig(ctx, t, c) {
    const [id, kind, n] = c; if (!n) return;
    const s0 = E.s(id), cx = 1130, y = 690, s = 0.75;
    const out = id.endsWith('out') ? E.se(t, s0 + 1.2, s0 + 2.2) : 0;
    const b = kind === 's' ? (out > 0.25 ? 0 : BR['s' + n]) : 1;
    const o = { outAt: out > 0 ? 1 : undefined, outK: out };
    if (kind === 's') U.rigSeries(ctx, cx, y, s, n, b, t, o);
    else U.rigParallel(ctx, cx, y, s, n, b, t, o);
    // mini şema (sağ üst)
    if (kind === 's') U.schSeries(ctx, 1520, 200, 300, 130, n, { w: 3, s: 0.7, lit: out > 0.25 ? 0 : 0.35 * (4 - n) / 2, gapAt: out > 0.25 ? 1 : undefined, bg: PAL.paper });
    else U.schParallel(ctx, 1520, 200, 300, 130, n, { w: 3, lit: 0.8, gapAt: out > 0.25 ? 1 : undefined, bg: PAL.paper });
  }
  E.scene({
    name: 'Deney', concept: 'Seri ve paralel bağlı ampullerin parlaklığı', from: 'ref', to: 'pout', trFrom: [330, 600],
    draw(ctx, t) {
      CK.table(ctx, 760);
      const sr = E.s('ref');
      // ölçüt devresi (hep solda yanar)
      const rk = E.se(t, sr + 0.3, sr + 1.3);
      if (rk > 0) E.layer(ctx, rk, c => {
        U.rigSeries(c, 330, 690, 0.75, 1, E.seg(t, sr + 1.6, sr + 2.2), t, { cells: 2 });
        U.txt(c, 'ölçüt: tek ampul', 330, 420, { size: 40, align: 'center', color: U.AMBER });
        line(c, [640, 330], [640, 880], { w: 2, dry: false, alpha: 0.35, seed: 5 });
      });
      // aktif yapılandırma (geçişte kısa çapraz solma)
      let cur = 0; CFG.forEach((c, i) => { if (t >= E.s(c[0])) cur = i; });
      const c = CFG[cur], s0 = E.s(c[0]), fk = E.se(t, s0, s0 + 0.5);
      if (cur > 0 && fk < 1 && CFG[cur - 1][2] && !c[0].endsWith('out')) E.layer(ctx, 1 - fk, cc => rig(cc, Math.min(t, s0 - 0.01), CFG[cur - 1]));
      if (c[2]) E.layer(ctx, c[0].endsWith('out') ? 1 : fk, cc => rig(cc, t, c));
      if (c[3]) {
        E.inkText(ctx, c[3], 1080, 215, t, s0 + 0.2, E.e(c[0]) + 0.2, { size: 50, align: 'center' });
        E.inkText(ctx, c[4], 1080, 290, t, s0 + (c[0].endsWith('out') ? 2.4 : 1.2), E.e(c[0]) + 0.2, { size: 40, align: 'center', color: U.AMBER, weight: 700 });
      }
      // Damla (ölçüt devresinin yanında, işaret ediyor)
      const pointR = c[0] !== 'ref' && t > s0 + 1;
      U.damla(ctx, t, { x: 560, y: 930, s: 0.8, view: 'q3', expr: c[0] === 'sout' && t > s0 + 2 ? 'surprised' : 'curious', look: [0.8, -0.4], arms: [[-1, 0.35], [1, pointR ? 1.9 : 0.4]] });
    }
  });
})();
