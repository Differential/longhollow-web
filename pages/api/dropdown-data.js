import { initializeApollo } from 'lib/apolloClient';
import getDropdownData from 'utils/getDropdownData';

const CACHE_TTL_MS = 5 * 60 * 1000;

let cachedDropdownData = null;
let cachedAt = 0;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  res.setHeader(
    'Cache-Control',
    'public, max-age=0, s-maxage=300, stale-while-revalidate=3600'
  );

  if (cachedDropdownData && Date.now() - cachedAt < CACHE_TTL_MS) {
    return res.status(200).json(cachedDropdownData);
  }

  try {
    const apolloClient = initializeApollo();
    const data = await getDropdownData(apolloClient);

    cachedDropdownData = data;
    cachedAt = Date.now();

    return res.status(200).json(data);
  } catch (error) {
    if (cachedDropdownData) {
      return res.status(200).json(cachedDropdownData);
    }

    return res.status(500).json({ error: 'Failed to load dropdown data' });
  }
}
