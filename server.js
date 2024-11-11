const express = require('express');
const app = express();
const PORT = 3000;

// SSE endpoint
app.get('/events', (req, res) => {
  // Set headers to keep the connection open
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send a message to the client every 5 seconds
  const sendEvent = () => {
    const data = {
      message: 'Hello, this is a server-sent event!',
      timestamp: new Date().toISOString()
    };
    res.write(`data: ${JSON.stringify(data)}\n\n`);// adding double line break is an SSE syntax
  };

  // Initial event to ensure connection is open
  sendEvent();

  // Send events every 5 seconds
  const intervalId = setInterval(sendEvent, 5000);

  // Clean up when the connection is closed
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
