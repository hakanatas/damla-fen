// SAHNE 2 — Mühendislik ve tasarım döngüsü (TYMM: mühendislik ve tasarım döngüsüne uygun model)
(function () {
  const { PAL } = INK;
  E.scene({
    name: 'Tasarım döngüsü', concept: 'Mühendislik ve tasarım döngüsü', from: 'cycle', to: 'cycle', trFrom: [900, 520],
    draw(ctx, t) {
      const sc = E.s('cycle');
      ctx.fillStyle = 'rgba(138,106,69,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 180, 110, 1560, 800);
      const k = 7 * E.seg(t, sc + 0.8, sc + 6.2);
      const act = Math.min(6, Math.floor(k - 0.3));
      F06.cycle(ctx, 880, 510, 290, k, t > sc + 6.4 ? 5 : act, { r: 92, size: 32 });
      E.inkText(ctx, 'tasarım', 880, 500, t, sc + 1.2, 1e9, { size: 44, align: 'center' });
      E.inkText(ctx, 'döngüsü', 880, 550, t, sc + 1.4, 1e9, { size: 44, align: 'center' });
      // emphasise "Geliştir": evidence → back to plan
      if (t > sc + 6.6) {
        const kk = E.se(t, sc + 6.6, sc + 7.6);
        const a5 = -Math.PI / 2 + 5 / 7 * Math.PI * 2, a2 = -Math.PI / 2 + 2 / 7 * Math.PI * 2;
        const p5 = [880 + Math.cos(a5) * 190, 510 + Math.sin(a5) * 190], p2 = [880 + Math.cos(a2) * 190, 510 + Math.sin(a2) * 190];
        P.arrow(ctx, p5, p2, kk, { w: 3, head: 14, color: '#C07F1E', c: [880, 640] });
        E.inkText(ctx, 'yeni kanıt → modeli yenile', 1380, 820, t, sc + 7.2, 1e9, { size: 40, align: 'center', color: '#8A4A10' });
      }
      DAMLA.draw(ctx, { x: 1560, y: 760, s: 1.2, view: 'q3', flip: true, expr: 'curious', look: [-0.8, -0.3], blink: E.blink(t, 4), squash: E.breath(t), t, seed: 2, arms: [[-1, 0.4], [1, 2.2 + 0.06 * Math.sin(t * 2)]] });
    }
  });
})();
