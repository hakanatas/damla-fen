// SAHNE 6 — Kaydet · Sıra sende · Sıradaki: elektriğin tasarruflu kullanımı · bitiş
(function () {
  const { PAL, stroke, line } = INK;
  const W = W6;
  E.scene({
    name: 'Kaydet', concept: 'Gözlem defterine kayıt', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record');
      W.record(ctx, t, sr, 'Gözlem Defteri · Santraller', [
        'Çoğu santral: kaynak → türbin → jeneratör → elektrik',
        'HES: potansiyel → kinetik → elektrik enerjisi',
        'Güneş paneli: ışık → elektrik (türbin yok)',
        'Yenilenebilir: güneş, rüzgâr, hidroelektrik, dalga, jeotermal',
        'Yenilenemeyen: termik, nükleer',
        'Her santralin avantajı ve dezavantajı var.'
      ], { step: 1.05, size: 40, colors: [null, null, null, W.MOVE, '#5A5550', null] });
      W.damla(ctx, t, { x: 1640, y: 880, s: 0.9, flip: true, expr: 'happy', look: [-0.7, 0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook', seed: 9 });
    }
  });
  E.scene({
    name: 'Görev ve sıradaki', concept: 'Tartışma görevi; sıradaki film', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sk = E.s('task'), sn = E.s('next'), se = E.s('end');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,70,110,0.24)'); g.addColorStop(0.7, 'rgba(227,150,70,0.16)'); g.addColorStop(1, 'rgba(227,150,70,0.06)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      const hill = P.hillLine(E.W, 930);
      P.landscape(ctx, E.W, E.H, t, { hill, tree: false });
      W.wind(ctx, 1500, P.hillY(hill, 1500) + 6, 300, t, 1); W.wind(ctx, 1700, P.hillY(hill, 1700) + 6, 240, t + 0.5, 1);
      W.house(ctx, 180, P.hillY(hill, 300) + 10, 240, 170, { lights: [1, E.se(t, sn + 2, sn + 2.6) > 0.5 ? 0 : 1, 1, E.se(t, sn + 3, sn + 3.6) > 0.5 ? 0 : 1] });
      W.damla(ctx, t, { x: 820, y: P.hillY(hill, 820) + 4, s: 0.85, expr: 'happy', look: [-0.6, -0.3], flip: true, arms: [[-1, 0.35], [1, 2.3]], seed: 10 });
      W.task(ctx, t, sk, sn, 'Sıra sende!', [
        'Bir santral seç; nasıl çalıştığını araştır.',
        'Avantaj ve dezavantajlarını tabloya yaz.',
        'Görüşünü gerekçesiyle sınıfta paylaş.',
        'Arkadaşlarını dinle, görüşleri kıyasla; nazik ol.'
      ], { x: 330, y: 170, w: 1260, h: 460, size: 42 });
      W.next(ctx, t, sn + 0.2, se, 'Elektriği Bilinçli Kullanalım', c => {
        W.card(c, 1160, 410, 560, 360, { seed: 6600, tint: PAL.light, tintA: 0.12 });
        W.bulb(c, 1320, 560, 1.8, 0.5 + 0.5 * Math.abs(Math.sin(t * 1.5)));
        W.energyLabel(c, 1470, 440, 0.62, E.se(t, sn + 1.2, sn + 2.4), 0);
      });
      W.end(ctx, t, '22 · Elektrik Nerede Üretilir? Santraller', 'FB.8.6.8 · FB.8.6.9');
    }
  });
})();
