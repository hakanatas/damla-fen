// SAHNE 4 — Üç deney: uzunluk, kesit alanı, iletkenin cinsi (FB.6.6.2 a-b; E3.7 sistematik; OB7)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  // deneme listesi
  const TR = () => [
    { e: 0, at: E.s('len') + 2.5, cm: 25, thick: false, mat: 'nicr', lab: '25 cm' },
    { e: 0, at: E.s('len-r') + 0.2, cm: 50, thick: false, mat: 'nicr', lab: '50 cm' },
    { e: 0, at: E.s('len-r') + 2.4, cm: 100, thick: false, mat: 'nicr', lab: '100 cm' },
    { e: 1, at: E.s('area') + 2.5, cm: 50, thick: true, mat: 'nicr', lab: 'kalın' },
    { e: 1, at: E.s('area-r') + 0.2, cm: 50, thick: false, mat: 'nicr', lab: 'ince' },
    { e: 2, at: E.s('mat') + 2.5, cm: 50, thick: false, mat: 'cu', lab: 'bakır' },
    { e: 2, at: E.s('mat-r') + 0.2, cm: 50, thick: false, mat: 'nicr', lab: 'krom-nikel' }
  ];
  const HEAD = ['Deney 1: telin uzunluğu', 'Deney 2: telin kesit alanı', 'Deney 3: iletkenin cinsi'];
  const SUB = ['aynı kalınlık, aynı cins (krom-nikel)', 'aynı uzunluk, aynı cins (krom-nikel)', 'aynı uzunluk, aynı kalınlık'];
  const RES = ['uzunluk ↑  →  direnç ↑  →  parlaklık ↓', 'kesit alanı ↓  →  direnç ↑  →  parlaklık ↓', 'krom-nikelin direnci bakırdan büyük'];
  E.scene({
    name: 'Deneyler', concept: 'Uzunluk, kesit alanı, cins', from: 'len', to: 'mat-r', trFrom: [960, 700],
    draw(ctx, t) {
      const starts = [E.s('len'), E.s('area'), E.s('mat')], rs = [E.s('len-r'), E.s('area-r'), E.s('mat-r')];
      const e = t >= starts[2] ? 2 : t >= starts[1] ? 1 : 0, se = starts[e];
      const trials = TR(), mine = trials.filter(q => q.e === e);
      let cur = null; mine.forEach(q => { if (t >= q.at) cur = q; });
      const spec = cur ?? { cm: mine[0].cm, thick: mine[0].thick, mat: mine[0].mat };
      const on = cur && t > cur.at + 0.6;
      const b = on ? F20.B(F20.R(spec.cm, spec.thick, spec.mat)) : 0;
      ctx.save();
      CK.table(ctx, 830);
      const r = F20.rig(ctx, 1000, 830, 1.0, b, t, spec);
      if (cur) {
        const kl = E.se(t, cur.at, cur.at + 0.4);
        INK.label(ctx, cur.lab, (r.board.a[0] + r.board.b[0]) / 2, 890, { size: 40, weight: 700, align: 'center', alpha: kl, color: spec.mat === 'cu' ? '#8A4A10' : PAL.ink });
      }
      INK.label(ctx, '(çizim ölçekli değildir)', 1880, 905, { size: 26, align: 'right', alpha: 0.55 });
      // başlık
      const kh = E.se(t, se + 0.1, se + 0.7);
      E.layer(ctx, kh, c => {
        INK.label(c, HEAD[e], 760, 200, { size: 50, weight: 700 });
        INK.label(c, SUB[e], 760, 250, { size: 36, alpha: 0.8 });
      });
      // sonuç şeridi
      mine.forEach((q, i) => {
        const k = E.se(t, q.at + 0.6, q.at + 1.1); if (k <= 0) return;
        const x = 860 + i * 230, y = 330, bb = F20.B(F20.R(q.cm, q.thick, q.mat));
        E.layer(ctx, k, c => { CK.bulb(c, x, y + 50, 0.5, bb, t, { rays: false }); INK.label(c, q.lab, x, y + 92, { size: 34, weight: 700, align: 'center' }); });
        F20.meter(ctx, x - 60, y + 108, 120, bb, k);
      });
      const kr = E.se(t, rs[e] + 4.2, rs[e] + 4.8);
      if (kr > 0) P.write(ctx, RES[e], 760, 530, E.seg(t, rs[e] + 4.2, rs[e] + 5.6), { size: 42, color: '#8A4A10' });
      DAMLA.draw(ctx, {
        x: 150, y: 832, s: 1.0, view: 'q3', expr: on && b < 0.5 ? 'surprised' : 'curious', look: [0.9, -0.3], blink: E.blink(t, 3), squash: E.breath(t), t, seed: 1,
        arms: [[-1, 0.4], [1, 1.6]], prop: 'notebook'
      });
      ctx.restore();
    }
  });
})();
