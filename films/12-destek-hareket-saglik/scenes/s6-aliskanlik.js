// SAHNE 6 — Günlük hayattaki yanlış uygulamalar → doğru davranışlar
(function () {
  const { PAL, stroke, line } = INK;
  const RED = '#A23A2A';
  const ROWS = [
    ['Çantayı tek omuzda taşımak', 'İki askılı, hafif çanta'],
    ['Saatlerce ekran başında kalmak', 'Mola ver, hareket et'],
    ['Eğri oturmak', 'Sırtı dik oturmak'],
    ['Korumasız paten, bisiklet', 'Kask, dizlik, dirseklik'],
    ['Öğün atlamak', 'Yeterli ve dengeli beslenmek']
  ];
  E.scene({
    name: 'Yanlış → doğru', concept: 'Doğru davranışa yönelme', from: 'habits', to: 'habits', trFrom: [960, 540],
    draw(ctx, t) {
      const F = F12, sh = E.s('habits');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 80, 1620, 830);
      const kh = E.se(t, sh + 0.2, sh + 1);
      P.write(ctx, 'Yanlış', 560, 220, kh, { size: 56, align: 'center', color: RED });
      P.write(ctx, 'Doğru', 1330, 220, kh, { size: 56, align: 'center', color: '#3E5A1A' });
      P.drawOn(ctx, [[250, 250], [1680, 244]], E.se(t, sh + 0.6, sh + 1.4), { w: 3 });
      P.drawOn(ctx, [[945, 180], [945, 860]], E.se(t, sh + 0.8, sh + 1.6), { w: 2, alpha: 0.6 });
      ROWS.forEach(([a, b], i) => {
        const at = sh + 1.6 + i * 2.2, y = 330 + i * 115;
        const k = E.se(t, at, at + 0.8); if (k <= 0) return;
        P.cross(ctx, 290, y - 14, 18, E.se(t, at, at + 0.5), { w: 5, color: RED });
        P.write(ctx, a, 330, y, k, { size: 38 });
        P.arrow(ctx, [900, y - 14], [990, y - 14], E.se(t, at + 0.6, at + 1.1), { w: 2.6, head: 11, color: '#8A4A10' });
        P.check(ctx, 1030, y - 16, 40, E.se(t, at + 1, at + 1.5), { w: 5, color: '#3E5A1A' });
        P.write(ctx, b, 1070, y, E.seg(t, at + 1, at + 2), { size: 42, color: '#3E5A1A' });
      });
      DAMLA.draw(ctx, { x: 1840, y: 1045, s: 0.85, view: 'q3', flip: true, expr: 'happy', look: [-0.7, -0.4], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 4, prop: 'notebook', arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]] });
    }
  });
})();
