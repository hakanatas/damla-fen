// SAHNE 11 — Bilgiyi doğrulama (FB.8.3.7 c) ve sağlıklı yaşam (D13.4)
(function () {
  const { PAL, stroke, line } = INK;
  const F = F808;
  E.scene({
    name: 'Doğrula · sağlıklı yaşam', concept: 'Doğrulama; sağlıklı yaşam', from: 'verify', to: 'health', trFrom: [960, 540],
    draw(ctx, t) {
      const sv = E.s('verify'), sh = E.s('health');
      F.warmBg(ctx);
      const vk = 1 - E.se(t, sh - 0.3, sh + 0.4);
      if (vk > 0) E.layer(ctx, vk, c => {
        // iki kaynak kartı
        [['kaynak 1 · kitap', c2 => P.icon.books(c2, 0, 0, 0.7)], ['kaynak 2 · genel ağ', c2 => P.icon.laptop(c2, 0, -6, 0.75, t)]].forEach(([lab, fn], i) => {
          const at = sv + 0.3 + i * 0.8, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          const cx = 420 + i * 520;
          c.save(); c.globalAlpha *= k;
          F.card(c, cx - 220, 210, 440, 420, 4500 + i);
          c.save(); c.translate(cx, 320); fn(c); c.restore();
          F.fit(c, lab, cx, 450, 400, 38);
          F.fit(c, 'Mutasyon = DNA’da', cx, 520, 400, 36, { weight: 400 }); F.fit(c, 'kalıcı değişiklik', cx, 565, 400, 36, { weight: 400 });
          P.check(c, cx + 160, 250, 40, E.se(t, sv + 2.0 + i * 0.4, sv + 2.5 + i * 0.4), { w: 6, color: F.GREEN });
          c.restore();
        });
        if (t > sv + 1.6) { c.save(); c.globalAlpha *= E.se(t, sv + 1.6, sv + 2.2); F.fit(c, '=', 680, 440, 80, 80, { color: F.GREEN }); c.restore(); }
        // arkadaşlarla tartışma
        const dk = E.se(t, sv + 2.6, sv + 3.3, 'out');
        if (dk > 0) { c.save(); c.globalAlpha *= dk; F.person(c, 1350, 780, 0.9, null, { seed: 51 }); F.person(c, 1560, 780, 0.9, null, { seed: 52 });
          P.bubble(c, 1330, 380, 260, 120, [1350, 560], 1, 21); INK.label(c, 'Emin miyiz?', 1330, 395, { size: 36, weight: 700, align: 'center' });
          P.bubble(c, 1600, 330, 280, 120, [1560, 560], 1, 22); INK.label(c, 'Kaynağı ne?', 1600, 345, { size: 36, weight: 700, align: 'center' }); c.restore(); }
        F.damla(c, t, { x: 1760, y: 880, s: 0.8, flip: true, expr: 'curious', look: [-0.8, -0.2], arms: [[-1, 0.4], [1, 0.5]] });
      });
      // sağlıklı yaşam
      const HL = [
        ['dengeli beslen', c => F.apple(c, 0, 0, 1)],
        ['güneşten korun', c => F.hat(c, 0, 10, 1)],
        ['zararlı madde kullanma', c => F.noSmoke(c, 0, 0, 0.9)],
        ['kimyasallardan korun', c => { F.goggles(c, 0, -20, 0.9); F.fit(c, '+ eldiven', 0, 50, 200, 32, { weight: 400 }); }]
      ];
      HL.forEach(([lab, fn], i) => {
        const at = sh + 0.6 + i * 1.3, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const cx = 300 + i * 440;
        E.layer(ctx, k, c => {
          F.card(c, cx - 190, 240, 380, 400, 4600 + i, { tint: PAL.life, tintA: 0.08 });
          c.save(); c.translate(cx, 420); fn(c); c.restore();
          F.fit(c, lab, cx, 590, 350, 38);
        });
      });
      E.inkText(ctx, 'Sağlıklı yaşam alışkanlıkları sağlığımızı korur.', 960, 790, t, sh + 6.2, 1e9, { size: 48, align: 'center', color: F.GREEN });
    }
  });
})();
