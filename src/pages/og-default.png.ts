import fs from 'node:fs/promises';
import path from 'node:path';
import type { APIRoute } from 'astro';
import satori from 'satori';
import sharp from 'sharp';

export const prerender = true;

export const GET: APIRoute = async () => {
  const [fraunces500, jakarta400, jakarta500, fragment400] = await Promise.all([
    fs.readFile(path.resolve('node_modules/@fontsource/fraunces/files/fraunces-latin-500-normal.woff')),
    fs.readFile(path.resolve('node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-400-normal.woff')),
    fs.readFile(path.resolve('node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-500-normal.woff')),
    fs.readFile(path.resolve('node_modules/@fontsource/fragment-mono/files/fragment-mono-latin-400-normal.woff')),
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
        padding: '62px 70px 56px',
        background: '#faf9f5',
        color: '#111827',
        fontFamily: 'Plus Jakarta Sans',
        border: '1px solid #e8e3da',
      },
      children: [
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center', gap: '12px', fontSize: '22px', fontWeight: 500 },
                  children: [
                    { type: 'div', props: { style: { width: '12px', height: '12px', borderRadius: '999px', background: '#ae4017' } } },
                    { type: 'div', props: { children: 'Eric Hare' } },
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: { color: '#ae4017', fontFamily: 'Fragment Mono', fontSize: '14px', letterSpacing: '2px' },
                  children: 'SOFTWARE ENGINEER · STATISTICIAN',
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1000px' },
            children: [
              {
                type: 'div',
                props: {
                  style: { fontFamily: 'Fraunces', fontSize: '88px', fontWeight: 500, lineHeight: 0.98, letterSpacing: '-3px' },
                  children: 'Useful software. Thoughtful consulting.',
                },
              },
              {
                type: 'div',
                props: {
                  style: { maxWidth: '900px', color: '#4b5563', fontSize: '25px', lineHeight: 1.45 },
                  children: 'JEStats co-founder · Software engineer · Statistician',
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '20px',
              borderTop: '1px solid #cbc5ba',
              color: '#626b78',
              fontFamily: 'Fragment Mono',
              fontSize: '14px',
              letterSpacing: '1px',
            },
            children: [
              { type: 'div', props: { children: 'ERICHARE.ME' } },
              { type: 'div', props: { children: 'JESTATS.IO · DATA · WEBSITES · AI' } },
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(element as any, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Fraunces', data: fraunces500, weight: 500, style: 'normal' },
      { name: 'Plus Jakarta Sans', data: jakarta400, weight: 400, style: 'normal' },
      { name: 'Plus Jakarta Sans', data: jakarta500, weight: 500, style: 'normal' },
      { name: 'Fragment Mono', data: fragment400, weight: 400, style: 'normal' },
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
