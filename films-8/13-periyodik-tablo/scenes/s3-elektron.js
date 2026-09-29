// SAHNE 3 — Elektron dizilimi: Na (2,8,1) elektron verir → Na⁺; Cl (2,8,7) elektron alır → Cl⁻; Ar (2,8,8) kararlı
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const U = U5;
  const R0 = 62, DR = 46, Y = 500;
  const ANG = (k, i, slots) => i / slots * Math.PI * 2 + k * 0.4 - Math.PI / 2;
  const pos = (x, k, i, slots) => { const a = ANG(k, i, slots), R = R0 + k * DR; return [x + Math.cos(a) * R, Y + Math.sin(a) * R]; };
  const XNA = 420, XCL = 1000, XAR = 1560;
  E.scene({
    name: 'Elektron dizilimi', concept: 'Na verir, Cl alır, Ar kararlı', from: 'why', to: 'trend', trFrom: [960, 500],
    draw(ctx, t) {
      const sw = E.s('why'), sa = E.s('argon'), sn = E.s('na'), sc = E.s('cl'), st = E.s('trend');
      const j = (i) => [Math.sin(t * 2.1 + i) * 2, Math.cos(t * 1.7 + i * 2) * 2];
      const atoms = [
        { x: XNA, sym: 'Na', nm: 'sodyum', np: 11, nn: 12, sh: [2, 8, 1], at: sw + 0.6, cls: 'metal' },
        { x: XCL, sym: 'Cl', nm: 'klor', np: 17, nn: 18, sh: [2, 8, 7], at: sw + 1.2, cls: 'ametal' },
        { x: XAR, sym: 'Ar', nm: 'argon', np: 18, nn: 22, sh: [2, 8, 8], at: sw + 1.8, cls: 'soy' }
      ];
      // elektron aktarımı: Na'nın son elektronu (sağ tarafta) → Cl'nin boş yuvası
      const leave = E.se(t, sn + 2.0, sn + 4.0, 'io');       // Na'dan ayrılır, ortada bekler
      const arrive = E.se(t, sc + 1.6, sc + 3.4, 'io');      // Cl'ye yerleşir
      const naOut = [XNA + R0 + 2 * DR, Y];
      const mid = [(XNA + XCL) / 2, Y - 250];
      const clSlot = pos(XCL, 2, 7, 8);
      atoms.forEach((A, n) => {
        const k = E.se(t, A.at, A.at + 0.7, 'out'); if (k <= 0) return;
        E.layer(ctx, k, c => {
          const hi = (A.sym === 'Ar' && t > sa && t < sn) || (A.sym === 'Na' && t > sn && t < sc) || (A.sym === 'Cl' && t > sc && t < st);
          if (hi) { c.save(); c.globalAlpha *= 0.35; P.fillPts(c, circlePts(A.x, Y, 240, 240, 60), U.CLS[A.cls].c); c.restore(); }
          // 3. katman halkası (Na⁺ olunca solar)
          const ring3 = A.sym === 'Na' ? 1 - 0.85 * leave : 1;
          U.bohr(c, A.x, Y, A.np, A.nn, A.sh.slice(0, 2), t, { R0, dR: DR, er: 11, nr: 6, spin: 0, rings: 2, seed: 5 + n, slots: [2, 8] });
          c.save(); c.globalAlpha *= ring3 * 0.55; stroke(c, circlePts(A.x, Y, R0 + 2 * DR, R0 + 2 * DR, 90), { w: 2, closed: true, dry: false, seed: 302 }); c.restore();
          const n3 = A.sym === 'Na' ? 0 : A.sh[2];
          for (let i = 0; i < n3; i++) { const p = pos(A.x, 2, i, 8), d = j(i + n * 9); U.electron(c, p[0] + d[0], p[1] + d[1], 11); }
          if (A.sym === 'Cl' && arrive < 1) { const p = pos(A.x, 2, 7, 8); c.save(); c.globalAlpha *= 0.6; INK.dashed(c, circlePts(p[0], p[1], 13, 13, 40), { w: 1.6, on: 4, off: 4 }); c.restore(); }
          U.txt(c, A.sym, A.x, Y - 240, { size: 64, align: 'center' });
          U.txt(c, A.nm + ' · ' + U.CLS[A.cls].name, A.x, Y - 196, { size: 34, align: 'center', alpha: 0.75 });
          U.txt(c, A.sh.join(', '), A.x, Y + 230, { size: 50, align: 'center', color: PAL.water });
        });
      });
      // aktarılan elektron
      if (t > sn + 2.0) {
        let p;
        if (arrive <= 0) p = E.mix(naOut, mid, leave); else p = E.mix(mid, clSlot, arrive);
        if (arrive <= 0 && leave < 1) { const u = leave; p = [E.lerp(naOut[0], mid[0], u), E.lerp(naOut[1], mid[1], u) - Math.sin(u * Math.PI) * 30]; }
        U.electron(ctx, p[0], p[1], 12);
        if (leave > 0.9 && arrive < 0.1) U.txt(ctx, 'verilen elektron', mid[0], mid[1] - 26, { size: 32, align: 'center', color: U.AMBER });
      } else if (t > E.s('why') + 0.6) U.electron(ctx, naOut[0] + j(40)[0], naOut[1] + j(40)[1], 11);
      // iyon etiketleri
      const off = 1 - E.se(t, st, st + 0.6); const nk = E.se(t, sn + 4.0, sn + 4.8) * off;
      if (nk > 0) { ctx.save(); ctx.globalAlpha *= nk; U.ion(ctx, 'Na', '+', XNA, Y + 300, 60, { align: 'center', chColor: U.AMBER }); U.txt(ctx, '(2, 8) kararlı', XNA, Y + 350, { size: 36, align: 'center', alpha: 0.8 }); ctx.restore(); }
      const ck = E.se(t, sc + 3.4, sc + 4.2) * off;
      if (ck > 0) { ctx.save(); ctx.globalAlpha *= ck; U.ion(ctx, 'Cl', '−', XCL, Y + 300, 60, { align: 'center', chColor: PAL.water }); U.txt(ctx, '(2, 8, 8) kararlı', XCL, Y + 350, { size: 36, align: 'center', alpha: 0.8 }); ctx.restore(); }
      const ak = E.se(t, sa + 0.8, sa + 1.6) * off;
      if (ak > 0) { U.txt(ctx, 'son katman dolu', XAR, Y + 300, { size: 40, align: 'center', alpha: ak, color: '#2F7A70' }); U.txt(ctx, '→ kararlı', XAR, Y + 350, { size: 40, align: 'center', alpha: ak, color: '#2F7A70' }); }
      // genelleme (trend) — Na/Cl etiketlerinin yerine kısa şerit
      const tk = E.se(t, st + 0.3, st + 1.0);
      if (tk > 0) E.layer(ctx, tk, c => {
        U.card(c, 250, 755, 1420, 150, { seed: 1501, tint: PAL.light, tintA: 0.12 });
        U.txt(c, 'metal → genellikle elektron verir (+)', 290, 815, { size: 42, color: '#4E5E75' });
        U.txt(c, 'ametal → genellikle elektron alır (−)', 290, 875, { size: 42, color: '#8A6A10' });
        U.txt(c, 'soy gaz → kararlı', 1300, 845, { size: 42, color: '#2F7A70' });
      });
      U.damla(ctx, t, { x: 1830, y: 700, s: 0.7, view: 'q3', flip: true, expr: t > sn + 2 && t < sc + 4 ? 'surprised' : 'curious', look: [-0.9, 0], arms: [[-1, 1.3], [1, 0.4]] });
      INK.label(ctx, '(model, ölçekli değildir)', 1880, 900, { size: 26, align: 'right', alpha: 0.5 * (1 - tk) });
    }
  });
})();
