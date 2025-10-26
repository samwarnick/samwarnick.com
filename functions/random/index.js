import {createServer} from 'http';

const port = process.env.PORT || 3000;
const STATIC_SITE_URL = 'https://samwarnick.com';
const CACHE_DURATION = 5 * 60 * 1000;

let feedCache = null;
let lastFetch = 0;

async function getFeed() {
	const now = Date.now();

	if (!feedCache || now - lastFetch > CACHE_DURATION) {
		const response = await fetch(`${STATIC_SITE_URL}/feed.json`);
		if (!response.ok) throw new Error('Failed to fetch feed');
		feedCache = await response.json();
		lastFetch = now;
	}

	return feedCache;
}

const server = createServer(async (req, res) => {
	const url = new URL(req.url, `http://${req.headers.host}`);

	if (url.pathname === '/health') {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('OK');
		return;
	}

	try {
		const feed = await getFeed();

		if (!feed || !feed.items || feed.items.length === 0) {
			res.writeHead(503, { 'Content-Type': 'text/plain' });
			res.end('No posts available');
			return;
		}

		const randomIndex = Math.floor(Math.random() * feed.items.length);
		const randomPost = feed.items[randomIndex];

		res.writeHead(302, {
			'Location': randomPost.url,
			'Cache-Control': 'no-cache'
		});
		res.end('Redirecting to a random post...');

		console.log(`Redirecting to: ${randomPost.url}`);
	} catch (error) {
		console.error('Error:', error);
		res.writeHead(503, { 'Content-Type': 'text/plain' });
		res.end('Service temporarily unavailable');
	}
});

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

process.on('SIGTERM', () => {
	console.log('SIGTERM received, closing server...');
	server.close(() => {
		console.log('Server closed');
		process.exit(0);
	});
});