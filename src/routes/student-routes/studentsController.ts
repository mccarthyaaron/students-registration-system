import { type Request, type Response, type NextFunction } from 'express';
import { createErrorResponseBody } from '../../middleware/errorHandling.ts';
import { type StudentInfo } from '../../models/student-model/studentSchema.ts';
import { createStudent, fetchAllStudents, findStudentById } from '../../models/student-model/studentModels.ts';

export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const students = await fetchAllStudents();
    res.status(200).json({ results: students });
  } catch (error) {
    next(error);
  }
};

export const getStudent = async (req: Request, res: Response, next: NextFunction) => {
  const studentId = req.params.studentId;
  if (!studentId) {
    throw Error('student id not given');
  }

  try {
    const student = await findStudentById(studentId);
    if (student === null) {
      return res.status(404).json(createErrorResponseBody(Error('Student not found')));
    }
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

export const postStudent = async (req: Request, res: Response, next: NextFunction) => {
  const studentInformation: StudentInfo = req.body.data;

  if (!studentInformation || typeof studentInformation !== 'object') {
    res.status(400).json(createErrorResponseBody(Error('Student information not provided in the request body')));
    return;
  }

  try {
    const createdStudent = await createStudent(studentInformation);
    res.status(201).json({ message: `Student with id ${createdStudent._id} successfully created` });
  } catch (error) {
    next(error);
  }
};
