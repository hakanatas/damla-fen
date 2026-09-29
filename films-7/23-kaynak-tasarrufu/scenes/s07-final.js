// SAHNE 7 — Kaydet, Sıra sende (su tasarrufu proje görevi), 7. sınıf veda + "Sıradaki: 8. sınıf · Mevsimler ve İklim", bitiş kartı (7. sınıf serisinin sonu)
(function () {
  const { PAL, line, stroke, wash, circlePts } = INK;
  const F = F723;
  const ITEMS = [
    'Tatlı su ≈ %3; çoğu buzul ve yer altında. Kolay kullanılan su çok az.',
    'Su ayak izi: üretimden tüketime kullanılan toplam tatlı su',
    'Atık su arıtılır; atık yağ lavaboya dökülmez.',
    'Veri: damlayan musluk günde ≈ 14 L kaybettiriyor.',
    ['Çözüm: tamir et, musluğu kapat, suyu yeniden kullan, paylaş.', PAL.water]
  ];
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      F.notebookPage(ctx, t, E.s('record'), 'Gözlem Defteri · Kaynakların Tasarruflu Kullanımı', ITEMS, { col: PAL.water });
      F.damla(ctx, t, { x: 1660, y: 900, s: 0.95, flip: true, expr: 'neutral', look: [-0.7, 0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
  E.scene({
    name: 'Sıra sende · Veda', concept: 'Proje görevi; 8. sınıfa geçiş', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sk = E.s('task'), sb = E.s('bye'), se = E.s('end');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,106,140,0.14)'); g.addColorStop(1, 'rgba(111,138,58,0.08)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      const hill = P.hillLine(E.W, 860);
      const gr = hill.concat([[E.W + 200, E.H + 200], [-200, E.H + 200]]); P.fillPts(ctx, gr, PAL.paper, 1); wash(ctx, gr, PAL.life, 0.25, 3950, { bleed: 3, blooms: 2 }); stroke(ctx, hill, { w: 4, seed: 3951 });
      // veda: Güneş etrafında eksen eğik Dünya + mevsim simgeleri (sıradaki: Mevsimler ve İklim)
      const nk = E.se(t, sb, sb + 1.2);
      if (nk > 0) E.layer(ctx, nk, c => {
        const cx = 1300, cy = 560;
        stroke(c, circlePts(cx, cy, 330, 110, 80), { w: 2, closed: true, alpha: 0.5, dry: false });
        P.sun(c, cx, cy, 60, t, { nrays: 14, cells: false });
        const a = t * 0.35;
        const ex = cx + Math.cos(a) * 330, ey = cy + Math.sin(a) * 110;
        P.earth(c, ex, ey, 34, { rot: t * 0.2 });
        line(c, [ex - Math.sin(0.41) * 52, ey - Math.cos(0.41) * 52], [ex + Math.sin(0.41) * 52, ey + Math.cos(0.41) * 52], { w: 2, dry: false });
        F.fit(c, '(çizim ölçekli değildir)', cx, cy + 170, 400, 26, { weight: 400, alpha: 0.6 });
      });
      const wave = t > sb;
      F.damla(ctx, t, { x: 520, y: P.hillY(hill, 520) + 6, s: 1.3, expr: 'happy', view: wave ? 'front' : 'q3', look: wave ? [0.6, -0.5] : [0.7, -0.3], arms: wave ? F.wave(t) : [[-1, 1.1], [1, 1.4]], prop: wave ? null : 'notebook' });
      const ck = Math.min(E.se(t, sk, sk + 0.7, 'out'), 1 - E.se(t, sb - 0.3, sb + 0.4));
      F.taskCard(ctx, t, sk, ck, ['Evinde ya da okulunda bir su problemi seç.', 'Model çiz, ölçüm planla, veri topla.', 'Verilere dayalı bir çözüm üret.', 'Çözümünü afiş ya da sunumla paylaş.'], {
        col: PAL.water, maxW: 800, extra: c => {
          const k = E.se(t, sk + 1.5, sk + 2.3);
          c.save(); c.globalAlpha *= k; F.cup(c, 1420, 720, 1.1, 0.4 + 0.1 * Math.sin(t)); F.drop(c, 1420, 400, 30, PAL.water, 0.7); c.restore();
        }
      });
      if (wave) {
        E.inkText(ctx, '7. sınıf gözlemleri tamam!', 1300, 220, t, sb + 0.5, se + 0.4, { size: 48, align: 'center', weight: 400 });
        E.inkText(ctx, 'Sıradaki: 8. sınıf · Mevsimler ve İklim', 1300, 310, t, sb + 1.1, se + 0.4, { size: 64, align: 'center', color: F.AMB });
      }
      F.endCard(ctx, t, '23 · Kaynakların Tasarruflu Kullanımı', 'FB.7.7.2', PAL.water, '7. sınıf serisinin sonu · Sıradaki: 8. sınıf');
    }
  });
})();
