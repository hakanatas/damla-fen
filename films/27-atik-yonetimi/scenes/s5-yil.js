// SAHNE 5 — Kaydet (son sayfa) + FİNAL: Damla bir yılın gözlem defterine bakar (7 ünite)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  // ---- ünite simgeleri (merkez x,y; ~150px) ----
  const U = [];
  U.push({ n: 1, name: 'Güneş, Dünya, Ay', draw: (c, x, y, t) => { P.sun(c, x - 50, y, 42, t, { nrays: 12, cells: false, glow: false }); P.earth(c, x + 40, y + 10, 24); P.moon(c, x + 82, y - 22, 11); } });
  U.push({ n: 2, name: 'Kuvvet', draw: (c, x, y) => { // dinamometre
    const tb = W7.rr(x - 18, y - 80, 36, 100, 8); P.fillPts(c, tb, PAL.white); stroke(c, tb, { w: 2.6, closed: true });
    const sp = []; for (let i = 0; i <= 40; i++) { const u = i / 40; sp.push([x + Math.sin(u * Math.PI * 12) * 10, y - 70 + u * 80]); } stroke(c, sp, { w: 1.8, dry: false });
    line(c, [x, y + 20], [x, y + 40], { w: 2.4 }); stroke(c, P.arc(x + 6, y + 44, 7, Math.PI, Math.PI * 2.6, 10), { w: 2.4, dry: false });
    const wgt = W7.rr(x - 26, y + 52, 52, 36, 6); P.fillPts(c, wgt, '#8E8E8E'); stroke(c, wgt, { w: 2.4, closed: true }); W7.fit(c, '1 N', x, y + 78, 44, 20, { color: PAL.white });
    line(c, [x, y - 80], [x, y - 94], { w: 2.4 }); } });
  U.push({ n: 3, name: 'Hücre', draw: (c, x, y) => { const m = INK.wobble(circlePts(x, y, 80, 58, 40), 4, 1200); P.fillPts(c, m, '#E5EED6'); wash(c, m, PAL.life, 0.35, 1201); stroke(c, m, { w: 3, closed: true, seed: 1202 }); const nu = circlePts(x + 14, y - 4, 22, 18, 24); P.fillPts(c, nu, '#8FAE4A', 0.8); stroke(c, nu, { w: 2.4, closed: true, dry: false }); [[-40, 10], [-20, 30], [40, 26]].forEach(([dx, dy], i) => stroke(c, circlePts(x + dx, y + dy, 9, 5, 12, i), { w: 1.6, closed: true, dry: false })); } });
  U.push({ n: 4, name: 'Işık', draw: (c, x, y) => { P.fillPts(c, circlePts(x - 40, y, 20, 20, 20), PAL.light, 0.95); stroke(c, circlePts(x - 40, y, 20, 20, 20), { w: 2.4, closed: true, dry: false }); for (let i = 0; i < 10; i++) { const a = i / 10 * 6.283; line(c, [x - 40 + Math.cos(a) * 28, y + Math.sin(a) * 28], [x - 40 + Math.cos(a) * 58, y + Math.sin(a) * 58], { w: 2.4, color: '#C07F1E', dry: false }); } const bx = [[x + 40, y - 30], [x + 70, y - 30], [x + 70, y + 30], [x + 40, y + 30], [x + 40, y - 30]]; P.fillPts(c, bx, '#8A6A45'); stroke(c, bx, { w: 2.4, closed: true }); P.fillPts(c, [[x + 70, y - 30], [x + 110, y - 44], [x + 110, y + 44], [x + 70, y + 30]], PAL.ink, 0.3); } });
  U.push({ n: 5, name: 'Madde ve ısı', draw: (c, x, y, t) => { ['ice', 'liquid', 'vapor'].forEach((st, i) => DAMLA.draw(c, { x: x - 80 + i * 80, y: y + 70, s: 0.55, state: st, expr: 'happy', t, seed: 1, shadow: false })); } });
  U.push({ n: 6, name: 'Elektrik', draw: (c, x, y) => { const L = [[x - 80, y - 50], [x + 80, y - 50], [x + 80, y + 50], [x - 80, y + 50], [x - 80, y - 50]]; stroke(c, L, { w: 3, closed: true }); P.fillPts(c, W7.rr(x - 40, y + 34, 80, 32, 6), PAL.paper); W7.item(c, 'pil', x, y + 50, 0.7); const g = c.createRadialGradient(x, y - 50, 4, x, y - 50, 50); g.addColorStop(0, 'rgba(227,160,58,0.8)'); g.addColorStop(1, 'rgba(227,160,58,0)'); c.fillStyle = g; c.beginPath(); c.arc(x, y - 50, 50, 0, 7); c.fill(); const b = circlePts(x, y - 58, 18, 20, 24); P.fillPts(c, b, '#F6D9A0'); stroke(c, b, { w: 2.4, closed: true, dry: false }); P.fillPts(c, W7.rr(x - 10, y - 42, 20, 14, 3), '#8E8E8E'); } });
  U.push({ n: 7, name: 'Geri dönüşüm', draw: (c, x, y) => { W7.recycle(c, x - 40, y, 48, 1, { w: 9 }); W7.bin(c, 'mavi', x + 60, y + 70, 0.4); W7.bin(c, 'yesil', x + 110, y + 70, 0.4); } });
  W7.UNITS = U;
  const POS = [[330, 385], [750, 385], [1170, 385], [1590, 385], [440, 725], [860, 725], [1280, 725]];
  function unitCard(ctx, u, x, y, k, t, rot) {
    if (k <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(P.pop(k), P.pop(k)); ctx.translate(-x, -y);
    const c = [[x - 190, y - 150], [x + 190, y - 154], [x + 194, y + 150], [x - 186, y + 154], [x - 190, y - 150]];
    ctx.save(); ctx.shadowColor = 'rgba(40,30,20,0.28)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 5; P.fillPts(ctx, c, '#FAF6EC'); ctx.restore();
    stroke(ctx, c, { w: 2.4, closed: true, seed: 1210 + u.n });
    // bant
    P.fillPts(ctx, [[x - 40, y - 166], [x + 40, y - 162], [x + 38, y - 138], [x - 42, y - 142]], PAL.light, 0.45);
    u.draw(ctx, x, y - 30, t);
    INK.label(ctx, 'Ünite ' + u.n, x, y + 88, { size: 34, align: 'center', alpha: 0.6, weight: 700 });
    W7.fit(ctx, u.name, x, y + 132, 350, 42);
    ctx.restore();
  }
  W7.unitCard = unitCard;

  E.scene({
    name: 'Son sayfa', concept: 'Kaydetme: defterin son sayfası', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 60, 1620, 860);
      P.write(ctx, 'Gözlem Defteri · son sayfa', 1130, 165, E.seg(t, sr + 0.2, sr + 1.4), { size: 60, align: 'center' });
      const L = [
        ['Atık yönetimi: önle → azalt → yeniden kullan →', PAL.ink],
        ['geri dönüştür → geri kazan → uzaklaştır (son çare)', PAL.ink],
        ['İleri dönüşüm: atıktan daha değerli ürün, sanat', '#C07F1E'],
        ['Benim adımım: matara, atık günlüğü, ayrıştırma', '#3F7A3A']
      ];
      L.forEach(([txt, col], i) => P.write(ctx, txt, 300, 310 + i * 110, E.seg(t, sr + 1.2 + i * 1.3, sr + 2.4 + i * 1.3), { size: 46, color: col }));
      const ek = E.se(t, sr + 6.4, sr + 7.2, 'out');
      if (ek > 0) { ctx.save(); ctx.translate(1300, 800); ctx.rotate(-0.1); ctx.scale(P.pop(ek), P.pop(ek)); W7.fit(ctx, '— son —', 0, 0, 300, 50, { color: '#8A4A10' }); ctx.restore(); }
      DAMLA.draw(ctx, { x: 1690, y: 1050, s: 1.05, view: 'q3', flip: true, expr: 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, talk: E.talk(t), seed: 5, arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });

  E.scene({
    name: 'Bir yılın defteri', concept: 'Final: 5. sınıf boyunca öğrendiklerimiz', from: 'lookback', to: 'thanks', trFrom: [960, 540],
    draw(ctx, t) {
      const sl = E.s('lookback'), st = E.s('thanks');
      // sıcak masa zemini
      const g = ctx.createRadialGradient(960, 540, 100, 960, 540, 1100); g.addColorStop(0, 'rgba(227,160,58,0.16)'); g.addColorStop(1, 'rgba(138,106,69,0.3)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      P.write(ctx, 'Bir yılın gözlem defteri', 1180, 170, E.seg(t, sl + 0.3, sl + 1.6), { size: 62, align: 'center' });
      const lift = E.se(t, st, st + 1.2);
      U.forEach((u, i) => {
        const at = sl + 2.2 + i * 1.45, k = E.se(t, at, at + 0.6, 'out');
        const [x, y] = POS[i]; const dy = -10 * lift * Math.sin(t * 1.6 + i);
        unitCard(ctx, u, x, y + dy, k, t, [-0.04, 0.03, -0.02, 0.04, 0.02, -0.03, 0.03][i]);
      });
      // teşekkür
      const tk = E.se(t, st + 3.4, st + 4.2, 'out');
      if (tk > 0) {
        ctx.save(); ctx.translate(1660, 750); ctx.rotate(-0.06); ctx.scale(P.pop(tk), P.pop(tk));
        const p = INK.wobble(circlePts(0, 0, 170, 95, 50), 3, 1230); P.fillPts(ctx, p, '#FBF8F1', 0.97); stroke(ctx, p, { w: 4, closed: true, color: '#3F7A3A' });
        W7.fit(ctx, 'Teşekkürler!', 0, 20, 290, 60, { color: '#3F7A3A' }); ctx.restore();
      }
      // yıldız serpintisi
      if (t > st) for (let i = 0; i < 14; i++) { const a = i / 14 * 6.283, r = 300 + 380 * E.se(t, st + 0.4, st + 3.0); const x = 960 + Math.cos(a + t * 0.1) * r * 1.4, y = 560 + Math.sin(a + t * 0.1) * r * 0.6; ctx.save(); ctx.globalAlpha = 0.6 * (1 - E.seg(t, st + 2.4, st + 3.4)); INK.inkDot(ctx, x, y, 4, { color: '227,160,58' }); ctx.restore(); }
      const cheer = t > st;
      DAMLA.draw(ctx, { x: 1790, y: 1075, s: 0.9, view: 'q3', flip: true, expr: cheer ? 'happy' : 'curious', look: [-0.8, -0.4], blink: E.blink(t, 14), squash: E.breath(t) * (cheer ? 1 + 0.04 * Math.abs(Math.sin((t - st) * 5)) : 1), t, talk: E.talk(t), seed: 2, arms: cheer ? [[-1, 2.7], [1, 2.7]] : [[-1, 0.4], [1, 2.3]] });
    }
  });
})();
