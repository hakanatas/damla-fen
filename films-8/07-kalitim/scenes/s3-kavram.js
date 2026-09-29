// SAHNE 3 — FB.8.3.4: gen, alel, baskın, çekinik, genotip, fenotip, saf döl, melez döl · kavram haritası
(function () {
  const { PAL, stroke, line, circlePts, wash } = INK; const K = KIT, F = G8;
  const COLS = [{ g: 'SS', x: 900 }, { g: 'Ss', x: 1200 }, { g: 'ss', x: 1500 }];
  function geneLetters(c, g, x, y, t, hiDom) {
    c.save(); c.font = '700 84px Kalam'; c.textAlign = 'center'; c.fillStyle = PAL.ink;
    const w = 56;
    [...g].forEach((ch, i) => { const up = ch === ch.toUpperCase(); c.globalAlpha = (hiDom && !up && g !== 'ss') ? 0.35 : 1; c.fillStyle = up ? K.LIFE_D : '#8A4A10'; c.fillText(ch, x + (i - 0.5) * w, y); });
    c.restore();
  }
  function node(c, txt, x, y, k, o = {}) { if (k <= 0) return; c.save(); c.globalAlpha *= E.clamp(k); K.node(c, txt, x, y, 1, Object.assign({ size: 40, nopop: true, seed: txt.length }, o)); c.restore(); }
  function link(c, a, b, k, lab, o = {}) { if (k <= 0) return; c.save(); c.globalAlpha *= k; P.arrow(c, a, b, 1, { w: 2.4, head: 12 }); if (lab) K.text(c, lab, (a[0] + b[0]) / 2 + (o.dx ?? 14), (a[1] + b[1]) / 2 + (o.dy ?? 10), { size: 28, align: o.align ?? 'left', color: K.LIFE_D }); c.restore(); }
  E.scene({
    name: 'Kalıtım kavramları', concept: 'Alel, baskın, çekinik, genotip, fenotip, saf, melez', from: 'allele', to: 'map', trFrom: [400, 500],
    draw(ctx, t) {
      const sa = E.s('allele'), sd = E.s('dom'), sr = E.s('rec'), sg = E.s('geno'), sp = E.s('pure'), sm = E.s('map');
      ctx.fillStyle = 'rgba(111,138,58,0.07)'; ctx.fillRect(0, 0, E.W, E.H);
      const partA = 1 - E.se(t, sm - 0.2, sm + 0.6);
      if (partA > 0) E.layer(ctx, partA, c => {
        // kromozom çifti ve alel
        const ck = E.se(t, sa + 0.2, sa + 1.0, 'out');
        if (ck > 0) { c.save(); c.globalAlpha *= ck;
          F.chromo(c, 300, 500, 380, F.CH2, { w: 58 }); F.chromo(c, 470, 500, 380, F.CH1, { w: 58 });
          K.text(c, 'anneden', 300, 270, { size: 34, align: 'center' }); K.text(c, 'babadan', 470, 270, { size: 34, align: 'center' });
          const bk = E.se(t, sa + 3.5, sa + 4.3);
          if (bk > 0) { [[300, 'S'], [470, 's']].forEach(([x, g]) => { const r = [[x - 34, 410], [x + 34, 410], [x + 34, 450], [x - 34, 450], [x - 34, 410]]; P.fillPts(c, r, '#FBF8F1', bk); wash(c, r, g === 'S' ? F.YEL : F.GRN, 0.8 * bk, 3400 + x, { bleed: 0.4, blooms: 0 }); stroke(c, r, { w: 2, closed: true, dry: false, alpha: bk }); c.save(); c.globalAlpha *= bk; K.text(c, g, x, 444, { size: 34, align: 'center' }); c.restore(); });
            c.save(); c.globalAlpha *= E.se(t, sa + 5, sa + 5.8); P.drawOn(c, P.bez([250, 470], [385, 500], [520, 470], 20), 1, { w: 2.6, color: K.LIFE_D }); K.text(c, 'alel genler', 385, 750, { size: 40, align: 'center', color: K.LIFE_D }); K.text(c, '(aynı karakter, farklı hâl)', 385, 792, { size: 28, align: 'center', alpha: 0.7 }); c.restore(); }
          c.restore(); }
        // üç sütun: SS, Ss, ss
        const dk = E.se(t, sd + 0.2, sd + 1.0);
        if (dk > 0) { c.save(); c.globalAlpha *= dk;
          COLS.forEach((col, i) => {
            const k = i < 2 ? E.se(t, sd + 0.6 + i * 1.2, sd + 1.2 + i * 1.2) : E.se(t, sr + 0.6, sr + 1.3);
            if (k <= 0) return; c.save(); c.globalAlpha *= k;
            geneLetters(c, col.g, col.x, 400, t, t > sd + 3 && t < sr + 3);
            F.pea(c, col.x, 560, 60, col.g === 'ss' ? 'G' : 'Y', { seed: 40 + i });
            c.restore();
          });
          const dt = E.se(t, sd + 3, sd + 3.8) * (1 - E.se(t, sg, sg + 0.5));
          if (dt > 0) { c.save(); c.globalAlpha *= dt; K.text(c, 'S: sarı (baskın)', 1050, 740, { size: 40, align: 'center', color: K.LIFE_D }); c.restore(); }
          const rt = E.se(t, sr + 2, sr + 2.8) * (1 - E.se(t, sg, sg + 0.5));
          if (rt > 0) { c.save(); c.globalAlpha *= rt; K.text(c, 's: yeşil (çekinik)', 1500, 740, { size: 40, align: 'center', color: '#8A4A10' }); c.restore(); }
          c.restore(); }
        // genotip / fenotip satır etiketleri
        const gk = E.se(t, sg + 0.3, sg + 1.0), fk = E.se(t, sg + 4.0, sg + 4.8);
        if (gk > 0) { c.save(); c.globalAlpha *= gk; K.text(c, 'genotip', 740, 390, { size: 40, align: 'right', color: PAL.water }); c.restore(); }
        if (fk > 0) { c.save(); c.globalAlpha *= fk; K.text(c, 'fenotip', 740, 575, { size: 40, align: 'right', color: PAL.water }); ['sarı', 'sarı', 'yeşil'].forEach((w, i) => K.text(c, w, COLS[i].x, 670, { size: 36, align: 'center' })); c.restore(); }
        // saf / melez
        const pk = E.se(t, sp + 0.3, sp + 1.1);
        if (pk > 0) { c.save(); c.globalAlpha *= pk;
          [0, 2].forEach(i => { K.node(c, 'saf döl', COLS[i].x, 790, 1, { size: 38, nopop: true, tint: PAL.life, seed: 11 + i }); });
          const mk = E.se(t, sp + 2.4, sp + 3.2); c.globalAlpha *= mk; K.node(c, 'melez döl', COLS[1].x, 790, 1, { size: 38, nopop: true, tint: PAL.light, seed: 14 });
          c.restore(); }
      });
      // kavram haritası
      const mk = E.se(t, sm + 0.3, sm + 1.0);
      if (mk > 0) E.layer(ctx, mk, c => {
        const a = i => E.se(t, sm + 0.6 + i * 0.7, sm + 1.2 + i * 0.7);
        node(c, 'Kalıtım', 960, 200, a(0), { tint: PAL.life, size: 44 });
        link(c, [960, 234], [960, 294], a(1), 'aktarılan özellik');
        node(c, 'Karakter', 960, 330, a(1));
        link(c, [960, 364], [960, 424], a(2), 'genlerle belirlenir');
        node(c, 'Gen · Alel', 960, 460, a(2));
        link(c, [890, 490], [660, 560], a(3)); link(c, [1030, 490], [1260, 560], a(3));
        node(c, 'Baskın (S)', 620, 590, a(3), { tint: PAL.life }); node(c, 'Çekinik (s)', 1300, 590, a(3), { tint: PAL.light });
        link(c, [960, 494], [960, 674], a(4), 'gen çifti');
        node(c, 'Genotip', 960, 710, a(4));
        link(c, [890, 740], [680, 800], a(5)); link(c, [1030, 740], [1240, 800], a(5));
        node(c, 'Saf döl: SS, ss', 600, 830, a(5), { size: 36 }); node(c, 'Melez döl: Ss', 1320, 830, a(5), { size: 36 });
        link(c, [1060, 710], [1440, 710], a(6), 'görünüşü belirler', { dx: -110, dy: -16 });
        node(c, 'Fenotip', 1560, 710, a(6), { tint: PAL.water });
      });
      K.damla(ctx, t, { x: 1760, y: 890, s: 0.85, flip: true, expr: 'curious', look: [-0.8, -0.2], talk: E.talk(t), arms: [[-1, 0.4], [1, 0.6]] });
    }
  });
})();
