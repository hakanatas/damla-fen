// SAHNE 7 — Kaydet + paylaş (SDB2.1) + Sıra sende (mühendislik tasarım döngüsü, E3.3) + sonraki: elektrik devresi + bitiş
(function () {
  const { PAL, line, stroke, circlePts, wash, arrowHead } = INK;
  const F = F21, RED = F.RED;
  const ITEMS = [
    'Model önerdim: karton ev + ılık su şişesi.',
    'Test ettim: kaplama, ısı kaybını yavaşlattı.',
    'Yeni kanıtla modelimi yeniledim: v1 → v2.',
    'Yalıtım ısı üretmez; ısı akışını yavaşlatır.',
    'Isı yalıtımı kışın da yazın da işe yarar.'
  ];
  const CYCLE = ['Sorunu belirle', 'Tasarla', 'Yap', 'Test et', 'Karşılaştır ve yenile'];
  E.scene({
    name: 'Kaydet ve paylaş', concept: 'Kaydetme, paylaşma, Sıra sende', from: 'record', to: 'yourturn', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record'), sp = E.s('share'), sy = E.s('yourturn');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 70, 1620, 850);
      const title = t < sy ? 'Gözlem Defteri · Isı Yalıtımı Modelim' : 'Sıra sende!';
      if (t < sy) { P.write(ctx, title, 290, 180, E.seg(t, sr + 0.3, sr + 1.5), { size: 62 }); if (t > sr + 1.5) P.drawOn(ctx, P.bez([286, 200], [760, 212], [1240, 196], 30), E.se(t, sr + 1.5, sr + 2.0), { w: 3, color: PAL.light }); }
      const la = 1 - E.se(t, sp - 0.2, sp + 0.5);
      if (la > 0) E.layer(ctx, la, c => {
        ITEMS.forEach((txt, i) => {
          const at = sr + 1.4 + i * 1.25, y = 300 + i * 96;
          const box = [[300, y - 44], [350, y - 46], [352, y + 4], [302, y + 6], [300, y - 44]];
          if (t > at - 0.3) stroke(c, box, { w: 2.4, closed: true, seed: 4810 + i });
          P.check(c, 324, y - 22, 46, E.se(t, at + 1.0, at + 1.4), { w: 6 });
          P.write(c, txt, 385, y, E.seg(t, at, at + 1.2), { size: 46 });
        });
        const wat = sr + 1.4 + 5 * 1.25;
        P.write(c, '⚠  Ilık su ve kesici aletler: yalnızca yetişkinle!', 300, 300 + 5 * 96, E.seg(t, wat, wat + 1.2), { size: 46, color: RED });
      });
      // share: three models side by side
      const sk = Math.min(E.se(t, sp, sp + 0.7), 1 - E.se(t, sy - 0.2, sy + 0.5));
      if (sk > 0) E.layer(ctx, sk, c => {
        [['Damla', 420, { walls: 1, roof: 1, gaps: 1, dbl: 1 }, 35], ['Ece', 900, { walls: 1, roof: 1, gaps: 1, dbl: 1 }, 35], ['Can', 1380, { walls: 1, roof: 0, gaps: 1, dbl: 0 }, 33]].forEach(([n, x, o, T], i) => {
          c.save(); c.translate(x, 0); c.scale(0.62, 0.62); c.translate(-x, 0);
          F.model(c, x, 1180, 380, 330, { ...o, T, t, flow: 0 });
          c.restore();
          INK.label(c, n, x, 800, { size: 42, weight: 700, align: 'center' });
          if (i < 2) P.arrow(c, [x + 150, 560], [x + 330, 560], E.se(t, sp + 1.2 + i * 0.6, sp + 1.8 + i * 0.6), { w: 3, head: 12 });
          if (i < 2) arrowHead(c, [x + 330, 560], [x + 150, 560], 12, { w: 3 });
        });
        P.write(c, 'Paylaş · Karşılaştır · Yenile', 960, 250, E.seg(t, sp + 0.4, sp + 1.8), { size: 56, align: 'center', color: '#8A4A10' });
      });
      // your turn: engineering design cycle
      const yk = E.se(t, sy, sy + 0.7);
      if (yk > 0) E.layer(ctx, yk, c => {
        P.write(c, 'Sıra sende!', 290, 180, E.seg(t, sy + 0.2, sy + 1.2), { size: 66, color: '#8A4A10' });
        INK.label(c, 'Kutudan bir ev modeli tasarla.', 290, 250, { size: 40, alpha: E.se(t, sy + 1, sy + 1.8) });
        const cx = 1000, cy = 560, R = 250;
        CYCLE.forEach((s, i) => {
          const a = -Math.PI / 2 + i / CYCLE.length * Math.PI * 2, x = cx + Math.cos(a) * R * 1.35, y = cy + Math.sin(a) * R;
          const k = E.se(t, sy + 1.6 + i * 0.8, sy + 2.2 + i * 0.8, 'out'); if (k <= 0) return;
          c.save(); c.font = '700 38px Kalam'; const w = c.measureText(s).width + 40; c.restore();
          c.save(); c.translate(x, y); c.scale(P.pop(k), P.pop(k));
          const pill = [[-w / 2, -34], [w / 2, -36], [w / 2 + 3, 32], [-w / 2 + 2, 34], [-w / 2, -34]];
          P.fillPts(c, pill, i === 4 ? '#F6E7B8' : '#FBF8F1'); stroke(c, pill, { w: 2.6, closed: true, seed: 4830 + i });
          INK.label(c, s, 0, 12, { size: 38, weight: 700, align: 'center', rot: 0 });
          c.restore();
          const a2 = -Math.PI / 2 + (i + 0.5) / CYCLE.length * Math.PI * 2;
          const ak = E.se(t, sy + 2.1 + i * 0.8, sy + 2.6 + i * 0.8);
          if (ak > 0) { const p = P.arc(cx, cy, R * 1.35, a2 - 0.22, a2 + 0.22, 12, R); const q = p.map(([px, py]) => [px, py]); ctx.save(); P.drawOn(c, q, ak, { w: 3 }); if (ak > 0.95) arrowHead(c, q[q.length - 3], q[q.length - 1], 12, { w: 3 }); ctx.restore(); }
        });
        INK.label(c, 'mühendislik', cx, cy - 10, { size: 36, weight: 700, align: 'center', alpha: 0.7 });
        INK.label(c, 'tasarım döngüsü', cx, cy + 34, { size: 36, weight: 700, align: 'center', alpha: 0.7 });
      });
      const cheer = t > sy + 6;
      DAMLA.draw(ctx, {
        x: 1640, y: 1040, s: 1.1, view: 'q3', flip: true, expr: cheer ? 'happy' : 'neutral', look: [-0.7, 0.2], blink: E.blink(t, 21), squash: E.breath(t), t, talk: E.talk(t), seed: 5,
        arms: t > sp ? [[-1, 0.4], [1, 2.3 + Math.sin(t * 2) * 0.1]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: t > sp ? null : 'notebook'
      });
    }
  });
  E.scene({
    name: 'Sıradaki: Devre', concept: 'Sonraki konu ve bitiş', from: 'next', to: 'end', trFrom: [960, 600],
    draw(ctx, t) {
      const sn = E.s('next'), se = E.s('end');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      const tb = [[200, 820], [1720, 814], [1730, 860], [190, 866], [200, 820]]; P.fillPts(ctx, tb, '#E3D3B3'); wash(ctx, tb, '#8A6A45', 0.4, 4850); stroke(ctx, tb, { w: 3, closed: true, seed: 4851 });
      // battery + bulb + wires
      const bat = [[980, 810], [1180, 810], [1180, 720], [980, 720], [980, 810]]; P.fillPts(ctx, bat, '#3A3740'); P.fillPts(ctx, [[1100, 810], [1180, 810], [1180, 720], [1100, 720]], PAL.light, 0.9); stroke(ctx, bat, { w: 3, closed: true, seed: 4852 }); P.fillPts(ctx, [[1180, 752], [1196, 752], [1196, 778], [1180, 778]], '#9AA3A8');
      INK.label(ctx, '+', 1150, 780, { size: 40, weight: 700, align: 'center', color: PAL.ink });
      const on = E.se(t, sn + 2, sn + 2.6);
      const bx = 1400, by = 560;
      if (on > 0) { const g = ctx.createRadialGradient(bx, by, 10, bx, by, 160); g.addColorStop(0, `rgba(227,160,58,${0.6 * on})`); g.addColorStop(1, 'rgba(227,160,58,0)'); ctx.fillStyle = g; ctx.fillRect(bx - 170, by - 170, 340, 340); }
      const bulb = circlePts(bx, by, 60, 66, 40); P.fillPts(ctx, bulb, on > 0.5 ? '#F6DFA8' : '#F4F1EA'); stroke(ctx, bulb, { w: 3, closed: true });
      P.fillPts(ctx, [[bx - 30, by + 60], [bx + 30, by + 60], [bx + 26, by + 110], [bx - 26, by + 110]], '#9AA3A8'); stroke(ctx, [[bx - 30, by + 60], [bx + 30, by + 60], [bx + 26, by + 110], [bx - 26, by + 110], [bx - 30, by + 60]], { w: 2.4, closed: true });
      stroke(ctx, P.bez([1196, 765], [1330, 780], [bx + 10, by + 110], 20), { w: 4, color: '#A23A2A' });
      stroke(ctx, P.bez([980, 765], [900, 520], [bx - 20, by + 100], 30), { w: 4, color: PAL.water });
      DAMLA.draw(ctx, { x: 560, y: 820, s: 1.35, view: 'q3', expr: 'curious', look: [0.8, -0.4], blink: E.blink(t, 23), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 2.3 + 0.2 * Math.sin(t * 3)]] });
      E.inkText(ctx, 'Sıradaki gözlem:', 960, 190, t, sn + 0.6, se + 0.2, { size: 48, align: 'center', weight: 400 });
      E.inkText(ctx, '22 · Devrenin Ortak Dili: Semboller', 960, 270, t, sn + 1.2, se + 0.2, { size: 66, align: 'center' });
      const ek = E.se(t, se, se + 0.8);
      if (ek > 0) E.layer(ctx, ek, c => {
        c.fillStyle = PAL.paper; c.globalAlpha = 0.92; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
        INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
        INK.label(c, '21 · Sıcaklığı Koruyan Ev: Isı Yalıtımı', 960, 515, { size: 56, weight: 700, align: 'center' });
        P.drawOn(c, P.bez([560, 545], [960, 556], [1360, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
        INK.label(c, 'Fen Bilimleri · 5. sınıf · FB.5.5.6 · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
        INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
        DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      });
    }
  });
})();
