// SAHNE 5 — Elektron dizilimi (2, 8, 8 — orbitale girilmeden), nötr atom, katman sayısı → periyot, son katman → A grubu,
// helyum istisnası, dublet/oktet ve kararlılık, elektron alma-verme ve iyon (katyon/anyon terimleri kullanılmadan) (FB.7.5.6)
(function () {
  const { PAL, stroke, circlePts } = INK;
  const F = F7M;
  E.scene({
    name: 'Elektron dizilimi', concept: 'Katman → periyot, son katman → grup, iyon', from: 'shells', to: 'ion2', trFrom: [560, 520],
    draw(ctx, t) {
      const ss = E.s('shells'), sn = E.s('neutral'), sp = E.s('period'), sg = E.s('group'), sh = E.s('helium'), sst = E.s('stable'), si = E.s('ion'), si2 = E.s('ion2');
      const ax = 560, ay = 520, R0 = 110, dR = 85;
      // ---- sodyum (shells → group)
      const naA = 1 - E.se(t, sh - 0.2, sh + 0.4);
      if (naA > 0) E.layer(ctx, naA, c => {
        const order = (k, i) => (k === 0 ? i : (k === 1 ? 2 + i : 10 + i));
        F.bohr(c, ax, ay, 11, 12, [2, 8, 1], t, { R0, dR, er: 17, nr: 13, spin: 0.35, seed: 11,
          kE: (k, i) => E.se(t, sn + 0.3 + order(k, i) * 0.4, sn + 0.6 + order(k, i) * 0.4) });
        // kapasite etiketleri
        const ck = E.se(t, ss + 0.8, ss + 1.6) * (1 - E.se(t, sn + 5, sn + 6));
        ['en fazla 2', 'en fazla 8', 'en fazla 8'].forEach((s, k) => { const R = R0 + k * dR; F.txt(c, s, ax + R * 0.72 + 12, ay - R * 0.72 - 6, { size: 32, color: F.BR, alpha: ck }); });
        // periyot: katmanlar vurgulu
        const pk = E.se(t, sp + 0.3, sp + 1.0) * (1 - E.se(t, sg, sg + 0.5));
        if (pk > 0) { c.save(); c.globalAlpha *= pk; for (let k = 0; k < 3; k++) stroke(c, circlePts(ax, ay, R0 + k * dR, R0 + k * dR, 90), { w: 5, closed: true, color: PAL.water, dry: false, seed: 1300 + k }); c.restore(); [1, 2, 3].forEach((n, k) => F.txt(c, String(n), ax - (R0 + k * dR) - 4, ay + 12, { size: 34, align: 'center', color: PAL.water, alpha: pk })); }
        // grup: son katmandaki elektron
        const gk = E.se(t, sg + 0.3, sg + 1.0);
        if (gk > 0) { const a = t * 0.35 / 2 + 2 * 0.4, R = R0 + 2 * dR; const ex = ax + Math.cos(a) * R, ey = ay + Math.sin(a) * R; c.save(); c.globalAlpha *= gk; stroke(c, circlePts(ex, ey, 34, 34, 30), { w: 4, closed: true, color: F.BR, dry: false }); c.restore(); }
        F.txt(c, 'sodyum (Na) · 11 proton', ax, 880, { size: 36, align: 'center', alpha: 0.8 });
      });
      // sağ panel metinleri (sodyum)
      const txA = 1 - E.se(t, sh - 0.2, sh + 0.3);
      if (txA > 0) E.layer(ctx, txA, c => {
        P.write(c, '1. katman: en fazla 2 elektron', 1020, 260, E.seg(t, ss + 1.0, ss + 2.2), { size: 42 });
        P.write(c, '2. ve 3. katman: en fazla 8 elektron', 1020, 320, E.seg(t, ss + 2.2, ss + 3.4), { size: 42 });
        P.write(c, 'nötr atom: elektron = proton', 1020, 420, E.seg(t, sn + 0.3, sn + 1.3), { size: 42 });
        P.write(c, 'Na: 2, 8, 1', 1020, 500, E.seg(t, sn + 5.0, sn + 6.0), { size: 60, color: PAL.water });
        P.write(c, '3 katman → 3. periyot', 1020, 610, E.seg(t, sp + 0.8, sp + 2.0), { size: 50, color: PAL.water });
        P.write(c, 'son katmanda 1 → 1A grubu', 1020, 700, E.seg(t, sg + 0.8, sg + 2.0), { size: 50, color: F.BR });
      });
      // ---- helyum
      const heA = Math.min(E.se(t, sh, sh + 0.6), 1 - E.se(t, sst - 0.2, sst + 0.4));
      if (heA > 0) E.layer(ctx, heA, c => {
        F.bohr(c, ax, ay, 2, 2, [2], t, { R0: 150, er: 20, nr: 18, spin: 0.5, seed: 12 });
        F.txt(c, 'helyum (He) · 2 proton', ax, 880, { size: 36, align: 'center', alpha: 0.8 });
        P.write(c, 'He: 2 → tek katman dolu', 1020, 380, E.seg(t, sh + 0.5, sh + 1.6), { size: 50, color: PAL.water });
        P.write(c, 'ama 8A grubunda: istisna!', 1020, 470, E.seg(t, sh + 1.6, sh + 2.8), { size: 50, color: F.BR });
      });
      // ---- kararlılık: He, Ne, Ar
      const stA = Math.min(E.se(t, sst, sst + 0.6), 1 - E.se(t, si - 0.2, si + 0.4));
      if (stA > 0) E.layer(ctx, stA, c => {
        [['He', 2, 2, [2], 380, 'dublet'], ['Ne', 10, 10, [2, 8], 960, 'oktet'], ['Ar', 18, 22, [2, 8, 8], 1540, 'oktet']].forEach(([s, p, n, sh2, x, w], i) => {
          const k = E.se(t, sst + 0.3 + i * 0.8, sst + 0.9 + i * 0.8, 'out'); if (k <= 0) return;
          E.layer(c, k, c2 => F.bohr(c2, x, 460, p, n, sh2, t, { R0: 62, dR: 52, er: 12, nr: 8, spin: 0.4, seed: 20 + i }));
          F.txt(c, s + ': ' + sh2.join(', '), x, 720, { size: 48, align: 'center', alpha: k });
          F.txt(c, 'son katman dolu · ' + w, x, 775, { size: 36, align: 'center', color: PAL.water, alpha: E.se(t, sst + 2.5 + i * 0.6, sst + 3.1 + i * 0.6) });
        });
        P.write(c, 'Son katmanı dolu atom → kararlı', 960, 860, E.seg(t, sst + 4.6, sst + 6.0), { size: 44, align: 'center', color: F.BR });
      });
      // ---- iyon: Na elektron verir, Cl alır
      const ioA = E.se(t, si, si + 0.6);
      if (ioA > 0) E.layer(ctx, ioA, c => {
        const nx = 520, cx = 1400, y = 500, r0 = 62, dr = 55;
        const mv = E.se(t, si + 4.2, si + 6.2, 'io');
        const outerNa = [nx + (r0 + 2 * dr), y], landCl = [cx - (r0 + 2 * dr), y];
        F.bohr(c, nx, y, 11, 12, mv > 0 ? [2, 8] : [2, 8, 1], 0, { R0: r0, dR: dr, er: 12, nr: 8, spin: 0, seed: 31 });
        if (mv > 0) { stroke(c, circlePts(nx, y, r0 + 2 * dr, r0 + 2 * dr, 80), { w: 2, closed: true, alpha: 0.35 * (1 - mv), dry: false }); }
        F.bohr(c, cx, y, 17, 18, mv >= 1 ? [2, 8, 8] : [2, 8, 7], 0, { R0: r0, dR: dr, er: 12, nr: 8, spin: 0, seed: 32 });
        if (mv > 0 && mv < 1) { const x = E.lerp(outerNa[0], landCl[0], mv), yy = y - Math.sin(mv * Math.PI) * 120; F.electron(c, x, yy, 13); }
        F.txt(c, mv >= 1 ? 'sodyum: 2, 8' : 'sodyum (Na): 2, 8, 1', nx, 780, { size: 40, align: 'center' });
        F.txt(c, mv >= 1 ? 'klor: 2, 8, 8' : 'klor (Cl): 2, 8, 7', cx, 780, { size: 40, align: 'center' });
        P.write(c, 'son katmanda 1 → verir', nx, 250, E.seg(t, si + 0.8, si + 2.0), { size: 42, align: 'center', color: F.BR });
        P.write(c, 'son katmanda 7 → alır', cx, 250, E.seg(t, si + 2.2, si + 3.4), { size: 42, align: 'center', color: PAL.water });
        // yükler
        const qk = E.se(t, si2 + 0.3, si2 + 1.0, 'out');
        if (qk > 0) {
          F.ball(c, nx + 170, y - 170, 34 * P.pop(qk), F.C.p, { sym: '+', symSize: 40 }); F.ball(c, cx + 170, y - 170, 34 * P.pop(qk), '#6FA0C2', { sym: '−', txt: '#FBF8F1', symSize: 40 });
          F.txt(c, 'artı yüklü iyon', nx, 840, { size: 40, align: 'center', color: F.BR, alpha: qk });
          F.txt(c, 'eksi yüklü iyon', cx, 840, { size: 40, align: 'center', color: PAL.water, alpha: qk });
          P.write(c, 'Atom, molekül ve iyon: maddenin tanecikleri', 960, 900, E.seg(t, si2 + 3.0, si2 + 4.6), { size: 36, align: 'center', alpha: 0.85 });
        }
      });
    }
  });
})();
