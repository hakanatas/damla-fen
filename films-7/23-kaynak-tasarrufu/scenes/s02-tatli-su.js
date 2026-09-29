// SAHNE 2 — Tatlı su kaynakları (%97 tuzlu, %3 tatlı; tatlı suyun çoğu buzul ve yer altında), sürdürülebilir yaşam, problem tanımı (FB.7.7.2 a)
(function () {
  const { PAL, line, stroke, wash, circlePts } = INK;
  const F = F723;
  const SALT = '#3E5C73';
  E.scene({
    name: 'Tatlı su', concept: 'Tatlı su kaynakları; sürdürülebilir yaşam; problem', from: 'fresh', to: 'problem', trFrom: [400, 500],
    draw(ctx, t) {
      const sf = E.s('fresh'), s2 = E.s('fresh2'), ss = E.s('sustain'), sp = E.s('problem');
      F.tiles(ctx, 0);
      const out = E.se(t, ss - 0.2, ss + 0.6);
      E.layer(ctx, 1 - out, c => {
        // 100 damla: 97 tuzlu, 3 tatlı
        for (let i = 0; i < 100; i++) {
          const r = Math.floor(i / 10), q = i % 10, x = 230 + q * 56, y = 250 + r * 62;
          const k = E.se(t, sf + 0.3 + i * 0.03, sf + 0.6 + i * 0.03); if (k <= 0) continue;
          const fresh = i >= 97;
          const hl = fresh ? 1 + 0.15 * Math.sin(t * 4) * E.se(t, sf + 4, sf + 5) : 1;
          c.save(); c.globalAlpha *= k; F.drop(c, x, y + 10, 13 * hl, fresh ? '#7FC4E0' : SALT, fresh ? 0.95 : 0.6); c.restore();
        }
        F.fit(c, '100 damla su', 480, 205, 400, 36, { alpha: E.se(t, sf + 0.5, sf + 1.0) });
        const kl = E.se(t, sf + 3.6, sf + 4.4);
        c.save(); c.globalAlpha *= kl;
        F.fit(c, '≈ %97 tuzlu', 390, 885, 330, 44, { color: SALT });
        c.restore();
        const kf = E.se(t, sf + 5.0, sf + 5.8);
        c.save(); c.globalAlpha *= kf; F.fit(c, '≈ %3 tatlı', 680, 885, 220, 44, { color: '#2E88B0' }); c.restore();
        // tatlı suyun dağılımı
        const kd = E.se(t, s2 + 0.3, s2 + 1.0, 'out');
        if (kd > 0) {
          c.save(); c.globalAlpha *= kd;
          F.card(c, 1100, 200, 720, 640, 3510, { tint: '#7FC4E0', tintA: 0.1 });
          F.fit(c, 'Tatlı su nerede?', 1460, 265, 600, 46, { color: '#2E88B0' });
          F.glacier(c, 1250, 400, 1.2); F.fit(c, 'buzullar', 1250, 490, 250, 36);
          F.ground(c, 1640, 400, 1.2); F.fit(c, 'yer altı', 1640, 490, 250, 36);
          F.fit(c, 'çoğu burada', 1460, 560, 400, 38, { color: F.AMB });
          const kg = E.se(t, s2 + 3.0, s2 + 3.8);
          c.globalAlpha *= kg;
          const lake = INK.wobble(circlePts(1460, 690, 120, 34, 40), 4, 3511); P.fillPts(c, lake, '#7FC4E0', 0.6); stroke(c, lake, { w: 2.4, closed: true });
          F.fit(c, 'göl ve akarsu: kolay kullanılan, çok az', 1460, 790, 640, 34);
          c.restore();
        }
      });
      // sürdürülebilir yaşam
      const ks = E.se(t, ss + 0.2, ss + 0.9, 'out') * (1 - E.se(t, sp - 0.2, sp + 0.5));
      if (ks > 0) E.layer(ctx, ks, c => {
        F.card(c, 300, 200, 1320, 520, 3520, { tint: PAL.life, tintA: 0.1 });
        F.wfit(c, 'Sürdürülebilir yaşam', 960, 290, E.seg(t, ss + 0.5, ss + 1.5), 64, 1200, { align: 'center', color: F.GREEN });
        // terazi
        const cx = 960, cy = 470;
        line(c, [cx, cy + 180], [cx, cy], { w: 5 }); line(c, [cx - 300, cy], [cx + 300, cy], { w: 5 });
        [[-300, 'bugünün ihtiyaçları'], [300, 'gelecek nesillerin hakları']].forEach(([dx, txt], i) => {
          line(c, [cx + dx, cy], [cx + dx - 60, cy + 90], { w: 1.8, dry: false }); line(c, [cx + dx, cy], [cx + dx + 60, cy + 90], { w: 1.8, dry: false });
          stroke(c, P.arc(cx + dx, cy + 90, 80, 0, Math.PI, 20, 26), { w: 3 });
          F.drop(c, cx + dx - 20, cy + 70, 12); F.drop(c, cx + dx + 20, cy + 70, 12);
          F.wfit(c, txt, cx + dx, cy + 170, E.seg(t, ss + 1.8 + i * 1.6, ss + 3.0 + i * 1.6), 36, 460, { align: 'center' });
        });
      });
      // problem kartı
      const kp = E.se(t, sp + 0.2, sp + 0.9, 'out');
      if (kp > 0) E.layer(ctx, kp, c => {
        F.card(c, 360, 220, 1200, 420, 3530);
        F.stamp(c, 560, 300, 'PROBLEM', E.seg(t, sp + 0.4, sp + 1.0), { color: PAL.water, size: 50 });
        F.wfit(c, 'Evimizde su boşa gidiyor mu?', 420, 420, E.seg(t, sp + 1.0, sp + 2.4), 56, 1080);
        F.wfit(c, 'Nerede?  Ne kadar?', 420, 530, E.seg(t, sp + 2.6, sp + 3.6), 56, 1080, { color: PAL.water });
        F.tap(c, 1400, 520, 0.6, t, { fall: 90 });
      });
      F.damla(ctx, t, { x: 950, y: 900, s: 0.85, view: 'q3', expr: 'curious', look: [0.8, -0.3] });
    }
  });
})();
