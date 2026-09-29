// SAHNE 4 — Ayrıştır (b), gruplandır (c), etiketle (ç): ısı · ışık · ses · hareket; çoklu dönüşüm
(function () {
  const { PAL, stroke, dashed } = INK;
  const W = W6;
  const CX = [330, 750, 1170, 1590], RA = 470, RB = 640, R3 = 810, CW = 190, CH = 150;
  const TYPES = ['isi', 'isik', 'ses', 'hareket'];
  // [anahtar, başlangıç (sütun,satır), hedef (sütun,satır)]
  const CARDS = [
    ['hoparlor', [0, 0], [2, 0]], ['vantilator', [0, 1], [3, 0]], ['mikser', [1, 0], [3, 1]], ['zil', [1, 1], [2, 1]],
    ['utu', [2, 0], [0, 0]], ['ampul', [2, 1], [1, 0]], ['fener', [3, 0], [1, 1]], ['isitici', [3, 1], [0, 1]]
  ];
  const pos = (c, r) => [CX[c], r ? RB : RA];
  function devCard(ctx, key, x, y, t, on, o = {}) {
    const d = W.APP[key];
    W.card(ctx, x - CW / 2, y - CH / 2, CW, CH, { seed: 5100 + key.length * 7, tint: o.tint, tintA: 0.14, w: o.hl ? 3.4 : 2.4, color: o.hl ?? PAL.ink });
    ctx.save(); ctx.beginPath(); ctx.rect(x - CW / 2, y - CH / 2, CW, CH - 36); ctx.clip();
    d.f(ctx, x, y - 20, 0.52, t, on);
    ctx.restore();
    W.txt(ctx, d.n, x, y + CH / 2 - 12, { size: W.fit(ctx, d.n, CW - 16, 32), align: 'center' });
  }
  E.scene({
    name: 'Sınıflandır', concept: 'Dönüşüm örneklerini ayrıştır, gruplandır, etiketle', from: 'sort', to: 'multi2', trFrom: [960, 540],
    draw(ctx, t) {
      const ss = E.s('sort'), sg = E.s('group'), sg2 = E.s('group2'), sl = E.s('label'), sm = E.s('multi'), sm2 = E.s('multi2');
      // sütun kutuları ve başlıklar (etiketle)
      const lk = E.se(t, sl + 0.2, sl + 1.2);
      if (lk > 0) CX.forEach((x, i) => {
        const e = W.EN[TYPES[i]];
        ctx.save(); ctx.globalAlpha *= lk; const bx = W.rect(x - 110, 380, x + 110, 732);
        P.fillPts(ctx, bx, e.c, 0.07); dashed(ctx, INK.sample(u => { const p = u * 4; const s = Math.floor(p) % 4, f = p - Math.floor(p); const c = [[x - 110, 380], [x + 110, 380], [x + 110, 732], [x - 110, 732], [x - 110, 380]]; return [c[s][0] + (c[s + 1][0] - c[s][0]) * f, c[s][1] + (c[s + 1][1] - c[s][1]) * f]; }, 400), { w: 2, color: e.c, on: 10, off: 8 });
        ctx.restore();
        W.badge(ctx, TYPES[i], x, 320, E.se(t, sl + 0.8 + i * 0.5, sl + 1.4 + i * 0.5, 'out'), { size: 40, t });
      });
      // 8 kart
      CARDS.forEach(([key, a, b], i) => {
        const k = E.se(t, ss + 0.3 + i * 0.35, ss + 0.8 + i * 0.35, 'out'); if (k <= 0) return;
        const tIdx = b[0];
        const mv = E.se(t, sg + 0.4 + (tIdx >= 2 ? 0.3 : 0), sg + 2.2 + (tIdx >= 2 ? 0.3 : 0));
        const p0 = pos(...a), p1 = pos(...b); const x = E.lerp(p0[0], p1[0], mv), y = E.lerp(p0[1], p1[1], mv) - Math.sin(mv * Math.PI) * 60;
        const hlT = tIdx < 2 ? sg + 2.4 : sg2 + 0.3;
        const hl = t > hlT ? W.EN[TYPES[tIdx]].c : null;
        const on = t > hlT ? 1 : 0;
        ctx.save(); ctx.translate(x, y); ctx.scale(P.pop(k), P.pop(k)); ctx.translate(-x, -y);
        devCard(ctx, key, x, y, t, on, { hl, tint: hl });
        ctx.restore();
      });
      // büyüteçli Damla (sağ alt)
      W.damla(ctx, t, { x: 1830, y: 905, s: 0.72, view: 'q3', flip: true, expr: t > sm ? 'surprised' : 'curious', look: [-0.8, -0.3], arms: [[-1, 1.6], [1, 0.4]], prop: 'lens', seed: 6 });
      // çoklu dönüşüm kartları
      const mk1 = E.se(t, sm + 0.3, sm + 0.9, 'out');
      if (mk1 > 0) {
        ctx.save(); ctx.translate(1170, R3); ctx.scale(P.pop(mk1), P.pop(mk1)); ctx.translate(-1170, -R3); devCard(ctx, 'kurutma', 1170, R3, t, 1, { hl: PAL.ink }); ctx.restore();
        W.badge(ctx, 'isi', 1360, R3 - 40, E.se(t, sm + 1.2, sm + 1.7, 'out'), { size: 30, t });
        W.badge(ctx, 'hareket', 1400, R3 + 38, E.se(t, sm + 1.7, sm + 2.2, 'out'), { size: 30, t });
      }
      const mk2 = E.se(t, sm + 3.2, sm + 3.8, 'out');
      if (mk2 > 0) {
        ctx.save(); ctx.translate(540, R3); ctx.scale(P.pop(mk2), P.pop(mk2)); ctx.translate(-540, -R3); devCard(ctx, 'tv', 540, R3, t, 1, { hl: PAL.ink }); ctx.restore();
        W.badge(ctx, 'isik', 730, R3 - 40, E.se(t, sm + 4.2, sm + 4.7, 'out'), { size: 30, t });
        W.badge(ctx, 'ses', 722, R3 + 38, E.se(t, sm + 4.7, sm + 5.2, 'out'), { size: 30, t });
      }
      E.inkText(ctx, 'Bir alet → birden fazla enerji türü', 1180, 225, t, sm2 + 0.4, 1e9, { size: 46, align: 'center', color: W.AMBER });
    }
  });
})();
