// SAHNE 7 — Kaydet + Sıra sende (performans görevi: balık kılçığı diyagramı) + sonraki film (Ünite 3: sindirim)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F7E;
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      F.record(ctx, t, 'Gözlem Defteri · Enerjinin korunumu', [
        'Sarkaç, düşen top, yay, hız treni: enerji dönüşüyor.',
        'Yükseklik azalınca sürat artar; artınca azalır.',
        'Kinetik ve potansiyel enerji birbirine dönüşür.',
        'Sürtünme, enerjinin bir kısmını ısıya dönüştürür.',
        'Enerji yoktan var olmaz, yok olmaz: korunur.'
      ], { size: 42, dy: 100, step: 1.5 });
    }
  });
  function fishbone(c, x, y, k) { // küçük balık kılçığı şeması
    c.save(); c.globalAlpha *= k;
    line(c, [x, y], [x + 300, y], { w: 3.4, seed: 6700 });
    const head = [[x + 300, y - 50], [x + 390, y], [x + 300, y + 50], [x + 300, y - 50]]; P.fillPts(c, head, '#F6E7B8'); stroke(c, head, { w: 2.6, closed: true, seed: 6701 });
    for (let i = 0; i < 3; i++) { const bx = x + 60 + i * 90; line(c, [bx, y], [bx - 50, y - 70], { w: 2.4, seed: 6702 + i }); line(c, [bx, y], [bx - 50, y + 70], { w: 2.4, seed: 6710 + i }); }
    line(c, [x, y], [x - 40, y - 40], { w: 2.4, seed: 6720 }); line(c, [x, y], [x - 40, y + 40], { w: 2.4, seed: 6721 });
    c.restore();
  }
  E.scene({
    name: 'Sıra sende · Sıradaki', concept: 'Performans görevi ve sonraki ünite', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      F.outro(ctx, t, {
        task: ['Bir balık kılçığı diyagramı hazırla.', 'Her kılçığa bir enerji dönüşümü yaz:', 'salıncak, kaykay rampası, zıplayan top...', 'Balığın başına genellemeni yaz.'],
        taskNote: 'Arkadaşlarının diyagramlarını tarafsızca değerlendir.',
        next: 'Vücudumuzdaki Sistemler: Sindirim',
        name: '6 · Enerji Kaybolur mu? Enerjinin Korunumu', code: 'FB.7.2.3',
        nextArt(c, t, sn) {
          const ap = circlePts(1500, 600, 60, 54, 30); P.fillPts(c, ap, '#F2D3B8'); INK.wash(c, ap, '#B5553F', 0.6, 6730, { bleed: 1 }); stroke(c, ap, { w: 2.6, closed: true, seed: 6731 });
          line(c, [1500, 548], [1508, 516], { w: 3, dry: false }); const lf = circlePts(1530, 520, 22, 11, 16, -0.4); INK.wash(c, lf, PAL.life, 0.6, 6732, { bleed: 1 }); stroke(c, lf, { w: 2, closed: true, seed: 6733 });
          const br = [[330, 640], [340, 560], [420, 540], [500, 560], [510, 640], [330, 640]]; P.fillPts(c, br, '#E8C98E'); INK.wash(c, br, '#C07F1E', 0.4, 6734, { bleed: 1 }); stroke(c, br, { w: 2.6, closed: true, seed: 6735 });
        }
      });
      const st = E.s('task'), sn = E.s('next');
      const k = Math.min(E.se(t, st + 3.5, st + 4.3), 1 - E.se(t, sn - 0.3, sn + 0.4));
      if (k > 0) fishbone(ctx, 1020, 290, k);
    }
  });
})();
