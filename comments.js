// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create web server
const app = express();

// Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
app.get('/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments.json');
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments.json');
      return;
    }

    const comments = JSON.parse(data);
    comments.push(req.body);

    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
      if (err) {
        res.status(500).send('Error writing comments.json');
        return;
      }

      res.send('Comment added');
    });
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
