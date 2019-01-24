<template>
  <form
    name="contact"
    id="contactForm"
    class="flex flex-col mt-12"
    method="POST"
    netlify
    netlify-honeypot="bot-field"
    @submit.prevent="handleSubmit"
  >
    <div class="hidden">
      <label>
        Don’t fill this out if you're human:
        <input name="bot-field">
      </label>
    </div>
    <label for="nameInput" class="text-lg font-serif font-bold">
      Name
      <span class="text-red">*</span>
    </label>
    <InputWrapper :has-focus="nameFocused">
      <input
        type="text"
        name="name"
        id="nameInput"
        class="rounded-md p-2 shadow-inner flex-grow outline-none"
        autocomplete="name"
        v-model="name"
        @focus="nameFocused = true"
        @blur="nameFocused = false"
        :disabled="sending"
        required
      >
    </InputWrapper>

    <label for="emailInput" class="text-lg font-serif font-bold">
      Email
      <span class="text-red">*</span>
    </label>
    <InputWrapper :has-focus="emailFocused">
      <input
        type="email"
        name="email"
        id="emailInput"
        class="rounded-md p-2 shadow-inner flex-grow outline-none"
        autocomplete="email"
        v-model="email"
        @focus="emailFocused = true"
        @blur="emailFocused = false"
        :disabled="sending"
        required
      >
    </InputWrapper>
    <label for="message" class="text-lg font-serif font-bold">
      Message
      <span class="text-red">*</span>
    </label>
    <InputWrapper :has-focus="messageFocused">
      <textarea
        name="message"
        id="messageInput"
        class="rounded-md p-2 shadow-inner flex-grow outline-none"
        v-model="message"
        @focus="messageFocused = true"
        @blur="messageFocused = false"
        :disabled="sending"
        required
      ></textarea>
    </InputWrapper>
    <vue-recaptcha
      class="my-4"
      ref="recaptcha"
      @verify="onCaptchaVerified"
      @expired="onCaptchaExpired"
      size="invisible"
      sitekey="6Le0DYIUAAAAAKULQ1ziSlheR0CCbUlP8W0BlKZr"
      badge="inline"
    ></vue-recaptcha>
    <footer>
      <p>
        <span class="text-red">*</span>Required
      </p>
      <button
        type="submit"
        class="text-lg font-bold no-underline font-serif text-black disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="submitDisabled"
      >
        <GradientBorder :class="{'hover:underline': !submitDisabled}">Send</GradientBorder>
      </button>
    </footer>
  </form>
</template>

<script>
const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export default {
  data() {
    return {
      nameFocused: false,
      emailFocused: false,
      messageFocused: false,
      name: "",
      email: "",
      message: "",
      sending: false
    };
  },
  computed: {
    submitDisabled() {
      return !this.name || !this.message || this.sending;
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.recaptcha.execute();
    },
    onCaptchaVerified(token) {
      this.processForm(token);
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset();
    },
    async processForm(token) {
      this.sending = true;
      try {
        await fetch("/contact", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({
            "form-name": "contact",
            name: this.name,
            email: this.email,
            message: this.message,
            "g-recaptcha-response": token
          })
        });
        this.message = "";
        this.$router.push("/thanks/");
      } catch (e) {
        this.$router.push("/404");
      } finally {
        this.sending = false;
      }
    }
  }
};
</script>

<style scoped>
</style>