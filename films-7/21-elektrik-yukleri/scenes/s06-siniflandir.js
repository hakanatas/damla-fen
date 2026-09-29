// SAHNE 6 — Sınıflandırma (FB.7.6.3 b, c, ç): ayrıştır → grupla → etiketle (pozitif · negatif · nötr); sürtünen iki cisim zıt yüklenir.
(function () {
  const { PAL, line, stroke } = INK;
  const F = F721;
  // [ad, çizim, yük (+1/-1/0), sürtme eşi indeksi, grup sütunu 0/1/2, sütundaki yeri]
  const OBJ = [
    ['cam çubuk', (c, x, y) => F.rod(c, x, y, 150, 'cam'), 1, 1, 0, 0],
    ['ipek kumaş', (c, x, y) => F.silk(c, x, y, 140, 70), -1, 0, 1, 0],
    ['plastik çubuk', (c, x, y) => F.rod(c, x, y, 150, 'plastik'), -1, 3, 1, 1],
    ['yün kumaş', (c, x, y) => F.wool(c, x, y, 140, 70), 1, 2, 0, 1],
    ['balon', (c, x, y) => F.balloon(c, x, y - 10, 30, F.HEAT, { strLen: 20 }), -1, 5, 1, 2],
    ['Ece’nin saçı', (c, x, y) => { for (let i = 0; i < 9; i++) stroke(c, P.bez([x - 40 + i * 10, y + 30], [x - 44 + i * 10, y], [x - 36 + i * 11, y - 36], 8), { w: 2.6, color: '#5A3A22', dry: false, seed: 440 + i }); }, 1, 4, 0, 2],
    ['kalem (sürtülmedi)', (c, x, y) => F.pencil(c, x, y, 150), 0, -1, 2, 0]
  ];
  const CW = 214, CH = 190;
  const COLX = [400, 960, 1520];
  const slot = (col, j) => { const cx = COLX[col]; return j < 2 ? [cx - 112 + j * 224, 520] : [cx, 720]; };
  E.scene({
    name: 'Sınıflandır', concept: 'Ayrıştır, grupla, etiketle', from: 'sort', to: 'rule', trFrom: [960, 300],
    draw(ctx, t) {
      F.bg(ctx);
      const ss = E.s('sort'), sp = E.s('pairs'), sg = E.s('group'), sl = E.s('label'), sr = E.s('rule');
      const mv = E.se(t, sg + 0.6, sg + 2.6);
      // sütunlar
      if (t > sg) {
        COLX.forEach((cx, i) => {
          const k = E.se(t, sg + 0.2 + i * 0.2, sg + 0.8 + i * 0.2);
          const b = F.rr(cx - 260, 430, 520, 470, 16, 3);
          ctx.save(); ctx.globalAlpha *= k; P.fillPts(ctx, b, PAL.white, 0.55); stroke(ctx, b, { w: 2.2, closed: true, alpha: 0.6, seed: 470 + i }); ctx.restore();
          const names = ['POZİTİF', 'NEGATİF', 'NÖTR'], cols = [F.POS, F.NEG, PAL.ink];
          const lk = E.se(t, sl + 0.6 + i * 1.2, sl + 1.2 + i * 1.2);
          if (lk <= 0) F.fit(ctx, (i + 1) + '. grup', cx, 470 - 50, 300, 38, { alpha: k * 0.7, weight: 400 });
          else F.stamp(ctx, cx, 405, names[i], lk, { color: cols[i], size: 46, rot: -0.03 });
        });
      }
      OBJ.forEach(([name, draw, q, mate, col, j], i) => {
        const at = ss + 1.0 + i * 0.5, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
        const x0 = 150 + i * 240, y0 = 190;
        const [sx, sy] = slot(col, j);
        const x = E.lerp(x0, sx - CW / 2, mv), y = E.lerp(y0, sy - CH / 2 + 60, mv);
        const s = E.lerp(1, 0.9, mv);
        E.layer(ctx, k, c => {
          c.save(); c.translate(x, y); c.scale(s, s);
          F.card(c, 0, 0, CW, CH, 460 + i);
          draw(c, CW / 2, 80);
          F.fit(c, name, CW / 2, 168, CW - 20, 30);
          // yük işareti (sürtünme sonrası)
          const qa = q === 0 ? E.se(t, sp + 7.0, sp + 7.6) : E.se(t, sp + 1.2 + Math.floor(i / 2) * 2.4, sp + 1.8 + Math.floor(i / 2) * 2.4);
          if (qa > 0) {
            if (q) { F.charge(c, CW - 26, 26, q, 20, { alpha: qa }); F.charge(c, CW - 64, 26, q, 20, { alpha: qa }); }
            else F.fit(c, '+ = −', CW - 50, 38, 90, 30, { alpha: qa });
          }
          c.restore();
        });
      });
      // sürtme eşleri: elektron geçiş okları (ayrıştırma aşaması)
      if (t > sp && mv < 0.05) {
        [[0, 1], [2, 3], [4, 5]].forEach(([a, b], p) => {
          const at = sp + 0.4 + p * 2.4; if (t < at) return;
          const giver = OBJ[a][2] > 0 ? a : b, taker = giver === a ? b : a;
          const gx = 150 + giver * 240 + CW / 2, tx = 150 + taker * 240 + CW / 2;
          ctx.save(); ctx.globalAlpha *= E.se(t, at, at + 0.4) * (1 - E.se(t, sg, sg + 0.5));
          P.arrow(ctx, [gx, 400], [tx, 400], E.se(t, at + 0.2, at + 1.0), { w: 3, color: F.NEG, bend: -40, head: 12 });
          F.charge(ctx, (gx + tx) / 2, 460, -1, 14);
          ctx.restore();
        });
        ctx.save(); ctx.globalAlpha *= E.se(t, sp + 0.6, sp + 1.2) * (1 - E.se(t, sg, sg + 0.5));
        F.fit(ctx, 'ok: elektronun gittiği yön', 960, 560, 700, 36, { color: F.NEG });
        ctx.restore();
      }
      E.layer(ctx, 1 - E.se(t, sg, sg + 0.6), c => F.damla(c, t, { x: 960, y: 890, s: 1.2, view: 'front', expr: 'thinking', look: [0, -0.8], prop: 'notebook', arms: [[-1, 0.5], [1, 1.3]] }));
      // kural
      const kr = E.se(t, sr + 0.3, sr + 1.0, 'out');
      if (kr > 0) E.layer(ctx, kr, c => {
        F.card(c, 360, 170, 1200, 150, 490, { tint: F.AMB, tintA: 0.12 });
        F.wfit(c, 'Birbirine sürtülen iki cisim', 960, 230, E.seg(t, sr + 0.6, sr + 1.8), 46, 1100, { align: 'center' });
        F.wfit(c, 'zıt cins yükle yüklenir.', 960, 295, E.seg(t, sr + 1.6, sr + 2.8), 50, 1100, { align: 'center', color: F.AMB });
      });
    }
  });
})();
