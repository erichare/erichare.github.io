export const SITE = {
  name: 'Eric Hare',
  title: 'Eric Hare — Software Engineer & Data Scientist',
  description:
    'Software engineer at IBM working on Developer and Operator Experience. PhD in Statistics & Computer Science from Iowa State. Langflow maintainer, R package author, forensic statistics researcher.',
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
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/publications', label: 'Publications' },
  { href: '/cv', label: 'CV' },
  { href: '/blog', label: 'Writing' },
  { href: '/now', label: 'Now' },
] as const;
