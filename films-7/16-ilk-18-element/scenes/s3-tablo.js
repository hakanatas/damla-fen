// SAHNE 3 — İlk 18 element (proton sayısı sırasıyla) + 9 ek element; SAHNE 4 — periyodik tablo düzeni, tarihçe, grup/periyot, 7 periyot · 8 A · 10 B (FB.7.5.5, FB.7.5.6)
(function () {
  const { PAL, stroke, line } = INK;
  const F = F7M;
  const EXTRA = [['Au', 'altın', 79], ['Ag', 'gümüş', 47], ['Cu', 'bakır', 29], ['Zn', 'çinko', 30], ['Pb', 'kurşun', 82], ['Hg', 'cıva', 80], ['Pt', 'platin', 78], ['Fe', 'demir', 26], ['I', 'iyot', 53]];
  // 8 sütunlu (yalnızca A grupları) yerleşim
  const TW = 170, TH = 135, X8 = 240, Y8 = 205;
  const pos8 = (g, p) => [X8 + (g - 1) * (TW + 10), Y8 + (p - 1) * (TH + 10)];
  // 18 sütunlu tam tablo
  const W = 84, H = 64, X0 = 168, Y0 = 230, GX = 88, GY = 70;
  const posF = (col, p) => [X0 + (col - 1) * GX, Y0 + (p - 1) * GY];
  const GL = ['1A', '2A', '3B', '4B', '5B', '6B', '7B', '8B', '8B', '8B', '1B', '2B', '3A', '4A', '5A', '6A', '7A', '8A'];
  function cellsFull() { // dolu hücreler: [col, period]
    const out = [];
    for (let p = 1; p <= 7; p++) for (let c = 1; c <= 18; c++) {
      if (p === 1 && c > 1 && c < 18) continue;
      if ((p === 2 || p === 3) && c > 2 && c < 13) continue;
      out.push([c, p]);
    }
    return out;
  }
  const FULL = cellsFull();
  E.scene({
    name: 'Periyodik tablo', concept: 'İlk 18 element; grup ve periyot', from: 'order', to: 'counts', trFrom: [960, 450],
    draw(ctx, t) {
      const so = E.s('order'), l1 = E.s('list1'), l2 = E.s('list2'), sx = E.s('extra'), ssh = E.s('shelf'), sh = E.s('history'), sr = E.s('rows'), sc = E.s('counts');
      const morph = E.se(t, sr + 0.1, sr + 2.0, 'io');
      const dim = 1 - 0.8 * Math.min(E.se(t, ssh, ssh + 0.6), 1 - E.se(t, sr - 0.4, sr + 0.2));
      // tam tablonun boş hücreleri
      if (morph > 0) E.layer(ctx, morph, c => {
        FULL.forEach(([col, p]) => {
          const inFirst = p <= 3 && (col <= 2 || col >= 13); if (inFirst) return;
          const [x, y] = posF(col, p); const isB = col >= 3 && col <= 12;
          F.tile(c, x, y, W, H, (col === 3 && p >= 6) ? '*' : null, null, null, { tint: isB ? F.BR : PAL.water, tintA: 0.07, lw: 1.4 });
        });
        for (let r = 0; r < 2; r++) for (let i = 0; i < 15; i++) F.tile(c, X0 + (2 + i) * GX, Y0 + 7 * GY + 30 + r * GY, W, H, i === 0 ? '*' : null, null, null, { tint: F.BR, tintA: 0.05, lw: 1.2 });
        for (let p = 1; p <= 7; p++) F.txt(c, String(p), X0 - 22, Y0 + (p - 1) * GY + 44, { size: 32, align: 'center', color: PAL.water });
        const gk = E.se(t, sc + 0.3, sc + 1.2);
        GL.forEach((g, i) => F.txt(c, g, X0 + i * GX + W / 2, Y0 - 12, { size: 26, align: 'center', color: g.endsWith('A') ? PAL.water : F.BR, alpha: 0.4 + 0.6 * gk }));
      });
      // ilk 18 element
      E.layer(ctx, dim, c => {
        F.ELEMS.forEach(([s, nm, g, p], i) => {
          const at = i < 10 ? l1 + 0.3 + i * 0.8 : l2 + 0.3 + (i - 10) * 0.95;
          const k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
          const [ax, ay] = pos8(g, p), [bx, by] = posF(F.colOfA(g), p);
          const x = E.lerp(ax, bx, morph), y = E.lerp(ay, by, morph), w = E.lerp(TW, W, morph), h = E.lerp(TH, H, morph);
          const sp = P.pop(k);
          F.tile(c, x + w * (1 - sp) / 2, y + h * (1 - sp) / 2, w * sp, h * sp, s, i + 1, morph < 0.5 ? nm : null, { tint: PAL.water, tintA: 0.18, lw: 2.2 });
        });
        // sıra numarası açıklaması
        if (morph < 0.5) {
          const ok = E.se(t, so + 0.6, so + 1.4) * (1 - morph * 2);
          if (ok > 0) {
            const ex = Math.min(ok, 1 - E.se(t, l1 + 0.1, l1 + 0.6));
            if (ex > 0) E.layer(c, ex, c2 => {
              F.tile(c2, 760, 300, 300, 300, 'H', 1, 'hidrojen', { tint: PAL.water, tintA: 0.18, lw: 3 });
              P.arrow(c2, [1200, 360], [805, 355], E.se(t, so + 1.2, so + 1.9), { w: 3, head: 13, color: F.BR });
              P.write(c2, 'proton sayısı', 1220, 372, E.seg(t, so + 1.6, so + 2.6), { size: 48, color: F.BR });
              P.write(c2, 'sembol', 1220, 480, E.seg(t, so + 2.4, so + 3.2), { size: 44 });
              P.arrow(c2, [1200, 468], [990, 480], E.se(t, so + 2.4, so + 3.0), { w: 2.6, head: 12 });
            });
          }
        }
        // ek elementler
        const xk = E.se(t, sx, sx + 0.5) * (1 - E.se(t, ssh - 0.4, ssh + 0.2));
        if (xk > 0) E.layer(c, xk, c2 => {
          EXTRA.forEach(([s, nm, z], i) => { const k = E.se(t, sx + 0.3 + i * 0.6, sx + 0.8 + i * 0.6, 'out'); if (k <= 0) return; F.tile(c2, 240 + i * 160, 700, 150 * P.pop(k), 130 * P.pop(k), s, z, nm, { tint: F.BR, tintA: 0.12 }); });
        });
      });
      // raf benzetmesi
      const rk = Math.min(E.se(t, ssh + 0.2, ssh + 0.8, 'out'), 1 - E.se(t, sh - 0.3, sh + 0.3));
      if (rk > 0) E.layer(ctx, rk, c => {
        F.card(c, 420, 190, 1500, 700, { seed: 1201 });
        const shelves = [360, 520, 680 - 20];
        shelves.forEach((y, j) => {
          line(c, [480, y], [1440, y], { w: 5, seed: 1210 + j, taper: 0 });
          for (let i = 0; i < 14; i++) {
            const bh = 60 + ((i * 7 + j * 3) % 5) * 12, bw = 40 + ((i * 3 + j) % 3) * 10;
            const x = 500 + i * 66; const col = ['#8A6A45', PAL.water, PAL.life, '#B5553F', '#6E6A78'][j === 0 ? i % 5 : (j === 1 ? Math.floor(i / 3) % 5 : (i + j) % 5)];
            const b = F.rect(x, y - bh, x + bw, y); P.fillPts(c, b, col, 0.55); stroke(c, b, { w: 1.8, closed: true, dry: false, seed: 1220 + i + j * 20 });
          }
        });
        P.write(c, 'düzenli raf → aradığını kolay bulursun', 960, 250, E.seg(t, ssh + 0.8, ssh + 2.2), { size: 42, align: 'center' });
      });
      // tarihçe kartı
      const hk = Math.min(E.se(t, sh + 0.1, sh + 0.7, 'out'), 1 - E.se(t, sr - 0.3, sr + 0.3));
      if (hk > 0) E.layer(ctx, hk, c => {
        F.card(c, 420, 230, 1500, 640, { seed: 1231 });
        P.write(c, 'Geçmişte:', 480, 320, E.seg(t, sh + 0.4, sh + 1.2), { size: 50, color: F.BR });
        P.write(c, 'artan atom kütlesine göre', 760, 320, E.seg(t, sh + 1.0, sh + 2.2), { size: 50 });
        P.arrow(c, [960, 380], [960, 460], E.se(t, sh + 2.4, sh + 3.0), { w: 3, head: 13 });
        P.write(c, 'Bugün:', 480, 540, E.seg(t, sh + 3.4, sh + 4.2), { size: 50, color: PAL.water });
        P.write(c, 'artan proton sayısına göre', 760, 540, E.seg(t, sh + 4.0, sh + 5.4), { size: 50, color: PAL.water });
      });
      // periyot / grup vurgusu (tam tabloda)
      if (morph > 0.95) {
        const pk = E.se(t, sr + 2.2, sr + 2.8), gk = E.se(t, sr + 3.4, sr + 4.0);
        const fade = 1 - E.se(t, sc + 0.1, sc + 0.6);
        if (pk * fade > 0) { ctx.save(); ctx.globalAlpha *= pk * fade; const y = Y0 + 2 * GY; stroke(ctx, F.rect(X0 - 8, y - 6, X0 + 18 * GX, y + H + 6), { w: 4, closed: true, color: PAL.water, seed: 1241 }); ctx.restore(); F.txt(ctx, '← periyot (yatay satır) →', 784, y + 44, { size: 36, align: 'center', color: PAL.water, alpha: pk * fade }); }
        if (gk * fade > 0) { ctx.save(); ctx.globalAlpha *= gk * fade; const x = X0 + 16 * GX; stroke(ctx, F.rect(x - 6, Y0 - 8, x + W + 6, Y0 + 7 * GY), { w: 4, closed: true, color: F.BR, seed: 1242 }); ctx.restore(); F.txt(ctx, 'grup (dikey sütun) ↓', x - 20, Y0 - 50, { size: 34, align: 'right', color: F.BR, alpha: gk * fade }); }
        const ck = E.se(t, sc + 1.2, sc + 2.0);
        if (ck > 0) {
          F.txt(ctx, '7 periyot', 784, 280, { size: 44, align: 'center', alpha: ck, color: PAL.water });
          F.txt(ctx, '8 tane A grubu · 10 tane B grubu', 784, 335, { size: 40, align: 'center', alpha: ck });
        }
      }
    }
  });
})();
