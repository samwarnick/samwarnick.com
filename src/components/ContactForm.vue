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
        <input name="bot-field" />
      </label>
    </div>
    <label for="nameInput" class="text-lg font-serif font-bold tracking-wide">
      Name
      <span class="text-red-500">*</span>
    </label>
    <InputWrapper :has-focus="nameFocused">
      <input
        type="text"
        name="name"
        id="nameInput"
        class="rounded p-2 shadow-inner flex-grow outline-none"
        autocomplete="name"
        v-model="name"
        @focus="nameFocused = true"
        @blur="nameFocused = false"
        :disabled="sending"
        required
      />
    </InputWrapper>

    <div class="flex items-center">
      <label
        for="emailInput"
        class="text-lg font-serif font-bold tracking-wide"
      >
        Email
        <span class="text-red-500">*</span>
      </label>
      <transition name="fade"
        ><span v-show="email && !validEmail" class="text-red-600 text-sm ml-2"
          >Please enter a valid email address</span
        ></transition
      >
    </div>
    <InputWrapper :has-focus="emailFocused" :has-error="email && !validEmail">
      <input
        type="email"
        name="email"
        id="emailInput"
        class="rounded p-2 shadow-inner flex-grow outline-none"
        autocomplete="email"
        v-model="email"
        @focus="emailFocused = true"
        @blur="emailBlurred"
        :disabled="sending"
        required
      />
    </InputWrapper>
    <label
      for="messageInput"
      class="text-lg font-serif font-bold tracking-wide"
    >
      Message
      <span class="text-red-500">*</span>
    </label>
    <InputWrapper :has-focus="messageFocused">
      <textarea
        name="message"
        id="messageInput"
        class="rounded p-2 shadow-inner flex-grow outline-none"
        v-model="message"
        @focus="messageFocused = true"
        @blur="messageFocused = false"
        :disabled="sending"
        required
      ></textarea>
    </InputWrapper>
    <footer>
      <p><span class="text-red-500">*</span>Required</p>
      <button
        type="submit"
        class="text-lg font-bold no-underline font-serif text-black disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        :disabled="submitDisabled"
      >
        <GradientButton :class="{ 'hover:underline': !submitDisabled,  'cursor-not-allowed': submitDisabled}"
          >Send</GradientButton
        >
      </button>
    </footer>
  </form>
</template>

<script>
import GradientButton from "./GradientButton";
import InputWrapper from "./InputWrapper";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  data() {
    return {
      nameFocused: false,
      emailFocused: false,
      messageFocused: false,
      name: "",
      email: "",
      message: "",
      sending: false,
      validEmail: true
    };
  },
  computed: {
    submitDisabled() {
      return !this.name || !this.email || !this.validEmail || !this.message || this.sending;
    }
  },
  methods: {
    emailBlurred() {
      this.validEmail = RegExp(emailRegex).test(this.email);
      this.emailFocused = false;
    },
    handleSubmit() {
      this.processForm();
    },
    async processForm() {
      this.sending = true;
      try {
        await fetch("/contact", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({
            "form-name": "contact",
            name: this.name,
            email: this.email,
            message: this.message
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
  },
  components: {
    GradientButton,
    InputWrapper
  }
};
</script>

<style scoped></style>
