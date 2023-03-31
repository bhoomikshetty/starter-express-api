const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/submit', (req, res) => {
  const formData = req.body;
  console.log(formData);
  res.send('Form submitted successfully!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
