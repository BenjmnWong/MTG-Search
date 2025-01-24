const express = require('express');
const fetch = require('node-fetch'); // For server-side HTTP requests
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// Route to search cards on Scryfall
app.get('/search', async (req, res) => {
    const cardName = req.query.name; // Get the card name from the URL query
    
    try {
        // Make the request to Scryfall API from the server-side
        const response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${cardName}`);
        const data = await response.json();

        if (response.ok) {
            res.json(data); // Send data back to the front-end
        } else {
            res.status(response.status).json({ error: data });
        }
    } catch (error) {
        console.error('Error fetching card data:', error);
        res.status(500).json({ error: 'Failed to fetch card data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
