// SAHNE 2 — Tanımlar: kütle (madde miktarı, kg/g, eşit kollu terazi) ve ağırlık (yer çekimi kuvveti, N, dinamometre)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const BR = '#8A4A10';
  function appleDots(ctx, x, y, r, k) { const b = INK.wobble(circlePts(x, y, r, r * 0.9, 50), 1.5, 4201); P.fillPts(ctx, b, '#F2D3B8'); INK.wash(ctx, b, '#B5553F', 0.45, 4202, { bleed: 2 }); stroke(ctx, b, { w: 3, closed: true }); const R = INK.rng(9); ctx.save(); ctx.globalAlpha *= k; for (let i = 0; i < 40; i++) { const a = R() * 6.28, d = Math.sqrt(R()) * r * 0.8; P.fillPts(ctx, circlePts(x + Math.cos(a) * d, y + Math.sin(a) * d * 0.9, 5, 5, 10), PAL.water, 0.6); } ctx.restore(); }
  E.scene({
    name: 'Tanımlar', concept: 'Kütle ve ağırlığın özellikleri', from: 'mass', to: 'weight', trFrom: [960, 540],
    draw(ctx, t) {
      const sm = E.s('mass'), sw = E.s('weight');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 90, 1620, 820);
      line(ctx, [960, 140], [962, 880], { w: 2, dry: false, alpha: 0.5 });
      // KÜTLE
      P.write(ctx, 'KÜTLE', 580, 200, E.seg(t, sm + 0.2, sm + 1.0), { size: 70, align: 'center', color: PAL.water });
      const ak = E.se(t, sm + 0.8, sm + 1.6);
      if (ak > 0) { ctx.save(); ctx.globalAlpha = ak; appleDots(ctx, 400, 380, 90, E.se(t, sm + 1.6, sm + 3.0)); ctx.restore(); }
      P.write(ctx, 'madde miktarı', 540, 370, E.seg(t, sm + 1.6, sm + 2.8), { size: 46 });
      P.write(ctx, 'birimi: kilogram (kg), gram (g)', 280, 560, E.seg(t, sm + 3.6, sm + 5.0), { size: 40 });
      P.write(ctx, 'ölçme aracı:', 280, 640, E.seg(t, sm + 5.4, sm + 6.2), { size: 40 });
      const bk = E.se(t, sm + 5.8, sm + 6.6);
      if (bk > 0) { ctx.save(); ctx.globalAlpha = bk; F07.balance(ctx, 680, 860, { s: 0.55 }); ctx.restore(); INK.label(ctx, 'eşit kollu terazi', 290, 700, { size: 36, weight: 700, alpha: bk }); }
      // AĞIRLIK
      P.write(ctx, 'AĞIRLIK', 1340, 200, E.seg(t, sw + 0.2, sw + 1.0), { size: 70, align: 'center', color: BR });
      const wk = E.se(t, sw + 0.8, sw + 1.6);
      if (wk > 0) {
        ctx.save(); ctx.globalAlpha = wk;
        appleDots(ctx, 1110, 340, 70, 0);
        line(ctx, [1020, 480], [1200, 480], { w: 3, dry: false }); INK.hatch(ctx, 1020, 494, 180, 20, { n: 8 });
        P.arrow(ctx, [1110, 350], [1110, 470], E.se(t, sw + 1.4, sw + 2.2), { w: 5, head: 18, color: BR });
        ctx.restore();
      }
      P.write(ctx, 'yer çekiminin', 1230, 330, E.seg(t, sw + 1.8, sw + 2.8), { size: 44 });
      P.write(ctx, 'uyguladığı kuvvet', 1230, 385, E.seg(t, sw + 2.6, sw + 3.6), { size: 44 });
      P.write(ctx, 'birimi: Newton (N)', 1040, 560, E.seg(t, sw + 3.8, sw + 5.0), { size: 40 });
      P.write(ctx, 'ölçme aracı:', 1040, 640, E.seg(t, sw + 5.4, sw + 6.2), { size: 40 });
      const dk = E.se(t, sw + 5.8, sw + 6.6);
      if (dk > 0) { ctx.save(); ctx.globalAlpha = dk; ctx.translate(1480, 560); ctx.scale(0.55, 0.55); ctx.translate(-1480, -560); const r = F07.dyn(ctx, 1480, 560, { L: 380, W: 80, max: 10, F: 1 }); F07.apple(ctx, 1480, r.hook[1] - 4, 0.9); ctx.restore(); INK.label(ctx, 'dinamometre', 1040, 700, { size: 36, weight: 700, alpha: dk }); }
    }
  });
})();
