const app = require("./server"); // Import the app from server.js

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running locally on port ${PORT}`);
});
