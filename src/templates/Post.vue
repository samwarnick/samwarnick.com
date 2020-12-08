<template>
    <Layout :show-breadcrumbs="true">
        <article>
            <header>
                <h2
                    class="text-4xl md:text-5xl font-extrabold leading-none mb-4"
                >
                    {{ $page.post.title }}
                </h2>
                <div class="text-gray-700 flex flex-col md:flex-row">
                    <span class="mr-4">
                        <FaIcon
                            :icon="['fas', 'calendar-day']"
                            class="mr-2 text-gray-600"
                        />
                        <time :datetime="$page.post.date">
                            {{ $page.post.date | formatDate }}
                        </time>
                    </span>
                    <span class="mr-2" v-if="$page.post.categories.length > 0">
                        <FaIcon
                            :icon="['fas', 'archive']"
                            class="mr-2 text-gray-600"
                        />
                        <g-link
                            v-for="category in $page.post.categories"
                            :to="category.path"
                            :key="category.id"
                            class="mr-2 hover:underline hover:text-purple-700"
                            >{{ category.title }}</g-link
                        >
                    </span>
                    <span v-if="$page.post.tags.length > 0">
                        <FaIcon
                            :icon="['fas', 'hashtag']"
                            class="mr-2 text-gray-600"
                        />
                        <g-link
                            v-for="tag in $page.post.tags"
                            :to="tag.path"
                            :key="tag.id"
                            class="mr-2 hover:underline hover:text-purple-700"
                            >{{ tag.title }}</g-link
                        >
                    </span>
                </div>
                <div v-if="$page.post.description" class="border-b my-12">
                    <h3 class="text-xl font-normal">TL;DR</h3>
                    <p class="pt-2 pb-12 text-lg">
                        {{ $page.post.description }}
                    </p>
                </div>
            </header>
            <div
                v-html="$page.post.content"
                class="content"
                :class="{ 'no-img-shadows': !!$page.post.noImgShadows }"
            ></div>
        </article>
    </Layout>
</template>

<page-query>
query Post ($path: String!) {
  post: post (path: $path) {
    path
    id
    title
    date
    description
    tags {
      id
      title
      path
    }
    categories {
      id
      title
      path
    }
    content
    image
    imageAlt
    shortDescription
    noImgShadows
  }
}
</page-query>

<script>
export default {
    metaInfo() {
        const meta = [
            {
                key: "description",
                name: "description",
                content: this.$page.post.description,
            },
            {
                key: "og:title",
                name: "og:title",
                content: this.$page.post.title,
            },
            {
                key: "og:description",
                name: "og:description",
                content: this.$page.post.description || null,
            },
            {
                key: "og:url",
                name: "og:url",
                content: `https://samwarnick.com${this.$page.post.path}`,
            },
        ];

        if (this.$page.post.image) {
            meta.push(
                {
                    key: "og:image",
                    name: "og:image",
                    content: `https://samwarnick.com${this.$page.post.image.src}`,
                },
                {
                    name: "og:height",
                    content: "628",
                },
                {
                    name: "og:width",
                    content: "1200",
                },
                {
                    key: "twitter:image:alt",
                    name: "twitter:image:alt",
                    content: this.$page.post.imageAlt,
                },
                {
                    key: "twitter:card",
                    name: "twitter:card",
                    content: "summary_large_image",
                },
            );
        }

        if (this.$page.post.shortDescription) {
            meta.push({
                name: "twitter:description",
                content: this.$page.post.shortDescription,
            });
        }

        return {
            title: this.$page.post.title,
            meta,
        };
    },
};
</script>

<style scoped></style>
