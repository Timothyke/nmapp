const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to run Nmap
app.post('/scan', (req, res) => {
    const { target } = req.body;

    if (!target) {
        return res.status(400).json({ error: "Target is required" });
    }

    // Run Nmap
    exec(`nmap ${target}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            return res.status(500).json({ error: stderr });
        }

        res.json({ output: stdout });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
