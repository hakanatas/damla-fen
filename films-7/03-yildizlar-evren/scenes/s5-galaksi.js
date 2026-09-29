// SAHNE 5 — Galaksi, Samanyolu, Andromeda, evren; hiyerarşi ve evrendeki adresim (FB.7.1.5 a, b)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = U7;
  E.scene({
    name: 'Galaksi ve evren', concept: 'Yıldız, galaksi, evren', from: 'galaxy', to: 'address', trFrom: [900, 520],
    draw(ctx, t) {
      const sg = E.s('galaxy'), sa = E.s('andromeda'), su = E.s('universe'), sh = E.s('hier'), sd = E.s('address');
      F.night(ctx, 1.2);
      F.stars(ctx, t, 0.6, { n: 90, seed: 95, area: [0, 150, E.W, 900] });
      // uzaklaşan kamera: Samanyolu → Andromeda → evren
      const z = E.lerp(1, 0.55, E.se(t, sa - 0.3, sa + 1.5)) * E.lerp(1, 0.55, E.se(t, su - 0.3, su + 1.5));
      const gA = 1 - E.se(t, sh - 0.4, sh + 0.4);
      if (gA > 0) E.layer(ctx, gA, c => {
        c.save(); c.translate(900, 520); c.scale(z, z); c.translate(-900, -520);
        F.galaxy(c, 900, 520, 330, t, { seed: 11, n: 700, tilt: 0.5, ang: -0.2 });
        // Güneş'in yeri (kollardan birinde)
        const gx = 900 + Math.cos(-0.2) * 190 - Math.sin(-0.2) * 0, gy = 520 + 60;
        const mk = E.se(t, sg + 3.5, sg + 4.3) * (1 - E.se(t, sa, sa + 0.6));
        if (mk > 0) { c.save(); c.globalAlpha = mk; stroke(c, circlePts(gx, gy, 16, 16, 20), { w: 3, color: '#F6D58A', closed: true, dry: false }); P.arrow(c, [gx + 150, gy + 150], [gx + 22, gy + 20], mk, { w: 3, color: '#F6D58A', head: 12 }); c.restore();
          INK.label(c, 'Güneş sistemimiz burada', gx + 160, gy + 190, { size: 38, weight: 700, color: '#F6D58A', alpha: mk }); }
        INK.label(c, 'Samanyolu', 900, 150 + 40, { size: 56, weight: 700, color: '#FBF3DC', align: 'center', alpha: E.se(t, sg + 1, sg + 1.8) * (1 - E.se(t, su, su + 0.6)), font: 'Fraunces' });
        // Andromeda
        const ak = E.se(t, sa + 0.6, sa + 1.6); const akL = ak * (1 - E.se(t, su, su + 0.6));
        if (ak > 0) { c.save(); c.globalAlpha = ak; F.galaxy(c, 2150, 180, 260, t, { seed: 12, n: 600, tilt: 0.32, ang: 0.6 }); c.restore();
          INK.label(c, 'Andromeda', 2150, 420, { size: 80, weight: 700, color: '#FBF3DC', align: 'center', alpha: akL, font: 'Fraunces' });
          INK.label(c, 'ışığı ≈ 2,5 milyon yılda gelir', 2150, 520, { size: 64, color: '#F6D58A', align: 'center', alpha: E.se(t, sa + 3, sa + 3.8) * (1 - E.se(t, su, su + 0.6)) }); }
        // evren: çok sayıda galaksi
        const uk = E.se(t, su + 0.8, su + 2.5);
        if (uk > 0) { const R = INK.rng(13); for (let i = 0; i < 22; i++) { const x = -900 + R() * 3600, y = -500 + R() * 2100; if (Math.hypot(x - 900, y - 520) < 700 || Math.hypot(x - 2150, y - 200) < 450) continue; c.save(); c.globalAlpha = uk * (0.6 + R() * 0.4); F.galaxy(c, x, y, 70 + R() * 90, t, { seed: 20 + i, n: 120, tilt: 0.3 + R() * 0.6, ang: R() * 3 }); c.restore(); } }
        c.restore();
        INK.label(c, 'EVREN', 960, 880, { size: 70, weight: 700, color: '#FBF3DC', align: 'center', alpha: E.se(t, su + 2, su + 2.8), font: 'Fraunces' });
        INK.label(c, '(çizim ölçekli değildir)', 1880, 900, { size: 26, color: '#FBF3DC', align: 'right', alpha: 0.7 });
      });
      // hiyerarşi: iç içe halkalar + adres
      const hk = E.se(t, sh - 0.2, sh + 0.6);
      if (hk > 0) E.layer(ctx, hk, c => {
        const CX = 620, CY = 540;
        const L = [['evren', 360, '#3A3F66'], ['Samanyolu', 270, '#4A4F7A'], ['Güneş sistemi', 180, '#5E6390'], ['Dünya', 70, PAL.water]];
        L.forEach(([n, r, col], i) => { const k = E.se(t, sh + 0.6 + (3 - i) * 1.3, sh + 1.3 + (3 - i) * 1.3, 'out'); if (k <= 0) return;
          c.save(); c.globalAlpha = k; if (i === 3) P.earth(c, CX, CY + 250, 70); else { P.fillPts(c, circlePts(CX, CY + 360 - r, r, r, 80), col, 0.85); stroke(c, circlePts(CX, CY + 360 - r, r, r, 80), { w: 3, closed: true, color: '#FBF3DC', seed: 600 + i, dry: false }); } c.restore();
          INK.label(c, n, CX, CY + 360 - 2 * r + (i === 3 ? 20 : 50), { size: i === 3 ? 34 : 40, weight: 700, color: '#FBF3DC', align: 'center', alpha: k });
          if (i === 2) F.star(c, CX + 110, CY + 150, 10, '#FFE6A8', t, { spikes: false }); });
        INK.label(c, '(şematik: evrenin sınırı çizilemez)', 620, 140 + 30, { size: 28, color: '#FBF3DC', align: 'center', alpha: 0.7 * E.se(t, sh + 5, sh + 5.8) });
        // adres
        const ak = E.se(t, sd + 0.2, sd + 0.9);
        if (ak > 0) { c.save(); c.globalAlpha = ak; F.card(c, 1100, 190, 720, 700, { seed: 610, fill: '#FAF6EC' }); c.restore();
          INK.label(c, 'Evrendeki adresim', 1460, 260, { size: 48, weight: 700, color: F.AMBER_D, align: 'center', alpha: ak });
          ['evim', 'şehrim', 'Türkiye', 'Dünya', 'Güneş sistemi', 'Samanyolu galaksisi', 'evren'].forEach((s, i) => P.write(c, (i ? '⊂ ' : '') + s, 1180 + i * 22, 345 + i * 78, E.seg(t, sd + 0.8 + i * 0.8, sd + 1.5 + i * 0.8), { size: 42, color: i > 2 ? PAL.water : PAL.ink })); }
      });
    }
  });
})();
