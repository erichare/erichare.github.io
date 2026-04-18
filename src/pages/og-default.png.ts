import type { APIRoute } from 'astro';
import satori from 'satori';
import sharp from 'sharp';

export const prerender = true;

async function loadFont(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch font ${url}: ${res.status}`);
  return res.arrayBuffer();
}

export const GET: APIRoute = async () => {
  const [inter500, inter700, newsreader500] = await Promise.all([
    loadFont(
      'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-500-normal.ttf'
    ),
    loadFont(
      'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf'
    ),
    loadFont(
      'https://cdn.jsdelivr.net/fontsource/fonts/newsreader@latest/latin-500-normal.ttf'
    ),
  ]);

  const element = {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '88px 92px',
        background:
          'linear-gradient(135deg, #0d121b 0%, #16202c 100%)',
        color: '#f3f7fa',
        fontFamily: 'Inter',
      },
      children: [
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', gap: '14px' },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    width: '14px',
                    height: '14px',
                    background: '#4fd3e6',
                    borderRadius: '9999px',
                    boxShadow: '0 0 32px #4fd3e6',
                  },
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '22px',
                    color: '#4fd3e6',
                    letterSpacing: '4px',
                    fontWeight: 700,
                  },
                  children: 'ERICHARE.ME',
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: '24px' },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontFamily: 'Newsreader',
                    fontSize: '104px',
                    fontWeight: 500,
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                    maxWidth: '1000px',
                  },
                  children: 'Eric Hare',
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '34px',
                    color: '#a8b5c4',
                    lineHeight: 1.35,
                    maxWidth: '960px',
                  },
                  children:
                    'Software Engineer at IBM — Langflow, enterprise AI agent tooling, statistical graphics, forensic statistics.',
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              fontSize: '22px',
              color: '#6b7a8c',
              fontFamily: 'Inter',
              letterSpacing: '0.03em',
            },
            children: 'github.com/erichare · erichare.me',
          },
        },
      ],
    },
  };

  const svg = await satori(element as any, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Inter', data: inter500, weight: 500, style: 'normal' },
      { name: 'Inter', data: inter700, weight: 700, style: 'normal' },
      { name: 'Newsreader', data: newsreader500, weight: 500, style: 'normal' },
    ],
  });

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
