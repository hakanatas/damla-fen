// SAHNE 5–6 — Yaşam döngüsü; büyüme faktörleri; veri toplama-kaydetme-yorumlama; insan etkisi ve duyarlılık
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F06;
  const RED = F.RED;
  E.scene({
    name: 'Yaşam döngüsü', concept: 'Bitkinin yaşam döngüsü', from: 'cycle', to: 'cycle', trFrom: [960, 540],
    draw(ctx, t) {
      const s0 = E.s('cycle'); const C = [960, 540], R = 280;
      const ST = [
        { n: 'tohum', a: -Math.PI / 2, d: (c, x, y) => F.seed(c, x, y, 1.6, 1) },
        { n: 'çimlenme', a: -Math.PI / 2 + 1.2566, d: (c, x, y) => { F.seed(c, x, y + 10, 1.4, 2); line(c, [x - 10, y + 20], [x - 14, y + 60], { w: 2.4, color: '#A08A60', dry: false }); F.seedling(c, x + 6, y + 4, 40, { leaf: 0.5, ls: 0.7 }); } },
        { n: 'fide', a: -Math.PI / 2 + 2 * 1.2566, d: (c, x, y) => F.seedling(c, x, y + 50, 100, { ls: 0.9 }) },
        { n: 'çiçekli bitki', a: -Math.PI / 2 + 3 * 1.2566, d: (c, x, y) => F.plant(c, x, y + 70, 0.4, t, { roots: false }) },
        { n: 'meyve ve tohum', a: -Math.PI / 2 + 4 * 1.2566, d: (c, x, y) => { const pod = F.blob(x, y, 70, 22, 6900, 0.04, 40, -0.2); F.shape(c, pod, { fill: '#CFDDA6', col: F.LIFE, a: 0.6, seed: 6901 }); [-40, -13, 14, 41].forEach((dx, i) => F.seed(c, x + dx, y - dx * 0.2, 0.7, 10 + i)); } }
      ];
      INK.label(ctx, 'yaşam döngüsü', C[0], C[1] + 16, { size: 50, weight: 700, align: 'center', alpha: E.se(t, s0 + 8, s0 + 9) });
      ST.forEach((st, i) => {
        const at = s0 + 0.6 + i * 1.5, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const x = C[0] + Math.cos(st.a) * R * 1.25, y = C[1] + Math.sin(st.a) * R * 0.95;
        const b = circlePts(x, y, 110 * P.pop(k), 95 * P.pop(k), 40); P.fillPts(ctx, b, '#FBF8F1'); INK.wash(ctx, b, F.LIFE, 0.15, 7000 + i, { bleed: 2, blooms: 0 }); stroke(ctx, b, { w: 2.6, closed: true, seed: 7010 + i });
        E.layer(ctx, k, c => st.d(c, x, y - 12));
        INK.label(ctx, st.n, x, y + 128, { size: 36, weight: 700, align: 'center', alpha: k });
        // ok bir sonrakine
        const nx = ST[(i + 1) % 5]; const ka = E.se(t, at + 0.8, at + 1.5); if (ka <= 0 || (i === 4 && t < s0 + 8.2)) return;
        const a0 = st.a + 0.42, a1 = nx.a - 0.42 + (i === 4 ? 6.283 : 0);
        const arc = P.arc(C[0], C[1], R * 1.25, a0, a1, 20, R * 0.95); P.drawOn(ctx, arc, i === 4 ? E.se(t, s0 + 8.2, s0 + 9) : ka, { w: 3, color: F.LIFE_D });
        if ((i === 4 ? E.se(t, s0 + 8.2, s0 + 9) : ka) > 0.98) INK.arrowHead(ctx, arc[arc.length - 3], arc[arc.length - 1], 14, { w: 3, color: F.LIFE_D });
      });
    }
  });

  const DATA = [['Gün', 'Işıkta', 'Karanlıkta'], ['1', '3 cm', '3 cm'], ['3', '5 cm', '6 cm'], ['5', '8 cm', '10 cm'], ['7', '11 cm', '15 cm'], ['Renk', 'yeşil', 'soluk sarı']];
  const HL = [3, 5, 8, 11], HD = [3, 6, 10, 15];
  E.scene({
    name: 'Büyüme', concept: 'Büyüme faktörleri; veri toplama ve yorumlama', from: 'factors', to: 'human', trFrom: [960, 540],
    draw(ctx, t) {
      const sfa = E.s('factors'), sd = E.s('data'), si = E.s('interp'), sh = E.s('human');
      // 1) faktörler
      const fa = 1 - E.se(t, sd - 0.3, sd + 0.4);
      if (fa > 0) E.layer(ctx, fa, c => {
        const gy = 700; const soil = [[700, gy], [1220, gy - 4], [1220, gy + 160], [700, gy + 164]]; INK.wash(c, soil, '#8A6A45', 0.3, 97, { bleed: 3, blooms: 0 }); line(c, [700, gy], [1220, gy - 4], { w: 3, seed: 98 });
        F.plant(c, 960, gy, 0.8, t);
        const IC = [['su', F.icoWater, [420, 300]], ['ışık', (c2, x, y, s) => P.sun(c2, x, y, 44, t, { nrays: 14, cells: false }), [960, 190]], ['uygun sıcaklık', F.icoThermo, [1500, 300]], ['hava', (c2, x, y, s) => F.icoAir(c2, x, y, s, t), [420, 640]], ['mineraller', F.icoSoil, [1500, 660]]];
        IC.forEach(([n, fn, [x, y]], i) => { const at = sfa + 1.0 + i * 1.1, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return; E.layer(c, k, cc => { fn(cc, x, y, 1.3); INK.label(cc, n, x, y + 100, { size: 42, weight: 700, align: 'center' }); }); if (k > 0.8 && x !== 960) P.arrow(c, [x + (x < 960 ? 90 : x > 960 ? -90 : 0), y + (x === 960 ? 90 : 20)], [960 + (x < 960 ? -70 : x > 960 ? 70 : 0), x === 960 ? 330 : y > 500 ? 690 : 420], E.se(t, at + 0.3, at + 0.9), { w: 2.4, head: 12 }); });
      });
      // 2) veri: ışıkta / karanlıkta iki fide
      const da = E.se(t, sd - 0.1, sd + 0.6) * (1 - E.se(t, sh - 0.3, sh + 0.4));
      if (da > 0) E.layer(ctx, da, c => {
        const day = Math.min(7, 1 + Math.floor(E.clamp((t - sd - 1.5) / 6.5) * 6.999));
        const g = E.clamp((t - sd - 1.5) / 6.5);
        const hAt = (arr) => { const f = g * 3, i = Math.min(2, Math.floor(f)); return E.lerp(arr[i], arr[i + 1], f - i); };
        const px = 330, dx2 = 700, gy = 720, S = 28; // 1 cm = 28 px
        P.sun(c, 180, 250, 50, t, { nrays: 14, cells: false });
        F.pot(c, px, gy, 1); F.seedling(c, px, gy, hAt(HL) * S, { ls: 1 });
        F.pot(c, dx2, gy, 1); F.seedling(c, dx2, gy, hAt(HD) * S, { pale: 1, ls: 1 });
        const box = [[dx2 - 150, 250], [dx2 + 150, 250], [dx2 + 150, gy + 130], [dx2 - 150, gy + 130]]; P.fillPts(c, box.concat([box[0]]), '#3A3440', 0.16); stroke(c, box.concat([box[0]]), { w: 2.4, color: '#3A3440', seed: 7100 });
        INK.label(c, 'ışıkta', px, 880, { size: 40, weight: 700, align: 'center' }); INK.label(c, 'karanlık dolapta', dx2, 880, { size: 40, weight: 700, align: 'center' });
        // cetvel
        const rx = 510; line(c, [rx, gy], [rx, gy - 16 * S], { w: 2.4, seed: 7101 }); for (let cm = 0; cm <= 16; cm += 2) { line(c, [rx - 10, gy - cm * S], [rx + 10, gy - cm * S], { w: 1.4, dry: false }); if (cm % 4 === 0) INK.label(c, String(cm), rx + 16, gy - cm * S + 8, { size: 24, alpha: 0.7 }); }
        INK.label(c, 'cm', rx + 12, gy - 16 * S - 14, { size: 26, alpha: 0.7 });
        P.icon.calendar(c, 180, 450, 0.9, String(day)); INK.label(c, 'gün', 180, 530, { size: 30, align: 'center', alpha: 0.7 });
        // tablo
        F.card(c, 930, 190, 1800, 860, { seed: 7102 });
        P.write(c, 'Gözlem kaydı (örnek veri)', 980, 260, E.seg(t, sd + 0.5, sd + 1.5), { size: 44 });
        const at = [sd + 1.0, sd + 2.3, sd + 4.3, sd + 6.3, sd + 8.0, si + 1.5];
        F.table(c, t, { x: 980, y: 300, cols: [220, 280, 310], rh: 86, rows: DATA, at, size: 42, colColor: [PAL.ink, F.LIFE_D, '#8A7A30'] });
        // yorum vurgusu
        const kq = E.se(t, si + 0.3, si + 1.0);
        if (kq > 0) { F.marker(c, 1510, 300 + 4 * 86 + 57, 170, kq, PAL.light, 0.45); stroke(c, circlePts(dx2 + 12, gy - HD[3] * S, 60, 40, 30), { w: 3, closed: true, color: '#8A7A30', alpha: kq }); }
        const kh = E.se(t, si + 3.5, si + 4.3);
        if (kh > 0) { P.check(c, px - 90, 360, 60, kh, { w: 8, color: F.LIFE_D }); P.write(c, 'sağlıklı', px, 330, kh, { size: 40, align: 'center', color: F.LIFE_D }); }
      });
      // 3) insan etkisi
      const ha = E.se(t, sh - 0.1, sh + 0.6);
      if (ha > 0) E.layer(ctx, ha, c => {
        const gy = 700; line(c, [200, gy], [1720, gy - 4], { w: 3, seed: 7200 });
        // kesilmiş ağaç
        const st = [[330, gy], [330, gy - 70], [410, gy - 66], [410, gy]]; F.shape(c, st, { fill: '#D9C29C', col: '#6E5234', a: 0.6, seed: 7201 }); stroke(c, circlePts(370, gy - 68, 40, 10, 24), { w: 2, closed: true });
        INK.label(c, 'ağaç kesmek', 370, 790, { size: 38, weight: 700, align: 'center' });
        // koparılmış çiçek
        line(c, [900, gy], [906, gy - 110], { w: 4, color: F.LIFE_D }); line(c, [990, gy - 30], [1060, gy - 60], { w: 3, color: F.LIFE_D }); F.bloom(c, 1080, gy - 70, 30, 5);
        INK.label(c, 'çiçek koparmak', 960, 790, { size: 38, weight: 700, align: 'center' });
        // kirlilik
        const bag = F.blob(1520, gy - 40, 70, 40, 7210, 0.15); F.shape(c, bag, { fill: '#E2E0DA', col: '#9A9387', a: 0.5, seed: 7211 }); const can = [[1600, gy - 10], [1640, gy - 60], [1665, gy - 45], [1625, gy + 2]]; F.shape(c, can, { fill: '#D6E0E6', col: '#6A7A8A', a: 0.4, seed: 7212 });
        INK.label(c, 'kirlilik', 1560, 790, { size: 38, weight: 700, align: 'center' });
        [[370, 560], [990, 560], [1560, 560]].forEach(([x, y], i) => P.cross(c, x, y, 48, E.se(t, sh + 1.0 + i * 0.8, sh + 1.6 + i * 0.8), { w: 9, color: RED }));
        const kk = E.se(t, sh + 4.6, sh + 5.4, 'back');
        if (kk > 0) { c.save(); c.translate(960, 300); c.scale(kk, kk); const b = F.rrect(0, 0, 760, 110, 22, 6); P.fillPts(c, b, '#FBF8F1'); INK.wash(c, b, F.LIFE, 0.25, 7220, { bleed: 1, blooms: 0 }); stroke(c, b, { w: 3, closed: true, seed: 7221 }); c.font = '700 58px Kalam'; c.textAlign = 'center'; c.fillStyle = F.LIFE_D; c.fillText('Doğaya duyarlı olalım!', 0, 20); c.restore(); }
      });
    }
  });
})();
