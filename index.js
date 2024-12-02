const express = require("express");
require("dotenv").config();
const ReversoAPI = require("reverso-api"); // Correct import for ReversoAPI class
const cors = require("cors");
const app = express();

// Initialize ReversoAPI instance
const reverso = new ReversoAPI();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Middleware to handle JSON requests
app.use(express.json());

// Endpoint to get translation
app.post("/translate", async (req, res) => {
  const { text, fromLang, toLang } = req.body;

  if (!text || !fromLang || !toLang) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    // Call getTranslation method
    const translation = await reverso.getTranslation(text, fromLang, toLang);
    res.json({ translation });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while translating" });
  }
});

// Endpoint to get context for a word or phrase
app.post("/context", async (req, res) => {
  const { text, fromLang, toLang } = req.body;

  if (!text || !fromLang || !toLang) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    // Call getContext method
    const translation = await reverso.getContext(text, fromLang, toLang);
    res.json({ translation });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while translating" });
  }
});

// Endpoint to get spell check suggestions
app.post("/spellcheck", async (req, res) => {
  const { text, lang } = req.body;

  if (!text || !lang) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    // Call getSpellCheck method
    const spellCheck = await reverso.getSpellCheck(text, lang);
    res.json({ spellCheck });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while checking spelling" });
  }
});

// Endpoint to get synonyms for a word
app.post("/synonyms", async (req, res) => {
  const { word, lang } = req.body;

  if (!word || !lang) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    // Call getSynonyms method
    const synonyms = await reverso.getSynonyms(word, lang);
    res.json({ synonyms });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while getting synonyms" });
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.HOST}:${process.env.PORT}`);
});
