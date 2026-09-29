// SAHNE 5 — Veri tablosu ve analiz (FB.6.6.2 b; OB7)
(function () {
  const { PAL, line, stroke } = INK;
  const COLS = [
    { x: 300, head: 'Uzunluk', rows: [['25 cm', 25, false, 'nicr'], ['50 cm', 50, false, 'nicr'], ['100 cm', 100, false, 'nicr']] },
    { x: 800, head: 'Kesit alanı', rows: [['kalın', 50, true, 'nicr'], ['ince', 50, false, 'nicr']] },
    { x: 1300, head: 'Cins', rows: [['bakır', 50, false, 'cu'], ['krom-nikel', 50, false, 'nicr']] }
  ];
  E.scene({
    name: 'Tablo', concept: 'Verileri kaydetme ve yorumlama', from: 'table', to: 'table', trFrom: [960, 540],
    draw(ctx, t) {
      const st = E.s('table');
      ctx.save();
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 80, 1620, 900);
      P.write(ctx, 'Veri tablom', 290, 215, E.seg(t, st + 0.2, st + 1.0), { size: 56 });
      COLS.forEach((c, i) => {
        const at = st + 0.6 + i * 1.2, k = E.se(t, at, at + 0.5); if (k <= 0) return;
        ctx.save(); ctx.globalAlpha = k;
        INK.label(ctx, c.head, c.x, 300, { size: 42, weight: 700 });
        line(ctx, [c.x - 10, 318], [c.x + 400, 316], { w: 2.4, dry: false });
        c.rows.forEach(([lab, cm, th, m], j) => {
          const y = 380 + j * 80, b = F20.B(F20.R(cm, th, m));
          INK.label(ctx, lab, c.x, y, { size: 36 });
          CK.bulb(ctx, c.x + 230, y + 18, 0.34, b, t, { rays: false });
          F20.meter(ctx, c.x + 270, y - 18, 120, b);
        });
        ctx.restore();
      });
      const kc = E.se(t, st + 4.4, st + 5.0, 'out');
      if (kc > 0) {
        ctx.save(); ctx.translate(960, 740); ctx.scale(P.pop(kc), P.pop(kc));
        CK.card(ctx, -560, -80, 1120, 150, { fill: '#F6E7B8', seed: 91 });
        INK.label(ctx, 'direnç ↑  →  ampulün parlaklığı ↓', 0, -8, { size: 52, weight: 700, align: 'center', color: '#8A4A10' });
        INK.label(ctx, 'Direnç: uzunluğa, kesit alanına ve iletkenin cinsine bağlıdır.', 0, 46, { size: 36, align: 'center' });
        ctx.restore();
      }
      ctx.restore();
    }
  });
})();
