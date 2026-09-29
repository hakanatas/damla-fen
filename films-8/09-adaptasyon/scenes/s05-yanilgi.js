// SAHNE 5 — Kavram yanılgısı: "ihtiyaç duyduğu için geliştirdi" (Lamarkçı açıklama) düzeltilir
(function () {
  const { PAL, stroke } = INK;
  const F = F809;
  E.scene({
    name: 'Yanlış açıklama', concept: 'Kavram yanılgısı', from: 'wrong', to: 'why', trFrom: [960, 540],
    draw(ctx, t) {
      const sw = E.s('wrong'), sy = E.s('why');
      F.snowBg(ctx, t);
      F.fox(ctx, 1450, 800, 1.2, 'arctic', { t, flip: true });
      F.card(ctx, 250, 200, 1000, 260, 6100);
      F.wfit(ctx, '“Tilki soğukta üşüdüğü için', 750, 300, E.seg(t, sw + 0.3, sw + 1.5), 54, 900, { align: 'center' });
      F.wfit(ctx, 'kalın kürk geliştirdi.”', 750, 380, E.seg(t, sw + 1.3, sw + 2.5), 54, 900, { align: 'center' });
      F.stamp(ctx, 1150, 430, 'YANLIŞ', E.se(t, sw + 3.0, sw + 3.6, 'out'), { color: F.RED, size: 50, rot: -0.14 });
      const yk = E.se(t, sy + 0.2, sy + 0.9, 'out');
      if (yk > 0) E.layer(ctx, yk, c => {
        F.card(c, 250, 520, 1000, 250, 6101, { tint: PAL.water, tintA: 0.08 });
        F.wfit(c, 'İhtiyaç duymak, yeni bir kalıtsal', 750, 610, E.seg(t, sy + 0.5, sy + 1.7), 50, 900, { align: 'center' });
        F.wfit(c, 'özellik kazandırmaz.', 750, 680, E.seg(t, sy + 1.5, sy + 2.5), 50, 900, { align: 'center' });
        F.wfit(c, 'Peki ne olur?', 750, 745, E.seg(t, sy + 4.0, sy + 4.8), 40, 900, { align: 'center', color: F.AMB });
      });
      F.damla(ctx, t, { x: 1750, y: 900, s: 0.9, flip: true, expr: t > sy ? 'thinking' : 'determined', look: [-0.8, -0.2], arms: [[-1, 2.0], [1, 0.4]] });
    }
  });
})();
