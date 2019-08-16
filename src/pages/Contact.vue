<template>
  <Layout>
    <AboutCard />
    <ContactForm />
  </Layout>
</template>

<script>
import ContactForm from "../components/ContactForm";
import AboutCard from "../components/AboutCard";

export default {
  metaInfo: {
    title: "Contact"
  },
  components: {
    AboutCard,
    ContactForm
  }
};
</script>
