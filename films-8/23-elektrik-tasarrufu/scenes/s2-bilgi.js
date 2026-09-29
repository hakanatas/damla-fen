// SAHNE 2 — Bilgi topla: ışığı kapat, akkor/LED, bekleme modu, fiş güvenliği, enerji etiketi, tasarruf alışkanlıkları
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const W = W6, D = D23;
  const PANELS = [
    ['research', 'led'], ['led', 'standby'], ['standby', 'plug'], ['plug', 'label'], ['label', 'habits'], ['habits', null]
  ];
  // kalın blok ok (aşağıdan yukarı): enerji miktarının niteliksel göstergesi
  const fat = (c, x, y0, y1, w, k = 1) => { if (k <= 0) return; const yt = E.lerp(y0, y1, k), hw = w / 2, hh = Math.max(12, w * 0.9);
    const p = [[x - hw, y0], [x - hw, yt + hh], [x - hw - hh * 0.7, yt + hh], [x, yt], [x + hw + hh * 0.7, yt + hh], [x + hw, yt + hh], [x + hw, y0], [x - hw, y0]];
    P.fillPts(c, p, W.ELEC, 0.85); stroke(c, p, { w: 2, closed: true, dry: false, seed: 7230 }); };
  const DRAW = {
    research(c, t, a) {
      const off = E.se(t, a + 3.4, a + 3.8);
      D.switch(c, 700, 520, 2.0, off < 0.5);
      line(c, [1250, 170], [1250, 330], { w: 2, dry: false }); W.bulb(c, 1250, 370, 2.4, 1 - off);
      if (off > 0) W.txt(c, 'kapalı', 1250, 600, { size: 40, align: 'center', alpha: off, color: PAL.water });
      P.write(c, 'Çıkarken ışığı kapat!', 1250, 780, E.seg(t, a + 4.0, a + 5.2), { size: 56, align: 'center', color: W.AMBER });
      P.check(c, 850, 400, 60, E.se(t, a + 3.8, a + 4.3), { w: 8, color: PAL.life });
    },
    led(c, t, a) {
      const s2 = E.s('led2');
      // akkor
      W.bulb(c, 650, 350, 2.2, 0.95);
      for (let i = 0; i < 5; i++) W.squiggle(c, 560 + i * 45, 260, t, i, E.se(t, a + 1.5, a + 2.5), 60);
      W.txt(c, 'akkor ampul', 650, 540, { size: 40, align: 'center' });
      W.badge(c, 'isi', 870, 250, E.se(t, a + 2.4, a + 3.0, 'out'), { size: 36, name: 'çok ısı', t });
      fat(c, 650, 825, 640, 34, E.se(t, a + 0.6, a + 1.4));
      W.badge(c, 'elektrik', 650, 860, E.se(t, a + 0.4, a + 1.0, 'out'), { size: 32, name: 'çok elektrik' });
      // LED
      const lk = E.se(t, s2 + 0.2, s2 + 0.8, 'out');
      if (lk > 0) {
        c.save(); c.globalAlpha *= lk; D.led(c, 1350, 330, 2.2, 0.95); c.restore();
        W.squiggle(c, 1350, 250, t, 9, E.se(t, s2 + 1.2, s2 + 2) * 0.6, 40);
        W.txt(c, 'LED ampul', 1350, 540, { size: 40, align: 'center', alpha: lk });
        fat(c, 1350, 825, 640, 8, E.se(t, s2 + 0.8, s2 + 1.6));
        W.badge(c, 'elektrik', 1350, 860, E.se(t, s2 + 0.6, s2 + 1.2, 'out'), { size: 32, name: 'az elektrik' });
        E.inkText(c, 'aynı aydınlık', 1000, 620, t, s2 + 2.2, 1e9, { size: 46, align: 'center', color: W.AMBER });
      }
    },
    standby(c, t, a) {
      const off = E.se(t, a + 3.6, a + 4.0);
      W.A.tv(c, 760, 500, 2.0, t, 0, 1 - off);
      if (off < 1) W.txt(c, 'bekleme modu', 900, 330, { size: 36, color: '#8A3F2C', alpha: 1 - off });
      W.strip(c, 1150, 760, 3, 1.1, 1);
      const sw = W.rr(1150 + 250 * 1.1 + 6, 736, 60, 48, 8); W.shape(c, sw, off > 0.5 ? '#9A968C' : '#E0402A', 0.8, 7200);
      stroke(c, P.bez([1194, 734], [1000, 700], [900, 620], 20), { w: 3, color: '#3A3530', dry: false });
      W.txt(c, 'anahtarlı priz', 1400, 850, { size: 36, align: 'center' });
      P.write(c, 'Bekleme modu da elektrik harcar!', 1180, 250, E.seg(t, a + 1.0, a + 2.4), { size: 48, align: 'center', color: W.AMBER });
      P.write(c, 'fişi çek / prizi kapat', 1450, 640, E.seg(t, a + 4.0, a + 5.0), { size: 40, align: 'center', color: PAL.water });
    },
    plug(c, t, a) {
      // doğru: fişten tut
      const pl = (x, y, ang) => { c.save(); c.translate(x, y); c.rotate(ang); const b = W.rr(-36, -50, 72, 90, 12); W.shape(c, b, '#3A3530', 0.5, 7210); line(c, [-12, -50], [-12, -80], { w: 5, color: '#8C8578', dry: false }); line(c, [12, -50], [12, -80], { w: 5, color: '#8C8578', dry: false }); stroke(c, P.bez([0, 40], [30, 120], [-20, 190], 20), { w: 6, color: '#3A3530', dry: false }); c.restore(); };
      W.socket(c, 470, 330, 1.2); pl(470, 480, 0); W.flow(c, [520, 450], [620, 510], 1, { w: 4, color: PAL.life, head: 14 });
      P.check(c, 700, 440, 60, E.se(t, a + 1.0, a + 1.5), { w: 8, color: PAL.life }); W.txt(c, 'fişten tut', 470, 740, { size: 38, align: 'center' });
      W.safety(c, 860, 220, 960, ['Fişi kablodan değil, fişten tutarak çek.', 'Islak elle fişe ve prize dokunma.', 'Hasarlı kabloyu kullanma, yetişkine haber ver.'], t, a + 0.2, { ats: [a + 0.8, a + 3.0, a + 4.4], size: 38, lh: 86 });
    },
    label(c, t, a) {
      W.energyLabel(c, 380, 200, 1.3, E.se(t, a + 0.3, a + 1.6), t > a + 2.0 ? 0 : -1);
      const fk = E.se(t, a + 2.6, a + 3.2, 'out');
      if (fk > 0) {
        c.save(); c.globalAlpha *= fk;
        D.fridge(c, 1000, 790, 1.0); D.fridge(c, 1450, 790, 1.0);
        [[1085, 'A', 0], [1535, 'E', 4]].forEach(([x, L, i]) => { const tg = W.rr(x - 40, 520, 80, 60, 10); P.fillPts(c, tg, W.LBL[i][1], 0.95); W.txt(c, L, x, 566, { size: 44, align: 'center', color: '#FBF8F1' }); });
        c.restore();
        fat(c, 1085, 895, 810, 8, E.se(t, a + 3.4, a + 3.9)); fat(c, 1535, 895, 810, 30, E.se(t, a + 3.4, a + 3.9));
      }
      P.write(c, 'aynı iş, daha az enerji', 1300, 330, E.seg(t, a + 4.0, a + 5.2), { size: 50, align: 'center', color: W.AMBER });
    },
    habits(c, t, a) {
      [[620, 'kapağı kapalı tut'], [1100, 'tam dolu çalıştır'], [1580, 'gün ışığından yararlan']].forEach(([x, n], i) => {
        const k = E.se(t, a + 0.3 + i * 2.2, a + 0.9 + i * 2.2, 'out'); if (k <= 0) return;
        c.save(); c.globalAlpha *= k;
        W.card(c, x - 210, 230, 420, 600, { seed: 7220 + i });
        if (i === 0) D.fridge(c, x - 85, 660, 1.1, 0);
        if (i === 1) D.washer(c, x - 110, 640, 1.1, 1);
        if (i === 2) D.window(c, x - 150, 300, 300, 260, t);
        W.txt(c, n, x, 760, { size: W.fit(c, n, 380, 38), align: 'center' });
        c.restore();
        P.check(c, x + 150, 300, 50, E.se(t, a + 1.0 + i * 2.2, a + 1.5 + i * 2.2), { w: 7, color: PAL.life });
      });
    }
  };
  E.scene({
    name: 'Bilgi topla', concept: 'Tasarruf yolları', from: 'research', to: 'habits', trFrom: [960, 540],
    draw(ctx, t) {
      PANELS.forEach(([id, nx], i) => {
        const a = E.s(id), b = nx ? E.s(nx) : E.e('habits') + 1;
        if (t < a || t > b + 0.6) return;
        const k = i === 0 ? 1 : E.se(t, a, a + 0.5);
        E.layer(ctx, k, c => {
          if (i > 0) { c.save(); c.beginPath(); c.rect(0, 160, E.W, 780); c.clip(); c.setTransform(1, 0, 0, 1, 0, 0); E.paper(c); c.restore(); }
          DRAW[id](c, t, a);
        });
      });
      W.damla(ctx, t, { x: 165, y: 905, s: 0.85, expr: 'curious', look: [0.8, -0.3], arms: [[-1, 0.35], [1, 1.2 + 0.3 * Math.sin(t * 2)]], prop: 'notebook', seed: 5 });
    }
  });
})();
