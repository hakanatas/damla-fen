// SAHNE 5 — Açıklama: tanecik modeli + sıcaklık–zaman grafiği; ısı sıcaktan soğuğa akar → termal denge;
// ideal hesap (40 °C) ile ölçüm (39 °C) farkı; eşit sıcaklıkta ısı alışverişi olmaz (TYMM vurgusu)
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const F = F18;
  const MID = '#6E5A5E';
  const hotF = u => 40 + 20 * Math.exp(-5 * u), coldF = u => 40 - 20 * Math.exp(-5 * u);
  function model(ctx, t) {
    const sx = E.s('explain'), sf = E.s('flow'), sq = E.s('equil');
    const t1 = sf + 0.5, t2 = sq + 2.0;
    const phH = F.integ(t, t1, t2, 2.6, 1.5), phC = F.integ(t, t1, t2, 0.5, 1.5);
    const k = E.clamp((t - t1) / (t2 - t1));
    const ampH = E.lerp(12, 8, k), ampC = E.lerp(3, 8, k);
    const bx = 200, by = 330, bw = 640, bh = 480;
    F.water(ctx, bx, by, bw, bh, 440, { color: MID, alpha: 0.18, seed: 300 });
    const pts = F.mixModel(ctx, [bx + 20, by + 50, bw - 40, bh - 60], t, phH, phC, ampH, ampC, k, { r: 17 });
    F.box(ctx, bx, by, bw, bh, { fill: false, seed: 301 });
    // ısı okları: sıcak → komşu soğuk tanecik
    const ak = Math.min(E.se(t, sf + 0.8, sf + 1.6), 1 - E.se(t, sq + 1.0, sq + 2.2));
    if (ak > 0) { ctx.save(); ctx.globalAlpha = ak; [7, 19, 33, 45, 58, 71, 86].forEach((i, j) => { const a = pts[i], b = pts[i + 1]; if (!a || !b) return; const hot = a[2] ? a : b, cold = a[2] ? b : a; F.heatArrow(ctx, [hot[0] - 6, hot[1] - 26], [cold[0] + 6, cold[1] - 26], 1, { t, w: 4.5, amp: 5, waves: 2, head: 14, seed: 310 + j }); }); ctx.restore(); }
    // açıklama etiketleri
    const lk = E.se(t, sx + 1.0, sx + 1.8) * (1 - E.se(t, sq, sq + 0.8));
    if (lk > 0) { ctx.save(); ctx.globalAlpha = lk;
      F.particle(ctx, 250, 880, 14, 0, { fill: '#EBC3B6', color: F.HEAT }); INK.label(ctx, 'sıcak sudan: hızlı', 275, 892, { size: 34, weight: 700, color: F.HEAT });
      F.particle(ctx, 580, 880, 14, 0, { fill: '#BFD6E3', color: PAL.water }); INK.label(ctx, 'soğuk sudan: yavaş', 605, 892, { size: 34, weight: 700, color: PAL.water });
      ctx.restore(); }
    const ek = E.se(t, sq + 1.4, sq + 2.2);
    if (ek > 0) INK.label(ctx, 'hepsi aynı ortalama hızda', 520, 892, { size: 36, weight: 700, align: 'center', color: MID, alpha: ek * (1 - E.se(t, E.s('ideal') - 0.3, E.s('ideal') + 0.3)) });
    INK.label(ctx, '(model; çizim ölçekli değildir)', 520, 300, { size: 28, align: 'center', alpha: 0.6 });
  }
  function graph(ctx, t) {
    const sf = E.s('flow'), sq = E.s('equil');
    const gk = E.se(t, E.s('explain') + 2.0, E.s('explain') + 3.0); if (gk <= 0) return;
    const k = E.se(t, sf + 0.5, sq + 2.0, 'sine');
    ctx.save(); ctx.globalAlpha = gk;
    F.graph(ctx, 1080, 800, 700, 470, [{ f: hotF, color: F.HEAT }, { f: coldF, color: PAL.water }], k);
    INK.label(ctx, 'sıcak su', 1130, 800 - 60 / 70 * 470 - 16, { size: 34, weight: 700, color: F.HEAT });
    INK.label(ctx, 'soğuk su', 1130, 800 - 20 / 70 * 470 + 44, { size: 34, weight: 700, color: PAL.water });
    const hk = E.se(t, sf + 2.5, sf + 3.5) * (1 - E.se(t, sq + 1, sq + 2));
    if (hk > 0) { ctx.save(); ctx.globalAlpha *= hk; INK.label(ctx, 'ısı verir ↓', 1400, 800 - 57 / 70 * 470, { size: 36, weight: 700, color: F.HEAT }); INK.label(ctx, 'ısı alır ↑', 1400, 800 - 18 / 70 * 470 + 30, { size: 36, weight: 700, color: PAL.water }); ctx.restore(); }
    const dk = E.se(t, sq + 1.4, sq + 2.4);
    if (dk > 0) { const y = 800 - 40 / 70 * 470; ctx.save(); ctx.globalAlpha *= dk; dashed(ctx, F.linePts([1080, y], [1760, y]), { w: 2.4, on: 12, off: 8, color: MID }); INK.label(ctx, 'termal denge (40 °C)', 1560, y - 20, { size: 36, weight: 700, align: 'center', color: MID }); ctx.restore(); }
    ctx.restore();
  }
  function ideal(ctx, t) {
    const si = E.s('ideal');
    const k = E.se(t, si + 0.2, si + 0.9, 'out'); if (k <= 0) return;
    ctx.save(); ctx.translate(1420, 520); ctx.scale(P.pop(k), P.pop(k));
    F.card(ctx, 0, 0, 760, 560, { seed: 320 });
    INK.label(ctx, 'hesap (eşit miktar su):', 0, -190, { size: 38, align: 'center', alpha: 0.8 });
    INK.label(ctx, '(20 + 60) ÷ 2 = 40 °C', 0, -120, { size: 56, weight: 700, align: 'center' });
    INK.label(ctx, 'ölçüm:', 0, -30, { size: 38, align: 'center', alpha: 0.8 * E.se(t, si + 2.4, si + 3) });
    INK.label(ctx, '39 °C', 0, 40, { size: 56, weight: 700, align: 'center', color: MID, alpha: E.se(t, si + 2.4, si + 3) });
    const pk = E.se(t, si + 5.0, si + 5.8);
    if (pk > 0) { INK.label(ctx, 'biraz ısı kaba ve', 0, 140, { size: 42, weight: 700, align: 'center', color: F.HEAT, alpha: pk }); INK.label(ctx, 'havaya geçti', 0, 196, { size: 42, weight: 700, align: 'center', color: F.HEAT, alpha: pk }); }
    ctx.restore();
    // kaptan havaya ısı kaçışı
    const ok = E.se(t, si + 4.6, si + 5.6);
    [250, 780].forEach((x, i) => F.heatArrow(ctx, [x, 330], [x + 30, 220], ok, { t, w: 3.4, amp: 5, waves: 2, head: 12, seed: 330 + i }));
    for (let i = 0; i < 2; i++) F.heatArrow(ctx, [840, 480 + i * 180], [940, 470 + i * 180], ok, { t, w: 3.4, amp: 5, waves: 2, head: 12, seed: 335 + i });
  }
  function equal(ctx, t) {
    const se = E.s('equal');
    ctx.fillStyle = 'rgba(138,106,69,0.1)'; ctx.fillRect(0, 0, E.W, E.H);
    F.desk(ctx, 800);
    const cols = ['#557D98', '#557D98'];
    [[300, 'A'], [640, 'B']].forEach(([x, n], i) => { F.water(ctx, x, 520, 200, 250, 150, { seed: 340 + i, color: cols[i] }); F.box(ctx, x, 520, 200, 250, { fill: false, seed: 342 + i }); INK.label(ctx, '30 °C', x + 100, 470, { size: 50, weight: 700, align: 'center' }); });
    INK.label(ctx, '+', 570, 690, { size: 70, weight: 700, align: 'center' });
    P.arrow(ctx, [900, 650], [1080, 650], E.se(t, se + 1.0, se + 1.8), { w: 4, head: 16 });
    const mk = E.se(t, se + 1.6, se + 2.4);
    if (mk > 0) { ctx.save(); ctx.globalAlpha = mk; F.water(ctx, 1120, 480, 280, 290, 220, { seed: 345, color: cols[0] }); F.box(ctx, 1120, 480, 280, 290, { fill: false, seed: 346 }); INK.label(ctx, '30 °C', 1260, 430, { size: 56, weight: 700, align: 'center' }); ctx.restore(); }
    const xk = E.se(t, se + 3.0, se + 3.8);
    if (xk > 0) { ctx.save(); ctx.globalAlpha = xk; F.heatArrow(ctx, [1480, 560], [1680, 560], 1, { t, w: 4, amp: 6, head: 16 }); ctx.restore(); P.cross(ctx, 1580, 560, 60, E.se(t, se + 3.6, se + 4.2), { w: 9, color: '#A23A2A' }); P.write(ctx, 'ısı alışverişi yok', 1580, 680, E.seg(t, se + 4.0, se + 5.0), { size: 44, align: 'center' }); P.write(ctx, 'sıcaklık değişmez', 1580, 740, E.seg(t, se + 4.8, se + 5.8), { size: 44, align: 'center', color: '#8A4A10' }); }
    P.write(ctx, 'Sıcaklıkları eşitse?', 960, 250, E.seg(t, se + 0.1, se + 1.2), { size: 62, align: 'center' });
  }
  E.scene({
    name: 'Açıklama', concept: 'Isı sıcaktan soğuğa akar; termal denge', from: 'explain', to: 'ideal', trFrom: [520, 560],
    draw(ctx, t) {
      ctx.fillStyle = 'rgba(138,106,69,0.08)'; ctx.fillRect(0, 0, E.W, E.H);
      F.tga(ctx, t, 2, 1, 1030);
      model(ctx, t);
      const ai = E.se(t, E.s('ideal') - 0.2, E.s('ideal') + 0.5);
      if (ai < 1) E.layer(ctx, 1 - ai, c => graph(c, t));
      ideal(ctx, t);
    }
  });
  E.scene({ name: 'Eşit sıcaklık', concept: 'Eşit sıcaklıkta ısı alışverişi olmaz', from: 'equal', to: 'equal', trFrom: [960, 600], draw(ctx, t) { equal(ctx, t); } });
})();
