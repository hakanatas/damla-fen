// SAHNE 4 — Tam gölgeyi basit ışık ışınlarıyla çizme (noktasal kaynak, yarı gölgeye girilmez)
// (TYMM: "Saydam olmayan kare veya daire şeklindeki cisimler kullanılarak yarı gölgeye girilmeden oluşan tam gölgeyi basit ışık ışınları kullanarak çizmeleri")
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const F = F15;
  const S = [400, 500], OX = 800, H = 160, SX = 1450;

  E.scene({
    name: 'Işınla çizim', concept: 'Tam gölgenin ışınlarla çizimi', from: 'draw', to: 'extend', trFrom: [400, 500],
    draw(ctx, t) {
      const sd = E.s('draw'), se = E.s('extend');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 110, 1620, 800);
      const top = [OX, S[1] - H / 2], bot = [OX, S[1] + H / 2], sT = F.proj(S, top, SX), sB = F.proj(S, bot, SX);
      // screen
      line(ctx, [SX, 170], [SX, 860], { w: 5, seed: 900, taper: 0.02 });
      INK.label(ctx, 'ekran', SX + 20, 200, { size: 36, weight: 700 });
      // object (square seen from the side)
      const ob = [[OX - 6, top[1]], [OX + 6, top[1]], [OX + 6, bot[1]], [OX - 6, bot[1]], [OX - 6, top[1]]];
      P.fillPts(ctx, ob, '#B98C5A'); stroke(ctx, ob, { w: 2.6, closed: true });
      INK.label(ctx, 'opak cisim', OX, top[1] - 26, { size: 36, weight: 700, align: 'center' });
      // point source
      INK.inkDot(ctx, S[0], S[1], 9, { color: '192,127,30' }); F.glow(ctx, S[0], S[1], 60, 0.8);
      INK.label(ctx, 'noktasal ışık kaynağı', S[0] - 20, S[1] + 95, { size: 36, weight: 700, align: 'center' });
      // step 1: rays from the source to the edges
      const k1 = E.se(t, sd + 1.4, sd + 3.2);
      F.ray(ctx, S, top, k1, { w: 3.6, head: 14, heads: [0.55], seed: 910 });
      F.ray(ctx, S, bot, k1, { w: 3.6, head: 14, heads: [0.55], seed: 911 });
      // step 2: extend them to the screen
      const k2 = E.se(t, se + 0.3, se + 2.0);
      if (k2 > 0) { F.ray(ctx, top, sT, k2, { w: 3.6, head: 14, heads: [0.55], seed: 912 }); F.ray(ctx, bot, sB, k2, { w: 3.6, head: 14, heads: [0.55], seed: 913 }); }
      // step 3: the dark region between them
      const k3 = E.se(t, se + 2.4, se + 3.4);
      if (k3 > 0) {
        P.fillPts(ctx, [[OX + 6, top[1]], sT, sB, [OX + 6, bot[1]]], 'rgba(28,27,34,0.55)', k3);
        line(ctx, sT, sB, { w: 12, color: PAL.ink, alpha: k3, taper: 0, dry: false });
        // other rays: pass above/below and reach the screen
        [-125, -105, 105, 125].forEach((dy, i) => { const e = F.proj(S, [OX, S[1] + dy], SX); F.ray(ctx, [S[0] + 20, S[1] + dy * 20 / (OX - S[0])], e, k3, { w: 2.4, head: 11, heads: [0.7], alpha: 0.6, seed: 920 + i }); });
        const kb = E.se(t, se + 3.6, se + 4.4);
        if (kb > 0) { ctx.save(); ctx.globalAlpha = kb; stroke(ctx, [[SX + 24, sT[1]], [SX + 44, sT[1]], [SX + 44, sB[1]], [SX + 24, sB[1]]], { w: 3, dry: false }); ctx.restore(); P.write(ctx, 'tam gölge', SX + 60, S[1] + 16, kb, { size: 52, color: '#8A4A10' }); }
      }
      // numbered steps
      const steps = [['1) Kaynaktan cismin kenarlarına ışın çiz.', sd + 0.8], ['2) Işınları ekrana kadar uzat.', se + 0.2], ['3) Aradaki karanlık bölge: tam gölge', se + 2.6]];
      steps.forEach(([s, at], i) => P.write(ctx, s, 230, 720 + i * 60, E.seg(t, at, at + 1.4), { size: 38 }));
    }
  });
})();
