import mongoose from 'mongoose';
import { StudentInfo, StudentModel } from './studentSchema.ts';

export const createStudent = async (studentInfo: StudentInfo) => {
  const student = await StudentModel.create(studentInfo);
};

// export const createStudent = async (studentInfo: StudentInfo, parentalInfo: ParentalInfo) => {
//   const { name, dateOfBirth, gender, section, isActive, grade } = studentInfo;

//   const createdStudent = await prisma.student.create({
//     data: {
//       name,
//       studentId: generateStudentId(studentInfo),
//       dateOfBirth,
//       gender,
//       grade,
//       section,
//       isActive,
//       parents: {
//         create: parentalInfo.map((parent) => ({
//           name: parent.name,
//           gender: parent.gender,
//           email: parent.email,
//           phoneNumber1: parent.phoneNumber1,
//           phoneNumber2: parent.phoneNumber2,
//           physicalAddress: parent.physicalAddress,
//         })),
//       },
//     },
//   });
//   return createdStudent;
// };

// export const fetchAllStudents = async () => {
//   const students = await prisma.student.findMany();
//   return students;
// };

// export const findStudentById = async (id: string) => {
//   const student = await prisma.student.findUnique({
//     where: {
//       uuid: id,
//     },
//   });
//   return student;
// };
