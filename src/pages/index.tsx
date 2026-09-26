import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function Home(): ReactNode {
  return (
    <Layout
      title="Home"
      description="Documentation for the Coralbay Open Data Standard, a fictitious API standard for consumer data sharing.">
      <main className="container margin-vert--xl">
        <Heading as="h1">Coralbay Open Data Standard</Heading>
        <p>
          A worked example of an API standard for consumer data sharing. It uses
          OpenAPI documents, OpenAPI Overlays, Arazzo workflows, contract
          documentation and Mermaid diagrams, all built around one use case.
        </p>
        <div className="disclaimer" role="note">
          <strong>Fictitious example.</strong> Every organisation, person,
          product and value on this site is invented. This site is not an
          official publication of the Data Standards Body, the Treasury, or any
          other body. Any match with a real organisation is a coincidence.
        </div>
        <Link className="button button--primary button--lg" to="/docs/intro">
          Start with the introduction
        </Link>
      </main>
    </Layout>
  );
}
