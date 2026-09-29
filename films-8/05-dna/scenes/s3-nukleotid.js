// SAHNE 3 — FB.8.3.2 a: nükleotid = fosfat + şeker + organik baz; dört baz: A, T, G, C (pürin/pirimidin ayrımı yok)
(function () {
  const { PAL } = INK; const K = KIT, F = G8;
  const B4 = ['A', 'T', 'G', 'C'];
  const POS = [[420, 290], [420, 440], [420, 590], [420, 740]];
  E.scene({
    name: 'Nükleotid', concept: 'Fosfat, şeker, organik baz', from: 'nparts', to: 'bases', trFrom: [1560, 430],
    draw(ctx, t) {
      const sp = E.s('nparts'), sb = E.s('bases');
      ctx.fillStyle = 'rgba(111,138,58,0.07)'; ctx.fillRect(0, 0, E.W, E.H);
      // büyük nükleotid
      const bigA = Math.min(E.se(t, sp + 0.2, sp + 1.0), 1 - E.se(t, sb - 0.1, sb + 0.6));
      if (bigA > 0) E.layer(ctx, bigA, c => {
        const x = 640, y = 540, s = 2.2;
        const a = F.nucleotide(c, x, y, s, 'A', { seed: 1 });
        F.tag(c, 'fosfat', [a.phos[0] - 60, a.phos[1] - 150], [a.phos[0] - 20, a.phos[1] - 50], E.se(t, sp + 2.2, sp + 3.0), { size: 50 });
        F.tag(c, 'şeker', [x - 60, y + 190], [x - 10, y + 60], E.se(t, sp + 3.2, sp + 4.0), { size: 50, dy: 44 });
        F.tag(c, 'organik baz', [x + 420, y - 170], [x + 330, y - 40], E.se(t, sp + 4.2, sp + 5.0), { size: 50 });
        const fk = E.se(t, sp + 5.2, sp + 6.0);
        if (fk > 0) { c.save(); c.globalAlpha *= fk; K.text(c, 'fosfat + şeker + organik baz = nükleotid', 960, 850, { size: 46, align: 'center', color: K.LIFE_D }); c.restore(); }
      });
      // dört nükleotid
      const fourA = E.se(t, sb + 0.3, sb + 1.0);
      if (fourA > 0) E.layer(ctx, fourA, c => {
        B4.forEach((b, i) => {
          const k = E.se(t, sb + 0.6 + i * 1.1, sb + 1.3 + i * 1.1, 'out'); if (k <= 0) return;
          c.save(); c.globalAlpha *= k; const [x, y] = POS[i];
          F.nucleotide(c, x, y, 1.1, b, { seed: 10 + i });
          K.text(c, F.BN[b] + ' (' + b + ')', x + 330, y + 14, { size: 46, color: b === 'A' ? '#8A4A10' : b === 'G' ? K.LIFE_D : b === 'T' ? PAL.water : '#6A4A6A' });
          c.restore();
        });
        const nk = E.se(t, sb + 6, sb + 7);
        if (nk > 0) { c.save(); c.globalAlpha *= nk; K.text(c, '4 çeşit baz → 4 çeşit nükleotid', 1080, 540, { size: 44, color: K.LIFE_D }); c.restore(); }
      });
      K.damla(ctx, t, { x: 1640, y: 880, s: 1.25, flip: true, expr: 'curious', look: [-0.7, -0.1], talk: E.talk(t), prop: t < sb ? 'lens' : null, arms: [[-1, 0.4], [1, t < sb ? 1.3 : 2.2]] });
    }
  });
})();
