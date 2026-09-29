// SAHNE 2 — Veri toplama ve kaydetme: karşılaştırma tablosu; kulak ve renk (FB.8.3.8 b)
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const F = F809;
  const COLS = [['', 300], ['çöl tilkisi', 520], ['kutup tilkisi', 520]];
  const ROWS = [
    ['yaşam alanı', 'sıcak, kurak çöl', 'soğuk, karlı kutup'],
    ['kulak', 'büyük', 'küçük'],
    ['kürk', 'ince, kum rengi', 'kalın, kışın beyaz'],
    ['ayak tabanı', 'tüylü (sıcak kum)', 'tüylü (buz, kar)']
  ];
  E.scene({
    name: 'Veri tablosu', concept: 'Veri toplama; kaydetme', from: 'table', to: 'related', trFrom: [960, 400],
    draw(ctx, t) {
      const st = E.s('table'), se = E.s('ears'), sc = E.s('color'), sr = E.s('related');
      const g = ctx.createLinearGradient(0, 0, E.W, 0); g.addColorStop(0, 'rgba(227,160,58,0.14)'); g.addColorStop(1, 'rgba(46,106,140,0.14)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      const X = 170, Y = 180, RH = 84;
      F.table(ctx, X, Y, COLS, ROWS, RH, E.se(t, st + 0.3, st + 1.3), ROWS.map((_, i) => E.se(t, st + 1.6 + i * 1.3, st + 2.2 + i * 1.3)), {
        size: 40, headCol: [PAL.ink, '#8A5A20', PAL.water],
        cellCol: (i, j) => j === 0 ? PAL.inkSoft : null
      });
      // satır vurgusu
      const hl = (row, k, col) => { if (k <= 0) return; ctx.save(); ctx.globalAlpha *= k; stroke(ctx, F.rr(X - 8, Y + RH * (row + 1) - 4, 1348, RH + 8, 12, 3), { w: 4, color: col, seed: 5800 + row }); ctx.restore(); };
      hl(1, Math.min(E.se(t, se + 0.2, se + 0.8), 1 - E.se(t, sc - 0.2, sc + 0.3)), F.AMB);
      hl(2, Math.min(E.se(t, sc + 0.2, sc + 0.8), 1 - E.se(t, sr - 0.2, sr + 0.3)), F.AMB);
      // alt şerit: açıklamalar
      const Yb = 820;
      const ek = Math.min(E.se(t, se + 0.6, se + 1.3, 'out'), 1 - E.se(t, sc - 0.3, sc + 0.3));
      if (ek > 0) E.layer(ctx, ek, c => {
        // büyük kulaktan dışarı ısı dalgaları
        c.save(); c.translate(430, Yb + 40); c.scale(0.55, 0.55); F.fox(c, 0, 0, 1, 'desert', { t }); c.restore();
        for (let i = 0; i < 3; i++) { const p = []; for (let j = 0; j <= 16; j++) { const u = j / 16; p.push([470 + i * 22 + Math.sin(u * 8 + t * 5 + i) * 5, Yb - 80 - u * 60]); } stroke(c, p, { w: 2.6, color: F.HEAT, dry: false }); }
        F.fit(c, 'ısıyı dışarı atar', 700, Yb - 20, 360, 40, { color: F.HEAT, align: 'left' });
        c.save(); c.translate(1150, Yb + 40); c.scale(0.55, 0.55); F.fox(c, 0, 0, 1, 'arctic', { t }); c.restore();
        F.fit(c, 'ısı kaybı az', 1270, Yb - 20, 300, 40, { color: PAL.water, align: 'left' });
      });
      const ck = Math.min(E.se(t, sc + 0.6, sc + 1.3, 'out'), 1 - E.se(t, sr - 0.3, sr + 0.3));
      if (ck > 0) E.layer(ctx, ck, c => {
        F.fit(c, 'kum rengi → çölde gizlenir', 560, Yb, 640, 44, { color: '#8A5A20' });
        F.fit(c, 'beyaz → karda gizlenir', 1190, Yb, 560, 44, { color: PAL.water });
        F.fit(c, 'KAMUFLAJ', 880, Yb + 64, 400, 46);
      });
      const rk = E.se(t, sr + 0.5, sr + 1.2, 'out');
      if (rk > 0) E.layer(ctx, rk, c => {
        F.fit(c, 'Akraba ama farklı türler · her biri kendi ortamına uygun', 850, Yb + 10, 1300, 44, { color: PAL.life });
      });
      F.damla(ctx, t, { x: 1750, y: 880, s: 0.95, flip: true, expr: 'curious', look: [-0.8, -0.3], prop: 'notebook', arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.1]] });
    }
  });
})();
