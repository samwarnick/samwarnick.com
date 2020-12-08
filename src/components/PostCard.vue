<template>
    <li>
        <header class="mb-4">
            <h3 class="text-2xl font-normal">
                <g-link :to="post.path" class="gradient-underline">
                    {{ post.title }}
                </g-link>
            </h3>
            <div class="text-gray-700 flex flex-wrap">
                <span class="mr-4">
                    <FaIcon
                        :icon="['fas', 'calendar-day']"
                        class="mr-2 text-gray-600"
                    />
                    <time :datetime="post.date">{{
                        post.date | formatDate
                    }}</time>
                </span>
                <span class="mr-2" v-if="post.categories.length > 0">
                    <FaIcon
                        :icon="['fas', 'archive']"
                        class="mr-2 text-gray-600"
                    />
                    <g-link
                        v-for="category in post.categories"
                        :to="category.path"
                        :key="category.id"
                        class="mr-2 hover:underline hover:text-purple-700"
                        >{{ category.title }}</g-link
                    >
                </span>
                <span v-if="post.tags.length > 0">
                    <FaIcon
                        :icon="['fas', 'hashtag']"
                        class="mr-2 text-gray-600"
                    />
                    <g-link
                        v-for="tag in post.tags"
                        :to="tag.path"
                        :key="tag.id"
                        class="mr-2 hover:underline hover:text-purple-700"
                        >{{ tag.title }}</g-link
                    >
                </span>
            </div>
        </header>
        <p>{{ post.description }}</p>
    </li>
</template>

<script>
export default {
    name: "PostCard",
    props: {
        post: {
            required: true,
            type: Object,
        },
    },
};
</script>

<style scoped></style>
