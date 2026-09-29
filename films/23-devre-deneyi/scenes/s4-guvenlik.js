// SAHNE 4–5 — Güvenlik (priz yok, yalnızca pil, kısa devre yok, yetişkin gözetimi) · şemaya uygun malzeme seçimi (düzenek tasarımı)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  function adult(ctx) {
    [[-22, 0, 1], [26, 14, 0.7]].forEach(([dx, dy, s], i) => {
      stroke(ctx, circlePts(dx, dy - 44 * s, 15 * s, 15 * s, 20), { w: 3, closed: true, seed: 60 + i });
      line(ctx, [dx, dy - 28 * s], [dx, dy + 18 * s], { w: 3.4 });
      line(ctx, [dx, dy + 18 * s], [dx - 12 * s, dy + 48 * s], { w: 3 }); line(ctx, [dx, dy + 18 * s], [dx + 12 * s, dy + 48 * s], { w: 3 });
      line(ctx, [dx - 20 * s, dy - 6 * s], [dx + 20 * s, dy - 6 * s], { w: 3, bend: 0.1 });
    });
  }
  E.scene({
    name: 'Güvenlik', concept: 'Elektrikle güvenli deney', from: 'safety', to: 'adult', trFrom: [1650, 900],
    draw(ctx, t) {
      const s1 = E.s('safety'), s2 = E.s('adult');
      ctx.save();
      CK.table(ctx, 860);
      const k0 = E.se(t, s1, s1 + 0.6);
      DAMLA.draw(ctx, {
        x: 420, y: 862, s: 1.45, view: 'q3', expr: 'determined', look: [0.7, -0.2], blink: E.blink(t, 4), squash: E.breath(t), t, talk: E.talk(t), seed: 1,
        arms: [[-1, 0.4], [1, 2.2 + 0.6 * k0 + 0.1 * Math.sin(t * 3)]]
      });
      const kb = E.se(t, s1 + 0.1, s1 + 0.6, 'out');
      if (kb > 0) { P.bubble(ctx, 560, 300, 150, 150, [470, 480], kb, 7); INK.label(ctx, '!', 560, 340, { size: 110, weight: 700, color: CK.RED, align: 'center', alpha: kb }); }
      ctx.restore();
      const kc = E.se(t, s1 + 0.3, s1 + 1.0, 'out');
      ctx.save(); ctx.translate((1 - kc) * 900, 0);
      CK.safetyCard(ctx, t, s1 + 0.8, 870, 120, {
        w: 920, h: 790, gap: 172,
        items: [
          { icon: c => CK.outlet(c, 0, 0, 0.8), mark: 'x', a: 'Prizlerle asla oynama!', b: 'Şehir elektriği çok tehlikelidir.', red: true, at: 0 },
          { icon: c => CK.battery(c, 0, 0, 0.55), mark: 'ok', a: 'Deneyde yalnızca pil kullan.', at: 2.4 },
          { icon: CK.shortIcon, mark: 'x', a: 'Pilin iki ucunu tek kabloyla', b: 'birleştirme! Pil ısınır, zarar verir.', red: true, at: 4.8 },
          { icon: adult, a: 'Öğretmen ya da bir yetişkin', b: 'gözetiminde çalış.', at: s2 - s1 - 0.8 + 0.3 }
        ]
      });
      ctx.restore();
    }
  });

  // ---------------- SAHNE 5: malzeme seçimi ----------------
  // şema kartı (sol üst) — sonraki sahnelerde de aynı yerde
  E.scene({
    name: 'Malzemeler', concept: 'Şemaya uygun düzenek tasarlama', from: 'materials', to: 'holders', trFrom: [460, 330],
    draw(ctx, t) {
      const sm = E.s('materials'), sh = E.s('holders');
      ctx.save();
      CK.table(ctx, 840);
      F23.schemaCard(ctx, 470, 340, 1);
      // şemadaki her sembol → bir eleman
      const items = [
        { at: sm + 1.0, from: [470, 225], draw: c => CK.battery(c, 900, 808, 0.9), to: [900, 720], name: 'pil', nx: 900 },
        { at: sm + 2.6, from: [630, 360], draw: c => CK.switch(c, 1180, 838, 0.85, 0), to: [1180, 740], name: 'anahtar', nx: 1180 },
        { at: sm + 4.2, from: [470, 455], draw: c => CK.bulb(c, 1420, 838, 0.95, 0), to: [1420, 690], name: 'ampul', nx: 1420 },
        { at: sm + 5.8, from: [330, 360], draw: c => { CK.cable(c, 1660, 770, 0.62); CK.cable(c, 1660, 820, 0.62, '#3A3842'); CK.cable(c, 1660, 795, 0.62); }, to: [1600, 690], name: '3 kablo', nx: 1660 }
      ];
      items.forEach((it, i) => {
        const k = E.se(t, it.at, it.at + 0.6, 'out'); if (k <= 0) return;
        E.layer(ctx, Math.min(1, k * 1.5), c => it.draw(c));
        const ka = E.se(t, it.at + 0.2, it.at + 1.0);
        ctx.save(); ctx.globalAlpha = Math.max(0.25, 1 - E.se(t, it.at + 1.8, it.at + 2.6)); INK.dashed(ctx, P.partial(P.bez(it.from, [(it.from[0] + it.to[0]) / 2, 200], it.to, 30), ka), { w: 2.4, color: CK.AMBD }); ctx.restore();
        INK.label(ctx, it.name, it.nx, 900, { size: 38, weight: 700, align: 'center', alpha: k });
        P.check(ctx, it.nx + it.name.length * 9.5 + 34, 870, 34, E.se(t, it.at + 0.9, it.at + 1.4), { w: 5, color: PAL.life });
      });
      // pil yatağı ve duy
      const kh = E.se(t, sh + 0.2, sh + 0.9, 'out');
      if (kh > 0) {
        ctx.save(); ctx.translate(1300, 380); ctx.rotate(0.015); ctx.scale(P.pop(kh), P.pop(kh));
        CK.card(ctx, -440, -180, 880, 330, { fill: '#F6E7B8', seed: 130 });
        CK.holder(ctx, -230, -40, 0.85, { battery: false });
        CK.socket(ctx, 200, -10, 1.0);
        INK.label(ctx, 'pil yatağı', -230, 40, { size: 38, weight: 700, align: 'center' });
        INK.label(ctx, 'duy', 200, 40, { size: 38, weight: 700, align: 'center' });
        ctx.restore();
        P.write(ctx, 'şemada çizilmez ama pili ve ampulü tutar', 1300, 500, E.seg(t, sh + 1.4, sh + 3.0), { size: 36, align: 'center', color: '#8A4A10' });
      }
      DAMLA.draw(ctx, {
        x: 300, y: 842, s: 1.15, view: 'q3', expr: t > sh ? 'curious' : 'determined', look: [0.8, -0.2], blink: E.blink(t, 8), squash: E.breath(t), t, talk: E.talk(t), seed: 2,
        arms: [[-1, 0.4], [1, 1.9 + 0.1 * Math.sin(t * 2)]]
      });
      ctx.restore();
    }
  });
})();
