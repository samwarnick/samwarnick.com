<template>
  <div class="shadow-md rounded-lg p-2 mt-24 bg-gradient-texture">
    <div class="flex flex-col sm:flex-row items-center bg-white rounded-md p-4 shadow">
      <img
        src="https://res.cloudinary.com/verygoodfm/image/upload/c_fill,f_auto,g_face,h_600,w_600/v1544745118/sam_profile.jpg"
        alt="Image of Sam Warnick"
        class="rounded-lg shadow-md mb-4 profile-image sm:mb-0 flex-shrink-0"
      >
      <div class="ml-4">
        <p>
          Hey there! I'm
          <strong>Sam Warnick</strong>. I'm a software developer in Utah. I love collecting Lego sets, eating sesame chicken, and spending time with my family. I work mainly with JS, but I dabble in iOS development as well.
        </p>
        <ul class="list-reset flex flex-wrap items-center justify-center sm:justify-start text-4xl">
          <li class="mr-4 my-4">
            <a
              href="https://twitter.com/samwarnick"
              target="_blank"
              rel="noopener"
              title="Twitter"
              class="text-blue-dark hover:text-green"
            >
              <FontAwesomeIcon :icon="['fab', 'twitter']"></FontAwesomeIcon>
            </a>
          </li>
          <li class="mr-4 my-4">
            <a
              href="https://codepen.io/samwarnick/"
              target="_blank"
              rel="noopener"
              title="CodePen"
              class="text-blue-dark hover:text-orange"
            >
              <FontAwesomeIcon :icon="['fab', 'codepen']"></FontAwesomeIcon>
            </a>
          </li>
          <li class="mr-4 my-4">
            <a
              href="https://github.com/samwarnick"
              target="_blank"
              rel="noopener"
              title="GitHub"
              class="text-blue-dark hover:text-purple"
            >
              <FontAwesomeIcon :icon="['fab', 'github']"></FontAwesomeIcon>
            </a>
          </li>
          <li class="my-4">
            <RouterLink to="/resume/" class="text-lg font-bold no-underline font-serif text-black">
              <GradientBorder class="hover:underline">Résumé</GradientBorder>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.profile-image {
  height: 150px;
  width: 150px;
}
</style>