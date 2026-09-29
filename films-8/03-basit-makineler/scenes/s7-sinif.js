// SAHNE 7 — Sınıflandırma: nitelik belirle → ayrıştır → gruplandır → etiketle (FB.8.2.1 a–ç)
(function () {
  const { PAL, line, stroke } = INK;
  const F = F8M;
  const CW = 260, CH = 200;
  // [gündelik ad, ikon, grup, basit makine etiketi, ikon ölçeği, ikon dy]
  const ITEMS = [
    ['el arabası', 'wheelbarrow', 0, 'kaldıraç', 0.95, 10],
    ['rampa', 'ramp', 0, 'eğik düzlem', 0.8, 5],
    ['kuyu', 'well', 0, 'çıkrık', 0.72, 12],
    ['tahta vidası', 'screw', 0, 'vida', 0.62, -18],
    ['vinç kancası', 'hookPulley', 0, 'hareketli makara', 0.5, -95],
    ['cımbız', 'tweezers', 1, 'kaldıraç', 0.95, -30],
    ['bisiklet vitesi', 'bikeGears', 1, 'dişli çark', 0.9, -30],
    ['bayrak direği', 'flag', 2, 'sabit makara', 0.62, 12],
    ['tahterevalli', 'seesaw', 2, 'kaldıraç', 0.95, 0]
  ];
  const GROUPS = [['kuvvetten', 'kazanç'], ['yoldan', 'kazanç'], ['yönü', 'değiştirir']];
  const ROWY = [330, 560, 790];
  function gridPos(i) { return [660 + (i % 3) * 300, ROWY[Math.floor(i / 3)]]; }
  function rowPos(i) { const g = ITEMS[i][2]; const idx = ITEMS.slice(0, i).filter(x => x[2] === g).length; return [640 + idx * 276, ROWY[g]]; }

  function card(ctx, x, y, it, lk, seed) {
    F.card(ctx, x - CW / 2, y - CH / 2, x + CW / 2, y + CH / 2, { seed });
    ctx.save(); ctx.beginPath(); ctx.rect(x - CW / 2 + 4, y - CH / 2 + 4, CW - 8, CH - 70); ctx.clip();
    F.icon[it[1]](ctx, x, y + it[5], it[4]);
    ctx.restore();
    F.txt(ctx, it[0], x, y + CH / 2 - 42 - 22 * lk, { size: 34, align: 'center', alpha: 1 - 0.35 * lk });
    if (lk > 0) { ctx.save(); ctx.globalAlpha *= lk; F.txt(ctx, it[3], x, y + CH / 2 - 16, { size: it[3].length > 12 ? 30 : 34, align: 'center', color: F.FORCE }); ctx.restore(); }
  }

  E.scene({
    name: 'Sınıflandır', concept: 'Nitelik → ayrıştır → grupla → etiketle', from: 'sort', to: 'label', trFrom: [960, 540],
    draw(ctx, t) {
      const ss = E.s('sort'), sg = E.s('groups'), sl = E.s('label');
      // nitelik sorusu
      const qk = E.se(t, ss + 0.6, ss + 1.3) * (1 - E.se(t, sg, sg + 0.5));
      if (qk > 0) { ctx.save(); ctx.globalAlpha *= qk; F.tag(ctx, 'Nitelik: Ne kazandırıyor? Kuvvet mi, yol mu, yön mü?', 1200, 190, { size: 40, seed: 3700 }); ctx.restore(); }
      // grup başlıkları
      GROUPS.forEach((g, i) => {
        const k = E.se(t, sg + 0.2 + i * 1.8, sg + 0.9 + i * 1.8); if (k <= 0) return;
        ctx.save(); ctx.globalAlpha *= k;
        const y = ROWY[i];
        const bx = [[60, y - 95], [460, y - 100], [466, y + 98], [64, y + 100], [60, y - 95]];
        P.fillPts(ctx, bx, i === 0 ? '#F6E7B8' : (i === 1 ? '#E4EEF2' : '#EAF0DD'), 0.9); stroke(ctx, bx, { w: 2.6, closed: true, seed: 3710 + i });
        F.txt(ctx, g[0], 262, y - 8, { size: 48, align: 'center' }); F.txt(ctx, g[1], 262, y + 50, { size: 48, align: 'center' });
        ctx.restore();
      });
      // kartlar: önce 3×3 karışık ızgara, sonra gruplarına uçar
      ITEMS.forEach((it, i) => {
        const at = ss + 0.3 + i * 0.35, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
        const g = it[2], idx = ITEMS.filter((x, j) => x[2] === g && j < i).length;
        const mt = sg + 0.3 + g * 1.8 + idx * 0.3, m = E.se(t, mt, mt + 1.0, 'io');
        const a = gridPos(i), b = rowPos(i);
        const x = E.lerp(a[0], b[0], m), y = E.lerp(a[1], b[1], m) - Math.sin(m * Math.PI) * 50;
        const lk = E.se(t, sl + 0.8 + i * 0.35, sl + 1.3 + i * 0.35);
        ctx.save(); ctx.globalAlpha *= k; card(ctx, x, y, it, lk, 3720 + i); ctx.restore();
      });
    }
  });
})();
