// SAHNE 7 — Kanıtları kaydetme, kalın yay notu, paylaşma (TYMM: tasarımı karşılaştırma, geri bildirim, paylaşım)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const BR = '#8A4A10', RED = '#A23A2A';
  E.scene({
    name: 'Kanıt ve paylaşım', concept: 'Sonuçları kaydetme ve paylaşma', from: 'table', to: 'share', trFrom: [960, 540],
    draw(ctx, t) {
      const sT = E.s('table'), sk = E.s('thick'), ss = E.s('share');
      const aS = E.se(t, ss - 0.3, ss + 0.6);
      if (aS < 1) E.layer(ctx, 1 - aS, c => {
        c.fillStyle = 'rgba(138,106,69,0.16)'; c.fillRect(0, 0, E.W, E.H);
        P.notebook(c, 150, 90, 1620, 820);
        P.write(c, 'Model 1 ve Model 2 karşılaştırması', 290, 195, E.seg(t, sT + 0.3, sT + 1.6), { size: 52 });
        const rows = [['Ölçüm', 'Gerçek', 'Model 1', 'Model 2'], ['A cismi', '2 N', '2 N', '2 N'], ['B cismi', '4 N', '4 N', '4 N'], ['boş bardak', '0 N', '0,5 N', '0 N'], ['A tekrar', '2 N', '2,5 N', '2 N']];
        F06.table(c, 300, 240, [300, 220, 220, 220], rows, 78, i => E.seg(t, sT + 0.8 + i * 0.7, sT + 1.6 + i * 0.7), { size: 40, colColor: [null, null, null, PAL.life] });
        const wk = E.se(t, sT + 4.6, sT + 5.2);
        if (wk > 0) [3, 4].forEach(i => stroke(c, INK.wobble(circlePts(300 + 300 + 220 + 100, 240 + i * 78 + 40, 95, 34, 30), 2, 3700 + i), { w: 3, closed: true, color: RED, alpha: wk }));
        E.inkText(c, 'hata → gelişme fırsatı', 780, 740, t, sT + 5.6, 1e9, { size: 46, align: 'center', color: BR });
        // thick-spring note
        const tk = E.se(t, sk + 0.3, sk + 1.0, 'out');
        if (tk > 0) {
          c.save(); c.globalAlpha = tk;
          F06.card(c, 1320, 240, 1720, 660, { seed: 3710 });
          F06.spring(c, 1430, 300, 500, { coils: 10, r: 18, w: 2.2 }); F06.spring(c, 1610, 300, 440, { coils: 7, r: 20, w: 6 });
          F06.txt(c, 'ince', 1430, 560, { size: 34, align: 'center' }); F06.txt(c, 'kalın', 1610, 560, { size: 34, align: 'center' });
          F06.txt(c, 'büyük kuvvet → kalın yay', 1520, 630, { size: 32, align: 'center', color: BR });
          c.restore();
        }
        DAMLA.draw(c, { x: 1690, y: 1050, s: 1.05, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.3], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 2, arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
      });
      if (aS > 0) E.layer(ctx, aS, c => {
        c.save(); c.globalAlpha = 0.14; c.fillStyle = PAL.life; c.fillRect(0, 0, E.W, E.H); c.restore();
        // class board
        const bd = [[260, 130], [1660, 126], [1664, 760], [264, 764], [260, 130]];
        P.fillPts(c, bd, '#C9A87A'); INK.wash(c, bd, '#8A6A45', 0.35, 3720, { bleed: 2 }); stroke(c, bd, { w: 5, closed: true, seed: 3721 });
        F06.txt(c, 'Sınıf sergisi', 960, 200, { size: 54, align: 'center' });
        c.save(); c.translate(560, 470); c.scale(0.72, 0.72); c.translate(-560, -470); F06.card(c, 360, 190, 760, 800, { seed: 3722 }); F06.model(c, 540, 230, { type: 'spring', F: 1, marks: 6, content: F06.block('A', 44) }); c.restore();
        const N = [['Ölçeği renklendirebilirsin.', 1000, 320, 0.8], ['Kanca sağlam olsun.', 1260, 470, 2.2], ['Sıfıra dönmesi harika!', 980, 620, 3.6]];
        N.forEach(([s, x, y, at], i) => {
          const k = E.se(t, ss + at, ss + at + 0.5, 'out'); if (k <= 0) return;
          c.save(); c.translate(x, y); c.rotate([-0.04, 0.03, -0.02][i]); c.scale(P.pop(k), P.pop(k));
          c.font = '700 36px Kalam'; const w = c.measureText(s).width + 50;
          const n = [[-20, -50], [w, -50], [w, 40], [-20, 40], [-20, -50]]; P.fillPts(c, n, ['#F6E7B8', '#D8E6C0', '#F3D6C8'][i]); stroke(c, n, { w: 2, closed: true, dry: false });
          c.fillStyle = PAL.ink; c.fillText(s, 5, 6); c.restore();
        });
        DAMLA.draw(c, { x: 1640, y: 900, s: 1.2, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.3], blink: E.blink(t, 7), squash: E.breath(t), t, seed: 2, arms: [[-1, 0.4], [1, 2.2 + 0.06 * Math.sin(t * 2)]] });
      });
      F06.badge(ctx, t, t < ss ? 5 : 6, 1);
    }
  });
})();
