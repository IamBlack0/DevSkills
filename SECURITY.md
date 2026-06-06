# Security Policy

## Reporting a vulnerability

If you find a security vulnerability in DevSkills, do not open a public issue. Send a report to:

**security@devskills.me**

Include a description of the vulnerability, the steps to reproduce it, and the potential impact. You will receive a response within 72 hours.

## What counts as a security issue

- A skill in the catalog that contains malicious code or instructs users to run something harmful.
- An MCP entry pointing to a repository that has been compromised or is distributing malware.
- A vulnerability in the CLI tool itself that could allow code execution beyond what the user expects.
- An XSS or similar vulnerability in the web interface.

## What does not count as a security issue

- An MCP that requires an API key — this is disclosed in the entry itself.
- A skill that demonstrates a security pattern (like JWT authentication) using placeholder values.
- A dependency with a known CVE that does not affect this project's usage of it.

## Scope

The catalog (`content/`) is curated manually. Every MCP in the catalog includes a link to its source repository so users can inspect what they are installing before running it. DevSkills never installs or executes MCP tools automatically — it only displays information and copies commands to the clipboard.

The CLI tool reads local files and writes to the clipboard. It does not make network requests, store data remotely, or execute any code from the catalog.

## Dependencies

If you find a vulnerability in a dependency used by this project, open an issue in that dependency's repository. If the vulnerability directly affects how DevSkills uses that dependency, you can also report it here following the process above.
