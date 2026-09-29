// SAHNE 2 — Atık yönetimi ve Sıfır Atık hiyerarşisi (TYMM: ilk aşama önleme; geri kazanım, yeniden kullanım, geri dönüşüm farkları; uzaklaştırma)
(function () {
  const { PAL, line, stroke, circlePts, wash, rng } = INK;
  const RED = W7.RED;
  const LAY = [
    { name: 'önleme', col: '#3F7A3A' }, { name: 'azaltma', col: '#5E8F45' }, { name: 'yeniden kullanım', col: '#7FA052' },
    { name: 'geri dönüşüm', col: '#A3AE5E' }, { name: 'geri kazanım', col: '#C2A86A' }, { name: 'uzaklaştırma', col: '#9A9387' }
  ];
  const CX = 640, Y0 = 250, LH = 100, W0 = 960, DW = 110;
  const layerPts = i => { const y = Y0 + i * LH, w1 = W0 - i * DW, w2 = W0 - (i + 1) * DW; return [[CX - w1 / 2, y + 4], [CX + w1 / 2, y + 4], [CX + w2 / 2, y + LH - 4], [CX - w2 / 2, y + LH - 4], [CX - w1 / 2, y + 4]]; };
  // örnek çizimler
  function matara(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = W7.rr(-26, -50, 52, 110, 14); P.fillPts(ctx, b, PAL.white); wash(ctx, b, '#6D86B0', 0.7, 960); stroke(ctx, b, { w: 2.8, closed: true, seed: 961 });
    const c = W7.rr(-16, -70, 32, 22, 4); P.fillPts(ctx, c, '#8E8E8E', 0.9); stroke(ctx, c, { w: 2.4, closed: true, dry: false });
    stroke(ctx, P.arc(20, -64, 12, -1.6, 1.4, 12), { w: 3, dry: false });
    line(ctx, [-16, -36], [-16, 44], { w: 3, color: PAL.white, dry: false, alpha: 0.8 });
    ctx.restore();
  }
  function bezTorba(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    stroke(ctx, P.arc(-22, -40, 20, Math.PI, 2 * Math.PI, 12), { w: 4 }); stroke(ctx, P.arc(22, -40, 20, Math.PI, 2 * Math.PI, 12), { w: 4 });
    const b = [[-60, -40], [60, -40], [70, 60], [-70, 60], [-60, -40]]; P.fillPts(ctx, b, '#F2EAD6'); wash(ctx, b, '#C9B48A', 0.4, 962); stroke(ctx, b, { w: 3, closed: true, seed: 963 });
    W7.leaf(ctx, 0, 10, 20, '#9CBF5A');
    ctx.restore();
  }
  function poset(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-50, -30], [-40, -60], [-24, -30], [24, -30], [40, -60], [50, -30], [58, 60], [-58, 60], [-50, -30]];
    P.fillPts(ctx, b, '#EEF0F1', 0.9); wash(ctx, b, '#A8B4BC', 0.3, 964); stroke(ctx, b, { w: 2.4, closed: true, seed: 965 });
    [[-20, -10, 10, 40], [18, -14, 26, 44]].forEach(([a, b1, c, d], i) => line(ctx, [a, b1], [c, d], { w: 1.2, alpha: 0.5, dry: false, seed: 966 + i }));
    ctx.restore();
  }
  function filledJar(ctx, x, y, s) {
    W7.item(ctx, 'kavanoz', x, y, s);
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const R = rng(970); const f = [[-32, 0], [32, 0], [32, 48], [-32, 48]];
    P.fillPts(ctx, f.concat([f[0]]), '#C8962E', 0.55);
    for (let i = 0; i < 40; i++) { ctx.fillStyle = '#8A5A12'; ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.ellipse(-28 + R() * 56, 4 + R() * 42, 4, 3, R() * 3, 0, 7); ctx.fill(); }
    ctx.restore();
  }
  function landfill(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const m = P.arc(0, 0, 180, Math.PI, 2 * Math.PI, 30, 90).concat([[-180, 0]]);
    P.fillPts(ctx, m, '#C9BFA8'); wash(ctx, m, '#6B6358', 0.45, 975); stroke(ctx, m, { w: 3, closed: true, seed: 976 });
    const R = rng(977); for (let i = 0; i < 26; i++) { const a = Math.PI + 0.2 + R() * (Math.PI - 0.4), d = 0.3 + R() * 0.6; ctx.save(); ctx.globalAlpha = 0.7; ctx.fillStyle = ['#8E8E8E', '#2E2D33', '#C9B48A'][i % 3]; ctx.fillRect(Math.cos(a) * 180 * d - 5, Math.sin(a) * 90 * d - 3, 10, 6); ctx.restore(); }
    for (let i = -5; i <= 5; i++) line(ctx, [i * 40, 20], [i * 40, -6], { w: 2, dry: false }); line(ctx, [-210, 4], [210, 4], { w: 2, dry: false }); line(ctx, [-210, 14], [210, 14], { w: 2, dry: false });
    ctx.restore();
  }
  function bolt(ctx, x, y, s) { const b = [[0, -40], [-18, 4], [0, 4], [-8, 40], [20, -8], [2, -8], [10, -40], [0, -40]].map(p => [x + p[0] * s, y + p[1] * s]); P.fillPts(ctx, b, PAL.light, 0.95); stroke(ctx, b, { w: 2.2, closed: true, dry: false }); }

  const PX = 1470, PY = 520;
  const PANELS = [
    { layer: [0], beat: 'prevent', off: 0.4, until: 4.6, cap: 'gereksiz ürün alma', draw: (c, t, a) => {
      matara(c, PX - 120, PY, 1.2); W7.item(c, 'plastikSise', PX + 130, PY, 1.1);
      P.check(c, PX - 120, PY + 120, 50, E.se(t, a + 1.0, a + 1.5), { w: 7, color: '#3F7A3A' }); P.cross(c, PX + 130, PY, 70, E.se(t, a + 1.4, a + 2.0), { w: 9, color: RED });
      INK.label(c, 'matara', PX - 120, PY + 190, { size: 36, align: 'center' });
    } },
    { layer: [1], beat: 'prevent', off: 4.8, until: 99, cap: 'az ambalaj seç', draw: (c, t, a) => {
      bezTorba(c, PX - 120, PY, 1.3); poset(c, PX + 130, PY, 1.2);
      P.check(c, PX - 120, PY + 120, 50, E.se(t, a + 1.0, a + 1.5), { w: 7, color: '#3F7A3A' }); P.cross(c, PX + 130, PY, 70, E.se(t, a + 1.4, a + 2.0), { w: 9, color: RED });
      INK.label(c, 'bez torba', PX - 120, PY + 190, { size: 36, align: 'center' });
    } },
    { layer: [2], beat: 'reuse', off: 0.4, until: 99, cap: 'yıkayıp yeniden doldur', draw: (c, t, a) => {
      W7.item(c, 'kavanoz', PX - 170, PY, 1.3);
      P.arrow(c, [PX - 100, PY], [PX + 60, PY], E.se(t, a + 0.8, a + 1.4), { w: 3, head: 14 });
      for (let i = 0; i < 3; i++) { const d = P.bez([PX - 20 + i * 30, PY - 70], [PX - 30 + i * 30, PY - 44], [PX - 20 + i * 30, PY - 38], 8).concat(P.bez([PX - 20 + i * 30, PY - 38], [PX - 10 + i * 30, PY - 44], [PX - 20 + i * 30, PY - 70], 8)); c.save(); c.globalAlpha *= E.se(t, a + 1.0, a + 1.5); P.fillPts(c, d, PAL.water, 0.6); c.restore(); }
      if (t > a + 1.6) filledJar(c, PX + 150, PY, 1.3 * P.pop(E.se(t, a + 1.6, a + 2.2, 'out')));
    } },
    { layer: [3], beat: 'recycle', off: 0.4, until: 99, cap: 'eski şişe → yeni şişe', draw: (c, t, a) => {
      W7.item(c, 'camSise', PX - 210, PY + 10, 0.9, -0.2); W7.item(c, 'camSise', PX - 140, PY + 20, 0.9, 0.3);
      W7.recycle(c, PX, PY, 50, E.se(t, a + 0.8, a + 1.8), { w: 9 });
      if (t > a + 1.8) W7.item(c, 'camSise', PX + 170, PY, 1.3 * P.pop(E.se(t, a + 1.8, a + 2.4, 'out')));
    } },
    { layer: [4], beat: 'recover', off: 0.4, until: 99, cap: 'kompost · enerji', draw: (c, t, a) => {
      W7.item(c, 'muz', PX - 220, PY - 70, 0.8); W7.item(c, 'elma', PX - 120, PY - 70, 0.8);
      P.arrow(c, [PX - 60, PY - 70], [PX + 20, PY - 70], E.se(t, a + 0.8, a + 1.3), { w: 3, head: 12 });
      const mk = E.se(t, a + 1.2, a + 1.8, 'out'); if (mk > 0) { const m = P.arc(PX + 130, PY - 40, 90 * mk, Math.PI, 2 * Math.PI, 24, 56 * mk).concat([[PX + 130 - 90 * mk, PY - 40]]); P.fillPts(c, m, '#8A5A34', 0.85); stroke(c, m, { w: 2.6, closed: true }); }
      const fk = E.se(t, a + 2.6, a + 3.2, 'out'); if (fk > 0) { W7.factory(c, PX - 60, PY + 160, 0.7 * P.pop(fk), t); bolt(c, PX + 110, PY + 90, 1.1 * P.pop(fk)); }
    } },
    { layer: [5], beat: 'dispose', off: 0.4, until: 99, cap: 'düzenli depolama alanı', draw: (c, t, a) => {
      landfill(c, PX, PY + 80, 1.1 * P.pop(E.se(t, a, a + 0.6, 'out')));
      P.write(c, '(son çare)', PX, PY - 80, E.seg(t, a + 1.6, a + 2.4), { size: 40, align: 'center', color: '#8A4A10' });
    } }
  ];

  E.scene({
    name: 'Hiyerarşi', concept: 'Atık yönetimi ve Sıfır Atık hiyerarşisi', from: 'manage', to: 'dispose', trFrom: [960, 540],
    draw(ctx, t) {
      const sm = E.s('manage'), sp = E.s('pyramid');
      ctx.save(); ctx.globalAlpha = 0.1; ctx.fillStyle = PAL.life; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
      // atık yönetimi tanım şeridi
      const defA = 1 - E.se(t, sp - 0.2, sp + 0.6);
      if (defA > 0) E.layer(ctx, defA, c => {
        P.write(c, 'Atık yönetimi', 960, 250, E.seg(t, sm + 0.4, sm + 1.4), { size: 72, align: 'center', color: '#3F7A3A' });
        const steps = [['atık oluşmadan önce', c2 => bezTorba(c2, 330, 540, 0.9)], ['kullanım', c2 => W7.item(c2, 'yogurt', 740, 540, 1.1)], ['ayrıştırma', c2 => W7.bin(c2, 'sari', 1140, 610, 0.5)], ['uzaklaştırma', c2 => landfill(c2, 1580, 590, 0.55)]];
        steps.forEach(([lab, dr], i) => {
          const k = E.se(t, sm + 1.2 + i * 1.2, sm + 1.8 + i * 1.2, 'out'); if (k <= 0) return;
          c.save(); c.globalAlpha *= k; dr(c); c.restore();
          P.write(c, lab, [330, 740, 1140, 1580][i], 700, E.seg(t, sm + 1.4 + i * 1.2, sm + 2.4 + i * 1.2), { size: 40, align: 'center' });
          if (i > 0) P.arrow(c, [[330, 740, 1140][i - 1] + 120, 540], [[740, 1140, 1580][i - 1] - 120, 540], E.se(t, sm + 1.0 + i * 1.2, sm + 1.5 + i * 1.2), { w: 3, head: 13 });
        });
      });
      if (t < sp - 0.2) { DAMLA.draw(ctx, { x: 1800, y: 1075, s: 0.85, view: 'q3', flip: true, expr: 'curious', look: [-0.8, -0.4], blink: E.blink(t, 5), squash: E.breath(t), t, talk: E.talk(t), seed: 2, arms: [[-1, 0.4], [1, 2.3]] }); return; }
      // piramit (ters üçgen)
      P.write(ctx, 'Sıfır Atık hiyerarşisi', 1180, 170, E.seg(t, sp + 0.3, sp + 1.5), { size: 60, align: 'center' });
      let cur = -1; const beats = ['prevent', 'prevent', 'reuse', 'recycle', 'recover', 'dispose'];
      PANELS.forEach((p, i) => { if (t > E.s(p.beat) + p.off - 0.4) cur = i; });
      LAY.forEach((L, i) => {
        const k = E.se(t, sp + 1.0 + i * 0.6, sp + 1.6 + i * 0.6, 'out'); if (k <= 0) return;
        const pts = layerPts(i).map(([x, y]) => [x, y - (1 - k) * 60]);
        const on = cur === i;
        ctx.save(); ctx.globalAlpha *= k;
        P.fillPts(ctx, pts, PAL.white, 0.95); wash(ctx, pts, L.col, on ? 0.85 : 0.5, 980 + i, { bleed: 1.2 });
        stroke(ctx, pts, { w: on ? 5 : 2.6, closed: true, seed: 985 + i, color: on ? '#1C1B22' : PAL.ink });
        W7.fit(ctx, L.name, CX, Y0 + i * LH + LH / 2 + 14, W0 - (i + 1) * DW - 20, on ? 46 : 40);
        ctx.restore();
      });
      // yan ok
      const ak = E.se(t, sp + 4.6, sp + 5.6);
      if (ak > 0) {
        P.drawOn(ctx, [[110, 270], [110, 830]], ak, { w: 4 }); if (ak > 0.98) INK.arrowHead(ctx, [110, 800], [110, 834], 16, { w: 4 });
        INK.label(ctx, 'en iyi', 110, 250, { size: 34, weight: 700, align: 'center', color: '#3F7A3A', alpha: ak });
        INK.label(ctx, 'son çare', 110, 880, { size: 34, weight: 700, align: 'center', alpha: ak });
      }
      // örnek paneli
      PANELS.forEach((p, i) => {
        const a = E.s(p.beat) + p.off;
        const nxt = PANELS[i + 1]; const end = nxt ? E.s(nxt.beat) + nxt.off - 0.3 : 1e9;
        const k = Math.min(E.se(t, a - 0.3, a + 0.3), 1 - E.se(t, end - 0.3, end + 0.1));
        if (k <= 0) return;
        E.layer(ctx, k, c => {
          const fr = [[1130, 290], [1810, 282], [1816, 830], [1136, 836], [1130, 290]];
          P.fillPts(c, fr, '#FAF6EC', 0.95); stroke(c, fr, { w: 2.6, closed: true, seed: 990 + i, color: LAY[i].col });
          W7.fit(c, LAY[i].name, PX, 350, 600, 50, { color: '#3F7A3A' });
          p.draw(c, t, a);
          P.write(c, p.cap, PX, 800, E.seg(t, a + 0.6, a + 1.8), { size: 42, align: 'center' });
          // piramit katmanına bağlantı
          const y = Y0 + i * LH + LH / 2, xr = CX + (W0 - (i + 0.5) * DW) / 2;
          c.save(); c.globalAlpha *= 0.6; INK.dashed(c, P.bez([xr + 10, y], [1060, y], [1126, 560], 30), { w: 2, on: 8, off: 7 }); c.restore();
        });
      });
      DAMLA.draw(ctx, { x: 1840, y: 1080, s: 0.8, view: 'q3', flip: true, expr: 'curious', look: [-0.8, -0.4], blink: E.blink(t, 5), squash: E.breath(t), t, talk: E.talk(t), seed: 2, arms: [[-1, 0.4], [1, 2.3]] });
    }
  });
})();
