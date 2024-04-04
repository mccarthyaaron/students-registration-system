import express from 'express';

// handles all requests to '/api/students'
const router = express.Router();
const students = [
  { uuid: '1', name: 'Chelsea', age: 5, section: 'day' },
  { uuid: '2', name: 'Chavela', age: 3, section: 'day' },
  { uuid: '1', name: 'Carlton', age: 6, section: 'boarding' },
];

router.get('/', (req, res) => {
  // res.json(students);
  res.send(students);
});

router.get('/:studentId', (req, res) => {
  res.send(students);
});

router.post('/', (req, res) => {
  res.send(students);
});

export default router;
