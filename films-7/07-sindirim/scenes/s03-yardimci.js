// SAHNE 3 — Sindirime yardımcı organlar: karaciğer ve pankreas; besin içlerinden geçmez
(function () {
  const { PAL, leader, inkDot } = INK; const K = KIT, F = F07;
  const BILE = F.cr([[520, 592], [528, 632], [530, 668]], 12), PJ = F.cr([[600, 694], [560, 690], [534, 684]], 12);
  E.scene({
    name: 'Yardımcı organlar', concept: 'Karaciğer (safra) ve pankreas (enzimler)', from: 'liver', to: 'notpass', tr: 0.9, trFrom: [480, 560],
    draw(ctx, t) {
      const sl = E.s('liver'), sp = E.s('pancreas'), sn = E.s('notpass');
      const cur = t < sp ? 'liver' : t < sn ? 'pancreas' : 'notpass';
      const auxK = E.se(t, sl + 0.3, sl + 1.4);
      const hi = cur === 'liver' ? 'liver' : cur === 'pancreas' ? 'panc' : ['liver', 'panc', 'small'];
      F.silhouette(ctx);
      F.organs(ctx, { k: 1, hi, aux: auxK, ducts: E.se(t, sl + 3.5, sl + 4.5) });
      INK.label(ctx, 'model · ölçekli değildir', 60, 205, { size: 28, alpha: 0.55 });
      // salgı akışı (noktalar)
      const flow = (pts, t0, col) => { if (t < t0) return; for (let j = 0; j < 3; j++) { const u = ((t - t0) * 0.45 + j / 3) % 1; const p = F.at(pts, u); inkDot(ctx, p[0], p[1], 5, { color: col }); } };
      flow(BILE, sl + 4.5, '110,138,58'); if (t > sp + 1.2) flow(PJ, sp + 1.2, '192,127,30');
      // etiketler
      const lk = E.se(t, sl + 0.5, sl + 1.1); ctx.save(); ctx.globalAlpha = lk; leader(ctx, [300, 534], [420, 556], { bend: 0.05 }); ctx.restore(); K.text(ctx, 'karaciğer', 290, 548, { size: 40, align: 'right', alpha: lk, color: cur === 'liver' ? K.AMBER_D : PAL.ink });
      if (t > sl + 4.5) K.text(ctx, 'safra', 440, 648, { size: 30, color: '#4E6628', alpha: E.se(t, sl + 4.5, sl + 5.1) });
      const pk = E.se(t, sp + 0.3, sp + 0.9); ctx.save(); ctx.globalAlpha = pk; leader(ctx, [872, 690], [704, 682], { bend: -0.05 }); ctx.restore(); K.text(ctx, 'pankreas', 880, 702, { size: 40, alpha: pk, color: cur === 'pancreas' ? K.AMBER_D : PAL.ink });
      const ik = E.se(t, sn + 0.3, sn + 0.9); ctx.save(); ctx.globalAlpha = ik * 0.7; leader(ctx, [872, 800], [648, 800], { bend: 0.05 }); ctx.restore(); K.text(ctx, 'ince bağırsak', 880, 812, { size: 38, alpha: ik });
      // YANLIŞ yol: mideden karaciğere ok ✗
      const wk = E.se(t, sn + 1.2, sn + 2.0);
      if (wk > 0) { ctx.save(); ctx.globalAlpha = wk; INK.dashed(ctx, F.cr([[630, 560], [560, 520], [470, 548]], 40), { w: 3.5, color: K.RED }); P.cross(ctx, 548, 518, 20, E.se(t, sn + 2.0, sn + 2.6), { w: 6, color: K.RED }); ctx.restore(); }
      // kartlar
      const card = (b, i, title, items, tint) => { const s0 = E.s(b), e0 = E.e(b), k = Math.min(E.se(t, s0 + 0.2, s0 + 0.8, 'out'), 1 - E.se(t, e0 - 0.3, e0 + 0.2)); if (k <= 0) return;
        E.layer(ctx, k, c => { K.card(c, 1150, 230, 690, 420, { seed: 7400 + i, tint, tintA: 0.1 }); K.text(c, title, 1195, 320, { size: 52, color: K.LIFE_D, maxW: 610 });
          items.forEach((it, j) => { if (typeof it === 'string') P.write(c, it, 1195, 410 + j * 72, E.seg(t, s0 + 1.0 + j * 1.1, s0 + 2.0 + j * 1.1), { size: 38 }); else { const [txt, ok] = it; const kk = E.seg(t, s0 + 1.0 + j * 1.6, s0 + 2.0 + j * 1.6); P.write(c, txt, 1250, 410 + j * 72, kk, { size: 38 }); if (ok) P.check(c, 1215, 398 + j * 72, 30, kk, { w: 5, color: K.LIFE_D }); else P.cross(c, 1215, 398 + j * 72, 14, kk, { w: 5, color: K.RED }); } }); }); };
      card('liver', 0, 'Karaciğer', ['safra üretir', 'safra, yağları küçük', 'damlacıklara ayırır'], PAL.life);
      card('pancreas', 1, 'Pankreas', ['sindirim enzimleri üretir', 'öz suyunu ince bağırsağa', 'gönderir'], PAL.light);
      card('notpass', 2, 'Yardımcı organlar', [['besin içlerinden geçmez', false], ['salgıları ince bağırsağa gelir', true]], PAL.life);
    }
  });
})();
