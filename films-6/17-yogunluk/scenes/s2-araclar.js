// SAHNE 2 — Ölçme araçları ve birimleri: eşit kollu terazi (g), dereceli silindir (cm³)
(function () {
  const { PAL } = INK;
  const F = F617;
  E.scene({
    name: 'Ölçme araçları', concept: 'Kütle: g · Hacim: cm³', from: 'tools', to: 'tools', trFrom: [960, 540],
    draw(ctx, t) {
      const s0 = E.s('tools');
      F.desk(ctx, 860, 2);
      // sol: terazi
      const k1 = E.se(t, s0 + 0.5, s0 + 1.3, 'out');
      E.layer(ctx, k1, c => {
        F.balance(c, 560, 780, { s: 0.85, left: (cc, x, y) => F.stone(cc, x, y - 2, 0.8), right: (cc, x, y) => { F.mass(cc, x - 26, y - 2, '50 g', 0.8); F.mass(cc, x + 30, y - 2, '5 g', 0.55); } });
      });
      P.write(ctx, 'eşit kollu terazi', 560, 240, E.seg(t, s0 + 1.0, s0 + 2.2), { size: 50, align: 'center' });
      P.write(ctx, 'kütle → gram (g)', 560, 840, E.seg(t, s0 + 2.2, s0 + 3.4), { size: 50, align: 'center', color: '#8A4A10' });
      // sağ: dereceli silindir
      const k2 = E.se(t, s0 + 3.6, s0 + 4.4, 'out');
      E.layer(ctx, k2, c => {
        F.cylinder(c, 1330, 760, 120, 420, 100, 60, { step: 10, labelEvery: 20 });
      });
      P.write(ctx, 'dereceli silindir', 1330, 240, E.seg(t, s0 + 4.0, s0 + 5.2), { size: 50, align: 'center' });
      P.write(ctx, 'hacim → santimetreküp (cm³)', 1330, 840, E.seg(t, s0 + 5.2, s0 + 6.6), { size: 46, align: 'center', color: PAL.water });
      // 1 mL = 1 cm³ notu
      const k3 = E.se(t, s0 + 6.8, s0 + 7.6, 'out');
      if (k3 > 0) E.layer(ctx, k3, c => {
        F.card(c, 1560, 420, 1860, 520, { seed: 1821 });
        F.txt(c, '1 mL = 1 cm³', 1710, 485, { size: 44, align: 'center' });
      });
    }
  });
})();
