import mongoose from 'mongoose';

interface TermInfo {
  display: string;
  year: string;
  startDate: Date;
  endDate: Date;
}

interface EnrollmentInfo {
  student: mongoose.Types.ObjectId;
  termEnrolledFor: TermInfo;
}

const termSchema = new mongoose.Schema<TermInfo>({
  display: { type: String, required: [true, 'Term Schema: A term display is required'] },
  year: { type: String, required: [true, 'Term Schema: A year the term belongs tois required'] },
  startDate: { type: Date, required: [true, 'Term schema: A term must have a start date'] },
  endDate: { type: Date, required: [true, 'Term schema: A term must have an end date'] },
});

const enrollmentSchema = new mongoose.Schema<EnrollmentInfo>({
  student: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'Enrollment schema: An enrollement should have a student'],
  },
  termEnrolledFor: {
    type: termSchema,
    required: [true, 'Enrollment Schema: The term being enrolled for has to be specified'],
  },
});

export const EnrollmentModel = mongoose.model('Enrollment', enrollmentSchema);
