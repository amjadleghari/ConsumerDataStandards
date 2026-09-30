# Changelog

All notable changes to this project are recorded here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-09-26

### Added

- Docusaurus documentation site for the fictitious Coralbay Open Data Standard.
- OpenAPI 3.1 documents for the Common, Banking and Consent APIs, linted with
  Redocly CLI.
- Two OpenAPI Overlays (data recipient edition, sandbox edition), with a check
  that each overlay had its effect.
- Three Arazzo 1.0.1 workflows, executed against Prism mocks of the sandbox
  edition.
- Generated API reference pages and generated workflow pages that link each
  workflow step to its operation.
- Use case, standards, contract and architecture pages, with Mermaid diagrams
  including `architecture-beta`.
- Render tests that check every Mermaid diagram in a browser.
- CI on pull requests into `dev` and `main`, and deployment to GitHub Pages
  from `main`.
- Maintainer guide in the site's Maintain section and in `CONTRIBUTING.md`.
