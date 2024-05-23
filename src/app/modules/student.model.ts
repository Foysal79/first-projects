import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethod,
  StudentModel,
  TUserName,
} from './student/student.interface';

const TUsernameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: [20, 'first Name can not be more than 20'],
    trim: true,
    // validate: {
    //     validator : function(value : string) {
    //         const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //     },
    //     message : "{VALUE} is not is capitalize formate"
    // }
  },
  middleName: {
    type: String,
    required: [true, 'Middle name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    // validate : {
    //     validator :  (value) => {
    //     validator.isAlpha(value)
    //     },
    //     message : '{VALUE} is not valid'
    // }
  },
});

const TGuardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, "Father's name is required"] },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  motherName: { type: String, required: [true, "Mother's name is required"] },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
  },
});

const TLocalGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, "Local guardian's name is required"] },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
  },
});

const TStudentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
  },
  name: {
    type: TUsernameSchema,
    required: [true, 'Student name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: 'Gender must be male, female, or other',
    },
    required: [true, 'Gender is required'],
  },
  dateBirth: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    // validate : {
    //     validator : (value : string) => validator.isEmail(value),
    //     message : "{VALUE} is not a valid no email type"
    // }
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: [true, 'Blood group is required'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  guardian: {
    type: TGuardianSchema,
    required: [true, 'Guardian information is required'],
  },
  localGuardian: {
    type: TLocalGuardianSchema,
    required: [true, 'Local guardian information is required'],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    required: [true, 'Account status is required'],
  },
});

// creating a custom instance method
// TStudentSchema.methods.isUserExits = async function(id : string)  {
// const existingUser = await Student.findOne({id});
// return existingUser;
// }


/// creating a custom static method

TStudentSchema.statics.isUserExists = async function(id : string) {
  const existingUser = await Student.findOne({id})
  return existingUser;
}










export const Student = model<TStudent, StudentModel>('Student', TStudentSchema);
