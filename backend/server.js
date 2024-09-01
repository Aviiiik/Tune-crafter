const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/musicapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema and model
const musicSchema = new mongoose.Schema({
  prompt: String,
  genre: String,
  duration: Number,
  review: String, // Added field for review
  rating: Number, // Added field for rating
});

const Music = mongoose.model("Music", musicSchema);

// POST endpoint to save data
app.post("/api/music", async (req, res) => {
  const { prompt, genre, duration, review, rating } = req.body; // Destructure review and rating

  try {
    const newMusic = new Music({ prompt, genre, duration, review, rating }); // Include review and rating
    await newMusic.save();
    console.log("Data saved to MongoDB:", newMusic); // Log the saved data
    res.status(201).json(newMusic);
  } catch (error) {
    console.error("Failed to save data:", error); // Log any errors
    res.status(500).json({ error: "Failed to save music data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
