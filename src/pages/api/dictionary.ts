import type { NextApiRequest, NextApiResponse } from "next";

interface DictionaryResponse {
  word: string;
  definition: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DictionaryResponse | { error: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { word } = req.query;

  if (!word || typeof word !== "string") {
    return res.status(400).json({ error: "Invalid word parameter" });
  }

  try {
    // Fetch definition from Wiktionary API
    const response = await fetch(
      `https://id.wiktionary.org/w/api.php?action=query&titles=${encodeURIComponent(
        word
      )}&prop=extracts&exintro&explaintext&format=json&origin=*`
    );

    const data = await response.json();

    const pages = data.query.pages;
    const page = pages[Object.keys(pages)[0]];

    if (page.missing) {
      return res.status(404).json({ error: "Word not found" });
    }

    const definition = page.extract || "Definisi tidak tersedia.";

    return res.status(200).json({ word, definition });
  } catch (error) {
    console.error("Error fetching dictionary data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
