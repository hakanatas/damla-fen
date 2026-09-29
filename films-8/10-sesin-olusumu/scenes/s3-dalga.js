// SAHNE 3 — Dalgalar: su yüzeyindeki halkalar (köprü) → ses her yöne dalgalar hâlinde yayılır → tanecik modeli (sık/seyrek),
// her tanecik yerinde titreşir, titreşimi aktarır. FB.8.4.1 c) titreşim sonucu oluşup dalgalar hâlinde yayıldığını yorumlar.
(function () {
  const { PAL, stroke, line, circlePts } = INK; const F = S8;
  E.scene({
    name: 'Dalgalar', concept: 'Ses dalgalar hâlinde yayılır', from: 'drops', to: 'pass', trFrom: [620, 300],
    draw(ctx, t) {
      const sd = E.s('drops'), si = E.s('invisible'), sp = E.s('particles'), ss = E.s('pass');
      const aA = 1 - E.se(t, sp - 0.4, sp + 0.4), aB = E.se(t, sp - 0.4, sp + 0.4);
      if (aA > 0) E.layer(ctx, aA, c => {
        // damlalık + su kabı + halkalar
        const bx = 560, by = 820;
        F.bowl(c, bx, by, 700, 240);
        const drops = [sd + 0.6, sd + 3.0, sd + 5.4, si + 1.4, si + 4.0];
        drops.forEach((d0, i) => F.ripples(c, bx, 640, t, d0 + 0.45, { n: 4, per: 0.4, speed: 150, maxR: 330, flat: 0.2 }));
        const tube = [[bx - 14, 190], [bx + 14, 190], [bx + 10, 330], [bx, 350], [bx - 10, 330]]; F.shape(c, tube, PAL.water, 0.12, 301);
        const bulb = INK.wobble(circlePts(bx, 170, 26, 34, 30), 1.5, 302); F.shape(c, bulb, '#B5553F', 0.6, 303);
        drops.forEach(d0 => { const k = E.seg(t, d0, d0 + 0.45); if (k > 0 && k < 1) F.shape(c, circlePts(bx, 360 + E.ease.in(k) * 280, 9, 13, 16), PAL.water, 0.7, 304); });
        P.write(c, 'halkalar her yöne yayılıyor', bx, 470, E.seg(t, sd + 2.2, sd + 3.4), { size: 44, align: 'center' });
        // sağ: çalan saat, her yöne ses dalgaları (model)
        const ka = E.se(t, si + 0.2, si + 1.0);
        if (ka > 0) E.layer(c, ka, c2 => {
          F.rings(c2, 1420, 500, t, { a0: 0, a1: Math.PI * 2, r0: 90, maxR: 330, gap: 60, speed: 100 });
          F.clock(c2, 1420, 500, 1.0, t, 1);
          F.fit(c2, 'ses dalgaları her yöne', 1420, 890, 560, 44);
          F.fit(c2, '(çizim bir modeldir; ses dalgaları gözle görülmez)', 1420, 180, 700, 30, { weight: 400, alpha: 0.75 });
        });
        F.damla(c, t, { x: 1000, y: 905, s: 0.85, flip: t < si + 0.5, expr: 'curious', look: t < si + 0.5 ? [0.8, -0.3] : [0.8, -0.5], arms: [[-1, 0.4], [1, 0.5]] });
      });
      if (aB > 0) E.layer(ctx, aB, c => {
        const x0 = 270, y0 = 400, w = 1430, h = 260, lam = 240, f = 0.75;
        const front = (t - sp - 0.4) * 300;
        const vib = E.se(t, sp + 0.2, sp + 0.6);
        F.fork(c, 190, 800, 1.3, t, vib);
        F.vib(c, 190, 540, t, { r0: 60, gap: 12, alpha: vib });
        const hi = t > ss + 0.3 ? [5, 30] : null;
        F.particles(c, x0, y0, w, h, t, { d: 26, lam, amp: 19, f, front: Math.max(0, front), hi, seed: 11 });
        // sık / seyrek etiketleri (hareketli sıkışma bölgesini izler)
        const kl = E.se(t, sp + 3.2, sp + 4.0) * (1 - E.se(t, ss - 0.2, ss + 0.4));
        if (kl > 0) {
          const uc = lam * (((0.5 + f * (t)) % 1 + 1) % 1) + lam * 2.5, us = uc + lam / 2;
          c.save(); c.globalAlpha *= kl;
          if (front > uc) { INK.label(c, 'sık', x0 + uc, 360, { size: 44, weight: 700, align: 'center', color: PAL.water }); INK.leader(c, [x0 + uc, 368], [x0 + uc, 405], { w: 1.8, bend: 0 }); }
          if (front > us) { INK.label(c, 'seyrek', x0 + us, 712, { size: 44, weight: 700, align: 'center' }); INK.leader(c, [x0 + us, 676], [x0 + us, 650], { w: 1.8, bend: 0 }); }
          c.restore();
        }
        F.fit(c, 'hava tanecikleri', 470, 370, 400, 36, { alpha: 0.7 * E.se(t, sp + 1.5, sp + 2.2) });
        // aktarım
        const kp = E.se(t, ss + 0.4, ss + 1.2);
        if (kp > 0) {
          const hx = x0 + 30 * 26 + 13;
          c.save(); c.globalAlpha *= kp;
          INK.label(c, 'yerinde ileri geri titreşir', hx, 760, { size: 40, weight: 700, align: 'center', color: F.AMB });
          INK.leader(c, [hx, 728], [hx, 560], { w: 1.8, bend: 0 });
          c.restore();
          P.arrow(c, [420, 830], [1420, 830], E.se(t, ss + 2.2, ss + 3.6), { w: 4, color: F.AMB, bend: 0, head: 20 });
          P.write(c, 'titreşim aktarılır → kulağa ulaşır', 920, 880, E.seg(t, ss + 3.2, ss + 4.4), { size: 40, align: 'center' });
        }
        F.ear(c, 1790, 530, 1.1, { flip: false });
        c.save(); c.globalAlpha *= E.se(t, sp + 5.4, sp + 6); INK.label(c, 'kulak', 1790, 640, { size: 36, weight: 700, align: 'center' }); c.restore();
        F.fit(c, 'diyapazon', 190, 870, 260, 36, { alpha: 0.8 });
      });
    }
  });
})();
