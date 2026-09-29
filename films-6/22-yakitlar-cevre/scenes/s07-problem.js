// SAHNE 7 — Bir çevre problemini çözme: sorunu yapılandır, özetle, veriye dayalı tahmin, önermeler üzerinden akıl yürüt, değerlendir (FB.6.7.4)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F622;
  const flame = (c, x, y, s, t) => { c.save(); c.translate(x, y); c.scale(s, s); const p = []; for (let i = 0; i <= 24; i++) { const a = i / 24 * Math.PI * 2; p.push([Math.sin(a) * 26 * (0.6 + 0.4 * Math.cos(a / 2)), -40 + Math.cos(a) * 40 - (Math.cos(a) > 0.9 ? 16 + Math.sin(t * 8) * 5 : 0)]); } P.fillPts(c, p, '#C8553D', 0.85); P.fillPts(c, circlePts(0, -20, 10, 18, 14), PAL.light, 0.95); c.restore(); };
  const PROBS = [
    ['su kirliliği', (c, t) => { F.drop(c, 0, 0, 1.3, PAL.water, 1); }],
    ['toprak kirliliği', (c, t) => { const s = [[-70, 40], [-60, 0], [0, -12], [60, 0], [70, 40], [-70, 40]]; P.fillPts(c, s, '#8A5A34', 0.7); stroke(c, s, { w: 2.4, closed: true, dry: false }); const bo = F.rr(-30, -40, 22, 40, 5); P.fillPts(c, bo, PAL.water, 0.4); stroke(c, bo, { w: 2, closed: true, dry: false }); INK.inkDot(c, 30, 10, 6, { color: '60,40,30' }); }],
    ['orman yangını', (c, t) => { F.pine(c, -30, 50, 0.8, '#4F6E4A'); flame(c, 30, 50, 1.2, t); }],
    ['ormansızlaşma', (c, t) => { [-50, 0, 50].forEach((x, i) => { const b = [[x - 16, 40], [x - 13, 10], [x + 13, 8], [x + 16, 40]]; P.fillPts(c, b.concat([b[0]]), '#C9A46A'); stroke(c, b, { w: 2.4, dry: false }); P.fillPts(c, circlePts(x, 9, 13, 4, 14), '#E8D6B4'); }); }]
  ];
  const QS = [['Ne?', 'dumanlı, kötü kokulu hava'], ['Nerede?', 'mahallemizde'], ['Ne zaman?', 'kış akşamları'], ['Neden?', 'kömür ve odun sobaları'], ['Kimi etkiler?', 'herkesi; en çok çocuk ve yaşlıları']];
  const ROWS = [['Evleri yalıtmak', ['c', 'kısmen', 'yok'], 'güçlü öneri', 1], ['Doğru yakma, kaliteli yakıt', ['c', 'c', 'yok'], 'güçlü öneri', 1], ['Evi hiç havalandırmamak', ['x', 'c', 'CO tehlikesi!'], 'güvenli değil!', 0]];
  E.scene({
    name: 'Çevre problemi', concept: 'Çevre sorununu yapılandırma, tahmin, değerlendirme', from: 'problems', to: 'evaluate', trFrom: [960, 540],
    draw(ctx, t) {
      const sp = E.s('problems'), ss = E.s('structure'), sd = E.s('predict'), sr = E.s('reason'), sv = E.s('evaluate');
      ctx.fillStyle = 'rgba(111,138,58,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
      const damlaX = 250;
      // 1) sorunlar
      const pA = 1 - E.se(t, ss - 0.2, ss + 0.4);
      if (pA > 0) E.layer(ctx, pA, c => {
        P.write(c, 'Çevre sorunlarının çoğu insan kaynaklı', 1170, 240, E.seg(t, sp + 0.3, sp + 1.6), { size: 50, align: 'center', color: '#2F4A1E' });
        PROBS.forEach(([name, draw], i) => {
          const x = 660 + i * 340, k = E.se(t, sp + 1.0 + i * 0.9, sp + 1.5 + i * 0.9, 'out'); if (k <= 0) return;
          c.save(); c.translate(x, 520); c.scale(P.pop(k), P.pop(k));
          F.card(c, -150, -170, 300, 320, 800 + i, { blur: 12 });
          c.save(); c.translate(0, -40); draw(c, t); c.restore();
          F.fit(c, name, 0, 110, 270, 40);
          c.restore();
        });
      });
      // 2) yapılandır + özet
      const sA = Math.min(E.se(t, ss, ss + 0.5), 1 - E.se(t, sd - 0.2, sd + 0.4));
      if (sA > 0) E.layer(ctx, sA, c => {
        const cx = 1150, cy = 400;
        const cp = INK.wobble(circlePts(cx, cy, 250, 70, 50), 3, 820); P.fillPts(c, cp, '#F6E7B8'); stroke(c, cp, { w: 3, closed: true, seed: 821 });
        F.fit(c, 'Kış hava kirliliği', cx, cy - 4, 440, 46); F.fit(c, '(mahallemde)', cx, cy + 40, 300, 30, { weight: 400 });
        const pos = [[620, 200], [1680, 200], [620, 580], [1680, 580], [1150, 600]];
        QS.forEach(([q, a], i) => {
          const at = ss + 0.8 + i * 0.8, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
          const [x, y] = pos[i];
          c.save(); c.globalAlpha *= k;
          P.drawOn(c, [[cx + (x - cx) * 0.45, cy + (y - cy) * 0.45], [cx + (x - cx) * 0.78, cy + (y - cy) * 0.78]], k, { w: 2.2, dry: false });
          F.fit(c, q, x, y, 330, 40, { color: F.HEAT }); F.fit(c, a, x, y + 44, 400, 32, { weight: 400 });
          c.restore();
        });
        const ok = E.se(t, ss + 5.2, ss + 5.9, 'out');
        if (ok > 0) { c.save(); c.globalAlpha *= ok; F.card(c, 470, 720, 1360, 130, 830, { tint: '#C99A22', tintA: 0.18, blur: 10 }); F.fit(c, 'Özet: Kış akşamları yakılan kömür ve odun dumanı', 1150, 775, 1300, 40); F.fit(c, 'mahallemizin havasını kirletiyor.', 1150, 825, 1300, 40); c.restore(); }
      });
      // 3) veri + tahmin
      const dA = Math.min(E.se(t, sd, sd + 0.5), 1 - E.se(t, sr - 0.2, sr + 0.4));
      if (dA > 0) E.layer(ctx, dA, c => {
        const gx = 520, gy = 700, gw = 760, gh = 400;
        line(c, [gx, gy], [gx + gw, gy], { w: 3 }); line(c, [gx, gy], [gx, gy - gh], { w: 3 });
        F.fit(c, 'hava kirliliği', gx + 10, gy - gh - 16, 300, 32, { align: 'left', color: '#4A4852' });
        const M = ['Eyl', 'Eki', 'Kas', 'Ara', 'Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu'], V = [0.3, 0.45, 0.7, 0.9, 0.95, 0.85, 0.6, 0.4, 0.3, 0.25, 0.25, 0.25];
        M.forEach((m, i) => {
          const k = E.se(t, sd + 0.4 + i * 0.12, sd + 1.0 + i * 0.12); const bh = gh * 0.85 * V[i] * k, x = gx + 20 + i * 61;
          const b = [[x, gy], [x, gy - bh], [x + 44, gy - bh], [x + 44, gy], [x, gy]]; const winter = i >= 2 && i <= 5;
          if (bh > 2) { P.fillPts(c, b, winter ? F.SMOKE : '#B7B1A6', 0.75); stroke(c, b, { w: 1.6, closed: true, dry: false }); }
          F.fit(c, m, x + 22, gy + 34, 60, 24, { weight: 400 });
        });
        F.fit(c, 'kış', gx + 20 + 3.5 * 61 + 22, gy - gh * 0.85 - 30, 120, 36, { color: F.HEAT });
        INK.label(c, '(temsili grafik; ölçüm verilerinin genel eğilimi)', gx, gy + 78, { size: 26, alpha: 0.65 });
        const tk = E.se(t, sd + 3.4, sd + 4.1, 'out');
        if (tk > 0) {
          c.save(); c.globalAlpha *= tk;
          F.card(c, 1370, 250, 460, 440, 840, { tint: F.GREEN, tintA: 0.1 });
          F.fit(c, 'Tahminim', 1600, 320, 400, 50, { color: F.GREEN });
          ['Evler yalıtılırsa', '↓', 'daha az yakıt yakılır', '↓', 'hava daha temiz olur'].forEach((s, i) => { const k = E.se(t, sd + 4.0 + i * 0.5, sd + 4.5 + i * 0.5); if (k > 0) { c.save(); c.globalAlpha *= k; F.fit(c, s, 1600, 400 + i * 58, 420, s === '↓' ? 40 : 38); c.restore(); } });
          c.restore();
        }
      });
      // 4) akıl yürüt + değerlendir: tablo
      const tA = E.se(t, sr, sr + 0.5);
      if (tA > 0) E.layer(ctx, tA, c => {
        const X = [470, 1000, 1240, 1480, 1830], Y0 = 200, RH = 150;
        const heads = ['Öneri', 'Etkili mi?', 'Uygulanabilir mi?', 'Yan etkisi?'];
        heads.forEach((h, i) => F.fit(c, h, (X[i] + X[i + 1]) / 2, Y0 + 50, X[i + 1] - X[i] - 20, 36, { color: '#2F4A1E' }));
        line(c, [X[0], Y0 + 75], [X[4], Y0 + 75], { w: 2.6 });
        for (let i = 1; i < 4; i++) line(c, [X[i], Y0 + 10], [X[i], Y0 + 75 + RH * 3], { w: 1.6, alpha: 0.5, dry: false });
        ROWS.forEach(([name, cells, verdict, good], r) => {
          const y = Y0 + 75 + RH * r + RH / 2; const at = sr + 0.8 + r * 1.8;
          const k = E.se(t, at, at + 0.5); if (k <= 0) return;
          c.save(); c.globalAlpha *= k; F.fit(c, name, X[0] + 10, y + 12, X[1] - X[0] - 30, 38, { align: 'left' }); c.restore();
          cells.forEach((v, j) => {
            const ck = E.se(t, at + 0.4 + j * 0.4, at + 0.8 + j * 0.4); if (ck <= 0) return; const x = (X[j + 1] + X[j + 2]) / 2;
            if (v === 'c') P.check(c, x - 6, y - 4, 50, ck, { w: 8, color: F.GREEN });
            else if (v === 'x') P.cross(c, x, y, 26, ck, { w: 7, color: F.RED });
            else { c.save(); c.globalAlpha *= ck; F.fit(c, v, x, y + 12, X[j + 2] - X[j + 1] - 20, 34, { color: v.includes('!') ? F.RED : PAL.ink }); c.restore(); }
          });
          line(c, [X[0], Y0 + 75 + RH * (r + 1)], [X[4], Y0 + 75 + RH * (r + 1)], { w: 1.4, alpha: 0.4, dry: false });
          const vk = E.se(t, sv + 0.6 + r * 1.6, sv + 1.2 + r * 1.6, 'out');
          if (vk > 0) { c.save(); c.translate(X[0] + 250, y + 50); c.rotate(-0.04); c.globalAlpha *= vk; const col = good ? F.GREEN : F.RED; const st = F.rr(-130, -26, 260, 46, 10); P.fillPts(c, st, '#FBF8F1', 0.9); stroke(c, st, { w: 2.6, closed: true, color: col, seed: 850 + r }); F.fit(c, verdict, 0, 8, 240, 30, { color: col }); c.restore(); }
        });
        if (t > sv) E.inkText(c, 'Değerlendirme', 1150, 170, t, sv + 0.2, 1e9, { size: 46, align: 'center', color: F.HEAT });
      });
      F.damla(ctx, t, { x: damlaX, y: 890, s: 1.2, expr: t > sv ? 'determined' : 'thinking', view: 'q3', arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook', look: [0.8, -0.3] });
    }
  });
})();
