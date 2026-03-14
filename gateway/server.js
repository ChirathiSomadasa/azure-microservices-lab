const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Gateway Service is running!',
    status: 'ok',
    version: '1.0.0'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/services', (req, res) => {
  res.json({
    services: [
      { name: 'Gateway',  status: 'running', port: 3000 },
      { name: 'Frontend', status: 'running', port: 80   }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});
