import { Request, Response } from "express";
import { errorHandler } from "../utils/res.error";
import { IResponse } from "../utils/interface";
import { RequestMethods } from "../utils/enums";
import classService from "./service";

export default class classController extends classService {
  public execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const method = req.method;
      const routeName = req.route.path.split("/")[1];

      let response: IResponse = {
        success: false,
      };
      let statusCode = 200;

      if (routeName === "createclass") {
        if (method === RequestMethods.GET) {
          const data = await this.createClassController();
          response = data;

          statusCode = 201;
        }
      }
      res.status(statusCode).send(response);
    } catch (error) {
      errorHandler(res, error);
    }
  };

  private createClassController = async (): Promise<any> => {
    const data = await this.createClassService();
    const user: IResponse = {
      success: true,
      message: "Class Created successfully",
      message_code: "CLASS_CREATED",
      data,
    };

    return user;
  };
}
