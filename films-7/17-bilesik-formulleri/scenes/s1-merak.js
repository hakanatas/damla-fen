// SAHNE 1 — Merak: element sembollerinden bileşik formülüne (FB.7.5.7 ön öğrenme: semboller)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const K = K7;
  // film-ortak küçük yardımcılar (sonraki sahneler de kullanır)
  window.F17 = {
    damla(ctx, t, o) {
      DAMLA.draw(ctx, Object.assign({ view: 'q3', expr: 'neutral', look: [0.3, 0], blink: E.blink(t, o.seed ?? 3), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 0.35]] }, o));
    },
    wall(ctx) { // hafif laboratuvar duvarı: raf çizgisi
      ctx.save(); ctx.globalAlpha = 0.5; stroke(ctx, [[-20, 170], [1940, 160]], { w: 2, dry: false, alpha: 0.25, seed: 3001 }); ctx.restore();
    }
  };
  const CARDS = [['H', 'hidrojen'], ['O', 'oksijen'], ['C', 'karbon'], ['N', 'azot'], ['Na', 'sodyum'], ['Cl', 'klor'], ['S', 'kükürt']];
  E.scene({
    name: 'Merak', concept: 'Semboller → bileşikler nasıl yazılır?', from: 'title', to: 'q',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('q');
      K.bench(ctx, -40, 1960, 880, 3010);
      // element sembol kartları (sağda iki sıra)
      CARDS.forEach((c, i) => {
        const at = 0.8 + i * 0.35 + (i > 3 ? 0.2 : 0), k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const row = i < 4 ? 0 : 1, col = row ? i - 4 : i;
        const x = 1000 + col * 190 + (row ? 95 : 0), y = 420 + row * 230 + (1 - k) * 40;
        const hi = t > sh + 1.2 && t < E.e('hello') ? E.se(t, sh + 1.8 + i * 0.55, sh + 2.2 + i * 0.55) : 0;
        E.layer(ctx, k, c2 => {
          K.card(c2, x, y, 150, 180, { seed: 3020 + i, tint: hi > 0.5 ? PAL.light : null, tintA: 0.25 });
          K.atom(c2, x + 118, y + 34, 18, c[0], { label: false, seed: i });
          INK.label(c2, c[0], x + 75, y + 115, { size: 76, weight: 700, align: 'center' });
          INK.label(c2, c[1], x + 75, y + 162, { size: 30, align: 'center', alpha: 0.7 });
        });
      });
      // soru balonu: H + H + O → ?
      const bk = E.se(t, sq + 0.6, sq + 1.3, 'out');
      if (bk > 0) {
        P.bubble(ctx, 690, 330, 560, 250, [540, 560], bk, 7);
        if (bk > 0.7) {
          const a = E.se(t, sq + 1.2, sq + 2.4);
          ['H', 'H', 'O'].forEach((el, i) => { const x = 520 + i * 95 + (i === 2 ? 0 : 0); const mk = E.se(t, sq + 2.6, sq + 3.6); K.atom(ctx, E.lerp(x, [522, 606, 564][i], mk), 320 + [22, 22, -22][i] * mk, 34, el, { seed: 40 + i }); if (i < 2 && a > 0) INK.label(ctx, '+', 567 + i * 95, 334, { size: 44, weight: 700, alpha: a * (1 - E.se(t, sq + 2.6, sq + 3.0)), align: 'center' }); });
          const qk = E.se(t, sq + 3.6, sq + 4.3);
          if (qk > 0) { INK.label(ctx, '→', 760, 336, { size: 56, weight: 700, alpha: qk, align: 'center' }); INK.label(ctx, '?', 860, 350, { size: 120, weight: 700, alpha: qk, align: 'center', color: '#8A4A10' }); }
        }
      }
      // Damla
      const wave = t > sh && t < sh + 2.2;
      F17.damla(ctx, t, {
        x: 470, y: 870, s: 1.45, view: 'q3', look: t > sq ? [0.3, -0.5] : [0.8, -0.1], expr: t > sq + 0.4 ? 'thinking' : (t > sh ? 'happy' : 'neutral'),
        arms: wave ? [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 8)]] : (t > sq ? [[-1, 0.35], [1, [30, -86]]] : [[-1, 0.35], [1, 1.3]])
      });
      K.title(ctx, t, '17 · Bileşiklerin Dili: Formüller', 5);
    }
  });
})();
