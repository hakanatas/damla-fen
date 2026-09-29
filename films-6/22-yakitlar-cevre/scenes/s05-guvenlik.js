// SAHNE 5 — GÜVENLİK: soba ve doğal gaz zehirlenmeleri (karbon monoksit). Program: "Özellikle soba ve doğal gaz zehirlenmelerine değinilir."
(function () {
  const { PAL, line, stroke, circlePts, wash, dashed } = INK;
  const F = F622;
  const RED = F.RED;
  const nose = (c, x, y, s) => { c.save(); c.translate(x, y); c.scale(s, s); stroke(c, [[-6, -50], [-10, -10], [-30, 24], [-16, 34], [0, 30], [16, 34], [28, 24], [10, -10], [6, -50]], { w: 4, seed: 301 }); c.restore(); };
  function panel(ctx, t, a, b, fn) { const k = Math.min(E.se(t, a, a + 0.5), 1 - E.se(t, b - 0.35, b + 0.2)); if (k > 0) E.layer(ctx, k, fn); }
  E.scene({
    name: 'Güvenlik', concept: 'Karbon monoksit: soba ve doğal gaz zehirlenmeleri', from: 'co', to: 'stove', trFrom: [1250, 520],
    draw(ctx, t) {
      const s0 = E.s('co'), s1 = E.s('co-what'), s2 = E.s('symptoms'), s3 = E.s('prevent'), s4 = E.s('stove'), sEnd = E.e('stove');
      ctx.fillStyle = 'rgba(162,58,42,0.05)'; ctx.fillRect(0, 0, E.W, E.H);
      // güvenlik kartı
      const card = [[640, 150], [1860, 140], [1866, 900], [648, 908], [640, 150]];
      ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 24; P.fillPts(ctx, card, '#FAF6EC'); ctx.restore();
      stroke(ctx, card, { w: 3.4, closed: true, color: RED, seed: 88 });
      line(ctx, [650, 226], [1856, 216], { w: 3, color: RED, dry: false });
      F.fit(ctx, '⚠  GÜVENLİK: KARBON MONOKSİT (CO)', 1253, 202, 1100, 46, { color: RED });
      // 1) tam yanmama → CO
      panel(ctx, t, s0, s1, c => {
        F.stove(c, 900, 820, 1.2, t, { fire: 0.35, pipe: [[0, -210], [0, -440]] });
        const gk = E.se(t, s0 + 2.0, s0 + 4.0);
        for (let i = 0; i < 7; i++) { const k = ((t * 0.2 + i / 7) % 1); const x = 960 + k * 300 + Math.sin(t + i) * 20, y = 640 - k * 260 + (i % 3) * 30; c.save(); c.globalAlpha *= gk * Math.sin(k * Math.PI); dashed(c, circlePts(x, y, 34, 26, 30), { w: 2.2, on: 6, off: 6, color: '#4A4852' }); F.fit(c, 'CO', x, y + 10, 50, 26, { color: '#4A4852' }); c.restore(); }
        P.write(c, 'Yakıt tam yanmazsa', 1480, 380, E.seg(t, s0 + 1.0, s0 + 2.2), { size: 52, align: 'center' });
        P.write(c, 'karbon monoksit (CO)', 1480, 460, E.seg(t, s0 + 2.4, s0 + 3.6), { size: 52, align: 'center', color: RED });
        P.write(c, 'gazı oluşur.', 1480, 530, E.seg(t, s0 + 3.4, s0 + 4.4), { size: 52, align: 'center', color: RED });
      });
      // 2) renksiz, kokusuz, zehirli
      panel(ctx, t, s1, s2, c => {
        const it = [['renksiz', cc => P.icon.eye(cc, 0, 0, 0.8, E.se(t, s1 + 1.0, s1 + 1.6))], ['kokusuz', cc => { nose(cc, 0, 0, 1.4); P.cross(cc, 0, 0, 56, E.se(t, s1 + 2.0, s1 + 2.6), { w: 9, color: RED }); }], ['zehirli', cc => F.lungs(cc, 0, 0, 0.9, 0.8)]];
        it.forEach(([name, draw], i) => { const x = 900 + i * 360, k = E.se(t, s1 + 0.3 + i * 0.9, s1 + 0.8 + i * 0.9, 'out'); if (k <= 0) return; c.save(); c.translate(x, 420); c.scale(P.pop(k), P.pop(k)); draw(c); c.restore(); F.fit(c, name, x, 580, 300, 52, { color: i === 2 ? RED : PAL.ink }); });
        P.write(c, 'Soba ve doğal gaz zehirlenmelerinin', 1253, 720, E.seg(t, s1 + 3.4, s1 + 4.8), { size: 46, align: 'center' });
        P.write(c, 'nedeni karbon monoksittir.', 1253, 790, E.seg(t, s1 + 4.6, s1 + 5.8), { size: 46, align: 'center', color: RED });
      });
      // 3) belirtiler → ne yapmalı
      panel(ctx, t, s2, s3, c => {
        ['baş ağrısı', 'baş dönmesi', 'bulantı', 'uyku hâli'].forEach((s, i) => {
          const k = E.se(t, s2 + 0.3 + i * 0.7, s2 + 0.8 + i * 0.7, 'out'); if (k <= 0) return;
          const y = 320 + i * 110; c.save(); c.globalAlpha *= k;
          const b = F.rr(720, y - 44, 360, 76, 14); P.fillPts(c, b, '#FBF8F1'); wash(c, b, RED, 0.18, 310 + i, { bleed: 1, blooms: 0 }); stroke(c, b, { w: 2.4, closed: true, color: RED, seed: 314 + i });
          F.fit(c, s, 900, y + 10, 320, 42); c.restore();
        });
        const ak = E.se(t, s2 + 3.2, s2 + 4.0); if (ak > 0) P.arrow(c, [1110, 480], [1230, 480], ak, { w: 4, color: RED, head: 16 });
        const wk = E.se(t, s2 + 3.8, s2 + 4.6, 'out');
        if (wk > 0) { c.save(); c.globalAlpha *= wk; F.window(c, 1400, 440, 1.1, E.se(t, s2 + 4.0, s2 + 5.0), t); c.restore(); }
        P.write(c, 'Hemen temiz havaya çık!', 1560, 660, E.seg(t, s2 + 4.6, s2 + 5.8), { size: 48, align: 'center', color: RED });
        P.write(c, 'Bir yetişkine haber ver · 112', 1560, 740, E.seg(t, s2 + 5.8, s2 + 7.0), { size: 44, align: 'center' });
        if (t > s2 + 4.4) E.inkText(c, 'Pencereyi aç', 1500, 322, t, s2 + 4.4, 1e9, { size: 38 });
      });
      // 4) önlemler
      panel(ctx, t, s3, s4, c => {
        const it = [['Baca temizliği', 'her yıl', cc => F.brush(cc, 0, 0, 1.1)], ['Yetkili kurulum', 've düzenli bakım', cc => { F.boiler(cc, -30, 10, 0.8, t); F.wrench(cc, 60, 20, 0.8); }], ['CO dedektörü', 'evde olmalı', cc => F.detector(cc, 0, 0, 1.1, t, E.seg(t, s3 + 5.5, s3 + 6) * (1 - E.seg(t, s3 + 8, s3 + 8.5)))]];
        it.forEach(([a, b, draw], i) => {
          const x = 860 + i * 390, k = E.se(t, s3 + 0.4 + i * 1.6, s3 + 1.0 + i * 1.6, 'out'); if (k <= 0) return;
          c.save(); c.translate(x, 450); c.scale(P.pop(k), P.pop(k)); draw(c); c.restore();
          F.fit(c, a, x, 660, 360, 46, { color: RED }); F.fit(c, b, x, 715, 360, 40, { weight: 400 });
          P.check(c, x, 790, 50, E.se(t, s3 + 1.0 + i * 1.6, s3 + 1.5 + i * 1.6), { w: 8, color: F.GREEN });
        });
      });
      // 5) yatmadan önce + gaz kokusu
      panel(ctx, t, s4, sEnd + 0.4, c => {
        c.save(); c.translate(900, 470); F.stove(c, 0, 150, 0.8, t, { fire: 0.6, pipe: [[0, -210], [0, -300]] }); F.coal(c, 150, 100, 0.6); P.cross(c, 150, 90, 60, E.se(t, s4 + 0.8, s4 + 1.4), { w: 9, color: RED }); c.restore();
        P.write(c, 'Yatmadan önce', 900, 700, E.seg(t, s4 + 0.4, s4 + 1.2), { size: 42, align: 'center' });
        P.write(c, 'sobaya yakıt ekleme!', 900, 755, E.seg(t, s4 + 1.0, s4 + 2.0), { size: 42, align: 'center', color: RED });
        line(c, [1150, 280], [1150, 840], { w: 2, alpha: 0.4, dry: false });
        const gk = E.se(t, s4 + 3.0, s4 + 3.6, 'out');
        if (gk > 0) {
          c.save(); c.globalAlpha *= gk;
          F.fit(c, 'Gaz kokusu alırsan:', 1500, 320, 600, 46, { color: RED });
          ['pencereleri aç', 'elektrik düğmelerine dokunma', 'bir yetişkine haber ver', 'Doğal gaz acil: 187'].forEach((s, i) => { const k = E.se(t, s4 + 3.6 + i * 0.8, s4 + 4.2 + i * 0.8); if (k <= 0) return; c.save(); c.globalAlpha *= k; F.fit(c, '• ' + s, 1210, 420 + i * 100, 620, 42, { align: 'left', color: i === 3 ? RED : PAL.ink }); c.restore(); });
          c.restore();
        }
      });
      F.damla(ctx, t, { x: 330, y: 890, expr: t < s1 ? 'surprised' : 'determined', view: 'q3', arms: [[-1, 0.4], [1, 2.0]], look: [0.8, -0.3] });
    }
  });
})();
