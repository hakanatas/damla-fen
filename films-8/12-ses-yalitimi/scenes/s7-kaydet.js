// SAHNE 7 — Kaydet, Sıra sende (poster/sunum; Selimiye araştırması), sıradaki: periyodik tablo, bitiş kartı
(function () {
  const { PAL, line, stroke, wash } = INK; const F = S8;
  const ITEMS = [
    'Ses maddeye çarpınca kısmen yansır, iletilir, soğurulur.',
    'Sert, düz yüzey çok yansıtır; yumuşak, gözenekli yüzey soğurur.',
    'Akustik: sesi inceleyen bilim dalı (ör. Selimiye Camii).',
    'Ses kirliliği insanlara ve hayvanlara zarar verir.',
    ['Çözüm: kanıta dayalı önlem + saygı ve sorumluluk', F.GREEN]
  ];
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      F.notebookPage(ctx, t, E.s('record'), 'Gözlem Defteri · Ses ve Madde · Ses Kirliliği', ITEMS, { col: F.AMB, gap: 1.25 });
      F.damla(ctx, t, { x: 1660, y: 900, s: 0.95, flip: true, expr: 'neutral', look: [-0.7, 0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
  E.scene({
    name: 'Sıra sende · Sıradaki', concept: 'Görev; sıradaki: periyodik tablo', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sk = E.s('task'), sn = E.s('next');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,106,140,0.10)'); g.addColorStop(1, 'rgba(111,138,58,0.08)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      const hill = P.hillLine(E.W, 870);
      const gr = hill.concat([[E.W + 200, E.H + 200], [-200, E.H + 200]]); P.fillPts(ctx, gr, PAL.paper, 1); wash(ctx, gr, PAL.life, 0.25, 3950, { bleed: 3, blooms: 2 }); stroke(ctx, hill, { w: 4, seed: 3951 });
      const nk = E.se(t, sn, sn + 1.0);
      if (nk > 0) E.layer(ctx, nk, c => {
        // şematik periyodik tablo ızgarası
        const x0 = 880, y0 = 400, s = 50;
        const cols = [PAL.water, PAL.light, PAL.life, '#B5553F'];
        for (let r = 0; r < 7; r++) for (let q = 0; q < 18; q++) {
          if (r === 0 && q > 0 && q < 17) continue; if ((r === 1 || r === 2) && q > 1 && q < 12) continue;
          const k = E.se(t, sn + 0.8 + (r * 18 + q) * 0.012, sn + 1.2 + (r * 18 + q) * 0.012); if (k <= 0) continue;
          const b = F.rr(x0 + q * s, y0 + r * s, s - 6, s - 6, 5, 2);
          const ci = 1; // şematik ızgara: sınıflandırma renkleri bir sonraki filmin konusu
          c.save(); c.globalAlpha *= k; P.fillPts(c, b, cols[ci], 0.4); stroke(c, b, { w: 1.4, closed: true, dry: false }); c.restore();
        }
      });
      const wave = t > sn;
      F.damla(ctx, t, { x: 470, y: P.hillY(hill, 470) + 6, s: 1.3, expr: 'happy', view: wave ? 'front' : 'q3', look: wave ? [0.6, -0.5] : [0.7, -0.3], arms: wave ? F.wave(t) : [[-1, 1.1], [1, 1.4]], prop: wave ? null : 'notebook' });
      const ck = Math.min(E.se(t, sk, sk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
      F.taskCard(ctx, t, sk, ck, ['Çevrende bir ses kirliliği problemi seç.', 'Bir çözüm modeli geliştir, araştırmanı planla.', 'Verilere dayanan çözümünü poster ya da sunumla paylaş.', 'Araştır: Türk-İslam mimarisinde akustik örnekleri'], { col: F.AMB, maxW: 1150, gap: 1.2 });
      if (wave) {
        E.inkText(ctx, 'Sıradaki gözlem:', 1330, 230, t, sn + 0.5, E.s('end') + 0.4, { size: 48, align: 'center', weight: 400 });
        E.inkText(ctx, 'Periyodik Tablonun Haritası', 1330, 320, t, sn + 1.0, E.s('end') + 0.4, { size: 64, align: 'center', color: F.AMB });
      }
      F.endCard(ctx, t, '12 · Sesin Madde ile Etkileşimi ve Ses Kirliliği', 'FB.8.4.5 · FB.8.4.6', F.AMB);
    }
  });
})();
