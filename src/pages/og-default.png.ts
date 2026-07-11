import fs from 'node:fs/promises';
import path from 'node:path';
import type { APIRoute } from 'astro';
import satori from 'satori';
import sharp from 'sharp';

export const prerender = true;

export const GET: APIRoute = async () => {
  const [newsreader500, plexSans400, plexSans500, plexMono500] = await Promise.all([
    fs.readFile(path.resolve('node_modules/@fontsource/newsreader/files/newsreader-latin-500-normal.woff')),
    fs.readFile(path.resolve('node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff')),
    fs.readFile(path.resolve('node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-500-normal.woff')),
    fs.readFile(path.resolve('node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff')),
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
        background: '#f5f2ea',
        color: '#172019',
        fontFamily: 'IBM Plex Sans',
        border: '1px solid #d8d9d2',
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
                    { type: 'div', props: { style: { width: '12px', height: '12px', borderRadius: '999px', background: '#235e45' } } },
                    { type: 'div', props: { children: 'Eric Hare' } },
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: { color: '#235e45', fontFamily: 'IBM Plex Mono', fontSize: '14px', letterSpacing: '2px' },
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
                  style: { fontFamily: 'Newsreader', fontSize: '88px', fontWeight: 500, lineHeight: 0.98, letterSpacing: '-3px' },
                  children: 'I build tools for decisions you can inspect.',
                },
              },
              {
                type: 'div',
                props: {
                  style: { maxWidth: '900px', color: '#4f5d54', fontSize: '25px', lineHeight: 1.45 },
                  children: 'Core Langflow maintainer at IBM · Creator of Verity and Aeroza',
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
              borderTop: '1px solid #b9c0b8',
              color: '#6b776f',
              fontFamily: 'IBM Plex Mono',
              fontSize: '14px',
              letterSpacing: '1px',
            },
            children: [
              { type: 'div', props: { children: 'ERICHARE.ME' } },
              { type: 'div', props: { children: 'AGENTS · DATA · EVIDENCE' } },
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
      { name: 'Newsreader', data: newsreader500, weight: 500, style: 'normal' },
      { name: 'IBM Plex Sans', data: plexSans400, weight: 400, style: 'normal' },
      { name: 'IBM Plex Sans', data: plexSans500, weight: 500, style: 'normal' },
      { name: 'IBM Plex Mono', data: plexMono500, weight: 500, style: 'normal' },
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
