const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));
app.get('/', (req, res) => {
  res.sendFile(publicDir + '/html/index.html');
});
app.listen(PORT, () => console.log(`Server up on port: ${PORT}`));
