// SAHNE 4 — Soluk alma ve verme: diyafram ve kaburgalar; şişe-balon modeli (benzetme)
(function () {
  const { PAL } = INK; const K = KIT, F = F10;
  const IN = ['diyafram kasılır, aşağı iner', 'kaburgalar yukarı ve dışa kalkar', 'göğüs boşluğu genişler', 'hava akciğerlere dolar'];
  const OUT = ['diyafram gevşer, kubbe gibi yükselir', 'kaburgalar aşağı ve içe iner', 'göğüs boşluğu daralır', 'hava dışarı çıkar'];
  const MAP = [['şişe', 'göğüs boşluğu'], ['balonlar', 'akciğerler'], ['lastik zar', 'diyafram'], ['boru', 'soluk borusu, bronşlar']];
  E.scene({
    name: 'Mekanizma', concept: 'Diyafram ve kaburgalarla soluk alma-verme; şişe-balon modeli', from: 'inhale', to: 'jar', trFrom: [620, 540],
    draw(ctx, t) {
      const si = E.s('inhale'), sx = E.s('exhale'), sj = E.s('jar');
      const u = t < sx ? E.se(t, si + 1.0, si + 4.0) : E.lerp(1, 0, E.se(t, sx + 1.0, sx + 4.0));
      const ck = 1 - E.se(t, sj - 0.2, sj + 0.6);
      if (ck > 0) E.layer(ctx, ck, c => {
        const A = F.chest(c, 600, 500, 0.8, u);
        const inh = t < sx, ak = inh ? E.se(t, si + 1, si + 1.6) * (1 - E.se(t, sx - 0.4, sx)) : E.se(t, sx + 1, sx + 1.6);
        c.save(); c.globalAlpha *= ak;
        if (inh) { P.arrow(c, [A.top[0] + 70, A.top[1] - 110], [A.top[0] + 6, A.top[1] - 10], 1, { w: 4, color: PAL.water });
          [A.dia, A.diaL].forEach(p => P.arrow(c, [p[0], p[1] + 8], [p[0], p[1] + 58], 1, { w: 4, color: F.MUS, head: 12 }));
          P.arrow(c, A.ribR, [A.ribR[0] + 60, A.ribR[1] - 30], 1, { w: 4, color: '#8A6A45', head: 12 }); P.arrow(c, A.ribL, [A.ribL[0] - 60, A.ribL[1] - 30], 1, { w: 4, color: '#8A6A45', head: 12 }); }
        else { P.arrow(c, [A.top[0] + 6, A.top[1] - 10], [A.top[0] + 70, A.top[1] - 110], 1, { w: 4, color: PAL.water });
          [A.dia, A.diaL].forEach(p => P.arrow(c, [p[0], p[1] + 58], [p[0], p[1] + 8], 1, { w: 4, color: F.MUS, head: 12 }));
          P.arrow(c, A.ribR, [A.ribR[0] - 40, A.ribR[1] + 30], 1, { w: 4, color: '#8A6A45', head: 12 }); P.arrow(c, A.ribL, [A.ribL[0] + 40, A.ribL[1] + 30], 1, { w: 4, color: '#8A6A45', head: 12 }); }
        c.restore();
        K.text(c, 'diyafram', A.dia[0] + 110, A.dia[1] + 30, { size: 40, color: F.MUS });
        K.text(c, 'kaburgalar', 170, 300, { size: 38, color: '#8A6A45', alpha: 0.9 }); INK.leader(c, [260, 312], [A.ribL[0] + 40, A.ribL[1] - 60], { bend: 0.15 });
        INK.label(c, 'model · ölçekli değildir', 60, 900, { size: 28, alpha: 0.55 });
        const L = inh ? IN : OUT, b0 = inh ? si : sx, hk = inh ? 1 - E.se(t, sx - 0.4, sx) : 1;
        c.save(); c.globalAlpha *= hk;
        P.write(c, inh ? 'Soluk alma' : 'Soluk verme', 1000, 280, E.seg(t, b0 + 0.2, b0 + 1), { size: 62, color: inh ? PAL.water : F.MUS });
        L.forEach((l, i) => { const k = E.seg(t, b0 + 1 + i * 1.5, b0 + 2 + i * 1.5); P.write(c, (i + 1) + '. ' + l, 1000, 380 + i * 76, k, { size: 40 }); });
        c.restore();
      });
      // şişe-balon modeli
      const jk = E.se(t, sj + 0.2, sj + 1.0);
      if (jk > 0) E.layer(ctx, jk, c => {
        const cyc = Math.max(0, t - sj - 6.5), pu = t < sj + 6.5 ? 0 : 0.5 - 0.5 * Math.cos(cyc * 1.6);
        const J = F.jar(c, 560, 540, 1.05, pu);
        K.text(c, pu > 0.5 ? 'zar çekildi: balonlar şişer' : 'zar serbest: balonlar söner', 1060, 780, { size: 40, color: K.AMBER_D, alpha: t > sj + 6.5 ? 0.9 : 0 });
        if (t > sj + 6.5) P.arrow(c, [J.knob[0] + 50, J.knob[1] - 20], [J.knob[0] + 50, J.knob[1] + 40 * Math.sign(Math.sin(cyc * 1.6) + 0.001)], 1, { w: 3, head: 10 });
        K.text(c, 'Benzetme', 1060, 280, { size: 58, color: K.AMBER_D });
        MAP.forEach(([a, b], i) => { const k = E.seg(t, sj + 0.8 + i * 1.3, sj + 1.8 + i * 1.3); P.write(c, a, 1060, 380 + i * 90, k, { size: 44, color: '#1F4A63' }); if (k >= 1) { P.arrow(c, [1300, 368 + i * 90], [1380, 368 + i * 90], 1, { w: 3, head: 10 }); K.text(c, b, 1400, 380 + i * 90, { size: 44, maxW: 470 }); } });
        INK.label(c, 'sınıfta yapılabilecek bir model · ölçekli değildir', 60, 900, { size: 28, alpha: 0.55 });
      });
    }
  });
})();
