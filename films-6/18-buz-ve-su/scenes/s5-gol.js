// SAHNE 5 — Göller yüzeyden donar; buz örtüsü alttaki suyu korur, canlılar yaşar (FB.6.5.5 c) · "Buz batsaydı?" beyin fırtınası
(function () {
  const { PAL, stroke, line, wash } = INK;
  const F = F618, RED = F.RED;
  // göl kesiti: x0..x1, yüzey wy, dip by. mode 'real' | 'sink'. k: animasyon 0..1
  function lake(ctx, t, x0, x1, wy, by, mode, k) {
    const w = x1 - x0;
    const basin = [[x0, wy]].concat(P.bez([x0 + w * 0.04, wy], [x0 + w * 0.12, by + 40], [x0 + w * 0.5, by], 20)).concat(P.bez([x0 + w * 0.5, by], [x0 + w * 0.88, by + 40], [x1 - w * 0.04, wy], 20)).concat([[x1, wy]]);
    // zemin (havza altı)
    ctx.save(); ctx.beginPath(); ctx.rect(x0 - 40, wy - 20, w + 80, by - wy + 120); ctx.clip();
    P.fillPts(ctx, [[x0 - 30, wy]].concat(basin).concat([[x1 + 30, wy], [x1 + 30, by + 100], [x0 - 30, by + 100]]), '#C9B28A', 0.9);
    ctx.restore();
    wash(ctx, basin, PAL.water, 0.4, 2052 + (mode === 'sink' ? 5 : 0), { bleed: 2, blooms: 2 });
    stroke(ctx, basin.slice(1, -1), { w: 3, seed: 2053 });
    line(ctx, [x0 - 30, wy], [x0 + 10, wy], { w: 3 }); line(ctx, [x1 - 10, wy], [x1 + 30, wy], { w: 3 });
    // bitkiler, balıklar
    const alive = mode === 'real' ? 1 : 1 - k;
    F.weed(ctx, x0 + w * 0.3, by - 4, 110, t, 1); F.weed(ctx, x0 + w * 0.66, by - 2, 90, t, 2);
    F.fish(ctx, x0 + w * 0.42 + Math.sin(t * 0.6) * w * 0.08, (wy + by) / 2 + 30, 0.9, Math.cos(t * 0.6) > 0 ? 1 : -1, t, '#C98A3A');
    F.fish(ctx, x0 + w * 0.6 - Math.sin(t * 0.5 + 1) * w * 0.07, by - 90, 0.7, Math.cos(t * 0.5 + 1) > 0 ? -1 : 1, t + 1, '#B5553F');
    // buz
    if (mode === 'real') {
      const th = 34 * k;
      if (th > 0) { const ice = F.rect(x0 + 2, wy, x1 - 2, wy + th); P.fillPts(ctx, ice, F.ICE, 0.95); wash(ctx, ice, PAL.water, 0.18, 2054, { bleed: 1, blooms: 0 }); stroke(ctx, ice, { w: 2.4, closed: true, dry: false, color: '#3E6E88' }); }
    } else {
      // buz dipte birikir ve yukarı doğru büyür
      const lv = by - (by - wy) * 0.85 * k;
      ctx.save(); ctx.beginPath(); P.path(ctx, basin); ctx.closePath(); ctx.clip();
      const ice = F.rect(x0, lv, x1, by + 60); P.fillPts(ctx, ice, F.ICE, 0.92); wash(ctx, ice, PAL.water, 0.2, 2055, { bleed: 1, blooms: 0 });
      line(ctx, [x0, lv], [x1, lv], { w: 2.4, color: '#3E6E88', dry: false });
      ctx.restore();
      if (k > 0.6) P.cross(ctx, x0 + w * 0.5, (wy + by) / 2 - 10, 60, E.seg(k, 0.6, 1), { w: 9, color: RED });
    }
  }
  E.scene({
    name: 'Göl ve canlılar', concept: 'Yoğunluk farkının canlılar için önemi', from: 'lake', to: 'whatif', trFrom: [960, 450],
    draw(ctx, t) {
      const sl = E.s('lake'), sw = E.s('whatif');
      const g = ctx.createLinearGradient(0, 0, 0, 420); g.addColorStop(0, 'rgba(46,106,140,0.22)'); g.addColorStop(1, 'rgba(46,106,140,0.04)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, 420);
      F.flakes(ctx, t, 22, 7);
      const split = E.se(t, sw - 0.3, sw + 0.9);
      const x1 = E.lerp(1760, 900, split);
      const ki = E.se(t, sl + 0.6, sl + 3.0);
      lake(ctx, t, 160, x1, 400, 820, 'real', ki);
      // etiketler (tam genişlikte)
      const kl = 1 - split;
      if (kl > 0) {
        ctx.save(); ctx.globalAlpha *= kl;
        P.write(ctx, 'hava: −10 °C', 1560, 300, E.seg(t, sl + 0.8, sl + 1.8), { size: 44, align: 'center' });
        INK.leader(ctx, [620, 300], [700, 410]); P.write(ctx, 'buz örtüsü (yüzeyde)', 420, 290, E.seg(t, sl + 2.4, sl + 3.6), { size: 42, align: 'center', color: '#3E6E88' });
        P.write(ctx, 'derinlerde su donmaz (≈ 4 °C)', 1180, 740, E.seg(t, sl + 5.0, sl + 6.4), { size: 42, align: 'center', color: PAL.water });
        P.write(ctx, 'canlılar yaşar', 760, 610, E.seg(t, sl + 7.0, sl + 8.0), { size: 42, align: 'center', color: PAL.life });
        ctx.restore();
      }
      if (split > 0) {
        E.layer(ctx, split, c => {
          lake(c, t, 1020, 1760, 400, 820, 'sink', E.se(t, sw + 1.6, sw + 5.0));
          P.write(c, 'Buz batsaydı?', 1390, 300, E.seg(t, sw + 0.6, sw + 1.6), { size: 52, align: 'center', color: RED });
          P.write(c, 'Gerçekte:', 530, 300, E.seg(t, sw + 0.6, sw + 1.6), { size: 52, align: 'center', color: PAL.life });
          P.write(c, 'dipten donardı', 1390, 890, E.seg(t, sw + 3.0, sw + 4.2), { size: 40, align: 'center' });
          P.write(c, 'yüzeyden donar', 530, 890, E.seg(t, sw + 1.8, sw + 3.0), { size: 40, align: 'center' });
        });
      }
      INK.label(ctx, '(çizim ölçekli değildir)', 1860, 200, { size: 26, align: 'right', alpha: 0.55 });
    }
  });
})();
