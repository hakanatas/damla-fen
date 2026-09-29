// SAHNE 7 — Kaydet, Sıra sende (ses kaynakları + ortam deneyi + stetoskop araştırması), sıradaki: ses özellikleri (kedi/aslan), bitiş kartı
(function () {
  const { PAL, line, stroke, wash, circlePts } = INK; const F = S8;
  const ITEMS = [
    'Ses, titreşim sonucunda oluşur.',
    'Ses dalgalar hâlinde her yöne yayılır; tanecikler yerinde titreşir.',
    'Ses katı, sıvı ve gazda yayılır. Hız (genellikle): katı > sıvı > gaz',
    'Ses boşlukta yayılmaz; maddesel ortam gerekir.',
    ['Kaynağın ortamı değişince duyulan ses de değişir.', PAL.water]
  ];
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      F.notebookPage(ctx, t, E.s('record'), 'Gözlem Defteri · Sesin Oluşumu ve Yayılması', ITEMS, { col: F.AMB, gap: 1.25 });
      F.damla(ctx, t, { x: 1660, y: 900, s: 0.95, flip: true, expr: 'neutral', look: [-0.7, 0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
  E.scene({
    name: 'Sıra sende · Sıradaki', concept: 'Görev; sıradaki: sesin özellikleri', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sk = E.s('task'), sn = E.s('next');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(227,160,58,0.10)'); g.addColorStop(1, 'rgba(111,138,58,0.08)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      const hill = P.hillLine(E.W, 870);
      const gr = hill.concat([[E.W + 200, E.H + 200], [-200, E.H + 200]]); P.fillPts(ctx, gr, PAL.paper, 1); wash(ctx, gr, PAL.life, 0.25, 3950, { bleed: 3, blooms: 2 }); stroke(ctx, hill, { w: 4, seed: 3951 });
      // sıradaki: kedi (ince) ve aslan (kalın)
      const nk = E.se(t, sn, sn + 1.0);
      if (nk > 0) E.layer(ctx, nk, c => {
        F.cat(c, 1000, 520, 0.9); F.lion(c, 1560, 520, 0.9);
        F.graph(c, 860, 660, 280, 120, 9, 30, E.se(t, sn + 1.2, sn + 2.4), { axis: false, seed: 621 });
        F.graph(c, 1420, 660, 280, 120, 3, 30, E.se(t, sn + 1.6, sn + 2.8), { axis: false, seed: 622 });
        F.fit(c, 'ince?', 1000, 830, 200, 40); F.fit(c, 'kalın?', 1560, 830, 200, 40);
      });
      const wave = t > sn;
      F.damla(ctx, t, { x: 470, y: P.hillY(hill, 470) + 6, s: 1.3, expr: 'happy', view: wave ? 'front' : 'q3', look: wave ? [0.6, -0.5] : [0.7, -0.3], arms: wave ? F.wave(t) : [[-1, 1.1], [1, 1.4]], prop: wave ? null : 'notebook' });
      const ck = Math.min(E.se(t, sk, sk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
      F.taskCard(ctx, t, sk, ck, ['Okulunda ve bahçende ses kaynaklarını bul.', 'Her birinde neyin titreştiğini tabloya kaydet.', 'Özdeş bir kaynakla katı, sıvı, gaz deneyini tasarla.', 'Araştır: Doktorlar stetoskopla nasıl dinler?'], { col: F.AMB, maxW: 1150, gap: 1.2 });
      if (wave) {
        E.inkText(ctx, 'Sıradaki gözlem:', 1280, 230, t, sn + 0.5, E.s('end') + 0.4, { size: 48, align: 'center', weight: 400 });
        E.inkText(ctx, 'Sesin Özellikleri: Frekans ve Şiddet', 1280, 315, t, sn + 1.0, E.s('end') + 0.4, { size: 60, align: 'center', color: F.AMB });
      }
      F.endCard(ctx, t, '10 · Sesin Oluşumu ve Yayılması', 'FB.8.4.1 · FB.8.4.2', F.AMB);
    }
  });
})();
