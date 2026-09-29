// SAHNE 3 — Nitelikleri tanımlama (FB.5.7.1 a): malzemeye göre atıkların özellikleri tabloya yazılır
(function () {
  const { PAL, line, stroke } = INK;
  E.scene({
    name: 'Nitelikler', concept: 'Evsel atıkların nitelikleri', from: 'paper', to: 'organic', trFrom: [1300, 650],
    draw(ctx, t) {
      const sp = E.s('paper'), sg = E.s('glass'), sl = E.s('plastic'), so = E.s('organic');
      ctx.fillStyle = 'rgba(138,106,69,0.18)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 70, 1620, 840);
      P.write(ctx, 'Atıkların nitelikleri', 1180, 170, E.seg(t, sp + 0.4, sp + 1.6), { size: 62, align: 'center' });
      if (t > sp + 1.6) P.drawOn(ctx, P.bez([900, 192], [1180, 202], [1460, 188], 30), E.se(t, sp + 1.6, sp + 2.1), { w: 3, color: PAL.life });
      // sütun başlıkları
      const hk = E.se(t, sp + 1.8, sp + 2.6);
      if (hk > 0) {
        ctx.save(); ctx.globalAlpha *= hk;
        INK.label(ctx, 'atık', 395, 250, { size: 34, align: 'center', alpha: 0.6 });
        INK.label(ctx, 'malzeme', 560, 250, { size: 34, alpha: 0.6 });
        INK.label(ctx, 'özellikleri', 900, 250, { size: 34, alpha: 0.6 });
        line(ctx, [250, 266], [1720, 262], { w: 1.6, alpha: 0.5, dry: false });
        ctx.restore();
      }
      const ROWS = [
        { at: sp + 3.4, items: ['gazete', 'karton'], name: 'kâğıt, karton', props: ['hafif', 'yırtılır', 'katlanır'] },
        { at: sg + 0.3, items: ['camSise', 'kavanoz'], name: 'cam', props: ['saydam', 'sert', 'kırılgan'] },
        { at: sg + 3.6, items: ['konserve', 'icecek'], name: 'metal', props: ['parlak', 'sağlam'] },
        { at: sl + 0.3, items: ['plastikSise', 'yogurt'], name: 'plastik', props: ['hafif', 'esnek', 'doğada çok geç parçalanır'] },
        { at: so + 0.3, items: ['muz', 'elma'], name: 'besin artığı', props: ['yumuşak', 'kısa sürede çürür'], col: '#3F7A3A' }
      ];
      let cur = -1;
      ROWS.forEach((r, i) => {
        if (t < r.at) return; cur = i;
        const y = 330 + i * 116;
        r.items.forEach((key, j) => { const k = E.se(t, r.at + j * 0.25, r.at + 0.6 + j * 0.25, 'out'); W7.item(ctx, key, 335 + j * 120, y, 0.6 * P.pop(k), 0); });
        P.write(ctx, r.name, 560, y + 14, E.seg(t, r.at + 0.4, r.at + 1.2), { size: 48, color: r.col ?? PAL.ink });
        let x = 900;
        r.props.forEach((p, j) => {
          const a = r.at + 1.0 + j * 0.8;
          ctx.save(); ctx.font = '700 42px Kalam'; const w = ctx.measureText(p).width; ctx.restore();
          if (t > a) {
            P.write(ctx, p, x, y + 14, E.seg(t, a, a + 0.7), { size: 42 });
            P.drawOn(ctx, P.bez([x - 4, y + 26], [x + w / 2, y + 32], [x + w + 4, y + 24], 16), E.se(t, a + 0.5, a + 0.9), { w: 2.4, color: PAL.light });
          }
          if (j < r.props.length - 1 && t > a + 0.6) INK.inkDot(ctx, x + w + 22, y, 3.2);
          x += w + 44;
        });
        if (i < ROWS.length - 1) { ctx.save(); ctx.globalAlpha *= 0.3; line(ctx, [250, y + 58], [1720, y + 56], { w: 1, dry: false, seed: 400 + i }); ctx.restore(); }
      });
      // büyüteç o anki satırın üzerinde
      if (cur >= 0) {
        const r = ROWS[cur], y = 330 + cur * 116, prev = cur > 0 ? 330 + (cur - 1) * 116 : y;
        const my = E.lerp(prev, y, E.se(t, r.at - 0.2, r.at + 0.5)) - 6;
        const mx = 395 + Math.sin(t * 1.6) * 50;
        ctx.save(); ctx.globalAlpha *= 0.7 * (1 - E.se(t, r.at + 3.2, r.at + 4)); P.icon.magnifier(ctx, mx, my + 14, 0.72); ctx.restore();
      }
      // Damla köşeden bakıyor
      const pk = E.se(t, sp + 0.2, sp + 1.0, 'out');
      DAMLA.draw(ctx, { x: 1750, y: 1070 + (1 - pk) * 300, s: 0.95, view: 'q3', flip: true, expr: t > so + 3 ? 'happy' : 'curious', look: [-0.8, -0.4], blink: E.blink(t, 6), squash: E.breath(t), t, talk: E.talk(t), seed: 2, arms: [[-1, 0.4], [1, 2.3 + Math.sin(t * 2) * 0.08]], hold: (c, res) => W7.glove(c, res[1].hand, 1) });
    }
  });
})();
