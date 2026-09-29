// SAHNE 7 — FİNAL: Damla gözlem defterini kapatır; dört yılın (5.–8. sınıf) defterleri; teşekkür; veda; serinin bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const U = U7;
  // her sınıfın kapak çizimleri (merkez cx, cy; ~260×240 alan)
  const DOODLE = {
    5: (c, x, y, t) => { P.sun(c, x - 60, y - 30, 42, t, { cells: false, nrays: 12, glow: false }); P.moon(c, x + 70, y - 50, 26); P.icon.magnifier(c, x + 40, y + 60, 0.55); },
    6: (c, x, y, t) => { P.fillPts(c, circlePts(x, y, 18, 18, 16), PAL.light); [60, 100].forEach((r, i) => { stroke(c, circlePts(x, y, r, r * 0.45, 40), { w: 1.8, closed: true, dry: false, alpha: 0.7 }); const a = t * (0.6 - i * 0.25) + i * 2; P.earth(c, x + Math.cos(a) * r, y + Math.sin(a) * r * 0.45, 10 - i * 2); }); U.leaf(c, x + 80, y + 85, 0.35, -0.4); },
    7: (c, x, y, t) => { const rk = [[x - 60, y + 40], [x - 60, y - 40], [x - 40, y - 80], [x - 20, y - 40], [x - 20, y + 40]]; P.fillPts(c, rk, '#FBF8F1'); stroke(c, rk, { w: 2.4, closed: true, dry: false }); P.fillPts(c, circlePts(x - 40, y + 50 + Math.sin(t * 9) * 3, 10, 16, 12), '#E3A03A'); INK.inkDot(c, x + 60, y, 7); [0, 1.05, 2.1].forEach(r => stroke(c, circlePts(x + 60, y, 60, 22, 40, r), { w: 1.8, closed: true, dry: false })); },
    8: (c, x, y, t) => { for (let s = 0; s < 2; s++) { const p = []; for (let i = 0; i <= 30; i++) { const u = i / 30; p.push([x - 70 + Math.sin(u * 6.283 * 1.5 + s * Math.PI + t) * 26, y - 90 + u * 180]); } stroke(c, p, { w: 3, color: s ? PAL.water : U.HEAT, dry: false }); } for (let i = 0; i < 7; i++) { const u = (i + 0.5) / 7, yy = y - 90 + u * 180, ph = u * 6.283 * 1.5 + t; line(c, [x - 70 + Math.sin(ph) * 26, yy], [x - 70 + Math.sin(ph + Math.PI) * 26, yy], { w: 1.6, dry: false, alpha: 0.7 }); } [30, 55, 80].forEach(r => stroke(c, P.arc(x + 20, y, r, -0.7, 0.7, 12), { w: 2.4, dry: false })); P.earth(c, x + 70, y - 70, 22); }
  };
  const COL = { 5: '#E3A03A', 6: '#6F8A3A', 7: '#2E6A8C', 8: '#B5553F' };
  const TOP = { 5: 'Güneş, Ay, kuvvet, hücre...', 6: 'Güneş sistemi, ışık, madde...', 7: 'uzay, atom, sindirim...', 8: 'DNA, ses, tepkimeler, iklim...' };
  function book(c, g, x, y, s, t, o = {}) {
    c.save(); c.translate(x, y); c.scale(s, s);
    U.cover(c, 0, 0, 330, 440, COL[g], g + '. sınıf', { seed: g });
    DOODLE[g](c, 180, 270, t);
    c.restore();
  }
  E.scene({
    name: 'Dört yılın defteri', concept: 'Final: 5.–8. sınıf yolculuğu', from: 'lookback', to: 'thanks', trFrom: [960, 540],
    draw(ctx, t) {
      const sL = E.s('lookback'), sT = E.s('thanks');
      const g = ctx.createRadialGradient(960, 540, 100, 960, 540, 1100); g.addColorStop(0, 'rgba(227,160,58,0.16)'); g.addColorStop(1, 'rgba(138,106,69,0.28)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      // 1) son sayfa açık → kapak kapanır
      const close = E.se(t, sL + 1.8, sL + 3.2, 'io');
      const move = E.se(t, sL + 3.6, sL + 5.0, 'io');
      const BX = [150, 590, 1030, 1470], BY = 250;
      if (move < 1) {
        const bx = E.lerp(712, BX[3], move), by = E.lerp(180, BY, move), bs = E.lerp(1.5, 1, move);
        ctx.save(); ctx.translate(bx, by); ctx.scale(bs, bs);
        if (close < 1) {
          P.notebook(ctx, 0, 0, 330, 440, { grid: 22 });
          P.write(ctx, 'son sayfa', 185, 80, E.seg(t, sL + 0.2, sL + 1.2), { size: 34, align: 'center' });
          P.earth(ctx, 185, 220, 60);
          P.write(ctx, '— Damla', 290, 380, E.seg(t, sL + 0.8, sL + 1.6), { size: 26, align: 'right' });
        }
        if (close > 0) { // kapak menteşeden kapanır (x ölçeği)
          ctx.save(); ctx.translate(0, 0); ctx.scale(Math.max(0.02, close), 1);
          U.cover(ctx, 0, 0, 330, 440, COL[8], '8. sınıf', { seed: 8 });
          ctx.restore();
          if (close >= 1) DOODLE[8](ctx, 180, 270, t);
        }
        ctx.restore();
      }
      // 2) dört defter yan yana
      [5, 6, 7, 8].forEach((gr, i) => {
        const at = gr === 8 ? sL + 5.0 : sL + 5.2 + i * 1.3; const k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const bob = t > sT ? Math.sin(t * 1.6 + i) * 8 : 0;
        ctx.save(); ctx.translate(BX[i] + 165, BY + 220 + bob); ctx.rotate([-0.04, 0.03, -0.02, 0.035][i]); ctx.scale(P.pop(k), P.pop(k)); ctx.translate(-(BX[i] + 165), -(BY + 220));
        book(ctx, gr, BX[i], BY, 1, t);
        ctx.restore();
        c_label(ctx, TOP[gr], BX[i] + 165, 740, E.seg(t, at + 0.4, at + 1.4));
      });
      P.write(ctx, 'Damla’nın Gözlem Defteri · 4 yıl', 960, 200, E.seg(t, sL + 5.2, sL + 6.4), { size: 52, align: 'center' });
      // teşekkür
      const tk = E.se(t, sT + 3.0, sT + 3.8, 'out');
      if (tk > 0) { ctx.save(); ctx.translate(960, 830); ctx.rotate(-0.03); ctx.scale(P.pop(tk), P.pop(tk)); const p = INK.wobble(circlePts(0, 0, 230, 60, 50), 3, 3400); P.fillPts(ctx, p, '#FBF8F1', 0.97); stroke(ctx, p, { w: 4, closed: true, color: U.GREEN }); U.fit(ctx, 'Teşekkürler!', 0, 20, 380, 60, { color: U.GREEN }); ctx.restore(); }
      if (t > sT) for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283, r = 260 + 420 * E.se(t, sT + 0.3, sT + 2.8); const x = 960 + Math.cos(a + t * 0.1) * r * 1.5, y = 520 + Math.sin(a + t * 0.1) * r * 0.6; ctx.save(); ctx.globalAlpha *= 0.7 * (1 - E.seg(t, sT + 2.2, sT + 3.4)); INK.inkDot(ctx, x, y, 5, { color: '227,160,58' }); ctx.restore(); }
      const cheer = t > sT;
      U.damla(ctx, t, { x: cheer ? 1830 : 1800, y: 910, s: 0.65, view: 'q3', flip: true, expr: cheer ? 'happy' : 'neutral', look: [-0.8, -0.3], squash: E.breath(t) * (cheer ? 1 + 0.04 * Math.abs(Math.sin((t - sT) * 5)) : 1), arms: cheer ? [[-1, 2.7], [1, 2.7]] : [[-1, 0.4], [1, 1.2]], seed: 1 });
    }
  });
  function c_label(ctx, s, x, y, k) { if (k <= 0) return; U7.fit(ctx, s, x, y, 400, 32, { color: PAL.ink, alpha: Math.min(1, k * 1.5) }); }

  E.scene({
    name: 'Veda', concept: 'Merakını hiç kaybetme — 5–8. sınıf serisinin sonu', from: 'bye', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sB = E.s('bye'), sE = E.s('end');
      const hill = P.hillLine(E.W);
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,70,110,0.22)'); g.addColorStop(0.6, 'rgba(227,150,70,0.26)'); g.addColorStop(1, 'rgba(227,150,70,0.1)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      P.sun(ctx, 1560, 720, 95, t, { cells: false, nrays: 18 });
      P.landscape(ctx, E.W, E.H, t, { hill });
      U.tree(ctx, 1250, P.hillY(hill, 1250) + 8, 1.0, t, { seed: 2 }); U.tree(ctx, 1380, P.hillY(hill, 1380) + 8, 0.8, t, { seed: 3 });
      const dx = 800, dy = P.hillY(hill, dx) + 4;
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.5, view: 'front', expr: 'happy', look: [0.2, -0.3], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.35 * Math.sin(t * 8)]] });
      E.inkText(ctx, 'Merakını hiç kaybetme!', 960, 250, t, sB + 0.3, sE + 0.6, { size: 78, align: 'center' });
      E.inkText(ctx, 'Hoşça kal!', 960, 345, t, sB + 1.4, sE + 0.6, { size: 58, align: 'center', color: U.GREEN });
      // bitiş kartı — serinin sonu
      const ek = E.se(t, sE, sE + 0.8);
      if (ek > 0) E.layer(ctx, ek, c => {
        c.fillStyle = PAL.paper; c.globalAlpha = 0.94; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
        INK.label(c, 'Damla’nın Gözlem Defteri', 960, 210, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
        INK.label(c, '27 · Isınan Dünya: Küresel İklim Değişikliği', 960, 292, { size: 52, weight: 700, align: 'center' });
        P.drawOn(c, P.bez([600, 320], [960, 332], [1320, 316], 30), E.se(t, sE + 0.3, sE + 1.2), { w: 3, color: PAL.life });
        INK.label(c, '5–8. sınıf serisinin sonu · son sayfa · Teşekkürler!', 960, 395, { size: 46, weight: 700, align: 'center', color: U.GREEN, alpha: E.se(t, sE + 0.8, sE + 1.6) });
        [5, 6, 7, 8].forEach((gr, i) => {
          const k = E.se(t, sE + 1.2 + i * 0.3, sE + 1.7 + i * 0.3, 'out'); if (k <= 0) return;
          const x = 640 + i * 170, y = 440;
          c.save(); c.translate(x + 66, y + 88); c.scale(P.pop(k), P.pop(k)); c.rotate([-0.05, 0.03, -0.03, 0.04][i]); c.translate(-(x + 66), -(y + 88)); book(c, gr, x, y, 0.4, t); c.restore();
        });
        INK.label(c, 'Fen Bilimleri · 8. sınıf · FB.8.7.6 · FB.8.7.7 · Türkiye Yüzyılı Maarif Modeli', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
        INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 752, { size: 32, align: 'center', alpha: 0.7 });
        DAMLA.draw(c, { x: 960, y: 1000, s: 0.8, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      });
    }
  });
})();
