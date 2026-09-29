// SAHNE 8 — Mühendislik ve tasarım döngüsü, Sıra sende (model tasarımı), araştırma (Süper Ay), sonraki ünite, bitiş
(function () {
  const { PAL, line, stroke, circlePts, arrowHead } = INK;
  const CYC = ['Soru sor', 'Tasarla', 'Yap', 'Test et', 'Geliştir', 'Paylaş'];
  E.scene({
    name: 'Tasarım döngüsü', concept: 'Mühendislik ve tasarım döngüsü; performans görevi', from: 'record', to: 'yourturn', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record'), sy = E.s('yourturn');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 70, 1620, 880);
      const A = 1 - E.se(t, sy - 0.2, sy + 0.5);
      if (A > 0) E.layer(ctx, A, c => {
        P.write(c, 'Tasarım Döngüsü', 290, 215, E.seg(t, sr + 0.2, sr + 1.2), { size: 62 });
        const cx = 960, cy = 555, R = 250;
        CYC.forEach((s, i) => {
          const a = -Math.PI / 2 + i / 6 * 6.283, x = cx + Math.cos(a) * R * 1.35, y = cy + Math.sin(a) * R;
          const at = sr + 1.0 + i * 0.9, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
          const r = 88 * P.pop(k); const cp = INK.wobble(circlePts(x, y, r * 1.35, r * 0.75, 40), 2, 160 + i);
          P.fillPts(c, cp, i === 4 ? '#F6E7B8' : '#FBF8F1'); stroke(c, cp, { w: 3, closed: true, seed: 170 + i });
          INK.label(c, s, x, y + 12, { size: 38, weight: 700, align: 'center' });
          if (i > 0 || t > sr + 6.4) {
            const j = i === 0 ? 5 : i - 1, a0 = -Math.PI / 2 + j / 6 * 6.283 + 0.32, a1 = -Math.PI / 2 + (i === 0 ? 6 : i) / 6 * 6.283 - 0.32;
            const pts = P.arc(cx, cy, R * 1.35, a0, a1, 16, R); const ak = E.se(t, at - 0.2, at + 0.3);
            if (ak > 0) { P.drawOn(c, pts, ak, { w: 3 }); if (ak >= 1) arrowHead(c, pts[13], pts[16], 13, { w: 3 }); }
          }
        });
        INK.label(c, 'Model 1 → veri → Model 2', cx, cy + 10, { size: 32, align: 'center', alpha: 0.7 * E.se(t, sr + 6.6, sr + 7.4) });
      });
      const B = E.se(t, sy - 0.1, sy + 0.6);
      if (B > 0) E.layer(ctx, B, c => {
        P.write(c, 'Sıra sende!', 290, 225, E.seg(t, sy + 0.3, sy + 1.3), { size: 70, color: '#8A4A10' });
        const L = ['1. Arkadaşlarınla plan yapın.', '2. Temsilî hacimleri hesaplayın.', '3. Hareketleri ve yönleri gösterin.', '4. Modelleri karşılaştırıp geliştirin.'];
        L.forEach((s, i) => P.write(c, s, 300, 360 + i * 105, E.seg(t, sy + 1.2 + i * 1.5, sy + 2.2 + i * 1.5), { size: 46 }));
        const k = E.se(t, sy + 2, sy + 2.8, 'out');
        if (k > 0) { c.save(); c.globalAlpha = k; P.sun(c, 1360, 500, 110, t, { rays: false, glow: false, cells: false }); P.earth(c, 1560, 500, 22); P.moon(c, 1615, 470, 7); F04.orbitArrow(c, 1560, 500, 60, 60, 1.2, -1.4, { w: 2.6, head: 10 }); c.restore(); }
      });
      DAMLA.draw(ctx, { x: 1690, y: 1045, s: 1.0, view: 'q3', flip: true, expr: 'happy', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 5, arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
  E.scene({
    name: 'Araştır ve sonraki', concept: 'Süper Ay araştırması; sonraki ünite', from: 'research', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('research'), sn = E.s('next'), se = E.s('end');
      const hill = F04.twilight(ctx, t);
      const dx = 900, dy = P.hillY(hill, dx) + 4;
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.5, view: 'q3', expr: 'happy', look: [0.8, -0.6], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      const rk = Math.min(E.se(t, sr, sr + 0.7, 'out'), 1 - E.se(t, sn - 0.4, sn + 0.3));
      if (rk > 0) E.layer(ctx, rk, c => {
        F04.card(c, 300, 170, 1320, 560, { seed: 91 });
        P.moon(c, 500, 430, 95); P.moon(c, 700, 440, 82);
        INK.label(c, '?', 600, 330, { size: 70, weight: 700 });
        P.write(c, 'Sen de araştır!', 830, 300, E.seg(t, sr + 0.4, sr + 1.4), { size: 70, color: '#8A4A10' });
        P.write(c, '“Süper Ay” nedir?', 830, 420, E.seg(t, sr + 1.4, sr + 2.6), { size: 56 });
        P.write(c, 'Ay gerçekten büyür mü?', 830, 510, E.seg(t, sr + 2.8, sr + 4.0), { size: 56 });
        INK.label(c, 'kütüphane · güvenilir dijital kaynaklar · öğretmenin', 830, 620, { size: 30, alpha: 0.6 * E.se(t, sr + 4, sr + 4.8) });
      });
      const nk = Math.min(E.se(t, sn + 0.3, sn + 1.0), 1 - E.se(t, se - 0.2, se + 0.4));
      if (nk > 0) E.layer(ctx, nk, c => {
        E.inkText(c, 'Sıradaki ünite:', 960, 200, t, sn + 0.4, 1e9, { size: 50, align: 'center', weight: 400 });
        E.inkText(c, 'Kuvveti Tanıyalım', 960, 285, t, sn + 1.0, 1e9, { size: 76, align: 'center' });
      });
      F04.endCard(ctx, t, se, 4, 'Güneş, Dünya ve Ay', 'FB.5.1.4');
    }
  });
})();
