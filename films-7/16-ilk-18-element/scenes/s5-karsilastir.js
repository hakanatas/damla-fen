// SAHNE 6 — Grup ve periyot karşılaştırması: benzerlikler / farklılıklar listesi (FB.7.5.6 a, b, c)
// SAHNE 7 — Kaydet; SAHNE 8 — Sıra sende (kart eşleştirme oyunu) · Sıradaki: Bileşik formülleri · Bitiş
(function () {
  const { PAL, stroke } = INK;
  const F = F7M;
  const TW = 170, TH = 140, X8 = 240, Y8 = 190;
  const pos8 = (g, p) => [X8 + (g - 1) * (TW + 10), Y8 + (p - 1) * (TH + 10)];
  function compare(ctx, t) {
    const s1 = E.s('same'), s2 = E.s('diffp');
    F.ELEMS.forEach(([s, nm, g, p], i) => {
      const [x, y] = pos8(g, p);
      const inG = g === 1, inP = p === 2;
      const hg = inG ? E.se(t, s1 + 0.3, s1 + 1.0) * (1 - E.se(t, s2, s2 + 0.5)) : 0, hp = inP ? E.se(t, s2 + 0.3, s2 + 1.0) : 0;
      F.tile(ctx, x, y, TW, TH, s, i + 1, null, { tint: hg > 0 ? F.BR : PAL.water, tintA: 0.1 + 0.25 * Math.max(hg, hp), lw: 2 + 2 * Math.max(hg, hp) });
      F.txt(ctx, F.shells(i + 1).join(', '), x + TW - 10, y + TH - 8, { size: 28, align: 'right', color: PAL.water });
    });
    ['1A', '2A', '3A', '4A', '5A', '6A', '7A', '8A'].forEach((g, i) => F.txt(ctx, g, X8 + i * (TW + 10) + TW / 2, Y8 - 12, { size: 30, align: 'center', color: F.BR, alpha: 0.8 }));
    [1, 2, 3].forEach(p => F.txt(ctx, p + '.', X8 - 34, Y8 + (p - 1) * (TH + 10) + 82, { size: 32, align: 'center', color: PAL.water }));
    const a1 = 1 - E.se(t, s2 - 0.1, s2 + 0.4);
    if (a1 > 0) E.layer(ctx, a1, c => {
      P.write(c, '1A grubu · benzer: son katmanda 1 elektron', 240, 730, E.seg(t, s1 + 1.0, s1 + 2.6), { size: 44, color: PAL.water });
      P.write(c, 'farklı: katman sayısı 1, 2, 3', 240, 800, E.seg(t, s1 + 2.8, s1 + 4.2), { size: 44, color: F.BR });
    });
    const a2 = E.se(t, s2 + 0.2, s2 + 0.6);
    if (a2 > 0) E.layer(ctx, a2, c => {
      P.write(c, '2. periyot · benzer: 2 katman', 240, 730, E.seg(t, s2 + 0.8, s2 + 2.2), { size: 44, color: PAL.water });
      P.write(c, 'farklı: son katmanda 1, 2, 3 ... 8 elektron', 240, 800, E.seg(t, s2 + 2.4, s2 + 3.9), { size: 44, color: F.BR });
    });
  }
  const ITEMS = [
    'Sembol: tek harf büyük (O); iki harf → ilki büyük (Na).',
    'Tablo artan proton sayısına göre dizilir.',
    'Yatay satır = periyot (7) · dikey sütun = grup (8 A, 10 B).',
    'Katman sayısı → periyot · son katman elektronu → A grubu.',
    'Helyum istisna: 2 elektron, 8A grubunda.',
    'Elektron veren → artı, alan → eksi yüklü iyon.'
  ];
  function page(ctx, t) {
    const sr = E.s('record');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 160, 1620, 740);
    P.write(ctx, 'Gözlem Defteri · Periyodik Tablo', 290, 250, E.seg(t, sr + 0.2, sr + 1.2), { size: 58 });
    P.drawOn(ctx, P.bez([286, 272], [640, 282], [1080, 268], 30), E.se(t, sr + 1.2, sr + 1.7), { w: 3, color: PAL.water });
    ITEMS.forEach((s, i) => {
      const at = sr + 1.4 + i * 1.25, y = 345 + i * 88;
      P.check(ctx, 320, y - 20, 40, E.se(t, at + 0.8, at + 1.2), { w: 5 });
      P.write(ctx, s, 370, y, E.seg(t, at, at + 1.1), { size: 42 });
    });
    F.damla(ctx, t, { x: 1660, y: 1000, s: 0.95, flip: true, expr: 'neutral', look: [-0.7, 0.3], prop: 'notebook', arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], seed: 6 });
  }
  function outro(ctx, t) {
    const sk = E.s('task'), sn = E.s('next');
    F.desk(ctx, 880, 9);
    const k = Math.min(E.se(t, sk, sk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
    if (k > 0) E.layer(ctx, k, c => {
      F.card(c, 220, 180, 1700, 800, { seed: 691 });
      P.write(c, 'Sıra sende!', 300, 290, E.seg(t, sk + 0.3, sk + 1.2), { size: 72, color: F.BR });
      const L = ['1. İlk 18 element + 9 elementin adlarını kartlara yaz.', '2. Sembollerini ayrı kartlara yaz (büyük-küçük harfe dikkat).', '3. Kartları karıştır, arkadaşınla eşleştirme oyna.'];
      L.forEach((s, i) => P.write(c, s, 320, 400 + i * 85, E.seg(t, sk + 0.9 + i * 1.3, sk + 2.1 + i * 1.3), { size: 44 }));
      [['sodyum', 'Na'], ['kükürt', 'S'], ['altın', 'Au']].forEach(([a, b], i) => {
        const x = 380 + i * 420, y = 640, kk = E.se(t, sk + 4.8 + i * 0.5, sk + 5.3 + i * 0.5);
        c.save(); c.globalAlpha *= kk;
        F.card(c, x, y, x + 170, y + 110, { seed: 700 + i }); F.txt(c, a, x + 85, y + 70, { size: 38, align: 'center' });
        F.tile(c, x + 220, y, 110, 110, b, null, null, { tint: PAL.water, tintA: 0.15 });
        P.arrow(c, [x + 175, y + 55], [x + 214, y + 55], 1, { w: 2.4, head: 9 });
        c.restore();
      });
    });
    const kn = Math.min(E.se(t, sn + 0.2, sn + 1.0, 'out'), 1 - E.se(t, E.s('end'), E.s('end') + 0.8));
    if (kn > 0) E.layer(ctx, kn, c => {
      INK.label(c, 'Sıradaki gözlem:', 960, 250, { size: 48, align: 'center', alpha: 0.8 });
      INK.label(c, 'Bileşik Formülleri', 960, 340, { size: 76, weight: 700, align: 'center' });
      F.mol(c, 'H2O', 760, 560, 1.1); F.mol(c, 'CO2', 1180, 560, 1.0);
      INK.label(c, 'H₂O ?', 760, 730, { size: 48, weight: 700, align: 'center' }); INK.label(c, 'CO₂ ?', 1180, 730, { size: 48, weight: 700, align: 'center' });
      F.damla(c, t, { x: 1720, y: 880, s: 1.0, flip: true, expr: 'curious', look: [-0.8, -0.1], seed: 7, arms: [[-1, 0.35], [1, 1.9]] });
    });
    F.endCard(ctx, t, '16 · İlk 18 Element ve Periyodik Tablo', 'FB.7.5.5 · FB.7.5.6');
  }
  E.scene({ name: 'Karşılaştır', concept: 'Grup ve periyot: benzerlik / farklılık', from: 'same', to: 'diffp', trFrom: [960, 400], draw(ctx, t) { compare(ctx, t); } });
  E.scene({ name: 'Kaydet', concept: 'Bilgileri kaydetme', from: 'record', to: 'record', trFrom: [960, 540], draw(ctx, t) { page(ctx, t); } });
  E.scene({ name: 'Sıra sende', concept: 'Kart eşleştirme oyunu ve sonraki konu', from: 'task', to: 'end', trFrom: [960, 480], draw(ctx, t) { outro(ctx, t); } });
})();
