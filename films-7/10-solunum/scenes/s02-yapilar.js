// SAHNE 2 — Model üzerinde solunum yolu: burun → yutak → gırtlak → soluk borusu → bronş → bronşçuk → alveol (a, b, c)
(function () {
  const { PAL, leader } = INK; const K = KIT, F = F10;
  const OX = 560, OY = 600, S = 0.76;
  // [etiket, çapa anahtarı, etiket y, beat, not]
  const LABELS = [
    ['burun', 'nose', 300, 'nose', 'süzer · ısıtır · nemlendirir'],
    ['yutak', 'phar', 380, 'larynx', 'hava ve besinin ortak yolu'],
    ['gırtlak', 'larynx', 455, 'larynx', 'ses telleri · kapak'],
    ['soluk borusu', 'trachea', 540, 'trachea', 'kıkırdak halkalar açık tutar'],
    ['bronş', 'bronchi', 625, 'bronchi', 'soluk borusunun iki kolu'],
    ['bronşçuk', 'tree', 700, 'bronchi', 'ince dallar'],
    ['akciğer', 'lungs', 780, 'alveoli', '']
  ];
  const HI = { nose: ['nose'], larynx: ['phar', 'larynx'], trachea: ['trachea'], bronchi: ['bronchi', 'tree'], alveoli: ['tree', 'lungs'] };
  E.scene({
    name: 'Yapılar', concept: 'Solunum yolu yapı ve organları model üzerinde', from: 'model', to: 'alveoli', trFrom: [560, 500],
    draw(ctx, t) {
      const sm = E.s('model'), sa = E.s('alveoli');
      const cur = ['nose', 'larynx', 'trachea', 'bronchi', 'alveoli'].filter(id => t >= E.s(id)).pop();
      const air = t < E.s('nose') + 1 ? (t - sm) * 0.18 : null;
      const A = F.resp(ctx, OX, OY, S, { hi: cur ? HI[cur] : null, air });
      INK.label(ctx, 'model · ölçekli değildir', 60, 900, { size: 28, alpha: 0.55 });
      // tanım kartı
      const dk = E.se(t, sm + 0.8, sm + 1.5, 'out') * (1 - E.se(t, E.s('nose') - 0.2, E.s('nose') + 0.4));
      if (dk > 0) E.layer(ctx, dk, c => {
        K.card(c, 960, 250, 760, 330, { seed: 10100, tint: PAL.water, tintA: 0.1 });
        K.text(c, 'Solunum sistemi', 1010, 330, { size: 54, color: '#1F4A63' });
        ['• soluk alıp vermeyi sağlar', '• gaz değişimini sağlar'].forEach((l, i) => P.write(c, l, 1010, 420 + i * 70, E.seg(t, sm + 2 + i * 1.6, sm + 3.2 + i * 1.6), { size: 44 }));
      });
      // etiketler
      LABELS.forEach(([txt, key, ly, beat, note], i) => {
        const b0 = E.s(beat) + (i === 2 || i === 5 ? 2.6 : 0.4); const k = E.se(t, b0, b0 + 0.6, 'out'); if (k <= 0) return;
        const a = A[key]; ctx.save(); ctx.globalAlpha *= k; leader(ctx, a, [900, ly - 12], { bend: 0.06, seed: 10200 + i }); INK.inkDot(ctx, a[0], a[1], 4); ctx.restore();
        const isCur = HI[cur] && HI[cur].indexOf(key) >= 0;
        K.text(ctx, txt, 912, ly, { size: 42, color: isCur ? '#1F4A63' : PAL.ink, alpha: k * (isCur || cur === 'alveoli' ? 1 : 0.75) });
        if (note && isCur && cur === beat) { ctx.save(); K.font(ctx, 42); const w = ctx.measureText(txt).width; ctx.restore(); K.text(ctx, '— ' + note, 930 + w, ly, { size: 32, alpha: 0.75 * E.se(t, b0 + 0.8, b0 + 1.4), maxW: 1660 - 930 - w }); }
      });
      // yutkunma kapağı mini notu (gırtlak) — besin soluk borusuna kaçmaz
      // alveol büyüteci
      const ik = E.se(t, sa + 2.4, sa + 3.2, 'out');
      if (ik > 0) { ctx.save(); ctx.globalAlpha *= ik; leader(ctx, A.tree, [1235, 600], { bend: -0.2, seed: 10300 }); ctx.restore();
        E.layer(ctx, ik, c => { F.alveoli(c, 1440, 540, 210, t, { cap: t > sa + 5.2 });
          K.text(c, 'alveoller', 1440, 810, { size: 44, align: 'center', color: F.LUNG_D });
          if (t > sa + 5.2) K.text(c, 'kılcal damarlar sarar', 1440, 860, { size: 34, align: 'center', alpha: E.se(t, sa + 5.2, sa + 5.8) }); }); }
      const lensT = t > sa + 2;
      K.damla(ctx, t, { x: 1780, y: 900, s: 0.9, flip: true, expr: 'curious', look: [-0.8, lensT ? -0.4 : -0.2], prop: lensT ? 'lens' : null, arms: lensT ? [[-1, 2.1], [1, 0.5]] : [[-1, 0.5], [1, 0.5]] });
    }
  });
})();
