const EXPAND_TRANSITION_TIME = 400;

class TCGCard extends HTMLElement {
	constructor() {
		super();
		const template = document.createElement("template");
		template.innerHTML = `
    <style>
    :host {
      display: block;

      --display-scale: 0.5;
      --display-tx: 0;
      --display-ty: 0;
      --display-rx: 0deg;
      --display-ry: 0deg;
      --display-rz: 0deg;

      --pointer-x: 50%;
      --pointer-y: 50%;

      --glare-opacity: 0;
      --z-index: 1;

      z-index: var(--z-index);
      pointer-events: none;
    }

    .tcg-wrapper {
      aspect-ratio: 733/1024;
      width: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      perspective: 30cm;
      pointer-events: none;
      border-radius: 4%;

      &:has(:focus-visible) {
      	outline: 3px solid var(--focus-outline, black);
       	outline-offset: 3px;
      }
    }

    .tcg-proxy {
      width: 100%;
      aspect-ratio: 733/1024;
      pointer-events: none;
    }

    .tcg-display {
      pointer-events: auto;
      border: none;
      position: absolute;
      scale: var(--display-scale);
      translate: var(--display-tx) var(--display-ty);
      transform: rotateX(var(--display-rx)) rotateY(var(--display-ry));
      rotate: z var(--display-rz);
      transform-origin: center;
      background: none;
      margin: 0;
      padding: 0;
      border-radius: 4%;
      filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
      -webkit-tap-highlight-color: rgba(0,0,0,0);

      transition: scale ${EXPAND_TRANSITION_TIME}ms ease-in, translate ${EXPAND_TRANSITION_TIME}ms ease-out, rotate 250ms ease-in;

      &:focus-visible {
      	outline: none;
      }
    }

    .tcg-card {
      display: block;
    }

    .tcg-shine {
      position: absolute;
      inset: 0;
    }

    .tcg-glare {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(
        farthest-corner circle at var(--pointer-x) var(--pointer-y),
        hsla(0, 0%, 100%, 0.8) 10%,
        hsla(0, 0%, 100%, 0.65) 20%,
        hsla(0, 0%, 0%, 0.5) 90%
      );
      mix-blend-mode: overlay;
      opacity: var(--glare-opacity);
      transition: opacity 500ms ease-out;
      border-radius: 4%;
    }
    </style>
    <div class="tcg-wrapper">
      <div class="tcg-proxy">
      </div>
      <button class="tcg-display">
        <img class="tcg-card" src="${this.getAttribute(
					"src",
				)}" alt="${this.getAttribute("alt")}">
        <div class="tcg-shine"></div>
        <div class="tcg-glare"></div>
      </button>
    </div>
    `;

		this._shadowRoot = this.attachShadow({ mode: "closed" });
		this._shadowRoot.appendChild(template.content.cloneNode(true));

		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleResize = this.handleResize.bind(this);
	}

	connectedCallback() {
		this.id = (Math.random() + 1).toString(36).substring(7);

		this.card = this._shadowRoot.querySelector(".tcg-display");
		this.proxy = this._shadowRoot.querySelector(".tcg-proxy");

		this.addEventListener("mouseenter", this.handleMouseEnter);
		this.addEventListener("mouseleave", this.handleMouseLeave);
		this.addEventListener("mousemove", this.handleMouseMove);

		this.addEventListener("touchstart", this.handleTouchStart);
		this.addEventListener("touchmove", this.handleTouchMove);
		this.addEventListener("touchend", this.handleTouchEnd);
		this.addEventListener("touchcancel", this.handleTouchEnd);

		this.card.addEventListener("click", this.handleClick);

		window.addEventListener("resize", this.handleResize);

		const img = this._shadowRoot.querySelector(".tcg-card");
		if (img.complete) {
			this.resetCardPosition(true);
		} else {
			img.onload = () => {
				this.resetCardPosition(true);
			};
		}
	}

	disconnectedCallback() {
		this.removeEventListener("mouseenter", this.handleMouseEnter);
		this.removeEventListener("mouseleave", this.handleMouseLeave);
		this.removeEventListener("mousemove", this.handleMouseMove);

		this.removeEventListener("touchstart", this.handleTouchStart);
		this.removeEventListener("touchmove", this.handleTouchMove);
		this.removeEventListener("touchend", this.handleTouchEnd);
		this.removeEventListener("touchcancel", this.handleTouchEnd);

		this.card.removeEventListener("click", this.handleClick);
	}

	// Event Handlers
	handleMouseEnter(e) {
		if (this.isTouching) {
			return;
		}
		this.startInteraction(e.clientX, e.clientY);
	}

	handleMouseMove(e) {
		if (this.isTouching) {
			return;
		}
		this.updateTransform(e.clientX, e.clientY);
	}

	handleMouseLeave() {
		if (this.isTouching) {
			return;
		}
		this.endInteraction();
	}

	handleTouchStart(e) {
		this.isTouching = true;
		const touch = e.touches[0];
		this.startInteraction(touch.clientX, touch.clientY);
	}

	handleTouchMove(e) {
		e.preventDefault();
		const touch = e.touches[0];
		this.updateTransform(touch.clientX, touch.clientY);
	}

	handleTouchEnd() {
		this.isTouching = false;
		this.endInteraction();
	}

	handleClick() {
		if (this.expanded) {
			this.close();
		} else {
			this.expanded = true;
			this.dispatchEvent(
				new CustomEvent("tcg-card-expanded", {
					bubbles: true,
					details: this.id,
				}),
			);
			this.centerCard();
		}
	}

	handleResize() {
		if (this.expanded) {
			this.centerCard(true);
		}
	}

	startInteraction(clientX, clientY) {
		const transitionTime = 300;
		this.card.style.transition = `all ${transitionTime}ms ease-out`;
		this.style.setProperty("--z-index", "10");
		this.style.setProperty("--glare-opacity", "0.75");
		const r = (Math.random() * 0.5 + 0.5) * (Math.random() < 0.5 ? -1 : 1);
		this.style.setProperty("--display-rz", `${r}deg`);
		this.updateTransform(clientX, clientY);
		setTimeout(() => {
			this.card.style.transition = "";
		}, transitionTime);
	}

	updateTransform(clientX, clientY) {
		if (!this.transforming) {
			const rect = this.card.getBoundingClientRect();
			const x = clientX - rect.left;
			const y = clientY - rect.top;
			const xPercent = (x / rect.width) * 100;
			const yPercent = (y / rect.height) * 100;
			const xFromCenter = x - rect.width / 2;
			const yFromCenter = y - rect.height / 2;
			const tiltX = (yFromCenter / rect.height) * 10;
			const tiltY = -(xFromCenter / rect.width) * 10;
			this.pendingAnimationFrame = requestAnimationFrame(() => {
				this.style.setProperty("--pointer-x", `${xPercent}%`);
				this.style.setProperty("--pointer-y", `${yPercent}%`);
				this.style.setProperty("--display-rx", `${tiltX}deg`);
				this.style.setProperty("--display-ry", `${tiltY}deg`);
				this.transforming = false;
			});
			this.transforming = true;
		}
	}

	endInteraction() {
		if (this.pendingAnimationFrame) {
			cancelAnimationFrame(this.pendingAnimationFrame);
			this.transforming = false;
		}
		const transitionTime = 300;
		this.card.style.transition = `all ${transitionTime}ms ease-out`;
		this.style.setProperty("--glare-opacity", "0");
		this.style.setProperty("--display-rz", "0deg");
		this.style.setProperty("--display-rx", "0deg");
		this.style.setProperty("--display-ry", "0deg");
		setTimeout(() => {
			if (!this.expanded) {
				this.style.setProperty("--z-index", "");
			}
			this.card.style.transition = "";
		}, transitionTime);
	}

	close() {
		this.expanded = false;
		this.dispatchEvent(
			new CustomEvent("tcg-card-closed", {
				bubbles: true,
			}),
		);
		this.resetCardPosition();
	}

	centerCard(skipTransition = false) {
		if (skipTransition) {
			this.card.style.setProperty("transition", "none");
		}
		this.style.setProperty("--z-index", "10");
		this.style.setProperty("--display-rz", "0deg");
		const screenX = window.innerWidth / 2;
		const screenY = window.innerHeight / 2;
		const rect = this.proxy.getBoundingClientRect();
		const isPortrait = window.innerHeight > window.innerWidth;
		const scaleX = (window.innerWidth / this.card.clientWidth) * 0.9;
		const scaleY = (window.innerHeight / this.card.clientHeight) * 0.9;
		let scale = isPortrait ? scaleX : scaleY;
		if (isPortrait && this.card.clientHeight * scale > window.innerHeight) {
			scale = scaleY;
		}
		const tx = screenX - rect.left - rect.width / 2;
		const ty = screenY - rect.top - rect.height / 2;

		this.card.style.setProperty("--display-tx", `${tx}px`);
		this.card.style.setProperty("--display-ty", `${ty}px`);
		this.card.style.setProperty("--display-scale", scale);
		setTimeout(() => {
			this.card.style.setProperty("transition", "");
		}, EXPAND_TRANSITION_TIME);
	}

	resetCardPosition(skipTransition = false) {
		const scale =
			this.proxy.getBoundingClientRect().height / this.card.clientHeight;
		const originalTrasnsition = this.card.style.transition;
		if (skipTransition) {
			this.card.style.setProperty("transition", "none");
		}
		this.card.style.setProperty("--display-tx", "0px");
		this.card.style.setProperty("--display-ty", "0px");
		this.card.style.setProperty("--display-scale", scale);
		setTimeout(() => {
			this.card.style.setProperty("transition", "");
			this.style.setProperty("--z-index", "");
		}, EXPAND_TRANSITION_TIME);
	}
}

customElements.define("tcg-card", TCGCard);

class TCGCardWrapper extends HTMLElement {
	constructor() {
		super();

		this.handleExpanded = this.handleExpanded.bind(this);
		this.handleClosed = this.handleClosed.bind(this);
	}

	connectedCallback() {
		this.cards = this.querySelectorAll("tcg-card");
		this.addEventListener("tcg-card-expanded", this.handleExpanded);
		this.addEventListener("tcg-card-closed", this.handleClosed);
	}

	disconnectedCallback() {
		this.removeEventListener("tcg-card-expanded", this.handleExpanded);
		this.removeEventListener("tcg-card-closed", this.handleClosed);
	}

	handleExpanded(e) {
		for (const card of this.cards) {
			if (card != e.target) {
				card.close();
			}
		}
	}

	handleClosed() {}
}

customElements.define("tcg-card-wrapper", TCGCardWrapper);
