// SAHNE 3 — Gruplandırma: iskelet (kemik, kıkırdak, eklem) ve kaslar  (+ ağaç fonksiyonu, Sahne 7'de tamamlanır)
(function () {
  const { PAL } = INK;
  const NODES = {
    root: ['Destek ve hareket sistemi', 960, 250, null, 44, '#E3A03A'],
    isk: ['İskelet', 560, 400, 'root', 44, PAL.life], kas: ['Kaslar', 1380, 400, 'root', 44, '#C07A6A'],
    kemik: ['kemik', 300, 550, 'isk', 40], kikirdak: ['kıkırdak', 600, 550, 'isk', 40], eklem: ['eklem', 900, 550, 'isk', 40],
    uzun: ['uzun', 300, 670, 'kemik', 34], kisa: ['kısa', 300, 750, 'uzun', 34], yassi: ['yassı', 300, 830, 'kisa', 34],
    kulak: ['kulak kepçesi', 600, 670, 'kikirdak', 32], burun: ['burun ucu', 600, 750, 'kulak', 32],
    oynar: ['oynar', 900, 670, 'eklem', 34], yari: ['yarı oynar', 900, 750, 'oynar', 34], oynamaz: ['oynamaz', 900, 830, 'yari', 34],
    iskk: ['iskelet kası', 1140, 550, 'kas', 38], duz: ['düz kas', 1380, 550, 'kas', 38], kalp: ['kalp kası', 1610, 550, 'kas', 38],
    istek: ['isteğimizle', 1140, 670, 'iskk', 32], disi1: ['isteğimiz dışında', 1380, 670, 'duz', 32], disi2: ['isteğimiz dışında', 1610, 750, 'kalp', 32]
  };
  F11.tree = (ctx, rev) => {
    const F = F11;
    Object.entries(NODES).forEach(([id, [txt, x, y, par, size, tint]]) => {
      const k = rev[id] ?? 0; if (k <= 0 || !par) return;
      const p = NODES[par]; const ph = p[4] * 0.75, ch = size * 0.75;
      if (p[1] === x) F.edge(ctx, [p[1], p[2] + ph], [x, y - ch], k); else F.edge(ctx, [p[1], p[2] + ph], [x, y - ch], k);
    });
    Object.entries(NODES).forEach(([id, [txt, x, y, par, size, tint]]) => {
      const k = rev[id] ?? 0; if (k <= 0) return;
      F.node(ctx, txt, x, y, k, { size, tint, fill: size < 36 ? '#F7F2E6' : '#FBF8F1' });
    });
  };
  E.scene({
    name: 'Gruplandır', concept: 'İskelet ve kaslar', from: 'groups', to: 'skeleton', trFrom: [960, 300],
    draw(ctx, t) {
      const F = F11, sg = E.s('groups'), ss = E.s('skeleton');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 80, 1620, 830);
      const rev = { root: E.se(t, sg + 0.3, sg + 1), isk: E.se(t, sg + 2.6, sg + 3.3), kas: E.se(t, sg + 3.6, sg + 4.3),
        kemik: E.se(t, ss + 1.3, ss + 2), kikirdak: E.se(t, ss + 2.2, ss + 2.9), eklem: E.se(t, ss + 3.1, ss + 3.8) };
      F.tree(ctx, rev);
      DAMLA.draw(ctx, { x: 1840, y: 1045, s: 0.85, view: 'q3', flip: true, expr: 'determined', look: [-0.7, -0.4], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 4, prop: 'notebook', arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]] });
    }
  });
})();
