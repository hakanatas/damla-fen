// SAHNE 2 — Kavram yanılgısı: "Uzaklık mevsimleri belirler mi?" tahmin → kanıt → tahmini değiştirme
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F81;
  const OX = 1160, OY = 540, R = 280;
  const ECC = 0.0167;               // yörünge dış merkezliği (neredeyse çember)
  const PERI = 13 * Math.PI / 180;  // günberi ≈ 3 Ocak: 21 Aralık konumundan ≈ 13° ileride
  const orbitPt = (th) => { // th: saat yönünün tersine (üstten bakış); Güneş odakta
    const r = R * (1 - ECC * ECC) / (1 + ECC * Math.cos(th - PERI));
    return [OX + r * Math.cos(th), OY - r * Math.sin(th)];
  };
  E.scene({
    name: 'Kavram yanılgısı', concept: 'Uzaklık mı?', from: 'guess', to: 'hemi', trFrom: [960, 540],
    draw(ctx, t) {
      const sg = E.s('guess'), sc = E.s('close'), sh = E.s('hemi');
      // tahmin kartı
      const ck = E.se(t, sg + 0.3, sg + 1.0, 'out');
      if (ck > 0) E.layer(ctx, ck, c => {
        F.card(c, 110, 190, 610, 250, { seed: 81 });
        P.write(c, 'Tahminim:', 150, 262, E.seg(t, sg + 0.6, sg + 1.4), { size: 44, color: F.AMBER });
        P.write(c, 'Güneş’e yakın → yaz', 150, 332, E.seg(t, sg + 1.4, sg + 2.6), { size: 46 });
        P.write(c, 'Güneş’e uzak → kış', 150, 402, E.seg(t, sg + 2.6, sg + 3.8), { size: 46 });
      });
      // yanlış damgası (hemi sonunda)
      const xk = E.se(t, sh + 4.6, sh + 5.4);
      if (xk > 0) { F.stamp(ctx, 'YANLIŞ', 560, 300, xk, { size: 58 }); P.cross(ctx, 415, 330, 150, E.se(t, sh + 4.2, sh + 4.8), { color: F.RED, w: 9 }); }
      // --- yörünge (üstten görünüm) ---
      const ok = E.se(t, sg + 3.5, sg + 4.5) * (1 - E.se(t, sh - 0.2, sh + 0.6));
      if (ok > 0) E.layer(ctx, ok, c => {
        const pts = []; for (let i = 0; i <= 160; i++) pts.push(orbitPt(i / 160 * 6.283));
        P.drawOn(c, pts, E.se(t, sg + 3.5, sg + 5.5), { w: 3, color: PAL.ink, dry: false, seed: 601 });
        P.sun(c, OX, OY, 58, t, { nrays: 16, cells: false });
        // Dünya dolanıyor
        const th = PERI + (t - sg) * 0.55;
        const [ex, ey] = orbitPt(th);
        if (t < sc + 0.8) P.earth(c, ex, ey, 22);
        const nk = E.se(t, sc + 0.8, sc + 1.8);
        if (nk > 0) {
          const [px, py] = orbitPt(PERI), [ax, ay] = orbitPt(PERI + Math.PI);
          c.save(); c.globalAlpha *= nk;
          P.earth(c, px, py, 22); P.earth(c, ax, ay, 22);
          F.dash(c, [OX, OY], [px - 20, py + 5], { w: 2, alpha: 0.6 }); F.dash(c, [OX, OY], [ax + 20, ay - 5], { w: 2, alpha: 0.6 });
          INK.label(c, 'Ocak başı', px + 34, py - 34, { size: 40, weight: 700 });
          INK.label(c, '≈ 147 milyon km', px + 34, py + 10, { size: 36 });
          INK.label(c, 'Temmuz başı', ax - 36, ay + 62, { size: 40, weight: 700, align: 'right' });
          INK.label(c, '≈ 152 milyon km', ax - 36, ay + 104, { size: 36, align: 'right' });
          c.restore();
        }
        const wk = E.se(t, sc + 4.5, sc + 5.3, 'out');
        if (wk > 0) {
          const [px, py] = orbitPt(PERI);
          c.save(); c.globalAlpha *= wk;
          INK.label(c, 'en yakın konum,', 1670, 650, { size: 42, weight: 700, color: PAL.water, align: 'center' }); INK.label(c, 'ama bizde KIŞ!', 1670, 700, { size: 42, weight: 700, color: PAL.water, align: 'center' });
          c.restore();
        }
        INK.label(c, '(üstten görünüm · çizim ölçekli değildir)', 1860, 880, { size: 30, align: 'right', alpha: 0.6 });
      });
      // --- iki yarım küre ---
      const hk = E.se(t, sh + 0.2, sh + 1.2);
      if (hk > 0) E.layer(ctx, hk, c => {
        const gx = 1150, gy = 540, gr = 250;
        F.globe(c, gx, gy, gr, { tilt: 0, lines: { eq: true, eqCol: PAL.ink, w: 3 }, linesK: E.se(t, sh + 0.8, sh + 1.8) });
        INK.label(c, 'ekvator', gx + gr + 20, gy + 12, { size: 36, alpha: 0.8 });
        const tr = [gx - 40, gy - Math.sin(40 * Math.PI / 180) * gr];
        const au = [gx + 60, gy + Math.sin(25 * Math.PI / 180) * gr];
        INK.inkDot(c, tr[0], tr[1], 8); INK.inkDot(c, au[0], au[1], 8);
        const k1 = E.se(t, sh + 1.2, sh + 2.0), k2 = E.se(t, sh + 2.2, sh + 3.0);
        if (k1 > 0) { c.save(); c.globalAlpha *= k1; INK.leader(c, [gx + 260, gy - 250], tr, {}); INK.label(c, 'Türkiye: KIŞ', gx + 270, gy - 250, { size: 44, weight: 700, color: PAL.water }); INK.label(c, '(Aralık)', gx + 270, gy - 205, { size: 34, alpha: 0.7 }); c.restore(); }
        if (k2 > 0) { c.save(); c.globalAlpha *= k2; INK.leader(c, [gx + 290, gy + 210], au, {}); INK.label(c, 'Avustralya: YAZ', gx + 300, gy + 210, { size: 44, weight: 700, color: F.AMBER }); INK.label(c, '(Aralık)', gx + 300, gy + 255, { size: 34, alpha: 0.7 }); c.restore(); }
        INK.label(c, 'Kuzey Yarım Küre', gx - gr - 20, gy - 70, { size: 36, align: 'right', alpha: 0.8 * k1 });
        INK.label(c, 'Güney Yarım Küre', gx - gr - 20, gy + 170, { size: 36, align: 'right', alpha: 0.8 * k2 });
      });
      // Damla
      DAMLA.draw(ctx, { x: 390, y: 900, s: 1.1, view: 'q3', expr: t > sh + 4 ? 'determined' : t > sc + 4 ? 'surprised' : 'thinking', look: [0.8, -0.2], blink: E.blink(t, 3), squash: E.breath(t), t, seed: 2,
        arms: t > sh + 4 ? [[-1, 0.35], [1, 2.2]] : [[-1, 0.35], [1, [40, -150], 0.4]] });
    }
  });
})();
