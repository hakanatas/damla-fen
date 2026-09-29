// SAHNE 8 — Kaydet, Sıra sende (hikâyeleştirme performans görevi), Sıradaki: Sesin Oluşumu ve Yayılması, bitiş kartı
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const F = F809;
  const ITEMS = [
    'Çöl tilkisi: büyük kulak, ince kum rengi kürk',
    'Kutup tilkisi: küçük kulak, kalın beyaz kürk',
    ['Adaptasyon: hayatta kalma ve üreme şansını artıran kalıtsal özellik', PAL.life],
    'Kutup ayısı: yağ tabakası · Kaktüs: diken · Deve: hörgüçte yağ',
    ['Varyasyon + doğal seçilim → uygun özellikler yaygınlaşır', F.AMB],
    ['İhtiyaç duyulduğu için yeni kalıtsal özellik kazanılmaz!', F.RED]
  ];
  E.scene({
    name: 'Kaydet', concept: 'Verileri kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      F.notebookPage(ctx, t, E.s('record'), 'Gözlem Defteri · Canlıların Çevreye Uyumu', ITEMS, { col: PAL.life, gap: 1.05, dy: 86, maxW: 1180 });
      F.damla(ctx, t, { x: 1690, y: 900, s: 0.9, flip: true, expr: 'neutral', look: [-0.7, 0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
  // sıradaki: titreşen tel (ses) — dalgalar
  const strings = (c, t, k) => {
    const x0 = 1150, x1 = 1750, y = 560;
    line(c, [x0 - 10, y - 60], [x0 - 10, y + 60], { w: 8 }); line(c, [x1 + 10, y - 60], [x1 + 10, y + 60], { w: 8 });
    const p = []; for (let i = 0; i <= 80; i++) { const u = i / 80; p.push([x0 + u * (x1 - x0), y + Math.sin(u * Math.PI) * 26 * Math.sin(t * 30)]); }
    stroke(c, p, { w: 3, dry: false, color: PAL.water });
    for (let i = 0; i < 4; i++) { const r = 60 + ((t * 80 + i * 45) % 180); c.save(); c.globalAlpha *= (1 - r / 240) * k; stroke(c, P.arc(1450, y, r, -Math.PI * 0.8, -Math.PI * 0.2, 20), { w: 3, dry: false, color: PAL.water }); c.restore(); }
  };
  E.scene({
    name: 'Sıra sende', concept: 'Performans görevi; sıradaki film', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sk = E.s('task'), sn = E.s('next'), se = E.s('end');
      const g = ctx.createLinearGradient(0, 0, E.W, 0); g.addColorStop(0, 'rgba(227,160,58,0.12)'); g.addColorStop(1, 'rgba(46,106,140,0.12)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      const nk = E.se(t, sn, sn + 1.0);
      if (nk > 0) E.layer(ctx, nk, c => strings(c, t, nk));
      const wave = t > sn;
      F.damla(ctx, t, { x: wave ? 560 : 1775, y: wave ? 860 : 900, s: wave ? 1.3 : 0.85, expr: 'happy', view: wave ? 'front' : 'q3', flip: !wave, look: wave ? [0.6, -0.5] : [-0.7, -0.3], arms: wave ? F.wave(t) : [[-1, 1.1], [1, 1.4]], prop: wave ? null : 'notebook' });
      const ck = Math.min(E.se(t, sk, sk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
      F.taskCard(ctx, t, sk, ck, ['Grubunla bir yaşam alanı seç: çöl, kutup, orman, göl...', 'Oradaki canlıları ve uyum özelliklerini kaydet.', 'Bir hikâye, oyun ya da çizimle anlat.', 'Canlılara ve yaşam alanlarına saygıyı unutma!'], { col: F.GREEN, maxW: 1150 });
      if (wave) {
        E.inkText(ctx, 'Sıradaki gözlem:', 1150, 250, t, sn + 0.5, se + 0.4, { size: 46, align: 'center', weight: 400 });
        E.inkText(ctx, '10 · Sesin Oluşumu ve Yayılması', 1150, 340, t, sn + 1.0, se + 0.4, { size: 64, align: 'center', color: PAL.water });
      }
      F.endCard(ctx, t, '9 · Canlıların Çevreye Uyumu', 'FB.8.3.8', PAL.life);
    }
  });
})();
