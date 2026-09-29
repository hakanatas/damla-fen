// SAHNE 4 — FB.8.3.2 b, c: model kurma → ilk deneme (rastgele eşleşme) → kanıt (A–T, G–C) → modeli yenileme → bağlar → çift sarmal
(function () {
  const { PAL, stroke, line, circlePts, wash } = INK; const K = KIT, F = G8;
  const SEQ = 'ATGCCGTA';
  const WR = ['C', 'C', 'A', 'G', 'T', 'C', 'T', 'G'];    // ilk denemedeki (rastgele) eşler; 3. ve 5. satır tesadüfen doğru
  const OK = SEQ.split('').map((b, i) => F.PAIR[b] === WR[i]);
  const LAD = { x: 700, y: 235, n: 8, gap: 80, u: 92, h: 15, seq: SEQ, detail: true, ds: 1.15 };
  function materials(c, t) {
    const x = 1230, y = 800;
    for (let i = 0; i < 4; i++) line(c, [x - 120, y - 40 + i * 12], [x + 60, y - 70 + i * 12], { w: 7, color: i % 2 ? '#C9B79A' : '#D9C9A8', dry: false, taper: 0.02, seed: 800 + i });
    ['A', 'T', 'G', 'C'].forEach((b, i) => { const q = [[x + 90 + i * 44, y - 50], [x + 126 + i * 44, y - 54], [x + 128 + i * 44, y - 10], [x + 92 + i * 44, y - 8], [x + 90 + i * 44, y - 50]]; P.fillPts(c, q, PAL.white); wash(c, q, F.BC[b], 0.8, 810 + i, { bleed: 0.5, blooms: 0 }); stroke(c, q, { w: 1.8, closed: true, dry: false }); });
    K.text(c, 'pipet · renkli karton', x + 60, y + 40, { size: 32, align: 'center', alpha: 0.7 });
  }
  E.scene({
    name: 'DNA modeli', concept: 'Model kurma ve yenileme', from: 'build', to: 'helix', trFrom: [960, 540],
    draw(ctx, t) {
      const sb = E.s('build'), st = E.s('try'), se = E.s('evid'), sr = E.s('revise'), sbo = E.s('bonds'), sh = E.s('helix');
      ctx.fillStyle = 'rgba(111,138,58,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
      const ladA = 1 - E.se(t, sh + 0.2, sh + 1.2);
      if (ladA > 0) E.layer(ctx, ladA, c => {
        const show = E.lerp(0, 8, E.seg(t, sb + 1.0, sb + 5.5));
        const rows = F.dna(c, Object.assign({}, LAD, { show, R: { k: 0 } }));
        const wk = E.se(t, st + 0.3, st + 1.8), fix = E.se(t, sr + 0.3, sr + 1.8);
        if (wk > 0 && fix < 1) F.dna(c, Object.assign({}, LAD, { L: { k: 0 }, R: { k: wk * (1 - fix) }, partners: WR }));
        if (fix > 0) F.dna(c, Object.assign({}, LAD, { L: { k: 0 }, R: { k: fix } }));
        // yanlış işaretleri / doğru işaretleri
        rows.forEach((r, i) => {
          if (!OK[i]) { const xk = E.se(t, st + 2.2 + i * 0.25, st + 2.7 + i * 0.25) * (1 - fix); if (xk > 0) { c.save(); c.globalAlpha *= xk; P.cross(c, 930, r.y, 16, 1, { color: K.RED, w: 4.5 }); c.restore(); } }
          P.check(c, 932, r.y - 4, 34, E.se(t, sr + 2.0 + i * 0.15, sr + 2.5 + i * 0.15) * (1 - E.se(t, sbo, sbo + 0.5)), { color: K.LIFE_D, w: 4.5 });
        });
        if (t > st + 4 && t < sr + 1) E.inkText(c, 'eşit değil, oturmuyor!', 1010, 600, t, st + 4, sr + 1, { size: 42, color: K.RED });
        // bağlar
        const bk = E.se(t, sbo + 0.3, sbo + 1.3);
        if (bk > 0) {
          c.save(); c.globalAlpha *= bk; const pul = 0.7 + 0.3 * Math.sin(t * 5);
          rows.forEach((r, i) => {
            const jx = r.xl + F.BL[r.b] * LAD.u; // bazların birleştiği yer
            for (let d = -1; d <= 1; d++) INK.inkDot(c, jx, r.y + d * 7, 2.6, { color: '192,127,30' });
            if (i < rows.length - 1) [r.xl, r.xr].forEach(xx => { c.save(); c.globalAlpha *= 0.5 * pul; P.fillPts(c, circlePts(xx, r.y + LAD.gap / 2, 22, 22, 20), PAL.light); c.restore(); });
          });
          F.tag(c, 'nükleotidler arası bağlar', [1130, 330], [(rows[2].xr + 4), rows[2].y + LAD.gap / 2], E.se(t, sbo + 1.2, sbo + 2.0), { size: 40, align: 'left' });
          F.tag(c, 'iki zinciri bir arada tutan bağlar', [960, 790], [rows[5].xl + F.BL[rows[5].b] * LAD.u, rows[5].y], E.se(t, sbo + 2.4, sbo + 3.2), { size: 38, align: 'left', dy: 44 });
          c.restore();
        }
        // kenar etiketleri (yenileme sonrası)
        const lk = E.se(t, sr + 3.0, sr + 3.8) * (1 - E.se(t, sbo, sbo + 0.5));
        if (lk > 0) { c.save(); c.globalAlpha *= lk; F.tag(c, 'şeker–fosfat', [300, 290], [rows[1].xl - 6, rows[1].y + 38], 1, { size: 38 }); K.text(c, 'kenarı', 300, 334, { size: 38, align: 'center' });
          F.tag(c, 'baz çifti', [300, 700], [rows[5].xl + 60, rows[5].y + 8], 1, { size: 38, dy: 44 }); c.restore(); }
      });
      // malzemeler
      const mk = Math.min(E.se(t, sb + 0.5, sb + 1.3), 1 - E.se(t, se - 0.3, se + 0.4));
      if (mk > 0) E.layer(ctx, mk, c => materials(c, t));
      // kanıt kartı
      const ek = Math.min(E.se(t, se + 0.2, se + 1.0, 'out'), 1 - E.se(t, sbo - 0.3, sbo + 0.3));
      if (ek > 0) E.layer(ctx, ek, c => {
        K.card(c, 1100, 180, 520, 330, { seed: 820, tint: PAL.life, tintA: 0.1 });
        P.icon.books(c, 1190, 250, 0.45); K.text(c, 'Kaynaklara göre:', 1260, 262, { size: 40 });
        [['A', 335], ['G', 440]].forEach(([b, y], i) => {
          const xa = 1190, u = 60; F.base(c, b, xa, y, 0, u, 16, { seed: 830 + i }); F.base(c, F.PAIR[b], xa + 2 * u, y, Math.PI, u, 16, { seed: 840 + i });
          K.text(c, F.BN[b] + ' – ' + F.BN[F.PAIR[b]], 1340, y + 12, { size: 36, maxW: 265 });
        });
      });
      // çift sarmal
      const hk = E.se(t, sh + 0.2, sh + 1.2);
      if (hk > 0) E.layer(ctx, hk, c => {
        const tw = E.se(t, sh + 0.8, sh + 4.0);
        F.dna(c, { x: 760, y: 215, n: 14, gap: 46, u: 72, h: 13, seq: 'ATGCCGTAGCATTG', twist: tw, phase: 0.2 + tw * (t - sh) * 0.9 });
        const lk = E.se(t, sh + 4.2, sh + 5.0);
        if (lk > 0) { c.save(); c.globalAlpha *= lk; K.text(c, 'çift sarmal', 1130, 470, { size: 58, color: K.LIFE_D }); K.text(c, '(çizim ölçekli değildir)', 1130, 525, { size: 30, alpha: 0.6 }); c.restore(); }
      });
      // Damla
      const cheer = t > sh + 4.5, sad = t > st + 3.5 && t < se;
      K.damla(ctx, t, { x: 1640, y: 900, s: 1.2, flip: true, expr: cheer ? 'happy' : (sad ? 'surprised' : 'curious'), look: [-0.8, -0.2], talk: E.talk(t), arms: cheer ? [[-1, 2.6], [1, 2.6]] : [[-1, 0.4], [1, t > sr && t < sbo ? 1.8 : 0.6]] });
    }
  });
})();
