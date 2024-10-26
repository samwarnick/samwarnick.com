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
      
      &:after {
		  content: "";
		  position: absolute;
		  inset: 10px;
		  border-radius: 4%;
		  background-color: rgba(0,0,0,0.4);
		  border: 2px solid rgba(0,0,0,0.5) ;
		  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Pokéball' x='0px' y='0px' viewBox='0 0 595.3 594.1' style='enable-background:new 0 0 595.3 594.1;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23FFFFFF;%7D .st1%7Bfill:%23DFDFDF;%7D .st2%7Bfill:%23FF1C1C;%7D .st3%7Bfill:%23DF1818;%7D%0A%3C/style%3E%3Cg id='Pokéball_1_'%3E%3Cg id='Colours'%3E%3Cpath id='Down' class='st0' d='M297.6,380.9c-40.4,0-74.1-28.6-82.1-66.6H81.1c9.5,110.5,102.2,197.2,215.1,197.2 s205.7-86.7,215.1-197.2H379.7C371.7,352.4,338,380.9,297.6,380.9z'/%3E%3Cpath id='Shadow_Down' class='st1' d='M345.6,505.9c89.6-21,157.7-97.7,165.7-191.6h-53C453,399.5,408.3,471.7,345.6,505.9z'/%3E%3Cpath id='Center' class='st0' d='M347.1,297L347.1,297C347,297,347,297,347.1,297c-0.1-6.1-1.2-11.9-3.2-17.3 c-7-18.8-25.1-32.1-46.3-32.1s-39.3,13.4-46.3,32.1c-2,5.4-3.1,11.2-3.1,17.3c0,0,0,0,0,0h0.1c0,0,0,0,0,0 c0,6.1,1.1,11.9,3.1,17.3c7,18.8,25.1,32.1,46.3,32.1c21.2,0,39.3-13.4,46.3-32.1C346,309,347.1,303.1,347.1,297 C347.1,297,347.1,297,347.1,297z'/%3E%3Cpath id='Up' class='st2' d='M297.7,213.2c40.4,0,74.1,28.6,82.1,66.6h134.4C504.7,169.2,412,82.5,299,82.5S93.4,169.2,83.9,279.7 h131.7C223.6,241.7,257.3,213.2,297.7,213.2z'/%3E%3Cpath id='Shadow_Up' class='st3' d='M458.3,279.7h55.8c-8.2-95.5-78.6-173.3-170.5-192.6C407.4,120.8,452.9,193.7,458.3,279.7z'/%3E%3C/g%3E%3Cpath id='Line' d='M299,82.5c113,0,205.7,86.7,215.1,197.2H379.7c-8-38-41.7-66.6-82.1-66.6c-40.4,0-74.1,28.6-82.1,66.6H83.9 C93.4,169.2,186.1,82.5,299,82.5z M343.9,279.7c2,5.4,3.1,11.2,3.1,17.3c0,0,0,0,0,0h0.1c0,0,0,0,0,0c0,6.1-1.1,11.9-3.1,17.3 c-7,18.8-25.1,32.1-46.3,32.1c-21.2,0-39.3-13.4-46.3-32.1c-2-5.4-3.1-11.2-3.1-17.3c0,0,0,0,0,0h-0.1c0,0,0,0,0,0 c0-6.1,1.1-11.9,3.1-17.3c7-18.8,25.1-32.1,46.3-32.1S336.9,261,343.9,279.7z M296.2,511.6c-113,0-205.7-86.7-215.1-197.2h134.4 c8,38,41.7,66.6,82.1,66.6s74.1-28.6,82.1-66.6h131.7C501.9,424.8,409.2,511.6,296.2,511.6z M297.6,41.3 C156.4,41.3,41.9,155.8,41.9,297s114.5,255.7,255.7,255.7S553.4,438.3,553.4,297S438.9,41.3,297.6,41.3z'/%3E%3C/g%3E%3Cscript xmlns=''/%3E%3C/svg%3E");
		  background-repeat: no-repeat;
		  background-position: center;
		  background-blend-mode: screen;
		  filter: saturate(0) opacity(0.1);
      }
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
				)}" alt="${this.getAttribute("alt")}" loading="lazy">
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
		this.resetCardPosition = this.resetCardPosition.bind(this);
	}

	connectedCallback() {
		this.id = (Math.random() + 1).toString(36).substring(7);

		this.card = this._shadowRoot.querySelector(".tcg-display");
		this.proxy = this._shadowRoot.querySelector(".tcg-proxy");
		this.wrapper = this._shadowRoot.querySelector(".tcg-wrapper");

		this.addEventListener("mouseenter", this.handleMouseEnter);
		this.addEventListener("mouseleave", this.handleMouseLeave);
		this.addEventListener("mousemove", this.handleMouseMove);

		this.addEventListener("touchstart", this.handleTouchStart);
		this.addEventListener("touchmove", this.handleTouchMove);
		this.addEventListener("touchend", this.handleTouchEnd);
		this.addEventListener("touchcancel", this.handleTouchEnd);

		this.card.addEventListener("click", this.handleClick);

		window.addEventListener("resize", this.handleResize);

		this.initImage();

		this.resizeObserver = new ResizeObserver(this.resetCardPosition);
		this.resizeObserver.observe(this.proxy);
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
		this.resizeObserver.disconnect();
	}

	initImage() {
		const img = this._shadowRoot.querySelector(".tcg-card");
		const fadeInDuration = 300;
		img.style.opacity = 0;
		img.style.transition = `opacity ${fadeInDuration}ms ease-out`;
		this.ready = false;
		if (img.complete) {
			this.resetCardPosition(true);
			img.style.opacity = "";
			this.ready = true;
			img.style.display = "block";
			setTimeout(() => {
				img.style.transition = "";
			}, fadeInDuration)
		} else {
			this.wrapper.style.overflow = "hidden";
			img.onload = () => {
				this.resetCardPosition(true);
				img.style.opacity = "";
				this.ready = true;
				this.wrapper.style.overflow = "";
				setTimeout(() => {
					img.style.transition = "";
				}, fadeInDuration)
			};
		}
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
		if (!this.ready) {
			return;
		}
		const transitionTime = 300;
		this.card.style.transition = `all ${transitionTime}ms ease-out`;
		this.style.setProperty("--z-index", "2");
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
			this.isTouching = false;
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
		this.style.setProperty("--z-index", "20");
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
		this.card.style.setProperty("--display-scale", Math.min(scale, 1));
		setTimeout(() => {
			this.card.style.setProperty("transition", "");
		}, EXPAND_TRANSITION_TIME);
	}

	resetCardPosition(skipTransition = false) {
		const scale =
			this.proxy.getBoundingClientRect().height / this.card.clientHeight;
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
