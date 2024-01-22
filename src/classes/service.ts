import ErrorHandler from "../utils/errors.handler";
import classHelper from "./helper";
import { v4 } from "uuid";
import { IClassResObj } from "./interface";

export default class classService extends classHelper {
  protected createClassService = async (): Promise<IClassResObj> => {
    const data = {
      id: v4(),

      created_at: new Date(),
    };

    const classData = await this.createClass(data);

    if (!classData) {
      throw new ErrorHandler({
        message: "Class not created",
        status_code: 400,
        message_code: "ERROR_CREATING_CLASS",
      });
    }
    return classData;
  };
}
