import {readFile, writeFile} from "node:fs/promises";
import {Resvg} from "@resvg/resvg-js";
import {extname, join} from "node:path";
import {existsSync, mkdirSync} from "node:fs";
import sharp from "sharp";

const SITE_BASE_PATH = join(process.cwd(), "_site");
const FONTS_PATH =  join(SITE_BASE_PATH, "assets/fonts");
const MEDIA_PATH =  join(SITE_BASE_PATH, "media");
const OUTPUT = join(MEDIA_PATH, "og-img");

const DEFAULT_BACKGROUNDS = [
	"og-img-bg/1.jpg",
	"og-img-bg/2.jpg",
	"og-img-bg/3.jpg",
	"og-img-bg/4.jpg",
	"og-img-bg/5.jpg",
	"og-img-bg/6.jpg",
	"og-img-bg/7.jpg",
	"og-img-bg/8.jpg",
	"og-img-bg/9.jpg",
	"og-img-bg/10.jpg",
	"og-img-bg/11.jpg",
	"og-img-bg/12.jpg",
];
const FONT = join(FONTS_PATH, 'LeagueSpartan-ExtraBold.ttf');

const HALFTONE = {
	dotSpacing: 8,
	paperColor: '#faf4ed',
	contrast: 0.8,
	// Traditional CMYK halftone screen angles
	// Ordered K→C→M→Y (print order: black first, yellow last)
	channels: [
		{key: 'k', angle: 45, color: '#000000'},
		{key: 'c', angle: 15, color: '#00ffff'},
		{key: 'm', angle: 75, color: '#ff00ff'},
		{key: 'y', angle: 0, color: '#ffff00'},
	],
};

function rgbToCmyk(r, g, b, contrast) {
	let rf = Math.max(0, Math.min(1, ((r / 255) - 0.5) * contrast + 0.5));
	let gf = Math.max(0, Math.min(1, ((g / 255) - 0.5) * contrast + 0.5));
	let bf = Math.max(0, Math.min(1, ((b / 255) - 0.5) * contrast + 0.5));

	const k = 1 - Math.max(rf, gf, bf);
	if (k >= 1) return {c: 0, m: 0, y: 0, k: 1};

	const inv = 1 / (1 - k);
	return {
		c: (1 - rf - k) * inv,
		m: (1 - gf - k) * inv,
		y: (1 - bf - k) * inv,
		k,
	};
}

async function generateHalftoneGroups(imagePath, fallbackPath, width, height) {
	const {dotSpacing, contrast, channels} = HALFTONE;

	let pixelData;
	try {
		pixelData = await sharp(imagePath)
			.resize(width, height, {fit: 'cover'})
			.ensureAlpha()
			.raw()
			.toBuffer({resolveWithObject: true});
	} catch (err) {
		if (fallbackPath && fallbackPath !== imagePath) {
			console.warn(`Halftone: failed to read "${imagePath}", using fallback`);
			pixelData = await sharp(fallbackPath)
				.resize(width, height, {fit: 'cover'})
				.ensureAlpha()
				.raw()
				.toBuffer({resolveWithObject: true});
		} else {
			throw err;
		}
	}

	const {data} = pixelData;
	const maxRadius = dotSpacing * 0.5;
	const diag = Math.sqrt(width * width + height * height);
	const halfDiag = diag / 2;
	const cx = width / 2;
	const cy = height / 2;

	const groups = [];

	for (const {key, angle, color} of channels) {
		const rad = angle * Math.PI / 180;
		const cos = Math.cos(rad);
		const sin = Math.sin(rad);
		const dots = [];

		for (let gy = -halfDiag; gy < halfDiag; gy += dotSpacing) {
			for (let gx = -halfDiag; gx < halfDiag; gx += dotSpacing) {
				// Rotate grid point into image space
				const ix = cx + gx * cos - gy * sin;
				const iy = cy + gx * sin + gy * cos;

				const px = Math.round(ix);
				const py = Math.round(iy);
				if (px < 0 || px >= width || py < 0 || py >= height) continue;

				const idx = (py * width + px) * 4;
				const r = data[idx];
				const g = data[idx + 1];
				const b = data[idx + 2];
				const a = data[idx + 3] / 255;

				const cmyk = rgbToCmyk(r, g, b, contrast);
				const value = cmyk[key] * a;

				if (value < 0.03) continue;

				// sqrt for perceptual scaling (area proportional to value)
				const radius = maxRadius * Math.sqrt(value);
				if (radius < 0.3) continue;

				dots.push(`<circle cx="${ix.toFixed(1)}" cy="${iy.toFixed(1)}" r="${radius.toFixed(1)}"/>`);
			}
		}

		groups.push(`  <g fill="${color}" style="mix-blend-mode: multiply" opacity="0.3">\n    ${dots.join('\n    ')}\n  </g>`);
	}

	return groups.join('\n');
}

function wrapText(text, maxWidth = 1040, fontSize = 100) {
	const words = text.split(' ');
	const lines = [];
	let currentLine = '';

	// Rough estimation: ~0.6 * fontSize per character for Calistoga
	const charWidth = fontSize * 0.6;

	for (const word of words) {
		const testLine = currentLine ? `${currentLine} ${word}` : word;
		const testWidth = testLine.length * charWidth;

		if (testWidth > maxWidth && currentLine) {
			lines.push(currentLine);
			currentLine = word;
		} else {
			currentLine = testLine;
		}
	}

	if (currentLine) {
		lines.push(currentLine);
	}

	return lines;
}

function escapeXml(text) {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

async function fileToDataURL(filePath, fallbackImagePath) {
	const ext = extname(filePath).slice(1);
	const mimeType = `image/${ext === 'jpg' ? 'jpeg' : ext}`;
	let fileData;
	try {
		fileData = await readFile(filePath);
	} catch (error) {
		if (fallbackImagePath !== filePath) {
			console.warn(`Failed to read file "${filePath}":`, error);
			fileData = await readFile(fallbackImagePath);
		} else {
			throw error;
		}
	}
	const base64Data = fileData.toString('base64');
	return `data:${mimeType};base64,${base64Data}`;
}

function generateSvg(title, halftoneGroups, dataUrl) {
	let fontSize = 90;
	let lines = wrapText(title, 1040, fontSize);

	while (lines.length > 2 && fontSize > 60) {
		fontSize -= 5;
		lines = wrapText(title, 1040, fontSize);
	}

	const lineHeight = fontSize * 1.1;
	const totalHeight = lines.length * lineHeight;
	const startY = 630 - 80 - totalHeight + fontSize; // 80px bottom padding

	const tspans = lines
		.map((line, i) => {
			const y = startY + (i * lineHeight);
			return `<tspan x="80" y="${y}">${escapeXml(line)}</tspan>`;
		})
		.join('\n    ');

	return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:transparent;stop-opacity:0" />
      <stop offset="70%" style="stop-color:transparent;stop-opacity:0" />
      <stop offset="100%" style="stop-color:black;stop-opacity:1" />
    </linearGradient>
    <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="12"/>
      <feOffset dx="0" dy="0" result="offsetblur"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="1"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect width="1200" height="630" fill="${HALFTONE.paperColor}"/>
  <image href="${dataUrl}" width="1200" height="630" preserveAspectRatio="xMidYMid slice" opacity="0.9"/>
${halftoneGroups}

  <rect width="1200" height="630" fill="#575279" opacity="0.5" style="mix-blend-mode: overlay"/>

  <rect width="1200" height="630" fill="url(#gradient)"/>

  <text
    font-family="Calistoga"
    font-size="${fontSize}"
    fill="#faf4ed"
    filter="url(#textShadow)">
    ${tspans}
  </text>
</svg>`;
}

async function generatePng(title, backgroundImage) {
	const defaultBackgroundImageName = DEFAULT_BACKGROUNDS[Math.floor(Math.random() * DEFAULT_BACKGROUNDS.length)];
	const backgroundImageName = backgroundImage || defaultBackgroundImageName;
	const backgroundImagePath = join(MEDIA_PATH, backgroundImageName);
	const fallbackImagePath = join(MEDIA_PATH, defaultBackgroundImageName);

	const [halftoneGroups, dataUrl] = await Promise.all([
		generateHalftoneGroups(backgroundImagePath, fallbackImagePath, 1200, 630),
		fileToDataURL(backgroundImagePath, fallbackImagePath),
	]);

	const opts = {
		font: {
			fontFiles: [FONT],
			loadSystemFonts: false,
		},
	}
	const resvg = new Resvg(generateSvg(title, halftoneGroups, dataUrl), opts);
	const pngData = resvg.render();
	return pngData.asPng();
}

export async function generateOgImages(manifest) {
	mkdirSync(OUTPUT, {recursive: true});

	for (const page of manifest) {
		const pageHash = page.hash;

		if (!existsSync(join(OUTPUT, `${pageHash}.png`))) {
			try {
				console.log(`Generating image for "${page.title}"...`);
				const png = await generatePng(page.title, page.backgroundImage, pageHash);
				await writeFile(join(OUTPUT, `${pageHash}.png`), png);
			} catch (error) {
				console.error(`Failed to generate image for "${page.title}":`, error);
			}
		}
	}
	console.log("Done generating images!");
}
