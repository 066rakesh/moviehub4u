/* global process */
import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL }));

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: process.env.TMDB_API_KEY },
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/tmdb", async (req, res) => {
  try {
    const response = await tmdb.get(req.path, { params: req.query });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
