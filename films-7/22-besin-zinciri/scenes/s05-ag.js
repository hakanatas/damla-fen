// SAHNE 5 — Besin ağı: birbirine bağlanan besin zincirleri (oklar yenilenden yiyene)
(function () {
  const { PAL, line, stroke } = INK;
  const F = F722;
  const N = {
    ot: [420, 790], bugday: [1000, 790],
    cekirge: [420, 540], fare: [1000, 540], serce: [1580, 540],
    kurbaga: [420, 290], yilan: [1000, 290], sahin: [1580, 290]
  };
  const ORDER = ['ot', 'bugday', 'cekirge', 'fare', 'serce', 'kurbaga', 'yilan', 'sahin'];
  const EDGES = [['ot', 'cekirge'], ['ot', 'fare'], ['bugday', 'fare'], ['bugday', 'serce'], ['cekirge', 'kurbaga'], ['kurbaga', 'yilan'], ['fare', 'yilan'], ['fare', 'sahin'], ['serce', 'sahin'], ['yilan', 'sahin']];
  const W = 210, H = 170;
  const edgePt = (a, b) => { // kart kenarında kesişim
    const dx = b[0] - a[0], dy = b[1] - a[1]; const sx = (W / 2 + 10) / Math.abs(dx || 1e-6), sy = (H / 2 + 10) / Math.abs(dy || 1e-6); const s = Math.min(sx, sy);
    return [a[0] + dx * s, a[1] + dy * s];
  };
  E.scene({
    name: 'Besin ağı', concept: 'Zincirlerin bağlantısı', from: 'web', to: 'web', trFrom: [960, 540],
    draw(ctx, t) {
      const sw = E.s('web');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(227,160,58,0.10)'); g.addColorStop(1, 'rgba(111,138,58,0.10)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      ORDER.forEach((key, i) => {
        const k = E.se(t, sw + 0.3 + i * 0.25, sw + 0.8 + i * 0.25, 'out'); if (k <= 0) return;
        const [x, y] = N[key], [name, draw] = F.ORG[key];
        E.layer(ctx, k, c => F.orgCard(c, x - W / 2, y - H / 2, W, H, name, (cc, cx, cy) => draw(cc, cx, cy, t), 2800 + i, { size: 30, tint: (key === 'ot' || key === 'bugday') ? PAL.life : null }));
      });
      // vurgulanan zincir: ot → çekirge → kurbağa → yılan → şahin
      const HL = ['ot>cekirge', 'cekirge>kurbaga', 'kurbaga>yilan', 'yilan>sahin'];
      const hk = E.se(t, sw + 6.2, sw + 7.2);
      EDGES.forEach(([a, b], i) => {
        const k = E.se(t, sw + 2.4 + i * 0.3, sw + 2.9 + i * 0.3); if (k <= 0) return;
        const p = edgePt(N[a], N[b]), q = edgePt(N[b], N[a]);
        const hl = HL.includes(a + '>' + b);
        ctx.save(); ctx.globalAlpha *= hl ? 1 : 1 - hk * 0.55;
        P.arrow(ctx, p, q, k, { w: hl ? 3 + 2 * hk : 3, color: hl && hk > 0 ? F.GREEN : F.AMB, bend: 0, head: 14 });
        ctx.restore();
      });
      if (hk > 0) { ctx.save(); ctx.globalAlpha *= hk; F.fit(ctx, 'ağın içinde bir zincir', 1580, 800, 400, 38, { color: F.GREEN }); ctx.restore(); }
    }
  });
})();
