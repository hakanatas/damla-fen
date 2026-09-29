// SAHNE 3 — Model üzerinde bezler + kavram haritası (FB.6.3.7 a: mantıksal ilişkiler); yapılarına girilmez
(function () {
  const { PAL, leader } = INK; const K = KIT, F = F10;
  const ROWS = [
    ['pit', 'growth', 'Hipofiz', 'büyüme hormonu', 'büyümeyi ve gelişmeyi sağlar; bazı bezleri düzenler'],
    ['thy', 'thyroid', 'Tiroit', 'tiroksin', 'vücudun enerji kullanma hızını düzenler'],
    ['adr', 'adrenaline', 'Böbrek üstü bezleri', 'adrenalin', 'korku, heyecan: kalp ve solunum hızlanır'],
    ['pan', 'pancreas', 'Pankreas', 'insülin · glukagon', 'kan şekerini düşürür · yükseltir → denge'],
    ['sex', 'sex', 'Yumurtalık · testis', 'eşeysel hormonlar', 'ergenlik değişimlerini başlatır']
  ];
  E.scene({
    name: 'Kavram haritası', concept: 'Bezler, hormonlar ve görevleri', from: 'map', to: 'sex', trFrom: [430, 450],
    draw(ctx, t) {
      let cur = null; ROWS.forEach(r => { if (t >= E.s(r[1])) cur = r[0]; });
      const A = F.body(ctx, 430, 560, 0.95, { hi: cur ? [cur] : [], lit: E.se(t, E.s('map') + 0.5, E.s('map') + 1.5), t });
      INK.label(ctx, 'model · bezlerin yalnızca yeri gösterilir', 430, 185, { size: 28, align: 'center', alpha: 0.55 });
      ROWS.forEach(([id, beat, bez, hor, gor], i) => {
        const s0 = E.s(beat), y = 250 + i * 135, k = E.se(t, s0 + 0.3, s0 + 0.9, 'out'); if (k <= 0) return;
        ctx.save(); ctx.globalAlpha = k * (cur === id ? 1 : 0.55); leader(ctx, [870, y], A[id], { bend: 0.08, seed: 10200 + i }); ctx.restore();
        K.node(ctx, bez, 1060, y, k, { size: 36, w: 360, h: 66, tint: PAL.light, tintA: cur === id ? 0.35 : 0.12, seed: 40 + i });
        const k2 = E.se(t, s0 + 1.4, s0 + 2.0, 'out');
        if (k2 > 0) { P.arrow(ctx, [1245, y], [1320, y], k2, { w: 2.6, head: 10 }); K.node(ctx, hor, 1520, y, k2, { size: 36, w: 380, h: 66, tint: PAL.life, tintA: 0.15, seed: 50 + i }); }
        const k3 = E.se(t, s0 + 3.0, s0 + 3.6);
        if (k3 > 0) K.text(ctx, gor, 900, y + 62, { size: 30, alpha: k3 * (cur === id ? 1 : 0.7), maxW: 900 });
      });
      if (t < E.s('growth')) K.text(ctx, 'Kavram haritam', 1360, 180, { size: 52, align: 'center', color: K.AMBER_D, alpha: E.se(t, E.s('map') + 2, E.s('map') + 2.8) });
    }
  });
})();
