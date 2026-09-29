// SAHNE 5 — Küçük ve büyük kan dolaşımı (kalbin odacıkları ve özel damar adları verilmez); oksijen oranı artar/azalır; renk kodu
(function () {
  const { PAL, stroke, inkDot, wash, circlePts } = INK; const K = KIT, F = F08;
  // küçük dolaşım: kalp → akciğerler → kalp ; büyük: kalp → vücut → kalp
  const SM = F.cr([[935, 480], [890, 400], [830, 320], [830, 250], [900, 215], [1020, 215], [1090, 250], [1090, 320], [1030, 400], [985, 480]], 8);
  const BG = F.cr([[990, 630], [1060, 690], [1110, 770], [1080, 835], [960, 850], [840, 835], [810, 770], [860, 690], [930, 630]], 8);
  const oxS = u => u < 0.38 ? 0 : u > 0.62 ? 1 : (u - 0.38) / 0.24, oxB = u => u < 0.38 ? 1 : u > 0.62 ? 0 : 1 - (u - 0.38) / 0.24;
  function loop(ctx, pts, k, ox, w) { const pp = F.upto(pts, k); for (let i = 0; i < pp.length - 1; i++) stroke(ctx, [pp[i], pp[i + 1]], { w, color: F.oxCol(ox(i / (pts.length - 1))), dry: false, taper: 0 }); if (k > 0.97) INK.arrowHead(ctx, pts[pts.length - 3], pts[pts.length - 1], 18, { w: 4, color: F.oxCol(ox(1)) }); }
  function meter(ctx, x, y, v, lab, k) { if (k <= 0) return; ctx.save(); ctx.globalAlpha = k; const h = 320; const fr = [[x, y], [x + 70, y], [x + 70, y + h], [x, y + h], [x, y]]; P.fillPts(ctx, fr, PAL.white, 0.9); const lv = [[x + 6, y + h - 6 - (h - 12) * v], [x + 64, y + h - 6 - (h - 12) * v], [x + 64, y + h - 6], [x + 6, y + h - 6]]; P.fillPts(ctx, lv, F.oxCol(v), 0.85); stroke(ctx, fr, { w: 3, closed: true }); ctx.restore();
    K.text(ctx, lab, x + 35, y - 60, { size: 30, align: 'center', alpha: k }); K.text(ctx, 'oksijen oranı', x + 35, y - 22, { size: 30, align: 'center', alpha: k }); }
  E.scene({
    name: 'Kan dolaşımları', concept: 'Küçük ve büyük kan dolaşımı', from: 'small', to: 'color', trFrom: [960, 540],
    draw(ctx, t) {
      const ss = E.s('small'), so = E.s('smallO2'), sb = E.s('big'), bo = E.s('bigO2'), sc = E.s('color');
      const bt = ((t % 0.8) / 0.8) < 0.3 ? Math.sin(((t % 0.8) / 0.8) / 0.3 * Math.PI) : 0;
      // akciğerler ve vücut hücreleri
      F.lung(ctx, 830, 285, 0.85, -1, { a: 0.8 }); F.lung(ctx, 1090, 285, 0.85, 1, { a: 0.8 });
      K.text(ctx, 'akciğerler', 960, 170, { size: 38, align: 'center' });
      [[850, 850], [920, 870], [1000, 870], [1070, 850]].forEach(([x, y], i) => { const c = K.blob(x, y, 36, 26, 8600 + i, 0.08); P.fillPts(ctx, c, '#EFE6CC'); wash(ctx, c, PAL.life, 0.25, 8610 + i, { bleed: 0.5, blooms: 0 }); stroke(ctx, c, { w: 1.8, closed: true, dry: false, color: '#4E6628' }); });
      K.text(ctx, 'vücut hücreleri', 1170, 880, { size: 34, color: '#4E6628' });
      const k1 = E.se(t, ss + 0.8, ss + 4.0), k2 = E.se(t, sb + 0.8, sb + 4.0);
      if (k1 > 0) loop(ctx, SM, k1, oxS, 12);
      if (k2 > 0) loop(ctx, BG, k2, oxB, 12);
      F.heart(ctx, 960, 555, 0.95, { beat: bt, vessels: false, rot: -0.2 });
      K.text(ctx, 'kalp', 960, 575, { size: 32, align: 'center', color: '#FBF8F1' });
      // akan kan
      if (k1 >= 1) for (let j = 0; j < 6; j++) { const u = ((t - ss) * 0.13 + j / 6) % 1; const p = F.at(SM, u); inkDot(ctx, p[0], p[1], 7, { color: F.oxRGB(oxS(u)) }); }
      if (k2 >= 1) for (let j = 0; j < 6; j++) { const u = ((t - sb) * 0.13 + j / 6) % 1; const p = F.at(BG, u); inkDot(ctx, p[0], p[1], 7, { color: F.oxRGB(oxB(u)) }); }
      // gaz alışverişi etiketleri
      const gk = E.se(t, ss + 4.5, ss + 5.2); if (gk > 0) { K.text(ctx, '↑ CO₂', 860, 205, { size: 28, color: F.LOW, alpha: gk }); K.text(ctx, 'O₂ ↓', 1060, 205, { size: 28, color: F.OXY, alpha: gk }); }
      const hk = E.se(t, sb + 4.5, sb + 5.2); if (hk > 0) { K.text(ctx, 'O₂, besin →', 790, 800, { size: 28, color: F.OXY, alpha: hk, align: 'right' }); K.text(ctx, '← CO₂, atık', 1160, 800, { size: 28, color: F.LOW, alpha: hk }); }
      // başlıklar
      if (k1 > 0) K.text(ctx, 'küçük kan dolaşımı', 640, 330, { size: 40, align: 'right', color: PAL.ink, alpha: E.se(t, ss + 0.5, ss + 1.2) });
      if (k1 > 0) K.text(ctx, 'kalp → akciğerler → kalp', 640, 380, { size: 32, align: 'right', alpha: 0.8 * E.se(t, ss + 1.5, ss + 2.2) });
      if (k2 > 0) K.text(ctx, 'büyük kan dolaşımı', 1250, 680, { size: 40, color: PAL.ink, alpha: E.se(t, sb + 0.5, sb + 1.2) });
      if (k2 > 0) K.text(ctx, 'kalp → vücut → kalp', 1250, 725, { size: 32, alpha: 0.8 * E.se(t, sb + 1.5, sb + 2.2) });
      // oksijen ölçerleri
      meter(ctx, 250, 520, E.lerp(0.15, 0.95, E.se(t, so + 0.8, so + 3)), 'küçük dolaşımda', E.se(t, so + 0.2, so + 0.8));
      if (t > so + 3) K.text(ctx, 'artar ↑', 360, 870, { size: 38, color: F.OXY, alpha: E.se(t, so + 3, so + 3.6) });
      meter(ctx, 1560, 300, E.lerp(0.95, 0.15, E.se(t, bo + 0.8, bo + 3)), 'büyük dolaşımda', E.se(t, bo + 0.2, bo + 0.8) * (1 - E.se(t, sc - 0.2, sc + 0.3)));
      if (t > bo + 3 && t < sc + 0.3) K.text(ctx, 'azalır ↓', 1650, 690, { size: 38, color: F.LOW, alpha: E.se(t, bo + 3, bo + 3.6) * (1 - E.se(t, sc - 0.2, sc + 0.3)) });
      // renk kodu
      const ck = E.se(t, sc + 0.3, sc + 1.0, 'out');
      if (ck > 0) E.layer(ctx, ck, c => { K.card(c, 1360, 190, 500, 420, { seed: 8620 });
        K.text(c, 'Renk kodu', 1400, 260, { size: 44, color: K.AMBER_D });
        [[F.OXY, 'oksijeni çok kan'], [F.LOW, 'oksijeni az kan'], ['#6E1A16', 'gerçek renk: koyu kırmızı']].forEach(([col, lab], i) => { const kk = E.se(t, sc + 1 + i * 1.5, sc + 1.6 + i * 1.5); c.save(); c.globalAlpha *= kk; P.fillPts(c, K.rrect(1425, 335 + i * 90, 50, 40, 8), col, 0.95); c.restore(); K.text(c, lab, 1470, 348 + i * 90, { size: 32, alpha: kk, maxW: 370 }); });
        K.text(c, 'mavi yalnızca şema rengidir', 1400, 585, { size: 28, alpha: 0.75 * E.se(t, sc + 4.5, sc + 5.2) }); });
      INK.label(ctx, 'şema · ölçekli değildir', 60, 205, { size: 28, alpha: 0.55 });
    }
  });
})();
