const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, '../frontend')));

// Example route to get the list of countries (could be hardcoded or from a database/API)
app.get('/api/countries', (req, res) => {
    const countries = ['USA', 'Canada', 'India', 'Australia', 'Germany', 'France']; // Example list
    res.json(countries);
});

// Endpoint to check visa requirements
app.get('/api/check-visa', async (req, res) => {
    const { nationality, destination } = req.query;

    if (!nationality || !destination) {
        return res.status(400).json({ error: 'Missing required parameters.' });
    }

    try {
        // Example: Make a call to an external Visa API (VisaHQ or similar)
        const response = await axios.get(`https://api.visahq.com/visa-requirements?nationality=${nationality}&destination=${destination}`, {
            headers: {
                'Authorization': `Bearer ${process.env.VISA_API_KEY}`
            }
        });

        // Assuming response has a 'visaRequired' field
        const visaRequired = response.data.visaRequired;
        res.json({ isVisaRequired: visaRequired });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch visa requirement data.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Visa Checker app listening at http://localhost:${port}`);
});

