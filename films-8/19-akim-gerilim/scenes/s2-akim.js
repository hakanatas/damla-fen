// SAHNE 2 — Elektrik akımının nitelikleri (kapalı devre, yön) · güvenlik · ampermetre ve amper
(function () {
  const { PAL, stroke, line } = INK;
  const U = U6;
  const BOX = { x0: 250, y0: 330, x1: 850, y1: 700 };
  E.scene({
    name: 'Elektrik akımı', concept: 'Akımın nitelikleri', from: 'flow', to: 'dir', trFrom: [550, 500],
    draw(ctx, t) {
      const sf = E.s('flow'), sd = E.s('dir');
      // anahtar: flow'da kapanır; dir'de açılır, sonra yeniden kapanır
      let sw = E.se(t, sf + 1.2, sf + 1.8);
      if (t > sd) sw = 1 - E.se(t, sd + 0.3, sd + 0.8) + E.se(t, sd + 3.4, sd + 3.9);
      const on = sw > 0.97;
      F19.loop(ctx, Object.assign({ cells: 2, sw, lit: on ? 1 : 0, k: E.se(t, sf, sf + 1.2) }, BOX));
      F19.shimmer(ctx, BOX, on && t < sd + 0.4 ? E.se(t, sf + 1.8, sf + 2.6) : 0, t);
      E.inkText(ctx, 'kapalı devre → yükler düzenli hareket eder', 1370, 330, t, sf + 2.4, sd + 0.2, { size: 42, align: 'center' });
      E.inkText(ctx, '= elektrik akımı', 1370, 410, t, sf + 3.6, sd + 0.2, { size: 54, align: 'center', color: U.AMBER });
      E.inkText(ctx, 'anahtar açık → akım yok', 1370, 330, t, sd + 0.8, sd + 3.4, { size: 46, align: 'center' });
      if (t > sd + 4) {
        F19.arrows(ctx, BOX, E.se(t, sd + 4, sd + 6));
        E.inkText(ctx, 'akımın yönü:', 1370, 330, t, sd + 4.2, 1e9, { size: 44, align: 'center' });
        E.inkText(ctx, 'pilin + ucundan dış devre', 1370, 400, t, sd + 4.8, 1e9, { size: 44, align: 'center', color: U.AMBER });
        E.inkText(ctx, 'üzerinden − ucuna', 1370, 460, t, sd + 5.2, 1e9, { size: 44, align: 'center', color: U.AMBER });
      }
      U.damla(ctx, t, { x: 1400, y: 900, s: 1.1, view: 'q3', flip: true, expr: t > sd && t < sd + 3.4 ? 'surprised' : 'curious', look: [-0.8, -0.2], arms: [[-1, 1.9], [1, 0.4]] });
    }
  });
  const SAFE_A = { icon: (c) => { CK.battery(c, -18, 30, 0.42); c.save(); c.translate(26, -18); c.scale(0.28, 0.28); U.meter(c, 0, 0, 1, 'A', ''); c.restore(); }, mark: 'x', a: 'Ampermetreyi pile doğrudan bağlama!', b: 'Bu bir kısa devredir; alet ve pil zarar görür.', red: true };
  E.scene({
    name: 'Güvenlik', concept: 'Elektrik güvenliği', from: 'safety', to: 'safety', trFrom: [1300, 500],
    draw(ctx, t) {
      const s0 = E.s('safety');
      CK.safetyCard(ctx, t, s0 + 0.5, 640, 130, { w: 1100, h: 770, gap: 165, items: [U.SAFE.outlet, SAFE_A, U.SAFE.short, U.SAFE.adult].map((it, i) => Object.assign({}, it, { at: i * 1.7 })) });
      U.damla(ctx, t, { x: 330, y: 900, s: 1.3, view: 'q3', expr: 'determined', look: [0.8, -0.2], arms: [[-1, 0.35], [1, [60, -170]]] });
    }
  });
  // ampermetre bölümü
  const ROWS = [['Pil', 'Ampul (seri)', 'Akım'], ['2', '1', '0,30 A'], ['2', '2', '0,20 A'], ['1', '1', '0,20 A']];
  E.scene({
    name: 'Ampermetre', concept: 'Akımı ampermetre ile ölçme; amper (A)', from: 'ammeter', to: 'adef', trFrom: [550, 500],
    draw(ctx, t) {
      const sa = E.s('ammeter'), sm = E.s('amp'), ss = E.s('same'), sv = E.s('avar'), sdf = E.s('adef');
      // aktif yapılandırma (avar'da satır satır)
      let cells = 2, n = 1, rd = '0,30 A';
      const r2 = sv + 2.2, r3 = sv + 5.2;
      if (t > r2) { n = 2; rd = '0,20 A'; } if (t > r3) { n = 1; cells = 1; rd = '0,20 A'; }
      const Apos = t > ss + 1.2 && t < sv ? 'right' : 'top';
      const cA = Math.min(E.se(t, sa + 0.4, sa + 1.2), t > ss + 0.6 && t < ss + 1.2 ? 1 - E.se(t, ss + 0.6, ss + 1.0) : 1, t > ss + 1.2 && t < ss + 2 ? E.se(t, ss + 1.2, ss + 1.8) : 1);
      const bright = n === 2 ? 0.45 : cells === 1 ? 0.45 : 1;
      F19.loop(ctx, Object.assign({ cells, n, lit: bright }, BOX));
      if (cA > 0) E.layer(ctx, cA, c => { const p = Apos === 'top' ? [BOX.x0 + 120, BOX.y0] : [BOX.x1, (BOX.y0 + BOX.y1) / 2]; CK.sym(c, 'A', p[0], p[1], 1.25); });
      E.inkText(ctx, 'ampermetre: devreye seri', 550, 230, t, sa + 1.4, sm, { size: 46, align: 'center', color: U.AMBER });
      // büyük alet
      const mA = E.se(t, sm, sm + 0.6);
      if (mA > 0 && t < sdf + 0.3) E.layer(ctx, Math.min(mA, 1 - E.se(t, sdf - 0.2, sdf + 0.3)), c => {
        U.meter(c, 1180, 470, 1.15, 'A', rd, { name: 'ampermetre' });
        if (t < sv) { U.txt(c, 'birim: amper (A)', 1600, 360, { size: 46, align: 'center', color: U.AMBER }); }
        if (t > ss + 2 && t < sv) U.txt(c, 'başka bir yerde: yine 0,30 A', 1600, 460, { size: 38, align: 'center' });
        if (t > sv) U.grid(c, 1400, 250, [120, 200, 170], 72, ROWS, r => E.seg(t, r === 1 ? sv + 0.3 : r === 2 ? r2 : r3, (r === 1 ? sv + 0.3 : r === 2 ? r2 : r3) + 0.8), { hs: 32, fs: 36 });
      });
      // operasyonel tanım kartı
      const dk = E.se(t, sdf + 0.2, sdf + 0.9);
      if (dk > 0) E.layer(ctx, dk, c => {
        CK.card(c, 990, 250, 820, 420, { seed: 1920, fill: '#FAF6EC' });
        U.txt(c, 'Operasyonel tanım', 1400, 320, { size: 40, align: 'center', color: U.AMBER });
        P.write(c, 'Elektrik akımı:', 1050, 410, E.seg(t, sdf + 0.8, sdf + 1.8), { size: 50 });
        P.write(c, 'ampermetre ile ölçülen,', 1050, 490, E.seg(t, sdf + 1.6, sdf + 2.8), { size: 46, weight: 400 });
        P.write(c, 'birimi amper (A) olan büyüklük.', 1050, 560, E.seg(t, sdf + 2.6, sdf + 3.8), { size: 46, weight: 400 });
      });
      U.damla(ctx, t, { x: 560, y: 960, s: 0.72, view: 'q3', expr: 'curious', look: [0.6, -0.6], arms: [[-1, 0.35], [1, 2.0]] });
    }
  });
})();
