const express = require('express');
const router = express.Router();
const db = require('../db');
const {v4: uuidv4} = require('uuid');

router.route('/concerts').get((req, res) => res.json(db.concerts));

router.route('/concerts/:id').get((req, res) => {
  const {id} = req.params;
  res.json(db.concerts.find(el => el.id == id));
});

router.route('/concerts').post((req, res) => {
  const {performer, genre} = req.body;

  if (performer && genre) {
    db.concerts.push({
      id: uuidv4(),
      performer,
      genre,
    })
    res.json({message: 'OK'});
  } else {
    res.send('Something is wrong!');
  }
});

router.route('/concerts/:id').put((req, res) => {
  const {performer, genre} = req.body;
  const {id} = req.params;
  const findID = db.concerts.find(el => el.id == id);

  db.concerts.splice(db.concerts.indexOf(findID), 1, {
    ...findID,
    performer: performer,
    genre: genre,
  });
  res.json({message: 'OK'});
})

router.route('/concerts/:id').delete((req, res) => {
  const {id} = req.params;
  db.concerts.splice(db.concerts.indexOf(db.concerts.find(el => el.id == id), 1));
  res.json({message: 'OK'});
})

module.exports = router;