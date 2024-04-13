// backend/src/server.js

const http = require('http');
const startServer = require('./app');

const PORT = process.env.PORT || 4000;

startServer().then(app => {
  const httpServer = http.createServer(app);
  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
