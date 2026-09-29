// SAHNE 3 — Gruplandırma: benzer canlıları bir ölçüte göre gruplandırma (E1.1, uygulama metni)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F621;
  const COLS = [['Bitkiler', PAL.life], ['Böcekler', '#C99A22'], ['Kuşlar', '#8A6A45'], ['Balıklar', PAL.water], ['Kurbağalar', '#4F7A34']];
  const CX = [540, 830, 1120, 1410, 1700];
  // [ad, sütun, sıra, çizim(c, t) merkez 0,0]
  const CARDS = [
    ['papatya', 0, 0, (c, t) => F.flower(c, 0, 45, 0.8, '#FBF8F1', 1, t, 80)],
    ['gelincik', 0, 1, (c, t) => F.flower(c, 0, 45, 0.8, '#C8553D', 3, t, 80)],
    ['söğüt', 0, 2, (c, t) => F.tree(c, 0, 60, 0.5, 4, t, { col: '#5E8F45' })],
    ['arı', 1, 0, (c, t) => F.bee(c, 0, 0, 1.4, t)],
    ['kelebek', 1, 1, (c, t) => F.butterfly(c, 0, 0, 1.3, t)],
    ['serçe', 2, 0, (c, t) => F.bird(c, -6, 30, 1.2, t)],
    ['balıkçıl', 2, 1, (c, t) => F.heron(c, -20, 72, 0.55, t)],
    ['sazan', 3, 0, (c, t) => F.fish(c, 4, 0, 1.3, 1, '#D98A2B', 3)],
    ['kurbağa', 4, 0, (c, t) => F.frog(c, 0, 26, 1.2)]
  ];
  const W = 230, H = 160;
  E.scene({
    name: 'Gruplandır', concept: 'Benzer canlıları gruplandırma; ölçüt', from: 'group', to: 'criteria', trFrom: [960, 540],
    draw(ctx, t) {
      const sg = E.s('group'), sc = E.s('criteria');
      ctx.fillStyle = 'rgba(111,138,58,0.08)'; ctx.fillRect(0, 0, E.W, E.H);
      // sütun başlıkları
      COLS.forEach(([name, col], i) => {
        const k = E.se(t, sg + 3.0 + i * 0.25, sg + 3.6 + i * 0.25, 'out'); if (k <= 0) return;
        c0(ctx, k, c => {
          const hb = F.rr(CX[i] - 128, 196, 256, 70, 10); P.fillPts(c, hb, '#FBF8F1'); INK.wash(c, hb, col, 0.35, 60 + i, { bleed: 1, blooms: 0 }); stroke(c, hb, { w: 2.6, closed: true, seed: 61 + i });
          F.fit(c, name, CX[i], 246, 230, 44);
        });
      });
      // kartlar: önce karışık yığın, sonra sütunlara
      const R = INK.rng(77);
      CARDS.forEach(([name, col, row, draw], i) => {
        const pile = [760 + (R() - 0.5) * 900, 470 + (R() - 0.5) * 380, (R() - 0.5) * 0.5];
        const at = sg + 0.3 + i * 0.25, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
        const mv = E.se(t, sg + 3.8 + i * 0.35, sg + 4.8 + i * 0.35);
        const x = E.lerp(pile[0], CX[col], mv), y = E.lerp(pile[1], 380 + row * 180, mv), r = E.lerp(pile[2], 0, mv);
        ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.scale(P.pop(k), P.pop(k));
        F.card(ctx, -W / 2, -H / 2 + 5, W, H - 5, 90 + i, { blur: 12 });
        ctx.save(); ctx.translate(0, -14); draw(ctx, t); ctx.restore();
        F.fit(ctx, name, 0, H / 2 - 12, W - 20, 34);
        ctx.restore();
      });
      // ölçüt etiketi
      const ok = E.se(t, sc + 0.2, sc + 1.0, 'out');
      if (ok > 0) c0(ctx, ok, c => {
        F.card(c, 860, 130, 800, 56, 7, { tint: '#C99A22', tintA: 0.2, blur: 8 });
        F.fit(c, 'Ölçütüm: canlı grubu', 1260, 172, 760, 40);
      });
      const ak = E.se(t, sc + 2.4, sc + 3.2, 'out');
      if (ak > 0) c0(ctx, ak, c => {
        F.card(c, 820, 760, 1000, 120, 8, { tint: PAL.life, tintA: 0.14, blur: 10 });
        P.write(c, 'Başka ölçüt?', 850, 810, E.seg(t, sc + 2.6, sc + 3.4), { size: 40, color: '#2F4A1E' });
        P.write(c, 'yaşadığı ortam: suda · karada · havada', 850, 862, E.seg(t, sc + 3.2, sc + 4.6), { size: 38, weight: 400 });
      });
      // Damla (defterle)
      DAMLA.draw(ctx, { x: 190, y: 900, s: 1.05, view: 'q3', expr: t > sc ? 'happy' : 'thinking', look: [0.8, -0.3], blink: E.blink(t, 5), squash: E.breath(t), t, talk: E.talk(t), seed: 2, arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
  function c0(ctx, a, fn) { E.layer(ctx, a, fn); }
})();
