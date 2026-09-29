// SAHNE 2 — Altı şapka düşünme tekniğiyle kan bağışı tartışması (mantıksal temellendirme)
(function () {
  const { PAL } = INK; const K = KIT, F = F09;
  const TXT = { white: ['Bilgi', 'Bağışlanan kan bölümlerine ayrılır.', 'Bir bağış birden fazla hastaya yardım edebilir.'],
    red: ['Duygu', 'Yardım etmek güzel hissettirir.', 'İğneden çekinmek de doğaldır.'],
    black: ['Dikkat', 'Bağış yalnızca resmî kurumlarda,', 'sağlık kontrolünden sonra yapılır.'],
    yellow: ['Yarar', 'Bugünkü bir bağış,', 'yarın bir hayat kurtarabilir.'],
    green: ['Yeni fikir', 'Okulda kan bağışı için', 'farkındalık afişi hazırlayalım.'],
    blue: ['Özet', 'Kan bağışı, toplumsal', 'dayanışmanın güçlü bir örneğidir.'] };
  E.scene({
    name: 'Altı şapka', concept: 'Altı şapka düşünme tekniği', from: 'hats', to: 'blue', trFrom: [960, 300],
    draw(ctx, t) {
      const sh = E.s('hats');
      let cur = null; F.HATS.forEach(([id]) => { if (t >= E.s(id)) cur = id; });
      F.HATS.forEach(([id, name, col], i) => { const x = 285 + i * 270, k = E.se(t, sh + 0.8 + i * 0.4, sh + 1.3 + i * 0.4, 'out'); if (k <= 0) return;
        const on = cur === id, done = cur && F.HATS.findIndex(h => h[0] === cur) > i;
        ctx.save(); ctx.globalAlpha *= (cur && !on) ? 0.55 : 1; ctx.translate(x, 330); const sc = P.pop(k) * (on ? 1.15 : 1); ctx.scale(sc, sc); F.hat(ctx, 0, 0, 1, col, { glow: on }); ctx.restore();
        K.text(ctx, name, x, 410, { size: 36, align: 'center', alpha: k * ((cur && !on) ? 0.6 : 1), color: on ? K.AMBER_D : PAL.ink });
        if (done) P.check(ctx, x + 70, 250, 30, 1, { w: 5, color: K.LIFE_D }); });
      // tanıtım kartı
      const ik = E.se(t, sh + 2.5, sh + 3.2, 'out') * (1 - E.se(t, E.s('white') - 0.3, E.s('white') + 0.2));
      if (ik > 0) E.layer(ctx, ik, c => { K.card(c, 360, 490, 1200, 280, { seed: 9200, tint: PAL.light, tintA: 0.08 }); K.text(c, '6 şapka = 6 bakış açısı', 960, 600, { size: 54, align: 'center', color: K.AMBER_D }); K.text(c, 'Her şapkayı sırayla takıp konuya o gözle bakıyoruz.', 960, 690, { size: 38, align: 'center' }); });
      F.HATS.forEach(([id, name, col], i) => { const s0 = E.s(id), e0 = E.e(id), k = Math.min(E.se(t, s0 + 0.1, s0 + 0.6, 'out'), 1 - E.se(t, e0 - 0.25, e0 + 0.15)); if (k <= 0) return;
        const [ti, l1, l2] = TXT[id];
        E.layer(ctx, k, c => { K.card(c, 300, 480, 1320, 360, { seed: 9210 + i, tint: col === '#FBF8F1' ? '#C9C2B0' : col, tintA: 0.12 });
          K.text(c, name + ' şapka · ' + ti, 360, 565, { size: 50, color: col === '#FBF8F1' ? PAL.ink : col === '#E8C04A' ? '#9A7A1E' : col });
          P.write(c, l1, 360, 665, E.seg(t, s0 + 0.6, s0 + 1.8), { size: 44 }); P.write(c, l2, 360, 745, E.seg(t, s0 + 1.6, s0 + 3.0), { size: 44 }); }); });
      K.damla(ctx, t, { x: 1760, y: 900, s: 0.95, flip: true, expr: 'thinking', look: [-0.6, -0.4], arms: [[-1, 0.4], [1, 2.2]] });
    }
  });
})();
