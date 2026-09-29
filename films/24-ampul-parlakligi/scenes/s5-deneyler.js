// SAHNE 5–6 — Deney 1 (pil sayısı değişir, ampul 1) ve Deney 2 (ampul sayısı değişir, pil 2) — TGA: Tahmin · Gözlem · Açıklama
// (b: neden-sonuç, ç: bağımsız değişkeni kontrol etme)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  function experiment(cfg) {
    const P0 = cfg.pre;
    E.scene({
      name: cfg.name, concept: cfg.concept, from: P0, to: P0 + '-a', trFrom: [960, 540],
      draw(ctx, t) {
        const s0 = E.s(P0), sT = E.s(P0 + '-t'), sG = E.s(P0 + '-g'), sA = E.s(P0 + '-a');
        ctx.save();
        CK.table(ctx, 850);
        // hangi yapılandırma?  gözlem sırasında 1 → 2 → 3
        const step = 3.0;
        let idx = 0; if (t >= sG) idx = Math.min(2, Math.floor((t - sG) / step));
        const val = idx + 1;
        const n = cfg.vary === 'pil' ? val : cfg.fixed, m = cfg.vary === 'pil' ? cfg.fixed : val;
        const lit = t >= sG ? E.se(t, sG + idx * step + 0.5, sG + idx * step + 1.0) : 0;
        const bb = F24.B(n, m) * lit;
        // değişim anında kısa geçiş
        const tin = t >= sG ? E.se(t, sG + idx * step, sG + idx * step + 0.4) : 1;
        E.layer(ctx, tin, c => F24.rig(c, 960, 840, 0.72, n, m, bb, t));
        // küçük şema (solda)
        const ks = E.se(t, s0 + 0.6, s0 + 1.4);
        if (ks > 0) E.layer(ctx, ks * tin, c => {
          CK.card(c, 180, 520, 300, 230, { seed: 60, shadow: false });
          F24.schema(c, 235, 590, 190, 120, n, m, { lit: bb, s: 0.42 });
          INK.label(c, 'şema', 200, 560, { size: 28, alpha: 0.6 });
        });
        // sabit tutulan / değişen
        const kl = E.se(t, s0 + 1.0, s0 + 1.8);
        if (kl > 0) {
          ctx.save(); ctx.globalAlpha = kl;
          INK.label(ctx, cfg.fixedLabel, 330, 795, { size: 32, weight: 700, align: 'center', color: '#5C7230' });
          INK.label(ctx, cfg.varyLabel + val, 330, 836, { size: 32, weight: 700, align: 'center', color: '#8A4A10' });
          ctx.restore();
        }
        // TGA panosu
        const cards = [
          { x: 175, head: 'Tahmin', at: sT },
          { x: 720, head: 'Gözlem', at: sG },
          { x: 1265, head: 'Açıklama', at: sA }
        ];
        const kb = E.se(t, s0 + 0.2, s0 + 1.0, 'out');
        if (kb > 0) cards.forEach((c, i) => {
          ctx.save(); ctx.translate(c.x + 240, 300); ctx.scale(P.pop(kb), P.pop(kb));
          const active = t >= c.at && t < (cards[i + 1] ? cards[i + 1].at : 1e9);
          CK.card(ctx, -240, -140, 480, 285, { fill: active ? '#FBF1D6' : '#FAF6EC', seed: 70 + i });
          ctx.font = '700 40px Kalam'; ctx.textAlign = 'left'; ctx.fillStyle = '#8A4A10'; ctx.fillText((i + 1) + '. ' + c.head, -210, -88);
          ctx.restore();
        });
        // Tahmin
        cfg.tahmin.forEach((ln, i) => P.write(ctx, ln, 205, 290 + i * 46, E.seg(t, sT + 0.5 + i * 0.9, sT + 1.5 + i * 0.9), { size: 34 }));
        // Gözlem: 3 hücre
        for (let i = 0; i < 3; i++) {
          const at = sG + i * step + 1.1, k = E.se(t, at, at + 0.5); if (k <= 0) continue;
          const x = 810 + i * 150, nn = cfg.vary === 'pil' ? i + 1 : cfg.fixed, mm = cfg.vary === 'pil' ? cfg.fixed : i + 1;
          const b = F24.B(nn, mm);
          ctx.save(); ctx.globalAlpha = k;
          CK.bulb(ctx, x, 372, 0.62, b, t, { rays: false });
          INK.label(ctx, (i + 1) + ' ' + cfg.vary, x, 405, { size: 30, weight: 700, align: 'center' });
          ctx.restore();
          F24.meter(ctx, x - 55, 418, 110, b, k);
        }
        // Açıklama
        const ka = E.se(t, sA + 0.3, sA + 0.9);
        if (ka > 0) {
          P.check(ctx, 1320, 270, 40, E.se(t, sA + 0.3, sA + 0.9), { w: 6, color: PAL.life });
          P.write(ctx, 'Tahminim doğru!', 1360, 280, E.seg(t, sA + 0.5, sA + 1.5), { size: 36, color: '#5C7230' });
          P.write(ctx, cfg.aciklama, 1295, 350, E.seg(t, sA + 1.4, sA + 2.6), { size: 34 });
          P.write(ctx, cfg.neden, 1295, 405, E.seg(t, sA + 2.4, sA + 3.6), { size: 34 });
        }
        // Damla
        const o = { x: 1720, y: 852, s: 1.0, view: 'q3', flip: true, expr: 'curious', look: [-0.9, 0], blink: E.blink(t, 5), squash: E.breath(t), t, talk: E.talk(t), seed: 2, arms: [[-1, 0.4], [1, 0.4]] };
        if (t >= sT && t < sG) { o.prop = 'notebook'; o.arms = [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]]; o.expr = 'thinking'; o.look = [-0.6, -0.6]; }
        if (t >= sG && t < sA) { o.expr = lit > 0.5 ? 'surprised' : 'curious'; o.look = [-0.9, -0.1]; }
        if (t >= sA) { o.expr = 'happy'; o.arms = [[-1, 2.3 + 0.1 * Math.sin(t * 3)], [1, 0.4]]; }
        DAMLA.draw(ctx, o);
        ctx.restore();
      }
    });
  }
  experiment({
    name: 'Deney 1', concept: 'Pil sayısı → ampul parlaklığı', pre: 'e1', vary: 'pil', fixed: 1,
    fixedLabel: 'sabit: 1 ampul', varyLabel: 'değişen: pil = ',
    tahmin: ['Pil sayısı artarsa', 'ampul daha parlak', 'olur.'],
    aciklama: 'Neden: pil sayısı arttı', neden: 'Sonuç: ampul daha parlak'
  });
  experiment({
    name: 'Deney 2', concept: 'Ampul sayısı → ampul parlaklığı', pre: 'e2', vary: 'ampul', fixed: 2,
    fixedLabel: 'sabit: 2 pil', varyLabel: 'değişen: ampul = ',
    tahmin: ['Ampul sayısı artarsa', 'her ampul daha', 'sönük olur.'],
    aciklama: 'Neden: ampul sayısı arttı', neden: 'Sonuç: ampuller daha sönük'
  });
})();
