// SAHNE 3–4 — Bağımsız, bağımlı ve kontrol edilen değişkenler (c, ç) · Güvenlik
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  E.scene({
    name: 'Değişkenler', concept: 'Bağımsız, bağımlı, kontrol edilen değişken', from: 'indep', to: 'ctrl', trFrom: [960, 540],
    draw(ctx, t) {
      const si = E.s('indep'), sd = E.s('dep'), sc = E.s('ctrl');
      ctx.save();
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 80, 1620, 900);
      const cols = [
        { at: si + 0.2, x: 470, head: 'Bağımsız değişken', sub: 'değiştirdiğim', fill: '#FBF1D6', seed: 40 },
        { at: sd + 0.2, x: 960, head: 'Bağımlı değişken', sub: 'gözlediğim', fill: '#FBE7B8', seed: 41 },
        { at: sc + 0.2, x: 1450, head: 'Kontrol edilen', sub: 'aynı tuttuğum', fill: '#EEF0E2', seed: 42 }
      ];
      cols.forEach((c, i) => {
        const k = E.se(t, c.at, c.at + 0.6, 'out'); if (k <= 0) return;
        ctx.save(); ctx.translate(c.x, 520); ctx.rotate([-0.015, 0.01, -0.01][i]); ctx.scale(P.pop(k), P.pop(k));
        CK.card(ctx, -225, -330, 450, 640, { fill: c.fill, seed: c.seed });
        ctx.font = '700 42px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText(c.head, 0, -262);
        ctx.font = '400 32px Kalam'; ctx.globalAlpha = 0.7; ctx.fillText('(' + c.sub + ')', 0, -218); ctx.globalAlpha = 1;
        line(ctx, [-190, -196], [190, -198], { w: 2, dry: false, alpha: 0.5 });
        ctx.restore();
      });
      // içerikler
      const k1 = E.se(t, si + 1.4, si + 2.2);
      if (k1 > 0) E.layer(ctx, k1, c => {
        for (let i = 0; i < 3; i++) CK.battery(c, 450 + (i - 1) * 16, 380 + i * 30, 0.62);
        INK.label(c, 'pil sayısı', 470, 530, { size: 42, weight: 700, align: 'center' });
        INK.label(c, 'ya da', 470, 590, { size: 32, align: 'center', alpha: 0.7 });
        for (let i = 0; i < 3; i++) CK.bulb(c, 380 + i * 90, 740, 0.55, 0);
        INK.label(c, 'ampul sayısı', 470, 800, { size: 42, weight: 700, align: 'center' });
      });
      const k2 = E.se(t, sd + 1.2, sd + 2.0);
      if (k2 > 0) E.layer(ctx, k2, c => {
        CK.bulb(c, 960, 560, 1.3, 0.35 + 0.35 * (0.5 + 0.5 * Math.sin(t * 1.8)), t);
        P.icon.eye(c, 960, 660, 0.5);
        INK.label(c, 'ampulün', 960, 760, { size: 42, weight: 700, align: 'center' });
        INK.label(c, 'parlaklığı', 960, 810, { size: 42, weight: 700, align: 'center' });
      });
      const items = ['aynı tür piller', 'aynı tür ampuller', 'aynı kablolar', 'aynı duy, pil yatağı'];
      items.forEach((s, i) => {
        const at = sc + 1.4 + i * 1.3, k = E.se(t, at, at + 0.5); if (k <= 0) return;
        const y = 400 + i * 100;
        INK.label(ctx, '=', 1275, y, { size: 44, weight: 700, color: '#5C7230', alpha: k });
        P.write(ctx, s, 1305, y, E.seg(t, at, at + 1.0), { size: 34 });
      });
      ctx.restore();
    }
  });

  function adult(ctx) {
    [[-22, 0, 1], [26, 14, 0.7]].forEach(([dx, dy, s], i) => {
      stroke(ctx, circlePts(dx, dy - 44 * s, 15 * s, 15 * s, 20), { w: 3, closed: true, seed: 60 + i });
      line(ctx, [dx, dy - 28 * s], [dx, dy + 18 * s], { w: 3.4 });
      line(ctx, [dx, dy + 18 * s], [dx - 12 * s, dy + 48 * s], { w: 3 }); line(ctx, [dx, dy + 18 * s], [dx + 12 * s, dy + 48 * s], { w: 3 });
      line(ctx, [dx - 20 * s, dy - 6 * s], [dx + 20 * s, dy - 6 * s], { w: 3, bend: 0.1 });
    });
  }
  E.scene({
    name: 'Güvenlik', concept: 'Elektrikle güvenli deney', from: 'safety', to: 'safety', trFrom: [1650, 900],
    draw(ctx, t) {
      const s1 = E.s('safety');
      ctx.save();
      CK.table(ctx, 860);
      DAMLA.draw(ctx, {
        x: 420, y: 862, s: 1.45, view: 'q3', expr: 'determined', look: [0.7, -0.2], blink: E.blink(t, 4), squash: E.breath(t), t, talk: E.talk(t), seed: 1,
        arms: [[-1, 0.4], [1, 2.8 + 0.1 * Math.sin(t * 3)]]
      });
      const kb = E.se(t, s1 + 0.1, s1 + 0.6, 'out');
      if (kb > 0) { P.bubble(ctx, 560, 300, 150, 150, [470, 480], kb, 7); INK.label(ctx, '!', 560, 340, { size: 110, weight: 700, color: CK.RED, align: 'center', alpha: kb }); }
      ctx.restore();
      const kc = E.se(t, s1 + 0.3, s1 + 1.0, 'out');
      ctx.save(); ctx.translate((1 - kc) * 900, 0);
      CK.safetyCard(ctx, t, s1 + 0.8, 870, 120, {
        w: 920, h: 790, gap: 172,
        items: [
          { icon: c => CK.outlet(c, 0, 0, 0.8), mark: 'x', a: 'Prizlerle asla oynama!', red: true, at: 0 },
          { icon: c => CK.battery(c, 0, 0, 0.55), mark: 'ok', a: 'Deneyde yalnızca pil kullan.', at: 1.6 },
          { icon: adult, a: 'Bir yetişkin eşliğinde çalış.', at: 3.4 },
          { icon: CK.shortIcon, mark: 'x', a: 'Pilin iki ucunu tek kabloyla', b: 'birleştirme! Pil ısınır, zarar verir.', red: true, at: 5.2 }
        ]
      });
      ctx.restore();
    }
  });
})();
