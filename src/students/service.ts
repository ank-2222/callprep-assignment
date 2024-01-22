import ErrorHandler from "../utils/errors.handler";
import { v4 } from "uuid";
import studentHelper from "./helper";
import {
  ICreateStudentReqObj,
  IMarksentry1ReqObj,
  IMarksentry2ReqObj,
  IStudent,
  IStudentResObj,
} from "./interface";

export default class studentService extends studentHelper {
  protected createStudentService = async (
    reqObj: ICreateStudentReqObj
  ): Promise<IStudentResObj> => {
    const data: IStudent = {
      id: v4(),
      class_id: reqObj.class_id,
      reg_number: reqObj.reg_number,
      first_name: reqObj.first_name,
      last_name: reqObj.last_name,
      age: reqObj.age,
      gender: reqObj.gender,
      mobile: reqObj.mobile,
      created_at: new Date(),
    };

    const studentData = await this.createStudent(data);

    if (!studentData) {
      throw new ErrorHandler({
        message: "Student not created",
        status_code: 400,
        message_code: "ERROR_CREATING_STUDENT",
      });
    }
    return studentData;
  };
  protected marksentry1Service = async (
    reqObj: IMarksentry1ReqObj,
    studentId: string
  ): Promise<any> => {
    if(!reqObj.marks || !reqObj.name || !reqObj.age || !reqObj.gender){
        throw new ErrorHandler({
            message: "all Fields not Found, please check the input for name, age, gender, marks",
            status_code: 400,
            message_code: "INVALID_INPUT",
        });

    }
    const data = reqObj.marks;

    if(!data.physics ||  !data.maths){
        throw new ErrorHandler({
            message: "Physics or Maths not Found, please check the input for physics, maths",
            status_code: 400,
            message_code: "INVALID_INPUT",
        });
    }

    if( !this.validateMarks(reqObj.marks)){
        throw new ErrorHandler({
            message: "Invalid marks",
            status_code: 400,
            message_code: "INVALID_INPUT",
        });
    }

 
    await this.marksEntry(data, studentId);
   





    return ;
  };
  protected marksentry2Service = async (
    reqObj: IMarksentry2ReqObj,
    studentId: string
  ): Promise<any> => {
    if(!reqObj.scores || !reqObj.first_name || !reqObj.years_old ){
        throw new ErrorHandler({
            message: "all Fields not Found, please check the input for first_name, years_old, scores",
            status_code: 400,
            message_code: "INVALID_INPUT",
        });

    }
    const data = reqObj.scores;
        const marks = {} as any;
    
        data.subjects.forEach((subject, index:number) => {
            marks[subject] = [data.marks_obtained[index], data.total_marks[index]]
        });

        
        if(!marks.physics ||  !marks.maths){
            throw new ErrorHandler({
                message: "Physics or Maths not Found, please check the input for physics, maths",
                status_code: 400,
                message_code: "INVALID_INPUT",
            });
        }
    
        if( !this.validateMarks(marks)){
            throw new ErrorHandler({
                message: "Invalid marks",
                status_code: 400,
                message_code: "INVALID_INPUT",
            });
        }
      await this.marksEntry(marks, studentId);
    
    return;
 
  };
  protected getAllStudentsService = async (
    classId:string
  ): Promise<any> => {
  
    const data = await this.getAllStudents(classId);
    console.log(data);

 
  };
}

