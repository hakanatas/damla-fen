// SAHNE 3 — Yük nitelikleri (FB.7.6.3 a): nötr (eşit), negatif (elektron aldı), pozitif (elektron verdi); yanılgı: pozitif cisim proton kazanmaz.
(function () {
  const { PAL, line, stroke, wash } = INK;
  const F = F721;
  // her cisimde 4 proton; elektron sayısı: nötr 4, negatif 6, pozitif 2
  const COLS = [
    ['neutral', 'NÖTR', 4, '4 (+)  =  4 (−)', PAL.ink, 380],
    ['negative', 'NEGATİF', 6, '4 (+)  <  6 (−)', F.NEG, 960],
    ['positive', 'POZİTİF', 2, '4 (+)  >  2 (−)', F.POS, 1540]
  ];
  const PP = [[-80, -60], [70, -70], [-60, 60], [90, 50]];
  const EP = [[-20, -80], [110, -10], [0, 70], [-110, 10], [40, 100], [-40, -10]];
  E.scene({
    name: 'Nötr · negatif · pozitif', concept: 'Yük durumlarının nitelikleri', from: 'neutral', to: 'myth', trFrom: [380, 500],
    draw(ctx, t) {
      F.bg(ctx);
      const sy = E.s('myth');
      COLS.forEach(([id, name, ne, cnt, col, cx], ci) => {
        const s0 = E.s(id), k = E.se(t, s0 + 0.2, s0 + 0.9, 'out'); if (k <= 0) return;
        E.layer(ctx, k, c => {
          const cy = 470;
          const blob = INK.wobble(INK.circlePts(cx, cy, 210, 170, 60), 6, 300 + ci);
          P.fillPts(c, blob, PAL.white, 0.95); wash(c, blob, col === PAL.ink ? '#9A9387' : col, 0.18, 310 + ci, { bleed: 2, blooms: 1 }); stroke(c, blob, { w: 3, closed: true, seed: 320 + ci });
          PP.forEach(([dx, dy]) => F.charge(c, cx + dx, cy + dy, 1, 20));
          // elektronlar: nötr başlangıç (4) → hedef sayı
          const ch = E.se(t, s0 + 1.4, s0 + 3.2);
          for (let i = 0; i < Math.max(4, ne); i++) {
            const [dx, dy] = EP[i];
            if (i >= 4) { // gelen elektronlar (negatif)
              const kk = E.clamp(ch * 2 - (i - 4) * 0.5); if (kk <= 0) continue;
              const p = E.mix([cx - 330, cy - 160], [cx + dx, cy + dy], E.ease.out(kk)); F.charge(c, p[0], p[1], -1, 20);
            } else if (ne < 4 && i >= ne) { // giden elektronlar (pozitif)
              const kk = E.clamp(ch * 2 - (i - ne) * 0.5);
              const p = E.mix([cx + dx, cy + dy], [cx + 300, cy - 170], E.ease.in(kk)); c.save(); c.globalAlpha *= 1 - E.seg(kk, 0.85, 1); F.charge(c, p[0], p[1], -1, 20); c.restore();
            } else F.charge(c, cx + dx, cy + dy, -1, 20);
          }
          if (ne > 4) F.fit(c, 'elektron aldı', cx - 270, cy - 185, 220, 34, { color: F.NEG, alpha: E.se(t, s0 + 1.2, s0 + 1.8) });
          if (ne < 4) F.fit(c, 'elektron verdi', cx + 265, cy - 185, 180, 34, { color: F.NEG, alpha: E.se(t, s0 + 1.2, s0 + 1.8) });
          F.wfit(c, cnt, cx, cy + 240, E.seg(t, s0 + 2.8, s0 + 3.8), 40, 460, { align: 'center' });
          F.stamp(c, cx, cy - 250 + (ne === 4 ? 0 : 0), name, E.seg(t, s0 + 3.4, s0 + 3.9), { color: col, size: 50, rot: -0.04 });
        });
      });
      // yanılgı şeridi
      const km = E.se(t, sy + 0.2, sy + 0.9, 'out');
      if (km > 0) E.layer(ctx, km, c => {
        F.card(c, 1080, 762, 800, 146, 350);
        P.cross(c, 1130, 808, 22, E.se(t, sy + 1.2, sy + 1.7), { w: 6, color: F.RED });
        F.wfit(c, 'pozitif cisim proton kazandı', 1180, 825, E.seg(t, sy + 0.5, sy + 1.4), 38, 660);
        P.check(c, 1130, 862, 44, E.se(t, sy + 2.8, sy + 3.3), { w: 7, color: F.GREEN });
        F.wfit(c, 'pozitif cisim elektron kaybetti', 1180, 885, E.seg(t, sy + 1.9, sy + 2.9), 38, 660, { color: F.POS });
      });
    }
  });
})();
