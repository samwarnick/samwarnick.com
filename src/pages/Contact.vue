<template>
  <Layout>
    <AboutCard class="mt-12"/>
    <ContactForm />
  </Layout>
</template>

<script>
import ContactForm from "../components/ContactForm";
import AboutCard from "../components/AboutCard";

export default {
  metaInfo: {
    title: 'Contact Me'
  },
    components: {
      AboutCard,
      ContactForm
    }
}
</script>
