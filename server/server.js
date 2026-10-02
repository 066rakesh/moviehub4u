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

// Server chal raha hai ya nahi, ye check karne ke liye
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/tmdb", async (req, res) => {
  try {
    const response = await tmdb.get(req.path, { params: req.query });
    res.json(response.data);
  } catch (err) {
    console.log(err.message);
    res.status(err.response?.status || 500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
