import mongoose from 'mongoose';
// import { prisma } from '../index.ts';
import { Grade, Gender, Section } from '../utilities/types.ts';

enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
}
enum Grade {
  KG1 = 'KG1',
  KG2 = 'KG2',
  KG3 = 'KG3',
  PrimaryOne = 'P1',
  PrimaryTwo = 'P2',
  PrimaryThree = 'P3',
  PrimaryFour = 'P4',
  PrimaryFive = 'P5',
  PrimarySix = 'P6',
  PrimarySeven = 'P7',
}
enum Residence {
  Day = 'DAY',
  Boarding = 'BOARDING',
}
const genderOptions = Object.values(Gender);
const gradeOptions = Object.values(Grade);
const residenceOptions = Object.values(Residence);
const emailRegEx = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const studentSchema = new mongoose.Schema({
  name: {
    surname: { type: String, required: [true, 'Student Schema requires a surname'] },
    firstName: { type: String, required: [true, 'Student Schema requires a first name'] },
    lastName: {
      type: String,
      validate: {
        validator: (v: string) => v !== '' && v !== null,
        message: 'Student schema does not acceppt an empty string or null as the last name',
      },
    },
  },
  dateOfBirth: { type: Date, required: [true, 'Student schema requires a date of birth'] },
  gender: {
    type: String,
    required: [true, 'Student schema requires a gender value'],
    enum: {
      values: genderOptions,
      message: `Student schema: student gender value {VALUE} is none of ${genderOptions}`,
    },
  },
  grade: {
    type: String,
    required: [true, 'Student schema requires a grade value'],
    enum: {
      values: gradeOptions,
      message: `Student schema: student grade value {VALUE} is none of ${gradeOptions}`,
    },
  },
  residence: {
    type: String,
    required: [true, 'Student schema requires a residence value'],
    enum: {
      values: residenceOptions,
      message: `Student schema: student residence value {VALUE} is none of ${residenceOptions}`,
    },
  },
  parents: [],
});

const parentSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Parent schema required a name for the parent'] },
  // students: [{ type: mongoose.ObjectId, ref: 'Child' }],
  gender: {
    type: String,
    required: [true, 'Parent schema requires a gender value'],
    enum: {
      values: genderOptions,
      message: `Parent schema: parender gender value {VALUE} is none of ${genderOptions}`,
    },
  },
  primaryContact: {
    type: String,
    required: [true, 'Parent schema requires a value for the primary Contact'],
  },
  contact2: String,
  email: {
    type: String,
    validate: {
      validator: (email: string) => email.match(emailRegEx),
      message: 'Parent Schema: {VALUE} is not a valid email address',
    },
  },
  physicalAddress1: { type: String, required: [true, 'Parent schema requires a physical address for a parent'] },
  physicalAddress2: String,
});

export const Parent = mongoose.model('Parent', parentSchema);
export const Student = mongoose.model('Student', studentSchema);

const parent1 = new Parent({
  name: 'Kato Vicent',
  gender: Gender.Male,
  email: 'kato@gmail.com',
  primaryContact: '0756-734466',
  contact2: '0756-734465',
  physicalAddress1: 'Entebbe, Virus',
});
parent1.save().then(
  (s) => console.log(s),
  (e) => console.log(e),
);

const student = new Student({
  name: { surname: 'null', firstName: 'Aaron', lastName: 'null' },
  dateOfBirth: new Date(),
  gender: Gender.Male,
  grade: Grade.PrimaryFive,
  residence: Residence.Boarding,
});
// interface StudentInfo {
//   name: string;
//   dateOfBirth: Date | string;
//   gender: Gender;
//   section: Section;
//   grade: Grade;
//   isActive?: boolean;
// }

// type ParentalInfo = Array<{
//   name: string;
//   gender: Gender;
//   email?: string;
//   phoneNumber1: string;
//   phoneNumber2?: string;
//   physicalAddress: string;
// }>;

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
