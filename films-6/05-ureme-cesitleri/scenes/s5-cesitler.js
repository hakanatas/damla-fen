// SAHNE 5–8 — Eşeysiz üremenin programdaki dört çeşidi: bölünme, tomurcuklanma, rejenerasyon, vejetatif
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F05;
  const RED = F.RED;
  const note = (ctx, txt) => INK.label(ctx, txt, 1780, 890, { size: 26, align: 'right', alpha: 0.55 });
  const head = (ctx, t, t0, n, txt) => { P.write(ctx, n + ' · ' + txt, 960, 215, E.seg(t, t0 + 0.2, t0 + 1.2), { size: 58, align: 'center' }); };

  // 1) BÖLÜNME
  E.scene({
    name: 'Bölünme', concept: 'Bölünmeyle üreme (amip, bakteri)', from: 'div', to: 'div', trFrom: [390, 250],
    draw(ctx, t) {
      const s0 = E.s('div');
      head(ctx, t, s0, '1', 'Bölünme');
      const k = E.se(t, s0 + 1.0, s0 + 7.0, 'sine');
      // mikroskop görüş alanı
      const fov = circlePts(700, 560, 300, 300, 80); P.fillPts(ctx, fov, '#F7F4E8'); INK.wash(ctx, fov, PAL.water, 0.08, 201, { bleed: 2, blooms: 0 });
      ctx.save(); P.path(ctx, fov); ctx.clip(); F.amoeba(ctx, 700, 560, 115, k, t, 3); ctx.restore();
      stroke(ctx, fov, { w: 5, closed: true, seed: 202 });
      F.tag(ctx, 'amip', 330, 330, [520, 470], E.se(t, s0 + 1.2, s0 + 2.0), { size: 44, seed: 14 });
      F.tag(ctx, 'çekirdek', 250, 800, [680, 575], E.se(t, s0 + 2.0, s0 + 2.8), { size: 36, seed: 15 });
      if (k > 0.95) P.write(ctx, '1 → 2', 700, 830, E.seg(t, s0 + 7.0, s0 + 7.8), { size: 50, align: 'center', color: F.LIFE_D });
      // bakteriler: 1 → 2 → 4
      const bx = 1400; const rows = [[0], [-1, 1], [-3, -1, 1, 3]];
      rows.forEach((r, i) => { const kk = E.se(t, s0 + 3.0 + i * 1.4, s0 + 3.6 + i * 1.4, 'out'); if (kk <= 0) return; const y = 380 + i * 170;
        r.forEach((d, j) => F.bacterium(ctx, bx + d * 50, y, 1.1 * P.pop(kk), 0.2 * ((j % 2) ? 1 : -1), 250 + i * 10 + j));
        INK.label(ctx, String(r.length), bx + 260, y + 14, { size: 42, weight: 700, alpha: kk });
        if (i > 0) P.arrow(ctx, [bx, y - 130], [bx, y - 45], kk, { w: 2.6, head: 12 }); });
      P.write(ctx, 'bakteri', bx, 870, E.seg(t, s0 + 4.0, s0 + 5.0), { size: 44, align: 'center' });
      note(ctx, 'mikroskobik canlılar · çizim ölçekli değildir');
    }
  });

  // 2) TOMURCUKLANMA
  E.scene({
    name: 'Tomurcuklanma', concept: 'Tomurcuklanmayla üreme (hidra, bira mayası)', from: 'bud', to: 'bud', trFrom: [770, 250],
    draw(ctx, t) {
      const s0 = E.s('bud');
      head(ctx, t, s0, '2', 'Tomurcuklanma');
      const kb = E.se(t, s0 + 1.2, s0 + 8.5, 'sine');
      const gy = 860; const water = [[150, 300], [1100, 296], [1100, gy + 10], [150, gy + 10]]; INK.wash(ctx, water, PAL.water, 0.12, 300, { bleed: 3, blooms: 1 });
      line(ctx, [150, gy], [1100, gy], { w: 3, seed: 301 });
      F.hydra(ctx, 560, gy, 2.0, t, kb);
      const kd = E.se(t, s0 + 8.2, s0 + 9.4, 'out');
      if (kd > 0) E.layer(ctx, kd, c => F.hydra(c, 900, gy, 1.0, t + 1, 0));
      F.tag(ctx, 'hidra', 210, 400, [520, 520], E.se(t, s0 + 1.0, s0 + 1.8), { size: 46, seed: 16 });
      F.tag(ctx, 'tomurcuk', 820, 470, [680, 610], E.se(t, s0 + 3.8, s0 + 4.6), { size: 42, seed: 17 });
      if (kd > 0) P.write(ctx, 'ayrılır → yeni hidra', 900, 560, kd, { size: 38, align: 'center', color: F.LIFE_D });
      // bira mayası
      const ky = E.se(t, s0 + 5.0, s0 + 6.0);
      if (ky > 0) E.layer(ctx, ky, c => {
        const fov = circlePts(1480, 560, 230, 230, 70); P.fillPts(c, fov, '#F7F4E8'); stroke(c, fov, { w: 4, closed: true, seed: 310 });
        F.yeast(c, 1430, 600, 2.2, E.se(t, s0 + 6.0, s0 + 9.5), 1);
        F.yeast(c, 1540, 440, 1.2, 1, 2); F.yeast(c, 1370, 440, 1.0, 0.5, 3);
        P.write(c, 'bira mayası', 1480, 850, E.seg(t, s0 + 6.2, s0 + 7.2), { size: 44, align: 'center' });
      });
      note(ctx, 'çizim ölçekli değildir');
    }
  });

  // 3) REJENERASYON (+ kertenkele yanılgısı)
  E.scene({
    name: 'Rejenerasyon', concept: 'Rejenerasyonla üreme; yanılgı: kertenkele kuyruğu', from: 'regen', to: 'lizard', trFrom: [1150, 250],
    draw(ctx, t) {
      const s0 = E.s('regen'), sl = E.s('lizard');
      const out = E.se(t, sl - 0.3, sl + 0.6);
      if (out < 1) E.layer(ctx, 1 - out, c => {
        head(c, t, s0, '3', 'Rejenerasyon');
        const kbrk = E.se(t, s0 + 1.4, s0 + 3.0, 'io'), kg = E.se(t, s0 + 4.0, s0 + 9.0, 'sine');
        const rot = 0.0, R = 140;
        // ata: 0. kol kopar ve yeniden gelişir
        const L0 = kbrk > 0.05 ? E.lerp(0.14, 1, kg) : 1;
        F.starfish(c, 560, 470, R, rot, [L0, 1, 1, 1, 1], 1, { newArms: kg > 0 && kg < 1 ? [0] : [] });
        // kopan parça: bir kol + merkezin bir kısmı → yeni deniz yıldızı
        if (kbrk > 0.05) {
          const px = E.lerp(560, 1250, kbrk), py = E.lerp(470 - 95, 470, kbrk);
          const g = E.lerp(0.14, 1, kg);
          if (kg <= 0) { c.save(); c.translate(px, py); const arm = [[-26, 40], [-18, -90], [0, -150], [18, -90], [26, 40], [0, 52]]; F.shape(c, arm, { fill: '#EFD5B0', col: '#C98B52', a: 0.6, seed: 5590, w: 2.8 }); c.restore(); }
          else F.starfish(c, px, py + 40 * (1 - kg), R, rot, [1, g, g, g, g], 2, { newArms: kg < 1 ? [1, 2, 3, 4] : [] });
        }
        F.tag(c, 'deniz yıldızı', 180, 330, [470, 420], E.se(t, s0 + 0.8, s0 + 1.6), { size: 42, seed: 18 });
        if (kbrk > 0.5 && kg < 0.3) P.write(c, 'kopan parça', 1250, 290, E.se(t, s0 + 2.4, s0 + 3.2), { size: 40, align: 'center' });
        if (kg > 0.9) P.write(c, '1 → 2 deniz yıldızı', 900, 690, E.seg(t, s0 + 8.6, s0 + 9.6), { size: 46, align: 'center', color: F.LIFE_D });
        // planarya
        const kp = E.se(t, s0 + 5.0, s0 + 6.0);
        if (kp > 0) E.layer(c, kp, cc => {
          const kc = E.se(t, s0 + 6.0, s0 + 7.0), kr = E.se(t, s0 + 7.0, s0 + 10.0);
          if (kc <= 0) F.worm(cc, 1180, 800, 360, 0, 1, 0, 0, 1);
          else {
            const u1 = 0.5 + 0.5 * kr, u0 = 0.5 - 0.5 * kr;
            F.worm(cc, 1180 - 200 * kc, 800, 360, 0, u1, 0.5, u1, 2);                           // kuyruk parçası → baş geliştirir
            const R = 1540 + 200 * kc; F.worm(cc, R - (1 - u0) * 360, 800, 360, u0, 1, u0, 0.5, 3); // baş parçası → kuyruk geliştirir
          }
          P.write(cc, 'planarya', 1360, 730, E.seg(t, s0 + 5.2, s0 + 6.2), { size: 40, align: 'center' });
        });
      });
      if (out > 0) E.layer(ctx, out, c => {
        const kr = E.se(t, sl + 2.0, sl + 7.0);
        F.lizard(c, 700, 560, 1.5, 0.12 + 0.8 * kr, t, { regrow: true });
        F.tailPiece(c, 1560, 600, 1.1, t);
        P.write(c, 'kuyruğunu yeniler', 520, 720, E.seg(t, sl + 2.4, sl + 3.4), { size: 44 });
        P.check(c, 470, 700, 46, E.se(t, sl + 3.0, sl + 3.5), { w: 6, color: F.LIFE_D });
        P.cross(c, 1440, 600, 70, E.se(t, sl + 4.0, sl + 4.8), { w: 10, color: RED });
        P.write(c, 'kuyruktan yeni kertenkele oluşmaz', 1320, 760, E.seg(t, sl + 4.4, sl + 5.8), { size: 40, align: 'center', color: RED });
        const kn = E.se(t, sl + 6.2, sl + 7.0, 'back');
        if (kn > 0) { c.save(); c.translate(960, 260); c.scale(kn, kn); const b = F.rrect(0, 0, 700, 110, 20, 6); P.fillPts(c, b, '#FBF8F1'); stroke(c, b, { w: 3.4, closed: true, color: RED, seed: 330 }); c.font = '700 60px Kalam'; c.textAlign = 'center'; c.fillStyle = RED; c.fillText('Bu üreme değildir!', 0, 20); c.restore(); }
        INK.label(c, 'kertenkele', 700, 460, { size: 40, weight: 700, align: 'center', alpha: E.se(t, sl + 0.6, sl + 1.4) });
      });
    }
  });

  // 4) VEJETATİF ÜREME
  E.scene({
    name: 'Vejetatif üreme', concept: 'Vejetatif üreme (patates, çilek, sardunya)', from: 'veg', to: 'veg', trFrom: [1530, 250],
    draw(ctx, t) {
      const s0 = E.s('veg');
      head(ctx, t, s0, '4', 'Vejetatif üreme');
      const gy = 760;
      const soil = [[100, gy], [1820, gy - 6], [1820, gy + 110], [100, gy + 116]]; INK.wash(ctx, soil, '#8A6A45', 0.22, 400, { bleed: 3, blooms: 1 }); line(ctx, [100, gy], [1820, gy - 6], { w: 3, seed: 401 });
      // patates
      const k1 = E.se(t, s0 + 1.2, s0 + 5.0);
      F.potato(ctx, 360, 560, 1.2, k1);
      P.write(ctx, 'patates', 360, 830, E.seg(t, s0 + 1.4, s0 + 2.4), { size: 44, align: 'center' });
      INK.label(ctx, '(gövde yumrusu)', 360, 875, { size: 30, align: 'center', alpha: 0.7 * E.se(t, s0 + 2, s0 + 3) });
      // çilek
      const k2 = E.se(t, s0 + 3.0, s0 + 6.0), k2b = E.se(t, s0 + 5.6, s0 + 7.2, 'out');
      F.strawberry(ctx, 840, gy, 1.0, k2, k2b, t, { run: 300 });
      P.write(ctx, 'çilek', 990, 830, E.seg(t, s0 + 3.4, s0 + 4.4), { size: 44, align: 'center' });
      INK.label(ctx, '(sürünücü gövde)', 990, 875, { size: 30, align: 'center', alpha: 0.7 * E.se(t, s0 + 4, s0 + 5) });
      // sardunya çeliği
      const k3 = E.se(t, s0 + 5.5, s0 + 9.0);
      F.cutting(ctx, 1560, gy - 4, 1.2, k3, t);
      P.write(ctx, 'sardunya', 1560, 830, E.seg(t, s0 + 5.8, s0 + 6.8), { size: 44, align: 'center' });
      INK.label(ctx, '(gövde çeliği)', 1560, 875, { size: 30, align: 'center', alpha: 0.7 * E.se(t, s0 + 6.4, s0 + 7.4) });
      if (k3 > 0.3) F.tag(ctx, 'kökler', 1720, 680, [1600, 720], E.se(t, s0 + 7.0, s0 + 7.8), { size: 34, seed: 19 });
    }
  });
})();
