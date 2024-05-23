import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationSchema from './student.validation';
import {z} from 'Zod'
import studentZodValidationSchema from './studen.validationZod';

const createStudent = async (req: Request, res: Response) => {
  try {
     // create a schema validation using zod
    const { student: studentData } = req.body;
    // data validation using zod
    const zodParseData = studentZodValidationSchema.parse(studentData)
    // const { error, value } = studentValidationSchema.validate(studentData);
    const result = await StudentServices.createStudentIntoDB(zodParseData);
    // if(error) {
    //     res.status(500).json({
    //         success: true,
    //         message: 'something went wrong',
    //         error: error,
    //     })
    // }

    
    res.status(200).json({
      success: true,
      message: 'student is create successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: 'something went wrong',
      error: err,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'student is are  retrieved successfully ',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'student is retried successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentController = {
  createStudent,
  getAllStudent,
  getSingleStudent,
};
