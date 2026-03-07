// --- Typewriter effect for hero h1 ---
(function () {
  const el = document.getElementById('hero-title');
  if (!el) return;

  // Segments: text + optional Tailwind class for colour
  const segments = [
    { text: 'BEERJS ',   cls: '' },
    { text: 'SANTIAGO', cls: 'text-hacker-green' },
  ];

  const totalChars = segments.reduce((n, s) => n + (s.text ? s.text.length : 0), 0);
  const duration   = 1300; // ms
  const delay      = duration / totalChars;

  // Build cursor span
  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.textContent = '|';

  // Clear original content and start empty
  el.innerHTML = '';
  el.appendChild(cursor);

  let segIdx = 0;
  let charIdx = 0;

  function typeNext() {
    if (segIdx >= segments.length) {
      // Typing done – keep cursor blinking indefinitely
      return;
    }

    const seg = segments[segIdx];

    if (seg.br) {
      // Insert line-break segment immediately
      const br = document.createElement('br');
      el.insertBefore(br, cursor);
      segIdx++;
      typeNext();
      return;
    }

    if (charIdx === 0) {
      // Create the span for this segment on first char
      seg._span = document.createElement('span');
      if (seg.cls) seg._span.className = seg.cls;
      el.insertBefore(seg._span, cursor);
    }

    seg._span.textContent += seg.text[charIdx];
    charIdx++;

    if (charIdx >= seg.text.length) {
      segIdx++;
      charIdx = 0;
    }

    setTimeout(typeNext, delay);
  }

  typeNext();
}());

// --- Newsletter form ---
const form = document.getElementById('newsletter-form');
const successMsg = document.getElementById('newsletter-success');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
    });

    if (res.ok) {
      form.classList.add('hidden');
      successMsg.classList.remove('hidden');
    } else {
      console.error('Form submission failed', res.status);
    }
  } catch (err) {
    console.error('Network error', err);
  }
});

// fancy console.log
console.log('%c  _______  _______  _______  ______        ___  _______        _______  ___      \r\n |  _    ||       ||       ||    _ |      |   ||       |      |       ||   |     \r\n | |_|   ||    ___||    ___||   | ||      |   ||  _____|      |       ||   |     \r\n |       ||   |___ |   |___ |   |_||_     |   || |_____       |       ||   |     \r\n |  _   | |    ___||    ___||    __  | ___|   ||_____  | ___  |      _||   |___  \r\n | |_|   ||   |___ |   |___ |   |  | ||       | _____| ||   | |     |_ |       | \r\n |_______||_______||_______||___|  |_||_______||_______||___| |_______||_______| \r\n                                                                                 ', 'background: #222; color: #ffCC00')
console.log('%c Compartiendo sobre JS, en un bar cercano ', 'background: #222; color: #ffCC00');
console.log('%c salud@beerjs.cl ', 'background: #222; color: #ffCC00');

// analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-62394125-1', 'auto');
ga('send', 'pageview');

// bubbles: https://codepen.io/w-chenamg/pen/bGZPdgb
const pi2 = 2 * Math.PI;
const MIN_CPU_BUBBLES = 50; // Minimum number of bubbles (for the worst of computers)
const MAX_CPU_BUBBLES = 200; // Maximum number of bubbles (for the best of computers)
const CPU_CORES_BUBBLES = 4; // CPU logical cores count required for maximum bubbles
const CPU_BUBBLES_RATIO = CPU_CORES_BUBBLES / MAX_CPU_BUBBLES;
const MAX_BUBBLES = Math.min((window.navigator.hardwareConcurrency / CPU_BUBBLES_RATIO) * (MAX_CPU_BUBBLES - MIN_CPU_BUBBLES) + MIN_CPU_BUBBLES, MAX_CPU_BUBBLES);
const MIN_BUBBLE_SIZE = 5;
const MAX_BUBBLE_SIZE = 10;

// The minimum lifetime of a bubble divided by the canvas height (px) you are testing on
// This keeps the velocity of bubbles proportional to the canvas height, i.e. height ambiguous
const LIFETIME_HEIGHT_RATIO = 5000 / 300;

class Bubble {
	static random(min, max) {
		return Math.floor(
			Math.random() * (Math.round(max) - Math.round(min) + 1) + Math.round(min)
		);
	}

	static easeInSine(f) {
		return 1 - Math.cos((f * Math.PI) / 2);
	}

	static easeInOutSine(f) {
		return -(Math.cos(Math.PI * f) - 1) / 2;
	}

	static getLifeTime(height) {
		return Bubble.random(
			height * LIFETIME_HEIGHT_RATIO,
			height * LIFETIME_HEIGHT_RATIO * 2
		);
	}

	static getSize() {
		return Bubble.random(MIN_BUBBLE_SIZE, MAX_BUBBLE_SIZE);
	}

	static getAlpha() {
		return Bubble.random(20, 70) / 100;
	}

	static getPos(width, height, size) {
		return { x: Bubble.random(0, width), y: size * 2 };
	}

	static getWobbleCoefficient() {
		return Bubble.random(-100, 100) / 10;
	}

	constructor(lifeStart, bubbles) {
		this.bubbles = bubbles;
		this.canvas = this.bubbles.canvas;
		this.ctx = this.bubbles.ctx;

		this.alpha = Bubble.getAlpha();
		this.size = Bubble.getSize();
		this.pos = Bubble.getPos(this.bubbles.width, this.bubbles.height, this.size);
		this.wobbleCoefficient = Bubble.getWobbleCoefficient();

		this.lifeStart = lifeStart;
		this.lifeTime = Bubble.getLifeTime(this.bubbles.height);
		if (this.bubbles.firstSpawn) {
			this.lifeStart -= this.lifeTime * (Bubble.random(0, 100) / 100);
		}
	}

	getTimeFrac(timeStamp) {
		return (timeStamp - this.lifeStart) / this.lifeTime;
	}

	getWobble(timeFrac) {
		return this.size * Math.sin(timeFrac * pi2) * this.wobbleCoefficient;
	}

	draw(timeFrac) {
		let riseHeight = this.bubbles.height + this.size / 2 + this.pos.y;
		let x = this.pos.x + this.getWobble(timeFrac);
		let y = this.bubbles.height + this.pos.y - Bubble.easeInSine(timeFrac) * riseHeight;
		let floorDist = Math.min(Math.max((this.bubbles.height - y) / (this.bubbles.height * 0.1), 0), 1);

		this.ctx.beginPath();
		this.ctx.arc(x, y, this.size / 2, 0, pi2);
		this.ctx.fillStyle = "rgba(255, 255, 255, " + this.alpha * floorDist + ")";
		this.ctx.fill();
	}
}

class Bubbles {
	static forEach(canvases) {
		let bubbles = [];
		for (let i = 0; i < canvases.length; i++)
			bubbles.push(new Bubbles(canvases[i]));
		return bubbles;
	}

	static isVisible() {
		if ("visibilityState" in document)
			return document.visibilityState !== "hidden";
		if ("hidden" in document) return !document.hidden;
		return true;
	}

	constructor(canvas) {
		this.firstSpawn = true;
		this.bubbles = [];

		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");

		this.requestAnimationFrame();

		document.addEventListener(
			typeof document.msHidden !== "undefined"
				? "msvisibilitychange"
				: typeof document.webkitHidden !== "undefined"
				? "webkitvisibilitychange"
				: "visibilitychange",
			this.documentVisibilityChange.bind(this),
			false
		);
	}

	requestAnimationFrame() {
		requestAnimationFrame(this.draw.bind(this));
	}

	documentVisibilityChange() {
		if (this.firstSpawn) return;
		this.firstSpawn = true;
		this.bubbles = [];
	}

	calcCanvasSize() {
		const { width, height } = this.canvas.getBoundingClientRect();
		if (this.width !== width || this.height !== height) {
			const scale = window.devicePixelRatio;
			const scaledWidth = Math.floor(width * scale);
			const scaledHeight = Math.floor(height * scale);

			this.canvas.width = scaledWidth;
			this.canvas.height = scaledHeight;
			this.ctx.scale(scale, scale);

			if (this.width !== undefined && this.height !== undefined && (width > this.width || height > this.height)) {
				if (this.sizeChangeTimeout !== undefined) clearTimeout(this.sizeChangeTimeout);
				this.sizeChangeTimeout = window.setTimeout(this.documentVisibilityChange.bind(this), 250);
			}
		}
		this.width = width;
		this.height = height;
	}

	spawnBubble(timeStamp) {
		this.bubbles.push(new Bubble(timeStamp, this));
	}

	spawnBubbles(timeStamp) {
		while (this.bubbles.length < Math.ceil(MAX_BUBBLES / 2)) {
			this.spawnBubble(timeStamp);
		}
	}

	drawBubbles(timeStamp) {
		let i = 0;
		while (i < this.bubbles.length) {
			let bubble = this.bubbles[i];
			let timeFrac = bubble.getTimeFrac(timeStamp);
			if (timeFrac >= 1) {
				this.bubbles.splice(i, 1);
				continue;
			} else if (timeFrac >= 0.5 && !bubble.nextSpawned) {
				bubble.nextSpawned = true;
				this.spawnBubble(timeStamp);
			}

			bubble.draw(timeFrac);
			i++;
		}
	}

	draw(timeStamp) {
		this.calcCanvasSize();
		this.ctx.clearRect(0, 0, this.width, this.height);

		this.spawnBubbles(timeStamp);
		this.drawBubbles(timeStamp);
		this.firstSpawn = false;

		this.requestAnimationFrame();
	}
}

Bubbles.forEach(document.getElementsByClassName("bubbles"));
