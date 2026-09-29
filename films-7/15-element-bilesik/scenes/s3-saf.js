// SAHNE 3 — Saf maddelerin tanecik modelleri: demir, oksijen gazı (tek cins atom) · su, karbondioksit (farklı cins) → element / bileşik (FB.7.5.4 a, b, c)
(function () {
  const { PAL, stroke } = INK;
  const F = F7M;
  const tri = (v, L) => { const m = ((v % (2 * L)) + 2 * L) % (2 * L); return m < L ? m : 2 * L - m; };
  const BX = [110, 560, 1010, 1460], BY = 220, BW = 360, BH = 300;
  const NAMES = ['demir', 'oksijen gazı', 'su', 'karbondioksit gazı'];
  // kutu içeriği (tanecik modeli)
  function content(c, i, x0, y0, t) {
    c.save(); c.beginPath(); c.rect(x0 + 3, y0 + 3, BW - 6, BH - 6); c.clip();
    if (i === 0) { // demir: düzenli dizilmiş Fe atomları
      for (let j = 0; j < 5; j++) for (let k = 0; k < 7; k++) F.ball(c, x0 + 40 + k * 47 + (j % 2 ? 23 : 0) + Math.sin(t * 12 + j * 3 + k) * 1.5, y0 + 50 + j * 50, 23, F.EL.Fe.fill, { sym: 'Fe', txt: '#FBF8F1', symSize: 17 });
    } else if (i === 1 || i === 3) { // gaz: moleküller serbestçe
      const n = i === 1 ? 5 : 4, mol = i === 1 ? 'O2' : 'CO2', s = i === 1 ? 0.42 : 0.38;
      for (let k = 0; k < n; k++) {
        const B = [[0.22, 0.22], [0.75, 0.25], [0.48, 0.55], [0.2, 0.8], [0.78, 0.78]][k]; const x = x0 + BW * (0.2 + 0.6 * B[0]) + 30 * Math.sin(t * (0.71 + 0.23 * k) + k * 2.1), y = y0 + BH * (0.22 + 0.56 * B[1]) + 22 * Math.cos(t * (0.53 + 0.31 * k) + k * 1.3);
        c.save(); c.translate(x, y); c.rotate(t * (0.6 + k * 0.2) + k); F.mol(c, mol, 0, 0, s, { sym: false }); c.restore();
      }
    } else { // su: sıvı, birbirine yakın moleküller
      for (let k = 0; k < 9; k++) {
        const cx = x0 + 70 + (k % 3) * 110 + Math.sin(t * 1.3 + k) * 10, cy = y0 + 70 + Math.floor(k / 3) * 85 + Math.cos(t * 1.1 + k * 2) * 8;
        c.save(); c.translate(cx, cy); c.rotate(Math.sin(t * 0.8 + k) * 0.9 + k); F.mol(c, 'H2O', 0, 0, 0.4, { sym: false }); c.restore();
      }
    }
    c.restore();
  }
  E.scene({
    name: 'Saf maddeler', concept: 'Element ve bileşik', from: 'pure', to: 'compound', trFrom: [960, 380],
    draw(ctx, t) {
      const sp = E.s('pure'), s1 = E.s('onekind'), s2 = E.s('twokind'), se = E.s('element'), sc = E.s('compound');
      BX.forEach((x, i) => {
        const k = E.se(t, sp + 0.3 + i * 0.5, sp + 0.9 + i * 0.5, 'out'); if (k <= 0) return;
        E.layer(ctx, k, c => {
          const hl = i < 2 ? E.se(t, s1 + 0.2, s1 + 0.8) : E.se(t, s2 + 0.2, s2 + 0.8);
          F.card(c, x, BY, x + BW, BY + BH, { seed: 800 + i, tint: i < 2 ? PAL.water : F.BR, tintA: 0.12 * hl, color: hl > 0.5 ? (i < 2 ? PAL.water : F.BR) : undefined, w: 2.6 + hl * 1.6 });
          content(c, i, x, BY, t);
          P.write(c, NAMES[i], x + BW / 2, BY + BH + 60, E.seg(t, sp + 0.8 + i * 0.5, sp + 1.8 + i * 0.5), { size: 42, align: 'center' });
          if (hl > 0) INK.label(c, i < 2 ? 'tek cins atom' : 'farklı cins atomlar', x + BW / 2, BY + BH + 108, { size: 36, align: 'center', weight: 700, color: i < 2 ? PAL.water : F.BR, alpha: hl });
        });
      });
      // parantezler + adlar
      const ek = E.se(t, se + 0.2, se + 1.0), ck = E.se(t, sc + 0.2, sc + 1.0);
      if (ek > 0) { P.drawOn(ctx, P.bez([130, 700], [470, 740], [900, 700], 30), ek, { w: 4, color: PAL.water }); P.write(ctx, 'ELEMENT', 515, 810, E.seg(t, se + 0.6, se + 1.4), { size: 66, align: 'center', color: PAL.water }); }
      if (ck > 0) { P.drawOn(ctx, P.bez([1030, 700], [1400, 740], [1800, 700], 30), ck, { w: 4, color: F.BR }); P.write(ctx, 'BİLEŞİK', 1410, 810, E.seg(t, sc + 0.6, sc + 1.4), { size: 66, align: 'center', color: F.BR }); }
      F.damla(ctx, t, { x: 960, y: 905, s: 0.72, view: 'front', expr: t > sc + 1 ? 'happy' : 'curious', look: [t < s2 ? -0.7 : 0.7, -0.4], seed: 4, arms: t > sc + 1 ? [[-1, 2.5], [1, 2.5]] : [[-1, 0.35], [1, 0.35]] });
    }
  });
})();
