import app from './app.js';
import { config } from './config/config.js';

// Start the server
const port = config.port;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
