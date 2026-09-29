// SAHNE 4 — Deneyimleri gözden geçirme, çıkarım, grup tartışması (vızıltı grupları), değerlendirme, sürdürülebilirlik
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const RED = W7.RED;
  const DAYS = [
    ['Pazartesi', 'pet şişe su aldım', false],
    ['Salı', 'yarısı boş kâğıtları attım', false],
    ['Çarşamba', 'atıklarımı ayrıştırdım', true],
    ['Perşembe', 'kavanozu yeniden doldurdum', true],
    ['Cuma', 'meyve kabukları komposta', true]
  ];
  const NOTES = [
    { x: 600, y: 390, txt: ['sınıfa', 'kâğıt kutusu'], col: '#F6E7B8', r: -0.04 },
    { x: 1260, y: 390, txt: ['kantinde matara', 've bez torba'], col: '#E5EED6', r: 0.03 },
    { x: 600, y: 680, txt: ['bahçede', 'kompost kutusu'], col: '#F3DCC8', r: 0.02 },
    { x: 1260, y: 680, txt: ['kapaklardan', 'okul panosu'], col: '#DDE8F0', r: -0.03 }
  ];
  function matara(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = W7.rr(-26, -50, 52, 110, 14); P.fillPts(ctx, b, PAL.white); wash(ctx, b, '#6D86B0', 0.7, 960); stroke(ctx, b, { w: 2.8, closed: true, seed: 961 });
    const c = W7.rr(-16, -70, 32, 22, 4); P.fillPts(ctx, c, '#8E8E8E', 0.9); stroke(ctx, c, { w: 2.4, closed: true, dry: false });
    line(ctx, [-16, -36], [-16, 44], { w: 3, color: PAL.white, dry: false, alpha: 0.8 });
    ctx.restore();
  }
  function buzz(ctx, x, y, t, seed) { // vızıltı çizgisi
    const pts = []; for (let i = 0; i <= 30; i++) { const u = i / 30; pts.push([x + u * 70, y + Math.sin(u * 18 + t * 8 + seed) * 6]); }
    ctx.save(); ctx.globalAlpha *= 0.6; stroke(ctx, pts, { w: 2, dry: false }); ctx.restore();
  }
  E.scene({
    name: 'Yansıtma', concept: 'Deneyimleri gözden geçir, çıkarım yap', from: 'diary', to: 'inference', trFrom: [960, 540],
    draw(ctx, t) {
      const sd = E.s('diary'), si = E.s('inference');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 70, 1040, 840);
      P.write(ctx, 'Atık günlüğüm', 800, 175, E.seg(t, sd + 0.3, sd + 1.3), { size: 60, align: 'center' });
      DAYS.forEach(([d, txt, ok], i) => {
        const at = sd + (i < 2 ? 2.0 + i * 2.4 : 6.6 + (i - 2) * 1.2), y = 310 + i * 110;
        if (t < at) return;
        P.write(ctx, d, 300, y, E.seg(t, at, at + 0.6), { size: 36, color: '#8A6A45' });
        P.write(ctx, txt, 510, y, E.seg(t, at + 0.3, at + 1.3), { size: 40 });
        if (ok) P.check(ctx, 1110, y - 16, 44, E.se(t, at + 1.2, at + 1.6), { w: 6, color: '#3F7A3A' });
        else P.cross(ctx, 1110, y - 12, 20, E.se(t, at + 1.2, at + 1.6), { w: 6, color: RED });
      });
      const dk = 1 - E.se(t, si - 0.1, si + 0.4);
      if (dk > 0) E.layer(ctx, dk, c => DAMLA.draw(c, { x: 1490, y: 820, s: 1.3, view: 'q3', flip: true, expr: 'thinking', look: [-0.7, 0.1], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 2, prop: 'notebook', arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]] }));
      if (t > si) DAMLA.draw(ctx, { x: 1840, y: 1080, s: 0.8, view: 'q3', flip: true, expr: 'determined', look: [-0.8, -0.4], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 2, arms: [[-1, 0.4], [1, 2.3]] });
      // çıkarım kartı
      const ck = E.se(t, si + 0.1, si + 0.7, 'out');
      if (ck > 0) {
        ctx.save(); ctx.translate(1500, 500); ctx.rotate(0.02); ctx.scale(P.pop(ck), P.pop(ck));
        const card = [[-290, -330], [290, -334], [296, 330], [-286, 334], [-290, -330]];
        ctx.save(); ctx.shadowColor = 'rgba(40,30,20,0.25)'; ctx.shadowBlur = 20; P.fillPts(ctx, card, '#FAF6EC'); ctx.restore(); stroke(ctx, card, { w: 3, closed: true, color: '#3F7A3A' });
        ctx.restore();
        P.write(ctx, 'Çıkarımım', 1500, 250, E.seg(t, si + 0.5, si + 1.3), { size: 54, align: 'center', color: '#3F7A3A' });
        const mk = E.se(t, si + 1.2, si + 1.8, 'out');
        if (mk > 0) { matara(ctx, 1420, 420, 1.2 * P.pop(mk)); W7.item(ctx, 'plastikSise', 1600, 420, 1.0); P.cross(ctx, 1600, 420, 60, E.se(t, si + 2.2, si + 2.8), { w: 8, color: RED }); }
        P.write(ctx, 'Matara taşırsam', 1500, 590, E.seg(t, si + 2.4, si + 3.4), { size: 40, align: 'center' });
        P.write(ctx, 'şişe atığı hiç oluşmaz.', 1500, 640, E.seg(t, si + 3.2, si + 4.2), { size: 40, align: 'center' });
        P.write(ctx, 'Önlemek, geri', 1500, 740, E.seg(t, si + 4.6, si + 5.4), { size: 46, align: 'center', color: '#3F7A3A' });
        P.write(ctx, 'dönüşümden de iyidir!', 1500, 794, E.seg(t, si + 5.2, si + 6.2), { size: 46, align: 'center', color: '#3F7A3A' });
      }
    }
  });
  E.scene({
    name: 'Grup tartışması', concept: 'Vızıltı grupları ve değerlendirme', from: 'buzz', to: 'evaluate', trFrom: [960, 540],
    draw(ctx, t) {
      const sb = E.s('buzz'), se = E.s('evaluate');
      // mantar pano
      const bd = [[250, 230], [1660, 222], [1670, 850], [258, 858], [250, 230]];
      P.fillPts(ctx, bd, '#D9B98A'); wash(ctx, bd, '#8A6A45', 0.35, 1100, { bleed: 2, blooms: 3 }); stroke(ctx, bd, { w: 8, closed: true, seed: 1101, color: '#6B4A2A' });
      P.write(ctx, 'Okulumuzda neler yapabiliriz?', 1180, 170, E.seg(t, sb + 0.3, sb + 1.6), { size: 56, align: 'center' });
      NOTES.forEach((n, i) => {
        const at = sb + 1.6 + i * 1.2, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
        ctx.save(); ctx.translate(n.x, n.y); ctx.rotate(n.r); ctx.scale(P.pop(k), P.pop(k));
        const nt = [[-250, -105], [250, -108], [254, 105], [-246, 108], [-250, -105]];
        ctx.save(); ctx.shadowColor = 'rgba(40,30,20,0.25)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 4; P.fillPts(ctx, nt, n.col); ctx.restore(); stroke(ctx, nt, { w: 2, closed: true, dry: false });
        P.fillPts(ctx, circlePts(0, -92, 9, 9, 12), '#B5553F', 0.9);
        W7.fit(ctx, n.txt[0], 0, -8, 460, 46); W7.fit(ctx, n.txt[1], 0, 50, 460, 46);
        ctx.restore();
        if (t < se) buzz(ctx, n.x + 170, n.y - 120, t, i);
      });
      // değerlendirme damgaları
      const sk = E.se(t, se + 1.2, se + 1.8, 'out');
      if (sk > 0) {
        ctx.save(); ctx.translate(700, 512); ctx.rotate(-0.08); ctx.scale(P.pop(sk), P.pop(sk));
        const st = W7.rr(-150, -34, 300, 68, 10); P.fillPts(ctx, st, PAL.white, 0.95); stroke(ctx, st, { w: 4, closed: true, color: '#3F7A3A', dry: false });
        W7.fit(ctx, 'hemen uygulanabilir!', 0, 13, 280, 36, { color: '#3F7A3A' }); ctx.restore();
        P.check(ctx, 395, 385, 60, E.se(t, se + 1.6, se + 2.2), { w: 8, color: '#3F7A3A' });
      }
      [[1260, 390], [600, 680], [1260, 680]].forEach(([x, y], i) => {
        const k = E.se(t, se + 3.4 + i * 0.4, se + 3.9 + i * 0.4, 'out'); if (k <= 0) return;
        ctx.save(); ctx.translate(x + 90, y + 122); ctx.rotate(-0.05); ctx.scale(P.pop(k), P.pop(k));
        const st = W7.rr(-130, -26, 260, 52, 8); P.fillPts(ctx, st, PAL.white, 0.95); stroke(ctx, st, { w: 2.6, closed: true, color: '#8A6A45', dry: false });
        W7.fit(ctx, 'öğretmenle planla', 0, 11, 240, 34, { color: '#8A4A10' }); ctx.restore();
      });
      DAMLA.draw(ctx, { x: 1780, y: 1075, s: 0.9, view: 'q3', flip: true, expr: t > se + 1.5 ? 'happy' : 'curious', look: [-0.8, -0.4], blink: E.blink(t, 10), squash: E.breath(t), t, talk: E.talk(t), seed: 2, arms: [[-1, 0.4], [1, 2.3 + Math.sin(t * 2) * 0.1]] });
    }
  });
  E.scene({
    name: 'Sürdürülebilirlik', concept: 'Atık yönetimi sürdürülebilirliğin parçasıdır', from: 'sustain', to: 'sustain', trFrom: [960, 520],
    draw(ctx, t) {
      const ss = E.s('sustain');
      ctx.save(); ctx.globalAlpha = 0.14; ctx.fillStyle = PAL.life; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
      P.write(ctx, 'Sürdürülebilirlik', 1180, 175, E.seg(t, ss + 3.0, ss + 4.2), { size: 66, align: 'center', color: '#3F7A3A' });
      const ek = E.se(t, ss + 0.2, ss + 1.0, 'out');
      P.earth(ctx, 960, 510, 160 * P.pop(ek), { rot: t * 0.02 });
      // döngü okları
      const ak = E.se(t, ss + 1.2, ss + 2.6);
      for (let i = 0; i < 3; i++) {
        const a0 = i * 2.094 - 1.4, pts = P.arc(960, 510, 225, a0, a0 + 1.6, 30);
        P.drawOn(ctx, pts, ak, { w: 6, color: '#3F7A3A' }); if (ak > 0.98) INK.arrowHead(ctx, pts[27], pts[30], 20, { w: 5, color: '#3F7A3A' });
      }
      // sol: temizlik ; sağ: gelecek nesiller
      const lk = E.se(t, ss + 1.0, ss + 1.8, 'out');
      if (lk > 0) { W7.bin(ctx, 'yesil', 360, 620, 0.7 * P.pop(lk)); P.write(ctx, 'temiz çevre', 360, 710, E.seg(t, ss + 1.4, ss + 2.4), { size: 44, align: 'center' }); }
      const rk = E.se(t, ss + 4.4, ss + 5.2, 'out');
      if (rk > 0) {
        W7.tree(ctx, 1480, 640, 0.45 * P.pop(rk), 21, t); W7.tree(ctx, 1600, 640, 0.75 * P.pop(rk), 22, t);
        P.write(ctx, 'korunan kaynaklar', 1560, 710, E.seg(t, ss + 4.8, ss + 5.8), { size: 44, align: 'center' });
        P.write(ctx, '→ gelecek nesillere', 1560, 765, E.seg(t, ss + 5.6, ss + 6.6), { size: 40, align: 'center', color: '#3F7A3A' });
      }
      DAMLA.draw(ctx, { x: 960, y: 900, s: 0.8, view: 'front', expr: 'happy', look: [0, -0.5], blink: E.blink(t, 13), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 2.6], [1, 2.6]] });
    }
  });
})();
