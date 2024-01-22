import { Request, Response } from "express";
import { errorHandler } from "../utils/res.error";
import { IResponse } from "../utils/interface";
import { RequestMethods } from "../utils/enums";
import studentService from "./service";
import { ICreateStudentReqObj, IMarksentry1ReqObj, IMarksentry2ReqObj } from "./interface";

export default class studentController extends studentService {
  public execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const method = req.method;
      const routeName = req.route.path.split("/")[1];

      let response: IResponse = {
        success: false,
      };
      let statusCode = 200;

      if (routeName === "createstudent") {
        if (method === RequestMethods.POST) {
          const data = await this.createStudentController(req.body);
          response = data;

          statusCode = 201;
        }
      }
      else if(routeName === "marksentry1"){
        if (method === RequestMethods.POST) {
          const {studentId} = req.params;
          const data = await this.marksentry1Controller(req.body,studentId);
          response = data;

          statusCode = 201;
        }
      }
      else if(routeName === "marksentry2"){
        if (method === RequestMethods.POST) {
          const {studentId} = req.params;
          const data = await this.marksentry2Controller(req.body,studentId);
          response = data;

          statusCode = 201;
        }
      }
      else if(routeName === "getallstudents"){
        if (method === RequestMethods.GET) {
          const {classId} = req.params;
          const data = await this.getAllStudentsController(classId);
          response = data;

          statusCode = 201;
        }
      }
      else if(routeName === "getclassdetails"){
        if (method === RequestMethods.GET) {
          const {classId} = req.params;
          const data = await this.getClassDetailsController(classId);
          response = data;

          statusCode = 201;
        }
      }

      res.status(statusCode).send(response);
    } catch (error) {
      errorHandler(res, error);
    }
  };

  private getClassDetailsController = async (classId:string): Promise<any> => {
    const data = await this.getClassDetailsService(classId);
    const user: IResponse = {
      success: true,
      message: "class details Fetched successfully",
      message_code: "CLASS_DETAILS_FETCHED",
      data,
    };

    return user;
  };
  private getAllStudentsController = async (classId:string): Promise<any> => {
    const data = await this.getAllStudentsService(classId);
    const user: IResponse = {
      success: true,
      message: "Student Fetched successfully",
      message_code: "STUDENT_FETCHED",
      data,
    };

    return user;
  };
  private createStudentController = async (reqObj:ICreateStudentReqObj): Promise<any> => {
    const data = await this.createStudentService(reqObj);
    const user: IResponse = {
      success: true,
      message: "Student Created successfully",
      message_code: "STUDENT_CREATED",
      data,
    };

    return user;
  };
  private marksentry1Controller = async (reqObj:IMarksentry1ReqObj,studentId:string): Promise<any> => {
    await this.marksentry1Service(reqObj,studentId);
   
    const user: IResponse = {
      success: true,
      message: "Marks Entered successfully",
      message_code: "MARKS_ENTERED",
     
    };

    return user;
  };
  private marksentry2Controller = async (reqObj:IMarksentry2ReqObj,studentId:string): Promise<any> => {
    await this.marksentry2Service(reqObj,studentId);
   
    const user: IResponse = {
      success: true,
      message: "Marks Entered successfully",
      message_code: "MARKS_ENTERED",
     
    };

    return user;
  };
}
