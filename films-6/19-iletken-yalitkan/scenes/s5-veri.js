// SAHNE 6 — Veri kaydı (OB7, KB2.7), iletken/yalıtkan kavramları, grafit sürprizi, veri analizi (FB.6.6.1 b)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const X0 = 280, COL_B = 720, COL_R = 800, COL_G = 1030, HY = 290, RY = i => 356 + i * 64;
  E.scene({
    name: 'Veriler', concept: 'Veri kaydı, iletken ve yalıtkan maddeler', from: 'record', to: 'analyze', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record'), sc = E.s('conductor'), si = E.s('insulator'), sg = E.s('graphite'), sg2 = E.s('graphite2'), sa = E.s('analyze');
      ctx.save();
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 80, 1620, 900);
      P.write(ctx, 'Deney sonuçlarım', X0, 215, E.seg(t, sr + 0.2, sr + 1.2), { size: 56 });
      // başlık satırı
      const kh = E.se(t, sr + 0.8, sr + 1.3);
      if (kh > 0) {
        ctx.save(); ctx.globalAlpha = kh;
        INK.label(ctx, 'Madde', X0, HY, { size: 38, weight: 700 }); INK.label(ctx, 'Ampul', COL_B - 50, HY, { size: 38, weight: 700 }); INK.label(ctx, 'Sonuç', COL_R, HY, { size: 38, weight: 700 });
        line(ctx, [X0 - 10, HY + 20], [1160, HY + 18], { w: 2.4, dry: false });
        ctx.restore();
      }
      // grup sütunu (analiz)
      const ka = E.se(t, sa + 0.3, sa + 0.9);
      if (ka > 0) INK.label(ctx, 'Grup', COL_G, HY, { size: 38, weight: 700, alpha: ka });
      F19.S.forEach((m, i) => {
        const at = i < 7 ? sr + 1.4 + i * 0.8 : sg + 0.6; const k = E.se(t, at, at + 0.5); if (k <= 0) return;
        const y = RY(i);
        if (i === 7) { const kh2 = E.se(t, sg + 1.4, sg + 2.2); if (kh2 > 0) { ctx.save(); ctx.globalAlpha = kh2 * 0.35; P.fillPts(ctx, CK.rect(X0 - 16, y - 44, 1180 - X0, 60), PAL.light); ctx.restore(); } }
        ctx.save(); ctx.globalAlpha = k;
        INK.label(ctx, m.name, X0, y, { size: 36 });
        CK.bulb(ctx, COL_B, y + 16, 0.36, m.b, t, { rays: false });
        INK.label(ctx, m.b === 0 ? 'yanmadı' : m.b < 0.5 ? 'sönük yandı' : 'yandı', COL_R, y, { size: 36, weight: 700, color: m.b > 0 ? '#8A4A10' : PAL.water });
        ctx.restore();
        const kg = E.se(t, sa + 0.8 + i * 0.25, sa + 1.2 + i * 0.25);
        if (kg > 0) INK.label(ctx, m.g === 'i' ? 'iletken' : 'yalıtkan', COL_G, y, { size: 36, weight: 700, color: m.g === 'i' ? '#8A4A10' : PAL.water, alpha: kg });
      });
      // kavram kartları
      const card = (at, y, fill, title, l1, l2, l3, seed) => {
        const k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        ctx.save(); ctx.translate(1450, y); ctx.rotate(seed % 2 ? 0.015 : -0.015); ctx.scale(P.pop(k), P.pop(k));
        CK.card(ctx, -250, -120, 500, 240, { seed, fill });
        INK.label(ctx, title, -220, -62, { size: 46, weight: 700 });
        INK.label(ctx, l1, -220, -8, { size: 36 });
        INK.label(ctx, l2, -220, 44, { size: 34, alpha: 0.85 });
        if (l3) INK.label(ctx, l3, -220, 90, { size: 34, alpha: 0.85 });
        ctx.restore();
      };
      card(sc + 0.3, 400, '#F6E7B8', 'İletken madde', 'elektriği iletir', 'metaller: demir, bakır...', t > sg2 + 0.4 ? '+ grafit (metal değil!)' : '', 71);
      card(si + 0.3, 680, '#E3ECEF', 'Yalıtkan madde', 'elektriği iletmez', 'plastik, tahta, cam,', 'lastik', 72);
      // grafit notu
      const kn = E.se(t, sg2 + 0.2, sg2 + 0.8);
      if (kn > 0 && t < sa + 0.2) { P.write(ctx, 'grafit → iletken', X0 + 380, RY(7) + 70, E.seg(t, sg2 + 0.2, sg2 + 1.4), { size: 38, color: '#8A4A10' }); }
      // analiz ayraçları
      if (ka > 0) {
        ctx.save(); ctx.globalAlpha = ka;
        [[0, 2, '#8A4A10'], [3, 6, PAL.water], [7, 7, '#8A4A10']].forEach(([a, b, col], j) => { const y0 = RY(a) - 40, y1 = RY(b) + 16; stroke(ctx, [[1180, y0], [1196, y0], [1196, y1], [1180, y1]], { w: 3, color: col, dry: false, seed: 80 + j }); });
        ctx.restore();
      }
      ctx.restore();
    }
  });
})();
