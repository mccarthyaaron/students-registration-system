import mongoose from 'mongoose';
import { ParentInfo, ParentModel, StudentInfo, StudentModel } from './studentSchema.ts';

export const createParent = async (parentalInfo: ParentInfo) => {
  const parent = await ParentModel.create(parentalInfo);
  console.log(parent);
};

export const createStudent = async (studentInfo: StudentInfo) => {
  const student = await StudentModel.create(studentInfo);
  console.log(student);
};

// function generateStudentId(studentInfo: StudentInfo) {
//   const { gender, dateOfBirth } = studentInfo;
//   const d = typeof dateOfBirth === 'string' ? dateOfBirth : dateOfBirth.toISOString();
//   const c = crypto.randomUUID();
//   const c1 = c.substring(c.length - 4);
//   // const v = s.substring(4, 10);
//   // R04F98xxxx
//   const v = `R${Math.floor(Math.random() * 100)}${gender[0].toUpperCase()}${d.substring(8)}${c1}`;
//   return v;
// }

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
