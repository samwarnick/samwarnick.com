import type { Context } from "@netlify/functions";
import { readFileSync } from 'fs';

export default async (req: Request, context: Context) => {
    const feedData = JSON.parse(readFileSync('./_site/feed.json', 'utf8'));
    const randomIndex = Math.floor(Math.random() * feedData.items.length);
    const randomPost = feedData.items[randomIndex];
    const redirectUrl = randomPost.url;

    return new Response("Redirecting to a random post...", {
        status: 302,
        headers: {
            Location: redirectUrl,
            'Cache-Control': 'no-cache'
        }})
};