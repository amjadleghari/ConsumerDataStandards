# Contributing

Thank you for helping with the Coralbay Open Data Standard documentation. Every
organisation, person and value in this repository is fictitious. Keep new
content fictitious too, and use `example.com` hosts.

## Set up

```bash
npm ci
npm start
```

The site opens at `http://localhost:3000/ConsumerDataStandards/`. Node.js 20
or later is required.

## Before you open a pull request

```bash
npm run validate
npm run test:unit
npm run build
npm run test:render
```

CI runs the same commands on every pull request into `dev` or `main`.

## Branches

Cut a `feat/<name>` branch from `dev`, and open the pull request into `dev`.
Releases go from `dev` into `main`.

## Guides

The site's **Maintain** section explains how to add an API, an overlay, an
Arazzo workflow or a diagram, and how releases and deployment work. The source
is in `docs/maintain/`.
