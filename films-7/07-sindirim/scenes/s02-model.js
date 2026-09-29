// SAHNE 2 — Model üzerinde sindirim kanalı: ağızdan anüse (a: nitelikleri tanımlar, b: model üzerinde inceler, c: görevleri açıklar)
(function () {
  const { PAL, leader } = INK; const K = KIT, F = F07;
  const CARDS = {
    def: ['Sindirim', ['Besinlerin, hücrelerin', 'kullanabileceği küçük', 'parçalara ayrılması']],
    canal: ['Sindirim kanalı', ['ağız → yutak → yemek borusu', '→ mide → ince bağırsak', '→ kalın bağırsak → anüs']],
    mouth: ['Ağız', ['dişler: parçalar, öğütür', 'dil: karıştırır, yutmaya yardım eder', 'tükürük: ıslatır, yumuşatır']],
    esoph: ['Yutak · Yemek borusu', ['yutak: lokmayı yemek', 'borusuna yönlendirir', 'yemek borusu: kasılarak iter']],
    stomach: ['Mide', ['kaslı, esnek bir torba', 'besini karıştırır, çalkalar', 'mide öz suyu salgılar']],
    small: ['İnce bağırsak', ['sindirim kanalının en uzun kısmı', 'sindirim burada tamamlanır', 'besin parçaları kana geçer']],
    large: ['Kalın bağırsak · Anüs', ['suyun bir kısmını emer', 'artıkları biriktirir', 'anüs: artıkları dışarı atar']]
  };
  const ORDER = ['def', 'canal', 'mouth', 'esoph', 'stomach', 'small', 'large'];
  // etiketler: [metin, x, y, hedef, beat, hizalama]
  const LABELS = [
    ['ağız', 880, 290, [592, 298], 'mouth'], ['yutak', 880, 352, [578, 340], 'esoph'], ['yemek borusu', 880, 462, [578, 460], 'esoph'],
    ['mide', 880, 590, [712, 590], 'stomach'], ['ince bağırsak', 880, 800, [648, 800], 'small'],
    ['kalın bağırsak', 300, 740, [440, 770], 'large', 'right'], ['anüs', 300, 880, [570, 902], 'large', 'right']
  ];
  E.scene({
    name: 'Sindirim kanalı', concept: 'Ağız, yutak, yemek borusu, mide, ince ve kalın bağırsak, anüs', from: 'def', to: 'large', trFrom: [560, 500],
    draw(ctx, t) {
      let cur = 'def'; ORDER.forEach(b => { if (t >= E.s(b)) cur = b; });
      const sc = E.s('canal');
      const kCanal = t < sc ? 0 : E.se(t, sc + 0.8, sc + 6.5);
      const hi = { mouth: 'mouth', esoph: ['pharynx', 'esoph'], stomach: 'stomach', small: 'small', large: 'large' }[cur];
      F.silhouette(ctx);
      F.organs(ctx, { k: kCanal, hi, aux: 0 });
      INK.label(ctx, 'model · ölçekli değildir', 60, 205, { size: 28, alpha: 0.55 });
      // lokma
      const U = n => F.stopU(n);
      let u = null;
      if (cur === 'mouth') u = 0.002;
      if (cur === 'esoph') u = E.lerp(U('mouth'), U('stomach'), E.se(t, E.s('esoph') + 1.0, E.s('esoph') + 5.5));
      if (cur === 'stomach') u = U('stomach');
      if (cur === 'small') u = E.lerp(U('stomach'), U('smallEnd'), E.se(t, E.s('small') + 0.6, E.s('small') + 5.5));
      if (cur === 'large') u = E.lerp(U('smallEnd'), 1, E.se(t, E.s('large') + 0.6, E.s('large') + 6.0));
      if (u !== null) { const ch = cur === 'mouth' ? 1 + 0.25 * Math.sin(t * 9) : cur === 'stomach' ? 1 + 0.15 * Math.sin(t * 6) : 1;
        const p = F.at(F.PATH, u); ctx.save(); ctx.translate(p[0], p[1]); ctx.scale(ch, 1 / ch); ctx.translate(-p[0], -p[1]); F.bolus(ctx, u, cur === 'mouth' ? { r: 14 } : {}); ctx.restore(); }
      if (cur === 'canal') { const lk = E.se(t, sc + 0.5, sc + 1.2); K.text(ctx, 'başlangıç', 690, 250, { size: 32, alpha: lk * 0.8, color: K.AMBER_D }); K.text(ctx, 'bitiş', 330, 885, { size: 32, alpha: E.se(t, sc + 6, sc + 6.6) * 0.8, color: K.AMBER_D, align: 'right' }); }
      // etiketler (birikerek kalır)
      LABELS.forEach(([txt, x, y, to, b, al], i) => { const k = E.se(t, E.s(b) + 0.4, E.s(b) + 1.0); if (k <= 0) return;
        const on = cur === b; ctx.save(); ctx.globalAlpha = k * (on ? 1 : 0.65); leader(ctx, al === 'right' ? [x + 8, y - 12] : [x - 8, y - 12], to, { bend: 0.08, seed: 7200 + i }); ctx.restore();
        K.text(ctx, txt, x, y, { size: 38, alpha: k * (on ? 1 : 0.7), color: on ? K.AMBER_D : PAL.ink, align: al ?? 'left' }); });
      // bilgi kartı
      ORDER.forEach((b, i) => {
        const s0 = E.s(b), e0 = E.e(b), k = Math.min(E.se(t, s0 + 0.2, s0 + 0.8, 'out'), 1 - E.se(t, e0 - 0.3, e0 + 0.2)); if (k <= 0) return;
        const [title, items] = CARDS[b];
        E.layer(ctx, k, c => {
          K.card(c, 1150, 230, 690, 420, { seed: 7300 + i, tint: b === 'def' || b === 'canal' ? PAL.light : PAL.life, tintA: 0.1 });
          K.text(c, title, 1195, 320, { size: 52, color: K.LIFE_D, maxW: 610 });
          items.forEach((it, j) => P.write(c, it, 1195, 410 + j * 72, E.seg(t, s0 + 0.9 + j * 1.1, s0 + 1.9 + j * 1.1), { size: 38 }));
        });
      });
    }
  });
})();
