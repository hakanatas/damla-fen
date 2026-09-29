// SAHNE 2 — FB.8.3.1: kromozom → DNA → gen → nükleotid (hiyerarşi, büyüklük sıralamasına girilmeden), kavram haritası, benzetme, uyumlu bütün
(function () {
  const { PAL, stroke, line, circlePts, wash } = INK; const K = KIT, F = G8;
  const XS = [300, 720, 1140, 1560], CY = 430, R = 165;
  const NAMES = ['Kromozom', 'DNA', 'Gen', 'Nükleotid'];
  const LINKS = ['içerir', 'bölümleri', 'yapı birimi'];
  const ANA = ['kitap', 'kitabın metni', 'bir cümle', 'bir harf'];
  function lens(c, i, fn) { // dairesel büyüteç penceresi
    const x = XS[i]; const cp = circlePts(x, CY, R, R, 70);
    P.fillPts(c, cp, '#FBF8F1', 1);
    c.save(); P.path(c, cp); c.clip(); fn(c, x); c.restore();
    stroke(c, cp, { w: 4, closed: true, seed: 700 + i });
  }
  function content(c, i, t, x) {
    if (i === 0) { wash(c, circlePts(x, CY, R, R, 40), F.NUC, 0.14, 710, { bleed: 2, blooms: 1 });
      F.chromo(c, x - 90, CY + 70, 90, F.CH2, { dup: true, rot: 0.5, w: 22 }); F.chromo(c, x + 100, CY - 80, 70, F.CH1, { dup: true, rot: -0.7, w: 20 });
      F.chromo(c, x + 10, CY + 10, 190, F.CH1, { dup: true, rot: 0.15, w: 36 }); }
    if (i === 1) { const ph = t * 0.9; F.dna(c, { x, y: CY - 150, n: 11, gap: 30, u: 38, h: 8, seq: 'ATGCGTACCGA', twist: 1, phase: ph, letters: false }); }
    if (i === 2) { const seq = 'CATGGCTAG';
      const gb = [[x - 150, CY - 118], [x + 150, CY - 118], [x + 150, CY + 62], [x - 150, CY + 62], [x - 150, CY - 118]];
      c.save(); c.globalAlpha *= E.se(t, E.s('gene') + 1.5, E.s('gene') + 2.5); wash(c, gb, PAL.light, 0.35, 720, { bleed: 2, blooms: 0 }); c.restore();
      F.dna(c, { x, y: CY - 170, n: 9, gap: 45, u: 46, h: 11, seq, letters: true });
      if (t > E.s('gene') + 1.5) { c.save(); c.globalAlpha *= E.se(t, E.s('gene') + 1.5, E.s('gene') + 2.5); line(c, [x + 132, CY - 112], [x + 132, CY + 56], { w: 4, color: '#8A4A10' }); K.text(c, 'gen', x + 118, CY - 20, { size: 34, align: 'right', color: '#8A4A10' }); c.restore(); }
    }
    if (i === 3) F.nucleotide(c, x - 30, CY + 20, 0.95, 'G', { seed: 9 });
  }
  function analogy(c, i, x, t) {
    const a = E.s('analogy');
    if (i === 0) { P.icon.books(c, x, CY + 20, 1.2); }
    if (i === 1) { const pg = [[x - 110, CY - 120], [x + 110, CY - 120], [x + 110, CY + 120], [x - 110, CY + 120], [x - 110, CY - 120]]; P.fillPts(c, pg, PAL.white); stroke(c, pg, { w: 2.6, closed: true, seed: 730 });
      for (let j = 0; j < 8; j++) line(c, [x - 88, CY - 92 + j * 28], [x + 88 - (j % 3) * 22, CY - 92 + j * 28], { w: 2, alpha: 0.55, dry: false, seed: 731 + j }); }
    if (i === 2) { const pg = [[x - 140, CY - 40], [x + 140, CY - 40], [x + 140, CY + 40], [x - 140, CY + 40], [x - 140, CY - 40]]; wash(c, pg, PAL.light, 0.35, 740, { bleed: 2, blooms: 0 }); K.text(c, 'Gözlerim ela.', x, CY + 14, { size: 44, align: 'center' }); }
    if (i === 3) { K.text(c, 'a', x, CY + 70, { size: 200, align: 'center', fam: 'Fraunces', weight: 600 }); }
    void a; void t;
  }
  E.scene({
    name: 'Kromozom · DNA · Gen · Nükleotid', concept: 'Hiyerarşik ilişki', from: 'chromo', to: 'whole', trFrom: [1260, 540],
    draw(ctx, t) {
      const at = ['chromo', 'dna', 'gene', 'nucl'].map(id => E.s(id)); const sh = E.s('hier'), sa = E.s('analogy'), sw = E.s('whole');
      const g = ctx.createRadialGradient(960, 480, 100, 960, 480, 1100); g.addColorStop(0, 'rgba(111,138,58,0.04)'); g.addColorStop(1, 'rgba(111,138,58,0.16)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      const anaK = E.se(t, sa + 0.3, sa + 1.3);
      for (let i = 0; i < 4; i++) {
        const k = E.se(t, at[i] + 0.2, at[i] + 1.0, 'out'); if (k <= 0) continue;
        E.layer(ctx, k, c => {
          c.save(); c.translate(XS[i], CY); const s = 0.6 + 0.4 * P.pop(k); c.scale(s, s); c.translate(-XS[i], -CY);
          lens(c, i, (cc, x) => {
            if (anaK < 1) E.layer(cc, 1 - anaK, c3 => content(c3, i, t, x));
            if (anaK > 0) E.layer(cc, anaK, c3 => analogy(c3, i, x, t));
          });
          c.restore();
          // bağlantı oku (bir öncekinden)
          if (i > 0) P.arrow(c, [XS[i - 1] + R + 8, CY], [XS[i] - R - 8, CY], E.se(t, at[i], at[i] + 0.6), { w: 3, head: 14 });
        });
        // ad → düğüm (kavram haritası)
        const nodeK = E.se(t, sh + 0.2 + i * 0.5, sh + 0.8 + i * 0.5);
        const lx = XS[i], ly = 700;
        if (nodeK <= 0) E.inkText(ctx, NAMES[i], lx, ly + 16, t, at[i] + 0.6, 1e9, { size: 50, align: 'center' });
        else K.node(ctx, NAMES[i], lx, ly, 1, { size: 48, tint: t > sw ? PAL.life : null, tintA: 0.3 * E.se(t, sw + i * 0.3, sw + 0.6 + i * 0.3), nopop: true, seed: i + 1 });
        if (i > 0) { const lk = E.se(t, sh + 0.6 + i * 0.6, sh + 1.2 + i * 0.6); if (lk > 0) { ctx.save(); ctx.globalAlpha *= lk; P.arrow(ctx, [XS[i - 1] + 118, ly], [XS[i] - 118, ly], 1, { w: 2.6, head: 12 }); K.text(ctx, LINKS[i - 1], (XS[i - 1] + XS[i]) / 2, ly - 44, { size: 30, align: 'center', color: K.LIFE_D, maxW: 250 }); ctx.restore(); } }
        // benzetme satırı
        if (anaK > 0) { ctx.save(); ctx.globalAlpha *= E.se(t, sa + 1 + i * 0.9, sa + 1.6 + i * 0.9); K.text(ctx, '≈ ' + ANA[i], XS[i], 800, { size: 42, align: 'center', color: '#8A4A10' }); ctx.restore(); }
      }
      // uyumlu bütün
      const wk = E.se(t, sw + 0.4, sw + 1.2);
      if (wk > 0) { ctx.save(); ctx.globalAlpha *= wk; P.drawOn(ctx, P.bez([230, 855], [930, 880], [1640, 855], 30), E.se(t, sw + 0.4, sw + 1.6), { w: 3, color: K.LIFE_D });
        K.text(ctx, 'Uyumlu bir bütün: kalıtım bilgisi', 960, 222, { size: 50, align: 'center', color: K.LIFE_D }); P.check(ctx, 1450, 200, 50, E.se(t, sw + 1.2, sw + 1.8), { color: K.LIFE_D }); ctx.restore(); }
    }
  });
})();
