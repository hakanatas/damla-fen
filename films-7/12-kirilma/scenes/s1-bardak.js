// SAHNE 1 — Bardaktaki kalem kırık görünüyor (köprü kurma, FB.7.4.1 gözlem) → soru
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F712, V = F.V;
  const GX0 = 700, GX1 = 1000, GTOP = 420, GBOT = 812, WS = 560, TABLE = 820;
  const A = [1090, 300], Pn = [940, WS];                       // kalemin su dışı kısmı: A → yüzey noktası
  const T = V.add(Pn, V.mul(V.sub(Pn, A), 0.95));              // gerçek uç (düz devam)

  function glass(ctx, water = 1) {
    const g = [[GX0, GTOP], [GX0 + 10, GBOT], [GX1 - 10, GBOT], [GX1, GTOP]];
    const wy = E.lerp(GBOT, WS, water);
    if (water > 0) { const w = [[GX0 + 4 + (wy - GTOP) / (GBOT - GTOP) * 6, wy], [GX1 - 4 - (wy - GTOP) / (GBOT - GTOP) * 6, wy], [GX1 - 12, GBOT - 2], [GX0 + 12, GBOT - 2]];
      P.fillPts(ctx, w, '#D9E6EC', 0.85); wash(ctx, w, PAL.water, 0.3, 101, { bleed: 1.5, blooms: 1 });
      line(ctx, w[0], w[1], { w: 3, color: PAL.water, dry: false, seed: 102 }); }
    stroke(ctx, g, { w: 3.4, seed: 103 });
    stroke(ctx, circlePts((GX0 + GX1) / 2, GTOP, (GX1 - GX0) / 2, 14, 40), { w: 2.4, closed: true, seed: 104, alpha: 0.8 });
    line(ctx, [GX0 + 26, GTOP + 40], [GX0 + 34, GBOT - 50], { w: 3, color: '#FBF8F1', alpha: 0.8, dry: false });
  }
  function fish(ctx, x, y, s, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
    const body = circlePts(0, 0, 50, 22, 36), tail = [[44, 0], [78, -22], [74, 22], [44, 0]];
    P.fillPts(ctx, body, '#E7EFD9'); wash(ctx, body, PAL.life, 0.55, 121, { bleed: 1, blooms: 0 }); P.fillPts(ctx, tail, PAL.life, 0.6);
    stroke(ctx, body, { w: 2.6, closed: true, seed: 122, dry: false }); stroke(ctx, tail, { w: 2.4, closed: true, seed: 123, dry: false });
    INK.inkDot(ctx, -30, -5, 3.5); ctx.restore();
  }
  F.fish = fish;

  E.scene({
    name: 'Bardaktaki kalem', concept: 'Kırık görünen kalem (köprü kurma)', from: 'title', to: 'bridge',
    draw(ctx, t) {
      const sh = E.s('hello'), sp = E.s('pullout'), sb = E.s('bridge');
      // masa
      const tb = [[-20, TABLE], [1940, TABLE - 6], [1940, 1100], [-20, 1100]];
      P.fillPts(ctx, tb, '#E4D3B4', 0.9); wash(ctx, tb, '#8A6A45', 0.22, 105, { bleed: 3, blooms: 2 });
      line(ctx, [-20, TABLE], [1940, TABLE - 6], { w: 3.4, seed: 106, taper: 0.01 });
      glass(ctx, 1);
      // kalem: bardakta (kırık görünüm) → dışarı çekilir (dümdüz) → geri
      const lift = E.se(t, sp + 1.6, sp + 3.0) * (1 - E.se(t, sb - 0.2, sb + 0.8));
      if (lift < 0.02) E.layer(ctx, E.se(t, 5.2, 6.4), ctx => {
        // görünen: su üstü düz, su içi kırık/kaymış çizilir (gözlem)
        const kink = [Pn[0] - 16, WS + 4], tipSeen = [T[0] + 70, T[1] - 30];
        ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 1920, WS); ctx.clip(); F.pencil(ctx, A, V.add(Pn, V.mul(V.norm(V.sub(Pn, A)), 40)), { eraser: true, seed: 131 }); ctx.restore();
        ctx.save(); ctx.beginPath(); ctx.rect(0, WS, 1920, 600); ctx.clip();
        const back = V.sub(kink, V.mul(V.norm(V.sub(tipSeen, kink)), 40));
        F.pencil(ctx, back, tipSeen, { eraser: false, seed: 132, alpha: 0.9 }); ctx.restore();
        // kırık noktasını göster
        const kk = E.se(t, sh + 4.2, sh + 5);
        if (kk > 0) { ctx.save(); ctx.globalAlpha *= kk; stroke(ctx, circlePts(Pn[0] - 8, WS, 58, 44, 40), { w: 3, color: F.RED, closed: true, seed: 133 }); ctx.restore();
          E.inkText(ctx, 'kırık mı?', Pn[0] - 90, WS - 90, t, sh + 4.6, sp + 1.4, { size: 46, color: F.RED, align: 'right' }); }
      }); else {
        const hop = Math.sin(lift * Math.PI) * 260;
        const a0 = E.mix(A, [110, 700], lift), b0 = E.mix(T, [630, 712], lift);
        const R = p => [p[0], p[1] - hop];
        F.pencil(ctx, R(a0), R(b0), { seed: 134 });
        if (t > sp + 3.4 && t < sb) {
          const k = E.se(t, sp + 3.4, sp + 4);
          const c = V.mul(V.add(R(a0), R(b0)), 0.5);
          E.inkText(ctx, 'dümdüz!', c[0], c[1] - 70, t, sp + 3.4, sb, { size: 50, align: 'center' });
          P.check(ctx, c[0] + 150, c[1] - 90, 50, k, { w: 7, color: PAL.life });
        }
      }
      // köprü: havuzdaki balık (düşünce balonu)
      const bk = E.se(t, sb + 0.1, sb + 0.8, 'out');
      if (bk > 0) {
        P.bubble(ctx, 1260, 300, 460, 280, [1480, 560], bk, 7);
        if (bk > 0.9) {
          const pool = [[1080, 280], [1440, 280], [1440, 400], [1080, 400]];
          P.fillPts(ctx, pool, PAL.water, 0.25); line(ctx, [1080, 280], [1440, 280], { w: 3, color: PAL.water, dry: false });
          fish(ctx, 1250, 345, 0.8);
          INK.label(ctx, 'havuz', 1100, 250, { size: 32, alpha: 0.8 });
          INK.label(ctx, '?', 1400, 250, { size: 70, weight: 700, color: '#8A4A10', alpha: E.se(t, sb + 2.5, sb + 3.2) });
        }
      }
      // Damla
      const think = t > sp + 5.2;
      DAMLA.draw(ctx, { x: 1560, y: TABLE + 2, s: 1.25, view: 'q3', flip: true, expr: think ? 'thinking' : (t > sh + 3.5 ? 'surprised' : 'curious'), look: [-0.8, 0.25], blink: E.blink(t, 3), squash: E.breath(t), t, talk: E.talk(t), seed: 1,
        arms: think ? [[-1, 0.35], [1, [34, -150], 1]] : (t > sh + 3.5 && t < sp ? [[-1, 1.6], [1, 0.35]] : [[-1, 0.35], [1, 0.35]]) });
      if (think && t < sb) { const k = E.se(t, sp + 5.2, sp + 5.9, 'out'); INK.label(ctx, '?', 1460, 470, { size: 110 * P.pop(k), weight: 700, color: '#8A4A10' }); }
      // başlık kartı
      const t1 = E.e('title') + 1.4;
      if (t < t1) {
        E.layer(ctx, 1 - E.se(t, t1 - 0.8, t1), c => { c.fillStyle = 'rgba(241,234,219,0.93)'; c.fillRect(300, 130, 1320, 250); });
      }
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '12 · Işığın Kırılması', 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 7. sınıf · Ünite 4', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.8 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
    }
  });
})();
