// SAHNE 3 — Mantıksal çelişkiyi tespit etme → geçerli fikir oluşturma
(function () {
  const { PAL } = INK; const K = KIT, F = F09;
  E.scene({
    name: 'Çelişki ve geçerli fikir', concept: 'Mantıksal çelişki; toplumsal dayanışma', from: 'contra', to: 'valid', trFrom: [400, 500],
    draw(ctx, t) {
      const sc = E.s('contra'), s2 = E.s('contra2'), sv = E.s('valid');
      ctx.fillStyle = 'rgba(227,160,58,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
      const ck = 1 - E.se(t, sv - 0.2, sv + 0.5);
      if (ck > 0) E.layer(ctx, ck, c => {
        K.kid(c, 330, 690, 1.3, { shirt: '#3E6FA8', hair: 'curly', seed: 11, expr: t > s2 ? 'o' : 'smile' });
        K.say(c, ['“Kan bağışı çok önemli,', 'ama nasılsa başkaları verir.”'], 1000, 330, 900, 210, [470, 520], E.se(t, sc + 0.3, sc + 1.1, 'out'), { size: 46, seed: 2 });
        const hk = E.se(t, s2 + 0.3, s2 + 1.0);
        if (hk > 0) { c.save(); c.globalAlpha = hk; INK.stroke(c, [[700, 336], [1250, 334]], { w: 5, color: PAL.life, dry: false, alpha: 0.6 }); INK.stroke(c, [[690, 390], [1310, 388]], { w: 5, color: K.RED, dry: false, alpha: 0.6 }); c.restore(); }
        const rk = E.se(t, s2 + 1.5, s2 + 2.2, 'out');
        if (rk > 0) { c.save(); c.globalAlpha = rk; K.card(c, 700, 560, 1000, 260, { seed: 9300, line: K.RED, w: 3.5, tint: K.RED, tintA: 0.05 }); c.restore();
          K.text(c, 'Çelişki!', 750, 640, { size: 50, color: K.RED, alpha: rk });
          P.write(c, 'Herkes böyle düşünürse → kimse bağış yapmaz.', 750, 730, E.seg(t, s2 + 2.2, s2 + 4.0), { size: 40 }); }
      });
      const vk = E.se(t, sv + 0.2, sv + 0.9, 'out');
      if (vk > 0) E.layer(ctx, vk, c => {
        K.card(c, 260, 200, 1400, 330, { seed: 9310, tint: PAL.life, tintA: 0.12 });
        K.text(c, 'Geçerli fikir', 320, 290, { size: 54, color: K.LIFE_D });
        P.write(c, 'Her gönüllü bağışçı fark yaratır.', 320, 380, E.seg(t, sv + 1.0, sv + 2.4), { size: 46 });
        P.write(c, 'Dayanışma, herkesin katkısıyla güçlenir.', 320, 460, E.seg(t, sv + 2.4, sv + 3.8), { size: 46 });
        const cols = ['#3E6FA8', PAL.life, '#C07F1E', '#8A6A45', '#6B5FA0', '#4E6628', '#B5553F'];
        for (let i = 0; i < 7; i++) { const pk = E.se(t, sv + 3.5 + i * 0.3, sv + 4.0 + i * 0.3, 'out'); if (pk <= 0) continue; const x = 520 + i * 150; c.save(); c.globalAlpha *= pk; F.person(c, x, 780, 1.4, cols[i]); if (i < 6) INK.line(c, [x + 40, 740], [x + 110, 740], { w: 3, dry: false }); c.restore(); }
      });
    }
  });
})();
