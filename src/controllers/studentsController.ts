import express from 'express';
// import { createStudent, fetchAllStudents, findStudentById } from '../models/studentModel.ts';
import { createErrorResponseBody } from '../middleware/errorHandling.ts';
import { createFetchResponseBody } from '../utilities/utilities.ts';

// export const getStudents = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//   try {
//     const students = await fetchAllStudents();
//     res.status(200).json(createFetchResponseBody(students));
//   } catch (error) {
//     next(error);
//   }
// };

// export const getStudent = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//   const studentId = req.params.studentId;
//   if (!studentId) {
//     throw Error('student id not given');
//   }

//   try {
//     const student = await findStudentById(studentId);
//     if (student === null) {
//       return res.status(404).json(createErrorResponseBody(Error('Student not found')));
//     }
//     res.status(200).json(createFetchResponseBody(student));
//   } catch (error) {
//     next(error);
//   }
// };

// export const postStudent = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//   const { studentInformation, parentalInformation } = req.body.data;

//   if (!studentInformation || typeof studentInformation !== 'object') {
//     res.status(400).json(createErrorResponseBody(Error('Student information not provided in the request body')));
//     return;
//   }
//   if (!parentalInformation?.length) {
//     res.status(400).json(createErrorResponseBody(Error('Parental information not provided in the request body')));
//     return;
//   }

//   try {
//     const createdStudent = await createStudent(studentInformation, parentalInformation);
//     res.status(201).json({ message: `Student with id ${createdStudent.uuid} successfully created` });
//   } catch (error) {
//     next(error);
//   }
// };
