// SAHNE 9 — Temizlik (D18.2) ve deney raporu · SAHNE 10 — Sıra sende + sıradaki film + bitiş
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  E.scene({
    name: 'Temizlik', concept: 'Malzemeleri toplama, alanı temiz tutma', from: 'clean', to: 'clean', trFrom: [960, 540],
    draw(ctx, t) {
      const sc = E.s('clean');
      ctx.save();
      CK.table(ctx, 840);
      // kutu
      const bx = 1500, by = 840;
      const box = [[bx - 170, by - 170], [bx + 170, by - 170], [bx + 160, by], [bx - 160, by], [bx - 170, by - 170]];
      P.fillPts(ctx, box, '#E6DCC6'); wash(ctx, box, '#8A6A45', 0.45, 181, { bleed: 1.5, blooms: 1 }); stroke(ctx, box, { w: 3.4, closed: true });
      INK.label(ctx, 'malzeme kutusu', bx, by - 70, { size: 34, weight: 700, align: 'center' });
      // elemanlar kutuya uçar
      const items = [
        [c => CK.holder(c, 0, 0, 0.8), [420, 790]], [c => CK.switch(c, 0, 20, 0.8, 0), [700, 820]], [c => { const s = CK.socket(c, 0, 30, 0.8); CK.bulb(c, s.top[0], s.top[1] + 4, 0.8, 0); }, [960, 810]],
        [c => CK.cable(c, 0, 0, 0.6), [1150, 800]], [c => CK.cable(c, 0, 0, 0.6, '#3A3842'), [1180, 760]]
      ];
      items.forEach(([fn, p], i) => {
        const a = sc + 0.8 + i * 0.7, k = E.se(t, a, a + 0.9);
        if (k >= 1) return;
        const x = E.lerp(p[0], bx, k), y = E.lerp(p[1], by - 140, k) - Math.sin(k * Math.PI) * 220;
        ctx.save(); ctx.translate(x, y); ctx.rotate(k * 0.6); ctx.scale(1 - 0.5 * k, 1 - 0.5 * k); fn(ctx); ctx.restore();
      });
      // bez ile silme + parıltı
      const kw = E.seg(t, sc + 4.4, sc + 6.4);
      if (kw > 0 && kw < 1) {
        const wx = 300 + kw * 900, wy = 830 + Math.sin(kw * 20) * 6;
        const cloth = INK.wobble(circlePts(wx, wy - 18, 60, 22, 24), 3, 190);
        P.fillPts(ctx, cloth, PAL.water, 0.55); stroke(ctx, cloth, { w: 2.6, closed: true });
      }
      if (kw > 0.2) for (let i = 0; i < 6; i++) {
        const x = 330 + i * 160, ks = E.se(t, sc + 4.4 + i * 0.35, sc + 4.9 + i * 0.35);
        const r = 14 * ks; ctx.save(); ctx.globalAlpha = ks * (0.6 + 0.4 * Math.sin(t * 6 + i));
        line(ctx, [x - r, 800], [x + r, 800], { w: 2.4, dry: false, color: CK.AMBD }); line(ctx, [x, 800 - r], [x, 800 + r], { w: 2.4, dry: false, color: CK.AMBD });
        ctx.restore();
      }
      DAMLA.draw(ctx, {
        x: 240, y: 842, s: 1.1, view: 'q3', expr: 'happy', look: [0.8, 0], blink: E.blink(t, 4), squash: E.breath(t), t, talk: E.talk(t), seed: 1,
        arms: [[-1, 0.4], [1, 1.5 + 0.3 * Math.sin(t * 6)]]
      });
      E.inkText(ctx, 'temiz masa, güvenli laboratuvar', 960, 320, t, sc + 5.0, 1e9, { size: 56, align: 'center', color: '#5C7230' });
      ctx.restore();
    }
  });

  E.scene({
    name: 'Rapor', concept: 'Deney raporu', from: 'report', to: 'report', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('report');
      ctx.save();
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 60, 1620, 900);
      P.write(ctx, 'Deney Raporu', 440, 200, E.seg(t, sr + 0.2, sr + 1.2), { size: 64 });
      if (t > sr + 1.2) P.drawOn(ctx, P.bez([436, 222], [630, 232], [850, 218], 30), E.se(t, sr + 1.2, sr + 1.6), { w: 3, color: PAL.light });
      const secs = [
        ['1. Soru', 'Anahtar açık/kapalıyken ampul ışık verir mi?'],
        ['2. Şema', null],
        ['3. Malzemeler', 'pil, pil yatağı, anahtar, ampul, duy, 3 kablo'],
        ['4. Adımlar', 'şemaya göre kur, karşılaştır, dene'],
        ['5. Veriler', '3 denemenin tablosu'],
        ['6. Sonuç', 'Işık için devre tamamlanmalı.']
      ];
      secs.forEach(([h, d], i) => {
        const at = sr + 1.2 + i * 1.3, col = i < 3 ? 0 : 1, row = i % 3;
        const x = 300 + col * 740, y = 320 + row * 195;
        const k = E.se(t, at, at + 0.5); if (k <= 0) return;
        P.write(ctx, h, x, y, E.seg(t, at, at + 0.7), { size: 46, color: '#8A4A10' });
        if (d) P.write(ctx, d, x, y + 56, E.seg(t, at + 0.4, at + 1.4), { size: 32, weight: 400 });
        else CK.loop(ctx, { x0: x + 250, y0: y - 40, x1: x + 500, y1: y + 90 }, [{ type: 'pil', side: 'top', f: 0.5 }, { type: 'anahtar', side: 'right', f: 0.5, closed: 1 }, { type: 'ampul', side: 'bottom', f: 0.5 }], { k: E.seg(t, at + 0.2, at + 1.4), s: 0.5, w: 5 });
        P.check(ctx, x - 40, y - 14, 34, E.se(t, at + 0.9, at + 1.3), { w: 5, color: PAL.life });
      });
      DAMLA.draw(ctx, {
        x: 1650, y: 1030, s: 1.05, view: 'q3', flip: true, expr: 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, talk: E.talk(t), seed: 5,
        arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook'
      });
      ctx.restore();
    }
  });

  E.scene({
    name: 'Sıra sende', concept: 'Performans görevi ve sonraki film', from: 'yourturn', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sy = E.s('yourturn'), sn = E.s('next');
      ctx.save();
      CK.table(ctx, 840);
      // Sıra sende kartı
      const ky = Math.min(E.se(t, sy + 0.1, sy + 0.8, 'out'), 1 - E.se(t, sn - 0.2, sn + 0.5));
      if (ky > 0) E.layer(ctx, ky, c => {
        CK.card(c, 330, 150, 1260, 620, { seed: 200 });
        P.write(c, 'Sıra sende!', 420, 260, E.seg(t, sy + 0.4, sy + 1.4), { size: 76, color: '#8A4A10' });
        const tasks = [['Grubunla bir devre şeması çiz.', sy + 1.4], ['Şemaya uygun düzeneği kur, dene.', sy + 3.4], ['Verileri tabloya yaz, raporla.', sy + 5.4]];
        tasks.forEach(([txt, at], i) => {
          const y = 380 + i * 110, k = E.se(t, at, at + 0.6); if (k <= 0) return;
          INK.label(c, String(i + 1) + '.', 440, y, { size: 46, weight: 700, alpha: k });
          P.write(c, txt, 500, y, E.seg(t, at + 0.1, at + 1.3), { size: 48 });
        });
        P.write(c, '⚠ Yalnızca pil · yetişkin gözetiminde', 420, 710, E.seg(t, sy + 7.0, sy + 8.2), { size: 38, color: CK.RED });
      });
      // sıradaki: 1 pil – 2 pil parlaklık sorusu
      const kn = E.se(t, sn + 0.3, sn + 1.0);
      if (kn > 0) E.layer(ctx, kn, c => {
        CK.bulb(c, 700, 700, 1.4, 0.35, t);
        CK.bulb(c, 1220, 700, 1.4, 1.1, t);
        INK.label(c, '?', 960, 560, { size: 140, weight: 700, align: 'center', color: CK.AMBD });
        CK.sym(c, 'pil', 700, 790, 0.9, { n: 1 }); CK.sym(c, 'pil', 1220, 790, 0.9, { n: 2 });
        INK.label(c, '1 pil', 700, 860, { size: 36, weight: 700, align: 'center' }); INK.label(c, '2 pil', 1220, 860, { size: 36, weight: 700, align: 'center' });
      });
      E.inkText(ctx, 'Sıradaki gözlem:', 960, 190, t, sn + 0.8, E.s('end') + 0.5, { size: 46, align: 'center', weight: 400 });
      E.inkText(ctx, '24 · Ampulün Parlaklığı: Hipotez Kuralım', 960, 270, t, sn + 1.4, E.s('end') + 0.5, { size: 62, align: 'center' });
      DAMLA.draw(ctx, { x: 1710, y: 842, s: 1.15, view: 'q3', flip: true, expr: 'happy', look: [-0.6, -0.3], blink: E.blink(t, 12), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 2.4 + 0.3 * Math.sin(t * 7)], [1, 0.4]] });
      ctx.restore();
      CK.endCard(ctx, t, 23, 'Şemadan Devreye: Deney Zamanı', 'FB.5.6.2');
    }
  });
})();
