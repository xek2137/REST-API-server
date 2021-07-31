const express = require('express');
const path = require('path');
const db = require('./db');
const cors = require('cors');
const {v4: uuidv4} = require('uuid');

const app = express();

app.use(express.urlencoded({extended: false}));
// app.use(express.static(path.join()));
app.use(express.json());
app.use(cors());

app.get('/testimonials', (req, res) => res.json(db));

app.get('/testimonials/random', (req, res) => {
  const randomEl = db[Math.floor(Math.random() * db.length)];
  res.json(randomEl);
});

app.get('/testimonials/:id', (req, res) => {
  const {id} = req.params;
  res.json(db.find(el => el.id == id));
});

app.post('/testimonials', (req, res) => {
  const {author, text} = req.body;

  if (author && text) {
    db.push({
      id: uuidv4(),
      author,
      text,
    })
    res.json({message: 'OK'});
  } else {
    res.send('Something is wrong!');
  }
});

app.put('/testimonials/:id', (req, res) => {
  const {author, text} = req.body;
  const {id} = req.params;
  const findID = db.find(el => el.id == id);
  db.splice(db.indexOf(findID), 1, {...findID, author: author, text: text});
  res.json({message: 'OK'});
})

app.delete('/testimonials/:id', (req, res) => {
  const {id} = req.params;
  db.splice(db.indexOf(db.find(el => el.id == id), 1));
  res.json({message: 'OK'});
})

app.use((req, res) => {
  res.status(404).json({message: 'Not found...'});
})

app.listen(8000, () => {console.log('Server up on 8000')});