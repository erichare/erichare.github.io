# Security Policy

## Supported Versions

This repository hosts the source for a personal website deployed via GitHub Pages.
Only the current `main` branch is supported; older commits and tags do not receive
security updates.

| Version       | Supported |
| ------------- | --------- |
| `main` (live) | ✅        |
| Anything else | ❌        |

## Reporting a Vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Instead, report privately via one of:

1. **GitHub Private Vulnerability Reporting** — preferred.
   Go to the [Security tab](https://github.com/erichare/erichare.github.io/security/advisories/new)
   and click **Report a vulnerability**.
2. **Email** — `ericrhare@gmail.com` with subject line
   `[SECURITY] erichare.github.io: <short description>`.

Please include:

- A description of the issue and its potential impact.
- Steps to reproduce (URL, payload, browser, etc.).
- Any relevant logs, screenshots, or proof-of-concept code.
- Your name/handle if you'd like to be credited in the fix.

## Response Expectations

- **Acknowledgement:** within 3 business days.
- **Initial assessment:** within 7 business days.
- **Fix or mitigation:** timeline depends on severity; critical issues will
  be prioritized. You will receive updates until the report is resolved.

## Scope

**In scope:**

- The deployed site at `https://erichare.github.io` and any subpaths.
- Source code in this repository that ships to production (under `src/`,
  `public/`, `astro.config.*`, GitHub Actions workflows in `.github/workflows/`).

**Out of scope:**

- Archived/legacy code under `src-legacy/` that is not built or deployed.
- Third-party services linked from the site (GitHub, social media, etc.).
- Denial-of-service attacks, social engineering, or physical attacks.
- Findings that require a compromised device or browser extension.
- Missing best-practice headers on a purely static site where no meaningful
  impact can be demonstrated (please include a concrete exploit).

## Safe Harbor

Good-faith security research conducted consistent with this policy will not
be pursued as a violation of the Computer Fraud and Abuse Act or equivalent
laws. Please avoid privacy violations, data destruction, and service
degradation during testing; give us reasonable time to remediate before any
public disclosure.

## Credit

With your permission, researchers who responsibly disclose valid issues will
be credited in the commit or release notes for the fix.
