const express = require('express');
const router = express.Router();
const db = require('../db');
const {v4: uuidv4} = require('uuid');

router.route('/testimonials').get((req, res) => res.json(db.testimonials));

router.route('/testimonials/random').get((req, res) => {
  const randomEl = db[Math.floor(Math.random() * db.testimonials.length)];
  res.json(randomEl);
});

router.route('/testimonials/:id').get((req, res) => {
  const {id} = req.params;
  res.json(db.testimonials.find(el => el.id == id));
});

router.route('/testimonials').post((req, res) => {
  const {author, text} = req.body;

  if (author && text) {
    db.testimonials.push({
      id: uuidv4(),
      author,
      text,
    })
    console.log(db);
    res.json({message: 'OK'});
  } else {
    res.send('Something is wrong!');
  }
});

router.route('/testimonials/:id').put((req, res) => {
  const {author, text} = req.body;
  const {id} = req.params;
  const findID = db.testimonials.find(el => el.id == id);

  db.testimonials.splice(db.testimonials.indexOf(findID), 1, {
    ...findID,
    author: author,
    text: text
  });
  res.json({message: 'OK'});
})

router.route('/testimonials/:id').delete((req, res) => {
  const {id} = req.params;
  const findID = db.testimonials.find(el => el.id == id);

  db.testimonials.splice(db.testimonials.indexOf(findID, 1));
  res.json({message: 'OK'});
})

module.exports = router;