// SAHNE 6 — Düzeneği şemaya göre kurma, çalışmayınca şemayla karşılaştırıp sorunu giderme (a: şemaya uygun düzenek)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const RED = CK.RED;
  E.scene({
    name: 'Kurulum', concept: 'Şemaya uygun düzenek kurma', from: 'build', to: 'works', trFrom: [960, 700],
    draw(ctx, t) {
      const sb = E.s('build'), sc = E.s('check'), sm = E.s('compare'), sw = E.s('works');
      ctx.save();
      CK.table(ctx, 840);
      const hiK = t > sm + 3.6 && t < sw + 1.2 ? E.se(t, sm + 3.6, sm + 4.2) : 0;
      F23.schemaCard(ctx, 470, 340, 1, { closed: E.se(t, sc + 0.8, sc + 1.6), lit: E.se(t, sw + 1.2, sw + 1.8) * 0.8, hi: [115, 110, hiK] });

      // elemanlar sırayla yerleşir
      const pop = (a) => E.se(t, a, a + 0.8, 'out');
      const kH = pop(sb + 0.5), kS = pop(sb + 1.8), kB = pop(sb + 3.1);
      const closed = E.se(t, sc + 0.8, sc + 1.6);
      const fixK = E.se(t, sw + 0.2, sw + 1.0);
      const bright = E.se(t, sw + 1.1, sw + 1.6) * 0.9;
      let h, sw_, so;
      if (kH > 0) E.layer(ctx, Math.min(1, kH * 1.6), c => { h = CK.holder(c, 820, 800 - (1 - kH) * 60, 1.0); });
      if (kS > 0) E.layer(ctx, Math.min(1, kS * 1.6), c => { sw_ = CK.switch(c, 1180, 840 - (1 - kS) * 60, 1.0, closed); });
      if (kB > 0) E.layer(ctx, Math.min(1, kB * 1.6), c => { so = CK.socket(c, 1560, 840 - (1 - kB) * 60, 1.1); });
      // sabit uç noktaları (yerleşme animasyonu bittikten sonra kablolar bağlanır)
      const HN = [692, 828], HP = [948, 828], SA = [1098, 827], SB = [1262, 827], OA = [1505, 832], OB = [1615, 832];
      CK.wire(ctx, HP, SA, { sag: 30, k: E.seg(t, sb + 4.4, sb + 5.4) });
      CK.wire(ctx, SB, OA, { sag: 36, k: E.seg(t, sb + 5.6, sb + 6.6) });
      // gevşek kablo: duyun ucuna takılmamış → düzeltilince takılır
      const loose = [1690, 700];
      const end = E.mix(loose, OB, fixK);
      CK.wire(ctx, HN, end, { c: [1150, E.lerp(500, 520, fixK)], color: '#3A3842', k: E.seg(t, sb + 6.8, sb + 8.3) });
      if (kB > 0) CK.bulb(ctx, 1560, 840 - (1 - kB) * 60 - 42, 1.1, bright, t);

      // adım yazıları
      const steps = [[sb + 0.5, '1. pil yatağı + pil'], [sb + 1.8, '2. anahtar'], [sb + 3.1, '3. duy + ampul'], [sb + 4.4, '4. kabloları bağla']];
      steps.forEach(([a, s], i) => { const nx = steps[i + 1] ? steps[i + 1][0] : sb + 8.6; E.inkText(ctx, s, 1180, 580, t, a, nx, { size: 44, align: 'center', fade: 0.4 }); });

      // sorun: ışık yok
      if (t > sc + 2.0 && t < sw + 0.4) {
        E.inkText(ctx, 'ışık yok!', 1600, 560, t, sc + 2.0, sw + 0.4, { size: 52, color: '#8A4A10' });
      }
      // karşılaştırma listesi
      const kl = Math.min(E.se(t, sm + 0.2, sm + 0.9, 'out'), 1 - E.se(t, sw + 3.2, sw + 4.0));
      if (kl > 0) E.layer(ctx, kl, c => {
        CK.card(c, 1130, 130, 640, 380, { seed: 140 });
        INK.label(c, 'Şema ↔ düzenek', 1170, 190, { size: 42, weight: 700 });
        const rows = [['pil', 1], ['anahtar', 1], ['ampul', 1], ['kablo bağlantıları', 0]];
        rows.forEach(([s, ok], i) => {
          const at = sm + 1.0 + i * 0.7, y = 260 + i * 62, k = E.se(t, at, at + 0.4); if (k <= 0) return;
          INK.label(c, s, 1230, y + 12, { size: 38, alpha: k });
          if (ok) P.check(c, 1190, y, 30, E.se(t, at + 0.2, at + 0.6), { w: 5, color: PAL.life });
          else if (fixK < 0.9) P.cross(c, 1190, y + 2, 16, E.se(t, at + 0.3, at + 0.8), { w: 5, color: RED });
          else P.check(c, 1190, y, 30, 1, { w: 5, color: PAL.life });
        });
      });
      // büyüteç: gevşek uç
      if (t > sm + 3.6 && t < sw + 1.4) {
        const k = Math.min(E.se(t, sm + 3.6, sm + 4.2), 1 - E.se(t, sw + 0.9, sw + 1.4));
        ctx.save(); ctx.globalAlpha = k; stroke(ctx, circlePts(E.lerp(1690, 1615, fixK), E.lerp(720, 832, fixK), 70, 70, 40), { w: 4, closed: true, color: CK.AMBD }); ctx.restore();
        if (t < sw) E.inkText(ctx, 'takılı değil!', 1560, 660, t, sm + 4.2, sw, { size: 38, color: RED, align: 'right' });
      }
      // tamam
      if (t > sw + 1.8) E.inkText(ctx, '✓ düzenek şemaya uygun', 1180, 580, t, sw + 1.8, 1e9, { size: 48, align: 'center', color: '#5C7230' });

      // Damla
      const o = { x: 330, y: 842, s: 1.15, view: 'q3', expr: 'determined', look: [0.8, -0.1], blink: E.blink(t, 3), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.4], [1, 1.8 + 0.15 * Math.sin(t * 4)]] };
      if (t > sc + 1.8 && t < sm) { o.expr = 'surprised'; o.arms = [[-1, 1.8], [1, 1.8]]; o.look = [0.7, 0]; }
      if (t >= sm && t < sw) { o.expr = 'thinking'; o.arms = [[-1, 0.4], [1, [30, -86]]]; o.look = [0.4, -0.8]; }
      if (t >= sw + 1.4) { o.expr = 'happy'; o.arms = [[-1, 2.6], [1, 2.6]]; o.squash = E.breath(t) * (1 + 0.05 * Math.abs(Math.sin((t - sw) * 5))); }
      DAMLA.draw(ctx, o);
      ctx.restore();
    }
  });
})();
