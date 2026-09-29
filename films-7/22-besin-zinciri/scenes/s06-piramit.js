// SAHNE 6 — Ekoloji piramidi (görsel sunum), enerji aktarımı (her basamağa ortalama ≈ onda biri), enerjinin çoğu yaşamsal faaliyetlerde kullanılır ve ısı olarak ortama verilir.
(function () {
  const { PAL, line, stroke, wash } = INK;
  const F = F722;
  const LV = [['üreticiler', 'ot', PAL.life], ['1. tüketiciler', 'cekirge', '#9CBB55'], ['2. tüketiciler', 'kurbaga', F.AMB], ['3. tüketiciler', 'yilan', F.HEAT]];
  const CX = 640, Y0 = 880, LH = 160, W0 = 1000, W1 = 180;
  const band = i => { const y1 = Y0 - i * LH, y2 = y1 - LH; const w = y => E.lerp(W0, W1, (Y0 - y) / (LH * 4)); return [[CX - w(y1) / 2, y1], [CX + w(y1) / 2, y1], [CX + w(y2) / 2, y2], [CX - w(y2) / 2, y2]]; };
  E.scene({
    name: 'Ekoloji piramidi', concept: 'Enerji aktarımı', from: 'pyramid', to: 'heat', trFrom: [640, 880],
    draw(ctx, t) {
      const sp = E.s('pyramid'), se = E.s('energy'), sh = E.s('heat');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(227,160,58,0.10)'); g.addColorStop(1, 'rgba(111,138,58,0.10)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      LV.forEach(([name, key, col], i) => {
        const k = E.se(t, sp + 0.6 + i * 0.8, sp + 1.2 + i * 0.8, 'out'); if (k <= 0) return;
        const b = band(i);
        E.layer(ctx, k, c => {
          F.shape(c, b, col, 0.45, 2900 + i, { w: 3 });
          const y = Y0 - i * LH - LH / 2;
          F.ORG[key][1](c, CX - (i < 3 ? 150 - i * 30 : 0) , y - 8, t);
          if (i < 3) F.fit(c, name, CX + 90 - i * 20, y + 14, 300 - i * 70, 36);
        });
        if (i === 3) F.fit(ctx, name, CX + 250, Y0 - 3.5 * LH + 12, 300, 34, { align: 'left', alpha: k });
      });
      // enerji çubukları (sağda)
      const ke = E.se(t, se + 0.3, se + 1.0);
      if (ke > 0) E.layer(ctx, ke, c => {
        F.fit(c, 'her basamaktaki enerji (örnek)', 1450, 205, 700, 38, { color: F.AMB });
        const vals = [1, 0.1, 0.01, 0.001];
        const labels = ['100 birim', '≈ 10 birim', '≈ 1 birim', '≈ 0,1 birim'];
        vals.forEach((v, i) => {
          const y = Y0 - i * LH - LH / 2;
          const kb = E.se(t, se + 0.8 + i * 1.0, se + 1.5 + i * 1.0, 'out'); if (kb <= 0) return;
          const w = Math.max(10, 520 * Math.pow(v, 0.25) * (i === 0 ? 1 : 1)) * kb;
          const len = [520, 290, 160, 90][i] * kb;
          F.shape(c, [[1170, y - 24], [1170 + len, y - 24], [1170 + len, y + 24], [1170, y + 24]], F.AMB, 0.55, 2910 + i);
          F.fit(c, labels[i], 1170 + len + 20, y + 12, 400, 32, { align: 'left', alpha: kb });
          if (i > 0) F.fit(c, '÷ 10', 1120, y + LH / 2 + 12, 90, 30, { alpha: kb, color: F.AMB });
        });
        F.fit(c, '(çubuklar ölçekli değildir; ortalama değerler)', 1450, 900, 700, 26, { weight: 400, alpha: 0.7 });
      });
      // ısı olarak kayıp
      const kh = E.se(t, sh + 0.4, sh + 1.2);
      if (kh > 0) {
        ctx.save(); ctx.globalAlpha *= kh;
        for (let i = 0; i < 4; i++) {
          const b = band(i), y = Y0 - i * LH - LH / 2, x = (b[0][0] + b[3][0]) / 2 - 20;
          for (let j = 0; j < 2; j++) { const pts = []; for (let m = 0; m <= 20; m++) { const u = m / 20; pts.push([x - u * 90, y - 20 + j * 34 + Math.sin(u * 10 + t * 5 + j) * 6]); } stroke(ctx, pts, { w: 3, color: F.HEAT, seed: 2920 + i * 2 + j }); }
          F.fit(ctx, 'ısı', x - 110, y + 10, 60, 30, { color: F.HEAT, align: 'right' });
        }
        ctx.restore();
      }
      const kt = E.se(t, sh + 3.0, sh + 3.8);
      if (kt > 0) { ctx.save(); ctx.globalAlpha *= kt; F.fit(ctx, 'yaşamsal faaliyetler → ısı', 640, 200, 700, 40, { color: F.HEAT }); ctx.restore(); }
    }
  });
})();
