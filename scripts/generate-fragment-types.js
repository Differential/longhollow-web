const fs = require('fs');
const path = require('path');

const fetch = require('cross-fetch');
const { getIntrospectionQuery } = require('graphql');

const schemaUrl =
  process.env.APOLLO_SCHEMA_URL ||
  process.env.NEXT_PUBLIC_APOLLOS_API ||
  'https://longhollow-cdn.global.ssl.fastly.net';

const outputPath = path.join(
  __dirname,
  '..',
  'lib',
  'apolloClient',
  'fragmentTypes.json'
);

async function main() {
  const query = getIntrospectionQuery({ descriptions: false });
  const response = await fetch(schemaUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const bodyText = await response.text().catch(() => '');
    throw new Error(
      `Schema introspection failed (${response.status} ${response.statusText}). ${bodyText}`
    );
  }

  const payload = await response.json();
  if (payload.errors) {
    throw new Error(`Schema introspection errors: ${JSON.stringify(payload.errors)}`);
  }

  fs.writeFileSync(outputPath, `${JSON.stringify(payload.data, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${outputPath}`);
}

main().catch(error => {
  console.error('[generate-fragment-types]', error.message || error);
  process.exit(1);
});
