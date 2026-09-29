// SAHNE 4–5 — Gözleme dayalı çizim: temel kısımlar (hücre zarı, sitoplazma, çekirdek korunur) ve organeller.
// TYMM: organellerin ayrıntılı yapısı verilmez; yalnızca adları ve görevleri (analoji ile).
(function () {
  const { PAL, line, stroke } = INK;
  const PC = [560, 505, 540, 370], AC = [1330, 505, 470, 370];
  function info(t) {
    const B = id => E.s(id);
    const show = {
      membrane: E.se(t, B('draw') + 0.4, B('draw') + 1.6), cyto: E.se(t, B('draw') + 1.4, B('draw') + 2.4), nucleus: E.se(t, B('draw') + 2.4, B('draw') + 3.4),
      mito: E.se(t, B('organel') + 1.5, B('organel') + 2.5), chloro: E.se(t, B('organel') + 2.3, B('organel') + 3.3), vacuole: E.se(t, B('organel') + 3.1, B('organel') + 4.1),
      wall: E.se(t, B('wall') + 0.4, B('wall') + 1.6)
    };
    const L = [
      { id: 'membrane', name: 'hücre zarı', an: 'giriş-çıkışı denetler · kapı gibi', both: true },
      { id: 'cyto', name: 'sitoplazma', an: 'akışkan kısım · organeller içinde', both: true },
      { id: 'nucleus', name: 'çekirdek', an: 'yönetim merkezi', both: true },
      { id: 'mito', name: 'mitokondri', an: 'enerji üretir · enerji santrali', both: true },
      { id: 'chloro', name: 'kloroplast', an: 'ışıkla besin üretir · besin fabrikası', both: false, noA: 'yok' },
      { id: 'vacuole', name: 'koful', an: 'su ve maddeleri depolar · depo', both: true, pN: 'büyük, az', aN: 'küçük, çok' },
      { id: 'wall', name: 'hücre duvarı', an: 'korur, şekil verir · zarın dışında', both: false, noA: 'yok' }
    ];
    return { show, L };
  }
  function page(ctx, t) {
    const F = F09; const { show, L } = info(t);
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 80, 1620, 830);
    const sd = E.s('draw');
    P.write(ctx, 'Bitki hücresi', PC[0], 250, E.seg(t, sd + 0.2, sd + 1.2), { size: 52, align: 'center', color: '#3E5A1A' });
    P.write(ctx, 'Hayvan hücresi', AC[0], 250, E.seg(t, sd + 0.8, sd + 1.8), { size: 52, align: 'center', color: '#6B3D2A' });
    INK.label(ctx, '(model çizim · ölçekli değildir)', 1745, 890, { size: 26, align: 'right', alpha: 0.55 * E.se(t, sd + 2, sd + 3) });
    // active highlight
    let hi = null, dim = 0;
    L.forEach(l => { const b = E.B(l.id); if (t >= b.s && t < b.e) { hi = l.id; dim = Math.min(E.se(t, b.s + 0.2, b.s + 1), 1 - E.se(t, b.e - 0.5, b.e)); } });
    const o = { show, hi, dim };
    const aP = F.plantCell(ctx, ...PC, o), aA = F.animalCell(ctx, ...AC, o);
    // draw beat: "3 temel kısım" + numbered badges
    const kd = Math.min(E.se(t, sd + 3.6, sd + 4.4), 1 - E.se(t, E.e('draw') - 0.4, E.e('draw')));
    if (kd > 0) {
      P.write(ctx, 'üç temel kısım', 945, 800, kd, { size: 50, align: 'center' });
      INK.label(ctx, 'hücre zarı · sitoplazma · çekirdek', 945, 855, { size: 36, align: 'center', alpha: kd * 0.85 });
    }
    // part labels
    L.forEach((l, i) => {
      const b = E.B(l.id); if (t < b.s || t > b.e) return;
      const k = Math.min(E.se(t, b.s + 0.5, b.s + 1.3), 1 - E.se(t, b.e - 0.4, b.e));
      if (k <= 0) return;
      ctx.save(); ctx.font = '700 50px Kalam'; const w = ctx.measureText(l.name).width; ctx.restore();
      P.write(ctx, l.name, 945, 800, k, { size: 50, align: 'center', color: '#1C1B22' });
      P.write(ctx, l.an, 945, 855, E.se(t, b.s + 1.4, b.s + 2.4) * k, { size: 34, weight: 400, align: 'center', color: '#8A4A10' });
      ctx.save(); ctx.globalAlpha = E.clamp(k * 1.5);
      INK.leader(ctx, [945 - w / 2 - 12, 780], aP[l.id], { w: 2, bend: -0.2, seed: 50 + i });
      if (l.both) INK.leader(ctx, [945 + w / 2 + 12, 780], aA[l.id], { w: 2, bend: 0.2, seed: 60 + i });
      ctx.restore();
      const kn = E.se(t, b.s + 2, b.s + 3) * k;
      if (l.noA) P.write(ctx, l.noA, AC[0], 740, kn, { size: 46, align: 'center', color: '#6B3D2A' });
      if (l.pN) { P.write(ctx, l.pN, PC[0], 735, kn, { size: 40, align: 'center', color: '#1F4A63' }); P.write(ctx, l.aN, AC[0], 740, kn, { size: 40, align: 'center', color: '#1F4A63' }); }
    });
    // organel beat: bracket word
    const so = E.s('organel');
    const ko = Math.min(E.se(t, so + 1.2, so + 2), 1 - E.se(t, E.e('organel') - 0.4, E.e('organel')));
    if (ko > 0) { P.write(ctx, 'organeller', 945, 800, ko, { size: 50, align: 'center' }); INK.label(ctx, 'yalnızca adları ve görevleri', 945, 855, { size: 34, align: 'center', alpha: ko * 0.8 }); }
    // Damla drawing on the right edge
    DAMLA.draw(ctx, { x: 1830, y: 1045, s: 0.85, view: 'q3', flip: true, expr: 'neutral', look: [-0.7, -0.3], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 4, prop: 'notebook', arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]] });
  }
  E.scene({ name: 'Temel kısımlar', concept: 'Hücre zarı, sitoplazma, çekirdek', from: 'draw', to: 'nucleus', trFrom: [960, 540], draw: page });
  E.scene({ name: 'Organeller', concept: 'Organellerin adları ve görevleri', from: 'organel', to: 'wall', tr: 0.01, draw: page });
})();
