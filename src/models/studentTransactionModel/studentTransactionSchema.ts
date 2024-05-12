import mongoose from 'mongoose';

interface PaymentMethodInfo {
  name: string;
}

interface StudentPaymentInfo {
  amount: number;
  dateOfPayment: Date;
  student: mongoose.Types.ObjectId;
  paymentMethod: PaymentMethodInfo;
  details?: string;
}

interface StudentBillingItemInfo {
  name: string;
  standardAmount: number;
}

interface StudentBillingInfo {
  amountBilled: number;
  dateOfBilling: Date;
  student: mongoose.Types.ObjectId;
  itemBilled: StudentBillingInfo;
  details?: string;
  amountBilledMatchesStandard?: boolean;
  reasonForDiscount?: string;
}

const paymentMethodSchema = new mongoose.Schema<PaymentMethodInfo>({
  name: { type: String, required: [true, 'Payment method schema: A payment method should have a name'] },
});

const studentPaymentsSchema = new mongoose.Schema<StudentPaymentInfo>({
  amount: { type: Number, required: [true, 'Student Payment Schema: A student payment should have an amount'] },
  dateOfPayment: { type: Date, required: [true, 'Student Payment Schema: The payment date has to be specified'] },
  student: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'Student Payment Schema: A student payment should have a student'],
  },
  paymentMethod: paymentMethodSchema,
  details: { type: String },
});

const studentBillingItemSchema = new mongoose.Schema<StudentBillingItemInfo>({
  name: { type: String, required: [true, 'Item to Bill schema: An item should have a name'], unique: true },
  standardAmount: { type: Number, required: [true, 'Item to Bill schema: An item should have a standard amount'] },
});

const studentBillingSchema = new mongoose.Schema<StudentBillingInfo>({
  amountBilled: { type: Number, required: [true, 'Student Billing Schema: A student billing should have an amount'] },
  dateOfBilling: { type: Date, required: [true, 'Student Billing Schema: The billing date has to be specified'] },
  student: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'Student Billing Schema: A student billing should have a student'],
  },
  itemBilled: studentBillingItemSchema,
  details: { type: String },
  amountBilledMatchesStandard: { type: Boolean },
  reasonForDiscount: { type: String },
});

export const StudentBillingModel = mongoose.model('Billing', studentBillingSchema);
export const StudentBillingItemModel = mongoose.model('Billing-Item', studentBillingItemSchema);
export const StudentPaymentModel = mongoose.model('Payment', studentPaymentsSchema);
export const PaymentMethodModel = mongoose.model('Payment-Method', paymentMethodSchema);
