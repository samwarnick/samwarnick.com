class ConfettiDrop extends HTMLElement {
	static tagName = "confetti-drop";

	static attrs = {
		autostart: "autostart",
		colors: "colors",
		defaultDuration: "default-duration",
		fallTime: "fall-time",
		shapes: "shapes",
		spawnRate: "spawn-rate",
	};

	static observedAttributes = [
		ConfettiDrop.attrs.autostart,
		ConfettiDrop.attrs.colors,
		ConfettiDrop.attrs.fallTime,
		ConfettiDrop.attrs.defaultDuration,
		ConfettiDrop.attrs.shapes,
		ConfettiDrop.attrs.spawnRate,
	];

	// language=CSS
	static style = `
      :host {
          display: block;
          position: absolute;
          inset: 0;
          pointer-events: none;
      }

      .particles {
          position: relative;
          width: 100%;
          height: calc(100% + 250px);
          overflow: hidden;
          perspective: 500px;
					container-type: inline-size;
      }

      .particle {
          --_full-rotation: var(--_rotation-xyz) var(--_rotation-deg);
          --_particle-size: calc(var(--particle-size, 20px) * var(--_scale));
          height: var(--_particle-size);
          width: var(--_particle-size);
          translate: var(--_translate-x) -50px 0;
          rotate: var(--_full-rotation);
          animation: rotate calc(var(--_rotation-speed) * 1s) linear infinite,
          translate calc(var(--_fall-time) * 1s) cubic-bezier(0, 0.19, 0.3, 0.45),
          fade-out calc(var(--_fall-time) * 1s) ease-out;
          position: absolute;
          color: var(--_color);
          font-size: calc(var(--_particle-size) + 10px);
          font-weight: 900;
          line-height: 0.8;
          user-select: none;
          will-change: translate, rotate, opacity;
          transform-style: preserve-3d;
          isolation: isolate;
      }

      .square {
          background-color: var(--_color);
          scale: 0.8;
      }

      @keyframes fade-out {
          0%, 90% {
              opacity: 1;
          }
          100% {
              opacity: 0;
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
      }`;

	#spawnRate = 8;
	#fallTime = 5;
	#shapes = [];
	#colors = [];
	#defaultDuration;

	#particleMap = new Map();
	#particlePool = [];
	#maxPoolSize = 100;
	#outstandingParticles = 0;

	#inBurstMode = false;
	#burstTimeout;
	#rid;
	#lastUpdated;
	#boundVisibilityChange;
	#boundCreateParticles;
	#particlesContainer;
	#cleanupObserver;
	#shouldResume = false;

	get isRunning() {
		return !!this.#rid;
	}

	connectedCallback() {
		this.#fallTime =
			Number(this.getAttribute(ConfettiDrop.attrs.fallTime)) || 5;
		this.#spawnRate =
			Number(this.getAttribute(ConfettiDrop.attrs.spawnRate)) || 8;
		this.#shapes = this.getAttribute(ConfettiDrop.attrs.shapes)?.split(
			",",
		) || ["square"];
		this.#colors = this.getAttribute(ConfettiDrop.attrs.colors)
			?.split(",")
			.map((c) => {
				if (c.startsWith("--")) {
					return `var(${c})`;
				}
				return c;
			}) || ["#2364AA", "#3DA5D9", "#EA7317", "#FEC601"];
		this.#defaultDuration = this.getAttribute(
			ConfettiDrop.attrs.defaultDuration,
		);

		const shadowRoot = this.attachShadow({ mode: "open" });

		let sheet = new CSSStyleSheet();
		sheet.replaceSync(ConfettiDrop.style);
		shadowRoot.adoptedStyleSheets = [sheet];

		let template = document.createElement("template");

		// language=HTML
		template.innerHTML = `<div class="particles" aria-hidden="true"></div>`;

		shadowRoot.appendChild(template.content.cloneNode(true));

		this.#particlesContainer = this.shadowRoot.querySelector(".particles");

		this.#boundVisibilityChange = this.#visibilityChange.bind(this);
		this.#boundCreateParticles = this.#createParticles.bind(this);

		this.#cleanupObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
						const particleId = entry.target.id;
						const particleData = this.#particleMap.get(particleId);

						if (particleData) {
							this.#returnParticleToPool(entry.target);
							this.#particleMap.delete(particleId);
						}
					}
				});
			},
			{
				root: this.#particlesContainer,
				rootMargin: "100px",
			},
		);

		document.addEventListener("visibilitychange", this.#boundVisibilityChange);

		const autostart =
			this.hasAttribute(ConfettiDrop.attrs.autostart) &&
			this.getAttribute(ConfettiDrop.attrs.autostart) !== "false";
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (autostart && !prefersReducedMotion) {
			this.start();
		}
	}

	disconnectedCallback() {
		document.removeEventListener(
			"visibilitychange",
			this.#boundVisibilityChange,
		);
		this.#cleanupObserver?.disconnect();
		this.stop();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) {
			return;
		}

		switch (name) {
			case ConfettiDrop.attrs.autostart:
				break;
			case ConfettiDrop.attrs.spawnRate:
				this.#spawnRate = Number(newValue);
				break;
			case ConfettiDrop.attrs.colors:
				this.#colors = newValue.split(",");
				break;
			case ConfettiDrop.attrs.defaultDuration:
				this.#defaultDuration = newValue;
				break;
			case ConfettiDrop.attrs.shapes:
				this.#shapes = newValue.split(",");
				break;
			case ConfettiDrop.attrs.fallTime:
				this.#fallTime = Number(newValue);
				break;
		}
	}

	start(forDuration) {
		if (this.isRunning) {
			return;
		}

		this.#lastUpdated = performance.now();
		this.#rid = requestAnimationFrame(this.#boundCreateParticles);

		if (forDuration || this.#defaultDuration) {
			setTimeout(() => this.stop(), forDuration || this.#defaultDuration);
		}
	}

	stop() {
		if (this.isRunning) {
			cancelAnimationFrame(this.#rid);
			this.#rid = null;
		}
	}

	burst() {
		const shouldStartAndStop = !this.isRunning;
		if (shouldStartAndStop) {
			this.start();
		}
		this.#inBurstMode = true;
		if (this.#burstTimeout) {
			clearTimeout(this.#burstTimeout);
		}
		this.#burstTimeout = setTimeout(() => {
			this.#inBurstMode = false;
			if (shouldStartAndStop) {
				this.stop();
			}
		}, 200);
	}

	#createParticles() {
		const currentTime = performance.now();
		const delta = currentTime - this.#lastUpdated;

		if (delta < 16) {
			this.#rid = requestAnimationFrame(this.#boundCreateParticles);
			return;
		}

		this.#lastUpdated = currentTime;
		let spawnRateModifier = this.#inBurstMode
			? 10
			: this.#particleMap.size < 30
				? 2
				: 1;
		let spawnRate = this.#inBurstMode ? 8 : this.#spawnRate;
		this.#outstandingParticles +=
			(spawnRate * delta * spawnRateModifier) / 1000;

		if (this.#outstandingParticles >= 1) {
			const particlesToCreate = Math.floor(this.#outstandingParticles);
			const fragment = document.createDocumentFragment();

			for (let i = 0; i < particlesToCreate; i++) {
				const p = this.#createParticle(this.#inBurstMode);
				this.#particleMap.set(p.id, p);

				this.#attachParticle(p, fragment);
			}

			this.#particlesContainer.appendChild(fragment);
			this.#outstandingParticles -= Math.floor(particlesToCreate);
		}

		this.#rid = requestAnimationFrame(this.#boundCreateParticles);
	}

	#createParticle(burst) {
		const x = burst ? randomBetween(40, 60) : randomBetween(0, 100);
		const spawnTime = performance.now();
		return {
			type: this.#getRandomShape(),
			id: generateId(spawnTime),
			spawnTime,
			rotX: randomBetween(0, 1),
			rotY: randomBetween(0, 1),
			rotZ: randomBetween(0, 1),
			rotDeg: randomBetween(0, 360),
			rotSpeed: randomBetween(1, 3),
			fallTime: burst
				? randomBetween(2, 4)
				: randomBetween(this.#fallTime - 2, this.#fallTime),
			x,
			xDrift: burst ? (x - 50) * 2 : randomBetween(-5, 5),
			color: this.#getRandomColor(),
			scale: randomBetween(0.8, 1.2),
		};
	}

	#getRandomShape() {
		return this.#shapes[Math.floor(Math.random() * this.#shapes.length)];
	}

	#getRandomColor() {
		return this.#colors[Math.floor(Math.random() * this.#colors.length)];
	}

	#getParticleFromPool() {
		if (this.#particlePool.length > 0) {
			const particle = this.#particlePool.pop();
			particle.style.display = "block";
			return particle;
		}

		const particle = document.createElement("div");
		particle.classList.add("particle");
		return particle;
	}

	#returnParticleToPool(particleElement) {
		this.#cleanupObserver.unobserve(particleElement);

		if (this.#particlePool.length < this.#maxPoolSize) {
			particleElement.style.display = "none";
			particleElement.textContent = "";
			particleElement.classList.remove("square");
			this.#particlePool.push(particleElement);
		} else {
			particleElement.remove();
		}
	}

	#attachParticle(p, container) {
		const particle = this.#getParticleFromPool();

		particle.style.setProperty(
			"--_rotation-xyz",
			`${p.rotX} ${p.rotY} ${p.rotZ}`,
		);
		particle.style.setProperty("--_rotation-deg", `${p.rotDeg}deg`);
		particle.style.setProperty("--_rotation-speed", `${p.rotSpeed}`);
		particle.style.setProperty("--_fall-time", `${p.fallTime}`);
		particle.style.setProperty("--_translate-x", `${p.x}cqw`);
		particle.style.setProperty("--_x-drift", `${p.xDrift}cqw`);
		particle.style.setProperty("--_color", p.color);
		particle.style.setProperty("--_scale", p.scale);

		particle.id = p.id;

		if (p.type === "square") {
			particle.classList.add("square");
		} else {
			particle.textContent = p.type;
		}

		if (particle.parentNode) {
			particle.style.animation = "none";
			particle.offsetHeight;
			particle.style.animation = "";
		}

		container.appendChild(particle);
		this.#cleanupObserver.observe(particle);
	}

	#visibilityChange() {
		if (document.visibilityState === "visible") {
			this.#lastUpdated = performance.now();
			if (this.#shouldResume) {
				this.start();
				this.#shouldResume = false;
			}
		} else if (document.visibilityState === "hidden") {
			this.#shouldResume = this.isRunning;
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

customElements.define(ConfettiDrop.tagName, ConfettiDrop);