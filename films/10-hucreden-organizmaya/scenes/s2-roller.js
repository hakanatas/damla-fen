// SAHNE 2 — Rol oynama: hücre → doku → organ → sistem → organizma (TYMM: rol oynama tekniği)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  let LVT = 0;
  const LV = [['cell', 'HÜCRE', 'hücre'], ['tissue', 'DOKU', 'doku'], ['organ', 'ORGAN', 'organ'], ['system', 'SİSTEM', 'sistem'], ['organism', 'ORGANİZMA', 'organizma']];
  function stage(ctx, open) {
    const back = [[110, 200], [770, 196], [770, 880], [110, 884]]; P.fillPts(ctx, back, '#EFE4CC', 0.9);
    const floor = [[90, 860], [790, 856], [800, 905], [80, 910]]; P.fillPts(ctx, floor, '#C9A77A'); wash(ctx, floor, '#8A6A45', 0.4, 5, { bleed: 1, blooms: 0 }); stroke(ctx, floor, { w: 2.6, closed: true, seed: 6 });
    const cw = E.lerp(330, 110, open);
    [[110, 1], [770, -1]].forEach(([x0, d], i) => {
      const pts = [[x0, 205]]; for (let j = 0; j <= 20; j++) { const u = j / 20; pts.push([x0 + d * cw + d * Math.sin(u * 18) * 8, 205 + u * 655]); } pts.push([x0, 860]);
      P.fillPts(ctx, pts, '#5F7A34', 0.95); wash(ctx, pts, '#3E5A1A', 0.5, 10 + i, { bleed: 1.5, blooms: 1 }); stroke(ctx, pts, { w: 2.6, closed: true, seed: 12 + i });
      for (let f = 1; f < 4; f++) stroke(ctx, [[x0 + d * cw * f / 4, 215], [x0 + d * cw * f / 4 + d * 6, 850]], { w: 1.6, dry: false, alpha: 0.5, color: '#2A3E10', seed: 20 + f });
    });
    const top = [[90, 170], [790, 166], [790, 232], [90, 236], [90, 170]]; P.fillPts(ctx, top, '#5F7A34'); wash(ctx, top, '#3E5A1A', 0.6, 30, { bleed: 1, blooms: 0 }); stroke(ctx, top, { w: 3, closed: true, seed: 31 });
    for (let j = 0; j < 14; j++) { const x = 100 + j * 50; stroke(ctx, P.arc(x + 25, 232, 25, 0, Math.PI, 10, 16), { w: 2, dry: false, color: '#2A3E10' }); }
  }
  function sign(txt) {
    return (c, res) => {
      const h = res[1].hand; c.save(); c.font = '700 34px Kalam'; const w = Math.max(110, c.measureText(txt).width + 36);
      line(c, h, [h[0], h[1] - 58], { w: 5, taper: 0, dry: false });
      const bx = h[0] - 12, by = h[1] - 96; const b = [[bx - w / 2, by - 36], [bx + w / 2, by - 38], [bx + w / 2 + 3, by + 36], [bx - w / 2 - 2, by + 38], [bx - w / 2, by - 36]];
      P.fillPts(c, b, '#FBF8F1'); stroke(c, b, { w: 3, closed: true, seed: 41 });
      c.fillStyle = '#3E5A1A'; c.textAlign = 'center'; c.fillText(txt, bx, by + 12); c.restore();
    };
  }
  function chain(ctx, cur, a) { // progress row (top right)
    const xs = [930, 1110, 1270, 1440, 1640];
    LV.forEach(([id, , n], i) => {
      const on = i === cur, done = i < cur;
      INK.label(ctx, n, xs[i], 150, { size: on ? 44 : 36, weight: 700, align: 'center', alpha: a * (on ? 1 : done ? 0.7 : 0.35), color: on ? '#3E5A1A' : PAL.ink });
      if (on) { ctx.save(); ctx.globalAlpha *= a; P.drawOn(ctx, P.bez([xs[i] - 70, 166], [xs[i], 172], [xs[i] + 70, 164], 16), 1, { w: 3, color: PAL.light }); ctx.restore(); }
      if (i < 4) INK.label(ctx, '›', (xs[i] + xs[i + 1]) / 2 + 6, 150, { size: 40, align: 'center', alpha: a * 0.5 });
    });
  }
  E.scene({
    name: 'Rol oynama', concept: 'Hücre, doku, organ, sistem, organizma', from: 'role', to: 'organism', trFrom: [440, 540],
    draw(ctx, t) {
      LVT = t; const F = F10, sr = E.s('role');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      const open = E.se(t, sr + 0.3, sr + 2);
      stage(ctx, open);
      let cur = -1; LV.forEach(([id], i) => { if (t >= E.s(id)) cur = i; });
      const txt = cur < 0 ? '?' : LV[cur][1];
      const hop = cur >= 0 ? Math.max(0, Math.sin(E.seg(t, E.s(LV[cur][0]), E.s(LV[cur][0]) + 0.5) * Math.PI)) : 0;
      DAMLA.draw(ctx, { x: 440, y: 862 - hop * 30, s: 1.35, view: 'front', expr: cur === 4 || hop > 0.2 ? 'happy' : (cur < 0 ? 'curious' : 'neutral'), look: [0.4, -0.2], blink: E.blink(t, 3), squash: E.breath(t), t, talk: E.talk(t), seed: 1,
        arms: [[-1, 0.4], [1, [30, -200]]], hold: open > 0.5 ? sign(txt) : null });
      // role beat: fan of cards
      if (cur < 0) {
        LV.forEach(([, T], i) => {
          const k = E.se(t, sr + 1.5 + i * 0.35, sr + 2.1 + i * 0.35, 'out'); if (k <= 0) return;
          ctx.save(); ctx.translate(1320 + (i - 2) * 150, 560 + Math.abs(i - 2) * 20); ctx.rotate((i - 2) * 0.12); ctx.scale(P.pop(k), P.pop(k));
          const c = [[-80, -120], [80, -120], [80, 120], [-80, 120], [-80, -120]]; P.fillPts(ctx, c, '#FBF8F1'); stroke(ctx, c, { w: 2.6, closed: true, seed: 50 + i });
          ctx.rotate(-Math.PI / 2); ctx.font = '700 36px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = '#3E5A1A'; ctx.fillText(T, 0, 12); ctx.restore();
        });
        return;
      }
      chain(ctx, cur, 1);
      const id = LV[cur][0], s0 = E.s(id);
      const k = E.se(t, s0 + 0.1, s0 + 0.9, 'out');
      if (cur > 0 && k < 1) { const pid = LV[cur - 1][0]; E.layer(ctx, 1 - k, c => level(c, pid, E.s(pid), 1)); }
      E.layer(ctx, k, c => level(c, id, s0, k));
    }
  });
  function level(c, id, s0, k) {
      const F = F10, t = LVT;
        if (id === 'cell') {
          F.muscleCell(c, 1300, 520, 640 * P.pop(k), 150 * P.pop(k), -0.05, 71, { w: 3 });
          F.tag(c, 'kas hücresi', 1250, 760, [1150, 560], E.se(t, s0 + 1, s0 + 2), { size: 50, color: '#8A3F2A' });
          F.tag(c, 'çekirdek', 1480, 380, [1310, 515], E.se(t, s0 + 2.2, s0 + 3), { size: 38, weight: 400 });
          INK.label(c, '(model çizim · ölçekli değildir)', 1780, 870, { size: 26, align: 'right', alpha: 0.55 });
        } else if (id === 'tissue') {
          F.tissue(c, 1300, 520, 820, 480, E.se(t, s0 + 0.2, s0 + 3.5), 3);
          const hl = F.spindle(1300 - 410 + 2 * 190 + 95, 520 - 240 + 5 * 46 * 0.62, 194, 46, 0);
          if (t > s0 + 3.5) { c.save(); c.globalAlpha *= E.se(t, s0 + 3.5, s0 + 4.3); stroke(c, hl, { w: 5, closed: true, color: PAL.light }); c.restore(); }
          F.tag(c, 'kas dokusu', 1300, 850, null, E.se(t, s0 + 4, s0 + 5), { size: 54, color: '#8A3F2A', align: 'center' });
        } else if (id === 'organ') {
          F.heart(c, 1260, 560, 1.35 * P.pop(k), t);
          const ik = E.se(t, s0 + 2.5, s0 + 3.3, 'out');
          if (ik > 0) { c.save(); c.beginPath(); c.arc(1660, 380, 120 * ik, 0, 7); c.clip(); F.tissue(c, 1660, 380, 300, 300, 1, 5, { L: 130, T: 34 }); c.restore(); stroke(c, circlePts(1660, 380, 120 * ik, 120 * ik, 50), { w: 4, closed: true }); c.save(); c.globalAlpha *= ik; INK.dashed(c, [[1330, 520], [1560, 440]], { w: 2, on: 8, off: 7 }); c.restore(); }
          F.tag(c, 'kalp', 1000, 330, [1150, 420], E.se(t, s0 + 1.2, s0 + 2), { size: 60, color: '#8A3F2A', align: 'right' });
          P.write(c, 'kas dokusu', 1660, 555, E.se(t, s0 + 3.4, s0 + 4.2), { size: 38, align: 'center' });
          P.write(c, '+ başka dokular', 1660, 600, E.se(t, s0 + 4.2, s0 + 5), { size: 34, weight: 400, align: 'center' });
        } else if (id === 'system') {
          const A = F.kid(c, 1250, 880, 1.55, { xray: 1, t });
          F.tag(c, 'dolaşım sistemi', 1470, 330, [A.heart[0] + 20, A.heart[1] - 10], E.se(t, s0 + 1.5, s0 + 2.5), { size: 50, color: '#8A3F2A' });
          P.write(c, 'kalp + damarlar', 1470, 400, E.se(t, s0 + 2.8, s0 + 3.8), { size: 40, weight: 400 });
          c.save(); c.globalAlpha *= E.se(t, s0 + 3.8, s0 + 4.6);
          stroke(c, [[1480, 470], [1540, 470]], { w: 4, color: F.ROSE, dry: false }); INK.label(c, 'atardamar', 1555, 482, { size: 32 });
          stroke(c, [[1480, 525], [1540, 525]], { w: 4, color: F.VEIN, dry: false }); INK.label(c, 'toplardamar', 1555, 537, { size: 32 });
          c.restore();
        } else {
          const A = F.kid(c, 1300, 880, 1.55, { t });
          const S = [['dolaşım', 1000, 330], ['solunum', 1620, 330], ['sindirim', 1000, 650], ['destek ve hareket', 1640, 650]];
          S.forEach(([n, x, y], i) => {
            const kk = E.se(t, s0 + 0.8 + i * 0.6, s0 + 1.4 + i * 0.6, 'out'); if (kk <= 0) return;
            c.save(); c.globalAlpha *= kk; INK.dashed(c, [[x + (x < 1300 ? 90 : -120), y - 10], [1300 + (x < 1300 ? -60 : 60), y < 500 ? 560 : 700]], { w: 1.8, on: 8, off: 7 }); c.restore();
            const b = INK.wobble(circlePts(x, y - 12, 150 * P.pop(kk), 44 * P.pop(kk), 40), 2, 80 + i); P.fillPts(c, b, '#EEF2DC'); stroke(c, b, { w: 2.4, closed: true, seed: 90 + i });
            INK.label(c, n, x, y + 2, { size: n.length > 10 ? 30 : 36, weight: 700, align: 'center', alpha: kk });
          });
          P.write(c, 'organizma', 1300, 240, E.se(t, s0 + 3.4, s0 + 4.4), { size: 64, align: 'center', color: '#3E5A1A' });
        }
  }
})();
