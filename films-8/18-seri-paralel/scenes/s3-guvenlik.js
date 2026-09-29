// SAHNE 3 — Elektrik güvenliği · SAHNE 4 — Deney tasarımı (değişkenler)
(function () {
  const { PAL, stroke, line } = INK;
  const U = U6;
  E.scene({
    name: 'Güvenlik', concept: 'Elektrik güvenliği', from: 'safety', to: 'safety', trFrom: [1300, 500],
    draw(ctx, t) {
      const s0 = E.s('safety');
      CK.safetyCard(ctx, t, s0 + 0.5, 700, 130, { w: 1000, h: 770, gap: 165, items: [U.SAFE.outlet, U.SAFE.short, U.SAFE.hot, U.SAFE.adult].map((it, i) => Object.assign({ at: i * 1.8 }, it)) });
      U.damla(ctx, t, { x: 360, y: 900, s: 1.35, view: 'q3', expr: 'determined', look: [0.8, -0.2], arms: [[-1, 0.35], [1, [60, -170]]] });
    }
  });
  const VARS = [
    ['Bağımsız değişken', 'bağlanma şekli (seri / paralel) ve ampul sayısı', PAL.water],
    ['Bağımlı değişken', 'ampullerin parlaklığı', PAL.light],
    ['Kontrol değişkenleri', 'aynı piller, aynı kablolar, özdeş ampuller', PAL.life]
  ];
  E.scene({
    name: 'Deney tasarımı', concept: 'Değişkenleri belirleme', from: 'design', to: 'vars', trFrom: [960, 540],
    draw(ctx, t) {
      const sd = E.s('design'), sv = E.s('vars');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 170, 1400, 720);
      P.write(ctx, 'Deney planım', 290, 260, E.seg(t, sd + 0.2, sd + 1.2), { size: 62, color: U.AMBER });
      VARS.forEach(([h, d, col], i) => {
        const at = i === 0 ? sd + 1.4 : sv + 0.2 + (i - 1) * 2.6, y = 380 + i * 165;
        const k = E.se(t, at, at + 0.6); if (k <= 0) return;
        ctx.save(); ctx.globalAlpha = k; INK.hatch(ctx, 262, y - 60, 12, 110, { n: 1, ang: 1.57, w: 8, alpha: 0.85, color: col, seed: 20 + i }); ctx.restore();
        P.write(ctx, h + ':', 300, y - 10, E.seg(t, at, at + 1), { size: 46 });
        P.write(ctx, d, 330, y + 50, E.seg(t, at + 0.7, at + 2), { size: 40, weight: 400 });
      });
      U.damla(ctx, t, { x: 1720, y: 920, s: 1.1, view: 'q3', flip: true, expr: 'thinking', look: [-0.8, -0.2], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
})();
