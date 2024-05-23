import { z } from 'zod';

// Schema for UserName
const usernameSchema = z.object({
    firstName: z.string()
        .trim()
        .max(20, { message: 'First name cannot be more than 20 characters' })
        .nonempty({ message: 'First name is required' }),
    middleName: z.string()
        .trim()
        .nonempty({ message: 'Middle name is required' }),
    lastName: z.string()
        .trim()
        .nonempty({ message: 'Last name is required' })
        .refine(value => /^[A-Za-z]+$/.test(value), { message: 'Last name is not valid' })
});

// Schema for Guardian
const guardianSchema = z.object({
    fatherName: z.string().nonempty({ message: "Father's name is required" }),
    fatherOccupation: z.string().nonempty({ message: "Father's occupation is required" }),
    fatherContactNo: z.string().nonempty({ message: "Father's contact number is required" }),
    motherName: z.string().nonempty({ message: "Mother's name is required" }),
    motherOccupation: z.string().nonempty({ message: "Mother's occupation is required" }),
    motherContactNo: z.string().nonempty({ message: "Mother's contact number is required" })
});

// Schema for LocalGuardian
const localGuardianSchema = z.object({
    name: z.string().nonempty({ message: "Local guardian's name is required" }),
    occupation: z.string().nonempty({ message: "Local guardian's occupation is required" }),
    contactNo: z.string().nonempty({ message: "Local guardian's contact number is required" }),
    address: z.string().nonempty({ message: "Local guardian's address is required" })
});

// Schema for Student
const studentZodValidationSchema = z.object({
    id: z.string().nonempty({ message: 'Student ID is required' }),
    name: usernameSchema,
    gender: z.enum(["male", "female", "other"], { message: "Gender must be male, female, or other" }),
    dateBirth: z.string().optional(),
    email: z.string().nonempty({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
    contactNo: z.string().nonempty({ message: 'Contact number is required' }),
    emergencyContactNo: z.string().nonempty({ message: 'Emergency contact number is required' }),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], { message: 'Blood group is required' }),
    presentAddress: z.string().nonempty({ message: 'Present address is required' }),
    permanentAddress: z.string().nonempty({ message: 'Permanent address is required' }),
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: z.string().optional(),
    isActive: z.enum(['active', 'blocked'], { message: 'Account status is required' })
});

export default  studentZodValidationSchema ;
