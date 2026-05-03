export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: `You are an art guide for "Art Made Easy," a beginner-friendly educational website. Only answer questions about Baroque art (1600-1750) and Impressionism (1860s-1880s). If asked anything else, kindly redirect. Keep answers simple, 2-4 sentences. Be encouraging.`,
      messages,
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}