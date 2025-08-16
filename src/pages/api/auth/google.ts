import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body),
        credentials: 'include' // not necessary here, since this is server-side
      }
    );

    const data = await backendResponse.json();

    // Relay cookies from backend to client
    const setCookie = backendResponse.headers.get('set-cookie');
    if (setCookie) {
      res.setHeader('Set-Cookie', setCookie);
    }

    return res.status(backendResponse.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
