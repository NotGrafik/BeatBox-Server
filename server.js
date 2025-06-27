import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

const sessions = {};

// Enregistrement d'une session : POST /register { code, ip }
app.post('/register', (req, res) => {
    const { code, ip } = req.body;
    if (!code || !ip) {
        return res.status(400).json({ error: 'Missing code or ip' });
    }

    sessions[code] = ip;
    console.log(`Registered session ${code} -> ${ip}`);
    res.json({ success: true });
});

// Récupération IP via code : GET /resolve/:code
app.get('/resolve/:code', (req, res) => {
    const ip = sessions[req.params.code];
    if (!ip) {
        return res.status(404).json({ error: 'Code not found' });
    }
    res.json({ ip });
});

app.listen(port, () => {
    console.log(`Session registry running on http://localhost:${port}`);
});

