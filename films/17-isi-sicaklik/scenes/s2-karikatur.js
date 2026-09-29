// SAHNE 2 — Kavram karikatürü (TYMM: kavram karikatürleriyle tartışma, E2.5, OB4). Üç görüş; karar kanıttan sonra.
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F17;
  const KIDS = [
    { x: 400, name: 'Ali', shirt: '#6F8A3A', hair: 0, l1: 'Çayın sıcaklığı yüksek,', l2: 'o hâlde ısısı da hep fazla.' },
    { x: 960, name: 'Ece', shirt: '#8A6A45', hair: 1, l1: 'Isı ile sıcaklık', l2: 'aynı şeydir.' },
    { x: 1520, name: 'Can', shirt: '#5E7F96', hair: 2, l1: 'Sıcaklık ölçülür; ısı ise', l2: 'sıcaktan soğuğa geçen enerji.' }
  ];
  F.KIDS = KIDS;
  F.cartoon = (ctx, t, t0, o = {}) => { // karikatür paneli; o.marks: [0..1] doğru/yanlış işaretleri
    const panel = [[110, 150], [1810, 144], [1814, 900], [106, 906], [110, 150]];
    P.fillPts(ctx, panel, '#FBF8F1', 0.9); stroke(ctx, panel, { w: 5, closed: true, seed: 300 });
    // ortada masa ve çay
    stroke(ctx, [[1170, 842], [1350, 838]], { w: 3, seed: 301 }); line(ctx, [1190, 842], [1195, 900], { w: 3 }); line(ctx, [1330, 840], [1325, 900], { w: 3 });
    KIDS.forEach((k, i) => {
      F.kid(ctx, k.x + (i === 1 ? 0 : 0), 860, 1.15, { shirt: k.shirt, hair: k.hair, flip: i === 2, arm: i === 1 ? 0.4 : 1, seed: i, mouth: 'o' });
      INK.label(ctx, k.name, k.x, 895, { size: 34, weight: 700, align: 'center' });
      const bk = E.se(t, t0 + 0.5 + i * 2.6, t0 + 1.1 + i * 2.6, 'out');
      F.speech(ctx, k.x, 330, 500, 170, [k.x + (i === 2 ? -30 : 30), 520], bk, { seed: 310 + i });
      if (bk > 0.6) { P.write(ctx, k.l1, k.x, 318, E.seg(t, t0 + 0.9 + i * 2.6, t0 + 2.0 + i * 2.6), { size: 36, align: 'center' }); P.write(ctx, k.l2, k.x, 368, E.seg(t, t0 + 1.6 + i * 2.6, t0 + 2.7 + i * 2.6), { size: 36, align: 'center' }); }
      if (o.marks) { const mk = o.marks[i]; if (mk > 0) { if (i === 2) P.check(ctx, k.x + 210, 250, 70, mk, { w: 9, color: PAL.life }); else P.cross(ctx, k.x + 220, 260, 30, mk, { w: 8, color: '#A23A2A' }); } }
    });
    F.cup(ctx, 1260, 836, 0.9); F.steam(ctx, 1260, 740, 0.8, t, { color: F.HEAT });
  };
  E.scene({
    name: 'Kavram karikatürü', concept: 'Üç görüş: sence kim haklı?', from: 'cartoon', to: 'decide', trFrom: [960, 500],
    draw(ctx, t) {
      const sc = E.s('cartoon'), sd = E.s('decide');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      F.cartoon(ctx, t, sc);
      const qk = E.se(t, sc + 9.0, sc + 9.8, 'out');
      if (qk > 0) { ctx.save(); ctx.globalAlpha = 1 - E.se(t, sd - 0.3, sd); ctx.translate(960, 490); ctx.scale(P.pop(qk), P.pop(qk)); ctx.rotate(-0.05); F.card(ctx, 0, 0, 440, 100, { seed: 320, fill: '#F6E7B8' }); INK.label(ctx, 'Sence kim haklı?', 0, 16, { size: 52, weight: 700, align: 'center' }); ctx.restore(); }
      const dk = E.se(t, sd, sd + 0.6, 'out');
      if (dk > 0) { ctx.save(); ctx.translate(960, 490); ctx.scale(P.pop(dk), P.pop(dk)); ctx.rotate(0.03); F.card(ctx, 0, 0, 480, 90, { seed: 321, fill: '#E4EEF2', color: PAL.water }); INK.label(ctx, 'Önce kanıt topla!', 0, 16, { size: 50, weight: 700, align: 'center', color: PAL.water }); ctx.restore(); }
    }
  });
})();
