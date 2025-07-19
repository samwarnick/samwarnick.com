---
title: The Perfect Stack
date: '2024-04-05T15:00'
summary: I have finally found the perfect stack for web development. You're welcome.
tags:
  - Web Development
oldUrl: 'https://samwarnick.com/2024/4/the-perfect-stack'
published: true
---

Dear Dave,

I will preface this by saying this is unequivocally the perfect stack for every project in every situation. No nuance or qualifications. It can't be perfect if you have to think about it.

Without further ado, here's the perfect stack:
- Bun
- Hono
- HTMX

## Bun

The perfect stack obviously needs to use the perfect language, JavaScript. We want to use the same language on the client and server because having to know more than one language is not ideal. TypeScript takes a perfect language and makes it even more perfect by adding an inscrutable type system. Now, you could use a tried-and-true runtime like Node to actually execute this prefect, beautiful language, but it's more perfect to use a runtime that has just only recently reached 1.0—[Bun](https://bun.sh).

Bun has everything you could want. It has a package manager. It has a test runner. It has support for TypeScript. It has a built in [SQLite driver](https://bun.sh/docs/api/sqlite). It has a bundler that [doesn't support CSS](https://github.com/oven-sh/bun/discussions/7119). But most importantly, it's written in Zig, a language so fast you've never heard of it. It's got it all.

## Hono

While you can easily write a server with Bun, [Hono](https://hono.dev) is the perfect framework. What's cool about it? It's got a simple and familiar API, but also JSX support for server-side rendering. Now, I've been touting the benefits of SSR for weeks now, and React devs have been spreading the good news of JSX for decades. Finally, for the first time ever, they come together. You can use JSX to generate HTML on the server. With TSX, you can get your beautiful TypeScript types as you write your templates.

```ts
app.get("/", (c) => {
	return c.html(
		<Layout>
			<Search />
		</Layout>,
	);
});
```

It's really quite simple. No awkward templating "languages" that don't give you any help at all. Just beautiful JSX.

But, can we make it more perfect? Yes. Add [Drizzle ORM](https://orm.drizzle.team) and [Zod](https://zod.dev). The perfect stack doesn't make you think, and that includes having to think about SQL. Drizzle does so much for you, including generating migrations and TypeScript types from table schemas. It can even generate Zod schemas which can be used in Hono endpoints to [safely parse](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/) request data.

```ts
export const favoriteMovies = sqliteTable("favorite_movies", {
	id: integer("id").notNull().unique(),
	title: text("title").notNull(),
	release_date: text("release_date").notNull(),
	poster_path: text("poster_path").notNull(),
});
export type Movie = InferSelectModel<typeof favoriteMovies>;
export const insertMovieSchema = createInsertSchema(favoriteMovies, {
	id: z.coerce.number(),
});
```

```ts
app.post("/favorite", zValidator("form", insertMovieSchema), async (c) => {
	const movie = c.req.valid("form");

	await db.insert(favoriteMovies).values(movie);
	return c.html(<MovieItem movie={movie} favorited={true} remove={false} />);
});
```

Using `zValidator` , it will automatically parse the form data and return an error if it's wrong. You can validator other parts of the request too—queries, params, json body, headers, etc.

If that's too perfect, you can write a custom validator function to have more control:

```ts
const searchSchema = z.object({
	search: z.string(),
});
app.post(
	"/search",
	validator("form", (value, c) => {
		const parsed = searchSchema.safeParse(value);
		if (!parsed.success) {
			return c.text("Invalid!", 401);
		}
		return parsed.data;
	}),
	async (c) => {
		const { search } = c.req.valid("form");
		const results = await searchForMovie(search);
		const favorites = (await db.select().from(favoriteMovies)).map((r) => r.id);
		return c.html(<Search results={results} favorites={favorites} />);
	},
);
```

## HTMX

If you're not using [HTMX](https://htmx.org), what are you even doing with your life? Instead of a server sending JSON to your JS framework and making it figure out how to render the new data, send HTML. Lots of HTML or little bits of HTML, it's all good! Browsers are good at HTML. HTMX makes HTML more powerful. It reduces the amount of JS you need on the client by a lot. We want lots of JS on the server, not the client, the way Al Gore intended. Perfect.

Just like this, you can make a `DELETE` request and remove the DOM element if successful.

```ts
<button
		hx-delete={`/favorite/${movie.id}`}
		hx-target="closest li"
		hx-swap="delete"
		type="button"
	>
	Unfavorite
</button>
```

Don't shoot the messenger, but _sometimes_ JS on the client makes things better. We don't want too much though. That's why the perfect stack uses [AlpineJS](https://alpinejs.dev) when necessary. Making your HTML harder to read is a great deterrent to adding more JS. Little sprinkles is all you need. That is chef's kiss perfection right there.

What about styles? Add [PicoCSS](https://picocss.com) and never look back. Never think about CSS again. What's that? You _do_ want to think about CSS? Then use [Open Props](https://open-props.style) so you don't have to think too much.

## The Perfect Stack

So there we have it—the perfect stack. Never thought I'd live to see the day, but sure am glad I did before the AIs took over. I've been using it for well over 2 days now and have had zero problems, because it's perfect.

To summarize:
- Bun
	- SQLite
- Hono
	- JSX
	- Drizzle ORM
	- Zod
- HTMX
- Alpine.js
- PicoCSS

If you want to see more or give it a try, check out the [repo](https://github.com/samwarnick/the-perfect-stack-demo).

If this doesn't sound perfect to you, you're wrong, but just use Astro. Less perfect, but probably good enough for what you're doing.

P.S. Why is GitHub's default tab spacing eight spaces!?
![Screenshot of GitHub appearance preferences showing default tab width of 8 spaces](https://samwarnick.com/media/2024-04-05-github-tab-width.png)
