// SAHNE 4 — Âdet döngüsü kavramı (FB.6.3.5 uygulaması: "Âdet döngüsü kavramı açıklanır")
(function () {
  const { PAL, stroke, line, circlePts, wash } = INK; const K = KIT, F = F08;
  const CX = 600, CY = 545, R = 245, ROSE = '#C98A7A';
  const ang = d => -Math.PI / 2 + (d - 1) / 28 * Math.PI * 2;
  function seg(ctx, d0, d1, col, a) { const pts = []; for (let i = 0; i <= 30; i++) { const an = ang(d0 + (d1 - d0) * i / 30); pts.push([CX + Math.cos(an) * R, CY + Math.sin(an) * R]); } for (let i = 30; i >= 0; i--) { const an = ang(d0 + (d1 - d0) * i / 30); pts.push([CX + Math.cos(an) * (R - 70), CY + Math.sin(an) * (R - 70)]); } P.fillPts(ctx, pts, PAL.white); wash(ctx, pts, col, a, 7000 + d0, { bleed: 1, blooms: 0 }); stroke(ctx, pts.concat([pts[0]]), { w: 2, closed: true, dry: false, seed: 7010 + d0 }); }
  const lining = d => d <= 5 ? E.lerp(56, 10, (d - 1) / 4) : d <= 14 ? E.lerp(10, 40, (d - 5) / 9) : E.lerp(40, 58, (d - 14) / 14);
  E.scene({
    name: 'Âdet döngüsü', concept: 'Yumurta bırakılması, rahim duvarı, âdet', from: 'cycle', to: 'period', trFrom: [600, 545],
    draw(ctx, t) {
      const sc = E.s('cycle'), sp = E.s('period');
      const dd = t < sp ? E.lerp(1, 20, E.se(t, sc + 0.8, sp - 0.3, 'sine')) : E.lerp(20, 33, E.se(t, sp + 0.2, sp + 6.5, 'sine'));
      const day = ((Math.floor(dd) - 1) % 28) + 1, dc = ((dd - 1) % 28) + 1;
      // çark
      const wk = E.se(t, sc + 0.1, sc + 0.9);
      E.layer(ctx, wk, c => {
        seg(c, 1, 6, ROSE, 0.55); seg(c, 6, 14, PAL.life, 0.22); seg(c, 14, 15, PAL.light, 0.7); seg(c, 15, 29, PAL.life, 0.38);
        K.text(c, '≈ 28 gün', CX, CY + 10, { size: 60, align: 'center' });
        K.text(c, 'kişiden kişiye değişir', CX, CY + 58, { size: 30, align: 'center', alpha: 0.7 });
        // gösterge
        const an = ang(dc); line(c, [CX + Math.cos(an) * (R - 90), CY + Math.sin(an) * (R - 90)], [CX + Math.cos(an) * (R + 22), CY + Math.sin(an) * (R + 22)], { w: 5, taper: 0.1, noBoil: true });
        INK.inkDot(c, CX + Math.cos(an) * (R + 26), CY + Math.sin(an) * (R + 26), 7);
      });
      // çark etiketleri
      const L = (txt, x, y, a0, o = {}) => K.text(ctx, txt, x, y, { size: 34, alpha: E.se(t, a0, a0 + 0.7), ...o });
      L('1. gün: âdet kanaması', 700, 250, sc + 1.0, { color: '#8A4A3A' });
      L('rahim duvarı kalınlaşır', 870, 470, sc + 2.4, { color: K.LIFE_D });
      L('≈ 14. gün: yumurta bırakılır', 640, 842, sc + 3.8, { color: K.AMBER_D, align: 'left' });
      // sağ: yumurtalık + rahim duvarı kesiti
      const px = 1290, pw = 500;
      K.card(ctx, px - 40, 170, pw + 80, 675, { seed: 7100 });
      K.text(ctx, 'Gün ' + day, px + pw / 2, 250, { size: 52, align: 'center' });
      // yumurtalık ve yumurta
      const ov = K.blob(px + 120, 360, 60, 40, 7101, 0.06); P.fillPts(ctx, ov, '#F1DFC4'); wash(ctx, ov, PAL.life, 0.25, 7102, { bleed: 1, blooms: 0 }); stroke(ctx, ov, { w: 2.6, closed: true, seed: 7103 });
      K.text(ctx, 'yumurtalık', px + 200, 372, { size: 34 });
      const rel = E.se(t, sc + 3.8, sc + 5.2);
      if (rel > 0 && t < sp + 1) { const ex = E.lerp(px + 140, px + 470, rel), ey = 360 - Math.sin(rel * Math.PI) * 40; ctx.save(); ctx.globalAlpha = 1 - E.se(t, sp, sp + 1); P.fillPts(ctx, circlePts(ex, ey, 13, 13, 16), PAL.light); stroke(ctx, circlePts(ex, ey, 13, 13, 16), { w: 2, closed: true, dry: false }); ctx.restore(); }
      // rahim duvarı kesiti
      const by = 720, th = lining(dc);
      const base = [[px, by], [px + pw, by], [px + pw, by + 40], [px, by + 40]]; P.fillPts(ctx, base, F.ORG); wash(ctx, base, F.ORGW, 0.4, 7104, { bleed: 1, blooms: 0 }); stroke(ctx, base.concat([base[0]]), { w: 2.4, closed: true, seed: 7105 });
      const top = []; for (let i = 0; i <= 40; i++) { const x = px + i / 40 * pw; top.push([x, by - th * (1 + 0.08 * Math.sin(i * 1.7))]); }
      const lin = top.concat([[px + pw, by], [px, by]]); P.fillPts(ctx, lin, '#EFC9BC'); wash(ctx, lin, ROSE, 0.35, 7106, { bleed: 1, blooms: 0 }); stroke(ctx, top, { w: 2.4, seed: 7107, noBoil: true });
      K.text(ctx, 'rahim duvarı', px + pw / 2, by + 90, { size: 34, align: 'center' });
      P.arrow(ctx, [px + pw + 20, by - 5], [px + pw + 20, by - Math.max(14, th) + 4], 1, { w: 2.2, head: 8 });
      const shed = day >= 1 && day <= 5 && t > sp;
      if (shed) { const R2 = INK.rng(Math.floor(t * 4)); ctx.save(); ctx.fillStyle = '#9C5A4A'; ctx.globalAlpha = 0.55; for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.arc(px + 30 + R2() * (pw - 60), by - th - 10 - R2() * 40, 4 + R2() * 4, 0, 7); ctx.fill(); } ctx.restore(); }
      const nk = E.se(t, sp + 1.2, sp + 2.0);
      if (nk > 0) K.text(ctx, 'döllenme olmazsa → duvar atılır', px + pw / 2, 560, { size: 36, align: 'center', color: '#8A4A3A', alpha: nk });
      K.text(ctx, 'sade şema', px + pw - 10, 830, { size: 26, align: 'right', alpha: 0.5 });
    }
  });
})();
