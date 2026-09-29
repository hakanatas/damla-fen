// SAHNE 4–6 — Devre elemanları → kart eşleştirme (a: sembolleri belirler) → ayrıştır ve grupla (b, c)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const RED = CK.RED;
  const EL = CK.ELEM;
  const iconS = { pil: 1.0, ampul: 1.05, anahtar: 0.95, kablo: 1.0, duy: 1.15, yatak: 0.95 };
  // S4 ızgara konumu
  const gridPos = i => [420 + (i % 3) * 380, 340 + Math.floor(i / 3) * 330];
  // S5 satır konumu
  const rowY = i => 250 + i * 108;
  const ROWX = 490, SLOTX = 960, RW = 450;
  function elemCard(ctx, e, i, x, y, w, h, s, o = {}) {
    CK.card(ctx, x - w / 2, y - h / 2, w, h, { seed: 300 + i, fill: o.fill ?? PAL.white, shadow: o.shadow });
    if (o.row) {
      ctx.save(); ctx.translate(x - w / 2 + 85, y); e.draw(ctx, s * 0.5 * (e.id === 'duy' ? 1.2 : 1)); ctx.restore();
      INK.label(ctx, e.name, x - w / 2 + 170, y + 13, { size: e.name.length > 12 ? 33 : 38, weight: 700 });
    } else {
      ctx.save(); ctx.translate(x, y - 30); e.draw(ctx, s * iconS[e.id]); ctx.restore();
      INK.label(ctx, e.name, x, y + h / 2 - 34, { size: 40, weight: 700, align: 'center' });
    }
  }
  function bg(ctx) { ctx.fillStyle = 'rgba(138,106,69,0.18)'; ctx.fillRect(0, 0, E.W, E.H); }

  // ---------------- SAHNE 4: elemanlar ----------------
  E.scene({
    name: 'Elemanlar', concept: 'Basit devre elemanları', from: 'parts', to: 'game', trFrom: [960, 540],
    draw(ctx, t) {
      const sp = E.s('parts'), sl = E.s('list'), sg = E.s('game');
      ctx.save(); bg(ctx);
      P.notebook(ctx, 150, 80, 1620, 900);
      EL.forEach((e, i) => {
        const at = sl + 0.2 + i * 1.25, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const [x, y] = gridPos(i);
        ctx.save(); ctx.translate(x, y); ctx.scale(P.pop(k), P.pop(k)); elemCard(ctx, e, i, 0, 0, 330, 290, 1); ctx.restore();
      });
      // deste: sembol kartları (arkası dönük)
      const kd = E.se(t, sg + 0.3, sg + 1.0, 'out');
      if (kd > 0) {
        for (let j = 3; j >= 0; j--) CK.symCard(ctx, null, 1500 + j * 6, 300 - j * 8, P.pop(kd), { flip: 0, seed: j, rot: 0.04 * (j - 1.5) });
        P.write(ctx, 'sembol kartları', 1500, 410, E.seg(t, sg + 0.8, sg + 1.8), { size: 36, align: 'center' });
      }
      const pk = E.se(t, sp + 0.1, sp + 0.9, 'out');
      DAMLA.draw(ctx, {
        x: 1560, y: 930 + (1 - pk) * 300, s: 1.2, view: 'q3', flip: true, expr: t > sg ? 'happy' : 'curious', look: [-0.8, -0.3], blink: E.blink(t, 7), squash: E.breath(t), t, talk: E.talk(t), seed: 3,
        arms: t > sl && t < sg ? [[-1, 0.4], [1, 2.1 + Math.sin(t * 2) * 0.1]] : t > sg ? [[-1, 2.5], [1, 0.4]] : [[-1, 0.35], [1, 0.4]]
      });
      ctx.restore();
    }
  });

  // ---------------- SAHNE 5: kart eşleştirme ----------------
  const MATCH = ['m-pil', 'm-ampul', 'm-anahtar', 'm-kablo'];
  E.scene({
    name: 'Eşleştir', concept: 'Elemanların sembollerini belirleme', from: 'm-pil', to: 'm-none', tr: 0.01,
    draw(ctx, t) {
      const s0 = E.s('m-pil'), sn = E.s('m-none');
      ctx.save(); bg(ctx);
      P.notebook(ctx, 150, 80, 1620, 900);
      // elemanlar ızgaradan satırlara kayar
      const mv = E.se(t, s0, s0 + 1.2);
      const hk = E.se(t, s0 + 0.8, s0 + 1.5);
      if (hk > 0) { INK.label(ctx, 'Eleman', ROWX, 178, { size: 44, weight: 700, align: 'center', alpha: hk }); INK.label(ctx, 'Sembol', SLOTX, 178, { size: 44, weight: 700, align: 'center', alpha: hk }); }
      EL.forEach((e, i) => {
        const [gx, gy] = gridPos(i);
        const x = E.lerp(gx, ROWX, mv), y = E.lerp(gy, rowY(i), mv);
        const w = E.lerp(330, RW, mv), h = E.lerp(290, 96, mv);
        const cur = MATCH.findIndex(id => t >= E.s(id) && t < E.e(id)) === i || (t >= sn && i >= 4);
        if (mv < 0.5) { ctx.save(); ctx.translate(x, y); elemCard(ctx, e, i, 0, 0, w, h, 1); ctx.restore(); }
        else elemCard(ctx, e, i, x, y, RW, 96, 1, { row: true, fill: cur ? '#FBF1D6' : PAL.white });
        if (mv >= 1) { // boş yuva
          INK.dashed(ctx, CK.rect(SLOTX - 140, rowY(i) - 48, 280, 96), { w: 2, on: 10, off: 8, alpha: 0.4 });
        }
      });
      // deste
      const used = MATCH.filter(id => t > E.s(id) + 0.3).length;
      for (let j = 3; j >= used; j--) CK.symCard(ctx, null, 1450 + j * 6, 300 - j * 8, 1, { flip: 0, seed: j, rot: 0.04 * (j - 1.5) });
      if (used >= 4) INK.label(ctx, 'deste bitti', 1460, 320, { size: 36, align: 'center', alpha: 0.6 });
      // eşleşen kartlar
      MATCH.forEach((id, j) => {
        const a = E.s(id); if (t < a + 0.3) return;
        const fly = E.se(t, a + 0.3, a + 1.3), flip = E.se(t, a + 1.3, a + 1.9);
        const x = E.lerp(1450 + j * 6, SLOTX, fly), y = E.lerp(300 - j * 8, rowY(j), fly) - Math.sin(fly * Math.PI) * 80;
        CK.symCard(ctx, EL[j].sym, x, y, 1, { flip, seed: j });
        const kc = E.se(t, a + 2.1, a + 2.7);
        if (kc > 0) P.check(ctx, SLOTX + 190, rowY(j) - 6, 46, kc, { w: 7, color: PAL.life });
        // anahtar: açık/kapalı açıklaması
      });
      // duy ve pil yatağı: kart yok
      [4, 5].forEach((i, n) => {
        const k = E.se(t, sn + 1.2 + n * 0.8, sn + 1.8 + n * 0.8, 'out'); if (k <= 0) return;
        INK.label(ctx, '?', SLOTX, rowY(i) + 22, { size: 70 * P.pop(k), weight: 700, color: CK.AMBD, align: 'center' });
      });
      if (t > sn + 3) P.write(ctx, 'sembol kartı yok!', SLOTX + 170, rowY(4) + 64, E.seg(t, sn + 3, sn + 4.2), { size: 40, color: '#8A4A10' });
      // Damla
      const pointing = t < sn;
      DAMLA.draw(ctx, {
        x: 1560, y: 930, s: 1.2, view: 'q3', flip: true, expr: t > sn + 1 ? 'thinking' : 'happy', look: [-0.8, -0.1], blink: E.blink(t, 7), squash: E.breath(t), t, talk: E.talk(t), seed: 3,
        arms: pointing ? [[-1, 2.2 + 0.1 * Math.sin(t * 3)], [1, 0.4]] : [[-1, 0.4], [1, [30, -86]]]
      });
      ctx.restore();
    }
  });

  // ---------------- SAHNE 6: ayrıştır ve grupla ----------------
  const G1 = [0, 1, 2, 3], G2 = [4, 5];
  const g1Y = j => 330 + j * 125, g2Y = n => 380 + n * 250;
  E.scene({
    name: 'Grupla', concept: 'Sembolü olan / olmayan elemanlar', from: 'sort', to: 'why', tr: 0.01,
    draw(ctx, t) {
      const so = E.s('sort'), sw = E.s('why');
      ctx.save(); bg(ctx);
      P.notebook(ctx, 150, 80, 1620, 900);
      const kb = E.se(t, so + 0.3, so + 1.3);
      // grup kutuları
      if (kb > 0) {
        ctx.save(); ctx.globalAlpha = kb;
        const b1 = CK.densify(CK.densify(CK.rect(240, 200, 860, 700))), b2 = CK.densify(CK.densify(CK.rect(1130, 200, 580, 700)));
        P.fillPts(ctx, b1, PAL.life, 0.08); stroke(ctx, INK.wobble(b1, 1.5, 5), { w: 3, closed: true, color: PAL.life });
        P.fillPts(ctx, b2, '#8A6A45', 0.08); stroke(ctx, INK.wobble(b2, 1.5, 6), { w: 3, closed: true, color: '#8A6A45' });
        ctx.restore();
        P.write(ctx, '1. grup: Sembolü olan', 290, 258, E.seg(t, so + 1.0, so + 2.2), { size: 44 });
        P.write(ctx, '2. grup: Sembolü olmayan', 1160, 258, E.seg(t, so + 1.4, so + 2.6), { size: 40 });
      }
      // kartlar satırlardan gruplara geçer
      EL.forEach((e, i) => {
        const inG1 = i < 4, at = so + 2.4 + i * 0.7;
        const mv = E.se(t, at, at + 0.9);
        const tx = inG1 ? 500 : 1420, ty = inG1 ? g1Y(i) : g2Y(i - 4);
        const x = E.lerp(ROWX, tx, mv), y = E.lerp(rowY(i), ty, mv) - Math.sin(mv * Math.PI) * 50;
        const w = inG1 ? RW : E.lerp(RW, 380, mv);
        // 2. grup "neden" açıklaması: kart sola kayar, içine ampul/pil oturur
        const why = inG1 ? 0 : E.se(t, sw + 0.3 + (i - 4) * 2.4, sw + 1.1 + (i - 4) * 2.4);
        const xx = x - why * 110;
        if (inG1 || why <= 0) elemCard(ctx, e, i, xx, y, w, 96, 1, { row: true });
        else {
          CK.card(ctx, xx - 170, y - 80, 340, 160, { seed: 330 + i });
          ctx.save(); ctx.translate(xx - 60, y + 10);
          if (e.id === 'duy') { const so2 = CK.socket(ctx, 0, 50, 0.72); CK.bulb(ctx, so2.top[0], so2.top[1] + 4, 0.72, 0); }
          else CK.holder(ctx, 0, 0, 0.62);
          ctx.restore();
          INK.label(ctx, e.name, xx + 75, y - 34, { size: 36, weight: 700, align: 'center' });
          INK.label(ctx, e.id === 'duy' ? 'ampulü tutar' : 'pili tutar', xx + 75, y + 14, { size: 30, align: 'center', alpha: 0.75 });
          const ka = E.se(t, sw + 1.2 + (i - 4) * 2.4, sw + 1.8 + (i - 4) * 2.4);
          if (ka > 0) {
            INK.label(ctx, 'şemada:', xx + 75, y + 60, { size: 28, align: 'center', alpha: 0.7 * ka });
            P.arrow(ctx, [xx + 178, y + 20], [xx + 238, y + 20], ka, { w: 3, head: 12 });
            CK.sym(ctx, e.id === 'duy' ? 'ampul' : 'pil', xx + 310, y + 20, 0.95, { k: E.seg(t, sw + 1.6 + (i - 4) * 2.4, sw + 2.4 + (i - 4) * 2.4) });
          }
        }
        if (inG1) {
          const sx = E.lerp(SLOTX, 900, mv), sy = E.lerp(rowY(i), ty, mv) - Math.sin(mv * Math.PI) * 50;
          CK.symCard(ctx, e.sym, sx, sy, 1, { flip: 1, seed: i });
        }
      });
      // sembolü olmayanlar etiketi
      if (t > so + 5.8 && t < sw + 0.3) E.inkText(ctx, 'sembolü yok', 1420, 860, t, so + 5.8, sw + 0.3, { size: 40, align: 'center', color: '#8A4A10' });
      if (t > sw + 5.6) E.inkText(ctx, 'Şemada yalnızca ampul ve pil çizilir.', 1420, 870, t, sw + 5.6, 1e9, { size: 34, align: 'center', color: '#8A4A10' });
      ctx.restore();
    }
  });
})();
