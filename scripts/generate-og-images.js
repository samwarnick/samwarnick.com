import {readFile, writeFile} from "node:fs/promises";
import {Resvg} from "@resvg/resvg-js";
import {extname, join} from "node:path";
import {existsSync, mkdirSync} from "node:fs";

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
const FONT = join(FONTS_PATH, 'Calistoga-Regular.ttf');

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

function generateSvg(title, dataUrl) {
	let fontSize = 100;
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
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
  
  <image href="${dataUrl}" width="1200" height="630" preserveAspectRatio="xMidYMid slice"/>
  
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

async function generatePng(title, backgroundImage) {
	const defaultBackgroundImageName = DEFAULT_BACKGROUNDS[Math.floor(Math.random() * DEFAULT_BACKGROUNDS.length)];
	const backgroundImageName = backgroundImage || defaultBackgroundImageName;
	const backgroundImagePath = join(MEDIA_PATH, backgroundImageName);
	const fallbackImagePath = join(MEDIA_PATH, defaultBackgroundImageName);
	const dataUrl = await fileToDataURL(backgroundImagePath, fallbackImagePath);

	const opts = {
		font: {
			fontFiles: [FONT],
			loadSystemFonts: false,
		},
	}
	const resvg = new Resvg(generateSvg(title, dataUrl), opts);
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