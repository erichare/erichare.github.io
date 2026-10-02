export const SITE = {
  name: 'Eric Hare',
  title: 'Eric Hare — Software Engineer & Statistician',
  description:
    'Software engineer, statistician, and JEStats co-founder. Practical consulting and open developer tools for data, websites, and AI. Core Langflow maintainer at IBM.',
  studio: {
    name: 'JEStats',
    url: 'https://jestats.io/',
    contact: 'https://jestats.io/#contact-form',
  },
  url: 'https://erichare.me',
  author: 'Eric Hare',
  email: 'ericrhare@gmail.com',
  emailWork: 'eric.hare@ibm.com',
  locale: 'en_US',
  location: 'Lake Stevens, WA',
  social: {
    github: 'https://github.com/erichare',
    linkedin: 'https://www.linkedin.com/in/eric-h-15280938/',
    scholar:
      'https://scholar.google.com/citations?user=EHAreY8AAAAJ',
    orcid: 'https://orcid.org/0000-0002-4277-3146',
  },
} as const;

export const NAV = [
  { href: 'https://jestats.io/', label: 'JEStats' },
  { href: '/projects', label: 'Work' },
  { href: '/phd', label: 'Research' },
  { href: '/blog', label: 'Writing' },
  { href: '/about', label: 'About' },
  { href: '/cv', label: 'CV' },
] as const;
