import app from '@/app.js';
import { config } from '@raffle-tracker/config';

// Start the server
const port = config.apiPort;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
