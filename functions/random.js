const STATIC_SITE_URL = 'https://samwarnick.com';

export default async (req) => {
	if (req.method !== 'GET') {
		return new Response('Method not allowed', { status: 405 });
	}
	const response = await fetch(`${STATIC_SITE_URL}/feed.json`);
	const data = await response.json();
	const randomIndex = Math.floor(Math.random() * data.items.length);
	const randomUrl = data.items[randomIndex].url;
	console.log(randomUrl)
	return new Response(`Redirecting to ${randomUrl}...`, {
		status: 302,
		headers: {
			Location: randomUrl,
		}
	});
}