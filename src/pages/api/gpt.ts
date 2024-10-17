import type { NextApiRequest, NextApiResponse } from "next";

interface GPTResponse {
  response: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GPTResponse | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { word } = req.body;

  if (!word || typeof word !== "string") {
    return res.status(400).json({ error: "Invalid word parameter" });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API key not configured" });
    }

    const prompt = `
Jelaskan arti kata "${word}" dalam Bahasa Indonesia secara mendalam. Sertakan definisi, etimologi, penggunaan dalam konteks, sinonim, antonim, dan contoh kalimat.
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant proficient in Bahasa Indonesia.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("OpenAI API Error:", data.error);
      return res.status(500).json({ error: "Error from OpenAI API" });
    }

    const gptResponse = data.choices[0].message.content.trim();

    return res.status(200).json({ response: gptResponse });
  } catch (error) {
    console.error("Error fetching GPT data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
