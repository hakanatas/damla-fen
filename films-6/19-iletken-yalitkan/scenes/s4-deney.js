// SAHNE 5 — Deney: maddeleri sırayla test etme (FB.6.6.1 b: ölçme/gözlem; E3.2, E3.4, E3.7 sistematik çalışma)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const CX = 1060, Y = 820, SC = 1.12;
  const TRAY_Y = 250, trayX = i => 520 + i * 180;
  // her örnek için zaman aralığı [giriş, çıkış]
  function slots() {
    const a = E.s('test1'), b = E.s('test2'), out = [];
    for (let i = 0; i < 3; i++) out.push([a + 0.3 + i * 3.4, a + 0.3 + (i + 1) * 3.4 - 0.2]);
    for (let i = 0; i < 4; i++) out.push([b + 0.2 + i * 2.9, b + 0.2 + (i + 1) * 2.9 - 0.2]);
    return out;
  }
  E.scene({
    name: 'Deney', concept: 'Maddelerin iletkenliğini test etme', from: 'test1', to: 'fair', trFrom: [1500, 760],
    draw(ctx, t) {
      const sf = E.s('fair'), SL = slots(), S = F19.S.slice(0, 7);
      // aktif örnek
      let cur = -1, kin = 0;
      SL.forEach(([a, b], i) => { if (t >= a && t < b) { cur = i; kin = Math.min(E.se(t, a, a + 0.7), 1 - E.se(t, b - 0.5, b)); } });
      const contact = cur >= 0 && t > SL[cur][0] + 0.8 && t < SL[cur][1] - 0.5;
      const b = contact ? S[cur].b : 0;
      ctx.save();
      CK.table(ctx, Y);
      const r = F19.rig(ctx, CX, Y, SC, b, t, {});
      // tepsi: sıradaki maddeler + sonuç işaretleri
      S.forEach((m, i) => {
        const used = cur === i;
        const x = trayX(i);
        ctx.save(); ctx.globalAlpha = used ? 0.2 : 1; F19.sample(ctx, m.id, x, TRAY_Y, 0.6, -0.12); ctx.restore();
        const done = t > SL[i][0] + 1.2;
        if (done) {
          const k = E.se(t, SL[i][0] + 1.2, SL[i][0] + 1.7);
          if (m.b > 0) P.check(ctx, x - 10, TRAY_Y + 70, 34, k, { w: 6, color: PAL.life });
          else P.cross(ctx, x, TRAY_Y + 80, 20, k, { w: 6, color: CK.RED });
        }
      });
      // hareket eden örnek
      if (cur >= 0) {
        const [a] = SL[cur]; const km = E.se(t, a, a + 0.8);
        const x = E.lerp(trayX(cur), r.gap[0], km), y = E.lerp(TRAY_Y, r.gap[1], km) - Math.sin(km * Math.PI) * 80;
        F19.sample(ctx, S[cur].id, x, y, E.lerp(0.6, 1.12 * 0.95, km), E.lerp(-0.12, 0, km));
        // kıskaçlar yeniden (örneğin üstünde görünsün)
        const half = 100 * SC;
        F19.clip(ctx, [r.gap[0] - half + 12 * SC, r.gap[1]], 1, SC * 0.9, '#2E6A8C');
        F19.clip(ctx, [r.gap[0] + half - 12 * SC, r.gap[1]], -1, SC * 0.9, '#3A3842');
        E.layer(ctx, kin, c => {
          INK.label(c, S[cur].name, r.gap[0], 890, { size: 46, weight: 700, align: 'center' });
          if (contact) INK.label(c, S[cur].b > 0 ? 'ampul yandı' : 'ampul yanmadı', r.gap[0], 470, { size: 42, weight: 700, align: 'center', color: S[cur].b > 0 ? '#8A4A10' : PAL.water });
        });
      }
      // adil test
      const kf = E.se(t, sf + 0.3, sf + 1.0);
      if (kf > 0) {
        ['aynı pil', 'aynı ampul', 'aynı kablolar'].forEach((s, i) => {
          const k = E.se(t, sf + 0.4 + i * 0.9, sf + 1.0 + i * 0.9, 'out'); if (k <= 0) return;
          const x = 680 + i * 330, y = 440;
          ctx.save(); ctx.translate(x, y); ctx.scale(P.pop(k), P.pop(k));
          CK.card(ctx, -140, -44, 280, 80, { seed: 60 + i, fill: '#F6E7B8' });
          INK.label(ctx, s, 0, 12, { size: 40, weight: 700, align: 'center' });
          ctx.restore();
        });
      }
      const lit = b > 0;
      DAMLA.draw(ctx, {
        x: 300, y: 822, s: 1.2, view: 'q3', expr: lit ? 'happy' : (contact ? 'surprised' : 'curious'), look: [0.9, lit ? -0.4 : 0], blink: E.blink(t, 3), squash: E.breath(t), t, seed: 1,
        arms: [[-1, 0.4], [1, lit ? 2.5 + 0.2 * Math.sin(t * 6) : 1.6]], prop: 'notebook'
      });
      ctx.restore();
    }
  });
})();
