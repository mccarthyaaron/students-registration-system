import { type StudentInfo, StudentModel } from './studentSchema';

export const createStudent = async (studentInfo: StudentInfo) => {
  const student = await StudentModel.create(studentInfo);
  return student;
};

export const fetchAllStudents = async () => {
  const students = await StudentModel.find();
  return students;
};

export const findStudentById = async (id: string) => {
  const student = await StudentModel.findById(id);
  return student;
};

export default {
  createStudent,
  fetchAllStudents,
  findStudentById,
};
