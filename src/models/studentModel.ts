import { prisma } from '../index.ts';
import { Grade, Gender, Section } from '../utilities/types.ts';

interface StudentInfo {
  name: string;
  dateOfBirth: Date | string;
  gender: Gender;
  section: Section;
  grade: Grade;
  isActive?: boolean;
}

type ParentalInfo = Array<{
  name: string;
  gender: Gender;
  email?: string;
  phoneNumber1: string;
  phoneNumber2?: string;
  physicalAddress: string;
}>;

function generateStudentId(studentInfo: StudentInfo) {
  const { gender, dateOfBirth } = studentInfo;
  const d = typeof dateOfBirth === 'string' ? dateOfBirth : dateOfBirth.toISOString();
  const c = crypto.randomUUID();
  const c1 = c.substring(c.length - 4);
  // const v = s.substring(4, 10);
  // R04F98xxxx
  const v = `R${Math.floor(Math.random() * 100)}${gender[0].toUpperCase()}${d.substring(8)}${c1}`;
  return v;
}

export const createStudent = async (studentInfo: StudentInfo, parentalInfo: ParentalInfo) => {
  const { name, dateOfBirth, gender, section, isActive, grade } = studentInfo;

  const createdStudent = await prisma.student.create({
    data: {
      name,
      studentId: generateStudentId(studentInfo),
      dateOfBirth,
      gender,
      grade,
      section,
      isActive,
      parents: {
        create: parentalInfo.map((parent) => ({
          name: parent.name,
          gender: parent.gender,
          email: parent.email,
          phoneNumber1: parent.phoneNumber1,
          phoneNumber2: parent.phoneNumber2,
          physicalAddress: parent.physicalAddress,
        })),
      },
    },
  });
  return createdStudent;
};

export const fetchAllStudents = async () => {
  const students = await prisma.student.findMany();
  return students;
};

export const findStudentById = async (id: string) => {
  const student = await prisma.student.findUnique({
    where: {
      uuid: id,
    },
  });
  return student;
};
