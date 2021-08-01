const express = require('express');
const router = express.Router();
const db = require('../db');
const {v4: uuidv4} = require('uuid');

router.route('/seats').get((req, res) => res.json(db.seats));

router.route('/seats/:id').get((req, res) => {
  const {id} = req.params;
  res.json(db.seats.find(el => el.id == id));
});

router.route('/seats').post((req, res) => {
  const {client} = req.body;

  if (client) {
    db.seats.push({
      id: uuidv4(),
      client,
    })
    res.json({message: 'OK'});
  } else {
    res.send('Something is wrong!');
  }
});

router.route('/seats/:id').put((req, res) => {
  const {client} = req.body;
  const {id} = req.params;
  const findID = db.seats.find(el => el.id == id);

  db.seats.splice(db.seats.indexOf(findID), 1, {
    ...findID,
    client: client,
  });
  res.json({message: 'OK'});
})

router.route('/seats/:id').delete((req, res) => {
  const {id} = req.params;
  const findID = db.seats.find(el => el.id == id);
  db.seats.splice(db.seats.indexOf(findID, 1));
  res.json({message: 'OK'});
})

module.exports = router;
