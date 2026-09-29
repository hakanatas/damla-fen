// engine.js — deterministic master timeline, camera, transitions, overlays.
// Every frame is a pure function of time: renderFrame(t). No state carried between frames.
(function (G) {
  const { PAL, label, line, wash, circlePts, stroke, rng, noiseFn } = G.INK;
  const E = { W: 1920, H: 1080, fps: 30, scenes: [], captions: 'off' };

  // ---------- math ----------
  E.clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  E.lerp = (a, b, t) => a + (b - a) * t;
  E.mix = (p, q, t) => [E.lerp(p[0], q[0], t), E.lerp(p[1], q[1], t)];
  E.ease = {
    io: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    out: t => 1 - Math.pow(1 - t, 3), in: t => t * t * t,
    back: t => { const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
    sine: t => 0.5 - Math.cos(Math.PI * t) / 2
  };
  E.seg = (t, a, b) => E.clamp((t - a) / (b - a));
  E.se = (t, a, b, fn = 'io') => E.ease[fn](E.seg(t, a, b));   // eased segment
  // beat helpers (TIMING from tools/tts.py)
  E.B = id => { const b = G.TIMING.beats[id]; if (!b) throw new Error('beat? ' + id); return b; };
  E.s = (id, off = 0) => E.B(id).s + off;
  E.e = (id, off = 0) => E.B(id).e + off;
  E.speechEnd = id => E.B(id).s + E.B(id).speech;

  // ---------- character helpers ----------
  E.blink = (t, seed = 1) => { const r = rng(seed); const per = 3.1 + r() * 1.6, ph = r() * per; const x = ((t + ph) % per) / per * per; return x < 0.16 ? Math.sin(x / 0.16 * Math.PI) : 0; };
  E.breath = (t, a = 0.018) => 1 + Math.sin(t * 2.3) * a;
  E.talk = (t) => { // mouth opening while Damla's line is playing
    if (G.TIMING.silent) return 0;
    for (const [id, b] of Object.entries(G.TIMING.beats)) {
      if (b.speech > 0 && t >= b.s + 0.05 && t < b.s + b.speech - 0.12) {
        const nz = noiseFn(b.i * 7 + 3); const v = 0.5 + 0.5 * Math.sin(t * 17 + nz(t * 3) * 3);
        return E.clamp(0.15 + v * 0.85 * (0.6 + 0.4 * Math.abs(nz(t * 2.1))));
      }
    }
    return 0;
  };
  E.walk = (ph, stride = 12, lift = 9) => [
    [Math.sin(ph) * stride, -Math.max(0, Math.cos(ph)) * lift],
    [Math.sin(ph + Math.PI) * stride, -Math.max(0, Math.cos(ph + Math.PI)) * lift]
  ];

  // ---------- camera ----------
  E.cam = (ctx, c) => { // c: {x,y,z,r}  world point (x,y) at screen center
    const z = c.z ?? 1, r = c.r ?? 0;
    ctx.translate(E.W / 2, E.H / 2); ctx.rotate(r); ctx.scale(z, z); ctx.translate(-(c.x ?? E.W / 2), -(c.y ?? E.H / 2));
  };
  E.camLerp = (a, b, k) => ({ x: E.lerp(a.x, b.x, k), y: E.lerp(a.y, b.y, k), z: Math.exp(E.lerp(Math.log(a.z), Math.log(b.z), k)), r: E.lerp(a.r ?? 0, b.r ?? 0, k) });

  // ---------- alpha layers (nested fades that also work for helpers setting globalAlpha) ----------
  const layers = []; let depth = 0;
  E.layer = (ctx, alpha, fn) => {
    if (alpha <= 0.001) return; if (alpha >= 0.999) { fn(ctx); return; }
    if (!layers[depth]) { const c = document.createElement('canvas'); c.width = E.W; c.height = E.H; layers[depth] = c; }
    const lc = layers[depth].getContext('2d'); depth++;
    lc.setTransform(1, 0, 0, 1, 0, 0); lc.clearRect(0, 0, E.W, E.H); lc.setTransform(ctx.getTransform());
    try { fn(lc); } finally { depth--; }
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = alpha; ctx.drawImage(layers[depth], 0, 0); ctx.restore();
  };

  // ---------- paper cache ----------
  let paperCv = null;
  E.paper = (ctx) => {
    if (!paperCv) { paperCv = document.createElement('canvas'); paperCv.width = E.W; paperCv.height = E.H; G.INK.paper(paperCv.getContext('2d'), E.W, E.H, 12); }
    ctx.drawImage(paperCv, 0, 0);
  };

  // ---------- scene registry ----------
  E.scene = (def) => { E.scenes.push(def); };
  E.bounds = sc => [E.s(sc.from), E.e(sc.to)];
  E.sceneAt = t => { let cur = E.scenes[0]; for (const sc of E.scenes) if (t >= E.s(sc.from)) cur = sc; return cur; };

  // ---------- ink text overlays ----------
  function inkText(ctx, txt, x, y, o, k) { // k: 0..1 reveal
    ctx.save();
    ctx.font = `${o.weight ?? 700} ${o.size ?? 54}px ${o.font ?? 'Kalam'}`; ctx.textAlign = o.align ?? 'left'; ctx.textBaseline = 'alphabetic';
    const blur = (1 - k) * 10; ctx.filter = blur > 0.3 ? `blur(${blur.toFixed(1)}px)` : 'none';
    ctx.globalAlpha = E.clamp(k * 1.3) * (o.alpha ?? 1); ctx.fillStyle = o.color ?? PAL.ink;
    ctx.translate(x, y); ctx.rotate(o.rot ?? -0.015); ctx.fillText(txt, 0, 0);
    ctx.restore();
  }
  E.inkText = (ctx, txt, x, y, t, t0, t1, o = {}) => {
    const fi = o.fade ?? 0.6; if (t < t0 || t > t1) return;
    const k = Math.min(E.ease.out(E.seg(t, t0, t0 + fi)), 1 - E.ease.in(E.seg(t, t1 - fi * 0.7, t1)));
    inkText(ctx, txt, x, y, o, k);
  };
  // keyword tag (top-left notebook tab) for beats with `key`
  function drawKeyword(ctx, t) {
    const keyed = G.NARRATION.beats.filter(b => b.key);
    keyed.forEach((b, idx) => {
      const B = E.B(b.id), nx = keyed[idx + 1];
      let t1 = Math.max(B.e, B.s + 4.5) + 1.2;
      if (nx) t1 = Math.min(t1, E.B(nx.id).s + 0.3);   // bir sonraki etiket gelmeden kaybol (üst üste binme yok)
      const t0 = B.s + 0.3; if (t < t0 || t > t1) return;
      const k = Math.min(E.ease.out(E.seg(t, t0, t0 + 0.7)), 1 - E.ease.in(E.seg(t, t1 - 0.4, t1)));
      ctx.save(); ctx.font = '700 50px Kalam'; const w = ctx.measureText(b.key).width;
      const x = 70, y = 64;
      ctx.globalAlpha = k;
      const tag = [[x - 26, y - 6], [x + w + 30, y - 10], [x + w + 22, y + 74], [x - 22, y + 78], [x - 26, y - 6]];
      ctx.fillStyle = 'rgba(251,248,241,0.92)'; ctx.beginPath(); tag.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.fill();
      stroke(ctx, tag, { w: 2.2, closed: true, seed: 5 + b.id.length, dry: false });
      G.INK.hatch(ctx, x - 20, y + 2, 10, 60, { n: 1, ang: 1.57, w: 5, alpha: 0.8, color: PAL.light, seed: 3 });
      ctx.restore();
      inkText(ctx, b.key, x + 4, y + 52, { size: 50 }, k);
    });
  }
  // subtitles (optional; OFF in clean export, a burned-in .srt version is made separately)
  function drawSubs(ctx, t) {
    for (const b of G.NARRATION.beats) {
      if (!b.text) continue; const B = E.B(b.id); if (t < B.s || t > B.s + B.speech + 0.3) continue;
      const k = Math.min(E.seg(t, B.s, B.s + 0.25), 1 - E.seg(t, B.s + B.speech + 0.05, B.s + B.speech + 0.3));
      const words = b.text.split(' '); const lines = []; let cur = '';
      ctx.font = '700 50px Kalam';
      for (const w of words) { const tr = (cur + ' ' + w).trim(); if (ctx.measureText(tr).width > 1560 && cur) { lines.push(cur); cur = w; } else cur = tr; }
      lines.push(cur);
      const LH = 60, y0 = E.H - 42 - (lines.length - 1) * LH, wmax = Math.max(...lines.map(l => ctx.measureText(l).width));
      ctx.save(); ctx.globalAlpha = k;
      ctx.fillStyle = 'rgba(250,246,236,0.88)'; const px = 34, top = y0 - 52, h = (lines.length - 1) * LH + 74;
      ctx.beginPath(); ctx.roundRect(E.W / 2 - wmax / 2 - px, top, wmax + 2 * px, h, 18); ctx.fill();
      ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink;
      lines.forEach((l, i) => ctx.fillText(l, E.W / 2, y0 + i * LH));
      ctx.restore();
    }
  }

  // ---------- ink-blot transition ----------
  let offCv = null;
  function blotPath(ctx, cx, cy, r, seed, keep) {
    const nz = noiseFn(seed); if (!keep) ctx.beginPath();
    for (let i = 0; i <= 90; i++) { const a = i / 90 * Math.PI * 2; const rr = r * (1 + nz(a * 1.3) * 0.18 + nz(a * 5) * 0.05); i ? ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr) : ctx.moveTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); }
    ctx.closePath();
  }

  function drawScene(ctx, sc, t) {
    const [a, b] = E.bounds(sc);
    ctx.save(); E.paper(ctx); sc.draw(ctx, t, t - a, b - a); ctx.restore();
  }

  E.renderFrame = (ctx, t) => {
    G.INK.boil = Math.floor(t * 8) % 3;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const sc = E.sceneAt(t);
    drawScene(ctx, sc, t);
    // transition into this scene: first TR seconds, blot grows revealing new scene over previous
    const idx = E.scenes.indexOf(sc), TR = sc.tr ?? 1.1;
    const s0 = E.s(sc.from);
    if (idx > 0 && t < s0 + TR) {
      const k = E.ease.io(E.seg(t, s0, s0 + TR));
      if (!offCv) { offCv = document.createElement('canvas'); offCv.width = E.W; offCv.height = E.H; }
      const oc = offCv.getContext('2d'); oc.setTransform(1, 0, 0, 1, 0, 0);
      const prev = E.scenes[idx - 1]; drawScene(oc, prev, Math.min(t, E.e(prev.to) - 0.001));
      // previous scene stays outside the growing blot
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
      const [cx, cy] = sc.trFrom ?? [E.W / 2, E.H / 2];
      const R = k * 1.35 * Math.hypot(E.W, E.H) * 0.62;
      ctx.beginPath(); ctx.rect(0, 0, E.W, E.H); blotPath(ctx, cx, cy, R, idx * 11, true); ctx.clip('evenodd');
      ctx.drawImage(offCv, 0, 0); ctx.restore();
      ctx.save(); ctx.globalAlpha = 0.55 * Math.sin(k * Math.PI); blotPath(ctx, cx, cy, R, idx * 11); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 6; ctx.stroke(); ctx.restore();
    }
    // fade in/out of whole film
    const T = G.TIMING.total;
    const fade = Math.max(1 - E.seg(t, 0, 0.8), E.seg(t, T - 1.5, T));
    if (fade > 0) { ctx.save(); ctx.globalAlpha = fade; ctx.fillStyle = PAL.paper; ctx.fillRect(0, 0, E.W, E.H); ctx.restore(); }
    drawKeyword(ctx, t);
    if (E.captions === 'on') drawSubs(ctx, t);
  };

  G.E = E;
})(window);
