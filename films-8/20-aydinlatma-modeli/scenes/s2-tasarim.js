// SAHNE 2 — Tasarım süreci (döngü), ihtiyaç ve ölçütler · SAHNE 3 — Güvenlik
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const U = U6;
  const STEPS = ['İhtiyaç', 'Araştır', 'Model öner', 'Dene', 'Yenile', 'Sun'];
  const CX = 500, CY = 560, RR = 255;
  const pos = i => { const a = -Math.PI / 2 + i / 6 * Math.PI * 2; return [CX + Math.cos(a) * RR, CY + Math.sin(a) * RR]; };
  window.F20M.CRIT = ['Yeterince parlak olsun.', 'Bir ampul bozulsa da ışık sönmesin.', 'Işık kitabın üzerine düşsün.'];
  E.scene({
    name: 'Tasarım süreci', concept: 'Mühendislik tasarım döngüsü; ihtiyaç ve ölçütler', from: 'cycle', to: 'criteria', trFrom: [500, 560],
    draw(ctx, t) {
      const sc = E.s('cycle'), sn = E.s('need'), sr = E.s('criteria');
      STEPS.forEach((s, i) => {
        const at = sc + 0.8 + i * 1.1, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
        const [x, y] = pos(i), r = 86 * P.pop(k);
        const active = (t > sn && i === 0);
        const cp = INK.wobble(circlePts(x, y, r, r, 44), 2, 2100 + i);
        P.fillPts(ctx, cp, active ? '#F6E7B8' : i === 4 ? '#DCE8EE' : '#FBF8F1'); stroke(ctx, cp, { w: active ? 4.4 : 3.2, closed: true, seed: 2110 + i });
        const [a, b] = s.split(' ');
        U.txt(ctx, a, x, y + (b ? -4 : 12), { size: 34, align: 'center' }); if (b) U.txt(ctx, b, x, y + 34, { size: 34, align: 'center' });
        // ok: bir sonraki adıma
        const ak = E.se(t, at + 0.4, at + 0.9); if (ak > 0) { const a0 = -Math.PI / 2 + (i + 0.33) / 6 * 6.283, a1 = -Math.PI / 2 + (i + 0.67) / 6 * 6.283; P.drawOn(ctx, P.arc(CX, CY, RR, a0, a1, 12), ak, { w: 3, color: CK.AMBD }); if (ak > 0.95) INK.arrowHead(ctx, [CX + Math.cos(a1 - 0.05) * RR, CY + Math.sin(a1 - 0.05) * RR], [CX + Math.cos(a1) * RR, CY + Math.sin(a1) * RR], 14, { w: 3, color: CK.AMBD }); }
      });
      // yenile → model öner geri dönüş
      const bk = E.se(t, sc + 7.8, sc + 8.8);
      if (bk > 0) { const p4 = pos(4), p2 = pos(2); P.arrow(ctx, [p4[0] + 50, p4[1] + 40], [p2[0] - 70, p2[1] + 20], bk, { w: 2.6, bend: -40, color: PAL.water, head: 12 }); }
      // ihtiyaç kartı
      const nk = E.se(t, sn + 0.2, sn + 0.9);
      if (nk > 0) E.layer(ctx, nk, c => {
        CK.card(c, 900, 200, 900, 680, { seed: 2120 });
        U.txt(c, 'İhtiyaç', 960, 270, { size: 44, color: U.AMBER });
        P.write(c, 'Çadırda kitap okumak için pille', 960, 340, E.seg(t, sn + 0.6, sn + 2), { size: 42 });
        P.write(c, 'çalışan, taşınabilir okuma lambası', 960, 395, E.seg(t, sn + 1.8, sn + 3.2), { size: 42 });
        // çadır + kitap
        const tent = [[1520, 520], [1640, 400], [1760, 520]]; P.fillPts(c, tent.concat([[1520, 520]]), PAL.life, 0.35); stroke(c, tent.concat([[1520, 520]]), { w: 3, closed: true, seed: 2121 }); line(c, [1640, 400], [1640, 520], { w: 2, dry: false });
        window.F20M.book(c, 1320, 480, 0.8);
        if (t > sr) {
          U.txt(c, 'Ölçütlerim', 960, 610, { size: 44, color: U.AMBER });
          window.F20M.CRIT.forEach((s, i) => { const at = sr + 1 + i * 1.8; P.write(c, (i + 1) + '. ' + s, 980, 680 + i * 62, E.seg(t, at, at + 1.3), { size: 40, weight: 400 }); });
        }
      });
    }
  });
  const SCI = { icon: (c) => { line(c, [-40, -30], [30, 25], { w: 5, color: '#8C877E' }); line(c, [-40, 30], [30, -25], { w: 5, color: '#8C877E' }); [[-50, -38], [-50, 38]].forEach(([x, y]) => INK.stroke(c, circlePts(x, y, 14, 14, 20), { w: 4, closed: true, dry: false })); }, mark: 'ok', a: 'Makas ve yapıştırıcıyı', b: 'bir yetişkin eşliğinde kullan.' };
  const HOT = Object.assign({}, U6.SAFE.hot, { b: 'Kâğıdı, kumaşı ampule değdirme.' });
  E.scene({
    name: 'Güvenlik', concept: 'Elektrik ve atölye güvenliği', from: 'safety', to: 'safety', trFrom: [1300, 500],
    draw(ctx, t) {
      const s0 = E.s('safety');
      CK.safetyCard(ctx, t, s0 + 0.5, 700, 130, { w: 1000, h: 770, gap: 165, items: [U.SAFE.outlet, U.SAFE.short, HOT, SCI].map((it, i) => Object.assign({}, it, { at: i * 1.8 })) });
      U.damla(ctx, t, { x: 360, y: 900, s: 1.35, view: 'q3', expr: 'determined', look: [0.8, -0.2], arms: [[-1, 0.35], [1, [60, -170]]] });
    }
  });
})();
