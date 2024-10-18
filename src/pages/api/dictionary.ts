import type { NextApiRequest, NextApiResponse } from "next";
import { DictionaryResponse, KBBIAPIResponse } from '@/types/dictionary';

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
    // Fetch definition from KBBI API
    const response = await fetch(
      `https://x-labs.my.id/api/kbbi/search/${word}`
    );

    if (!response.ok) {
      console.error(`KBBI API responded with status ${response.status}`);
      return res.status(502).json({ error: "Failed to fetch data from KBBI API" });
    }

    const data: KBBIAPIResponse = await response.json();

    if (!data.success || !data.data || data.data.length === 0) {
      return res.status(404).json({ error: "Word not found in KBBI" });
    }

    // Assuming the first entry is the most relevant
    const entry = data.data[0];
    const definition = entry.arti.map((art) => art.deskripsi).join(" ");

    return res.status(200).json({ word: entry.lema, definition });
  } catch (error) {
    console.error("Error fetching dictionary data from KBBI API:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}