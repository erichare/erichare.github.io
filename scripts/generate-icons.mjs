import satori from 'satori';
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

async function loadFont(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch font ${url}: ${res.status}`);
  return res.arrayBuffer();
}

const plexMono600 = await loadFont(
  'https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-600-normal.ttf'
);

function icon(size) {
  return {
    type: 'div',
    props: {
      style: {
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0e1512',
        borderRadius: `${Math.round(size * 0.22)}px`,
        overflow: 'hidden',
        position: 'relative',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                'radial-gradient(circle at 68% 30%, rgba(74,208,127,0.20), rgba(14,21,18,0) 60%)',
            },
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center' },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'IBM Plex Mono',
                    fontWeight: 600,
                    fontSize: `${Math.round(size * 0.52)}px`,
                    color: '#e3ece5',
                    lineHeight: 1,
                  },
                  children: 'e',
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    width: `${Math.round(size * 0.085)}px`,
                    height: `${Math.round(size * 0.4)}px`,
                    marginLeft: `${Math.round(size * 0.07)}px`,
                    background: '#4ad07f',
                  },
                },
              },
            ],
          },
        },
      ],
    },
  };
}

const targets = [
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
];

for (const { name, size } of targets) {
  const svg = await satori(icon(size), {
    width: size,
    height: size,
    fonts: [{ name: 'IBM Plex Mono', data: plexMono600, weight: 600, style: 'normal' }],
  });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  await writeFile(join(publicDir, name), png);
  console.log(`wrote ${name} (${size}x${size}, ${png.length} bytes)`);
}
