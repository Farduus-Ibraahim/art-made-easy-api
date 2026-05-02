{\rtf1\ansi\ansicpg1252\cocoartf2709
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 export default async function handler(req, res) \{\
  // Only allow POST requests\
  if (req.method !== 'POST') \{\
    return res.status(405).json(\{ error: 'Method not allowed' \});\
  \}\
\
  const \{ messages \} = req.body;\
\
  const response = await fetch('https://api.anthropic.com/v1/messages', \{\
    method: 'POST',\
    headers: \{\
      'Content-Type': 'application/json',\
      'x-api-key': process.env.ANTHROPIC_API_KEY,  // hidden on Vercel\
      'anthropic-version': '2023-06-01',\
    \},\
    body: JSON.stringify(\{\
      model: 'claude-sonnet-4-20250514',\
      max_tokens: 1000,\
      system: `You are an art guide for "Art Made Easy," a beginner-friendly educational website. Only answer questions about Baroque art (1600\'961750) and Impressionism (1860s\'961880s). If asked anything else, kindly redirect. Keep answers simple, 2\'964 sentences. Be encouraging \'97 visitors are beginners.`,\
      messages,\
    \}),\
  \});\
\
  const data = await response.json();\
  res.status(200).json(data);\
\}\
}