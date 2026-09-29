// SAHNE 8 — Kaydet, Sıra sende (yük durumu tablosu), Sıradaki: Besin Zinciri, bitiş kartı
(function () {
  const { PAL, line, stroke, wash, circlePts } = INK;
  const F = F721;
  const ITEMS = [
    'Proton (+) çekirdekte kalır; yer değiştiren elektrondur (−).',
    'Nötr: + ve − eşit · Negatif: elektron aldı · Pozitif: elektron verdi',
    'Aynı cins yükler iter, zıt cins yükler çeker.',
    'Yüklü cisim nötr cismi de çeker; itme aynı cinsi kanıtlar.',
    ['Yıldırımlı havada güvenli bir binaya gir.', F.RED]
  ];
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      F.notebookPage(ctx, t, E.s('record'), 'Gözlem Defteri · Elektrik Yükleri', ITEMS, { col: F.AMB });
      F.damla(ctx, t, { x: 1660, y: 900, s: 0.95, flip: true, expr: 'neutral', look: [-0.7, 0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
  E.scene({
    name: 'Sıra sende', concept: 'Sınıflandırma görevi; sıradaki film', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sk = E.s('task'), sn = E.s('next'), se = E.s('end');
      F.bg(ctx);
      const hill = P.hillLine(E.W, 860);
      const gr = hill.concat([[E.W + 200, E.H + 200], [-200, E.H + 200]]); P.fillPts(ctx, gr, PAL.paper, 1); wash(ctx, gr, PAL.life, 0.25, 801, { bleed: 3, blooms: 2 }); stroke(ctx, hill, { w: 4, seed: 802 });
      // sıradaki: Güneş → ot → çekirge (besin zinciri ipucu)
      const nk = E.se(t, sn, sn + 1.0);
      if (nk > 0) E.layer(ctx, nk, c => {
        P.sun(c, 1650, 250, 70, t, { nrays: 16, cells: false });
        for (let i = 0; i < 9; i++) { const x = 1180 + i * 22, y = P.hillY(hill, x) + 4; line(c, [x, y], [x + Math.sin(t + i) * 4 + (i % 2 ? 8 : -8), y - 60 - (i % 3) * 14], { w: 3, color: PAL.life, seed: 810 + i }); }
        P.arrow(c, [1590, 320], [1300, 700], E.se(t, sn + 1.2, sn + 2.2), { w: 3, color: F.AMB, bend: 20, head: 14 });
        F.fit(c, '?', 1480, 740, 80, 80, { color: F.AMB });
      });
      const wave = t > sn;
      F.damla(ctx, t, { x: 560, y: P.hillY(hill, 560) + 6, s: 1.3, expr: 'happy', view: wave ? 'front' : 'q3', look: wave ? [0.6, -0.5] : [0.7, -0.3], arms: wave ? F.wave(t) : [[-1, 1.1], [1, 1.4]], prop: wave ? null : 'notebook' });
      const ck = Math.min(E.se(t, sk, sk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
      F.taskCard(ctx, t, sk, ck, ['Evdeki güvenli cisimleri seç: balon, tarak, kumaş...', 'İkişer ikişer sürt, yüklerini tahmin et.', 'Kâğıt parçası ve asılı balonla dene.', 'Pozitif · negatif · nötr tablosu yap.'], {
        col: F.AMB, maxW: 760, extra: c => {
          const k = E.se(t, sk + 1.5, sk + 2.3);
          c.save(); c.globalAlpha *= k; c.translate(1400, 560); c.rotate(0.04);
          F.table(c, -170, -190, [['+', 110], ['−', 110], ['nötr', 120]], [['', '', ''], ['', '', ''], ['', '', '']], 90, 1, [1, 1, 1], { size: 40, headCol: [F.POS, F.NEG, PAL.ink] });
          c.restore();
        }
      });
      if (wave) {
        E.inkText(ctx, 'Sıradaki gözlem:', 1250, 230, t, sn + 0.5, se + 0.4, { size: 46, align: 'center', weight: 400 });
        E.inkText(ctx, '22 · Besin Zinciri', 1250, 320, t, sn + 1.0, se + 0.4, { size: 70, align: 'center', color: F.GREEN });
      }
      F.endCard(ctx, t, '21 · Elektrik Yükleri', 'FB.7.6.3', F.AMB);
    }
  });
})();
