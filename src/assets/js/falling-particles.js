class FallingParticles extends HTMLElement {
	static tagName = "falling-particles";

	static attrs = {
		autostart: "autostart",
		birthRate: "rate",
		colors: "colors",
		shapes: "shapes",
		speed: "speed",
		duration: "duration"
	};

	// language=CSS
	static style = `
      :host {
          display: block;
          position: fixed;
          inset: 0;
          pointer-events: none;
      }

      .particles {
          position: relative;
          width: 100%;
          height: 100%;
          perspective: 500px;
      }

      .particle {
          --_full-rotation: var(--_rotation-xyz) var(--_rotation-deg);
          --_particle-size: calc(var(--particle-size, 20px) * var(--_scale));
          height: var(--_particle-size);
          width: var(--_particle-size);
          translate: var(--_translate-x) -50px 0;
          rotate: var(--_full-rotation);
          animation:
                  rotate calc(var(--_rotation-speed) * 1s) linear infinite,
                  translate calc(var(--_fall-speed) * 1s) cubic-bezier(0, 0.19, 0.3, 0.45);
          position: absolute;
          color: var(--_color);
          font-size: calc(var(--_particle-size) + 10px);
          font-weight: 900;
          line-height: 0.8;
          user-select: none;
          will-change: translate, rotate;
          transform-style: preserve-3d;
          isolation: isolate;
      }

      .square {
          background-color: var(--_color);
          scale: 0.8;
      }

      @media (prefers-reduced-motion: reduce) {
          .particle {
              animation: none;
          }
      }

      @keyframes rotate {
          0% {
              rotate: var(--_full-rotation);
          }

          100% {
              rotate: var(--_rotation-xyz) calc(var(--_rotation-deg) + 360deg);
          }
      }

      @keyframes translate {
          0% {
              translate: var(--_translate-x) -50px;
          }
          100% {
              translate: calc(var(--_translate-x) + var(--_x-drift)) calc(100vh + 150px);
          }
      }`

	birthRate = 8;
	speed = 5;
	shapes = [];
	colors = [];
	defaultDuration;

	particleMap = new Map();
	particlePool = [];
	maxPoolSize = 100;
	outstandingParticles = 0;

	inBurstMode = false;
	burstTimeout;
	rid;
	lastUpdated;

	connectedCallback() {
		this.speed = Number(this.getAttribute(FallingParticles.attrs.speed)) || 5;
		this.birthRate = Number(this.getAttribute(FallingParticles.attrs.birthRate)) || 16;
		this.shapes = this.getAttribute(FallingParticles.attrs.shapes)?.split(",") || [];
		this.colors = this.getAttribute(FallingParticles.attrs.colors)?.split(",") || [];
		this.defaultDuration = this.getAttribute(FallingParticles.attrs.duration);

		const shadowRoot = this.attachShadow({ mode: "open" });

		let sheet = new CSSStyleSheet();
		sheet.replaceSync(FallingParticles.style);
		shadowRoot.adoptedStyleSheets = [sheet];

		let template = document.createElement("template");

		// language=HTML
		template.innerHTML = `<div class="particles" aria-hidden="true"></div>`;

		shadowRoot.appendChild(template.content.cloneNode(true));

		this.particlesContainer = this.shadowRoot.querySelector(".particles");

		this._boundVisibilityChange = this._visibilityChange.bind(this);
		this._boundCreateParticles = this._createParticles.bind(this);

		if (this.getAttribute(FallingParticles.attrs.autostart) !== "false") {
			this.start();
		}

		this.cleanupObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
					if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
						const particleId = entry.target.id;
						const particleData = this.particleMap.get(particleId);

						if (particleData) {
							this._returnParticleToPool(entry.target);
							this.particleMap.delete(particleId);
						}
					}
				});
			},
			{
				root: null,
				rootMargin: '100px'
			}
		);

		document.addEventListener("visibilitychange", this._boundVisibilityChange);
	}

	disconnectedCallback() {
		document.removeEventListener("visibilitychange", this._boundVisibilityChange);
		this.cleanupObserver?.disconnect();
		this.stop();
	}

	start(forDuration) {
		if (this.rid) { return }

		this.lastUpdated = performance.now();
		this.rid = requestAnimationFrame(this._boundCreateParticles);

		if (forDuration || this.defaultDuration) {
			setTimeout(() => this.stop(), forDuration || this.defaultDuration);
		}
	}

	stop() {
		if (this.rid) {
			cancelAnimationFrame(this.rid);
			this.rid = null;
		}
	}

	burst() {
		const shouldStartAndStop = !this.rid;
		if (shouldStartAndStop) {
			this.start();
		}
		this.inBurstMode = true;
		if (this.burstTimeout) {
			clearTimeout(this.burstTimeout);
		}
		this.burstTimeout = window.setTimeout(() => {
			this.inBurstMode = false;
			if (shouldStartAndStop) {
				this.stop();
			}
		}, 200);
	}

	_createParticles() {
		const currentTime = performance.now();
		const delta = currentTime - this.lastUpdated;

		if (delta < 16) {
			this.rid = requestAnimationFrame(this._boundCreateParticles);
			return;
		}

		this.lastUpdated = currentTime;
		let birthRateModifier = this.inBurstMode ? 10 : this.particleMap.size < 30 ? 2 : 1;
		this.outstandingParticles += (this.birthRate * delta * birthRateModifier) / 1000;

		if (this.outstandingParticles >= 1) {
			const particlesToCreate = Math.floor(this.outstandingParticles);
			const fragment = document.createDocumentFragment();

			for (let i = 0; i < particlesToCreate; i++) {
				const p = this._createParticle(this.inBurstMode);
				this.particleMap.set(p.id, p);

				this._attachParticle(p, fragment);
			}

			this.particlesContainer.appendChild(fragment);
			this.outstandingParticles -= Math.floor(particlesToCreate);
		}

		this.rid = requestAnimationFrame(this._boundCreateParticles);
	}

	_createParticle(burst) {
		const x = burst ? randomBetween(40, 60) : randomBetween(0, 100)
		const birthTime = performance.now();
		return {
			type: this._getRandomShape(),
			id: generateId(birthTime),
			birthTime,
			rotX: randomBetween(0, 1),
			rotY: randomBetween(0, 1),
			rotZ: randomBetween(0, 1),
			rotDeg: randomBetween(0, 360),
			rotSpeed: randomBetween(1, 3),
			fallSpeed: burst ? randomBetween(2, 4) : randomBetween(this.speed - 2, this.speed),
			x,
			xDrift: burst ? (x - 50) * 2 : randomBetween(-5, 5),
			color: this._getRandomColor(),
			scale: randomBetween(0.8, 1.2)
		}
	}

	_getRandomShape() {
		return this.shapes[Math.floor(Math.random() * this.shapes.length)];
	}

	_getRandomColor() {
		return this.colors[Math.floor(Math.random() * this.colors.length)];
	}

	_getParticleFromPool() {
		if (this.particlePool.length > 0) {
			const particle = this.particlePool.pop();
			particle.style.display = 'block';
			return particle;
		}

		const particle = document.createElement("div");
		particle.classList.add("particle");
		return particle;
	}

	_returnParticleToPool(particleElement) {
		this.cleanupObserver.unobserve(particleElement);

		if (this.particlePool.length < this.maxPoolSize) {
			particleElement.style.display = 'none';
			particleElement.textContent = '';
			particleElement.classList.remove('square');
			this.particlePool.push(particleElement);
		} else {
			particleElement.remove();
		}
	}

	_attachParticle(p, container) {
		const particle = this._getParticleFromPool();

		particle.style.setProperty("--_rotation-xyz", `${p.rotX} ${p.rotY} ${p.rotZ}`);
		particle.style.setProperty("--_rotation-deg", `${p.rotDeg}deg`);
		particle.style.setProperty("--_rotation-speed", `${p.rotSpeed}`);
		particle.style.setProperty("--_fall-speed", `${p.fallSpeed}`);
		particle.style.setProperty("--_translate-x", `${p.x}vw`);
		particle.style.setProperty("--_x-drift", `${p.xDrift}vw`);
		particle.style.setProperty("--_color", p.color);
		particle.style.setProperty("--_scale", p.scale);

		particle.id = p.id;

		if (p.type === 'square') {
			particle.classList.add("square");
		} else {
			particle.textContent = p.type;
		}

		if (particle.parentNode) {
			particle.style.animation = 'none';
			particle.offsetHeight;
			particle.style.animation = '';
		}

		container.appendChild(particle);
		this.cleanupObserver.observe(particle);
	}

	_visibilityChange() {
		if (document.visibilityState === "visible") {
			this.lastUpdated = performance.now();
			if (this.shouldResume) {
				this.start();
				this.shouldResume = false;
			}
		} else if (document.visibilityState === "hidden") {
			this.shouldResume = !!this.rid;
			this.stop();
		}
	}
}

function randomBetween(min, max) {
	return Math.random() * (max - min) + min;
}

function generateId(timestamp) {
	return `p${Math.random().toString(36).slice(2)}${timestamp.toString(36)}`;
}

customElements.define(FallingParticles.tagName, FallingParticles);