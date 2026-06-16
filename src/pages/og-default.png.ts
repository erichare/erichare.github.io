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
  const [plexMono500, plexMono600, plexSans400] = await Promise.all([
    loadFont(
      'https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-500-normal.ttf'
    ),
    loadFont(
      'https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-600-normal.ttf'
    ),
    loadFont(
      'https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-sans@latest/latin-400-normal.ttf'
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
        background: 'linear-gradient(135deg, #0b0f0d 0%, #0e1512 100%)',
        color: '#e3ece5',
        fontFamily: 'IBM Plex Sans',
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
                    background: '#4ad07f',
                    borderRadius: '9999px',
                    boxShadow: '0 0 32px #4ad07f',
                  },
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '22px',
                    color: '#4ad07f',
                    letterSpacing: '4px',
                    fontFamily: 'IBM Plex Mono',
                    fontWeight: 600,
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
                  style: { display: 'flex', alignItems: 'center', gap: '20px' },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontFamily: 'IBM Plex Mono',
                          fontSize: '96px',
                          fontWeight: 500,
                          lineHeight: 1.05,
                          letterSpacing: '-0.02em',
                        },
                        children: 'Eric Hare',
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          width: '24px',
                          height: '80px',
                          background: '#4ad07f',
                          boxShadow: '0 0 28px #4ad07f',
                        },
                      },
                    },
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '34px',
                    color: '#93a89a',
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
              color: '#5f7066',
              fontFamily: 'IBM Plex Mono',
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
      { name: 'IBM Plex Mono', data: plexMono500, weight: 500, style: 'normal' },
      { name: 'IBM Plex Mono', data: plexMono600, weight: 600, style: 'normal' },
      { name: 'IBM Plex Sans', data: plexSans400, weight: 400, style: 'normal' },
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
