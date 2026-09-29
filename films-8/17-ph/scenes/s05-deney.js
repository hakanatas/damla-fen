// SAHNE 5 — Deney: tehlikesiz asit (sirke) ile mermer, yumurta kabuğu, demir çivi; kontrol: su (FB.8.5.8 a tasarlar, b ölçme ve veri analizi)
(function () {
  const { PAL, line, circlePts, rng } = INK;
  const U = U5;
  const BY = 840, S = 0.9;
  const GROUPS = [{ x: 360, name: 'mermer', kind: 'marble' }, { x: 860, name: 'yumurta kabuğu', kind: 'shell' }, { x: 1360, name: 'demir çivi', kind: 'nail' }];
  const VIN = '#EFE3C4', WAT = '#D3E5EE';
  function solid(kind, etch, t) {
    return (ctx, cx, by, s0) => { const s = s0 * 1.35;
      if (kind === 'marble') {
        const sc = 1 - 0.12 * etch; const p = INK.wobble([[-34, 0], [-40, -30], [-10, -46], [30, -40], [40, -8], [30, 0]].map(([a, b]) => [cx + a * s * sc, by + b * s * sc]), 2, 6400);
        P.fillPts(ctx, p, '#E4DFD5'); INK.wash(ctx, p, '#8C9198', 0.35, 6401, { bleed: 1, blooms: 0 }); INK.stroke(ctx, p, { w: 2.6, closed: true, dry: false }); line(ctx, [cx - 20 * s, by - 30 * s], [cx + 16 * s, by - 16 * s], { w: 1.2, color: '#8C9198', dry: false });
      } else if (kind === 'shell') {
        const p = P.arc(cx, by - 4, 44 * s, Math.PI * 1.05, Math.PI * 1.95, 20, 34 * s);
        ctx.save(); ctx.globalAlpha *= 1 - 0.5 * etch; INK.stroke(ctx, p, { w: 9 * s, color: '#D9BE8E', dry: false }); INK.stroke(ctx, p, { w: 2, dry: false }); ctx.restore();
      } else {
        ctx.save(); ctx.translate(cx, by - 12 * s); ctx.rotate(-0.25); const b = U.rect(-50 * s, -4 * s, 50 * s, 4 * s); P.fillPts(ctx, b, U.mix('#A7ADB4', '#6E6A66', etch)); INK.stroke(ctx, b, { w: 1.6, closed: true, dry: false });
        line(ctx, [-50 * s, -12 * s], [-50 * s, 12 * s], { w: 4, dry: false });
        if (etch > 0) { const r = rng(6410); for (let i = 0; i < 14; i++) { ctx.save(); ctx.globalAlpha *= etch * 0.8; ctx.fillStyle = '#4A4750'; ctx.beginPath(); ctx.arc(-44 * s + r() * 90 * s, (r() - 0.5) * 6 * s, 1.6, 0, 7); ctx.fill(); ctx.restore(); } }
        ctx.restore();
      }
    };
  }
  E.scene({
    name: 'Deney', concept: 'Asitlerin mermer, kabuk ve metale etkisi', from: 'safety', to: 'nail', trFrom: [960, 540],
    draw(ctx, t) {
      const sf = E.s('safety'), sd = E.s('design'), sv = E.s('vars'), so = E.s('observe'), sw = E.s('weigh'), sn = E.s('nail');
      U.bench(ctx, -40, 1960, BY, 2301);
      U.safety(ctx, 330, 180, 1100, ['Yalnızca tehlikesiz maddeler: sirke, su.', 'Gözlük ve eldiven tak; tadına, kokusuna bakma.', 'Öğretmeninin eşliğinde çalış; sonra masanı temizle.'], t, sf + 0.3, { step: 1.5, lh: 80, size: 40, t1: sd + 0.3 });
      const etchM = E.se(t, sw, sw + 2.0), etchN = E.se(t, sn + 0.2, sn + 2.0);
      GROUPS.forEach((G, gi) => {
        const gk = E.se(t, sd + 0.3 + gi * 1.6, sd + 1.0 + gi * 1.6, 'out'); if (gk <= 0) return;
        E.layer(ctx, gk, c => {
          U.txt(c, G.name, G.x, 640, { size: 38, align: 'center' });
          [[-95, VIN, 'sirke'], [95, WAT, 'su']].forEach(([dx, col, nm], j) => {
            const etch = j === 0 ? (G.kind === 'nail' ? etchN : etchM) : 0;
            const bub = j === 0 && G.kind !== 'nail' ? E.se(t, so + 0.3, so + 1.2) * (1 - 0.6 * E.se(t, sw, sw + 1)) : (j === 0 && G.kind === 'nail' ? 0.25 * E.se(t, sn, sn + 1) : 0);
            U.beaker(c, G.x + dx, BY, S, { liq: col, lvl: 0.6, name: nm, nameSize: 32, seed: 6420 + gi * 6 + j * 3, bub, t, liqA: 0.3, washA: 0.3, solid: solid(G.kind, etch, t) });
          });
        });
      });
      // değişkenler kartı
      const vk = Math.min(E.se(t, sv + 0.3, sv + 0.9), 1 - E.se(t, so + 0.2, so + 0.8));
      if (vk > 0) E.layer(ctx, vk, c => {
        U.card(c, 200, 190, 1320, 330, { seed: 6440 });
        P.write(c, 'değiştirilen: sıvının türü (sirke / su)', 240, 270, E.seg(t, sv + 0.6, sv + 1.8), { size: 42, color: U.AMBER });
        P.write(c, 'ölçülen: kabarcık, görünüm, kütle', 240, 350, E.seg(t, sv + 1.8, sv + 3.0), { size: 42, color: PAL.water });
        P.write(c, 'sabit: parça boyutu, sıvı miktarı, süre', 240, 430, E.seg(t, sv + 3.0, sv + 4.2), { size: 42 });
        U.txt(c, 'su = kontrol', 1480, 480, { size: 34, align: 'right', alpha: 0.7 });
      });
      // gözlem etiketi
      const ok = Math.min(E.se(t, so + 1.2, so + 1.8), 1 - E.se(t, sw - 0.2, sw + 0.3));
      if (ok > 0) E.layer(ctx, ok, c => { P.write(c, 'kabarcık (gaz çıkışı)!', 610, 450, 1, { size: 44, align: 'center', color: PAL.water }); P.arrow(c, [460, 470], [300, 600], 1, { w: 3, head: 12, color: PAL.water }); P.arrow(c, [760, 470], [780, 600], 1, { w: 3, head: 12, color: PAL.water }); U.txt(c, 'sudakilerde: değişim yok', 1250, 490, { size: 38, align: 'center', alpha: 0.75 }); });
      // veri tablosu
      const tk = E.se(t, sw + 0.3, sw + 0.9, 'out');
      if (tk > 0) E.layer(ctx, tk, c => {
        U.card(c, 200, 180, 1320, 380, { seed: 6450 });
        U.txt(c, 'Veri tablosu · 3 gün sonra', 240, 240, { size: 42, color: U.AMBER });
        U.txt(c, 'örnek veri', 1480, 240, { size: 30, align: 'right', alpha: 0.6 });
        const rows = [['mermer + sirke', '10,0 g → 9,2 g', sw + 1.2, U.HEAT], ['mermer + su', '10,0 g → 10,0 g', sw + 3.4, PAL.water], ['çivi + sirke', 'yüzey aşındı, matlaştı', sn + 0.8, U.HEAT]];
        rows.forEach(([a, b, at, col], i) => {
          const y = 320 + i * 72; line(c, [240, y + 22], [1480, y + 20], { w: 1.4, dry: false, alpha: 0.4 });
          P.write(c, a, 250, y, E.seg(t, at, at + 0.8), { size: 40 });
          P.write(c, b, 1470, y, E.seg(t, at + 0.6, at + 1.4), { size: 40, align: 'right', color: col });
        });
        const hk = E.se(t, sn + 3.2, sn + 3.8, 'back');
        U.stamp(c, 860, 512, 'hipotez desteklendi ✓', PAL.life, hk, { size: 38 });
      });
      U.damla(ctx, t, { x: 1760, y: BY, s: 0.9, flip: true, expr: t > so && t < sw ? 'surprised' : (t > sn ? 'happy' : 'curious'), look: [-0.9, 0.2], arms: [[-1, 1.3], [1, 0.4]], prop: t > sw ? 'notebook' : undefined });
    }
  });
})();
