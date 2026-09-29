// SAHNE 6 — Bazların cam/porselen/seramiğe etkisi · saklama ve taşıma · kimyasal tepkime vurgusu · temizlik ürünlerini karıştırma uyarısı
(function () {
  const { PAL, line, circlePts, rng } = INK;
  const U = U5;
  const BY = 800;
  function glass(ctx, cx, by, s, haze) {
    const g = [[cx - 60 * s, by - 200 * s], [cx + 60 * s, by - 200 * s], [cx + 48 * s, by], [cx - 48 * s, by], [cx - 60 * s, by - 200 * s]];
    P.fillPts(ctx, g, '#DCE7EC', 0.25);
    if (haze > 0) { P.fillPts(ctx, g, '#FFFFFF', 0.55 * haze); const r = rng(6500); ctx.save(); ctx.globalAlpha *= haze * 0.5; ctx.fillStyle = '#B8B4AA'; for (let i = 0; i < 160; i++) { ctx.fillRect(cx + (r() - 0.5) * 100 * s, by - r() * 196 * s, 2, 2); } ctx.restore(); }
    INK.stroke(ctx, g, { w: 3, closed: true, seed: 6501 });
    if (!haze) line(ctx, [cx + 34 * s, by - 170 * s], [cx + 28 * s, by - 40 * s], { w: 4, color: PAL.white, dry: false, alpha: 0.9 });
  }
  function can(ctx, cx, by, s) { const b = U.rect(cx - 55 * s, by - 150 * s, cx + 55 * s, by); P.fillPts(ctx, b, '#A7ADB4'); INK.wash(ctx, b, '#6E7680', 0.3, 6510, { bleed: 1, blooms: 0 }); INK.stroke(ctx, b, { w: 3, closed: true, dry: false }); INK.stroke(ctx, circlePts(cx, by - 150 * s, 55 * s, 12 * s, 24), { w: 2.4, closed: true, dry: false }); }
  E.scene({
    name: 'Bazlar ve güvenlik', concept: 'Bazların etkisi, saklama, karıştırmama', from: 'base', to: 'mix', trFrom: [960, 540],
    draw(ctx, t) {
      const sb = E.s('base'), ss = E.s('store'), sc = E.s('chem'), sm = E.s('mix');
      U.bench(ctx, -40, 1960, BY, 2401);
      // bardaklar
      const bk = Math.min(E.se(t, sb + 0.2, sb + 0.8), 1 - E.se(t, ss - 0.2, ss + 0.3));
      if (bk > 0) E.layer(ctx, bk, c => {
        glass(c, 520, BY, 1.3, 0); glass(c, 900, BY, 1.3, E.se(t, sb + 2.5, sb + 5.0));
        U.txt(c, 'yeni bardak', 520, BY + 60, { size: 36, align: 'center' });
        U.txt(c, 'zamanla matlaşmış', 900, BY + 60, { size: 36, align: 'center' });
        U.card(c, 1100, 260, 560, 250, { seed: 6520 });
        P.write(c, 'bazlar →', 1140, 330, E.seg(t, sb + 0.8, sb + 1.6), { size: 44, color: U.BASE });
        P.write(c, 'cam, porselen, seramik', 1160, 400, E.seg(t, sb + 1.6, sb + 2.8), { size: 40 });
        P.write(c, 'bulaşık deterjanı (bazik)', 1160, 470, E.seg(t, sb + 4.2, sb + 5.4), { size: 34, color: PAL.inkSoft });
      });
      // saklama rafı
      const sk = Math.min(E.se(t, ss + 0.2, ss + 0.8), 1 - E.se(t, sm - 0.2, sm + 0.3));
      if (sk > 0) E.layer(ctx, sk, c => {
        can(c, 420, BY, 1.1); U.txt(c, 'asit', 420, BY - 190, { size: 40, align: 'center', color: U.ACID }); U.txt(c, 'metal kap', 420, BY + 60, { size: 36, align: 'center' });
        P.cross(c, 420, BY - 80, 70, E.se(t, ss + 1.2, ss + 1.8), { color: U.RED, w: 9 });
        U.product(c, 820, BY, 1.0, { col: '#DCE7EC', cap: '#8C9198', label: 'CAM', seed: 6530, w: 110, h: 220 }); U.txt(c, 'güçlü baz', 820, BY - 290, { size: 40, align: 'center', color: U.BASE }); U.txt(c, 'cam şişe', 820, BY + 60, { size: 36, align: 'center' });
        P.cross(c, 820, BY - 100, 70, E.se(t, ss + 2.6, ss + 3.2), { color: U.RED, w: 9 });
        U.product(c, 1220, BY, 1.0, { col: '#F4F1EA', cap: '#3E7F5C', label: 'ETİKETLİ', sub: 'uygun kap', subSize: 22, seed: 6540, w: 120, h: 220, ghs: 'corr' }); U.txt(c, 'uygun, kapalı, etiketli kap', 1220, BY + 60, { size: 34, align: 'center' });
        P.check(c, 1220, BY - 300, 70, E.se(t, ss + 4.0, ss + 4.6), { color: PAL.life, w: 8 });
      });
      const ck = Math.min(E.se(t, sc + 0.2, sc + 0.8), 1 - E.se(t, sm - 0.2, sm + 0.3));
      if (ck > 0) E.layer(ctx, ck, c => { U.card(c, 360, 190, 1100, 120, { seed: 6550, tint: PAL.light, tintA: 0.16 }); U.txt(c, 'Hepsi kimyasal tepkime: yeni maddeler oluşur.', 910, 268, { size: 46, align: 'center' }); });
      // karıştırma uyarısı
      const mk = E.se(t, sm + 0.2, sm + 0.8, 'out');
      if (mk > 0) E.layer(ctx, mk, c => {
        const card = [[240, 190], [1520, 184], [1526, 760], [244, 764], [240, 190]];
        c.save(); c.shadowColor = 'rgba(60,20,10,0.25)'; c.shadowBlur = 24; P.fillPts(c, card, '#FBF2EC'); c.restore();
        INK.stroke(c, card, { w: 3.4, closed: true, color: U.RED, seed: 6560 });
        U.txt(c, '⚠  TEMİZLİK ÜRÜNLERİNİ ASLA KARIŞTIRMA!', 880, 262, { size: 50, align: 'center', color: U.RED });
        U.product(c, 460, 680, 1.0, { col: '#DDE9F2', cap: '#3D6FBE', label: 'ÇAMAŞIR SUYU', seed: 6570, w: 130, h: 250, ghs: 'corr' });
        U.txt(c, '+', 680, 560, { size: 90, align: 'center' });
        U.product(c, 900, 680, 1.0, { col: '#F2E6D0', cap: '#B8406E', label: 'TUZ RUHU', seed: 6580, w: 120, h: 250, ghs: 'corr' });
        P.cross(c, 680, 520, 150, E.se(t, sm + 2.2, sm + 2.8), { color: U.RED, w: 14 });
        P.write(c, 'zehirli gaz çıkar!', 1040, 440, E.seg(t, sm + 3.4, sm + 4.4), { size: 44, color: U.RED });
        P.write(c, 'etiketi oku · ağzı kapalı sakla', 1050, 520, E.seg(t, sm + 4.6, sm + 5.8), { size: 32 });
      });
      U.damla(ctx, t, { x: 1760, y: BY, s: 0.9, flip: true, expr: t > sm ? 'determined' : 'curious', look: [-0.9, 0], arms: t > sm ? [[-1, 0.4], [1, 2.3]] : [[-1, 1.3], [1, 0.4]] });
    }
  });
})();
