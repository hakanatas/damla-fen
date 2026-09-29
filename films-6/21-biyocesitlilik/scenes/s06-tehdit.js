// SAHNE 7 — Tehditler: ön bilgiye dayalı önerme, araştırma ile bulunan tehditler, nesli tükenen canlılar (FB.6.7.2 a)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F621;
  const TH = [
    ['Şehirleşme,', 'fazla konut yapımı', (c, t) => F.buildings(c, 0, 50, 0.75)],
    ['Orman yangını,', 'anız yakma', (c, t) => { F.flame(c, -30, 50, 0.8, t, 1); F.flame(c, 30, 50, 0.6, t, 3); }],
    ['Aşırı gübre ve', 'tarım ilacı', (c, t) => F.sprayer(c, -30, 0, 0.9, t)],
    ['Mera sürme,', 'aşırı otlatma', (c, t) => { F.sheep(c, -40, 40, 0.8, 1); F.sheep(c, 40, 50, 0.7, 2); }],
    ['Endüstrileşme,', 'kirlilik', (c, t) => F.factory(c, -10, 60, 0.42, t)],
    ['Yerel çeşitlerin', 'yok olması', (c, t) => F.seeds(c, 0, 16, 0.9)]
  ];
  E.scene({
    name: 'Tehditler', concept: 'Biyoçeşitliliği tehdit eden faktörler', from: 'threat-q', to: 'extinct', trFrom: [300, 700],
    draw(ctx, t) {
      const sq = E.s('threat-q'), st = E.s('threats'), sx = E.s('extinct');
      ctx.fillStyle = 'rgba(181,85,63,0.05)'; ctx.fillRect(0, 0, E.W, E.H);
      // önerme
      const oA = 1 - E.se(t, st - 0.2, st + 0.4);
      if (oA > 0) E.layer(ctx, oA, c => {
        const k = E.se(t, sq + 0.4, sq + 1.0, 'out'); if (k <= 0) return;
        F.card(c, 700, 260, 1100, 380, 101, { tint: '#C99A22', tintA: 0.14 });
        P.write(c, 'Önermem (ön bilgilerime göre):', 760, 360, E.seg(t, sq + 0.8, sq + 2.0), { size: 44, color: '#8A4A10' });
        P.write(c, 'Biyoçeşitliliği en çok', 760, 470, E.seg(t, sq + 2.2, sq + 3.4), { size: 56 });
        P.write(c, 'çöpler tehdit eder.', 760, 550, E.seg(t, sq + 3.2, sq + 4.4), { size: 56 });
      });
      // tehdit kartları
      const tA = Math.min(E.se(t, st, st + 0.4), 1 - E.se(t, sx - 0.3, sx + 0.4));
      if (tA > 0) E.layer(ctx, tA, c => {
        P.write(c, 'Araştırma: tehditlerin çoğu insan faaliyetlerinden', 1260, 190, E.seg(t, st + 0.4, st + 2.0), { size: 42, align: 'center', color: '#8A4A10' });
        TH.forEach(([l1, l2, draw], i) => {
          const at = st + 1.4 + i * 0.9, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
          const x = 900 + (i % 3) * 360, y = 380 + Math.floor(i / 3) * 290;
          c.save(); c.translate(x, y); c.scale(P.pop(k), P.pop(k));
          F.card(c, -160, -120, 320, 250, 110 + i, { blur: 12 });
          c.save(); c.translate(0, -40); draw(c, t); c.restore();
          F.fit(c, l1, 0, 70, 290, 34); F.fit(c, l2, 0, 108, 290, 34);
          c.restore();
        });
        const bk = E.se(t, st + 7.2, st + 8.0, 'out');
        if (bk > 0) { c.save(); c.globalAlpha *= bk; F.fit(c, 'Ayrıca: ormanların tahribi · turizmdeki hızlı gelişmeler · yetişmiş insan eksikliği', 1260, 860, 1180, 34, { weight: 400 }); c.restore(); }
      });
      // nesli tükenen / tehlike altındaki canlılar
      const xA = E.se(t, sx, sx + 0.5);
      if (xA > 0) E.layer(ctx, xA, c => {
        const S = [
          ['Hazar kaplanı', 'NESLİ TÜKENDİ', PAL.ink, (cc) => F.tiger(cc, -10, 90, 1.0)],
          ['Kelaynak', 'tehlike altında', '#8A4A10', (cc) => F.ibis(cc, -20, 80, 1.1)],
          ['Akdeniz foku', 'tehlike altında', '#8A4A10', (cc) => F.seal(cc, 0, 50, 1.2)]
        ];
        S.forEach(([name, st2, col, draw], i) => {
          const at = sx + 0.3 + i * 1.5, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          const x = 830 + i * 390, y = 480;
          c.save(); c.translate(x, y); c.scale(P.pop(k), P.pop(k));
          F.card(c, -175, -250, 350, 500, 130 + i, { tint: i ? PAL.life : '#9A9387', tintA: 0.1 });
          c.save(); c.translate(0, -60); if (i === 0) c.globalAlpha *= 0.75; draw(c); c.restore();
          F.fit(c, name, 0, 120, 320, 44);
          const sk = E.se(t, at + 0.8, at + 1.3, 'out');
          if (sk > 0) { c.save(); c.rotate(-0.06); c.globalAlpha *= sk; const b = F.rr(-150, 150, 300, 64, 10); stroke(c, b, { w: 3.4, closed: true, color: col, seed: 140 + i }); F.fit(c, st2, 0, 196, 270, 36, { color: col }); c.restore(); }
          c.restore();
        });
      });
      DAMLA.draw(ctx, { x: 300, y: 890, s: 1.35, view: 'q3', expr: t > sx ? 'sad' : (t > st ? 'surprised' : 'thinking'), look: [0.8, -0.4], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 6, arms: t < st ? [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]] : [[-1, 0.4], [1, 0.6]], prop: t < st ? 'notebook' : null });
    }
  });
})();
