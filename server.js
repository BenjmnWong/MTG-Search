const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/api/card", async (req, res) => {
    const { name } = req.query;
    try {
        const response = await axios.get(`https://api.scryfall.com/cards/named?fuzzy=${name}`);
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ error: "Card not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
