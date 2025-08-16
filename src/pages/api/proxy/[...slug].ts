import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/${(slug as string[]).join('/')}`;

  try {
    const backendResponse = await fetch(backendUrl, {
      method: req.method,
      headers: {
        Cookie: req.headers.cookie || '',
        'Content-Type': 'application/json'
      },
      body:
        req.method !== 'GET' && req.method !== 'HEAD'
          ? JSON.stringify(req.body)
          : undefined
    });

    const contentType = backendResponse.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await backendResponse.json();
    } else {
      data = await backendResponse.text();
    }

    const setCookieHeaders = (backendResponse.headers as any).getSetCookie();
    if (setCookieHeaders && setCookieHeaders.length > 0) {
      res.setHeader('Set-Cookie', setCookieHeaders);
    }

    res.status(backendResponse.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(502).json({ message: 'Error proxying to the backend API.' });
  }
}
