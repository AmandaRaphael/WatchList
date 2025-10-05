// pages/api/movies/popular.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("✅ API route called: /api/movies/popular");
  const key = process.env.TMDB_API_KEY;
  if (!key) return res.status(500).json({ error: "Missing TMDB_API_KEY" });

  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  res.status(response.ok ? 200 : response.status).json(data);
}
