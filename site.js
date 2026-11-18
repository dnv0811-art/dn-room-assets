/* Dmitrii Nesterov, the room (built from index.html). Needs window.DN_BASE = the folder these files are in. */
(() => {
  const B = window.DN_BASE || '';
  const markup = "<canvas id=\"scene\"></canvas>\n\n<div id=\"loader\" aria-live=\"polite\">\n  <canvas id=\"sigCv\"></canvas><canvas id=\"sigCrt\"></canvas>\n  <div class=\"osd ch\" id=\"sigCh\">CH 01</div>\n  <div class=\"osd mid\">\n    <div class=\"cells\" id=\"sigCells\" role=\"progressbar\" aria-label=\"Loading\"></div>\n  </div>\n  <div class=\"osd bl\" id=\"sigState\">AUTO SEARCH</div>\n</div>\n\n<div class=\"act-hint\" id=\"actHint\" aria-hidden=\"true\"></div>\n<div class=\"tape-layer\" id=\"tapeLayer\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Project tape\" aria-hidden=\"true\">\n  <div class=\"tside\" aria-hidden=\"true\"></div><div class=\"tside\" aria-hidden=\"true\"></div><div class=\"tside\" aria-hidden=\"true\"></div>\n  <div class=\"tcase\">\n    <div class=\"tape\"><img src=\"projects/vhs-c.png\" alt=\"\"><div class=\"label\"><span id=\"tapeLabel\"></span></div><div class=\"stick-pin\"><button class=\"sticker\" id=\"tapeSticker\" type=\"button\"><span>Play the site</span><svg class=\"arr\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M4.5 19.2c3.1-3.4 6.6-7.6 13.6-13.9M10.6 5.6c2.4-.5 5-.6 7.6-.4.4 2.6.2 5.2-.3 7.9\"/></svg></button></div></div>\n    <div class=\"sleeve\" id=\"tapeSleeve\"></div>\n  </div>\n  <div class=\"tape-tip\">Tap the cover to read</div>\n  <div class=\"tape-nav\"><button id=\"tapePrev\" aria-label=\"Previous tape\">\u2190 Prev</button><button class=\"tape-close\" id=\"tapeClose\">Put it back \u2715</button><button id=\"tapeNext\" aria-label=\"Next tape\">Next \u2192</button></div>\n</div>\n<div class=\"vid-layer\" id=\"vidLayer\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Project video\" aria-hidden=\"true\">\n  <div class=\"vid-box\"><video id=\"vidEl\" playsinline controls preload=\"none\"></video></div>\n  <button class=\"vid-close\" id=\"vidClose\" type=\"button\">Close \u2715</button>\n</div>\n<div class=\"pager-layer\" id=\"pagerLayer\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Contacts\" aria-hidden=\"true\">\n  <div class=\"pager\" id=\"pager\">\n    <img src=\"objects/pager-c.png\" alt=\"\" id=\"pagerImg\">\n    <div class=\"pg-lcd\" aria-live=\"polite\"><div class=\"l1\"><b id=\"pgHead\"></b><b id=\"pgIdx\"></b></div><div class=\"l2\" id=\"pgLine\"><span id=\"pgText\"></span></div></div>\n    <i class=\"pg-led\" aria-hidden=\"true\"></i>\n    <button class=\"pg-btn\" data-a=\"prev\" style=\"left:9.9%;top:55.2%;width:20.6%;height:11%\" aria-label=\"Previous contact\"></button>\n    <button class=\"pg-btn\" data-a=\"next\" style=\"left:30.9%;top:55.2%;width:20.1%;height:11%\" aria-label=\"Next contact\"></button>\n    <button class=\"pg-btn\" data-a=\"copy\" style=\"left:51.5%;top:55.2%;width:22%;height:11%\" aria-label=\"Copy\"></button>\n    <button class=\"pg-btn\" data-a=\"prev\" style=\"left:81%;top:10.3%;width:9.6%;height:26.4%\" aria-label=\"Previous contact\"></button>\n    <button class=\"pg-btn\" data-a=\"next\" style=\"left:81%;top:38%;width:9.6%;height:26.2%\" aria-label=\"Next contact\"></button>\n    <button class=\"pg-btn\" data-a=\"open\" style=\"left:73.5%;top:73.7%;width:20.1%;height:16.7%\" aria-label=\"Open\"></button>\n    <button class=\"pager-close\" id=\"pagerClose\">Put away \u2715</button>\n  </div>\n</div>\n<div style=\"--i:0\" class=\"ui name\" id=\"logo\" aria-label=\"Find my name: D______ N_______\">D______ N_______</div>\n<div style=\"--i:1\" class=\"ui status\"><span class=\"main\"><span class=\"lead\">Open for new</span><span class=\"swap\" id=\"statusWord\">missions</span></span><span class=\"alt\">Esc \u2014 back to the room</span></div>\n<div style=\"--i:2\" class=\"ui topright\">\n  <a class=\"contacts\" href=\"mailto:nesterov.spain@gmail.com\">Contacts</a>\n  <button class=\"tilt\" id=\"tilt\" aria-pressed=\"false\">Tilt off</button>\n  <button class=\"sound\" id=\"sound\" aria-label=\"Sound\" aria-pressed=\"false\">\n    <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\">\n      <path d=\"M4 9.5h3.2L12 5.5v13l-4.8-4H4z\"/>\n      <path class=\"w w1\" d=\"M15.5 9.2a4 4 0 0 1 0 5.6\"/>\n      <path class=\"w w2\" d=\"M18 6.8a7.5 7.5 0 0 1 0 10.4\"/>\n      <path class=\"x\" d=\"M16 10l4 4M20 10l-4 4\"/>\n    </svg><span class=\"lbl\">Sound off</span>\n  </button>\n</div>\n<div style=\"--i:6\" class=\"ui side l\" id=\"clockBcn\">BCN 00:00:00</div>\n<button style=\"--i:3\" class=\"ui side r legal-link\" id=\"legalLink\" aria-haspopup=\"dialog\" aria-label=\"Intellectual property notice\">IP notice</button>\n<div style=\"--i:5\" class=\"ui skills\"><span>Creative low_code<br>developer</span><span>UX/UI designer</span></div>\n<div class=\"ui thought\" id=\"thought\" aria-live=\"polite\"></div>\n<button style=\"--i:4\" class=\"ui memories\" id=\"memories\" aria-haspopup=\"dialog\" aria-label=\"Open memories\">\n  <span class=\"mem-pic\"><img alt=\"\" id=\"memImg\"><i class=\"empty\"></i></span>\n  <span class=\"mem-txt\"><i id=\"memCount\">0/17</i> Memories found <span class=\"mem-arr\">\u2197</span></span>\n</button>\n<div class=\"nb-layer\" id=\"nbLayer\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Memories\" aria-hidden=\"true\">\n  <div class=\"nb\" id=\"nb\">\n    <div class=\"nb-board l\"></div><div class=\"nb-board r\"></div>\n    <div class=\"nb-page l\" id=\"nbL\"></div>\n    <div class=\"nb-page r\" id=\"nbR\"></div>\n    <div class=\"nb-spine\" aria-hidden=\"true\"></div>\n    <div class=\"nb-shade\" id=\"nbShade\" aria-hidden=\"true\"></div>\n    <canvas class=\"nb-cover\" id=\"nbCover\" aria-hidden=\"true\"></canvas>\n    <button class=\"nb-btn nb-prev\" id=\"nbPrev\" aria-label=\"Previous pages\">&larr; back</button>\n    <button class=\"nb-btn nb-next\" id=\"nbNext\" aria-label=\"Next pages\">next &rarr;</button>\n    <button class=\"nb-close\" id=\"nbClose\">Put away \u2715</button>\n  </div>\n  <div class=\"nb-sheet\" id=\"nbSheet\"></div>\n  <button class=\"nb-close nb-list-close\" id=\"nbListClose\">Put away \u2715</button>\n</div>\n<div class=\"legal\" id=\"legal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"legalTitle\" aria-hidden=\"true\">\n  <div class=\"legal-card\">\n    <button class=\"legal-close\" id=\"legalClose\">Close \u2715</button>\n    <div class=\"kicker\">Intellectual property notice</div>\n    <h2 id=\"legalTitle\">A note on the objects</h2>\n    <p>This room is a personal creative space, a visual representation of the designer's interests, inspirations, and cultural influences.</p>\n    <p>Some of the objects featured here are inspired by, reference, or depict products, characters, brands, artworks, and fictional universes created by their respective owners.</p>\n    <p>All trademarks, character names, product designs, and referenced intellectual property belong to their respective owners. Their appearance in this portfolio is intended solely to communicate personal interests, creative inspiration, and the stories behind the objects.</p>\n    <p>No affiliation, sponsorship, endorsement, or partnership with any of the referenced brands, creators, or rights holders is claimed or implied.</p>\n    <p>We sincerely appreciate the creators, artists, designers, studios, and companies whose work has shaped the culture and inspired this project.</p>\n    <p>The REC button on the TV can show your camera on its screen. That only happens after you allow it in your browser; the picture stays on your device, it is never recorded, stored or sent anywhere, and the camera turns off as soon as you stop it.</p>\n    <p>All rights to third-party intellectual property remain with their respective owners. If you are a rights holder and have concerns regarding any material featured here, please <a href=\"#\" id=\"legalContact\">contact us</a>.</p>\n  </div>\n</div>\n<nav class=\"ui gal\" aria-label=\"Projects\">\n  <button id=\"prev\" aria-label=\"Previous project\">\u2190 Prev</button>\n  <a id=\"gLink\" href=\"#\" aria-label=\"Check out the project\"><span class=\"idx\" id=\"gIdx\">01 / 05</span><span class=\"nm\" id=\"gName\">\u2014</span><span class=\"arr\">\u2197</span></a>\n  <button id=\"next\" aria-label=\"Next project\">Next \u2192</button>\n</nav>\n<div class=\"paper-layer\" id=\"paper\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Note\" aria-hidden=\"true\">\n  <div class=\"sr-only\" id=\"paperText\"></div>\n  <div class=\"polaroid\" id=\"polaroid\" aria-hidden=\"true\">\n    <div class=\"pl-photo\"><img alt=\"\" id=\"plImg\"><i class=\"dev\"></i></div>\n    <div class=\"pl-caption\"><h3 id=\"plTitle\"></h3><div id=\"plText\"></div></div>\n  </div>\n  <div class=\"gold-pl\" id=\"goldPl\" aria-hidden=\"true\"><i id=\"goldPlPhoto\"></i></div>\n  <div class=\"paper-obj\" id=\"paperObj\"><img alt=\"\" id=\"paperObjImg\">\n    <div class=\"mini-tv\" aria-hidden=\"true\">\n      <img class=\"mt-body\" src=\"objects/tv.png\" alt=\"\">\n      <div class=\"mt-screen\"><img alt=\"\" id=\"miniTvImg\"><i class=\"mt-scan\"></i><i class=\"mt-roll\"></i><i class=\"mt-glare\"></i><i class=\"mt-reflect\"></i><span class=\"mt-osd\">PLAY &#9654;</span></div>\n    </div>\n  </div>\n  <div class=\"paper-actions\" id=\"paperActions\">\n    <a class=\"paper-save\" id=\"paperSave\" download=\"Dmitrii-Nesterov.vcf\">Save contact \u2193</a>\n    <button class=\"paper-close\" id=\"paperClose\">Fold it back \u2715</button>\n  </div>\n</div>\n\n\n\n<nav class=\"vp-nav\" id=\"vpNav\" aria-label=\"Tape controls\"><button data-vp=\"rew\" aria-label=\"Rewind 10 seconds\">\u25c0\u25c0 Rew</button><button data-vp=\"play\" id=\"vpPlay\">\u275a\u275a Pause</button><button data-vp=\"ff\" aria-label=\"Fast forward 10 seconds\">FF \u25b6\u25b6</button><button data-vp=\"stop\" class=\"vp-stop\"><span class=\"t\">Eject \u23cf</span><span class=\"c\">Turn off camera &amp; stop recording</span></button></nav>\n<div class=\"ft-wrap\" id=\"ftWrap\" aria-hidden=\"true\"><div class=\"ft-gap\" id=\"ftGap\"></div><div class=\"ft\" id=\"ft\"><div class=\"ft-top\"><img src=\"projects/vhs-c.png\" alt=\"\"><div class=\"label\"><span id=\"ftLabel\"></span></div><div class=\"stick-pin\"><span class=\"sticker\" id=\"ftSticker\"><span>Play the site</span><svg class=\"arr\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M4.5 19.2c3.1-3.4 6.6-7.6 13.6-13.9M10.6 5.6c2.4-.5 5-.6 7.6-.4.4 2.6.2 5.2-.3 7.9\"/></svg></span></div></div><div class=\"ft-front\"></div></div></div>\n<div class=\"tv-tip\" id=\"tvTip\" aria-hidden=\"true\"><div class=\"card\">Push the buttons</div></div>\n<div class=\"tag\" id=\"tag\"><svg viewBox=\"0 0 100 100\" aria-hidden=\"true\"><path id=\"tagRing\"/></svg><i id=\"tagText\">Explore<br>the TV</i></div>";
  // the room's markup goes straight into <body> (not into Tilda's block), its pictures from the asset folder
  document.body.insertAdjacentHTML('afterbegin', markup.replace(/(src|href)="((?:objects|projects)\/)/g, '$1="' + B + '$2'));
})();
/* =====================================================================
   Crumpled paper note (WebGL).
   A finely subdivided sheet is bent by procedural "fold lines" (zig-zag
   creases in random directions). The crumple amount squeezes the sheet
   into a wad; unfolding releases it from the centre outwards, and the
   creases stay faintly visible on the flat sheet, like real paper.
   API: CrumplePaper.open(note, onClosed?)  CrumplePaper.close()
        note = { title, text: [..], sig, stamp }
   ===================================================================== */
(() => {
  const layer = document.getElementById('paper');
  const cv = document.createElement('canvas');
  cv.className = 'paper-gl';
  layer.prepend(cv);
  const gl = cv.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: true });
  if (!gl) { window.CrumplePaper = null; return; }
  gl.getExtension('OES_standard_derivatives');

  let PW = 1;                        // sheet width (world units); the full-screen sheet changes it
  let PH = 1.1;                      // a bit squarer than a letter; long notes make the sheet taller
  const GX = 100, GY = 126;          // grid resolution

  const VS = `
attribute vec2 aUv;
uniform mat4 uMV, uP;
uniform float uC, uSeed, uResid;
uniform vec2 uSize;
varying vec2 vUv; varying vec3 vPos;
float h1(float n){ return fract(sin(n) * 43758.5453); }
float tri(float x){ return abs(fract(x) - .5) - .25; }
// sum of zig-zag creases running in random directions
float folds(vec2 p, float s){
  float h = 0.;
  for (int i = 0; i < 13; i++) {
    float fi = float(i) + s;
    float a = h1(fi * 12.9898) * 3.14159;
    vec2 n = vec2(cos(a), sin(a));
    float f = .55 + h1(fi * 78.233) * 2.2;
    float w = .12 / (1. + float(i) * .3);
    h += tri(dot(p, n) * f + h1(fi * 3.7)) * w;
  }
  return h;
}
void main(){
  vec2 q = (aUv - .5) * uSize;
  float r = clamp(length(q / (uSize * .5)) / 1.414, 0., 1.);
  // centre opens first, corners last
  float c = clamp(uC * 1.4 - (1. - r) * .4, 0., 1.);
  c = c * c * (3. - 2. * c);
  float h = folds(q, uSeed);
  vec2 warp = vec2(folds(q + 3.1, uSeed + 5.), folds(q - 7.3, uSeed + 9.));
  vec2 xy = q * mix(1., .24, c) + warp * c * .85;
  float z = h * mix(uResid, .85, c) + c * .2 * (1. - r * r);
  vUv = aUv;
  vec4 mv = uMV * vec4(xy, z, 1.);
  vPos = mv.xyz;
  gl_Position = uP * mv;
}`;

  const FS = `
#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform sampler2D uTex;
uniform float uAlpha;
uniform vec3 uBack;
uniform float uGold, uTime;
varying vec2 vUv; varying vec3 vPos;
void main(){
  vec3 N = normalize(cross(dFdx(vPos), dFdy(vPos)));
  vec3 V = normalize(-vPos);
  bool front = dot(N, V) > 0.;
  if (!front) N = -N;
  vec3 L = normalize(vec3(-.45, .55, .75));
  float d = max(dot(N, L), 0.);
  float flatD = L.z;
  vec3 base = gl_FrontFacing ? texture2D(uTex, vec2(vUv.x, 1. - vUv.y)).rgb : uBack;
  vec3 H = normalize(L + V);
  float sp = pow(max(dot(N, H), 0.), mix(30., 18., uGold)) * mix(.1, .55, uGold);
  // exaggerate small slopes so the crease network reads on the flat sheet
  float shade = clamp(1. + (d - flatD) * mix(2.4, 3.2, uGold), .3, 1.3);
  vec3 col = base * shade + sp * mix(vec3(1.), vec3(1., .86, .52), uGold);
  // gold foil: a slow sheen sweeping across the card
  float band = fract((vUv.x * .8 + (1. - vUv.y) * .5) * .7 - uTime * .12);
  col += uGold * vec3(1., .9, .6) * .28 * smoothstep(.08, 0., abs(band - .5)) * (gl_FrontFacing ? 1. : 0.);
  col *= vec3(1.03, 1., .95);
  gl_FragColor = vec4(col * uAlpha, uAlpha);
}`;

  function sh(t, s) { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o);
    if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o)); return o; }
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog); gl.useProgram(prog);
  const U = {};
  ['uMV', 'uP', 'uC', 'uSeed', 'uSize', 'uTex', 'uAlpha', 'uResid', 'uBack', 'uGold', 'uTime'].forEach(n => U[n] = gl.getUniformLocation(prog, n));

  // grid mesh
  const uv = new Float32Array((GX + 1) * (GY + 1) * 2);
  let k = 0;
  for (let y = 0; y <= GY; y++) for (let x = 0; x <= GX; x++) { uv[k++] = x / GX; uv[k++] = 1 - y / GY; }
  const idx = new Uint16Array(GX * GY * 6);
  k = 0;
  for (let y = 0; y < GY; y++) for (let x = 0; x < GX; x++) {
    const a = y * (GX + 1) + x, b = a + 1, c = a + GX + 1, d = c + 1;
    idx[k++] = a; idx[k++] = c; idx[k++] = b; idx[k++] = b; idx[k++] = c; idx[k++] = d;
  }
  const vb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, vb); gl.bufferData(gl.ARRAY_BUFFER, uv, gl.STATIC_DRAW);
  const ib = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
  const aUv = gl.getAttribLocation(prog, 'aUv');
  gl.enableVertexAttribArray(aUv); gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 0, 0);

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  /* ---------- paper texture with the note drawn on it ---------- */
  const TW = 1000, BASE_TH = 820, MAX_TH = 2600;
  let REF_PH = 0;   // the tallest note's height / width: every note is shown at the scale that one needs, so the text is the same size everywhere
  let TH = BASE_TH;
  const pc = document.createElement('canvas'); pc.width = TW; pc.height = TH;
  const px = pc.getContext('2d');
  let grain = null;
  // a word may carry one hidden letter written as {x}: it gets circled by hand on the sheet
  const clean = w => w.replace(/[{}]/g, '');
  function wrapWords(text, maxW) {
    const words = text.split(' '), lines = []; let line = [];
    words.forEach(w => {
      const t = [...line, w].map(clean).join(' ');
      if (px.measureText(t).width > maxW && line.length) { lines.push(line); line = [w]; } else line.push(w);
    });
    if (line.length) lines.push(line);
    return lines;
  }
  function inkCircle(cx, cy, rx, ry, color) {
    px.save(); px.strokeStyle = color; px.lineWidth = 3.2; px.lineCap = 'round';
    for (let loop = 0; loop < 2; loop++) {
      px.beginPath();
      const a0 = -1.2 + loop * .5, n = 28;
      for (let i = 0; i <= n; i++) {
        const a = a0 + (Math.PI * 2 + .45) * i / n, w = 1 + (Math.random() - .5) * .08 + loop * .06;
        const x = cx + Math.cos(a) * rx * w, y = cy + Math.sin(a) * ry * w;
        i ? px.lineTo(x, y) : px.moveTo(x, y);
      }
      px.globalAlpha = loop ? .55 : .9; px.stroke();
    }
    px.restore();
  }
  function drawLine(words, x, y, ink, mark) {
    words.forEach((w, wi) => {
      const m = w.match(/^(.*)\{(.)\}(.*)$/);
      const parts = m ? [m[1], m[2], m[3]] : [w];
      parts.forEach((part, pi) => {
        const isMark = m && pi === 1;
        if (isMark) {
          px.save(); px.fillStyle = mark; px.font = '700 34px Inter, sans-serif';
          const cw = px.measureText(part).width;
          px.fillText(part, x, y);
          inkCircle(x + cw / 2, y - 11, Math.max(cw / 2 + 16, 26), 29, mark);
          px.restore(); x += cw;
        } else { px.fillStyle = ink; px.fillText(part, x, y); x += px.measureText(part).width; }
      });
      if (wi < words.length - 1) x += px.measureText(' ').width;
    });
  }
  // how far the object on top reaches up above / down into the sheet (fractions of the sheet width): a wide, low
  // object (sneakers, a console) takes less room than a square one, so the text starts higher and nothing gapes
  const aboveOf = note => note.object ? (note.objAbove != null ? note.objAbove : OBJ / 2) : 0;
  const belowOf = note => note.object ? (note.objBelow != null ? note.objBelow : OBJ / 2) : 0;
  const liftOf = note => note.object ? Math.max(0, Math.round(belowOf(note) * TW + 30 - 130)) : 0;
  // a long title wraps onto a second line instead of getting smaller
  function titleLines(title, L) {
    px.font = '400 79px "Gochi Hand", cursive';
    if (px.measureText(title).width <= TW - L * 2) return [title];
    const w = title.split(' '); let best = null;
    for (let i = 1; i < w.length; i++) {
      const a = w.slice(0, i).join(' '), b = w.slice(i).join(' '), m = Math.max(px.measureText(a).width, px.measureText(b).width);
      if (!best || m < best[0]) best = [m, [a, b]];
    }
    return best ? best[1] : [title];
  }
  // the golden card is shown a bit narrower than a note (GOLD_W); its writing is drawn that much larger so it
  // ends up the same size on screen, and its small text runs in a narrower column
  const GOLD_W = .92;
  const metrics = note => {
    const g = note.gold ? 1 / GOLD_W : 1;
    return { g, body: 31 * g, line: 48 * g, gap: 26 * g, wrap: (TW - 184) * (note.gold ? .85 : 1), big: 112 * g, sigPad: note.gold ? 100 : 90 };
  };
  // the golden card: heading, name, two short paragraphs, signature, the whole block centred top-to-bottom on a card
  // a little taller than it strictly needs (GOLD_TALL)
  const GOLD_TALL = 1.1;
  function goldLayout(note) {
    const m = metrics(note);
    px.font = `400 ${m.body}px Inter, sans-serif`;
    const paras = note.text.map(p => wrapWords(p, m.wrap)), names = (note.big || '').split('\n').filter(Boolean);
    const cap = m.body * .72, toName = 143, nameLine = 100 * m.g, toText = 100, toSig = 115;
    let h = cap + toName + (names.length - 1) * nameLine + toText;   // top of the heading .. first text baseline
    paras.forEach((ls, i) => { h += (ls.length - 1) * m.line + (i < paras.length - 1 ? m.line + m.gap : 0); });
    h += toSig;                                                          // .. the signature's baseline
    const TH = Math.min(MAX_TH, Math.round(Math.max(BASE_TH, h + 2 * 140) * GOLD_TALL));
    return { m, TH, top: (TH - h) / 2 + 8, cap, toName, nameLine, toText, toSig, paras, names };
  }
  // how tall the sheet must be for this note (text + signature + stamp)
  function sheetHeight(note) {
    if (note.gold && note.printTitle) return goldLayout(note).TH;
    const m = metrics(note);
    let y = (note.printTitle ? 250 : 300 + (titleLines(note.title, 92).length - 1) * 76) + liftOf(note);
    if (note.big) y += note.big.split('\n').length * m.big + 40;
    px.font = `400 ${m.body}px Inter, sans-serif`;
    note.text.forEach(p => { y += wrapWords(p, m.wrap).length * m.line + m.gap; });
    return Math.min(MAX_TH, Math.max(BASE_TH, Math.round(y + 60 + m.sigPad)));
  }
  function drawPaper(note) {
    TH = sheetHeight(note);
    PH = TH / TW;
    if (pc.height !== TH) pc.height = TH;
    const gold = !!note.gold;
    if (gold) {
      const g = px.createLinearGradient(0, 0, TW, TH);
      g.addColorStop(0, '#f7e3a1'); g.addColorStop(.35, '#d7a945'); g.addColorStop(.6, '#f4d785'); g.addColorStop(1, '#b8852a');
      px.fillStyle = g; px.fillRect(0, 0, TW, TH);
      px.strokeStyle = 'rgba(90,55,10,.45)'; px.lineWidth = 3; px.strokeRect(36, 36, TW - 72, TH - 72);
      px.lineWidth = 1.5; px.strokeRect(48, 48, TW - 96, TH - 96);
    } else {
      const g = px.createRadialGradient(TW * .45, TH * .4, 50, TW * .5, TH * .5, TH * .75);
      g.addColorStop(0, '#f6eedc'); g.addColorStop(1, '#e6d8bb');
      px.fillStyle = g; px.fillRect(0, 0, TW, TH);
    }
    // paper fibre grain (built once)
    if (!grain) {
      const gc = document.createElement('canvas'); gc.width = TW; gc.height = MAX_TH;
      const gx = gc.getContext('2d'), im = gx.createImageData(TW, MAX_TH), d = im.data;
      for (let i = 0; i < d.length; i += 4) { const v = Math.random() * 255; d[i] = 120; d[i + 1] = 90; d[i + 2] = 50; d[i + 3] = v < 30 ? 22 : (v > 250 ? 30 : 6); }
      gx.putImageData(im, 0, 0); grain = gc;
    }
    px.drawImage(grain, 0, 0);
    if (!gold) {   // a faint old stain
      px.save(); px.globalAlpha = .07; px.strokeStyle = '#7a4a1e'; px.lineWidth = 14;
      px.beginPath(); px.arc(TW * .2, TH * .82, 70, 0.3, Math.PI * 1.8); px.stroke(); px.restore();
    }
    const L = 92;
    const ink = gold ? '#3d2606' : '#3a2a1c', head = gold ? '#2e1c03' : '#2a1d12', mark = gold ? '#7a1f10' : '#b0321c';
    px.fillStyle = head; px.textBaseline = 'alphabetic';
    const lift = liftOf(note);   // an object lies on the top of the sheet: write below it
    let y;
    const m = metrics(note);
    if (gold && note.printTitle) {   // the golden card, laid out as one centred block
      const G = goldLayout(note), GL = L + 20;   // the card's text sits a touch further in from the left edge
      let yy = G.top + G.cap;
      px.font = `500 ${m.body}px Inter, sans-serif`; px.fillStyle = head; px.fillText(note.title, GL, yy);
      yy += G.toName;
      px.font = `400 ${m.big}px "Gochi Hand", cursive`;
      G.names.forEach((l, i) => { px.fillText(l, GL, yy); if (i < G.names.length - 1) yy += G.nameLine; });
      yy += G.toText;
      px.font = `400 ${m.body}px Inter, sans-serif`;
      G.paras.forEach((ls, i) => { ls.forEach((l, k) => { drawLine(l, GL, yy, ink, mark); if (k < ls.length - 1) yy += m.line; }); if (i < G.paras.length - 1) yy += m.line + m.gap; });
      yy += G.toSig;
      px.fillStyle = '#5a3a0c'; px.font = '400 58px "Gochi Hand", cursive';
      px.fillText(note.sig || '— D.N.', GL, yy);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pc);
      return;
    }
    if (note.printTitle) {   // a printed heading: plain, the size of the site's own small text
      px.font = `500 ${m.body}px Inter, sans-serif`; px.fillStyle = head;
      px.fillText(note.title, L, 190 + lift);
      y = 250 + lift;
    } else {
      const tl = titleLines(note.title, L);
      px.font = '400 79px "Gochi Hand", cursive'; px.fillStyle = head;
      tl.forEach((t, i) => px.fillText(t, L, 200 + lift + i * 76));
      y = 300 + lift + (tl.length - 1) * 76;
    }
    if (note.big) {
      px.font = `400 ${m.big}px "Gochi Hand", cursive`; px.fillStyle = head;
      note.big.split('\n').forEach(l => { px.fillText(l, L, y + 70 * m.g); y += m.big; });
      y += 40;
    }
    px.font = `400 ${m.body}px Inter, sans-serif`;
    note.text.forEach(p => { wrapWords(p, m.wrap).forEach(l => { drawLine(l, L, y, ink, mark); y += m.line; }); y += m.gap; });
    px.fillStyle = gold ? '#5a3a0c' : '#6b4a2c'; px.font = '400 58px "Gochi Hand", cursive';
    // the signature always sits the same distance from the bottom edge (short notes get a gap above it, like a letter)
    px.fillText(note.sig || '— D.N.', L, Math.max(y + 60, TH - m.sigPad));
    if (note.stamp) {
      px.save(); px.translate(TW - 190, TH - 190); px.rotate(-.25);
      const sc = gold ? 'rgba(110,30,10,.7)' : 'rgba(170,60,40,.6)';
      px.strokeStyle = sc; px.lineWidth = 5;
      px.beginPath(); px.arc(0, 0, 92, 0, Math.PI * 2); px.stroke();
      px.beginPath(); px.arc(0, 0, 78, 0, Math.PI * 2); px.lineWidth = 2; px.stroke();
      px.fillStyle = sc; px.font = '500 24px Inter, sans-serif'; px.textAlign = 'center';
      note.stamp.split('\n').forEach((s, i, a) => px.fillText(s, 0, (i - (a.length - 1) / 2) * 32 + 9));
      px.restore(); px.textAlign = 'left';
    }
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pc);
  }

  /* ---------- matrices ---------- */
  const M = {
    id: () => [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1],
    mul(a, b) { const o = new Array(16); for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
      let s = 0; for (let i = 0; i < 4; i++) s += a[i * 4 + r] * b[c * 4 + i]; o[c * 4 + r] = s; } return o; },
    persp(fov, asp, n, f) { const t = 1 / Math.tan(fov / 2); return [t / asp,0,0,0, 0,t,0,0, 0,0,(f + n) / (n - f),-1, 0,0,2 * f * n / (n - f),0]; },
    tr: (x, y, z) => [1,0,0,0, 0,1,0,0, 0,0,1,0, x,y,z,1],
    sc: s => [s,0,0,0, 0,s,0,0, 0,0,s,0, 0,0,0,1],
    rx: a => { const c = Math.cos(a), s = Math.sin(a); return [1,0,0,0, 0,c,s,0, 0,-s,c,0, 0,0,0,1]; },
    ry: a => { const c = Math.cos(a), s = Math.sin(a); return [c,0,-s,0, 0,1,0,0, s,0,c,0, 0,0,0,1]; },
    rz: a => { const c = Math.cos(a), s = Math.sin(a); return [c,s,0,0, -s,c,0,0, 0,0,1,0, 0,0,0,1]; },
  };
  const FOV = 30 * Math.PI / 180;
  let mode = 'idle', t0 = 0, seed = 0, raf = 0, onClosed = null, gold = 0, hasObj = false, offPx = 0, objAbove = 0;
  const OBJ = .648;   // object size relative to the sheet width; its centre sits on the sheet's top edge
  let rect = { x: 0, y: 0, w: 0, h: 0 }, dist = 3;
  function fit() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = Math.round(innerWidth * dpr); cv.height = Math.round(innerHeight * dpr);
    gl.viewport(0, 0, cv.width, cv.height);
    let wPx, hPx;
    if (mode === 'away') { PW = PH * innerWidth / innerHeight; wPx = innerWidth; hPx = innerHeight; }
    else {
      PW = 1;
      // with an object on top the whole composition (object + sheet) has to fit, so the sheet shrinks and moves down
      // one scale for every note (sized for the tallest one), so the writing is always the same size
      const ref = Math.max(PH, REF_PH), vFrac = .85 / (ref + OBJ / 2);   // leaves room for "Fold it back" under the tallest note
      wPx = Math.min(440, innerWidth * .84, innerHeight * vFrac) * (gold ? GOLD_W : 1); hPx = wPx * PH / PW;
    }
    // the whole composition (object on top + sheet + the button under it) sits in the middle of the screen,
    // but the object never goes off the top
    const up = hasObj ? wPx * objAbove : 0, btn = 46;
    offPx = mode !== 'away' ? Math.max((up - btn) / 2, hasObj ? 14 + up - (innerHeight - hPx) / 2 : -1e9) : 0;
    dist = PH / ((hPx / innerHeight) * 2 * Math.tan(FOV / 2));
    rect = { x: (innerWidth - wPx) / 2, y: (innerHeight - hPx) / 2 + offPx, w: wPx, h: hPx };
  }
  addEventListener('resize', () => { fit(); if (mode === 'open') { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); } });
  fit();

  /* ---------- timeline ---------- */
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const eOutBack = t => { const c = 1.6; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
  const eInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const eOut = t => 1 - Math.pow(1 - t, 3);
  const eIn = t => t * t * t;

  function state(now) {
    const t = (now - t0) / 1000;
    if (mode === 'open') {
      // (seconds) the wad pops in and spins only briefly before it starts to unfold; the unfold itself keeps its pace
      const pop = eOutBack(clamp(t / .36));
      const settle = eOut(clamp(t / 1.55));
      return {
        c: 1 - eInOut(clamp((t - .22) / 1.55)),
        s: pop,
        rx: (1 - settle) * -1.1, ry: (1 - settle) * 2.6, rz: -.035 + (1 - settle) * 1.4,
        y: (1 - pop) * -.7, alpha: clamp(t / .16), done: false,
      };
    }
    if (mode === 'away') {          // full-screen sheet (the preloader) crumples and gets tossed
      const AWAY = 1.25, p = clamp(t / AWAY);
      return {
        c: eInOut(clamp(p / .62)),
        s: 1 - .55 * eInOut(clamp(p / .6)) - .45 * eIn(clamp((p - .55) / .45)),
        rx: eIn(p) * .9, ry: eInOut(p) * 1.6, rz: eInOut(p) * -.9,
        y: eIn(clamp((p - .4) / .6)) * -1.4, alpha: 1 - clamp((p - .85) / .15), done: p >= 1,
      };
    }
    if (mode === 'close') {
      const CLOSE = .8, p = clamp(t / CLOSE);
      return {
        c: eOut(clamp(p / .55)),
        s: 1 - eIn(clamp((p - .45) / .55)),
        rx: p * .8, ry: -p * 1.8, rz: -.035 - p * 1.3,
        y: -eIn(p) * .35, alpha: 1 - clamp((p - .8) / .2), done: p >= 1,
      };
    }
    return null;
  }

  function frame(now) {
    const st = state(now);
    if (!st) return;
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const P = M.persp(FOV, innerWidth / innerHeight, .1, 50);
    let MV = M.tr(0, st.y - offPx * PH / rect.h, -dist);
    MV = M.mul(MV, M.rz(st.rz)); MV = M.mul(MV, M.ry(st.ry)); MV = M.mul(MV, M.rx(st.rx));
    MV = M.mul(MV, M.sc(Math.max(st.s, .0001)));
    gl.useProgram(prog);
    gl.uniformMatrix4fv(U.uP, false, P);
    gl.uniformMatrix4fv(U.uMV, false, MV);
    gl.uniform1f(U.uC, st.c);
    gl.uniform1f(U.uSeed, seed);
    gl.uniform2f(U.uSize, PW, PH);
    gl.uniform1f(U.uAlpha, st.alpha);
    gl.uniform1f(U.uResid, mode === 'away' ? 0 : (gold ? .05 : .085));
    gl.uniform1f(U.uGold, mode === 'away' ? 0 : gold);
    gl.uniform1f(U.uTime, now / 1000);
    if (mode === 'away') gl.uniform3f(U.uBack, .16, .11, .07); else gl.uniform3f(U.uBack, .9, .85, .75);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex); gl.uniform1i(U.uTex, 0);
    gl.drawElements(gl.TRIANGLES, idx.length, gl.UNSIGNED_SHORT, 0);
    if (st.done) { mode = 'idle'; gl.clear(gl.COLOR_BUFFER_BIT); cv.style.zIndex = ''; if (onClosed) onClosed(); return; }
    if (mode === 'open' && !gold && (now - t0) > 2300) return;   // settled: stop redrawing (gold keeps its sheen moving)
    raf = requestAnimationFrame(frame);
  }

  window.CrumplePaper = {
    // crumple a full-screen picture (e.g. the preloader) into a wad and toss it away
    crumpleAway(src, done) {
      mode = 'away'; fit();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
      seed = Math.random() * 50; onClosed = done || null; t0 = performance.now();
      cancelAnimationFrame(raf); raf = requestAnimationFrame(frame);
    },
    get rect() { return rect; },
    // measure all the notes up front: the tallest sets the one scale they're all shown at
    reference(notes) { REF_PH = Math.max(0, ...notes.map(n => sheetHeight(n) / TW)); },
    open(note) {
      mode = 'open'; gold = note.gold ? 1 : 0; hasObj = !!note.object; objAbove = aboveOf(note);
      drawPaper(note);   // sets the sheet height first
      fit();
      // redraw once the handwriting font is surely loaded (first open on a cold cache)
      if (document.fonts) Promise.all(['79px "Gochi Hand"', '31px Inter'].map(f => document.fonts.load(f))).then(() => { drawPaper(note); fit(); }).catch(() => {});
      seed = Math.random() * 50;
      mode = 'open'; t0 = performance.now();
      cancelAnimationFrame(raf); raf = requestAnimationFrame(frame);
    },
    // debug helper: freeze the open animation at a given moment (ms)
    _seek(ms, m = 'open') { cancelAnimationFrame(raf); mode = m; fit(); t0 = performance.now() - ms; frame(performance.now()); cancelAnimationFrame(raf); },
    close(cb) {
      onClosed = cb || null;
      mode = 'close'; t0 = performance.now();
      cancelAnimationFrame(raf); raf = requestAnimationFrame(frame);
    },
  };
})();

/*
 * FolderGL — the front cover of the Memories folder while it swings open or shut.
 * Orthographic (no perspective): the silhouette never turns into a trapezoid. What sells the motion is the
 * cardboard bending a little as it moves (the outer edge lags, then whips past and settles) and the light on it.
 *
 *   FolderGL.init(canvas)              -> true if WebGL is available
 *   FolderGL.textures(front, inside)   -> 2D canvases: outside of the cover (spine on the left) and its inside
 *                                         as seen when the folder is open (spine on the right)
 *   FolderGL.draw(angle, bend, twist)  -> angle 0 = closed (lying over the right half), PI = open (over the left half)
 */
(function () {
  const VS = `
    attribute vec2 aUV;             // x: 0 at the spine .. 1 at the outer edge; y: 0 top .. 1 bottom
    uniform float uAng, uBend, uTwist;
    uniform vec2 uScale;            // cover width / half canvas width, cover height / canvas height
    varying vec2 vUV; varying vec3 vN;
    void main() {
      float u = aUV.x, v = aUV.y;
      float k = uBend + uTwist * (v - .5);          // how much the board curls over its width
      float th = uAng + k * u;
      float x, z;
      if (abs(k) < 1e-3) { x = cos(uAng) * u; z = sin(uAng) * u; }
      else { x = (sin(uAng + k * u) - sin(uAng)) / k; z = (cos(uAng) - cos(uAng + k * u)) / k; }
      vUV = aUV;
      vN = vec3(-sin(th), 0., cos(th));
      gl_Position = vec4(x * uScale.x, (.5 - v) * 2. * uScale.y, -z * .1, 1.);
    }`;
  const FS = `
    precision mediump float;
    uniform sampler2D uFront, uBack;
    varying vec2 vUV; varying vec3 vN;
    void main() {
      vec3 n = normalize(vN);
      bool front = n.z >= 0.;
      vec4 c = front ? texture2D(uFront, vUV) : texture2D(uBack, vec2(1. - vUV.x, vUV.y));
      vec3 f = front ? n : -n;                        // the side that faces us
      // darker the more it turns away from us (1 when it lies flat), plus a sheen that slides across the curl
      float lit = .28 + .72 * pow(max(f.z, 0.), .75);
      vec3 H = normalize(vec3(-.42, -.12, .9));
      float spec = pow(max(dot(f, H), 0.), 70.) * .3 * (1. - smoothstep(.97, 1., f.z));
      gl_FragColor = vec4(c.rgb * lit + spec * c.a, c.a);
    }`;
  const NX = 56, NY = 8;
  let gl, cv, prog, uni = {}, texF, texB, count;

  function sh(type, src) {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }
  function init(canvas) {
    cv = canvas;
    try {
      gl = cv.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: true });
      if (!gl) return false;
      prog = gl.createProgram();
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false;
      gl.useProgram(prog);
      ['uAng', 'uBend', 'uTwist', 'uScale', 'uFront', 'uBack'].forEach(n => uni[n] = gl.getUniformLocation(prog, n));
      // a grid over the cover; dense across (it bends that way)
      const v = [];
      for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
        const u0 = i / NX, u1 = (i + 1) / NX, v0 = j / NY, v1 = (j + 1) / NY;
        v.push(u0, v0, u1, v0, u0, v1, u1, v0, u1, v1, u0, v1);
      }
      count = v.length / 2;
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(v), gl.STATIC_DRAW);
      const a = gl.getAttribLocation(prog, 'aUV');
      gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
      texF = gl.createTexture(); texB = gl.createTexture();
      gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL);
      return true;
    } catch (e) { gl = null; return false; }
  }
  function upload(tex, unit, src) {
    gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  }
  function textures(front, inside) {
    if (!gl) return false;
    try { upload(texF, 0, front); upload(texB, 1, inside); } catch (e) { return false; }   // e.g. a tainted canvas
    gl.uniform1i(uni.uFront, 0); gl.uniform1i(uni.uBack, 1);
    return true;
  }
  function draw(ang, bend = 0, twist = 0) {
    if (!gl) return;
    const dpr = Math.min(devicePixelRatio || 1, 2), w = Math.round(cv.clientWidth * dpr), h = Math.round(cv.clientHeight * dpr);
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    gl.viewport(0, 0, w, h);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.uniform1f(uni.uAng, ang); gl.uniform1f(uni.uBend, bend); gl.uniform1f(uni.uTwist, twist);
    gl.uniform2f(uni.uScale, 1, 1);   // the canvas is exactly two covers wide and one cover tall
    gl.drawArrays(gl.TRIANGLES, 0, count);
  }
  window.FolderGL = { init, textures, draw, get ok() { return !!gl; } };
})();

/* CONTACT — goes into the downloadable vCard on the golden card, the pager and the Contacts link. */
const GOLD_PHOTO = 'objects/gold-pl.jpg';   // the photo on the golden card's polaroid
const CONTACT = {
  name: 'Dmitrii Nesterov',
  title: 'Creative web developer',
  email: 'nesterov.spain@gmail.com',
  url: 'https://www.linkedin.com/in/nesterov-dev/',   // the vCard's website line (no personal site yet)
  phone: '+34 692 860 504',
  whatsapp: '+34 692 860 504',
  linkedin: 'linkedin.com/in/nesterov-dev',
};

/* Where the files live. On the hosted site (Tilda) the page sets window.DN_BASE to the folder the assets are
   uploaded to; locally it's empty and paths are relative. Opened from disk, the embedded copies are used instead. */
const BASE = window.DN_BASE || '';
const CORS = /^https?:/.test(BASE) && !BASE.startsWith(location.origin);   // assets on another host: ask for CORS (WebGL needs it)
const ASSET = p => !p ? p : (window.OBJECT_DATA && window.OBJECT_DATA[p]) || (/^(data:|blob:|https?:|\/)/.test(p) ? p : BASE + p);
const corsify = el => { if (CORS) el.crossOrigin = 'anonymous'; return el; };

/* =====================================================================
   WORKS — the projects, in order. Each one is a TV channel and a tape on the shelf.
   title:   on the TV caption and handwritten on the cassette label
   tag:     a short line about it
   cover:   the VHS sleeve (projects/…, 2:3 picture)
   sticker: colour of the "Play the site" sticker, from the cover's accent
   still:   the site's picture on the TV until its clip has loaded (or if it has none) → projects/<name>-still.jpg;
            without one the TV shows the cover
   tv:      the short looping clip on the TV        → projects/<name>-tv.mp4
   tape:    the long walkthrough the cassette plays → projects/<name>-tape.mp4
   A clip that isn't uploaded yet is fine: the TV keeps the still, the sticker says "Coming soon".
   ===================================================================== */
const WORKS = [
  { title: 'QueenLash',    tag: 'Cosmetics · Online store',       sticker: '#efb0cb', cover: 'projects/queenlash-cover.jpg',   still: 'projects/queenlash-still.jpg', tv: 'projects/queenlash-tv.mp4',   tape: 'projects/queenlash-tape.mp4' },
  { title: 'Meva Fresh',   tag: 'Fruit import · Corporate site',  sticker: '#b3d95c', cover: 'projects/mevafresh-cover.jpg',   tv: 'projects/mevafresh-tv.mp4',   tape: 'projects/mevafresh-tape.mp4' },
  { title: 'Arkhidom',     tag: 'Architecture · Website',         sticker: '#f0c08f', cover: 'projects/arkhidom-cover.jpg',    still: 'projects/arkhidom-still.jpg', tv: 'projects/arkhidom-tv.mp4',    tape: 'projects/arkhidom-tape.mp4' },
  { title: 'Fuenf',        tag: 'Fashion & production · Website', sticker: '#cdf03a', cover: 'projects/fuenf-cover.jpg',       still: 'projects/fuenf-still.jpg', tv: 'projects/fuenf-tv.mp4',       tape: 'projects/fuenf-tape.mp4' },
  { title: 'Simply',       tag: 'AI implementation · Website',    sticker: '#ffd23f', cover: 'projects/simply-cover.jpg',      still: 'projects/simply-still.jpg', tv: 'projects/simply-tv.mp4',      tape: 'projects/simply-tape.mp4' },
  { title: 'Slide Projex', tag: 'Video production · One-pager',   sticker: '#e6f24e', cover: 'projects/slideprojex-cover.jpg', still: 'projects/slideprojex-still.jpg', tv: 'projects/slideprojex-tv.mp4', tape: 'projects/slideprojex-tape.mp4' },
  { title: 'Sam Yakushev', tag: 'Entrepreneur · Personal site',   sticker: '#ec5a4c', cover: 'projects/samyakushev-cover.jpg', still: 'projects/samyakushev-still.jpg', tv: 'projects/samyakushev-tv.mp4', tape: 'projects/samyakushev-tape.mp4' },
  { title: 'Blocklabs',    tag: 'Web3 · Promo site',              sticker: '#f2b53a', cover: 'projects/blocklabs-cover.jpg',   still: 'projects/blocklabs-still.jpg', tv: 'projects/blocklabs-tv.mp4',   tape: 'projects/blocklabs-tape.mp4' },
  { title: 'Clinique 7',   tag: 'Plastic surgery · Landing page', sticker: '#b9a6e6', cover: 'projects/clinique-cover.jpg',    tv: 'projects/clinique7-tv.mp4',   tape: 'projects/clinique7-tape.mp4' },
];
// the TV's channels and the shelf's tapes are the same list, in the same order
const PROJECTS = WORKS.map(w => ({ title: w.title, tag: w.tag, video: w.tv, img: w.still, cover: w.cover }));
const TAPES = WORKS.map(w => ({ title: w.title, tag: w.tag, sticker: w.sticker, cover: w.cover, video: w.tape }));

(() => {
  const IMG_SRC = 'back final.jpg';
  const IMG_W = 2688, IMG_H = 1568;
  const TV = { x0: 1142, y0: 521, x1: 1532, y1: 915 };           // whole set (click target)
  const SCR = { x0: 1205, y0: 562, x1: 1500, y1: 779, r: 18 };   // glass of the screen
  // where the room is framed at rest (back2 has extra canvas below and to the right for looking around)
  const HOME = [1329 / 2688, 743 / 1568];
  // camera target when zoomed: centre of the whole set (tube + VCR), not just the glass
  const FOCUS = [ (TV.x0 + TV.x1) / 2 / IMG_W, (TV.y0 + TV.y1) / 2 / IMG_H ];
  const ZOOM_MAX = 2.2, TV_FILL = .8; // zoom so the set fills ~80% of the frame, never above 2.2x
  const TEX_W = 1024, TEX_H = Math.round(1024 * (SCR.y1 - SCR.y0) / (SCR.x1 - SCR.x0));

  /* ================= PRELOADER =================
     the whole screen is a set searching for the channel: static, then the room coming through, rolling, stretching
     and tearing; the picture
     steadies as the room loads, locks, and switches into the full-screen scene */
  const cellsEl = document.getElementById('sigCells');
  const sigCv = document.getElementById('sigCv'), sg = sigCv.getContext('2d');
  const sigCh = document.getElementById('sigCh'), sigState = document.getElementById('sigState');
  const cells = [...Array(32)].map(() => document.createElement('i'));
  cellsEl.append(...cells);
  function setCount(v) {
    cellsEl.setAttribute('aria-valuenow', v);
    cells.forEach((c, i) => c.classList.toggle('on', i < Math.round(v / 100 * cells.length)));
  }
  setCount(0);
  // the picture is drawn at a fraction of the screen's resolution and scaled up: soft, like an analogue signal
  const RES = Math.min(devicePixelRatio || 1, 2);   // full resolution: crisp, never low-res
  let SW = 0, SH = 0;
  function sizeSignal() { SW = sigCv.width = Math.round(innerWidth * RES); SH = sigCv.height = Math.round(innerHeight * RES); frameFor = ''; }
  sizeSignal(); addEventListener('resize', sizeSignal);
  // a few frames of static, warm-tinted, tiled over the screen: streaky, smeared along the lines like a weak
  // analogue signal (short dashes of brightness on each line, now and then a bright streak), not round dots
  const NS = 256;
  const statics = [...Array(6)].map(() => {
    const c = document.createElement('canvas'); c.width = c.height = NS;
    const x = c.getContext('2d'), d = x.createImageData(NS, NS);
    for (let y = 0; y < NS; y++) {
      const lineGain = Math.random() < .05 ? 1.25 : .8 + Math.random() * .3;   // a few lines a touch brighter
      for (let xx = 0; xx < NS;) {
        const run = 4 + (Math.random() * Math.random() * 50 | 0), v = Math.min(255, (40 + Math.random() * 60) * lineGain);
        for (let k = 0; k < run && xx < NS; k++, xx++) {
          const i = (y * NS + xx) * 4, w = v * (.85 + Math.random() * .3);
          d.data[i] = w * .82; d.data[i + 1] = w * .9; d.data[i + 2] = w; d.data[i + 3] = 255;
        }
      }
    }
    x.putImageData(d, 0, 0); return c;
  });
  function homeCrop() {   // the room exactly as the scene first frames it
    const sa = innerWidth / innerHeight, ia = IMG_W / IMG_H;
    let hx = .5, hy = .5; if (sa > ia) hy = .5 * ia / sa; else hx = .5 * sa / ia;
    hx *= OVERSCAN; hy *= OVERSCAN;
    const cx = Math.min(Math.max(HOME[0], hx), 1 - hx), cy = Math.min(Math.max(HOME[1], hy), 1 - hy);
    const lens = 1 / (1 + BASE_DIST * .32); hx *= lens; hy *= lens;   // the scene's lens enlarges the middle a little
    return [(cx - hx) * IMG_W, (cy - hy) * IMG_H, (cx + hx) * IMG_W, (cy + hy) * IMG_H];
  }
  // the whole room, prepared once at the signal's resolution
  const frameCv = document.createElement('canvas'), fg = frameCv.getContext('2d');
  const tCv = document.createElement('canvas'), tg = tCv.getContext('2d');
  var frameFor = '';   // var: sizeSignal() above resets it before this line runs
  function prepFrame() {
    const key = SW + 'x' + SH;
    if (frameFor === key) return;
    frameCv.width = SW; frameCv.height = SH;
    const [x0, y0, x1, y1] = homeCrop(), k = (img.naturalWidth || IMG_W) / IMG_W;   // the picture may be stored bigger than its layout size
    fg.drawImage(img, x0 * k, y0 * k, (x1 - x0) * k, (y1 - y0) * k, 0, 0, SW, SH);
    frameFor = key;
  }
  // calm snow: crisp fine grain (one grain ≈ one screen pixel), quiet, changing at a lazy pace
  function drawStatic(now, alpha) {
    sg.save(); sg.globalAlpha = alpha; sg.imageSmoothingEnabled = false;
    const f = (now / 85 | 0), ox = (f * 97) % NS, oy = (f * 61) % NS, k = RES;
    sg.scale(k, k);
    sg.fillStyle = sg.createPattern(statics[f % statics.length], 'repeat');
    sg.translate(-ox, -oy); sg.fillRect(ox, oy, SW / k, SH / k);
    sg.restore();
  }
  // what's behind the snow while there's no picture: the warm glow of a set that's on, breathing slowly
  function drawGlow(now) {
    const b = .5 + .5 * Math.sin(now / 1300);
    const g = sg.createRadialGradient(SW / 2, SH * .48, 0, SW / 2, SH * .48, Math.max(SW, SH) * .65);
    g.addColorStop(0, `rgba(20,28,36,${.9 + .1 * b})`); g.addColorStop(.6, 'rgba(9,12,16,1)'); g.addColorStop(1, 'rgba(3,4,6,1)');
    sg.globalAlpha = 1; sg.fillStyle = g; sg.fillRect(0, 0, SW, SH);
  }
  // the tube: the flat signal is shown through curved glass. It bulges towards you (barrel), the screen has rounded
  // corners that fall off into black, the edges darken, and colours fringe a little (more while it's unstable)
  const crtCv = document.getElementById('sigCrt');
  const cg = crtCv.getContext('webgl', { premultipliedAlpha: false, antialias: false });
  let crtProg = null, crtU = {}, crtTex = null;
  if (cg) try {
    const sh = (t, src) => { const o = cg.createShader(t); cg.shaderSource(o, src); cg.compileShader(o); if (!cg.getShaderParameter(o, cg.COMPILE_STATUS)) throw cg.getShaderInfoLog(o); return o; };
    crtProg = cg.createProgram();
    cg.attachShader(crtProg, sh(cg.VERTEX_SHADER, 'attribute vec2 a; varying vec2 v; void main(){ v = a * .5 + .5; gl_Position = vec4(a, 0., 1.); }'));
    cg.attachShader(crtProg, sh(cg.FRAGMENT_SHADER, `precision mediump float;
      uniform sampler2D t; uniform vec2 res; uniform float time, u, calm;
      varying vec2 v;
      void main() {
        vec2 p = v * 2. - 1.;
        float asp = res.x / res.y;
        vec2 q = vec2(p.x * asp, p.y);
        float r2 = dot(q, q) / (asp * asp + 1.);
        vec2 d = p * (1. + .26 * r2 * calm);                  // bulge: the picture curves away at the edges (a deep tube)
        vec2 uv = d * .5 + .5; uv.y = 1. - uv.y;
        vec2 e = abs(d);
        float m = pow(pow(e.x, 5.) + pow(e.y, 5.), 1. / 5.);  // a rounded-rectangle tube face, rounder corners
        float mask = mix(1., 1. - smoothstep(.86, 1.0, m), calm);
        vec2 dir = d * (.005 + .008 * u);                     // colour fringing towards the edges
        vec3 c = vec3(texture2D(t, uv + dir).r, texture2D(t, uv).g, texture2D(t, uv - dir).b);
        float vig = 1. - smoothstep(.2, 1.1, length(d * vec2(.85, 1.)));
        c *= mix(1., mix(.06, 1.05, vig), calm);                // strong falloff: light gathers in the middle of the tube
        // a faint wash of colour drifting over the glass (pink to teal), stronger while it can't find the signal
        vec3 tint = mix(vec3(1.06, .9, .98), vec3(.9, 1.02, 1.0), .5 + .5 * sin(d.y * 2.3 + d.x * 1.2 + time * .7));
        c *= mix(vec3(1.), tint, (.1 + .4 * u) * calm);
        c += vec3(.03, .015, .02) * (1. - vig) * u;           // a little glow bleeding in the corners
        gl_FragColor = vec4(c * mask, 1.);
      }`));
    cg.linkProgram(crtProg); cg.useProgram(crtProg);
    cg.bindBuffer(cg.ARRAY_BUFFER, cg.createBuffer());
    cg.bufferData(cg.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), cg.STATIC_DRAW);
    const a = cg.getAttribLocation(crtProg, 'a'); cg.enableVertexAttribArray(a); cg.vertexAttribPointer(a, 2, cg.FLOAT, false, 0, 0);
    ['res', 'time', 'u', 'calm'].forEach(n => crtU[n] = cg.getUniformLocation(crtProg, n));
    crtTex = cg.createTexture(); cg.bindTexture(cg.TEXTURE_2D, crtTex);
    cg.texParameteri(cg.TEXTURE_2D, cg.TEXTURE_MIN_FILTER, cg.LINEAR); cg.texParameteri(cg.TEXTURE_2D, cg.TEXTURE_MAG_FILTER, cg.LINEAR);
    cg.texParameteri(cg.TEXTURE_2D, cg.TEXTURE_WRAP_S, cg.CLAMP_TO_EDGE); cg.texParameteri(cg.TEXTURE_2D, cg.TEXTURE_WRAP_T, cg.CLAMP_TO_EDGE);
    document.getElementById('loader').classList.add('crt');
  } catch (e) { crtProg = null; }
  function crtPresent(now, u, calm = 1) {
    if (!crtProg) return;
    if (crtCv.width !== SW || crtCv.height !== SH) { crtCv.width = SW; crtCv.height = SH; cg.viewport(0, 0, SW, SH); }
    cg.bindTexture(cg.TEXTURE_2D, crtTex);
    cg.texImage2D(cg.TEXTURE_2D, 0, cg.RGBA, cg.RGBA, cg.UNSIGNED_BYTE, sigCv);
    cg.uniform2f(crtU.res, SW, SH); cg.uniform1f(crtU.time, now / 1000); cg.uniform1f(crtU.u, u); cg.uniform1f(crtU.calm, calm);
    cg.drawArrays(cg.TRIANGLE_STRIP, 0, 4);
  }
  // one channel being tuned in: a near-black, slightly cold screen with fine analog snow; the room comes up through
  // it gradually (never pops in or out), the lines shimmer a little and now and then a thin band slips; as the
  // signal firms up the snow and the shimmer fade, and when it locks the tube itself relaxes into the room
  const G2 = { last: 0, distUntil: 0, distY: 0, distH: 0, distX: 0, lockAt: null };
  let locked = false;
  const sstep = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  function drawSignal(now, p) {
    const ready = img.complete && img.naturalWidth;
    sg.globalAlpha = 1; sg.globalCompositeOperation = 'source-over'; sg.filter = 'none';
    sg.fillStyle = '#040507'; sg.fillRect(0, 0, SW, SH);
    drawGlow(now);
    const vis = ready ? (locked ? 1 : sstep(.18, .85, p)) : 0;       // how much of the room has come through
    const u = locked ? 0 : 1 - sstep(.3, .95, p);                     // how unsteady it still is
    if (vis > 0) {
      prepFrame();
      // colour comes in with the signal: grey-blue and flat at first, the room's own warmth once it holds
      if (tCv.width !== SW || tCv.height !== SH) { tCv.width = SW; tCv.height = SH; }
      tg.filter = `saturate(${.25 + .75 * (1 - u)}) contrast(${1 + .15 * u}) brightness(${.85 + .15 * (1 - u)})`;
      tg.drawImage(frameCv, 0, 0); tg.filter = 'none';
      if (u > .01) { tg.globalCompositeOperation = 'multiply'; tg.fillStyle = `rgba(150,175,215,${.45 * u})`; tg.fillRect(0, 0, SW, SH); tg.globalCompositeOperation = 'source-over'; }
      // a brief distortion: one thin band slips sideways and back
      if (!locked && now > G2.distUntil && Math.random() < .03 * u) { G2.distUntil = now + 70 + Math.random() * 110; G2.distY = Math.random() * SH; G2.distH = SH * (.015 + Math.random() * .04); G2.distX = (Math.random() - .5) * SW * .025; }
      const dist = now < G2.distUntil;
      sg.globalAlpha = vis * (1 - .06 * u * Math.random());           // a faint flicker while it's weak
      const band = Math.max(2, Math.round(2 * RES));
      for (let y = 0; y < SH; y += band) {
        let dx = u * SW * .0035 * Math.sin(y / SH * 46 + now / 85);    // fine horizontal shimmer
        if (dist && y > G2.distY && y < G2.distY + G2.distH) dx += G2.distX * Math.sin((y - G2.distY) / G2.distH * Math.PI);
        sg.drawImage(tCv, 0, y, SW, band, dx, y, SW, band);
      }
      sg.globalAlpha = 1;
    }
    // analog snow on top, thinning out as the picture firms up
    const sa = locked ? 0 : (.34 - .26 * vis) * (.45 + .55 * u);
    if (sa > 0) { sg.globalCompositeOperation = 'screen'; drawStatic(now, sa); sg.globalCompositeOperation = 'source-over'; }
    // a slow hum bar rolling down, and the odd hairline of interference
    if (!locked) {
      const bh = SH * .18, y = ((now / 2600) % 1) * (SH + bh * 2) - bh, g = sg.createLinearGradient(0, y - bh, 0, y + bh);
      g.addColorStop(0, 'rgba(200,215,235,0)'); g.addColorStop(.5, `rgba(200,215,235,${.05 * u + .01})`); g.addColorStop(1, 'rgba(200,215,235,0)');
      sg.fillStyle = g; sg.fillRect(0, y - bh, SW, bh * 2);
      if (Math.random() < .4 * u) { sg.globalAlpha = .06 + Math.random() * .1; sg.fillStyle = '#cfd8e4'; sg.fillRect(0, Math.random() * SH, SW, Math.max(1, RES)); sg.globalAlpha = 1; }
    }
    sigCv.style.transform = 'none';
    if (locked && G2.lockAt === null) G2.lockAt = now;
    const calm = locked ? Math.max(0, 1 - (now - G2.lockAt) / 450) : 1;   // the tube flattens out into the room
    crtPresent(now, u, calm);
    sigCh.textContent = locked ? 'CH 02' : 'CH ' + String(1 + (now / 420 | 0) % 12).padStart(2, '0');   // the search steps through the channels
    sigState.textContent = locked ? 'PLAY ▶' : 'AUTO SEARCH' + '.'.repeat(1 + (now / 380 | 0) % 3);
  }

  let loaded = 0;
  const img = new Image();
  // The scene is embedded as a data: URI (scene-data.js) so WebGL can use it
  // even when the page is opened straight from disk (file://).
  img.onload = () => { loaded = 1; };
  const sceneScript = document.createElement('script');
  corsify(img);
  if (location.protocol === 'file:') {   // opened from disk: the embedded copy (WebGL can't read the file itself)
    sceneScript.src = 'scene-data.js?v=7';  // bump when the scene image changes
    sceneScript.onload = () => { loaded = Math.max(loaded, .9); img.src = window.SCENE_DATA || IMG_SRC; };
    sceneScript.onerror = () => { img.src = IMG_SRC; };
    document.head.appendChild(sceneScript);
  } else img.src = ASSET(IMG_SRC);

  const MIN_TIME = 3200;
  const t0 = performance.now();
  let shown = 0;
  function loaderTick(now) {
    const el = Math.max(0, now - t0);           // a frame's timestamp can be earlier than t0 on a busy page
    const eased = Math.min(1, el / MIN_TIME);   // even pace: the hiss gets its share of the bar instead of rushing past it
    const target = Math.floor(Math.min(eased, loaded) * 100);
    if (target > shown) { shown = Math.min(target, shown + Math.max(1, Math.round((target - shown) * .18))); setCount(shown); }
    drawSignal(el, shown / 100);
    if (shown >= 100 && !locked) finishLoader();
    if (!document.getElementById('loader')?.classList.contains('off')) requestAnimationFrame(loaderTick);
  }
  requestAnimationFrame(loaderTick);

  // caught the channel: the picture steadies on the room, framed exactly like the scene, and the live scene
  // takes over underneath it (no second power-on) while the signal layer fades away
  function finishLoader() {
    locked = true;
    const L = document.getElementById('loader');
    L.classList.add('locked');
    Sound.blip();
    setTimeout(() => {   // the tube has relaxed into the room: the live scene takes over underneath, no dimming
      startScene(true);
      requestAnimationFrame(() => L.classList.add('off'));
      setTimeout(() => L.remove(), 500);
    }, 520);
  }

  /* ================= WEBGL ================= */
  const canvas = document.getElementById('scene');
  const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });

  const VS = `attribute vec2 p; varying vec2 vUv; void main(){ vUv = p*.5+.5; gl_Position = vec4(p,0.,1.); }`;
  const FS = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;     // room photo
uniform sampler2D uTexA;    // tv: outgoing project
uniform sampler2D uTexB;    // tv: incoming project
uniform vec2 uLook;        // camera yaw / pitch, radians
uniform vec2 uTan;         // tan(half FOV) of the original shot, x / y
uniform vec2 uRes;
uniform vec2 uScale;
uniform vec2 uCenter;
uniform vec2 uMouse;
uniform float uDist;
uniform float uTime;
uniform float uReveal;
uniform float uZoomT;
uniform vec4 uScreen;       // screen rect in image uv
uniform vec2 uScreenPx;     // screen size in image px (for rounded corners)
uniform float uScreenOn;    // 0 = original blue screen, 1 = gallery
uniform float uRoll;        // vertical roll offset (0 -> 1, overshoots)
uniform float uDir;         // +1 rolls down, -1 rolls up
uniform float uGlitch;      // tape-chew intensity
uniform float uFromBlank;   // outgoing side is snow instead of a project
uniform float uHover;
uniform vec4 uHi;          // hovered item rect in image uv
uniform float uHiAmt;
uniform float uLamp;        // floor lamp: 0 off (as painted) .. 1 on

float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }

vec2 mapUV(vec2 p, out float r2){
  vec2 c = p - .5;
  float a = uRes.x/uRes.y;
  vec2 cc = vec2(c.x*a, c.y) / max(a, 1.);
  r2 = dot(cc, cc);
  c *= (1. + uDist*r2) / (1. + uDist*.32);
  vec2 uv0 = uCenter + c*2.*uScale;
  // "360 viewer" look-around: treat the illustration as a photo taken with a ~65deg lens,
  // turn the camera on the spot and re-project. A pure rotation needs no depth,
  // so nothing tears or gets redrawn — only perspective changes.
  vec3 d = vec3((uv0.x - .5) * 2. * uTan.x, -(uv0.y - .5) * 2. * uTan.y, -1.);
  float cy = cos(uLook.x), sy = sin(uLook.x), cp = cos(uLook.y), sp = sin(uLook.y);
  d = vec3(d.x, d.y*cp - d.z*sp, d.y*sp + d.z*cp);      // pitch
  d = vec3(d.x*cy - d.z*sy, d.y, d.x*sy + d.z*cy);      // yaw
  vec2 pl = d.xy / -d.z;
  return vec2(pl.x / (2. * uTan.x) + .5, -pl.y / (2. * uTan.y) + .5);
}

vec3 sampleRGB(sampler2D t, vec2 st, float ab){
  return vec3(texture2D(t, st + vec2(ab, 0.)).r, texture2D(t, st).g, texture2D(t, st - vec2(ab, 0.)).b);
}

// what the CRT inside the photo shows
vec3 tvContent(vec2 s){
  // inner crt bulge
  vec2 d = s - .5;
  d *= 1. + .14*dot(d, d);
  vec2 t = d / (1. + .14*.125) + .5;
  float g = uGlitch;
  float tm = uTime;

  float line = floor(t.y * 220.);
  // tracking jitter (always a little, a lot while chewing)
  float j = hash(vec2(line, floor(tm*30.))) - .5;
  t.x += j * (.0018 + g*.02);
  // torn bands
  float bandId = floor(t.y*11. + floor(tm*9.)*.37);
  float tear = step(.78, hash(vec2(bandId, floor(tm*14.))));
  t.x += tear * g * (hash(vec2(bandId, floor(tm*14.) + 7.)) - .5) * .22;
  // wobble
  t.x += sin(t.y*26. + tm*24.) * .012 * g;
  // head-switching noise at the bottom
  float hs = smoothstep(.955, 1., t.y);
  t.x += hs * (.015 + .05*hash(vec2(line, floor(tm*20.))));

  // vertical roll: a strip [incoming | outgoing] slides through the frame
  float Y = t.y - uDir*uRoll;
  float k = floor(Y);
  float fy = fract(Y);
  float dBar = min(fy, 1. - fy);
  // skew right before the hold bar (the picture "drags")
  t.x += (1. - smoothstep(0., .18, dBar)) * g * .07 * (fy > .5 ? 1. : -.4);
  // vertical stretch of chewed tape
  fy += sin(t.x*9. + tm*30.) * .006 * g;

  vec2 st = vec2(t.x, fy);
  float ab = .0025 + g*.012;
  vec3 c;
  bool incoming = abs(k) > .5;
  if (incoming) c = sampleRGB(uTexB, st, ab);
  else if (uFromBlank > .5) {
    float n = hash(floor(st*vec2(260., 190.)) + floor(tm*24.));
    c = vec3(n*.75) + vec3(.02,.03,.06);
  } else c = sampleRGB(uTexA, st, ab);

  // vhs color: lifted blacks, a touch of desaturation and warmth
  float l = dot(c, vec3(.299,.587,.114));
  c = mix(vec3(l), c, .86);
  c = c*.9 + vec3(.035,.03,.045);

  // hold bar (black band with snow between frames)
  float bar = (1. - smoothstep(.0, .045, dBar)) * smoothstep(.0, .15, g + uFromBlank*.0);
  float sn = hash(floor(vec2(t.x*300., t.y*240.)) + floor(tm*30.));
  c = mix(c, vec3(sn*.35), bar);
  // snow overlay while chewing
  float snow = hash(floor(t*vec2(320., 240.)) + fract(tm*7.)*91.);
  c += (snow - .5) * (.07 + g*.35);
  // white streak lines
  float streak = step(.993 - g*.03, hash(vec2(line, floor(tm*20.))));
  c += streak * vec3(.5) * (.25 + g);
  // head switching
  c = mix(c, vec3(snow*.5), hs*.5);
  // crt rows
  c *= .88 + .12*sin(t.y*3.14159*360.);
  // outside the tube
  float inside = step(0., t.x)*step(t.x, 1.)*step(0., t.y)*step(t.y, 1.);
  // hover: picture comes up a bit
  c *= 1. + uHover*.08;
  return c * inside;
}

// floating dust: 4 depth layers, near ones bigger, blurrier and with more parallax
float dust(vec2 uv){
  vec2 P0 = uv * vec2(1.695, 1.);
  float acc = 0.;
  for (int L = 0; L < 4; L++) {
    float fl = float(L);
    float d = (fl + 1.) / 4.;
    float sc = mix(110., 34., d);
    vec2 P = P0 - uMouse * vec2(1., -1.) * .03 * d * d;
    P += vec2(uTime * .004 * (1. + fl), -uTime * .003 * (1. + fl * .7));
    P *= sc;
    vec2 id = floor(P);
    vec2 f = fract(P) - .5;
    float h = hash(id + fl * 31.7);
    if (h < .62) continue;
    float ph = h * 40.;
    vec2 o = (vec2(hash(id + 3.1), hash(id + 7.7)) - .5) * .5;
    o += .2 * vec2(sin(uTime * (.25 + h * .45) + ph), cos(uTime * (.2 + h * .35) + ph * 1.3));
    float r = length(f - o);
    float size = mix(.022, .045, d) * (.5 + .7 * hash(id + 11.));
    float tw = .5 + .5 * sin(uTime * (.5 + h) + ph);
    acc += exp(-r * r / (size * size)) * tw * tw * mix(1.5, .8, d);
  }
  return acc;
}

void main(){
  vec2 p = vec2(vUv.x, 1. - vUv.y);

  float rv = clamp(uReveal, 0., 1.);
  float sy = smoothstep(.0, .55, rv);
  float sx = smoothstep(.0, .25, rv);
  vec2 q = p - .5;
  q.y /= max(sy, .002);
  q.x /= max(sx, .002);
  float inside = step(abs(q.x), .5) * step(abs(q.y), .5);
  p = q + .5;

  float r2;
  vec2 uv = mapUV(p, r2);

  vec2 ca = (p - .5) * r2 * (.006 + .004*uZoomT);
  vec3 col;
  col.r = texture2D(uTex, uv + ca).r;
  col.g = texture2D(uTex, uv).g;
  col.b = texture2D(uTex, uv - ca).b;

  // ---- tv screen ----
  vec2 s = (uv - uScreen.xy) / (uScreen.zw - uScreen.xy);
  vec2 qq = abs(s - .5) * uScreenPx - (uScreenPx*.5 - 18.);
  float sd = length(max(qq, 0.)) - 18.;
  float mask = 1. - smoothstep(-1.5, .8, sd);

  // idle blue screen life
  float onScreen = smoothstep(0., .06, s.x) * smoothstep(1., .94, s.x) * smoothstep(0., .08, s.y) * smoothstep(1., .92, s.y);
  float stat = hash(floor(uv*vec2(900., 700.)) + floor(uTime*24.));
  float roll = smoothstep(.0, .06, abs(fract(s.y*.7 - uTime*.12) - .5));
  float glow = .9 + .1*sin(uTime*7.) * sin(uTime*2.3);
  col = mix(col, col*glow + vec3(.08,.1,.16)*(stat-.5)*(.6+uZoomT), onScreen*(1.-uScreenOn));
  col *= mix(1., .9 + .1*roll, onScreen*(1.-uScreenOn));

  if (uScreenOn > .001 && mask > 0.) {
    vec3 photo = col;
    vec3 tv = tvContent(s);
    // glass: tube vignette + a bit of the room reflected on it
    float tvig = smoothstep(.8, .25, length((s - .5)*vec2(1., 1.15)));
    tv *= mix(.55, 1.05, tvig);
    float refl = smoothstep(.0, .5, 1. - s.y) * smoothstep(.2, .0, abs(s.x - .35) - .25);
    tv += photo * .025 + vec3(.05,.045,.04) * refl * .5;  // the photo's own OSD must not show through
    col = mix(col, tv, mask * uScreenOn);
    // light spill from the screen onto the set
  }

  // ---- floor lamp: painted switched off, its light lives here ----
  {
    float lit = uLamp * (1. + .03*sin(uTime*1.7) * sin(uTime*.9));
    // the shade is a trapezoid (back final px: top 2312–2492 @ y335, bottom 2278–2535 @ y535): its fabric glows, more towards the open bottom
    float t = clamp((uv.y - .2136) / (.3412 - .2136), 0., 1.);
    float xl = mix(.860, .8475, t), xr = mix(.927, .943, t);
    float shadeM = smoothstep(xl - .002, xl + .007, uv.x) * smoothstep(xr + .002, xr - .007, uv.x)
                 * smoothstep(.2096, .2196, uv.y) * smoothstep(.3452, .3352, uv.y);
    float glowIn = shadeM * (.45 + .55 * t * t);
    // soft cone of light falling out of the bottom, and a little escaping through the top
    float below = max(uv.y - .341, 0.);
    float cone = (uv.y > .341 ? 1. : 0.) * exp(-pow((uv.x - .895) / (.06 + below * .55), 2.)) * exp(-below * 3.2);
    float above = max(.214 - uv.y, 0.);
    float up = (uv.y < .214 ? 1. : 0.) * exp(-pow((uv.x - .894) / (.04 + above * .35), 2.)) * exp(-above * 9.);
    vec2 dl = (uv - vec2(.895, .31)) * vec2(1.7, 1.);
    float halo = exp(-dot(dl, dl) / .06);
    float wash = exp(-dot(dl, dl) / .34);
    vec2 fp = (uv - vec2(.86, .83)) * vec2(1., 2.6);
    float pool = exp(-dot(fp, fp) / .03);
    vec3 warm = vec3(1., .74, .46);
    // the picture is painted with the lamp ON: switching it off takes that light away
    float off = 1. - uLamp;
    col *= 1. - off * clamp(glowIn * .62 + wash * .42 + pool * .38 + cone * .3 + up * .2 + halo * .15, 0., .8);
    col = mix(col, col * vec3(.93, .96, 1.04), off * wash);          // cooler once the warm bulb is out
    col *= 1. + (lit - uLamp) * wash * .9;                            // a faint living flicker while it's on
  }

  // hovered item: soft lift, like the player's eye catching it
  vec2 hc = (uHi.xy + uHi.zw) * .5, hh = (uHi.zw - uHi.xy) * .5;
  // a rounded box with an edge that fades over a share of its size: no visible rectangle on a plain wall
  // (fully rounded ends + a wide fade, so it reads as a soft glow, not a box)
  float hs = min(hh.x, hh.y), hr = hs, hf = hs * .85;
  vec2 hq = abs(uv - hc) - hh + hr;
  float hdist = length(max(hq, 0.)) + min(max(hq.x, hq.y), 0.) - hr;
  float hm = 1. - smoothstep(-hf, hf * .6, hdist);
  hm *= hm * (3. - 2. * hm);
  col = mix(col, col * 1.28 + vec3(.035, .028, .018), hm * uHiAmt);

  // dust caught in the lamp light (right side), faint everywhere else
  float beam = smoothstep(.56, .8, uv.x) * smoothstep(.22, .42, uv.y) * smoothstep(1., .72, uv.y);
  beam *= .55 + .7 * smoothstep(.45, .0, length((uv - vec2(.9, .36)) * vec2(1., 1.3)));
  beam += .04;
  beam *= .2 + .8 * uLamp;   // the dust only shows in the light
  col += vec3(1., .82, .58) * dust(uv) * beam * .6;

  float sl = .5 + .5*sin(gl_FragCoord.y * 3.14159 * .5);
  col *= 1. - .055*sl;
  float ap = .5 + .5*sin(gl_FragCoord.x * 3.14159 * .66);
  col *= 1. - .02*ap;
  float gr = hash(gl_FragCoord.xy + fract(uTime*13.7)*500.) - .5;
  col += gr * .055;
  float band = smoothstep(.0, .12, abs(fract(vUv.y + uTime*.045) - .5));
  col *= .985 + .015*band;
  col *= .985 + .015*hash(vec2(floor(uTime*30.), 1.));

  vec2 v = vUv - .5;
  float vig = smoothstep(.85, .25, length(v*vec2(1.05, 1.15)));
  col *= mix(.55, 1., vig);

  col = col * inside + vec3(1.) * (1. - smoothstep(.0, .7, rv)) * inside * 1.4;
  col *= inside;
  gl_FragColor = vec4(col, 1.);
}`;

  function sh(type, src) {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog); gl.useProgram(prog);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = {};
  ['uTex','uTexA','uTexB','uLook','uTan','uRes','uScale','uCenter','uMouse','uDist','uTime','uReveal','uZoomT','uScreen','uScreenPx',
   'uScreenOn','uRoll','uDir','uGlitch','uFromBlank','uHover','uHi','uHiAmt','uLamp'].forEach(n => U[n] = gl.getUniformLocation(prog, n));

  function makeTex(src) {
    const t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    if (src) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
    else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0,0,0,255]));
    return t;
  }
  const roomTex = makeTex(null);

  /* ---- camera look-around (see mapUV in the shader) ---- */
  const FOV_X = 65 * Math.PI / 180;                     // assumed lens of the illustration
  const TAN_X = Math.tan(FOV_X / 2), TAN_Y = TAN_X * IMG_H / IMG_W;
  const LOOK_CAP = 9 * Math.PI / 180;                  // never turn more than this
  const LOOK_SAFE = .8;                                 // keep corners (perspective stretch) inside the picture
  const clamp1 = v => Math.max(-1, Math.min(1, v));
  // how far the camera may turn each way = the real margin left in the picture on that side
  // (back2 has extra canvas below and to the right, so looking down/right goes further)
  function lookLimits() {
    const v = view();
    const xl = (v.cx - v.hx - .5) * 2 * TAN_X, xr = (v.cx + v.hx - .5) * 2 * TAN_X;
    const yt = -(v.cy - v.hy - .5) * 2 * TAN_Y, yb = -(v.cy + v.hy - .5) * 2 * TAN_Y;
    const lim = a => Math.max(0, Math.min(LOOK_CAP, a * LOOK_SAFE));
    return {
      left: lim(Math.atan(xl) + Math.atan(TAN_X)), right: lim(Math.atan(TAN_X) - Math.atan(xr)),
      up: lim(Math.atan(TAN_Y) - Math.atan(yt)), down: lim(Math.atan(yb) + Math.atan(TAN_Y)),
    };
  }
  const look = () => {
    const L = lookLimits(), mx = clamp1(S.mouse[0]), my = clamp1(S.mouse[1]);
    return [mx > 0 ? mx * L.right : mx * L.left, my > 0 ? my * L.up : my * L.down];
  };

  /* ================= PROJECT TEXTURES ================= */
  // nothing to show yet: the VCR's own blue screen
  function drawBlank(c) { c.fillStyle = '#1b2aa8'; c.fillRect(0, 0, TEX_W, TEX_H); }
  // a project with no picture of its site: its cover, whole, in the middle of the tube over a dimmed copy of itself
  function drawCoverArt(c, im) {
    const W = im.naturalWidth, H = im.naturalHeight, k = TEX_H / H, w = W * k, fill = W * TEX_H / TEX_W;
    c.fillStyle = '#0b0a09'; c.fillRect(0, 0, TEX_W, TEX_H);
    c.globalAlpha = .28; c.drawImage(im, 0, (H - fill) / 2, W, fill, 0, 0, TEX_W, TEX_H); c.globalAlpha = 1;
    c.drawImage(im, (TEX_W - w) / 2, 0, w, TEX_H);
  }

  // widescreen site on a 4:3 tube: fit the whole width and letterbox it, like a film on an old TV
  // stretched to the shape of the tube, like an old TV squeezing a widescreen picture — on purpose
  function drawCover(c, src, crop) {
    const W = src.videoWidth || src.naturalWidth, H = src.videoHeight || src.naturalHeight;
    const [sx, sy, sw, sh] = crop || [0, 0, W, H];
    c.drawImage(src, sx, sy, sw, sh, 0, 0, TEX_W, TEX_H);
  }

  function drawOSD(c, p, i) {
    c.save();
    c.font = '46px VT323, monospace'; c.textBaseline = 'top';
    c.shadowColor = 'rgba(0,0,0,.8)'; c.shadowOffsetX = 3; c.shadowOffsetY = 3; c.shadowBlur = 0;
    c.fillStyle = '#eaffef';
    c.fillText('PLAY ▶', 44, 34);
    const ch = 'CH ' + String(i + 1).padStart(2, '0');
    c.fillText(ch, TEX_W - 44 - c.measureText(ch).width, 34);
    c.textBaseline = 'bottom';
    c.fillText('SP  ' + p.title.toUpperCase(), 44, TEX_H - 30);
    if (performance.now() < volOSD.until) {   // the set's VOLUME buttons: a classic green bar for a moment
      const n = 10, sw = 22, gap = 9, W = n * sw + (n - 1) * gap, x0 = (TEX_W - W) / 2, y0 = TEX_H * .66;
      c.textBaseline = 'bottom'; c.fillStyle = '#9dffb0';
      const lbl = volOSD.level ? 'VOLUME' : 'MUTE';
      c.fillText(lbl, (TEX_W - c.measureText(lbl).width) / 2, y0 - 10);
      for (let k = 0; k < n; k++) {
        c.fillStyle = k < volOSD.level ? '#9dffb0' : 'rgba(157,255,176,.22)';
        c.fillRect(x0 + k * (sw + gap), y0, sw, 34);
      }
    }
    c.restore();
  }
  const volOSD = { level: 0, until: 0, timer: 0 };
  const projIm = [];   // each still channel's picture, to redraw its OSD
  function redrawStill(i) {
    if (videoProj.some(e => e.i === i && e.ok)) return;   // clips redraw their OSD every frame anyway
    gl.bindTexture(gl.TEXTURE_2D, projTex[i]);
    try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, buildProjectTexture(PROJECTS[i], i, projIm[i] || null)); } catch (e) {}
  }
  function showVolume(level) {
    volOSD.level = level; volOSD.until = performance.now() + 1800;
    redrawStill(G.cur);
    clearTimeout(volOSD.timer);
    volOSD.timer = setTimeout(() => redrawStill(G.cur), 1850);
  }

  function buildProjectTexture(p, i, im) {
    const cv = document.createElement('canvas'); cv.width = TEX_W; cv.height = TEX_H;
    const c = cv.getContext('2d');
    if (!im) drawBlank(c); else if (p.img) drawCover(c, im, p.crop); else drawCoverArt(c, im);
    drawOSD(c, p, i);
    return cv;
  }

  const projTex = PROJECTS.map(() => makeTex(null));
  function prepareProjects() {
    PROJECTS.forEach((p, i) => {
      const put = im => {
        projIm[i] = im;
        gl.bindTexture(gl.TEXTURE_2D, projTex[i]);
        try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, buildProjectTexture(p, i, im)); }
        catch (e) {
          // file:// pictures taint the canvas — keep the blue screen, run via a local server to see real ones
          console.warn('Screenshot blocked (open the site through a server):', p.img);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, buildProjectTexture(p, i, null));
        }
      };
      put(null);
      const embedded = window.PROJECT_DATA || {};
      const pic = p.img || p.cover;
      if (pic) { const im = corsify(new Image()); im.onload = () => put(im); im.src = embedded[pic] || ASSET(pic); }
      if (p.video) {
        const v = corsify(document.createElement('video'));
        v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'auto';
        if (embedded[p.video]) {   // opened from disk: play the embedded copy through a blob URL
          const [head, b64] = embedded[p.video].split(','), bin = atob(b64), bytes = new Uint8Array(bin.length);
          for (let k = 0; k < bin.length; k++) bytes[k] = bin.charCodeAt(k);
          v.src = URL.createObjectURL(new Blob([bytes], { type: head.slice(5).split(';')[0] }));
        } else v.src = encodeURI(ASSET(p.video));
        const cv = document.createElement('canvas'); cv.width = TEX_W; cv.height = TEX_H;
        const e = { i, p, v, cv, c: cv.getContext('2d'), ok: true, lastT: -1 };
        v.addEventListener('loadeddata', () => updateVideoTex(e, true));
        videoProj.push(e);
      }
    });
  }
  const videoProj = [];
  function updateVideoTex(e, force) {
    if (!e.ok || e.v.readyState < 2) return;
    if (!force && e.v.currentTime === e.lastT) return;   // only when a new video frame is there
    e.lastT = e.v.currentTime;
    drawCover(e.c, e.v, e.p.crop); drawOSD(e.c, e.p, e.i);
    gl.bindTexture(gl.TEXTURE_2D, projTex[e.i]);
    try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, e.cv); }
    catch (err) { e.ok = false; console.warn('Video blocked (open the site through a server):', e.p.video); }
  }
  // play a clip only while its channel is on the tube
  function tickVideos() {
    if (VP.on) { if (!VP.cam && !VP.forceMute && VP.v.muted === Sound.isOn()) VP.v.muted = !Sound.isOn(); vpDraw(); }
    videoProj.forEach(e => {
      const onTube = G.onT > 0 && !(VP.shown && !G.active) && (e.i === G.cur || (G.active && e.i === G.next));
      if (onTube && e.v.paused) e.v.play().catch(() => {});
      if (!onTube && !e.v.paused) e.v.pause();
      if (onTube) updateVideoTex(e);
    });
  }

  /* ---- view state ---- */
  const S = {
    zoom: 1, zoomFrom: 1, zoomTo: 1, zT0: 0, zDur: 2600,
    mouse: [0, 0], mouseT: [0, 0], pan: [0, 0], panT: [0, 0],
    tilt: [0, 0], tiltT: [0, 0],                 // phones: how far tilting the device moves the view
    dist: .32, reveal: 0, revealT0: 0, zoomed: false, started: false,
    tv: false,                                   // zoomed in on the TV (gallery) vs. just leaning in to look at a spot
    fc: null, fcFrom: null, fcTo: null,          // where the camera looks (image uv), animated with the zoom
  };
  const TOUCH = matchMedia('(pointer: coarse)').matches;   // phones and tablets: drag to look around, tap to open
  const ROOM_ZOOM = () => Math.min(2, Math.max(1.5, zoomIn() * .85));   // leaning in to look at any spot
  const BASE_DIST = .3;   // lens bulge: gentler, so things at the edges don't swim while turning
  const OVERSCAN = .9;    // how much of the picture the resting frame shows (the rest is turning room)

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  addEventListener('resize', resize); resize();

  // how close to come: the whole set (tube + VCR) fills TV_FILL of the frame height (or 90% of width on narrow screens)
  function zoomIn() {
    const sa = innerWidth / innerHeight, ia = IMG_W / IMG_H;
    let hx = .5, hy = .5;
    if (sa > ia) hy = .5 * ia / sa; else hx = .5 * sa / ia;
    const mag = 1 + BASE_DIST * .32 + .1;            // lens bulge magnifies the centre
    const R = VP.close ? PLAY_R : TV, fill = VP.close ? .94 : TV_FILL;
    const tvH = (R.y1 - R.y0) / IMG_H, tvW = (R.x1 - R.x0) / IMG_W;
    const zH = fill * 2 * hy * OVERSCAN / (tvH * mag);
    const zW = .94 * 2 * hx * OVERSCAN / (tvW * mag);
    return Math.max(1.3, Math.min(VP.close ? 4.2 : ZOOM_MAX, zH, zW));
  }

  function view(noPan) {
    const sa = innerWidth / innerHeight, ia = IMG_W / IMG_H;
    let hx = .5, hy = .5;
    if (sa > ia) hy = .5 * ia / sa; else hx = .5 * sa / ia;
    hx *= OVERSCAN / S.zoom; hy *= OVERSCAN / S.zoom;
    let [cx, cy] = S.fc || HOME;
    if (!noPan) { cx += S.pan[0] + S.tilt[0]; cy += S.pan[1] + S.tilt[1]; }
    cx = Math.min(Math.max(cx, hx + .01), 1 - hx - .01);
    cy = Math.min(Math.max(cy, hy + .01), 1 - hy - .01);
    return { hx, hy, cx, cy };
  }

  function screenToImage(px, py) {
    const v = view();
    let c = [px - .5, py - .5];
    const a = innerWidth / innerHeight;
    const cc = [c[0] * a / Math.max(a, 1), c[1] / Math.max(a, 1)];
    const r2 = cc[0] * cc[0] + cc[1] * cc[1];
    const f = (1 + S.dist * r2) / (1 + S.dist * .32);
    c = [c[0] * f, c[1] * f];
    const ux = v.cx + c[0] * 2 * v.hx, uy = v.cy + c[1] * 2 * v.hy;
    // same camera rotation as the shader
    const [yaw, pitch] = look();
    let d = [(ux - .5) * 2 * TAN_X, -(uy - .5) * 2 * TAN_Y, -1];
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    d = [d[0], d[1] * cp - d[2] * sp, d[1] * sp + d[2] * cp];
    d = [d[0] * cy - d[2] * sy, d[1], d[0] * sy + d[2] * cy];
    const X = d[0] / -d[2], Y = d[1] / -d[2];
    return [(X / (2 * TAN_X) + .5) * IMG_W, (-Y / (2 * TAN_Y) + .5) * IMG_H];
  }
  function screenToView(px, py) {
    const v = view();
    let c = [px - .5, py - .5];
    const a = innerWidth / innerHeight;
    const cc = [c[0] * a / Math.max(a, 1), c[1] / Math.max(a, 1)];
    const f = (1 + S.dist * (cc[0] * cc[0] + cc[1] * cc[1])) / (1 + S.dist * .32);
    return [v.cx + c[0] * f * 2 * v.hx, v.cy + c[1] * f * 2 * v.hy];
  }
  const inRect = (e, R) => {
    const [x, y] = screenToImage(e.clientX / innerWidth, e.clientY / innerHeight);
    return x > R.x0 && x < R.x1 && y > R.y0 && y < R.y1;
  };

  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // the other way round: where a point of the picture lands on screen (0..1), solved with a few Newton steps
  function imageToScreen(ix, iy, guess) {
    let p = guess ? guess.slice() : [.5, .5];
    for (let k = 0; k < 6; k++) {
      const a = screenToImage(p[0], p[1]), ex = ix - a[0], ey = iy - a[1];
      if (Math.abs(ex) + Math.abs(ey) < .05) break;
      const h = .002, bx = screenToImage(p[0] + h, p[1]), by = screenToImage(p[0], p[1] + h);
      const j00 = (bx[0] - a[0]) / h, j10 = (bx[1] - a[1]) / h, j01 = (by[0] - a[0]) / h, j11 = (by[1] - a[1]) / h;
      const det = j00 * j11 - j01 * j10; if (!det) break;
      p = [p[0] + (j11 * ex - j01 * ey) / det, p[1] + (-j10 * ex + j00 * ey) / det];
    }
    return p;
  }
  /* ---- the "push the buttons" sticker on the set: shown up close until a VCR button has been pressed ---- */
  const tvTip = document.getElementById('tvTip'), TIP_AT = [1519, 892];   // its centre on the picture: the set's lower right corner, over the speaker grille
  let tipDone = false, tipP = null;   // back on every page load, until a button of the set has been pressed
  function tvTipTick() {
    const want = !tipDone && S.tv && document.body.classList.contains('gallery') && !document.body.classList.contains('note');
    if (want !== tvTip.classList.contains('show')) tvTip.classList.toggle('show', want);
    if (!want && !tvTip.classList.contains('gone')) { tipP = null; return; }
    tipP = imageToScreen(TIP_AT[0], TIP_AT[1], tipP);
    const q = imageToScreen(TIP_AT[0] + 100, TIP_AT[1], tipP);
    const sc = Math.hypot((q[0] - tipP[0]) * innerWidth, (q[1] - tipP[1]) * innerHeight) / 100;
    tvTip.style.transform = `translate(${(tipP[0] * innerWidth).toFixed(1)}px, ${(tipP[1] * innerHeight).toFixed(1)}px)`;
    tvTip.style.setProperty('--s', sc.toFixed(3) + 'px');
  }
  function tvTipUsed() {
    if (tipDone) return; tipDone = true;
    tvTip.classList.add('gone'); tvTip.classList.remove('show');
    setTimeout(() => tvTip.classList.remove('gone'), 700);
  }

  /* ================= GALLERY ================= */
  const G = {
    cur: 0, next: 0, active: false, t0: 0, dur: 1300, dir: 1, fromBlank: 1,
    on: 0, onT: 0, burst: 0, timer: 0, hover: 0, hoverT: 0,
  };
  /* ---- a project's tape playing in the VCR: its long video on the tube, run by the set's own buttons ---- */
  const VP = { on: false, shown: false, close: false, paused: false, title: '', seekUntil: 0, seekDir: 1, endT: 0,
    v: corsify(document.createElement('video')), cv: document.createElement('canvas'), tex: makeTex(null) };
  VP.v.playsInline = true; VP.v.preload = 'auto';
  VP.cv.width = TEX_W; VP.cv.height = TEX_H; VP.c = VP.cv.getContext('2d');
  // up close for watching: the glass and its bezel fill the frame
  const PLAY_R = { x0: 1190, y0: 548, x1: 1515, y1: 800 };
  const gIdx = document.getElementById('gIdx'), gName = document.getElementById('gName'), gLink = document.getElementById('gLink');
  const pad = n => String(n).padStart(2, '0');

  function scramble(el, text) {
    const chars = '█▓▒░#/<>_-=+*';
    let f = 0; const n = 14;
    clearInterval(el._t);
    el._t = setInterval(() => {
      f++;
      el.textContent = text.split('').map((ch, i) => ch === ' ' ? ' ' : (i < text.length * f / n ? ch : chars[(Math.random() * chars.length) | 0])).join('');
      if (f >= n) { clearInterval(el._t); el.textContent = text; }
    }, 35);
  }
  function setCaption(i) {
    const p = PROJECTS[i];
    gIdx.textContent = `${pad(i + 1)} / ${pad(PROJECTS.length)}`;
    scramble(gName, p.title);
  }

  function roll(to, dir, fromBlank) {
    G.next = to; G.dir = dir; G.fromBlank = fromBlank ? 1 : 0;
    G.t0 = performance.now(); G.active = true;
    setCaption(to);
    Sound.tape();
  }
  function go(step) {
    if (!document.body.classList.contains('gallery') || G.active || VP.on) return;
    const n = PROJECTS.length;
    roll((G.cur + step + n) % n, step > 0 ? 1 : -1, false);
  }
  document.getElementById('prev').addEventListener('click', () => go(-1));
  document.getElementById('next').addEventListener('click', () => go(1));

  function openGallery() {
    document.body.classList.add('gallery');
    G.onT = 1;
    roll(G.cur, 1, true);
  }
  function closeGallery() {
    document.body.classList.remove('gallery');
    G.onT = 0; G.burst = 1; G.active = false;
    clearTimeout(G.timer);
  }

  // z > 1 zooms in: on the TV by default (opens the gallery), or on any spot of the room (focus = image uv)
  function zoomTo(z, focus) {
    if (VP.on) vpEnd(true);   // walking away from the set: the tape just stops
    const v = view(!TOUCH);   // on a phone the camera may be anywhere in the room: set off from where it is looking
    if (TOUCH) { S.pan = [0, 0]; S.panT = [0, 0]; S.tilt = [0, 0]; }
    S.fcFrom = [v.cx, v.cy]; S.fc = S.fcFrom.slice();
    const wasTv = S.tv;
    S.tv = z > 1 && !focus;
    if (z > 1) S.tvFx = S.tv;                    // the TV's own screen effects ride on the TV zoom only
    S.fcTo = z <= 1 ? HOME : focus || FOCUS;
    S.zDur = S.tv ? 2600 : focus ? 1500 : wasTv ? 2200 : 1300;
    S.zoomFrom = S.zoom; S.zoomTo = z; S.zT0 = performance.now();
    S.zoomed = z > 1;
    document.body.classList.toggle('zoomed', S.zoomed);
    canvas.classList.toggle('zoomed', S.zoomed);
    canvas.classList.remove('hot');
    Sound.whoosh(S.zoomed);
    clearTimeout(G.timer);
    if (!S.zoomed) S.panT = [0, 0];
    if (S.tv) G.timer = setTimeout(openGallery, S.zDur * .72);
    else closeGallery();
  }

  /* ---- pointer ---- */
  const tag = document.getElementById('tag'), tagText = document.getElementById('tagText');
  const tagPos = { x: 0, y: 0, tx: 0, ty: 0, init: false };
  // hand-drawn ring: an imperfect loop that slightly overshoots its start, redrawn a few times a second ("line boil")
  const tagRing = document.getElementById('tagRing');
  function wobblyRing() {
    const n = 16, a0 = Math.random() * Math.PI * 2, span = Math.PI * 2 + .35 + Math.random() * .2;
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, a = a0 + span * t;
      const r = 44 + (t * 3.2) + (Math.random() - .5) * 2.6;
      pts.push([50 + Math.cos(a) * r, 50 + Math.sin(a) * r * (.96 + Math.random() * .04)]);
    }
    let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    return d;
  }
  const RINGS = [wobblyRing(), wobblyRing(), wobblyRing()];
  let ringI = 0;
  tagRing.setAttribute('d', RINGS[0]);
  setInterval(() => { if (tag.classList.contains('show')) tagRing.setAttribute('d', RINGS[ringI = (ringI + 1) % RINGS.length]); }, 130);
  function overScreen(e) { return inRect(e, SCR); }
  // the set's own buttons run the channels (back final.jpg pixels); live only while we're at the TV
  const VCR = [
    { id: 'ch-up',   r: [1495, 812, 1535, 825], hint: 'Next channel', badge: 'Next<br>channel',     act: () => go(1) },
    { id: 'ch-down', r: [1495, 830, 1535, 844], hint: 'Previous channel', badge: 'Previous<br>channel', act: () => go(-1) },
    { id: 'ff',      r: [1350, 868, 1385, 891], hint: 'Next channel', badge: 'Next<br>channel',     act: () => go(1) },
    { id: 'rew',     r: [1272, 868, 1308, 891], hint: 'Previous channel', badge: 'Previous<br>channel', act: () => go(-1) },
    { id: 'play',    r: [1308, 868, 1350, 891], hint: 'Check out the project', badge: 'Check out<br>the project', act: () => { if (!G.active) openTape(); } },
    { id: 'stop',    r: [1237, 868, 1272, 891], hint: 'Turn off the TV', badge: 'Turn<br>it off',      act: () => zoomTo(1) },
    { id: 'eject',   r: [1184, 836, 1214, 852], hint: 'Eject the tape to see the details', act: () => openTape() },
    { id: 'door',    r: [1232, 806, 1472, 846], hint: 'Eject the tape to see the details', act: () => openTape() },
    { id: 'power',   r: [1184, 864, 1212, 891], hint: 'Turn off the TV', badge: 'Turn<br>it off',      act: () => zoomTo(1) },
    { id: 'vol-down', r: [1492, 850, 1514, 863], hint: 'Volume down', act: () => showVolume(Sound.volume(-1)) },
    { id: 'vol-up',   r: [1515, 850, 1538, 863], hint: 'Volume up', act: () => showVolume(Sound.volume(1)) },
    { id: 'rec',     r: [1385, 868, 1424, 891], hint: 'Be on TV (don\u2019t worry, nothing is recorded)', act: () => camStart() },
  ].map(b => ({ ...b, vcr: true, x0: b.r[0], y0: b.r[1], x1: b.r[2], y1: b.r[3] }));
  const VP_BTN = {
    play: ['Pause / play', () => vpPause()], ff: ['Fast forward', () => vpSeek(1)], rew: ['Rewind', () => vpSeek(-1)],
    stop: ['Stop the tape', () => vpStop()], eject: ['Eject the tape', () => vpStop()], door: ['Eject the tape', () => vpStop()],
    power: ['Turn off the TV', null], 'ch-up': ['Stop the tape', () => vpEnd()], 'ch-down': ['Stop the tape', () => vpEnd()],
    rec: ['Stop', () => vpStop()],
  };
  VCR.forEach(b => { if (VP_BTN[b.id]) { b.vpHint = VP_BTN[b.id][0]; b.vpAct = VP_BTN[b.id][1]; } });
  const vcrPress = b => (VP.on && b.vpAct ? b.vpAct : b.act)();
  const vcrHint = b => VP.on && b.vpHint ? (VP.cam && b.id !== 'power' ? (b.id === 'play' ? 'Freeze frame' : b.id === 'ff' || b.id === 'rew' ? '' : 'Stop recording') : b.vpHint) : b.hint;
  const vcrAt = e => S.tv && !VP.close && document.body.classList.contains('gallery') ? VCR.find(b => inRect(e, b)) || null : null;

  // the tape goes into the set: the picture rolls over to it (same hiccup as a channel change), the camera leans in
  function vpRoll(dir) {
    G.next = G.cur; G.dir = 1; G.fromBlank = 0; G.t0 = performance.now(); G.active = true; G.tape = dir;
    Sound.tape();
  }
  function vpCamera(on, dur = on ? 1500 : 900) {
    const v = view(true);
    S.fcFrom = [v.cx, v.cy]; S.fc = S.fcFrom.slice();
    VP.close = on; document.body.classList.toggle('vp-close', on);
    S.fcTo = on ? [(PLAY_R.x0 + PLAY_R.x1) / 2 / IMG_W, (PLAY_R.y0 + PLAY_R.y1) / 2 / IMG_H] : FOCUS;
    S.zoomFrom = S.zoom; S.zoomTo = zoomIn(); S.zT0 = performance.now(); S.zDur = dur; S.panT = [0, 0];
  }
  // where the tape's video comes from: the file itself, or (opened from disk) its embedded copy as a blob,
  // since WebGL won't take frames of a local file
  const tapeBlobs = {};
  async function tapeSrc(path) {
    if (location.protocol !== 'file:') return encodeURI(ASSET(path));
    if (tapeBlobs[path]) return tapeBlobs[path];
    if (!window.TAPE_DATA) await new Promise(res => { const sc = document.createElement('script'); sc.src = 'tapes-data.js'; sc.onload = sc.onerror = res; document.head.appendChild(sc); });
    const d = window.TAPE_DATA && window.TAPE_DATA[path]; if (!d) return null;
    const [head, b64] = d.split(','), bin = atob(b64), bytes = new Uint8Array(bin.length);
    for (let k = 0; k < bin.length; k++) bytes[k] = bin.charCodeAt(k);
    return (tapeBlobs[path] = URL.createObjectURL(new Blob([bytes], { type: head.slice(5).split(';')[0] })));
  }
  // "Play the site": the cassette leaves the hand, flies into the VCR, the set shows its blue screen, then the tape
  async function vpStart(t) {
    if (VP.on || !S.tv) return;
    VP.on = true; VP.cam = false; VP.paused = false; VP.title = t.title; VP.seekUntil = 0; VP.ready = false;
    VP.blueUntil = 1e15; VP.trackUntil = 0;
    document.body.classList.add('vcr-play');
    Sound.duck(true);
    // 1. the cassette is pulled the rest of the way out of its sleeve: still the real one, under the sleeve's edge
    const tapeEl = tapeLayer.querySelector('.tcase .tape');
    tcase.classList.add('pullout'); Sound.slide();
    await new Promise(res => setTimeout(res, 340));
    if (!VP.on) { tcase.classList.remove('pullout'); return; }
    // 2. clear of the sleeve: the flying copy takes over unseen (same place, size, handwriting, sticker),
    //    and the shelf is put away: the neighbours slide off the edges, the empty sleeve is tossed down to the left
    const r = tapeEl.getBoundingClientRect();
    const from = { x: r.left + r.width / 2, y: r.top + r.height / 2, W: tapeEl.offsetWidth, H: tapeEl.offsetHeight,
      fs: getComputedStyle(tapeLayer.querySelector('.tcase .label')).fontSize, title: t.title,
      w: getComputedStyle(tapeLayer).getPropertyValue('--w'), stick: t.sticker || '' };
    tapeLayer.classList.add('launch'); closeTape();
    setTimeout(() => { tapeLayer.classList.remove('launch'); tcase.classList.remove('pullout'); }, 1000);
    FT.from = from;
    ftInsert(from, () => {
      if (!VP.on) return;
      vpCamera(true);   // the tape is in: lean in to watch
      const now = performance.now();
      VP.shown = true; VP.blueUntil = now + 450; VP.trackUntil = now + 450 + 750; G.burst = .6;   // blue screen, then the tracking settles
      const t1 = performance.now();
      const go = () => {
        if (!VP.on || VP.cam) return;
        if (!VP.ready) {   // still unpacking the video (opened from disk): the blue screen waits; give up after a while
          if (VP.noSrc || performance.now() - t1 > 6000) { VP.noSrc = false; vpEnd(true); openVideo(t.video, t.title); return; }
          VP.blueUntil = performance.now() + 450; VP.trackUntil = VP.blueUntil + 750; return setTimeout(go, 150);
        }
        VP.forceMute = false; VP.v.play().catch(() => { VP.forceMute = true; VP.v.muted = true; VP.v.play().catch(() => {}); });
      };
      setTimeout(go, 450);
    });
    const src = await tapeSrc(t.video);
    if (!VP.on) return;
    if (!src) { VP.noSrc = true; return; }
    VP.v.src = src; VP.v.currentTime = 0; VP.v.muted = !Sound.isOn(); VP.v.load(); VP.ready = true;
    VP.v.play().then(() => { if (!VP.shown || VP.blueUntil > performance.now()) { VP.v.pause(); VP.v.currentTime = 0; } }).catch(() => {});   // unlock playback while the click still counts
  }
  /* ---- the cassette's flight into the set (and out again) ---- */
  const DOOR = { x0: 1232, y0: 806, x1: 1472, y1: 846 };   // the VCR's cassette door, picture pixels
  const ftWrap = document.getElementById('ftWrap'), ftEl = document.getElementById('ft'), ftGap = document.getElementById('ftGap');
  const FT = { W: 0, H: 0, raf: 0, rx: 83 };   // at the slot it's nearly level: you see its spine going straight in
  const sm = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const easeI = t => t * t * t;
  const easeIO = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const easeBack = t => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);
  const onScreen = (x, y) => { const p = imageToScreen(x, y); return [p[0] * innerWidth, p[1] * innerHeight]; };
  function slotGeo() {
    const a = onScreen(DOOR.x0 + 4, DOOR.y0 + 3), b = onScreen(DOOR.x1 - 4, DOOR.y0 + 3);
    const c = onScreen(DOOR.x1 - 4, DOOR.y1 - 5), d = onScreen(DOOR.x0 + 4, DOOR.y1 - 5);
    return { a, b, c, d, w: Math.hypot(b[0] - a[0], b[1] - a[1]), cx: (a[0] + b[0]) / 2, top: (a[1] + b[1]) / 2 };
  }
  // the cassette lying in front of the door, its far edge on the door's top line
  function landing(g) {
    const sc = .97 * g.w / (FT.W * .964), h = FT.H * .93 * sc * Math.cos(FT.rx * Math.PI / 180);   // as wide as the opening (minus the picture's margin)
    return { x: g.cx, y: g.top + 3 + h / 2, sc };
  }
  function ftPlace(x, y, rz, sc, rx, depth, alpha = 1) {
    ftEl.style.setProperty('--dark', Math.max(0, Math.min(.88, depth * .9)).toFixed(3));
    ftEl.style.transform = `translate(${(x - FT.W / 2).toFixed(1)}px, ${(y - FT.H / 2).toFixed(1)}px) perspective(${FT.W * 4}px) rotateZ(${rz.toFixed(2)}deg) scale(${sc.toFixed(4)}) rotateX(${rx.toFixed(2)}deg) translateY(${(-depth * FT.H).toFixed(1)}px)`;
    ftEl.style.opacity = alpha;
  }
  function ftClip(g, on) { ftWrap.style.clipPath = on ? `polygon(0 ${g.top.toFixed(1)}px, 100% ${g.top.toFixed(1)}px, 100% 100%, 0 100%)` : 'none'; }
  function ftGapAt(g, a) {
    ftGap.style.clipPath = `polygon(${[g.a, g.b, g.c, g.d].map(p => p[0].toFixed(1) + 'px ' + p[1].toFixed(1) + 'px').join(',')})`;
    ftGap.style.opacity = a;
  }
  function ftDress(from) {   // the copy's sticker, as on the cassette in hand
    ftEl.style.setProperty('--w', from.w);
    document.getElementById('ftSticker').style.setProperty('--stick', from.stick || '');
  }
  function ftStop() { cancelAnimationFrame(FT.raf); ftWrap.classList.remove('on'); ftClip(null, false); ftGap.style.opacity = 0; }
  function ftRun(f) { cancelAnimationFrame(FT.raf); const t0 = performance.now(); const step = () => { if (f(performance.now() - t0) !== false) FT.raf = requestAnimationFrame(step); }; FT.raf = requestAnimationFrame(step); }
  // from the hand (the tape in its sleeve) into the slot; done() when it has been taken in
  function ftInsert(from, done) {
    FT.W = from.W; FT.H = from.H;
    ftEl.style.width = FT.W + 'px'; ftEl.style.height = FT.H + 'px';
    document.getElementById('ftLabel').textContent = from.title;
    ftEl.querySelector('.label').style.fontSize = from.fs;
    ftDress(from);
    ftWrap.classList.add('on'); ftClip(null, false); ftGap.style.opacity = 0;
    const dir = [Math.cos(-4 * Math.PI / 180), Math.sin(-4 * Math.PI / 180)], out = FT.H * .62;
    let slid = false, taken = false;
    // one continuous move from the hand to the door (starts and ends at rest, no stops on the way), a breath, then pushed in
    const TF = 1500, TH = TF + 140, TM = TH + 680;
    ftRun(ms => {
      const g = slotGeo(), L = landing(g);
      if (ms < TF) {
        const u = easeIO(ms / TF), v = 1 - u;
        // a curve that first carries on out of the sleeve, then comes to the door from the front (from below on screen)
        const B0 = [from.x, from.y], B1 = [from.x + dir[0] * out * .9, from.y + dir[1] * out * .9 - FT.H * .3];
        const B2 = [L.x + (B1[0] - L.x) * .25, L.y + FT.H * L.sc * .45], B3 = [L.x, L.y];
        const x = v * v * v * B0[0] + 3 * v * v * u * B1[0] + 3 * v * u * u * B2[0] + u * u * u * B3[0];
        const y = v * v * v * B0[1] + 3 * v * v * u * B1[1] + 3 * v * u * u * B2[1] + u * u * u * B3[1];
        ftPlace(x, y, -90 * (1 - sm(.1, .78, u)), 1 + (L.sc - 1) * sm(.05, .95, u), FT.rx * sm(.35, 1, u), 0);
        ftClip(null, false); ftGapAt(g, 0);
      } else if (ms < TH) {   // lined up at the door
        ftPlace(L.x, L.y, 0, L.sc, FT.rx, 0);
        ftGapAt(g, sm(0, 1, (ms - TF) / (TH - TF)) * .6);
      } else if (ms < TM) {   // pushed in gently, then the mechanism takes it, faster and faster
        if (!slid) { slid = true; Sound.slide(); }
        const k = (ms - TH) / (TM - TH), d = k * k * (.55 + .45 * k * k);
        ftClip(g, true); ftGapAt(g, .6 + .4 * Math.min(1, k * 3));
        ftPlace(L.x, L.y, 0, L.sc, FT.rx, d);
      } else {   // taken: the flap closes behind it
        if (!taken) { taken = true; ftEl.style.opacity = 0; Sound.load(); S.pan[1] += .0035; done(); }
        const k = (ms - TM) / 320; ftGapAt(g, Math.max(0, 1 - sm(0, 1, k)));
        if (k >= 1) { ftStop(); return false; }
      }
    });
  }
  // STOP / EJECT: the mechanism pushes the tape half out with a spring, then it's lifted away
  function ftEject() {
    if (!FT.W) return;
    ftWrap.classList.add('on'); ftEl.style.opacity = 1;
    Sound.eject();
    ftRun(ms => {
      const g = slotGeo(), L = landing(g);
      if (ms < 460) { ftClip(g, true); ftGapAt(g, 1); ftPlace(L.x, L.y, 0, L.sc, FT.rx, 1 - .62 * easeBack(ms / 460)); }
      else if (ms < 680) { ftClip(g, true); ftGapAt(g, 1); ftPlace(L.x, L.y, 0, L.sc, FT.rx, .38); }
      else {   // taken out: pulled towards you, tipping up, and carried away below the screen
        const k = Math.min(1, (ms - 680) / 900), e = easeIO(k);
        const depth = .38 - .7 * sm(0, .45, k);
        ftClip(g, depth > 0); ftGapAt(g, 1 - sm(0, .5, k));
        ftPlace(L.x - innerWidth * .08 * e, L.y + innerHeight * .95 * easeI(k), -14 * e, L.sc * (1 + .5 * e), FT.rx * (1 - .7 * sm(.1, .6, k)), depth);
        if (k >= 1) { ftStop(); return false; }
      }
    });
  }

  // the tape is taken out again: blue screen, the camera steps back, the set pushes the cassette out, and it flies back
  // up into the hand while its sleeve comes up to meet it: the shelf of tapes again, just as before "Play the site"
  function vpStop() { if (VP.cam || !FT.from) vpEnd(); else vpReturn(); }
  function vpReturn() {
    if (!VP.on || VP.back) return;
    VP.back = true;
    VP.v.pause(); Sound.duck(false);
    document.body.classList.remove('vcr-play');
    VP.blueUntil = 1e15; VP.trackUntil = 0;
    vpCamera(false);
    clearTimeout(VP.endT);
    VP.endT = setTimeout(() => {
      ftWrap.classList.add('on'); ftEl.style.opacity = 1;
      Sound.eject();
      const to = FT.from;
      let started = false, opened = false, handed = false;
      // pushed out, pulled out, carried back up and turned upright (on its own, the shelf still away),
      // then the shelf comes back to meet it, and only then is it slid into its sleeve
      // the shelf is called back while the cassette is still on its way, so the sleeve arrives just as it stops
      const TP = 460, TO = TP + 300, TF = TO + 950, TB = TO + 420, TS = TB + 760;
      ftRun(ms => {
        const g = slotGeo(), L = landing(g);
        if (ms < TP) { ftClip(g, true); ftGapAt(g, 1); ftPlace(L.x, L.y, 0, L.sc, FT.rx, 1 - .62 * easeBack(ms / TP)); }
        else if (ms < TO) { const k = easeIO((ms - TP) / (TO - TP)); ftClip(g, true); ftGapAt(g, 1 - k * .4); ftPlace(L.x, L.y, 0, L.sc, FT.rx, .38 * (1 - k)); }
        else if (ms < TF) {
          if (!started) {   // the set goes back to its channel behind it
            started = true;
            vpRoll(-1); setTimeout(() => { VP.on = false; VP.shown = false; VP.back = false; VP.v.removeAttribute('src'); VP.v.load(); }, G.dur + 50);
          }
          const u = easeIO((ms - TO) / (TF - TO)), v = 1 - u;
          const B0 = [L.x, L.y], B1 = [L.x, L.y + to.H * L.sc * .45];
          const B2 = [to.x + (L.x - to.x) * .15, to.y - to.H * .25], B3 = [to.x, to.y];
          const x = v * v * v * B0[0] + 3 * v * v * u * B1[0] + 3 * v * u * u * B2[0] + u * u * u * B3[0];
          const y = v * v * v * B0[1] + 3 * v * v * u * B1[1] + 3 * v * u * u * B2[1] + u * u * u * B3[1];
          ftClip(null, false); ftGapAt(g, Math.max(0, .6 - u * 2));
          ftPlace(x, y, -90 * sm(.1, .7, u), L.sc + (1 - L.sc) * sm(.05, .7, u), FT.rx * (1 - sm(0, .5, u)), 0);
        } else if (ms < TS) ftPlace(to.x, to.y, -90, 1, 0, 0);
        if (ms >= TB && ms < TS) {
          if (!opened) {   // already upright: the shelf comes back, the sleeve rising from where it was put down
            opened = true;
            tapeLayer.classList.add('launch', 'return');
            tcase.classList.add('pullout', 'snap'); void tcase.offsetWidth;
            openTape(true);
            tcase.classList.remove('snap');
            Sound.rustle();
          }
        } else if (ms >= TS) {
          if (!handed) {   // the sleeve has arrived, its open side right by the cassette: the real one takes over and slides in
            handed = true;
            tapeLayer.classList.remove('launch');
            ftStop();
            tcase.classList.add('settle'); tcase.classList.remove('pullout'); Sound.slide();
            setTimeout(() => { tcase.classList.remove('settle'); tapeLayer.classList.remove('return'); wobble(); }, 520);
          }
          return false;
        }
      });
    }, 650);
  }

  // REC: the visitor's own camera on the tube. Only after the browser's own permission prompt; the picture stays
  // on this screen (drawn into the TV, never recorded or sent) and the camera turns off as soon as it's stopped.
  async function camStart() {
    if (VP.on || !S.tv) return;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { hint('No camera here, sorry'); setTimeout(() => hint(''), 2400); return; }
    let stream;
    try { stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 960 }, height: { ideal: 720 }, facingMode: 'user' }, audio: false }); }
    catch (e) { hint('No camera, no show. That\u2019s fine too'); setTimeout(() => hint(''), 2600); return; }
    if (VP.on || !S.tv) { stream.getTracks().forEach(t => t.stop()); return; }
    VP.on = true; VP.cam = true; VP.paused = false; VP.title = 'You'; VP.seekUntil = 0; VP.camT0 = performance.now();
    VP.v.muted = true; VP.v.srcObject = stream;
    document.body.classList.add('vcr-play', 'vp-cam');
    vpCamera(true); vpRoll(1);
    VP.v.play().catch(() => {});
  }
  function vpEnd(quiet) {
    if (!VP.on) return;
    VP.v.pause(); if (!VP.cam) Sound.duck(false);
    document.body.classList.remove('vcr-play');
    if (VP.cam) {   // the camera goes off right away, not after the picture has rolled away
      const st = VP.v.srcObject; if (st) st.getTracks().forEach(t => t.stop());
    }
    const done = () => { document.body.classList.remove('vp-cam'); VP.back = false; VP.on = false; VP.shown = false; VP.cam = false; VP.v.srcObject = null; VP.v.removeAttribute('src'); VP.v.load(); };
    if (quiet) { VP.close = false; document.body.classList.remove('vp-close'); G.tape = 0; ftStop(); done(); return; }
    if (VP.cam || !VP.shown) { vpRoll(-1); vpCamera(false); ftStop(); clearTimeout(VP.endT); VP.endT = setTimeout(done, G.dur + 50); return; }
    // a tape: the picture drops to the blue screen, the cassette is pushed out, then the set goes back to its channel
    VP.blueUntil = 1e15; VP.trackUntil = 0;
    vpCamera(false);   // step back from the screen so the door is in view again
    clearTimeout(VP.endT);
    VP.endT = setTimeout(() => {
      ftEject();
      VP.endT = setTimeout(() => { vpRoll(-1); VP.endT = setTimeout(done, G.dur + 50); }, 900);
    }, 650);
  }
  function vpPause() {
    if (!VP.shown || VP.cam) return;
    VP.paused = !VP.paused;
    if (VP.paused) VP.v.pause(); else VP.v.play().catch(() => {});
  }
  function vpSeek(dir) {
    if (!VP.shown || VP.cam) return;
    const d = VP.v.duration || 0;
    VP.v.currentTime = Math.max(0, Math.min(d ? d - .5 : 0, VP.v.currentTime + dir * 10));
    VP.seekDir = dir; VP.seekUntil = performance.now() + 900; G.burst = .9;   // tracking lines while it winds
  }
  VP.v.addEventListener('ended', () => vpStop());
  VP.v.addEventListener('error', () => { if (VP.on && !VP.cam && VP.v.getAttribute('src')) { comingSoon(); vpStop(); } });
  document.getElementById('vpNav').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b || !VP.on) return;
    Sound.key();
    ({ rew: () => vpSeek(-1), ff: () => vpSeek(1), play: () => vpPause(), stop: () => vpStop() })[b.dataset.vp]();
  });
  VP.v.addEventListener('play', () => { document.getElementById('vpPlay').textContent = '❚❚ Pause'; });
  VP.v.addEventListener('pause', () => { if (VP.paused) document.getElementById('vpPlay').textContent = '▶ Play'; });
  // what the tube shows: the video letterboxed (it's wider than the tube), the VCR's own on-screen text over it
  function vpDraw() {
    const c = VP.c, v = VP.v;
    c.fillStyle = '#000'; c.fillRect(0, 0, TEX_W, TEX_H);
    const now0 = performance.now();
    if (!VP.cam && now0 < VP.blueUntil) {   // the VCR's own blue screen before the tape starts (and after it stops)
      c.fillStyle = '#1b2fbf'; c.fillRect(0, 0, TEX_W, TEX_H);
    } else if (v.readyState >= 2 && v.videoWidth && VP.cam) {   // the camera: filling the tube, mirrored like a mirror
      const k = Math.max(TEX_W / v.videoWidth, TEX_H / v.videoHeight), w = v.videoWidth * k, h = v.videoHeight * k;
      c.save(); c.translate(TEX_W, 0); c.scale(-1, 1); c.drawImage(v, (TEX_W - w) / 2, (TEX_H - h) / 2, w, h); c.restore();
    } else if (v.readyState >= 2 && v.videoWidth) {
      const h = TEX_W * v.videoHeight / v.videoWidth;
      c.drawImage(v, 0, (TEX_H - h) / 2, TEX_W, h);
    }
    if (!VP.cam && now0 >= VP.blueUntil && now0 < VP.trackUntil) {   // tracking: a band of noise rolls up the picture and it settles
      const k = (now0 - VP.blueUntil) / (VP.trackUntil - VP.blueUntil), bh = 120, y0 = TEX_H * (1.15 - 1.4 * k);
      for (let y = Math.max(0, Math.floor(y0)); y < Math.min(TEX_H, y0 + bh); y += 4) {
        const sh = (Math.random() - .5) * 70 * (1 - k * .6);
        c.drawImage(VP.cv, 0, y, TEX_W, 4, sh, y, TEX_W, 4);
        c.fillStyle = `rgba(235,235,235,${(Math.random() * .35).toFixed(2)})`;
        c.fillRect(Math.random() * TEX_W, y, 40 + Math.random() * 260, 2);
      }
    }
    c.save();
    c.font = '46px VT323, monospace'; c.textBaseline = 'top';
    c.shadowColor = 'rgba(0,0,0,.8)'; c.shadowOffsetX = 3; c.shadowOffsetY = 3; c.shadowBlur = 0;
    c.fillStyle = '#eaffef';
    const now = performance.now();
    const st = VP.cam ? (VP.paused ? 'PAUSE ❚❚' : 'REC') : now < VP.seekUntil ? (VP.seekDir > 0 ? '▶▶ FF' : '◀◀ REW') : VP.paused ? 'PAUSE ❚❚' : 'PLAY ▶';
    if (VP.cam && !VP.paused) {   // a red dot that blinks, like any camcorder
      if (Math.floor(now / 700) % 2 === 0) { c.save(); c.shadowColor = 'transparent'; c.fillStyle = '#ff3b30'; c.beginPath(); c.arc(62, 57, 13, 0, Math.PI * 2); c.fill(); c.restore(); }
      c.fillText(st, 88, 34);
    } else if (!VP.paused || Math.floor(now / 600) % 2) c.fillText(st, 44, 34);
    const s = Math.floor(VP.cam ? (now - VP.camT0) / 1000 : v.currentTime || 0), tc = `${Math.floor(s / 3600)}:${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
    c.fillText(tc, TEX_W - 44 - c.measureText(tc).width, 34);
    c.textBaseline = 'bottom';
    c.fillText('SP  ' + VP.title.toUpperCase(), 44, TEX_H - 30);
    c.restore();
    gl.bindTexture(gl.TEXTURE_2D, VP.tex);
    try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, VP.cv); } catch (e) {}
  }

  /* ================= EXPLORABLE ITEMS =================
     r: [x0, y0, x1, y1] in back final.jpg pixels; say: the character's line on click. */
  const ITEMS = [
    { id: 'tv',       r: [TV.x0, TV.y0, TV.x1, TV.y1], nbScale: 1.15, thumb: 'objects/tv-main.png', badge: 'Flip through<br>the channels', hover: 'Someone left it on. I wonder what\u2019s playing.' },
    { id: 'vinyl',    r: [640, 243, 839, 470], noteDX: .035, nbScale: 0.85, object: 'objects/vinyl-disc.png', spin: true, badge: 'Take a record<br>out', hover: "Wait, is that a Kanye record?",   say: 'Still sealed. Someone here has taste.', letter: 'i', slot: 5, letter2: 'i', slot2: 6, note: { title: "Yeezy Taught Me Well", text: ["Music teaches you how to live and how to make things. Kanye made music, then sneakers, then clothes, and every time he found a way of doing it that nobody else had. That’s the kind of thinking I try to bring {i}nto my own work. For one of my websites, I even took inspiration from the visual language of one of his music videos…"] } },
    { id: 'cooper',   r: [1632, 344, 1754, 473], screen: 'objects/coop2.gif', badge: 'Take a closer<br>look', hover: "Who's the guy with the coffee? He looks familiar…",    say: 'Agent Cooper. Damn fine coffee, I bet.', letter: 's', slot: 10, note: { title: "Diane,", text: ["It’s 11:30 in the morning. The coffee here is amazing, and the cherry pie de{s}erves a report of its own.", "Fun fact: Lynch was a painter before he ever became a director. Talented people tend to be talented in everything. (Not hinting at anything.)"] } },
    { id: 'cat',      r: [1772, 539, 1870, 709], object: 'objects/lucky_cat.png', noteScale: .78, badge: 'Rub the<br>lucky cat', hover: 'That cat hasn\u2019t stopped waving since I came in.',      say: 'It keeps waving. For luck, or at me?', letter: 'r', slot: 13, note: { title: "A Little Luck", text: ["Maneki-neko is a Japanese lucky cat. I already have four of them, but this one’s special.", "I bought a plain white figurine, and my friend Maria painted it with Japanese-inspi{r}ed designs. She’s an awesome designer, and we often work on projects together. In a way, this little cat is one of our projects too.", "I like to believe that every time it waves its paw, it’s bringing us another project to work on together."] } },
    { id: 'sneakers', r: [273, 1199, 508, 1297], nbScale: 1.2, object: 'objects/nikes.png', noteScale: 1.3, badge: 'Check<br>the soles', hover: 'Nice kicks. Someone took them off in a hurry.',    say: 'Air Jordans, kicked off in a hurry. Late night again.', letter: 'o', slot: 14, note: { title: "Fresh Air", text: ["Cities come and go, but the sneakers stay.", "Right now, we’re in Barcelona. And somehow, my best ideas always seem to show up when I’m out walking, somewhere between the G{o}thic Quarter and the beach."] } },
    { id: 'sega',     r: [1542, 1245, 1857, 1326], nbScale: 1.2, object: 'objects/sega.png', noteScale: 1.1, badge: 'Dust off<br>the console', hover: "A Sega Mega Drive! Haven't seen one of these in forever.",     say: 'Sixteen bits of pure joy. Still plugged in.', letter: 'i', slot: 2, note: { title: "Player Two", text: ["My friend had one. I was six or seven, and I’d go over to his place so we could play together. It was the first console in my l{i}fe, which is exactly why I’ll never forget it."] } },
    { id: 'mug',      r: [1857, 1193, 1943, 1278], photo: 'objects/thermo-pl.jpg', badge: 'Pick up<br>the mug', hover: "A thermo mug. Someone\u2019s planning a long night.", note: { title: "Damn Fine Coffee", text: ["If you ever run into me outside the house, chances are I’ll have this mug with me.", "Most of the time it’s filled with Chinese pu-erh tea, but sometimes it’s black coffee. Damn fine coffee, of course."] } },
    { id: 'wolverine', r: [463, 318, 572, 449], screen: 'objects/snifsnif.gif',  badge: 'Examine<br>the mask', hover: "Is that… Wolverine's mask?",    say: 'Snikt. Someone here reads comics at night.', letter: 'e', slot: 9, note: { title: "*sniff sniff*", text: ["My favourite Marvel character, and my favourite comic book character, full stop (okay, one of them).", "He’s a team player, but he’s also very much his own man, which is pretty similar to how I feel on team projects.", "A loner by nature who found his place with the X-Men, and it gave him a kind of rebirth. For me, he’s the d{e}epest character in the team, and depth is what I’m always drawn to."] } },
    { id: 'tote',     r: [349, 540, 520, 833], photo: 'objects/tote-pl.jpg',   badge: 'See what’s<br>inside', hover: 'In art we trust. Fair enough.',     say: 'In art we trust. Fair enough.', note: { title: "Not My Bag", text: ["Actually, this isn’t even my bag. So what’s it doing on my website?", "Well, it belongs to my girlfriend Elena, the best designer in the world (according to me).", "She helped me design this website and bring this whole room to life, so we figured it was only fair to leave a little piece of her here too."] } },
    { id: 'halflife', r: [1002, 1293, 1128, 1359], object: 'objects/halflife.png', badge: 'Pick up<br>the disc', hover: "Hm, there's a game under the chair.",    say: 'Half-Life. Still waiting for the third one.', letter: 't', slot: 11, note: { title: "Rise and Shine", text: ["Half-Life is my favourite game of all time. There are plenty of reasons why, but that’s not why this disc is here.", "Half-Life is also the universe Portal belongs to, and Portal gave us Wheatley. On one of my projects, Blocklabs, the site has a virtual assistant inspired by him, and objects keep popping through portals to show how web3 processes work. Films, games and pop cul{t}ure always end up somewhere in my work."] } },
    { id: 'cart',     r: [1967, 1283, 2052, 1340], object: 'objects/Cartridge.png', badge: 'Check<br>the label', hover: "Is that Mortal Kombat? Oh, the memories.", say: 'A spare cartridge. Blowing on it might help.', letter: 't', slot: 3, note: { title: "Finish Him!", text: ["That’s the game my friend and I played on his console back then. The arenas were complex and detailed, and every character was worked out so well you’d still recognise them years later. Looking back, it’s a flawless design sys{t}em."] } },
    { id: 'funko',    r: [953, 598, 1034, 674], thumb: 'objects/heisenberg-thumb.png', screen: 'objects/hiesenberg2.gif',   badge: 'Take a closer<br>look', hover: "Ha, a tiny Heisenberg.",   say: 'Heisenberg keeps an eye on the shelf.', letter: 'm', slot: 1, note: { title: "Say My Name", text: ["…or better yet, find {m}ine. It’s hidden somewhere on this site.", "If The Matrix is my favourite film, Breaking Bad is my favourite show. I think it’s made perfectly. You know that theory that the universe only works because its constants are set just right? The speed of light, the mass of things and all that: tweak one a little and nothing would exist. Breaking Bad is tuned the same way. Change one piece and the whole thing falls apart. Pretty much like good code…"] } },
    { id: 'tokyo',    r: [1883, 562, 2023, 704], object: 'objects/tokyo.png', noteScale: 1.18, nbImg: 'objects/tokyo-trim.png', nbScale: .82, badge: 'Flip through<br>the pages', hover: "Ooh, a book about Tokyo. I'd flip through that.",     say: 'Tokyo Style. Small rooms, big ideas.', letter: 'e', slot: 12, note: { title: "Tokyo Style", text: ["One of the favourites in my collection. It’s all about how ordinary people live in Tokyo: total chaos, but stylish, w{e}irdly ordered chaos. I love Japan and I really want to get to Tokyo one day. Until then, flipping through these photos takes me there for a little while."] } },
    { id: 'matrix',   r: [973, 845, 1133, 918], nbScale: 0.95, object: 'objects/matrix.png', noteScale: .78, nbTitle: 'The White Rabbit', nbLift: 2.5, badge: 'Check<br>the tapes', hover: "No way. The Matrix on VHS?",    say: 'The Matrix on VHS. Red pill or blue?', letter: 'r', slot: 4, note: { title: "Follow the White Rabbit", text: ["For me, The Matrix is the benchmark film, and a seriously underrated one. Almost everything about it is perfect: the look, the costumes, the soundtrack, the fights, the way the whole wo{r}ld is built. There’s nothing else like it, and somehow it feels more real every year.", "What I love most is how it explores human nature through its contrast with AI. It helped me understand myself, too. I think we’re pretty much the only animals evolution gave free will to. But to really use it, you have to grow into it."] } },
    { id: 'cap',      r: [579, 549, 656, 653], object: 'objects/cap.png',   badge: 'Pick up<br>the cap', letter: 'v', slot: 15, hover: "Nice cap.",      say: 'A Yankees cap. Never been to a game, though.', note: { title: "No Cap", text: ["This is the cap. The only real one; honestly, other caps don’t exist for me. I love street style. You could say I grew up on the street, and the street taught me everything about how to li{v}e.", "It was the only school where I never skipped a class."] } },
    { id: 'ball',     r: [2170, 1133, 2304, 1271], photo: 'objects/basket-pl.jpg', badge: 'Check<br>the grip', hover: "A basketball? Somebody here plays.", note: { title: "Off the Court", text: ["I used to play basketball from the age of 14 to 24. Then adult life happened, and somehow I stopped finding time for it.", "But my love for the culture and style surrounding the game never went away."] } },
    { id: 'plant',    r: [868, 246, 1129, 476], photo: 'objects/flower-pl.jpg',  badge: 'Admire the<br>greenery', hover: "At least someone waters this plant.", note: { title: "Room for Nature", text: ["It’s easy to forget that we humans originally lived surrounded by nature.", "So even in the middle of our concrete jungles, I think there should always be room for something green and alive."] } },
    { id: 'munchkin', r: [1619, 1021, 1790, 1060], photo: 'objects/munchkin-pl.jpg', badge: 'Inspect<br>the box', hover: "Munchkin? Someone here takes board games seriously.", note: { title: "Elena’s Pick", text: ["Video games aren’t the only games I’m into! I love board games too, although I can’t say I have a favourite.", "Munchkin is Elena’s favourite, actually. She’s the one who decided it deserved a place in this room."] } },
  ];
  let hovered = null, hiAmt = 0, hiRect = [0, 0, 0, 0], hoverThoughtT = 0;

  /* ---- game progress: survives an accidental reload, but a new visit starts fresh ---- */
  const SAVE_KEY = 'dn-game', SAVE_TTL = 10 * 60 * 1000;   // 10 minutes since the last action
  const saved = (() => {
    try {
      const v = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
      if (v && Date.now() - v.t < SAVE_TTL) return v;
      localStorage.removeItem(SAVE_KEY);
    } catch (e) {}
    return {};
  })();
  try { localStorage.removeItem('dn-explored'); localStorage.removeItem('dn-gold'); } catch (e) {}   // old keys
  function saveGame() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify({ t: Date.now(), explored: [...explored], gold: goldSeen })); } catch (e) {}
  }

  /* ---- intellectual property notice ---- */
  const legalEl = document.getElementById('legal'), legalLink = document.getElementById('legalLink');
  function openLegal() {
    legalEl.classList.add('open'); legalEl.setAttribute('aria-hidden', 'false');
    Sound.paper();
    setTimeout(() => document.getElementById('legalClose').focus({ preventScroll: true }), 50);
  }
  function closeLegal() {
    if (legalEl.classList.contains('open')) Sound.paper();
    legalEl.classList.remove('open'); legalEl.setAttribute('aria-hidden', 'true'); legalLink.focus({ preventScroll: true });
  }
  legalLink.addEventListener('click', openLegal);
  document.getElementById('legalClose').addEventListener('click', closeLegal);
  legalEl.addEventListener('click', e => { if (!e.target.closest('.legal-card')) closeLegal(); });
  document.getElementById('legalContact').href = 'mailto:' + CONTACT.email;

  /* ---- paper note ---- */
  const paperEl = document.getElementById('paper');
  const esc = t => t.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
  const paperClose = document.getElementById('paperClose');
  const paperActions = document.getElementById('paperActions');
  const paperSave = document.getElementById('paperSave');
  document.querySelector('.contacts').href = 'mailto:' + CONTACT.email;
  const actHint = document.getElementById('actHint');
  /* ---- the project's tape: ejected from the set, in its sleeve ---- */
  const tapeLayer = document.getElementById('tapeLayer');
  function openTape(back) {   // back: the cassette is on its way back from the VCR (same tape, no eject sounds)
    if (!TAPES.length || tapeLayer.classList.contains('open')) return;
    // start from the tape of the channel on the TV, if there is one; otherwise where the shelf was left
    const key = t => t.toLowerCase().replace(/[^a-z0-9]/g, '');
    const m = TAPES.findIndex(t => PROJECTS[G.cur] && key(t.title) === key(PROJECTS[G.cur].title));
    if (m >= 0 && !back) tapeCur = m;
    fillTape(TAPES[tapeCur]); fillSides();
    hint(''); hovered = null; tag.classList.remove('show'); canvas.classList.remove('hot', 'hand');
    clearTimeout(tapeLayer._t); tapeLayer.classList.remove('closing');
    void tapeLayer.offsetWidth;
    tapeLayer.classList.add('open'); tapeLayer.setAttribute('aria-hidden', 'false'); document.body.classList.add('tape-open');
    document.body.classList.add('note');
    if (back) return;
    Sound.tape(); setTimeout(() => { if (tapeLayer.classList.contains('open')) Sound.slide(); }, 640);   // out of the set, then the cassette slides out
    setTimeout(() => { if (tapeLayer.classList.contains('open')) wobble(); }, 1080);                   // ...and its sticker swings as it stops
  }
  // phones: the sleeve up close, as big as the screen allows (1.5 = its height to width)
  function tapeZoom(on) {
    if (on) tapeLayer.style.setProperty('--zk', Math.min(innerWidth * .94, innerHeight * .8 / 1.5) / document.getElementById('tapeSleeve').offsetWidth);
    tapeLayer.classList.toggle('zoom', on);
  }
  function closeTape() {
    if (!tapeLayer.classList.contains('open')) return;
    tapeZoom(false);
    tapeLayer.classList.add('closing'); tapeLayer.classList.remove('open'); tapeLayer.setAttribute('aria-hidden', 'true');
    setTimeout(() => { if (!tapeLayer.classList.contains('open')) document.body.classList.remove('tape-open'); }, 650);   // caption back once the tape has gone
    document.body.classList.remove('note');
    Sound.slide(); setTimeout(() => Sound.rustle(), 340);   // cassette back in, then the whole tape goes down
    clearTimeout(tapeLayer._t); tapeLayer._t = setTimeout(() => tapeLayer.classList.remove('closing'), 850);
  }
  // flip through the tapes like a shelf (the TV stays on its channel for now)
  const tcase = tapeLayer.querySelector('.tcase');
  let tapeBusy = false, tapeCur = 0;
  const sticker = document.getElementById('tapeSticker');
  function wobble() { sticker.classList.remove('wob'); void sticker.offsetWidth; sticker.classList.add('wob'); }
  function fillTape(pj) {
    const lab = document.getElementById('tapeLabel'), box = lab.parentNode;
    lab.textContent = pj.title; box.style.fontSize = '';
    const room = box.clientWidth * .84, need = lab.offsetWidth;   // long names written a little smaller, to fit the label
    if (need > room) box.style.fontSize = (parseFloat(getComputedStyle(box).fontSize) * room / need).toFixed(1) + 'px';
    sticker.style.setProperty('--stick', pj.sticker || '');
    const sl = document.getElementById('tapeSleeve');
    sl.className = 'sleeve' + (pj.cover ? '' : ' plain');
    sl.innerHTML = pj.cover ? `<img src="${ASSET(pj.cover)}" alt="${esc(pj.title)}, ${esc(pj.tag)}">` : `<div><b>${esc(pj.title)}</b><i>${esc(pj.tag)}</i></div>`;
  }
  // the shelf's side sleeves: three elements that take turns being "previous", "next" and the one coming in.
  // Every tape sits on an orbit bowed towards you: p = 0 is the one in hand (closest, biggest), p = ±1 the neighbours
  // (a little further back: smaller, higher, dimmer), p = ±2 off screen. A step slides everything one place along it.
  let [sPrev, sNext, sSpare] = [...tapeLayer.querySelectorAll('.tside')];
  const SHELF_X = [[-2, -3.4], [-1, -1.56], [0, 0], [1, 2.06], [2, 4]];   // in sleeve widths
  const SHELF_R = [[-2, 7], [-1, 3], [0, -4], [1, 4], [2, 7]];
  const along = (tab, p) => {
    p = Math.max(-2, Math.min(2, p));
    for (let i = 0; i < tab.length - 1; i++) if (p <= tab[i + 1][0]) { const [a, va] = tab[i], [b, vb] = tab[i + 1]; return va + (vb - va) * (p - a) / (b - a); }
    return tab[tab.length - 1][1];
  };
  function shelfAt(p) {
    const a = Math.min(2, Math.abs(p));
    // on the orbit: further round = further back (smaller, higher, darker). The covers stay flat (no 3D turn):
    // the depth is all in the path, which dips towards you and grows as a tape comes round to the front
    return { x: along(SHELF_X, p), r: along(SHELF_R, p), y: -.05 * a * a,
      s: 1 - .2 * Math.min(a, 1) - .1 * Math.max(0, a - 1), b: 1 - .45 * Math.min(a, 1) - .15 * Math.max(0, a - 1) };
  }
  function placeSide(el, p) {
    el._p = p;
    const q = shelfAt(p), w = el.offsetWidth;
    el.style.transform = `translate(${(q.x * w).toFixed(1)}px, ${(q.y * w).toFixed(1)}px) rotate(${q.r.toFixed(2)}deg) scale(${q.s.toFixed(4)})`;
    el.style.filter = `brightness(${q.b.toFixed(3)})`;
    el.style.setProperty('--out', p < 0 ? '-14vw' : '14vw');
  }
  function placeCase(p) {   // the sleeve in hand (cassette tucked in) moving to a side place, turning about the sleeve's centre
    const q = shelfAt(p), w = tcase.offsetWidth / 2;
    tcase.style.transform = `translate(${(q.x * w).toFixed(1)}px, ${(q.y * w).toFixed(1)}px) rotate(${(q.r + 4).toFixed(2)}deg) scale(${q.s.toFixed(4)})`;
    tcase.querySelector('.sleeve').style.filter = `brightness(${q.b.toFixed(3)})`;
  }
  function sideFill(el, pj) {
    el.classList.toggle('plain', !pj.cover);
    el.innerHTML = pj.cover ? `<img src="${ASSET(pj.cover)}" alt="">` : esc(pj.title);
  }
  function fillSides() {
    const n = TAPES.length;
    sideFill(sPrev, TAPES[(tapeCur - 1 + n) % n]); placeSide(sPrev, -1);
    sideFill(sNext, TAPES[(tapeCur + 1) % n]); placeSide(sNext, 1);
    placeSide(sSpare, 2);
  }
  addEventListener('resize', () => [sPrev, sNext, sSpare].forEach(el => placeSide(el, el._p || 0)));
  function stepTape(dir) {
    if (!tapeLayer.classList.contains('open') || tapeBusy) return;
    tapeZoom(false);
    tapeBusy = true;
    const n = TAPES.length, old = tapeCur;
    tapeCur = (tapeCur + dir + n) % n;
    const T = (f, ms) => setTimeout(f, ms);
    tcase.classList.remove('slideout');
    tcase.classList.add('tucked'); Sound.slide();                     // 1. the cassette slides back into its sleeve
    T(() => {                                                          // 2. the whole row moves one place along the orbit
      Sound.rustle();
      sideFill(sSpare, TAPES[dir > 0 ? (tapeCur + 1) % n : (tapeCur - 1 + n) % n]); placeSide(sSpare, 2 * dir);
      tcase.style.transition = 'none';
      const moves = [[sPrev, -1, -1 - dir], [sNext, 1, 1 - dir], [sSpare, 2 * dir, dir]], t0 = performance.now(), D = 620;
      const step = now => {
        const k = Math.min(1, (now - t0) / D), e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        placeCase(-dir * e);
        moves.forEach(([el, a, b]) => placeSide(el, a + (b - a) * e));
        if (k < 1) return requestAnimationFrame(step);
        // 3. the sleeve now in the middle is the one in hand
        fillTape(TAPES[tapeCur]);
        tcase.classList.add('snap'); tcase.style.transform = ''; tcase.querySelector('.sleeve').style.filter = '';
        void tcase.offsetWidth; tcase.classList.remove('snap'); tcase.style.transition = '';
        if (dir > 0) { const gone = sPrev, mid = sNext; sideFill(gone, TAPES[old]); placeSide(gone, -1); sPrev = gone; sNext = sSpare; sSpare = mid; }
        else { const gone = sNext, mid = sPrev; sideFill(gone, TAPES[old]); placeSide(gone, 1); sNext = gone; sPrev = sSpare; sSpare = mid; }
        placeSide(sSpare, 2);
        T(() => { tcase.classList.add('slideout'); tcase.classList.remove('tucked'); Sound.slide(); }, 40);   // 4. ...and its cassette slides out
        T(wobble, 420);
        T(() => { tcase.classList.remove('slideout'); tapeBusy = false; }, 600);
      };
      requestAnimationFrame(step);
    }, 250);
  }
  tapeLayer.querySelectorAll('.tside').forEach(el => el.addEventListener('click', e => {
    e.stopPropagation();
    if (el === sPrev) stepTape(-1); else if (el === sNext) stepTape(1);
  }));
  document.getElementById('tapeClose').addEventListener('click', closeTape);
  gLink.addEventListener('click', e => { e.preventDefault(); if (!G.active) openTape(); });   // the caption's project name: its tape too
  document.getElementById('tapePrev').addEventListener('click', e => { e.stopPropagation(); stepTape(-1); });
  document.getElementById('tapeNext').addEventListener('click', e => { e.stopPropagation(); stepTape(1); });
  tapeLayer.addEventListener('click', e => {
    if (TOUCH && tapeLayer.classList.contains('zoom')) { if (!e.target.closest('.tape-nav')) tapeZoom(false); return; }
    if (TOUCH && e.target.closest('.sleeve')) { tapeZoom(true); return; }
    if (!e.target.closest('.tape-nav, .sticker, .tside')) closeTape();
  });
  // the sticker: the tape goes into the VCR and plays its walkthrough; tilts toward the cursor like a loose bit of paper
  const comingSoon = () => { hint('This tape is still being recorded. Coming soon'); clearTimeout(sticker._h); sticker._h = setTimeout(() => hint(''), 2400); };
  const tapeOk = {};
  async function hasTape(path) {   // is the clip uploaded yet? (asked once per tape)
    if (!path) return false;
    if (path in tapeOk) return tapeOk[path];
    if (location.protocol === 'file:') return (tapeOk[path] = !!(await tapeSrc(path)));
    try { const r = await fetch(encodeURI(ASSET(path)), { method: 'HEAD' }); return (tapeOk[path] = r.ok); }
    catch (e) { return true; }   // can't tell (the host won't answer a HEAD): try to play it; a failed load falls back below
  }
  sticker.addEventListener('click', async e => {
    e.stopPropagation(); wobble();
    const t = TAPES[tapeCur]; if (!t) return;
    if (!(await hasTape(t.video))) return comingSoon();
    if (S.tv) vpStart(t); else openVideo(t.video, t.title);
  });
  // the walkthrough video: with sound when the site's sound is on (the room music steps aside meanwhile), muted otherwise
  const vidLayer = document.getElementById('vidLayer'), vidEl = document.getElementById('vidEl');
  function openVideo(src, title) {
    vidEl.src = encodeURI(ASSET(src)); vidEl.currentTime = 0;
    vidEl.muted = !Sound.isOn(); vidLayer.setAttribute('aria-label', title + ' — video');
    vidLayer.classList.add('open'); vidLayer.setAttribute('aria-hidden', 'false');
    Sound.duck(true); Sound.swish(false);
    setTimeout(() => vidEl.play().catch(() => { vidEl.muted = true; vidEl.play().catch(() => {}); }), 120);
  }
  function closeVideo() {
    if (!vidLayer.classList.contains('open')) return;
    vidLayer.classList.remove('open'); vidLayer.setAttribute('aria-hidden', 'true');
    vidEl.pause(); Sound.duck(false); Sound.swish(true);
    setTimeout(() => { if (!vidLayer.classList.contains('open')) { vidEl.removeAttribute('src'); vidEl.load(); } }, 400);
  }
  window.closeVideo = closeVideo; window.vidOpen = () => vidLayer.classList.contains('open');
  document.getElementById('vidClose').addEventListener('click', closeVideo);
  vidLayer.addEventListener('click', e => { if (!e.target.closest('.vid-box')) closeVideo(); });
  sticker.addEventListener('pointermove', e => {
    const r = sticker.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    sticker.style.setProperty('--ry', (x * 22).toFixed(1) + 'deg'); sticker.style.setProperty('--rx', (-y * 26).toFixed(1) + 'deg');
  });
  sticker.addEventListener('pointerleave', () => { sticker.style.removeProperty('--rx'); sticker.style.removeProperty('--ry'); });
  // upright phones: the cassette is mostly inside the sleeve, so the sticker goes on the cover
  const stickerPin = sticker.parentNode, phoneTape = matchMedia('(max-width: 700px) and (orientation: portrait)');
  const placeSticker = () => (phoneTape.matches ? tcase : stickerPin).appendChild(sticker);
  placeSticker(); phoneTape.addEventListener('change', placeSticker);
  let tapeWheel = 0, tapeTouch = null;
  tapeLayer.addEventListener('touchstart', e => { tapeTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }, { passive: true });
  tapeLayer.addEventListener('touchend', e => {
    if (!tapeTouch) return; const dx = e.changedTouches[0].clientX - tapeTouch.x, dy = e.changedTouches[0].clientY - tapeTouch.y; tapeTouch = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) stepTape(dx < 0 ? 1 : -1);
  }, { passive: true });
  // the status line's last word: games and design mixed, swapped with a small glitch every few seconds
  (() => {
    const el = document.getElementById('statusWord'), WORDS = ['missions', 'projects', 'quests', 'websites'];
    let i = 0;
    const fitWidth = () => {   // as wide as the longest word, so nothing to its left ever shifts
      const keep = el.textContent; let w = 0;
      el.style.width = 'auto';
      WORDS.forEach(x => { el.textContent = x; w = Math.max(w, el.getBoundingClientRect().width); });
      el.textContent = keep; el.style.width = Math.ceil(w) + 'px';
    };
    fitWidth(); addEventListener('resize', fitWidth);
    if (document.fonts) document.fonts.ready.then(fitWidth);
    setInterval(() => {
      if (document.hidden) return;
      el.classList.remove('g'); void el.offsetWidth; el.classList.add('g');
      setTimeout(() => { i = (i + 1) % WORDS.length; el.textContent = WORDS[i]; }, 140);   // the word changes inside the glitch
    }, 4200);
  })();
  function hint(text) { if (text) actHint.textContent = text; actHint.classList.toggle('show', !!text); document.body.classList.toggle('hinting', !!text); }
  /* ---- Contacts: the pager buzzes in and types the message; its own buttons page through and act ---- */
  const pagerLayer = document.getElementById('pagerLayer'), pagerEl = document.getElementById('pager');
  const pgHead = document.getElementById('pgHead'), pgIdx = document.getElementById('pgIdx'), pgLine = document.getElementById('pgLine'), pgText = document.getElementById('pgText');
  const PAGES_PG = [
    { head: 'EMAIL', text: CONTACT.email, href: 'mailto:' + CONTACT.email, copy: CONTACT.email },
    { head: 'WHATSAPP', text: CONTACT.whatsapp, href: 'https://wa.me/' + CONTACT.whatsapp.replace(/\D/g, ''), copy: CONTACT.whatsapp },
    { head: 'LINKEDIN', text: CONTACT.linkedin, href: 'https://' + CONTACT.linkedin.replace(/^https?:\/\//, ''), copy: 'https://' + CONTACT.linkedin.replace(/^https?:\/\//, '') },
  ];
  let pgCur = 0, pgTimer = 0;
  function pgType(str, head, idx) {
    clearInterval(pgTimer);
    pgHead.textContent = head; pgIdx.textContent = idx || '';
    pgLine.classList.remove('scroll'); pgText.textContent = '';
    const cur = document.createElement('i'); cur.className = 'cur';
    let n = 0;
    pgTimer = setInterval(() => {
      pgText.textContent = str.slice(0, ++n); pgText.appendChild(cur);
      if (n % 2) Sound.tick();
      if (n >= str.length) {
        clearInterval(pgTimer);
        const over = pgText.scrollWidth - pgLine.clientWidth;   // too long for the glass: it scrolls back and forth
        if (over > 2) { pgLine.style.setProperty('--scroll', -over - 6 + 'px'); pgLine.classList.add('scroll'); }
      }
    }, 55);
  }
  function pgShow(i) { pgCur = (i + PAGES_PG.length) % PAGES_PG.length; const pg = PAGES_PG[pgCur]; pgType(pg.text, pg.head, `${pgCur + 1}/${PAGES_PG.length}`); }
  function openPager() {
    if (pagerLayer.classList.contains('open')) return closePager();
    hovered = null; tag.classList.remove('show'); canvas.classList.remove('hot');
    clearTimeout(pagerLayer._t); pagerLayer.classList.remove('closing');
    pagerLayer.classList.add('open'); pagerLayer.setAttribute('aria-hidden', 'false');
    Sound.swish(true);
    document.body.classList.add('note');
    pgHead.textContent = ''; pgIdx.textContent = ''; pgText.textContent = '';
    setTimeout(() => {   // lands, then buzzes with a new message
      if (!pagerLayer.classList.contains('open')) return;
      pagerEl.classList.remove('buzz', 'ring'); void pagerEl.offsetWidth; pagerEl.classList.add('buzz', 'ring');
      Sound.buzz(); setTimeout(() => Sound.beep(), 650);   // vibrates, then bee-beep
      pgType(`${PAGES_PG.length} NEW MESSAGES`, 'INCOMING', '');   // two lines like every other screen, each level with its icon
      setTimeout(() => { if (pagerLayer.classList.contains('open')) pgShow(0); }, 1500);
    }, 700);
  }
  function closePager() {
    if (!pagerLayer.classList.contains('open')) return;
    hint('');
    clearInterval(pgTimer);
    pagerLayer.classList.add('closing');
    Sound.swish(false);
    pagerLayer.classList.remove('open'); pagerLayer.setAttribute('aria-hidden', 'true');
    pagerEl.classList.remove('buzz', 'ring');
    document.body.classList.remove('note');
    clearTimeout(pagerLayer._t); pagerLayer._t = setTimeout(() => pagerLayer.classList.remove('closing'), 600);
  }
  document.querySelector('.contacts').addEventListener('click', e => { e.preventDefault(); openPager(); });
  document.getElementById('pagerClose').addEventListener('click', closePager);
  pagerLayer.addEventListener('click', e => { if (!e.target.closest('.pager')) closePager(); });
  const PG_HINTS = { prev: () => 'Previous contact', next: () => 'Next contact',
    copy: () => ['Copy the email', 'Copy the number', 'Copy the link'][pgCur],
    open: () => ['Write an email', 'Message on WhatsApp', 'Open LinkedIn'][pgCur] };
  const pgLcd = pagerEl.querySelector('.pg-lcd');
  pgLcd.addEventListener('pointerenter', () => hint(PG_HINTS.open()));
  pgLcd.addEventListener('pointerleave', () => hint(''));
  pgLcd.addEventListener('click', () => { const pg = PAGES_PG[pgCur]; Sound.key(); window.open(pg.href, pg.href.startsWith('mailto:') ? '_self' : '_blank', 'noopener'); });
  pagerEl.querySelectorAll('.pg-btn').forEach(b => {
    b.addEventListener('pointerenter', () => hint(PG_HINTS[b.dataset.a]()));
    b.addEventListener('pointerleave', () => hint(''));
  });
  pagerEl.querySelectorAll('.pg-btn').forEach(b => b.addEventListener('click', async () => {
    Sound.key();
    const a = b.dataset.a, pg = PAGES_PG[pgCur];
    if (a === 'prev') pgShow(pgCur - 1);
    else if (a === 'next') pgShow(pgCur + 1);
    if (a === 'prev' || a === 'next') hint(PG_HINTS[a]());
    if (a === 'copy') {
      try { await navigator.clipboard.writeText(pg.copy); Sound.confirm(); pgType('COPIED', pg.head, '✓'); } catch (err) { pgType('COPY FAILED', pg.head, ''); }
      setTimeout(() => { if (pagerLayer.classList.contains('open') && PAGES_PG[pgCur] === pg) pgShow(pgCur); }, 1400);
    } else if (a === 'open') window.open(pg.href, pg.href.startsWith('mailto:') ? '_self' : '_blank', 'noopener');
  }));

  /* ---- name puzzle: every letter of "Dmitrii Nesterov" except D and N hides in a note ---- */
  const NAME = 'Dmitrii Nesterov';
  const logo = document.getElementById('logo');
  logo.innerHTML = [...NAME].map((ch, i) =>
    ch === ' ' ? ' ' : (i === 0 || i === 8) ? ch : `<span class="slot" data-i="${i}"><b>${ch}</b></span>`).join('');
  const LETTER_ITEMS = ITEMS.filter(it => it.letter);
  const revealed = new Set();
  function setSlot(it, animate) {   // an item may hide a second letter (letter2 / slot2)
    [it.slot, it.slot2].filter(Boolean).forEach((n, k) => {
      const el = logo.querySelector(`.slot[data-i="${n}"]`);
      if (!el) return;
      el.classList.add('on');
      if (animate) setTimeout(() => { el.classList.add('pop'); setTimeout(() => { el.classList.add('settle'); el.classList.remove('pop'); }, 2600); }, k * 450);
    });
  }
  const lettersOf = it => [it.letter, it.letter2].filter(Boolean);
  const TOTAL_LETTERS = () => LETTER_ITEMS.reduce((n, it) => n + lettersOf(it).length, 0);
  const lettersDone = () => revealed.size === LETTER_ITEMS.length;
  function syncNamed() { document.body.classList.toggle('named', lettersDone()); logo.setAttribute('aria-label', lettersDone() ? NAME : 'Find my name'); }
  function revealLetter(it) {
    if (revealed.has(it.id)) return;
    revealed.add(it.id);
    setSlot(it, true);
    Sound.blip();
    const left = TOTAL_LETTERS() - LETTER_ITEMS.filter(i => revealed.has(i.id)).reduce((n, i) => n + lettersOf(i).length, 0);
    syncNamed();
    const twin = it.letter2 && it.letter2 === it.letter;   // the "ii" of Dmitrii: one circle counts twice
    if (left === 0) sayThought('That’s every letter. Now I know whose room this is.', 9000);
    else sayThought(`A circled “${it.letter}”${twin ? ' (make that two)' : ''}. ${left} letter${left > 1 ? 's' : ''} to go.`, 6000);
  }
  let goldSeen = false;
  goldSeen = !!saved.gold;

  // where a cut-out actually reaches above and below the sheet's top edge (fractions of the sheet width), from its
  // visible pixels: a wide, low object (sneakers, a console) needs much less room than a square one
  const objGeo = {};
  function measureObj(src) {
    if (!src || objGeo[src] !== undefined) return;
    objGeo[src] = null;
    const im = corsify(new Image());
    im.onload = () => {
      try {
        const n = 96, c = document.createElement('canvas'); c.width = c.height = n;
        const g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(im, 0, 0, n, n);
        const d = g.getImageData(0, 0, n, n).data; let top = n, bot = 0;
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (d[(y * n + x) * 4 + 3] > 40) { if (y < top) top = y; if (y > bot) bot = y; }
        objGeo[src] = { ar: im.naturalHeight / im.naturalWidth, top: top / n, bottom: (bot + 1) / n };
      } catch (e) {}
    };
    im.src = src;
  }
  const TV_NOTE_SCALE = .84;   // the little TVs (gif frames) sit a bit smaller on their notes
  function objFootprint(it) {
    if (it.screen && !it.photo) { const h = .648 * TV_NOTE_SCALE * .99 / 2; return { objAbove: h, objBelow: h }; }   // the TV is ~as tall as its box
    if (!it.object) return {};
    const geo = objGeo[ASSET(it.object)]; if (!geo) return {};
    const dh = .648 * (it.noteScale || 1) * Math.min(1, geo.ar);   // drawn height of the picture, contain-fit in its square
    return { objAbove: dh * (.5 - geo.top), objBelow: dh * (geo.bottom - .5) };
  }
  ITEMS.forEach(i => { if (i.object && !i.screen) measureObj(ASSET(i.object)); });
  function showSheet(note, gold) {
    paperEl.classList.remove('memo');
    // every crumpled note is shown at one scale (the tallest one's), so the writing is the same size in all of them
    if (CrumplePaper.reference) CrumplePaper.reference(ITEMS.filter(i => i.note && !i.photo).map(i => ({ title: i.note.title, text: i.note.text, object: i.object || i.screen, ...objFootprint(i) })));
    CrumplePaper.open(note);
    document.getElementById('paperText').textContent = note.title + '. ' + (note.big ? note.big.replace('\n', ' ') + '. ' : '') + note.text.join(' ');
    const r = CrumplePaper.rect;
    paperActions.style.top = (r.y + r.h + 22) + 'px';
    // under the golden card the buttons centre on the card itself (the polaroid makes it read further left)
    paperActions.style.left = gold ? (r.x + r.w * .47) + 'px' : '';
    const po = document.getElementById('paperObj');
    po.classList.toggle('has', !!note.object);
    po.classList.toggle('is-tv', !!note.screen);
    po.classList.toggle('spin', !!note.spin);
    if (note.screen) document.getElementById('miniTvImg').src = ASSET(note.screen);
    if (note.object) {
      const size = r.w * .648 * (note.objScale || 1);  // same OBJ ratio as paper.js: centre on the sheet's top edge (objScale: per-object tweak)
      if (!note.screen) document.getElementById('paperObjImg').src = ASSET(note.object);
      Object.assign(po.style, { width: size + 'px', height: size + 'px', left: (r.x + r.w / 2 - size / 2 + r.w * (note.objDX || 0)) + 'px', top: (r.y - size / 2) + 'px' });
    }
    paperEl.classList.toggle('gold', !!gold);
    if (gold) {   // the polaroid lands on the card's top-right corner
      const gp = document.getElementById('goldPl'), w = r.w * .44;
      Object.assign(gp.style, { width: w + 'px', padding: `${w * .055}px ${w * .055}px ${w * .2}px`, left: (r.x + r.w * .67) + 'px', top: (r.y - r.w * .13) + 'px' });
      if (GOLD_PHOTO) document.getElementById('goldPlPhoto').style.backgroundImage = `url("${ASSET(GOLD_PHOTO)}")`;
    }
    hovered = null; tag.classList.remove('show'); canvas.classList.remove('hot');
    paperEl.setAttribute('aria-hidden', 'false');
    paperEl.classList.add('open');
    document.body.classList.add('note');
    Sound.rustle();                                   // the wad pops up
    // ...and opens out. The recording's loud crackle comes ~.2 s in; the sheet visibly starts to open ~.5 s in and opens
    // fastest around .8–1 s, so the sound starts a little later than the unfold's clock, landing its crackle on the opening
    setTimeout(() => { if (paperEl.classList.contains('open')) Sound.unfold(); }, 520);
  }
  // memories that are real photos come as a polaroid
  function openMemo(it) {
    const n = it.note, pl = document.getElementById('polaroid');
    document.getElementById('plImg').src = ASSET(it.photo || it.object || it.thumb || it.screen) || '';
    document.querySelector('.pl-photo').classList.toggle('full', !!it.photo);
    document.getElementById('plTitle').textContent = n.title;
    document.getElementById('plText').innerHTML = n.text.map(t => `<p>${esc(t).replace(/\{(\w)\}/g, '<b class="ltr">$1</b>')}</p>`).join('');
    document.getElementById('paperText').textContent = n.title + '. ' + n.text.join(' ').replace(/[{}]/g, '');
    hovered = null; tag.classList.remove('show'); canvas.classList.remove('hot');
    paperEl.classList.remove('gold');
    // the object of the last crumpled note would otherwise show up on top of the polaroid
    document.getElementById('paperObj').classList.remove('has', 'spin', 'is-tv');
    paperEl.classList.add('memo');
    paperEl.setAttribute('aria-hidden', 'false');
    void pl.offsetWidth;
    paperEl.classList.add('open');
    document.body.classList.add('note');
    paperActions.style.top = (innerHeight / 2 + pl.offsetHeight * .48 + 26) + 'px';
    Sound.rustle();                                   // the polaroid's frame comes up
    setTimeout(() => { if (paperEl.classList.contains('open') && paperEl.classList.contains('memo')) Sound.shutter(); }, 550);   // click: the photo starts to develop
  }
  // a memory (and its letter) only counts once its note has actually opened: click and close at once and nothing
  // is taken, so the counter and the name never drift apart
  let noteCommit = 0;
  function commitWhenOpen(it, from, ms) {
    clearTimeout(noteCommit);
    noteCommit = setTimeout(() => {
      if (!paperEl.classList.contains('open')) return;
      explore(it, from);
      if (it.letter && !revealed.has(it.id)) revealLetter(it);
    }, ms);
  }
  function openNote(it, from) {
    if (it.note && it.photo) {   // only a real photo comes as a polaroid; every object (letter or not) gets a crumpled note
      openMemo(it);
      commitWhenOpen(it, from, 1000);   // the polaroid has landed
      return;
    }
    if (!it.note || !window.CrumplePaper) return;
    const n = it.note;
    showSheet({ title: n.title, text: n.text, sig: '— D.N.', object: it.object || it.screen, screen: it.screen, spin: it.spin, objScale: it.noteScale || (it.screen && !it.photo ? TV_NOTE_SCALE : 1), objDX: it.noteDX, ...objFootprint(it) }, false);
    commitWhenOpen(it, from, 1200);   // the sheet has unfolded: the memory counts and the circled letter flies into the name
  }
  function openGold() {
    if (!window.CrumplePaper) return;
    goldSeen = true; saveGame();
    showSheet({
      gold: true,
      title: 'YOU KNOW MY NAME', printTitle: true,
      big: 'Dmitrii\nNesterov',
      text: ['Mystery solved. Now let’s make something great & creative together.', `Write to me at ${CONTACT.email}, and be sure to save my contact. You’ll need it.`],
      sig: '— D.N.',
    }, true);
  }
  // vCard for "Save contact"
  (() => {
    const v = ['BEGIN:VCARD', 'VERSION:3.0', `N:${CONTACT.name.split(' ').slice(1).join(' ')};${CONTACT.name.split(' ')[0]};;;`,
      `FN:${CONTACT.name}`, `TITLE:${CONTACT.title}`];
    if (CONTACT.email) v.push(`EMAIL;TYPE=INTERNET:${CONTACT.email}`);
    if (CONTACT.phone) v.push(`TEL;TYPE=CELL:${CONTACT.phone}`);
    if (CONTACT.url) v.push(`URL:${CONTACT.url}`);
    v.push('END:VCARD');
    paperSave.href = URL.createObjectURL(new Blob([v.join('\r\n')], { type: 'text/vcard' }));
  })();
  logo.addEventListener('click', () => { if (lettersDone() && !paperEl.classList.contains('open')) openGold(); });

  function closeNote() {
    if (!paperEl.classList.contains('open')) return;
    clearTimeout(noteCommit);   // closed before it opened: nothing counted
    const wasGold = paperEl.classList.contains('gold'), wasMemo = paperEl.classList.contains('memo');
    const src = wasMemo ? document.querySelector('.pl-photo') : (document.getElementById('paperObj').classList.contains('has') ? document.getElementById('paperObj') : null);
    let fromRect = null;
    if (src) { const b = src.getBoundingClientRect(); fromRect = { x: b.left, y: b.top, w: b.width, h: b.height }; }
    else { const r = CrumplePaper.rect; fromRect = { x: r.x + r.w * .3, y: r.y + r.h * .15, w: r.w * .4, h: r.w * .4 }; }
    paperEl.classList.remove('open');
    document.body.classList.remove('note');
    paperEl.setAttribute('aria-hidden', 'true');
    if (wasMemo) setTimeout(() => { if (!paperEl.classList.contains('open')) paperEl.classList.remove('memo'); }, 500);
    else CrumplePaper.close(() => paperEl.classList.remove('gold'));
    if (wasMemo) Sound.rustle(); else Sound.crumple();
    // all letters collected: the golden card comes out once
    if (!wasGold && lettersDone() && !goldSeen) setTimeout(openGold, 900);
    if (wasMemo && pendingFly.length) { flyPolaroid(); return; }   // a polaroid goes into Memories as it is, frame and all
    const tvEl = document.querySelector('#paperObj.has.is-tv .mini-tv');
    if (!wasMemo && tvEl && pendingFly.length) { flyClone(tvEl, 0, 1.1); return; }   // a TV frame goes in on its little TV
    setTimeout(() => flyPending(fromRect), 120);   // what you just read flies into Memories
  }
  function flyPolaroid() { flyClone(document.getElementById('polaroid'), -3, 1.15); }
  // a copy of what's on screen (polaroid, little TV) flies into the Memories corner; the original vanishes at once
  function flyClone(pl, rot0, fit) {
    const b = pl.getBoundingClientRect(), w = pl.offsetWidth, h = pl.offsetHeight;
    const cx = b.left + b.width / 2, cy = b.top + b.height / 2;
    const c = pl.cloneNode(true);
    c.removeAttribute('id'); c.querySelectorAll('[id]').forEach(e => e.removeAttribute('id'));
    Object.assign(c.style, { position: 'fixed', left: cx - w / 2 + 'px', top: cy - h / 2 + 'px', width: w + 'px', height: h + 'px', margin: 0, zIndex: 30,
      translate: 'none', right: 'auto', animation: 'none', opacity: 1, pointerEvents: 'none', transform: `rotate(${rot0}deg)`,   // animation off: a float would override the flight
      transition: 'transform .95s cubic-bezier(.55,0,.25,1), opacity .25s ease .75s' });
    document.body.appendChild(c);
    pl.style.visibility = 'hidden';   // the real one leaves no trace; the copy does the flying
    setTimeout(() => { pl.style.visibility = ''; }, 600);
    const to = memEl.querySelector('.mem-pic').getBoundingClientRect(), s = Math.min(to.width / w, to.height / h) * fit;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      c.style.transform = `translate(${to.left + to.width / 2 - cx}px, ${to.top + to.height / 2 - cy}px) scale(${s}) rotate(-14deg)`;
      c.style.opacity = '0';
    }));
    const items = pendingFly.splice(0).map(p => p.it);
    setTimeout(() => { c.remove(); items.forEach(it => setMemories(it, true)); Sound.blip(); }, 980);
  }
  document.getElementById('paperClose').addEventListener('click', closeNote);
  paperEl.addEventListener('click', e => {
    if (e.target.closest('.paper-actions') || e.target.closest('.polaroid')) return;
    // click on the crumpled sheet itself keeps it open (a polaroid has no sheet: its old rect would swallow the click)
    const r = CrumplePaper.rect;
    if (!paperEl.classList.contains('memo') && e.clientX > r.x && e.clientX < r.x + r.w && e.clientY > r.y && e.clientY < r.y + r.h) return;
    closeNote();
  });

  /* ---- now and then a text chews like an old tape ---- */
  const glitchables = () => [...document.querySelectorAll('.name, .status, .topright, .side, .skills, .memories, .thought')]
    .filter(el => getComputedStyle(el).display !== 'none' && getComputedStyle(el).opacity !== '0');
  function glitchSoon() {
    setTimeout(() => {
      if (document.body.classList.contains('ready') && !document.hidden) {
        const list = glitchables();
        const el = list[(Math.random() * list.length) | 0];
        if (el) { el.classList.remove('vhs'); void el.offsetWidth; el.classList.add('vhs'); setTimeout(() => el.classList.remove('vhs'), 520); }
      }
      glitchSoon();
    }, 2200 + Math.random() * 4500);
  }
  glitchSoon();
  // the floor lamp is a light switch, not a collectible
  const LAMP = { id: 'lamp', lamp: true, r: [2270, 325, 2535, 1285] };
  const lamp = { on: true, v: 1, flickerUntil: 0 };
  function toggleLamp() {
    lamp.on = !lamp.on;
    if (lamp.on) lamp.flickerUntil = performance.now() + 420;
    tagText.innerHTML = lamp.on ? 'Switch off<br>the lamp' : 'Switch on<br>the lamp';
    Sound.lamp();
  }
  function itemAt(e) {
    const [x, y] = screenToImage(e.clientX / innerWidth, e.clientY / innerHeight);
    const inR = it => x > it.r[0] && x < it.r[2] && y > it.r[1] && y < it.r[3];
    return ITEMS.find(inR) || (inR(LAMP) ? LAMP : null);
  }

  // progress: which items were looked at (kept ~10 min per browser, harmless if storage is blocked)
  let explored = new Set((saved.explored || []).filter(id => ITEMS.some(i => i.id === id)));
  function renderProgress() { document.body.classList.toggle('complete', explored.size === ITEMS.length); }
  renderProgress();
  // letters already found in earlier visits
  LETTER_ITEMS.forEach(it => { if (explored.has(it.id)) { revealed.add(it.id); setSlot(it, false); } });
  syncNamed();

  /* ---- pictures of items: cut-out PNG, else the gif, else a snapshot from the room ---- */
  const pngOf = it => it.photo ? null : ASSET(it.thumb || (it.object && /\.png$/i.test(it.object) ? it.object : null));
  const cropCache = {};
  function cropOf(it) {
    if (cropCache[it.id] !== undefined) return cropCache[it.id];
    try {
      const [x0, y0, x1, y1] = it.r, side = Math.max(x1 - x0, y1 - y0) * 1.15, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, N = 220;
      const c = document.createElement('canvas'); c.width = c.height = N;
      const k = (img.naturalWidth || IMG_W) / IMG_W;   // layout pixels -> stored pixels
      c.getContext('2d').drawImage(img, (cx - side / 2) * k, (cy - side / 2) * k, side * k, side * k, 0, 0, N, N);
      return (cropCache[it.id] = c.toDataURL('image/jpeg', .88));
    } catch (e) { return (cropCache[it.id] = ''); }
  }
  const picOf = it => (it.screen && !it.photo ? tvThumbOf(it) : null) || pngOf(it) || ASSET(it.photo) || ASSET(it.screen) || cropOf(it);
  // a TV frame's picture for the corner: objects/tv.png with the clip's first frame on its glass (built once)
  const tvThumbs = {};
  function tvThumbOf(it) {
    if (tvThumbs[it.id] !== undefined) return tvThumbs[it.id] || ASSET('objects/tv.png');
    tvThumbs[it.id] = '';
    const body = corsify(new Image()), fr = corsify(new Image()); let n = 0;
    const done = () => {
      if (++n < 2) return;
      try {
        const c = document.createElement('canvas'); c.width = 362; c.height = 272; const g = c.getContext('2d');
        g.drawImage(body, 0, 0, c.width, c.height);
        const x = c.width * .1464, y = c.height * .151, w = c.width * .5387, h = c.height * .5083, k = Math.max(w / fr.naturalWidth, h / fr.naturalHeight);
        g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip();
        g.drawImage(fr, x + (w - fr.naturalWidth * k) / 2, y + (h - fr.naturalHeight * k) / 2, fr.naturalWidth * k, fr.naturalHeight * k);
        g.restore();
        tvThumbs[it.id] = c.toDataURL('image/png');
        if (memImg.dataset.id === it.id) memImg.src = tvThumbs[it.id];
      } catch (e) {}
    };
    body.onload = fr.onload = done; body.onerror = fr.onerror = () => {};
    body.src = ASSET('objects/tv.png'); fr.src = ASSET(it.screen);
    return ASSET('objects/tv.png');
  }

  /* ---- Memories corner: the last thing you found + how many ---- */
  const memEl = document.getElementById('memories'), memImg = document.getElementById('memImg'), memCount = document.getElementById('memCount');
  let memShown = 0;
  function setMemories(it, bump) {
    if (it) {
      memImg.dataset.id = it.id;
      memImg.src = picOf(it);
      // a photo (not a cut-out object or a TV frame) shows as a tiny polaroid
      memImg.classList.toggle('pl', !pngOf(it) && !it.screen);
    }
    memShown = explored.size;
    memCount.textContent = `${memShown}/${ITEMS.length}`;
    if (bump) { memEl.classList.remove('bump'); void memEl.offsetWidth; memEl.classList.add('bump'); }
  }
  function restoreMemories() {
    const order = [...explored];
    const last = ITEMS.find(i => i.id === order[order.length - 1]);
    setMemories(last || null, false);
  }
  memCount.textContent = `0/${ITEMS.length}`;
  // after a card closes, the item shrinks and flies into the corner
  let pendingFly = [];
  function flyToMemories(it, from) {
    const src = picOf(it), to = memEl.querySelector('.mem-pic').getBoundingClientRect();
    if (!src || !from) { setMemories(it, true); return; }
    const f = document.createElement('img');
    f.className = 'mem-fly'; f.src = src; f.alt = '';
    Object.assign(f.style, { left: from.x + 'px', top: from.y + 'px', width: from.w + 'px', height: from.h + 'px' });
    document.body.appendChild(f);
    const s = Math.min(to.width / from.w, to.height / from.h);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      f.style.transform = `translate(${to.left + to.width / 2 - from.x - from.w * s / 2}px, ${to.top + to.height / 2 - from.y - from.h * s / 2}px) scale(${s}) rotate(-14deg)`;
      f.style.opacity = '0';
    }));
    setTimeout(() => { f.remove(); setMemories(it, true); Sound.blip(); }, 980);
  }
  function flyPending(fromRect) {
    pendingFly.splice(0).forEach((p, i) => setTimeout(() => flyToMemories(p.it, fromRect || p.from), i * 220));
  }

  /* ---- the Memories notebook ---- */
  const nbLayer = document.getElementById('nbLayer'), nb = document.getElementById('nb');
  const nbL = document.getElementById('nbL'), nbR = document.getElementById('nbR');
  const nbPrev = document.getElementById('nbPrev'), nbNext = document.getElementById('nbNext');
  const PER_PAGE = 9, PAGES = Math.ceil(ITEMS.length / PER_PAGE), SPREADS = Math.ceil(PAGES / 2);
  // a little untidy, like things stuck in by hand
  // the form is neat (.nb-grid: 3 × 3 cells); what's stuck in it isn't: each item sits a bit off its cell's centre,
  // at its own angle, with its caption scribbled at another
  const GRID = { x: 6, y: 17, w: 88, h: 77.5 }, ITEM_W = 21, ITEM_H = 19.5;   // % of the page
  const SLOTS = [
    [-1.5, .6, -6, -3], [1.2, -.4, 4, 2], [.4, .8, -2, 4],
    [1, .2, 7, -2], [-1.2, -.6, -3, 3], [1.6, .4, 3, -4],
    [-.8, .3, -5, 2], [.6, -.5, 2, -3], [-1, .9, 6, 1]].map(([dx, dy, r, cr], i) => ({
      x: GRID.x + (i % 3 + .5) * GRID.w / 3 - ITEM_W / 2, y: GRID.y + ((i / 3 | 0) + .5) * GRID.h / 3 - ITEM_H / 2 - .6,
      dx, dy, r, cr }));
  let spread = 0;
  // the order things sit in the folder (Heisenberg first: his note is the hint about the hidden letters)
  const NB_ORDER_IDS = ['funko', 'sega', 'cart', 'ball', 'tv', 'matrix', 'vinyl', 'plant', 'wolverine',
                        'tote', 'cooper', 'halflife', 'tokyo', 'cat', 'munchkin', 'sneakers', 'mug', 'cap'];
  const NB_ORDER = [...NB_ORDER_IDS.map(id => ITEMS.find(i => i.id === id)).filter(Boolean), ...ITEMS.filter(i => !NB_ORDER_IDS.includes(i.id))];
  function itemHTML(it, slot) {
    const found = explored.has(it.id), png = it.nbImg ? ASSET(it.nbImg) : pngOf(it), title = it.nbTitle || (it.id === 'tv' ? 'The TV' : (it.note ? it.note.title : ''));
    // objects with a cut-out PNG are always objects (blurred until found); the rest are taped polaroids (blank until found)
    const tvset = it.screen && !it.photo;   // frames from a show/film: they sit in the folder on a little TV, not as a photo
    const pic = tvset ? `<span class="tvset"><img class="cut" alt="" src="${ASSET('objects/tv.png')}">${found ? `<span class="mt-screen"><img alt="" src="${ASSET(it.screen)}"><i class="mt-scan"></i></span>` : ''}</span>`
      : png ? `<img class="cut${it.spin && found ? ' spin' : ''}" alt="" src="${png}">`
      : `<span class="photo">${found ? `<img alt="" src="${ASSET(it.photo) || ASSET(it.screen) || cropOf(it)}">` : '<i class="blank"></i>'}</span>`;
    // taped photos sit a bit off and askew; cut-out objects stand straight in the middle of their cell
    // cut-out objects and the little TVs stand straight in the middle of their cell; taped photos sit a bit off and
    // askew. The caption always leans the same way as its picture. --s: per-object size in the folder
    const pos = (png || tvset ? `left:${slot.x}%;top:${slot.y - (it.nbLift || 0)}%;--r:0deg;--cr:0deg`
      : `left:${slot.x + slot.dx}%;top:${slot.y + slot.dy}%;--r:${slot.r}deg;--cr:0deg`) + `;--s:${it.nbScale || 1}`;
    const missed = found && it.letter && !revealed.has(it.id);   // seen, but its letter slipped past: open it again
    return found
      ? `<button class="nb-item found${missed ? ' missed' : ''}" data-id="${it.id}" style="${pos}"><span class="pic">${pic}</span><span class="cap">${esc(title)}</span></button>`
      : `<div class="nb-item locked" style="${pos}" aria-label="Not found yet"><span class="pic">${pic}</span><span class="cap"></span></div>`;
  }
  function pageHTML(p) {
    const items = NB_ORDER.slice(p * PER_PAGE, p * PER_PAGE + PER_PAGE);
    const head = p === 0 ? `<div class="nb-head">Memories</div>`
               : p % 2 ? `<div class="nb-head">${explored.size} of ${ITEMS.length}</div>` : '';
    const grid = `<div class="nb-grid" aria-hidden="true">${SLOTS.map((_, i) => `<span class="cell"><b>${String(p * PER_PAGE + i + 1).padStart(2, '0')}</b></span>`).join('')}</div>`;
    const body = items.length ? grid + items.map((it, i) => itemHTML(it, SLOTS[i])).join('')
               : `<div class="nb-head" style="top:44%;text-align:center;opacity:.55">to be continued&hellip;</div>`;
    return head + body;
  }
  let lastL = '', lastR = '';
  function renderSpread() {   // only rebuild what changed: fresh <img>s would have to load and decode all over again
    const l = pageHTML(spread * 2), r = pageHTML(spread * 2 + 1);
    if (l !== lastL || nbL.dataset.v !== l.length + '') { nbL.innerHTML = lastL = l; nbL.dataset.v = l.length; }
    if (r !== lastR || nbR.dataset.v !== r.length + '') { nbR.innerHTML = lastR = r; nbR.dataset.v = r.length; }
    nbPrev.disabled = spread === 0;
    nbNext.disabled = spread >= SPREADS - 1;
    nbPrev.hidden = nbNext.hidden = SPREADS < 2;   // everything fits on one spread: no page turning
  }
  function turn(dir) {   // a flat page turn: the leaf narrows to the spine and opens on the other side
    const next = spread + dir;
    if (next < 0 || next >= SPREADS || nbLayer.classList.contains('anim') || nbLayer.classList.contains('list')) return;
    const fwd = dir > 0, oldL = nbL.innerHTML, oldR = nbR.innerHTML;
    nbLayer.classList.add('anim');
    // the old spread stays on top until the leaf has covered it
    const keep = face('nb-page ' + (fwd ? 'l' : 'r'), fwd ? oldL : oldR, 5);
    const out = face('nb-page leaf ' + (fwd ? 'r' : 'l'), fwd ? oldR : oldL, 7);
    spread = next; renderSpread();
    const inn = face('nb-page leaf ' + (fwd ? 'l' : 'r'), (fwd ? nbL : nbR).innerHTML, 7, true);
    Sound.paper();
    (async () => {
      await flip(out, false, 230); await flip(inn, true, 260);
      [keep, out, inn].forEach(e => e.remove());
      nbLayer.classList.remove('anim');
    })();
  }

  /* ---- the folder's temporary flat faces (used by the page turn) ---- */
  function face(cls, html, z, folded) {
    const d = document.createElement('div');
    d.className = 'nb-face ' + cls; d.innerHTML = html; d.style.zIndex = z;
    if (folded) d.style.transform = 'scaleX(0)';
    d.setAttribute('aria-hidden', 'true');
    nb.appendChild(d); return d;
  }
  // one half of a page turn: a face narrows to the spine (in = false) or opens from it (in = true), darkening as it stands up
  function flip(el, open, ms) {
    const a = el.animate(open
      ? [{ transform: 'scaleX(0)', filter: 'brightness(.62)' }, { transform: 'scaleX(1)', filter: 'brightness(1)' }]
      : [{ transform: 'scaleX(1)', filter: 'brightness(1)' }, { transform: 'scaleX(0)', filter: 'brightness(.62)' }],
      { duration: ms, easing: open ? 'cubic-bezier(.15,.55,.35,1)' : 'cubic-bezier(.6,0,.85,.45)', fill: 'forwards' });
    return a.finished;
  }
  const wait = ms => new Promise(r => setTimeout(r, ms));
  function cleanBook() {
    nb.querySelectorAll('.nb-face').forEach(e => e.remove());
    nb.classList.remove('shut', 'moving');
    nb.style.transform = nb.style.opacity = nbCover.style.opacity = nb.style.transformOrigin = '';
    nbShade.style.background = 'none';
  }

  /* ---- photograph the left page into a canvas: it rides on the inside of the cover while that swings ---- */
  function offIn(el, root) { let x = 0, y = 0; while (el && el !== root) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; } return [x, y]; }
  function snapshotPage(page, isLeft) {
    const dpr = Math.min(devicePixelRatio || 1, 2), W = page.offsetWidth, H = page.offsetHeight;
    const c = document.createElement('canvas'); c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
    const g = c.getContext('2d'); g.scale(dpr, dpr);
    // paper
    g.fillStyle = '#efe3c8'; g.fillRect(0, 0, W, H);
    let gr = g.createRadialGradient(W * .5, H * .4, 10, W * .5, H * .5, Math.max(W, H) * .75);
    gr.addColorStop(0, 'rgba(255,250,235,.7)'); gr.addColorStop(1, 'rgba(180,140,90,.18)');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    // shadow towards the spine
    gr = isLeft ? g.createLinearGradient(W, 0, W - 30, 0) : g.createLinearGradient(0, 0, 30, 0);
    gr.addColorStop(0, 'rgba(70,40,15,.34)'); gr.addColorStop(1, 'rgba(70,40,15,0)');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    const text = (el, str, align, root = page) => {   // root: what the current drawing origin is
      const cs = getComputedStyle(el), [x, y] = offIn(el, root);
      g.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`; g.fillStyle = cs.color;
      g.textBaseline = 'middle'; g.textAlign = align || 'left';
      const t = cs.textTransform === 'uppercase' ? str.toUpperCase() : str;
      g.fillText(t, align === 'center' ? x + el.offsetWidth / 2 : align === 'right' ? x + el.offsetWidth : x, y + el.offsetHeight / 2);
    };
    page.querySelectorAll('.nb-head').forEach(hd => {
      const small = hd.querySelector('small');
      const main = [...hd.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim();
      const cs = getComputedStyle(hd), [x, y] = offIn(hd, page), right = cs.textAlign === 'right';
      g.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`; g.fillStyle = cs.color; g.textBaseline = 'top';
      g.textAlign = right ? 'right' : 'left'; g.fillText(main, right ? x + hd.offsetWidth : x, y);
      if (small) text(small, small.textContent, right ? 'right' : 'left');
    });
    page.querySelectorAll('.nb-grid').forEach(gd => {   // the printed form
      const [gx, gy] = offIn(gd, page), gw = gd.offsetWidth, gh = gd.offsetHeight;
      g.strokeStyle = 'rgba(110,78,45,.3)'; g.lineWidth = 1; g.beginPath();
      for (let k = 1; k < 3; k++) { const x = Math.round(gx + gw * k / 3) + .5, y = Math.round(gy + gh * k / 3) + .5; g.moveTo(x, gy); g.lineTo(x, gy + gh); g.moveTo(gx, y); g.lineTo(gx + gw, y); }
      g.stroke();
      gd.querySelectorAll('b').forEach(b => {
        const cs = getComputedStyle(b), [x, y] = offIn(b, page);
        g.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`; g.fillStyle = cs.color; g.textBaseline = 'top'; g.textAlign = 'left';
        if ('letterSpacing' in g) g.letterSpacing = cs.letterSpacing;
        g.fillText(b.textContent, x, y);
        if ('letterSpacing' in g) g.letterSpacing = '0px';
      });
    });
    page.querySelectorAll('.nb-item').forEach(item => {
      const [ix, iy] = offIn(item, page), iw = item.offsetWidth, ih = item.offsetHeight;
      const r = parseFloat(item.style.getPropertyValue('--r')) * Math.PI / 180 || 0;
      const locked = item.classList.contains('locked');
      g.save(); g.translate(ix + iw / 2, iy + ih / 2); g.rotate(r); g.translate(-iw / 2, -ih / 2);
      const L = el => offIn(el, item);
      const cut = item.querySelector('img.cut'), photo = item.querySelector('.photo');
      if (cut && cut.naturalWidth) {
        const [x, y] = L(cut), w = cut.offsetWidth, h = cut.offsetHeight, s = Math.min(w / cut.naturalWidth, h / cut.naturalHeight);
        const dw = cut.naturalWidth * s, dh = cut.naturalHeight * s, dx = x + (w - dw) / 2, dy = y + (h - dh) / 2;
        if (locked) {   // blurred memory, like the CSS one
          g.filter = `blur(${Math.round(nb.offsetWidth * .007)}px) sepia(.85) saturate(.55) brightness(.92)`;
          if (g.filter !== 'none') { g.globalAlpha = .42; g.drawImage(cut, dx, dy, dw, dh); }
          else {   // no canvas filters (older Safari): draw it small and scale it up
            const t = document.createElement('canvas'); t.width = Math.max(4, dw / 6); t.height = Math.max(4, dh / 6);
            t.getContext('2d').drawImage(cut, 0, 0, t.width, t.height);
            g.globalAlpha = .34; g.imageSmoothingQuality = 'high'; g.drawImage(t, dx, dy, dw, dh);
          }
          g.filter = 'none'; g.globalAlpha = 1;
        } else {
          g.shadowColor = 'rgba(60,35,15,.35)'; g.shadowBlur = 10; g.shadowOffsetY = 8;
          g.drawImage(cut, dx, dy, dw, dh); g.shadowColor = 'transparent';
        }
      }
      const glass = item.querySelector('.mt-screen'), frameImg = glass && glass.querySelector('img');
      if (frameImg && frameImg.naturalWidth) {   // the little TV's picture
        const [x, y] = L(glass), w = glass.offsetWidth, h = glass.offsetHeight, iw = frameImg.naturalWidth, ih = frameImg.naturalHeight;
        const k = Math.max(w / iw, h / ih), sw = w / k, sh = h / k;
        g.drawImage(frameImg, (iw - sw) / 2, (ih - sh) / 2, sw, sh, x, y, w, h);
      }
      if (photo) {
        const [x, y] = L(photo), w = photo.offsetWidth, h = photo.offsetHeight;
        g.shadowColor = 'rgba(60,35,15,.3)'; g.shadowBlur = 10; g.shadowOffsetY = 6;
        g.fillStyle = '#fbf7ee'; g.fillRect(x, y, w, h); g.shadowColor = 'transparent';
        const inner = photo.querySelector('img, .blank'), [px, py] = L(inner), pw = inner.offsetWidth, ph = inner.offsetHeight;
        if (inner.tagName === 'IMG' && inner.naturalWidth) {
          const s = Math.max(pw / inner.naturalWidth, ph / inner.naturalHeight), sw = pw / s, shh = ph / s;
          g.drawImage(inner, (inner.naturalWidth - sw) / 2, (inner.naturalHeight - shh) / 2, sw, shh, px, py, pw, ph);
        } else {
          const bg = g.createLinearGradient(px, py, px + pw, py + ph); bg.addColorStop(0, '#5c4834'); bg.addColorStop(1, '#33271c');
          g.fillStyle = bg; g.fillRect(px, py, pw, ph);
        }
        g.save(); g.translate(x + w / 2, y + h * .0); g.rotate(-6 * Math.PI / 180);   // tape
        g.fillStyle = 'rgba(196,174,128,.82)'; g.fillRect(-w * .23, -h * .07, w * .46, h * .13); g.restore();
      }
      const cap = item.querySelector('.cap');
      if (cap && cap.firstChild && cap.textContent.trim()) {   // scribbled at its own angle (unfound cells have no caption)
        const [x, y] = offIn(cap, item), cr = parseFloat(item.style.getPropertyValue('--cr')) * Math.PI / 180 || 0;
        g.save(); g.translate(x + cap.offsetWidth / 2, y + cap.offsetHeight / 2); g.rotate(cr); g.translate(-x - cap.offsetWidth / 2, -y - cap.offsetHeight / 2);
        // wrapped like the CSS one: break the words where the browser did (by line boxes)
        const cs = getComputedStyle(cap), lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.1;
        g.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`; g.fillStyle = cs.color; g.textAlign = 'center'; g.textBaseline = 'middle';
        const lines = [], rg = document.createRange(), words = cap.textContent.split(' ');
        let cur = '', lastLeft = null, node = cap.firstChild, pos = 0;
        words.forEach(wd => {   // the item is tilted, so a new line shows as a word starting back to the left
          rg.setStart(node, pos); rg.setEnd(node, pos + wd.length); const left = rg.getClientRects()[0]?.left;
          if (lastLeft !== null && left !== undefined && left < lastLeft - 2) { lines.push(cur); cur = wd; } else cur = cur ? cur + ' ' + wd : wd;
          if (left !== undefined) lastLeft = left; pos += wd.length + 1;
        });
        lines.push(cur);
        lines.forEach((ln, k) => g.fillText(ln, x + cap.offsetWidth / 2, y + lh * (k + .5)));
        g.restore();
      }
      g.restore();
    });
    return c;
  }

  /* ---- the cover's two sides, painted for WebGL ---- */
  const nbCover = document.getElementById('nbCover'), nbShade = document.getElementById('nbShade');
  let folderGL = null;
  const glReady = () => (folderGL === null ? (folderGL = !!(window.FolderGL && FolderGL.init(nbCover))) : folderGL);
  function seeded(n) { let s = n; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
  function paintCanvas(w, h) {
    const dpr = Math.min(devicePixelRatio || 1, 2), c = document.createElement('canvas');
    c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
    const g = c.getContext('2d'); g.scale(dpr, dpr); return [c, g];
  }
  function rrect(g, x, y, w, h, radii) { g.beginPath(); if (g.roundRect) g.roundRect(x, y, w, h, radii); else g.rect(x, y, w, h); }
  function cardboard(g, w, h, base, outerLeft) {
    const radii = outerLeft ? [7, 0, 0, 7] : [0, 7, 7, 0];
    g.save(); rrect(g, 0, 0, w, h, radii); g.clip();
    g.fillStyle = base; g.fillRect(0, 0, w, h);
    let gr = g.createRadialGradient(w * .4, h * .35, 10, w * .5, h * .5, Math.max(w, h) * .8);
    gr.addColorStop(0, 'rgba(255,240,205,.35)'); gr.addColorStop(1, 'rgba(120,80,30,.18)');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    const rnd = seeded(outerLeft ? 7 : 3);   // fibres
    g.lineWidth = .6;
    for (let i = 0; i < 1600; i++) {
      const x = rnd() * w, y = rnd() * h, l = 2 + rnd() * 7, a = rnd() * Math.PI;
      g.strokeStyle = rnd() < .5 ? 'rgba(110,70,25,.1)' : 'rgba(255,245,220,.12)';
      g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke();
    }
    gr = outerLeft ? g.createLinearGradient(w, 0, w - 22, 0) : g.createLinearGradient(0, 0, 22, 0);   // the fold
    gr.addColorStop(0, 'rgba(90,55,15,.4)'); gr.addColorStop(1, 'rgba(90,55,15,0)');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    g.restore();
    g.strokeStyle = 'rgba(120,80,30,.3)'; g.lineWidth = 1; rrect(g, .5, .5, w - 1, h - 1, radii); g.stroke();
  }
  // the case card and the taped polaroid on the front of the folder; the photo comes later (until then: a black square)
  const COVER_PHOTO = 'objects/casephoto-cover.jpg';   // a light copy of the folder photo
  const coverPhoto = COVER_PHOTO ? Object.assign(corsify(new Image()), { src: ASSET(COVER_PHOTO) }) : null;
  function coverFront(w, h) {
    const [c, g] = paintCanvas(w, h), deg = Math.PI / 180, hand = '"Gochi Hand", cursive';
    cardboard(g, w, h, '#cfac72', false);
    const shadow = (blur, y, a) => { g.shadowColor = `rgba(60,35,10,${a})`; g.shadowBlur = blur; g.shadowOffsetY = y; };
    const noShadow = () => { g.shadowColor = 'transparent'; g.shadowBlur = 0; g.shadowOffsetY = 0; };
    // the case card: "case file no." + today's date as the number, and the case name
    g.save(); g.translate(w * .455, h * .355); g.rotate(-2.2 * deg);
    const cw = w * .6, ch = h * .232;
    shadow(10, 3, .3); g.fillStyle = '#fbf5df'; g.fillRect(-cw / 2, -ch / 2, cw, ch); noShadow();
    const d = new Date(), pad = n => String(n).padStart(2, '0');
    g.fillStyle = '#6b5640'; g.font = `600 ${w * .026}px Inter, sans-serif`; g.textBaseline = 'middle';
    if ('letterSpacing' in g) g.letterSpacing = '1.5px';
    g.textAlign = 'left'; g.fillText('CASE FILE NO.', -cw / 2 + cw * .055, -ch / 2 + ch * .22);
    g.textAlign = 'right'; g.fillText(`${pad(d.getDate())} ${pad(d.getMonth() + 1)} ${d.getFullYear()}`, cw / 2 - cw * .055, -ch / 2 + ch * .22);
    if ('letterSpacing' in g) g.letterSpacing = '0px';
    g.strokeStyle = 'rgba(60,40,20,.55)'; g.lineWidth = 1;
    g.beginPath(); g.moveTo(-cw / 2 + cw * .055, -ch / 2 + ch * .345); g.lineTo(cw / 2 - cw * .055, -ch / 2 + ch * .345); g.stroke();
    g.fillStyle = '#1e140c'; g.textAlign = 'center'; g.font = `${w * .074}px ${hand}`;
    g.fillText('Looking for D.N.', 0, ch * .14);
    g.restore();
    // the polaroid, taped over the card's corner
    g.save(); g.translate(w * .605, h * .595); g.rotate(2.6 * deg);
    const pw = w * .44, ph = pw * 1.06;
    shadow(14, 6, .38); g.fillStyle = '#f6f1e6'; g.fillRect(-pw / 2, -ph / 2, pw, ph); noShadow();
    const m = pw * .06, sq = pw - 2 * m, sx = -pw / 2 + m, sy = -ph / 2 + m;
    if (coverPhoto && coverPhoto.complete && coverPhoto.naturalWidth) {
      // cover-crop to the print's shape (a touch wider than tall), keeping the top of the picture (the face)
      const iw = coverPhoto.naturalWidth, ih = coverPhoto.naturalHeight, ar = 1 / .9;
      const cw = Math.min(iw, ih * ar), ch = cw / ar;
      g.drawImage(coverPhoto, (iw - cw) / 2, Math.min(ih - ch, (ih - ch) * .3), cw, ch, sx, sy, sq, sq * .9);
    } else { g.fillStyle = '#140a05'; g.fillRect(sx, sy, sq, sq * .9); }
    const gl = g.createLinearGradient(sx, sy, sx + sq, sy + sq * .9);   // a little gloss on the print
    gl.addColorStop(0, 'rgba(255,255,255,.08)'); gl.addColorStop(.4, 'rgba(255,255,255,0)');
    g.fillStyle = gl; g.fillRect(sx, sy, sq, sq * .9);
    g.fillStyle = '#1e140c'; g.font = `${w * .046}px ${hand}`; g.textAlign = 'right'; g.textBaseline = 'middle';
    g.save(); g.translate(pw / 2 - pw * .09, ph / 2 - (ph - m - sq * .9) / 2); g.rotate(-1.5 * deg); g.fillText('Who are u?', 0, 0); g.restore();
    // tape across the top-right corner
    g.save(); g.translate(pw / 2 - pw * .04, -ph / 2 + ph * .05); g.rotate(-60 * deg);
    const tw = pw * .36, th = pw * .135;
    g.fillStyle = 'rgba(150,142,142,.92)'; g.fillRect(-tw / 2, -th / 2, tw, th);
    g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(-tw / 2, -th / 2, tw, th * .35);
    g.restore();
    g.restore();
    return c;
  }
  function coverInside(w, h) {
    const [c, g] = paintCanvas(w, h), bl = nb.querySelector('.nb-board.l');
    cardboard(g, w, h, '#dcbd86', true);
    const x = nbL.offsetLeft - bl.offsetLeft, y = nbL.offsetTop - bl.offsetTop, pw = nbL.offsetWidth, ph = nbL.offsetHeight;
    [[-6, 5, '#bfa77f'], [-5, 4, '#ebdfc4'], [-3, 3, '#c8b28b'], [-2, 2, '#e4d6b8']].forEach(([dx, dy, col]) => { g.fillStyle = col; g.fillRect(x + dx, y + dy, pw, ph); });
    g.shadowColor = 'rgba(60,35,10,.25)'; g.shadowBlur = 8; g.shadowOffsetY = 3;
    g.drawImage(snapshotPage(nbL, true), x, y, pw, ph); g.shadowColor = 'transparent';
    return c;
  }
  async function coverReady() {
    if (!glReady()) return false;
    const imgs = [...nbL.querySelectorAll('img')];
    // the snapshot only has what has loaded: give the pictures a moment, or they'd pop in when the real page takes over
    // (pictures that are already there need no waiting: drawing them decodes them anyway)
    const pending = imgs.filter(i => !(i.complete && i.naturalWidth)).map(i => new Promise(r => {
      i.addEventListener('load', r, { once: true }); i.addEventListener('error', r, { once: true }); }));
    if (pending.length) await Promise.race([Promise.all(pending), wait(700)]);
    const w = nbCover.clientWidth / 2, h = nbCover.clientHeight;
    try { return FolderGL.textures(coverFront(w, h), coverInside(w, h)); } catch (e) { return false; }
  }

  /* ---- opening / closing: one continuous motion ----
     the folder rises softly in the middle, its cover already swinging open before it has settled; the cardboard bends
     a little with the cover's speed and straightens as it lands */
  const clamp01 = v => Math.max(0, Math.min(1, v));
  const sineIO = t => (1 - Math.cos(Math.PI * t)) / 2;            // soft at both ends
  function play(dur, frame) {
    return new Promise(res => {
      const t0 = performance.now();
      const step = now => { const t = Math.min((now - t0) / 1000, dur); frame(t); if (t < dur) requestAnimationFrame(step); else res(); };
      requestAnimationFrame(step);
    });
  }
  function shade(th) {   // the lifted cover's shadow on the right page
    const l = Math.max(0, Math.sin(th)), end = 50 + 50 * Math.min(1.07, Math.cos(th) + .45 * l);
    nbShade.style.background = end <= 50.5 || l < .01 ? 'none'
      : `linear-gradient(90deg, transparent 50%, rgba(30,15,3,${.42 * l}) 50%, rgba(30,15,3,${.18 * l}) ${50 + (end - 50) * .7}%, transparent ${end}%)`;
  }
  let nbRun = 0;
  // the folder lives in the Memories corner: it flies out of it to open and back into it when put away.
  // flight(f): f = 0 in the middle of the screen (full size), 1 down in the corner (icon size); tx: the cover's shift in %
  function flightPath(gl) {
    const pic = memEl.querySelector('.mem-pic') || memEl, pr = pic.getBoundingClientRect();
    const folderH = nb.offsetHeight * 1.056, folderW = nb.offsetWidth * .52;
    const dx = pr.left + pr.width / 2 - innerWidth / 2, dy = pr.top + pr.height / 2 - innerHeight / 2;
    const sEnd = Math.max(.04, Math.min(pr.width / folderW, pr.height / folderH) * 1.3);
    nb.style.transformOrigin = gl ? '75% 50%' : '50% 50%';   // turn and shrink around the shut folder itself
    return (f, tx) => {
      const e = ease(f), sc = Math.exp(Math.log(sEnd) * Math.pow(f, 1.5));
      const lift = -innerHeight * .1 * Math.sin(Math.PI * Math.min(1, f * 1.1));   // a little toss upward on the way
      nb.style.transform = `translate(calc(${tx}% + ${dx * e}px), ${dy * e + lift}px) rotate(${-16 * e}deg) scale(${sc})`;
      nb.style.opacity = 1 - clamp01((f - .86) / .14);
    };
  }
  const bumpMemories = () => { memEl.classList.remove('bump'); void memEl.offsetWidth; memEl.classList.add('bump'); };
  // upright phones: the whole collection on one scrolling sheet
  const nbSheet = document.getElementById('nbSheet');
  function openNbList() {
    nbRun++;
    const cells = NB_ORDER.map((it, i) => `<div class="nb-cell"><b>${String(i + 1).padStart(2, '0')}</b>${itemHTML(it, { x: 0, y: 0, dx: 0, dy: 0, r: SLOTS[i % 9].r * .6, cr: 0 })}</div>`).join('');
    nbSheet.innerHTML = `<div class="nb-sheet-head"><span>Memories</span><span>${explored.size} of ${ITEMS.length}</span></div><div class="nb-cells">${cells}</div>`;
    nbSheet.scrollTop = 0;
    nbLayer.classList.remove('closing'); nbLayer.classList.add('list', 'open'); nbLayer.setAttribute('aria-hidden', 'false');
    hovered = null; tag.classList.remove('show'); canvas.classList.remove('hot');
    document.body.classList.add('note', 'nb-list');
    Sound.rustle();
  }
  function closeNbList() {
    nbRun++;
    nbLayer.classList.remove('open'); nbLayer.classList.add('closing'); nbLayer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('note', 'nb-list');
    Sound.rustle();
    setTimeout(() => { if (!nbLayer.classList.contains('open')) nbLayer.classList.remove('closing', 'list'); }, 320);
  }
  async function openNotebook() {
    if (nbLayer.classList.contains('anim')) return;
    if (phoneTape.matches) { openNbList(); return; }
    const run = ++nbRun;
    spread = 0; renderSpread(); cleanBook();
    nbLayer.classList.remove('closing');
    nbLayer.classList.add('open', 'anim'); nbLayer.setAttribute('aria-hidden', 'false');
    hovered = null; tag.classList.remove('show'); canvas.classList.remove('hot');
    document.body.classList.add('note');
    nb.style.opacity = 0;
    Sound.rustle();   // the folder comes out
    const gl = await coverReady();
    if (run !== nbRun) return;
    if (gl) { nb.classList.add('shut'); FolderGL.draw(0); }
    let flap = false;
    // the shut folder pops out of the Memories corner and arcs up into the middle, growing to full size (the exact
    // reverse of putting it away); before it has quite settled, the cover swings open on a sine curve, the board
    // bending with the cover's speed and straightening as it lands.
    // once the cover lies flat, the real left page comes up under it and the painted copy dissolves away
    // (no hard swap: if the copy is a hair off, it blends instead of snapping)
    const fly = flightPath(gl), FD = .72, C0 = gl ? .6 : 0;
    bumpMemories();
    let landed = false;
    await play(gl ? C0 + 1.4 : FD, t => {
      const c = clamp01((t - C0) / 1.1), th = Math.PI * sineIO(c), v = Math.sin(Math.PI * c);
      if (gl && !flap && c > .3) { flap = true; Sound.rustle(); }   // the cover swings open
      fly(1 - clamp01(t / FD), gl ? -25 * (1 - th / Math.PI) : 0);
      if (!gl) return;
      if (c < 1) { const bend = -.55 * v * v; FolderGL.draw(th, bend, bend * .25); shade(th); return; }
      if (!landed) { landed = true; FolderGL.draw(Math.PI); shade(Math.PI); nb.classList.add('moving'); nb.classList.remove('shut'); }
      nbCover.style.opacity = 1 - sineIO(clamp01((t - C0 - 1.1) / .3));
    });
    if (run !== nbRun) return;
    cleanBook();
    nbLayer.classList.remove('anim');
  }
  async function closeNotebook() {
    if (!nbLayer.classList.contains('open') || nbLayer.classList.contains('anim')) return;
    if (nbLayer.classList.contains('list')) { closeNbList(); return; }
    const run = ++nbRun;
    cleanBook();
    nbLayer.classList.add('closing', 'anim');
    nbLayer.classList.remove('open');
    nbLayer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('note');
    Sound.rustle();   // the cover shuts
    const gl = await coverReady();
    if (run !== nbRun) return;
    if (gl) { nb.classList.add('shut'); FolderGL.draw(Math.PI); }
    // then the shut folder is tossed back where it came from: it arcs into the Memories corner,
    // shrinking down to the size of its icon, and the corner catches it
    const fly = flightPath(gl), F0 = gl ? .6 : .15, FD = .72;
    let caught = false, tossed = false;
    await play(F0 + FD, t => {
      const c = clamp01(t / .7), th = gl ? Math.PI * (1 - sineIO(c)) : 0, v = Math.sin(Math.PI * c);
      if (gl && c < 1) { const bend = .55 * v * v; FolderGL.draw(th, bend, bend * .25); shade(th); }
      const f = clamp01((t - F0) / FD);
      if (f > 0 && !tossed) { tossed = true; Sound.rustle(); }   // tossed back into Memories
      fly(f, gl ? -25 * (1 - th / Math.PI) : 0);
      if (f >= .9 && !caught) { caught = true; bumpMemories(); }
    });
    if (run !== nbRun) return;
    cleanBook();
    nbLayer.classList.remove('closing', 'anim');
  }
  memEl.addEventListener('click', openNotebook);
  // fill the pages as soon as the pointer comes near, so their pictures are loaded by the time it opens
  memEl.addEventListener('pointerenter', () => { if (!nbLayer.classList.contains('open') && !nbLayer.classList.contains('anim')) { spread = 0; renderSpread(); } });
  document.getElementById('nbClose').addEventListener('click', closeNotebook);
  document.getElementById('nbListClose').addEventListener('click', closeNotebook);
  nbPrev.addEventListener('click', () => turn(-1));
  nbNext.addEventListener('click', () => turn(1));
  nbLayer.addEventListener('click', e => {
    if (nbLayer.classList.contains('anim')) return;
    const b = e.target.closest('.nb-item.found');
    if (b) {   // re-read a memory
      const it = ITEMS.find(i => i.id === b.dataset.id);
      closeNotebook();
      setTimeout(() => { if (it.id === 'tv') { if (!S.tv) zoomTo(zoomIn()); } else openNote(it); }, 250);
      return;
    }
    if (!e.target.closest('.nb, .nb-sheet')) closeNotebook();
  });

  function explore(it, from) {
    const fresh = !explored.has(it.id);
    explored.add(it.id);
    if (fresh) {
      const box = from ? { x: from.x - 40, y: from.y - 40, w: 80, h: 80 } : null;
      if (it.id === 'tv') setTimeout(() => flyToMemories(it, box), 200); else pendingFly.push({ it, from: box });
    }
    saveGame();
    renderProgress();
    if (fresh && explored.size === ITEMS.length) setTimeout(() => sayThought('I think I\u2019ve seen everything here.', 9000), it.say ? 5200 : 3400);
  }

  canvas.addEventListener('mousemove', e => {
    if (TOUCH) return;   // a tap sends a fake mouse move: it must not swing the camera or leave a hover badge behind
    S.mouseT = [ (e.clientX / innerWidth) * 2 - 1, -((e.clientY / innerHeight) * 2 - 1) ];
    if (!S.started) return;
    let hot, label = '', it = null;
    const onGlass = S.zoomed && document.body.classList.contains('gallery') && overScreen(e);
    const btn = !onGlass && vcrAt(e);
    if (onGlass) { hot = true; label = VP.on ? (VP.cam ? 'Stop<br>recording' : 'Eject<br>the tape') : 'Check out<br>the project'; }
    else if (btn) { hot = false; it = btn; }   // the set's buttons: just a hand; what they do shows at the bottom
    else {
      it = itemAt(e);
      if (it && S.tv && it.id === 'tv') it = null;      // zoomed in on the TV: the set itself isn't a target, its glass is
      hot = !!it && !it.lamp; if (hot) label = it.badge;
    }
    if (it !== hovered) {               // the character thinks about whatever the cursor rests on
      clearTimeout(hoverThoughtT);
      if (hovered && hovered.hover) releaseThought(hovered.hover);
      if (it && it.hover) hoverThoughtT = setTimeout(() => sayThought(it.hover, 6500), 70);
    }
    hovered = it;
    canvas.classList.toggle('hot', hot);
    canvas.classList.toggle('hand', !!(it && (it.lamp || it.vcr)));
    hint(it && it.vcr ? vcrHint(it) : '');   // the glass already has its round badge
    G.hoverT = onGlass ? 1 : 0;
    S.onSet = S.tv && inRect(e, TV);   // anywhere on the set (glass, buttons, frame): the camera holds still
    if (hot && tagText.innerHTML !== label) tagText.innerHTML = label;
    if (hot && !tagPos.init) { tagPos.x = e.clientX; tagPos.y = e.clientY; tagPos.init = true; }
    tag.classList.toggle('seen', !!(it && it.id !== 'tv' && explored.has(it.id)));
    tag.classList.toggle('show', hot);
    tagPos.tx = e.clientX; tagPos.ty = e.clientY;
  });
  canvas.addEventListener('mouseleave', () => { if (hovered && hovered.hover) releaseThought(hovered.hover); hint(''); S.mouseT = [0, 0]; S.onSet = false; tag.classList.remove('show'); G.hoverT = 0; hovered = null; canvas.classList.remove('hand'); });
  // a fingertip is much bigger than a cursor: a tap that just misses something counts as a tap on it
  function snapTap(e) {
    const atSet = p => S.zoomed && document.body.classList.contains('gallery') && (overScreen(p) || vcrAt(p));
    const hit = p => { if (atSet(p)) return true; const it = itemAt(p); return !!it && !(S.tv && it.id === 'tv'); };
    if (hit(e)) return e;
    for (const r of [14, 28]) for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2, p = { clientX: e.clientX + Math.cos(a) * r, clientY: e.clientY + Math.sin(a) * r };
      if (hit(p)) return p;
    }
    return e;
  }
  canvas.addEventListener('click', e => {
    if (!S.started || performance.now() - dragEnd < 400) return;
    if (TOUCH) e = snapTap(e);
    if (S.zoomed) {
      const btn = vcrAt(e);
      if (btn) { Sound.key(); vcrPress(btn); tvTipUsed(); }   // a light key click; channel changes add their own tape clunk
      else if (document.body.classList.contains('gallery') && overScreen(e)) {
        if (VP.on) { vpStop(); tag.classList.remove('show'); canvas.classList.remove('hot'); G.hoverT = 0; }   // watching: the glass takes the tape out (or stops the camera); its badge goes with it
        else if (!G.active) { openTape(); tvTipUsed(); }   // the glass ejects the project's tape (the site itself is on the PLAY button)
      } else {
        const it = itemAt(e);
        if (it && it.lamp) toggleLamp();
        else if (it && it.id === 'tv' && !S.tv) { explore(it, { x: e.clientX, y: e.clientY }); hovered = null; tag.classList.remove('show'); zoomTo(zoomIn()); }
        else if (it && it.id !== 'tv') openNote(it, { x: e.clientX, y: e.clientY });   // objects stay explorable while zoomed; the note does the talking
        else if (!overScreen(e)) { tag.classList.remove('show'); zoomTo(1); }
      }
    } else {
      const it = itemAt(e);
      if (!it) {   // the magnifier works anywhere: lean in on that spot of the room
        if (TOUCH) return;   // phones look around by dragging; a missed tap shouldn't throw the camera forward
        zoomTo(ROOM_ZOOM(), screenToView(e.clientX / innerWidth, e.clientY / innerHeight));
        return;
      }
      if (it.lamp) { toggleLamp(); return; }
      if (it.id === 'tv') { explore(it, { x: e.clientX, y: e.clientY }); hovered = null; tag.classList.remove('show'); canvas.classList.remove('hot'); zoomTo(zoomIn()); }
      else openNote(it, { x: e.clientX, y: e.clientY });   // counted once its note is open; the note does the talking
    }
  });
  addEventListener('keydown', e => {
    if (legalEl.classList.contains('open')) { if (e.key === 'Escape') closeLegal(); return; }
    if (window.vidOpen && vidOpen()) { if (e.key === 'Escape') closeVideo(); return; }
    if (tapeLayer.classList.contains('open')) { if (e.key === 'Escape') closeTape(); if (e.key === 'ArrowRight' || e.key === 'ArrowDown') stepTape(1); if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') stepTape(-1); return; }
    if (pagerLayer.classList.contains('open')) { if (e.key === 'Escape') closePager(); if (e.key === 'ArrowRight') pgShow(pgCur + 1); if (e.key === 'ArrowLeft') pgShow(pgCur - 1); return; }
    if (nbLayer.classList.contains('open')) { if (e.key === 'Escape') closeNotebook(); if (e.key === 'ArrowRight') turn(1); if (e.key === 'ArrowLeft') turn(-1); return; }
    if (e.key === 'Escape' && paperEl.classList.contains('open')) { closeNote(); return; }
    if (VP.on) {   // a tape in the VCR: space pauses, arrows wind, Esc stops it
      if (e.key === 'Escape') vpStop();
      if (e.key === ' ') { e.preventDefault(); vpPause(); }
      if (e.key === 'ArrowRight') vpSeek(1);
      if (e.key === 'ArrowLeft') vpSeek(-1);
      return;
    }
    if (e.key === 'Escape' && S.zoomed) zoomTo(1);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(1);
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go(-1);
    if (e.key === 'Enter' && S.started && !S.zoomed) zoomTo(zoomIn());
  });
  // ---- look around: move the camera inside the room (only while zoomed) ----
  function panBy(dx, dy) {
    const v = view(true);                       // un-panned framing at the current zoom
    const lim = (c, h) => [h + .01 - c, 1 - h - .01 - c];
    const [x0, x1] = lim(v.cx, v.hx), [y0, y1] = lim(v.cy, v.hy);
    S.panT[0] = Math.min(Math.max(S.panT[0] + dx, Math.min(0, x0)), Math.max(0, x1));
    S.panT[1] = Math.min(Math.max(S.panT[1] + dy, Math.min(0, y0)), Math.max(0, y1));
  }

  // wheel over the TV glass flips through sites, anywhere else it moves the camera
  let wheelLock = 0;
  addEventListener('wheel', e => {
    // the page never scrolls, so swallow every wheel/trackpad gesture —
    // otherwise a horizontal two-finger swipe triggers the browser's back/forward
    if (e.target.closest && e.target.closest('.legal-card, .nb-sheet')) return;   // let the notice and the Memories sheet scroll
    if (e.cancelable) e.preventDefault();
    if (window.vidOpen && vidOpen()) return;
    if (tapeLayer.classList.contains('open')) {   // tapes: sideways (or down/up) flips to the next/previous one
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const now = performance.now(); if (Math.abs(d) < 8 || now < tapeWheel) return;
      tapeWheel = now + 1200; stepTape(d > 0 ? 1 : -1); return;
    }
    if (!S.zoomed || !S.started) return;
    const onGlass = document.body.classList.contains('gallery') && overScreen(e);
    if (onGlass) {
      if (Math.abs(e.deltaY) < 8) return;
      const now = performance.now(); if (now < wheelLock) return;
      wheelLock = now + 900; go(e.deltaY > 0 ? 1 : -1);
      return;
    }
    let dx = e.deltaX, dy = e.deltaY;
    if (e.shiftKey && !dx) { dx = dy; dy = 0; }
    const unit = e.deltaMode === 1 ? 16 : 1;    // lines -> px
    const k = .00045 * unit / S.zoom;
    panBy(dx * k, dy * k * (IMG_W / IMG_H) * .7);
  }, { passive: false });

  // touch: swipe on the glass flips sites, drag anywhere else moves through the room (no need to zoom first);
  // the room follows the finger one to one, and a few pixels of jitter still count as a tap
  let touch = null, dragEnd = 0;
  canvas.addEventListener('touchstart', e => {
    const t = e.touches[0];
    touch = { x: t.clientX, y: t.clientY, lx: t.clientX, ly: t.clientY, moved: false,
      glass: S.zoomed && document.body.classList.contains('gallery') && overScreen(t) };
  }, { passive: true });
  canvas.addEventListener('touchmove', e => {
    if (!touch || touch.glass || !S.started) return;
    const t = e.touches[0];
    if (!touch.moved) {
      if (Math.hypot(t.clientX - touch.x, t.clientY - touch.y) < 10) return;
      touch.moved = true; touch.lx = t.clientX; touch.ly = t.clientY;
    }
    const v = view(true);
    panBy(-(t.clientX - touch.lx) * 2 * v.hx / innerWidth, -(t.clientY - touch.ly) * 2 * v.hy / innerHeight);
    touch.lx = t.clientX; touch.ly = t.clientY;
  }, { passive: true });
  canvas.addEventListener('touchend', e => {
    if (!touch) return;
    const c = e.changedTouches[0], dx = c.clientX - touch.x, dy = c.clientY - touch.y, g = touch.glass;
    if (touch.moved) dragEnd = performance.now();
    touch = null;
    if (g && Math.max(Math.abs(dx), Math.abs(dy)) > 50) {
      dragEnd = performance.now();
      const d = Math.abs(dx) > Math.abs(dy) ? dx : dy;
      go(d < 0 ? 1 : -1);
    }
  }, { passive: true });
  canvas.addEventListener('touchcancel', () => { touch = null; }, { passive: true });

  // tilting the phone moves the view too. The way it is being held counts as "straight ahead", and that slowly
  // follows the hand, so the room works at any angle. iPhones only give the sensor after a touch, so the first touch
  // on the room asks for it; the Tilt button turns it off and on, and says what went wrong if nothing comes in.
  const tiltBtn = document.getElementById('tilt');
  const TILT_ASK = !!window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function';
  let tiltOn = false, tiltZero = null, tiltSeen = false, tiltOff = false, tiltRel = false;
  function setTilt(on) {
    tiltOn = on; tiltZero = null;
    tiltBtn.textContent = on ? 'Tilt on' : 'Tilt off';
    tiltBtn.setAttribute('aria-pressed', on);
    if (!on) { S.tiltT = [0, 0]; S.mouseT = [0, 0]; }
  }
  // The phone's pose as a rotation matrix (rows, flat), not as its three angles: those jump about when the phone is
  // held nearly upright, while the matrix stays smooth in every position.
  function tiltR(a, b, g) {
    const k = Math.PI / 180, ca = Math.cos(a * k), sa = Math.sin(a * k), cb = Math.cos(b * k), sb = Math.sin(b * k), cg = Math.cos(g * k), sg = Math.sin(g * k);
    return [ca * cg - sa * sb * sg, -sa * cb, ca * sg + sa * sb * cg,
            sa * cg + ca * sb * sg, ca * cb, sa * sg - ca * sb * cg,
            -cb * sg, sb, cb * cg];
  }
  // how far the phone has turned from pose A to pose B, in its own frame: [about its width, about its height] (sines)
  function tiltTurn(A, B) {
    const d = (i, j) => A[i] * B[j] + A[i + 3] * B[j + 3] + A[i + 6] * B[j + 6];   // (Aᵀ·B)[i][j]
    return [(d(2, 1) - d(1, 2)) / 2, (d(0, 2) - d(2, 0)) / 2];
  }
  // "straight ahead" drifts slowly toward how the phone is being held, and stays a clean rotation
  function tiltFollow(A, B, k) {
    const m = A.map((v, i) => v + (B[i] - v) * k), u = m.slice(0, 3), n = Math.hypot(...u); u.forEach((v, i) => u[i] = v / n);
    const w = m.slice(3, 6), dot = w[0] * u[0] + w[1] * u[1] + w[2] * u[2]; w.forEach((v, i) => w[i] = v - dot * u[i]);
    const l = Math.hypot(...w); w.forEach((v, i) => w[i] = v / l);
    return [...u, ...w, u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]];
  }
  function onTilt(e) {
    if (e.gamma == null || e.beta == null) return;
    if (e.type === 'deviceorientation') tiltRel = true; else if (tiltRel) return;   // some Androids only send the "absolute" kind
    if (!tiltSeen) { tiltSeen = true; if (!tiltOff) setTilt(true); }                // the sensor is alive
    if (!tiltOn) return;
    const R = tiltR(e.alpha || 0, e.beta, e.gamma);
    let turn = tiltZero && tiltTurn(tiltZero, R);
    if (!turn || Math.abs(turn[0]) > .77 || Math.abs(turn[1]) > .77) { tiltZero = R.slice(); turn = [0, 0]; }   // past 50°: this is the new "straight ahead"
    tiltZero = tiltFollow(tiltZero, R, .0015);
    const a = ((screen.orientation && screen.orientation.angle) ?? window.orientation ?? 0) % 360;
    const side = a === 90 ? turn[0] : a === 270 || a === -90 ? -turn[0] : turn[1];    // about the screen's upright axis
    const nod = a === 90 ? -turn[1] : a === 270 || a === -90 ? turn[1] : turn[0];     // about the screen's level axis
    const nx = Math.max(-1, Math.min(1, side * 57.3 / 15)), ny = Math.max(-1, Math.min(1, nod * 57.3 / 15));
    // how far it moves is a share of what's on screen, so both directions read the same at any zoom
    const v = view(true), fx = S.zoomed ? .25 : .54, fy = S.zoomed ? .18 : .54;
    S.tiltT = [Math.max(-Math.max(0, v.cx - v.hx), Math.min(Math.max(0, 1 - v.cx - v.hx), nx * fx * 2 * v.hx)),
               Math.max(-Math.max(0, v.cy - v.hy), Math.min(Math.max(0, 1 - v.cy - v.hy), -ny * fy * 2 * v.hy))];
    S.mouseT = [nx * .5, ny * .5];
  }
  if (TOUCH && window.DeviceOrientationEvent) {
    document.body.classList.add('can-tilt');
    addEventListener('deviceorientation', onTilt);
    addEventListener('deviceorientationabsolute', onTilt);
    const askTilt = async () => {          // must start inside a touch or a click
      if (!TILT_ASK) return 'granted';
      try { return await DeviceOrientationEvent.requestPermission(); } catch (err) { return 'error'; }
    };
    const reportTilt = answer => {
      if (answer === 'denied') { sayThought('Motion is off. Reopen Safari, then tap Allow.', 9000); return; }
      setTimeout(() => {
        if (tiltOff) return;
        sayThought(tiltSeen ? 'Tilt the phone to look around.' : 'This browser sends no motion data.', 5000);
      }, 1200);
    };
    canvas.addEventListener('touchend', async () => {   // the first touch on the room
      if (!TILT_ASK || tiltSeen || tiltOff) return;
      if (await askTilt() === 'granted') reportTilt('granted');   // said no earlier: no nagging here, the Tilt button explains
    }, { once: true, passive: true });
    tiltBtn.addEventListener('click', async () => {
      if (tiltOn) { tiltOff = true; setTilt(false); return; }
      tiltOff = false;
      const answer = await askTilt();
      if (tiltSeen && answer !== 'denied') setTilt(true);
      reportTilt(answer);
    });
  }

  // live Barcelona clock (right edge)
  const fmt = tz => new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const fBcn = fmt('Europe/Madrid');
  const cBcn = document.getElementById('clockBcn');
  function tickClocks() { cBcn.textContent = 'BCN ' + fBcn.format(new Date()); }
  tickClocks(); setInterval(tickClocks, 1000);

  /* ---- character thoughts: soft swaps; when the player idles, nudge with hints ---- */
  const THOUGHTS = [
    'This room feels oddly familiar.',
    'Someone left the TV on.',
    'I wonder what\u2019s on tonight.',
    'The cat is watching me.',
    'Is that a Sega under the table?',
    'Maybe I should check the TV.',
    'Wait, what\u2019s that glowing screen?',
    'I could stay here all evening.',
    'One more look around, then the TV.',
  ];
  const HINTS = [1, 5, 6, 8];            // the ones that point at the TV
  const thoughtEl = document.getElementById('thought');
  let thoughtIdx = -1, lastActivity = performance.now();
  ['mousemove', 'keydown', 'wheel', 'touchstart', 'click'].forEach(ev => addEventListener(ev, () => { lastActivity = performance.now(); }, { passive: true }));
  function showThought(text) {
    thoughtEl.classList.remove('in');
    thoughtEl.classList.add('out');
    const n = thoughtEl.children.length;
    setTimeout(() => {
      thoughtEl.innerHTML = '';
      let word = null;                            // letters are kept together by word, so a line only breaks between words
      [...text].forEach((c, i) => {
        const sp = document.createElement('span'); sp.className = 'ch'; sp.textContent = c;
        sp.style.transitionDelay = (i * 9) + 'ms';
        if (c === ' ') { word = null; thoughtEl.appendChild(sp); return; }
        if (!word) { word = document.createElement('span'); word.style.display = 'inline-block'; thoughtEl.appendChild(word); }
        word.appendChild(sp);
      });
      thoughtEl.classList.remove('out');
      void thoughtEl.offsetWidth;
      thoughtEl.classList.add('in');
    }, n ? 220 : 0);
  }
  let thoughtTimer = 0;
  let thoughtSaid = '', thoughtSaidAt = 0;
  // the cursor has left the thing a hover thought was about: let it linger a moment, then the mind moves on
  function releaseThought(text) {
    if (!text || thoughtSaid !== text || performance.now() - thoughtSaidAt > 6000) return;   // still that thought on screen
    clearTimeout(thoughtTimer); thoughtSaid = '';
    thoughtTimer = setTimeout(nextThought, 1200);
  }
  function sayThought(text, hold) {           // a reaction: interrupts the idle loop
    thoughtSaid = text; thoughtSaidAt = performance.now();
    clearTimeout(thoughtTimer);
    if (thoughtEl.textContent !== text) showThought(text);
    thoughtTimer = setTimeout(nextThought, hold);
  }
  // once every memory is found, the character's mind moves on
  const FINAL_THOUGHTS = [
    'Phew. I think I\u2019ve seen everything here.',
    'Every corner checked. I feel like I know this guy now.',
    'The coffee went cold while I was looking around.',
    'Nothing left to find. Except maybe a good collaborator.',
    'Funny how a room can say more than a CV.',
    'Okay, I\u2019ve seen enough. Time to write to him?',
    'Same time next project?',
  ];
  let finalIdx = -1;
  function nextThought() {
    if (!S.zoomed && explored.size === ITEMS.length && !lettersDone()) {   // all seen, but letters slipped past
      const nag = ['I\u2019ve seen everything\u2026 but a few letters slipped past me.', 'Some of those notes had circled letters. Memories might remember.'];
      showThought(nag[(finalIdx = (finalIdx + 1) % 2)]);
      thoughtTimer = setTimeout(nextThought, 6500);
      return;
    }
    if (!S.zoomed && explored.size === ITEMS.length) {
      finalIdx = (finalIdx + 1) % FINAL_THOUGHTS.length;
      showThought(FINAL_THOUGHTS[finalIdx]);
      thoughtTimer = setTimeout(nextThought, 6500);
      return;
    }
    if (!S.zoomed) {
      const idle = performance.now() - lastActivity > 12000;
      let i;
      if (idle) { do { i = HINTS[(Math.random() * HINTS.length) | 0]; } while (i === thoughtIdx); }
      else i = (thoughtIdx + 1) % THOUGHTS.length;
      thoughtIdx = i;
      showThought(THOUGHTS[i]);
    }
    thoughtTimer = setTimeout(nextThought, 6500);
  }

  const screenRect = [SCR.x0 / IMG_W, SCR.y0 / IMG_H, SCR.x1 / IMG_W, SCR.y1 / IMG_H];

  let camTagP = null;
  function frame(now) {
    const t = now / 1000;
    if (S.tv) S.zoomTo = zoomIn(); else if (S.zoomed) S.zoomTo = ROOM_ZOOM(); // follow window resizes
    const zp = Math.min(1, (now - S.zT0) / S.zDur);
    S.zoom = S.zoomFrom + (S.zoomTo - S.zoomFrom) * ease(zp);
    if (S.fcTo) { const k = ease(zp); S.fc = [S.fcFrom[0] + (S.fcTo[0] - S.fcFrom[0]) * k, S.fcFrom[1] + (S.fcTo[1] - S.fcFrom[1]) * k]; }
    const travel = Math.sin(zp * Math.PI) * (S.zoomTo !== S.zoomFrom ? 1 : 0);
    S.dist = BASE_DIST + travel * .22 + (S.zoom - 1) * .06;

    // phones have no hover: while the camera is on, the round "stop recording" badge waits in the corner of the glass
    if (TOUCH && VP.on && VP.cam && VP.close && document.body.classList.contains('vcr-play')) {
      camTagP = imageToScreen(SCR.x1 - 42, SCR.y1 - 42, camTagP);
      tagPos.x = tagPos.tx = camTagP[0] * innerWidth; tagPos.y = tagPos.ty = camTagP[1] * innerHeight;
      if (!tag.classList.contains('cam')) { tagText.innerHTML = 'Stop<br>recording'; tag.classList.add('cam', 'show'); }
    } else if (tag.classList.contains('cam')) { tag.classList.remove('cam', 'show'); camTagP = null; }
    tagPos.x += (tagPos.tx - tagPos.x) * .18; tagPos.y += (tagPos.ty - tagPos.y) * .18;
    tag.style.transform = `translate(${tagPos.x}px, ${tagPos.y}px)`;
    const panK = TOUCH ? .22 : .08;              // under a finger the room has to keep up
    S.pan[0] += (S.panT[0] - S.pan[0]) * panK;
    S.pan[1] += (S.panT[1] - S.pan[1]) * panK;
    // tilt works zoomed in too; it settles while a tape is playing and holds still under a note or the tape shelf
    if (VP.on) { S.tilt[0] *= .9; S.tilt[1] *= .9; }
    else if (!document.body.classList.contains('note')) {
      S.tilt[0] += (S.tiltT[0] - S.tilt[0]) * .1;
      S.tilt[1] += (S.tiltT[1] - S.tilt[1]) * .1;
    }
    const lerp = S.zoomed ? .03 : .05;
    const amp = S.zoomed ? .35 : 1; // calmer camera while browsing
    const drift = [Math.sin(t * .23) * .12, Math.cos(t * .17) * .08];
    // zoomed in with the cursor on the TV glass: the camera holds still so the sites can be read
    const holdStill = S.zoomed && (G.hoverT > 0 || S.onSet || tapeLayer.classList.contains('open') || tapeLayer.classList.contains('closing'));   // the tape is out: the room keeps still
    if (S.tv) {   // up close at the TV the camera keeps still: no look-around with the cursor, no idle drift (only a deliberate pan moves it)
      S.mouse[0] += (0 - S.mouse[0]) * .06;
      S.mouse[1] += (0 - S.mouse[1]) * .06;
    } else if (!holdStill) {
      S.mouse[0] += ((S.mouseT[0] * amp) + drift[0] - S.mouse[0]) * lerp;
      S.mouse[1] += ((S.mouseT[1] * amp) + drift[1] - S.mouse[1]) * lerp;
    }
    S.reveal = S.started ? Math.min(1, (now - S.revealT0) / 1400) : 0;

    // ---- gallery transition ----
    let rollV = 0, glitch = 0;
    if (G.active) {
      const p = Math.min(1, (now - G.t0) / G.dur);
      // vertical hold catching the frame: overshoot, then settle
      rollV = 1 - Math.exp(-6 * p) * Math.cos(9 * p);
      glitch = Math.pow(Math.sin(Math.PI * Math.min(1, p * 1.1)), .6);
      if (p >= 1) { G.active = false; G.cur = G.next; G.fromBlank = 0; rollV = 0; G.burst = .5; if (G.tape) { VP.shown = G.tape > 0; G.tape = 0; } }
    }
    // random little tape hiccups while idle
    if (!G.active && G.on > .5 && Math.random() < .004) G.burst = .35 + Math.random() * .4;
    G.burst *= .92;
    glitch = Math.max(glitch, G.burst * .6);
    G.on += (G.onT - G.on) * (G.onT ? .12 : .08);
    G.hover += (G.hoverT - G.hover) * .15;

    const v = view();
    tickVideos(); tvTipTick();
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, roomTex);
    const texA = VP.shown ? VP.tex : projTex[G.cur];
    const texB = G.active ? (G.tape > 0 ? VP.tex : G.tape < 0 ? projTex[G.cur] : projTex[G.next]) : texA;
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, texA);
    gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, texB);
    gl.uniform1i(U.uTex, 0); gl.uniform1i(U.uTexA, 1); gl.uniform1i(U.uTexB, 2);
    gl.uniform2f(U.uRes, canvas.width, canvas.height);
    gl.uniform2f(U.uScale, v.hx, v.hy);
    gl.uniform2f(U.uCenter, v.cx, v.cy);
    gl.uniform2f(U.uMouse, S.mouse[0], S.mouse[1]);
    gl.uniform2f(U.uLook, ...look());
    gl.uniform2f(U.uTan, TAN_X, TAN_Y);
    gl.uniform1f(U.uDist, S.dist);
    gl.uniform1f(U.uTime, t);
    gl.uniform1f(U.uReveal, S.reveal);
    gl.uniform1f(U.uZoomT, S.tvFx ? (S.zoom - 1) / (zoomIn() - 1) : 0);
    gl.uniform4f(U.uScreen, ...screenRect);
    gl.uniform2f(U.uScreenPx, SCR.x1 - SCR.x0, SCR.y1 - SCR.y0);
    gl.uniform1f(U.uScreenOn, G.on);
    gl.uniform1f(U.uRoll, rollV);
    gl.uniform1f(U.uDir, G.dir);
    gl.uniform1f(U.uGlitch, glitch);
    gl.uniform1f(U.uFromBlank, G.fromBlank);
    gl.uniform1f(U.uHover, G.hover);
    hiAmt += ((hovered ? 1 : 0) - hiAmt) * .12;
    if (hovered) hiRect = [hovered.r[0] / IMG_W, hovered.r[1] / IMG_H, hovered.r[2] / IMG_W, hovered.r[3] / IMG_H];
    gl.uniform4f(U.uHi, ...hiRect);
    gl.uniform1f(U.uHiAmt, hiAmt);
    // lamp: eases on/off; switching on stutters for a moment like a real bulb
    const lampTarget = now < lamp.flickerUntil ? (Math.random() < .55 ? 1 : .12) : (lamp.on ? 1 : 0);
    lamp.v += (lampTarget - lamp.v) * (now < lamp.flickerUntil ? .7 : .14);
    gl.uniform1f(U.uLamp, lamp.v);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(frame);
  }

  async function startScene(tuned) {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, roomTex);
    try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img); }
    catch (e) { console.error('Scene texture failed:', e); }
    S.started = true; S.revealT0 = performance.now() - (tuned ? 1400 : 0);   // tuned in: the picture is already there
    if (!tuned) Sound.blip();
    requestAnimationFrame(frame);
    setTimeout(() => document.body.classList.add('ready'), tuned ? 60 : 900);   // tuned in: the interface comes on with the picture
    restoreMemories();
    thoughtTimer = setTimeout(TOUCH ? () => sayThought('Drag to look. Tap to explore.', 7000) : nextThought, 1800);
    try { await Promise.all(['46px VT323', '700 84px "Space Grotesk"', '400 20px "Space Grotesk"'].map(f => document.fonts.load(f))); } catch (e) {}
    // opened by double click (file://): browsers won't let WebGL read local files, so load the embedded copies
    if (location.protocol === 'file:' && !window.PROJECT_DATA) {
      await new Promise(res => { const sc = document.createElement('script'); sc.src = 'projects-data.js'; sc.onload = sc.onerror = res; document.head.appendChild(sc); });
    }
    prepareProjects();
  }

  /* ================= SOUND (procedural, Web Audio) ================= */
  const Sound = (() => {
    let ctx, master, on = false;
    const btn = document.getElementById('sound');
    function build() {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
      const len = ctx.sampleRate * 4, nb = ctx.createBuffer(1, len, ctx.sampleRate), d = nb.getChannelData(0);
      let last = 0; for (let i = 0; i < len; i++) { last = (last + .02 * (Math.random() * 2 - 1)) / 1.02; d[i] = last * 3.5; }
      const room = ctx.createBufferSource(); room.buffer = nb; room.loop = true;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900;
      const rg = ctx.createGain(); rg.gain.value = .35;
      room.connect(lp).connect(rg).connect(master); room.start();
      const hb = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate), hd = hb.getChannelData(0);
      for (let i = 0; i < hd.length; i++) hd[i] = Math.random() * 2 - 1;
      const hiss = ctx.createBufferSource(); hiss.buffer = hb; hiss.loop = true;
      const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 5000;
      const hg = ctx.createGain(); hg.gain.value = .012;
      hiss.connect(hp).connect(hg).connect(master); hiss.start();
      [50, 100, 150].forEach((f, i) => {
        const o = ctx.createOscillator(); o.frequency.value = f;
        const g = ctx.createGain(); g.gain.value = [.02, .01, .005][i];
        o.connect(g).connect(master); o.start();
      });
    }
    // background music: a plain <audio> element (works from disk too), faded in/out by hand
    const music = new Audio(ASSET('music.mp3'));
    music.loop = true; music.preload = 'auto'; music.volume = 0;
    const MUSIC_VOL = .55;
    let fadeRaf = 0;
    function fadeMusic(to, ms = 1200) {
      cancelAnimationFrame(fadeRaf);
      const from = music.volume, t0 = performance.now();
      if (to > 0 && music.paused) music.play().catch(() => {});
      const step = now => {
        const k = Math.min(1, (now - t0) / ms);
        music.volume = from + (to - from) * k;
        if (k < 1) fadeRaf = requestAnimationFrame(step);
        else if (to === 0) music.pause();
      };
      fadeRaf = requestAnimationFrame(step);
    }
    // the TV's VOLUME buttons: 0..10, 6 is the normal level
    let level = 6;
    const vf = () => level / 6;
    // recorded sounds (files in the project folder): plain audio elements, so they also play when opened from disk
    const SAMPLES = {};
    const loadSample = f => SAMPLES[f] || (SAMPLES[f] = Object.assign(new Audio(ASSET(f)), { preload: 'auto' }));
    ['light-switch.mp3', 'newspaper.mp3'].forEach(loadSample);
    function sample(f, gain = 1, rate = 1) {
      if (!on) return;
      const a = loadSample(f).cloneNode();
      a.volume = Math.max(0, Math.min(1, gain * vf()));
      if (rate !== 1) { a.preservesPitch = false; a.playbackRate = rate; }
      a.play().catch(() => {});
    }
    function set(v) {
      on = v;
      if (on && level === 0) level = 3;
      fadeMusic(on ? MUSIC_VOL * vf() : 0, on ? 1800 : 700);
      if (on && !ctx) build();
      if (ctx && ctx.state === 'suspended') ctx.resume();
      if (ctx) master.gain.setTargetAtTime(on ? .9 * vf() : 0, ctx.currentTime, .35);
      btn.classList.toggle('on', on);
      btn.setAttribute('aria-pressed', on);
      btn.querySelector('.lbl').textContent = on ? 'Sound on' : 'Sound off';
    }
    btn.addEventListener('click', () => set(!on));
    function volume(d) {   // returns the new level (0 = muted)
      if (!on) { if (d > 0) { level = Math.max(level, 1); set(true); } return on ? level : 0; }
      level = Math.max(0, Math.min(10, level + d));
      if (level === 0) { set(false); return 0; }
      fadeMusic(MUSIC_VOL * vf(), 250);
      if (ctx) master.gain.setTargetAtTime(.9 * vf(), ctx.currentTime, .08);
      return level;
    }
    const FX = 1.7;   // sound effects sit a little above the music
    function noiseBurst(dur, f0, f1, gain, q = 1.2) {
      if (!on || !ctx) return;
      gain *= FX;
      const b = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate), d = b.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      const s = ctx.createBufferSource(); s.buffer = b;
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = q;
      f.frequency.setValueAtTime(f0, ctx.currentTime); f.frequency.exponentialRampToValueAtTime(f1, ctx.currentTime + dur);
      const g = ctx.createGain(); g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(gain, ctx.currentTime + dur * .25);
      g.gain.linearRampToValueAtTime(0, ctx.currentTime + dur);
      s.connect(f).connect(g).connect(master); s.start();
    }
    function clunk() {
      if (!on || !ctx) return;
      const o = ctx.createOscillator(); o.type = 'square';
      o.frequency.setValueAtTime(140, ctx.currentTime); o.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + .12);
      const g = ctx.createGain(); g.gain.setValueAtTime(.12, ctx.currentTime); g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .15);
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 600;
      o.connect(lp).connect(g).connect(master); o.start(); o.stop(ctx.currentTime + .16);
    }
    // a soft tone (pager beeps): filtered so it's never shrill
    function tone(freq, dur, gain = .05, type = 'square', delay = 0) {
      if (!on || !ctx) return;
      gain *= FX;
      const t = ctx.currentTime + delay, o = ctx.createOscillator(), g = ctx.createGain(), lp = ctx.createBiquadFilter();
      o.type = type; o.frequency.value = freq; lp.type = 'lowpass'; lp.frequency.value = 2600;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + .008); g.gain.setValueAtTime(gain, t + dur - .02); g.gain.linearRampToValueAtTime(0, t + dur);
      o.connect(lp).connect(g).connect(master); o.start(t); o.stop(t + dur + .02);
    }
    // the pager's vibration motor: a low, wobbling hum in two pulses (matches the shake)
    function buzz() {
      if (!on || !ctx) return;
      [0, .5].forEach(d => {
        const t = ctx.currentTime + d, o = ctx.createOscillator(), lfo = ctx.createOscillator(), lg = ctx.createGain(), g = ctx.createGain(), lp = ctx.createBiquadFilter();
        o.type = 'sawtooth'; o.frequency.value = 92; lfo.frequency.value = 23; lg.gain.value = 9;
        lfo.connect(lg).connect(o.frequency);
        lp.type = 'lowpass'; lp.frequency.value = 320;
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.09, t + .04); g.gain.setValueAtTime(.09, t + .3); g.gain.linearRampToValueAtTime(0, t + .38);
        o.connect(lp).connect(g).connect(master); o.start(t); lfo.start(t); o.stop(t + .4); lfo.stop(t + .4);
      });
    }
    // paper crinkling for `dur` seconds: crackly noise whose loudness follows the unfold's speed
    // (an ease-in-out: quiet start, loudest in the middle, settling to silence as the sheet comes to rest)
    function crinkle(dur, gain, shape = 'inout') {
      if (!on || !ctx) return;
      const sr = ctx.sampleRate, n = Math.round(sr * dur), b = ctx.createBuffer(1, n, sr), d = b.getChannelData(0);
      let amp = 0, hold = 0;
      for (let i = 0; i < n; i++) {
        if (--hold <= 0) { amp = Math.random() < .35 ? .25 + Math.random() * .75 : Math.random() * .25; hold = (sr * (.006 + Math.random() * .03)) | 0; }   // crackles
        const t = i / n, env = shape === 'out' ? Math.min(1, t / .06) * Math.pow(1 - t, 1.6)   // crumpling: fast, then slowing
                                               : Math.pow(Math.sin(Math.PI * t), 1.4);           // unfolding: follows its ease-in-out
        d[i] = (Math.random() * 2 - 1) * amp * env;
      }
      const src = ctx.createBufferSource(), bp = ctx.createBiquadFilter(), g = ctx.createGain(), t0 = ctx.currentTime;
      src.buffer = b; bp.type = 'bandpass'; bp.Q.value = .9;
      bp.frequency.setValueAtTime(2400, t0); bp.frequency.linearRampToValueAtTime(4200, t0 + dur * .5); bp.frequency.linearRampToValueAtTime(3000, t0 + dur);
      g.gain.value = gain * FX;
      src.connect(bp).connect(g).connect(master); src.start(t0);
    }
    // a short broadband snap (switches, the flash's pop): noise with a fast exponential decay
    function snap(gain) {
      if (!on || !ctx) return;
      const n = Math.round(ctx.sampleRate * .04), b = ctx.createBuffer(1, n, ctx.sampleRate), d = b.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (n * .12));
      const s = ctx.createBufferSource(), hp = ctx.createBiquadFilter(), g = ctx.createGain();
      s.buffer = b; hp.type = 'highpass'; hp.frequency.value = 900; g.gain.value = gain * FX;
      s.connect(hp).connect(g).connect(master); s.start();
    }
    // a tiny plastic key click
    function key() {
      if (!on || !ctx) return;
      noiseBurst(.025, 5200, 3800, .07, 5);
      tone(1800, .012, .015, 'square');
    }
    return {
      isOn: () => on,
      duck: d => fadeMusic(d || !on ? 0 : MUSIC_VOL * vf(), d ? 500 : 1200),   // room music out of the way of a video
      whoosh: inward => noiseBurst(2.2, inward ? 300 : 1800, inward ? 1800 : 300, .25),
      swish: inward => noiseBurst(.35, inward ? 900 : 2600, inward ? 2600 : 900, .1, 1.4),   // something small flying in / out
      beep: () => { tone(2350, .07, .035); tone(2350, .07, .035, 'square', .13); },              // pager: bee-beep
      confirm: () => { tone(1760, .05, .03, 'square'); tone(2640, .07, .03, 'square', .07); }, // copied ✓
      buzz, key,
      lamp: () => sample('light-switch.mp3', .9),                                           // the lamp's switch (recorded)
      blip: () => noiseBurst(.25, 6000, 2000, .15),
      tick: () => noiseBurst(.03, 4000, 3000, .04, 4),
      volume,
      rustle: () => noiseBurst(.24, 3400, 2300, .26, 1.8),   // one single "pshuk" of cardboard
      slide: () => noiseBurst(.42, 900, 1700, .16, 1.1),   // a cassette sliding in / out of its sleeve
      load: () => { clunk(); noiseBurst(.14, 700, 220, .24, .8); tone(92, .55, .028, 'sawtooth', .14); tone(138, .3, .012, 'sawtooth', .5); },   // the VCR takes the tape: clunk, then its motor
      eject: () => { snap(.3); noiseBurst(.32, 1600, 600, .14, 1); tone(110, .25, .02, 'sawtooth'); },   // the VCR pushing the tape out
      unfold: () => sample('newspaper.mp3', .8, .85),        // a sheet opening out (recorded paper, a touch slower to fit the unfold)
      crumple: () => crinkle(.45, .32, 'out'),                // ...and balled up again, as long as the crumple
      shutter: () => { snap(.42); setTimeout(() => snap(.26), 45); },   // a camera's click-clack
      paper: () => { noiseBurst(.18, 3000, 5200, .24, 2); setTimeout(() => noiseBurst(.22, 4200, 2600, .2, 2), 420); setTimeout(() => noiseBurst(.16, 3600, 5000, .16, 2), 860); },
      tape: () => { clunk(); noiseBurst(1.1, 3500, 500, .22, 3); setTimeout(() => noiseBurst(.4, 900, 2600, .1, 6), 350); },
    };
  })();
})();
