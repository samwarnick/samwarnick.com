class TCGCard extends HTMLElement {
	constructor() {
		super();
		const template = document.createElement("template");
		template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      perspective: 800px;

      --pointer-x: 50%;
      --pointer-y: 50%;
      --shine-opacity: 0;
      --rz: 0deg;
      --rx: 0deg;
      --ry: 0deg;
    }

    .tcg-card-wrapper {
      position: relative;
      aspect-ratio: 733/1024;
      transform-style: preserve-3d;
      transform-origin: center;
      will-change: transform;
      filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
      transform: rotate(var(--rz)) rotateX(var(--rx)) rotateY(var(--ry));
    }

    .tcg-card-shine {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(
farthest-corner circle at var(--pointer-x) var(--pointer-y),
hsla(0, 0%, 100%, 0.8) 10%,
hsla(0, 0%, 100%, 0.65) 20%,
hsla(0, 0%, 0%, 0.5) 90%
);
    opacity: var(--shine-opacity);
    mix-blend-mode: overlay;
    transition: opacity 300ms ease-in-out;
    border-radius: 4%;
    }

    .tcg-card-img {
      height: 100%;
      position: absolute;
    }
  </style>
  <div class="tcg-card-wrapper">
    <img class="tcg-card-img" src="${this.getAttribute("src")}" alt="${this.getAttribute("alt")}"/>
    <div class="tcg-card-shine"></div>
  </div>
`;
		this._shadowRoot = this.attachShadow({ mode: "closed" });
		this._shadowRoot.appendChild(template.content.cloneNode(true));

		this.interactionPos = { x: 0, y: 0, tiltX: 0, tiltY: 0 };

		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
		this.updateTransform = this.updateTransform.bind(this);
	}

	connectedCallback() {
		this.addEventListener("mouseenter", this.handleMouseEnter);
		this.addEventListener("mouseleave", this.handleMouseLeave);
		this.addEventListener("mousemove", this.handleMouseMove);

		this.addEventListener("touchstart", this.handleTouchStart);
		this.addEventListener("touchmove", this.handleTouchMove);
		this.addEventListener("touchend", this.handleTouchEnd);
		this.addEventListener("touchcancel", this.handleTouchEnd);

		this.wrapper = this._shadowRoot.querySelector(".tcg-card-wrapper");
	}

	disconnectedCallback() {
		this.removeEventListener("mouseenter", this.handleMouseEnter);
		this.removeEventListener("mouseleave", this.handleMouseLeave);
		this.removeEventListener("mousemove", this.handleMouseMove);

		this.removeEventListener("touchstart", this.handleTouchStart);
		this.removeEventListener("touchmove", this.handleTouchMove);
		this.removeEventListener("touchend", this.handleTouchEnd);
		this.removeEventListener("touchcancel", this.handleTouchEnd);

		if (this.animationFrameId) {
			cancelAnimationFrame(this.animationFrameId);
		}
	}

	handleMouseEnter(e) {
		if (this.isTouching) return;
		this.startInteraction(e.clientX, e.clientY);
	}

	handleMouseLeave() {
		if (this.isTouching) return;
		this.endInteraction();
	}

	handleMouseMove(e) {
		if (this.isTouching) return;
		this.updateInteractionPos(e.clientX, e.clientY);
	}

	handleTouchStart(e) {
		e.preventDefault();
		this.isTouching = true;
		const touch = e.touches[0];
		this.startInteraction(touch.clientX, touch.clientY);
	}

	handleTouchMove(e) {
		e.preventDefault();
		const touch = e.touches[0];
		this.updateInteractionPos(touch.clientX, touch.clientY);
	}

	handleTouchEnd() {
		this.isTouching = false;
		this.endInteraction();
	}

	startInteraction(clientX, clientY) {
		this.isActive = true;
		this.wrapper.style.setProperty("--shine-opacity", "0.75");
		this.updateInteractionPos(clientX, clientY);
		this.updateTransform();
	}

	updateInteractionPos(clientX, clientY) {
		const rect = this.wrapper.getBoundingClientRect();
		const x = clientX - rect.left;
		const y = clientY - rect.top;
		const xPercent = (x / rect.width) * 100;
		const yPercent = (y / rect.height) * 100;
		const xFromCenter = x - rect.width / 2;
		const yFromCenter = y - rect.height / 2;
		const tiltX = (yFromCenter / rect.height) * 30;
		const tiltY = -(xFromCenter / rect.width) * 30;

		this.interactionPos = { x: xPercent, y: yPercent, tiltX, tiltY };
	}

	updateTransform() {
		if (!this.isActive) return;

		this.wrapper.style.setProperty("--pointer-x", this.interactionPos.x + "%");
		this.wrapper.style.setProperty("--pointer-y", this.interactionPos.y + "%");
		this.wrapper.style.setProperty("--rz", "1deg");
		this.wrapper.style.setProperty("--rx", `${this.interactionPos.tiltX}deg`);
		this.wrapper.style.setProperty("--ry", `${this.interactionPos.tiltY}deg`);

		this.animationFrameId = requestAnimationFrame(this.updateTransform);
	}

	endInteraction() {
		this.isActive = false;

		if (this.animationFrameId) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = null;
		}

		this.wrapper.style.transition = "transform 300ms ease-out";
		this.wrapper.style.setProperty("--shine-opacity", "0");
		this.wrapper.style.setProperty("--rz", "0deg");
		this.wrapper.style.setProperty("--rx", "0deg");
		this.wrapper.style.setProperty("--ry", "0deg");
	}
}

customElements.define("tcg-card", TCGCard);
