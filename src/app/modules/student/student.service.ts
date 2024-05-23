import { Student } from '../student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
 const result = await Student.create(studentData); // build in static method
  
 if( await Student.isUserExists(studentData.id) )
  {
    throw new Error('User already exists');
  }
 // const student = new Student(studentData); // build instance method
  
  // if(await student.isUserExits(studentData.id)){
  //    throw new Error('User already Exists')
  // }
  // const result = await student.save(); // build instance method
  return result;
};

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
