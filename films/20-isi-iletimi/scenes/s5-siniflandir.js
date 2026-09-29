// SAHNE 5 — Ayrıştır, gruplandır, etiketle (FB.5.5.5 b, c, ç)
// Metaller (demir, bakır, alüminyum) örnek olarak verilir; kendi aralarında karşılaştırılmaz.
(function () {
  const { PAL, line, stroke, circlePts, wash, rng, dashed } = INK;
  const F = F20;
  const ITEMS = [
    ['metalKasik', 'metal kaşık', 1], ['tahtaKasik', 'tahta kaşık', 0], ['bakirTel', 'bakır tel', 1], ['eldiven', 'yün eldiven', 0], ['folyo', 'alüminyum folyo', 1],
    ['spatula', 'plastik spatula', 0], ['civi', 'demir çivi', 1], ['mantar', 'mantar nihale', 0], ['hava', 'hava', 0]
  ];
  const home = i => i < 5 ? [360 + i * 300, 250] : [510 + (i - 5) * 300, 420];
  E.scene({
    name: 'Sınıflandırma', concept: 'Isı iletkeni / ısı yalıtkanı grupları ve etiketleme', from: 'sort', to: 'pot2', trFrom: [960, 540],
    draw(ctx, t) {
      const so = E.s('sort'), sm = E.s('metals'), si = E.s('insul'), sa = E.s('air'), sp = E.s('pot'), s2 = E.s('pot2');
      ctx.fillStyle = 'rgba(138,106,69,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
      // boxes
      const bk = E.se(t, so + 0.8, so + 1.6, 'out');
      const boxes = [{ x: 180, head: 'ISI İLETKENİ', col: F.HEAT }, { x: 1000, head: 'ISI YALITKANI', col: PAL.water }];
      boxes.forEach((b, i) => {
        if (bk <= 0) return;
        ctx.save(); ctx.translate(b.x + 370, 720); ctx.scale(P.pop(bk), P.pop(bk)); ctx.translate(-(b.x + 370), -720);
        F.card(ctx, b.x, 540, 740, 370, { seed: 3600 + i, color: b.col, w: 3.4 });
        P.fillPts(ctx, [[b.x + 3, 543], [b.x + 737, 540], [b.x + 737, 610], [b.x + 3, 612]], b.col, 0.16);
        INK.label(ctx, b.head, b.x + 370, 595, { size: 46, weight: 700, align: 'center', color: b.col, rot: 0 });
        ctx.restore();
      });
      // items: appear, then fly into their group
      const slot = [0, 0]; const slots = ITEMS.map(([, , g]) => slot[g]++);
      const fade = 1 - E.se(t, sa - 0.4, sa + 0.3); // top area cleared for the zoom/pot later (items are in boxes by then)
      ITEMS.forEach(([fn, lab, g], i) => {
        const ak = E.se(t, so + 0.3 + i * 0.25, so + 0.8 + i * 0.25, 'out'); if (ak <= 0) return;
        const gi = g ? ITEMS.slice(0, i).filter(q => q[2] === 1).length : ITEMS.slice(0, i).filter(q => q[2] === 0).length;
        const at = g ? sm + 1.0 + gi * 1.0 : si + 1.0 + gi * 1.1;
        const fk = E.se(t, at, at + 0.8, 'io');
        const [hx, hy] = home(i);
        const col = g ? 0 : 1, rowY = 660 + gi * (g ? 60 : 50);
        const tx = boxes[col].x + 70 + (g ? 0 : (gi % 2) * 360), ty = g ? 670 + gi * 60 : 670 + Math.floor(gi / 2) * 72;
        const x = E.lerp(hx, tx, fk), y = E.lerp(hy, ty, fk) - Math.sin(fk * Math.PI) * 120, s = E.lerp(0.72, 0.34, fk) * P.pop(ak);
        ctx.save(); ctx.translate(x, y); ctx.scale(s, s); F.item(ctx, fn, 0, 0, 1, t, null); ctx.restore();
        if (fk < 0.05) INK.label(ctx, lab, hx, hy + 95, { size: 32, weight: 700, align: 'center', rot: 0, alpha: ak });
        if (fk > 0.9) P.write(ctx, lab, tx + 50, ty + 12, E.seg(fk, 0.9, 1) * 0 + E.seg(t, at + 0.7, at + 1.4), { size: 36 });
      });
      // air zoom: wool fibres trap air
      const zk = Math.min(E.se(t, sa + 0.2, sa + 1.0, 'out'), 1 - E.se(t, sp - 0.3, sp + 0.3));
      if (zk > 0) E.layer(ctx, zk, c => {
        const cx = 960, cy = 320, R = 170;
        c.save(); c.beginPath(); c.arc(cx, cy, R, 0, 7); c.clip(); c.fillStyle = '#F6E9E2'; c.fillRect(cx - R, cy - R, 2 * R, 2 * R);
        for (let i = 0; i < 9; i++) { const p = []; for (let j = 0; j <= 40; j++) { const u = j / 40; p.push([cx - R + u * 2 * R, cy - R + 20 + i * 38 + Math.sin(u * 14 + i) * 12]); } stroke(c, p, { w: 7, color: '#B5553F', dry: false, alpha: 0.75, seed: 3620 + i }); }
        const r = rng(3630); for (let i = 0; i < 12; i++) { const x = cx - R + 30 + r() * (2 * R - 60), y = cy - R + 40 + r() * (2 * R - 80); c.fillStyle = 'rgba(234,242,246,0.95)'; c.beginPath(); c.arc(x, y, 12, 0, 7); c.fill(); stroke(c, circlePts(x + Math.sin(t * 2 + i) * 2, y, 9, 9, 12), { w: 1.6, closed: true, dry: false, color: PAL.water }); }
        c.restore();
        stroke(c, circlePts(cx, cy, R, R, 60), { w: 7, closed: true }); line(c, [cx + R * 0.72, cy + R * 0.72], [cx + R * 1.1, cy + R * 1.05], { w: 14, taper: 0.02 });
        INK.label(c, 'yün lifleri', cx - R - 30, cy - 40, { size: 38, weight: 700, align: 'right', color: '#8A3A2A' });
        INK.label(c, 'arada hapsolan hava', cx + R + 30, cy - 20, { size: 38, weight: 700, color: PAL.water });
        INK.label(c, '→ ısıyı iyi iletmez', cx + R + 30, cy + 30, { size: 34, alpha: E.seg(t, sa + 2.5, sa + 3.3) });
      });
      // pot labelling
      const pk = E.se(t, sp + 0.2, sp + 1.0, 'out');
      if (pk > 0) E.layer(ctx, pk, c => {
        const hot = E.se(t, s2 + 0.5, s2 + 2);
        F.pot(c, 960, 470, 320, 150, t, { handleCol: '#2E2B33' });
        F.steam(c, 960, 312, 220, 70, 0.6, t, 3640);
        if (hot > 0) for (let i = 0; i < 3; i++) P.arrow(c, [880 + i * 80, 500], [880 + i * 80, 430], hot, { w: 4, color: F.HEAT, head: 14 });
        const l1 = E.se(t, sp + 1.6, sp + 2.4), l2 = E.se(t, sp + 2.8, sp + 3.6);
        if (l1 > 0) { INK.leader(c, [650, 300], [830, 400]); P.write(c, 'gövde: metal', 640, 290, l1, { size: 42, align: 'right' }); P.write(c, 'ısı iletkeni', 640, 345, E.seg(t, s2 + 0.8, s2 + 1.8), { size: 42, align: 'right', color: F.HEAT }); }
        if (l2 > 0) { INK.leader(c, [1250, 300], [1150, 358]); P.write(c, 'sap: plastik', 1260, 290, l2, { size: 42 }); P.write(c, 'ısı yalıtkanı', 1260, 345, E.seg(t, s2 + 2.4, s2 + 3.4), { size: 42, color: PAL.water }); }
        if (t > s2 + 1.2) P.write(c, 'ısı yemeğe geçer', 960, 530, E.seg(t, s2 + 1.2, s2 + 2.2), { size: 32, align: 'center', color: F.HEAT, weight: 400 });
      });
      DAMLA.draw(ctx, { x: 1810, y: 930, s: 0.85, view: 'q3', flip: true, t, seed: 6, blink: E.blink(t, 7), squash: E.breath(t), talk: E.talk(t), expr: t > s2 + 2 ? 'happy' : 'curious', look: [-0.8, -0.4], arms: [[-1, 0.35], [1, 2.2 + Math.sin(t * 2) * 0.1]] });
    }
  });
})();
