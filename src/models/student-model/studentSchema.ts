import mongoose from 'mongoose';

const emailRegEx = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const genderOptions = ['MALE', 'FEMALE'] as const;
const gradeOptions = ['KG1', 'KG2', 'KG3', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7'] as const;
const residentialOptions = ['DAY', 'BOARDING'] as const;

type Gender = (typeof genderOptions)[number];
type Grade = (typeof gradeOptions)[number];
type ResidentialStatus = (typeof residentialOptions)[number];

export interface StudentInfo {
  name: {
    surname: string;
    firstName: string;
    lastName?: string;
  };
  dateOfBirth: Date;
  gender: Gender;
  grade: Grade;
  residentialStatus: ResidentialStatus;
  parents: Array<{
    name: string;
    relationship: string;
    gender: Gender;
    email: string;
    primaryContact: string;
    contact2?: string;
    physicalAddress1: string;
    physicalAddress2?: string;
  }>;
}

const studentSchema = new mongoose.Schema<StudentInfo>({
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
  residentialStatus: {
    type: String,
    required: [true, 'Student schema requires a residence value'],
    enum: {
      values: residentialOptions,
      message: `Student schema: student residence value {VALUE} is none of ${residentialOptions}`,
    },
  },
  parents: [
    {
      name: { type: String, required: [true, 'Student schema requires a name for the parent'] },
      relationship: {
        type: String,
        required: [true, 'Student schema: relationship of the parent with the child is not defined'],
      },
      gender: {
        type: String,
        required: [true, 'Student schema requires a gender value'],
        enum: {
          values: genderOptions,
          message: `Student schema: parent gender value {VALUE} is none of ${genderOptions}`,
        },
      },
      primaryContact: {
        type: String,
        required: [true, 'Student schema requires a value for the primary Contact'],
      },
      contact2: String,
      email: {
        type: String,
        validate: {
          validator: (email: string) => email.match(emailRegEx),
          message: 'Student schema: {VALUE} is not a valid email address',
        },
      },
      physicalAddress1: { type: String, required: [true, 'Student schema requires a physical address for a parent'] },
      physicalAddress2: String,
    },
  ],
});

export const StudentModel = mongoose.model('Student', studentSchema);
