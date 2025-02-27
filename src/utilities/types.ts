export { Gender, Section, Grade } from '@prisma/client';

export interface NodeError extends Error {
  code: string;
}
