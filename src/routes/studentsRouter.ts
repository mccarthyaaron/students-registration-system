import express from 'express';
import { getStudent, getStudents, postStudent } from '../controllers/studentsController.ts';

// handles all requests to '/api/students'
const router = express.Router();

router.get('/', getStudents);

router.get('/:studentId', getStudent);

router.post('/', postStudent);

export default router;
