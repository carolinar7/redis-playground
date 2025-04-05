import express from 'express';

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Example endpoint
app.post('/api/data', (req, res) => {
  try {
    const data = req.body;
    res.json({
      message: 'Data received successfully',
      data
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
