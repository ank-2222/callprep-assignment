export default class ErrorHandler extends Error {        //error handler class
  status_code: number;
  message: string;
  data: any;
  message_code: string;

  constructor(errorObj: {
    status_code: number;
    message: string;
    data?: any;
    message_code: string;
  }) {
    super();
    this.status_code = errorObj.status_code;      //sets status code, message, data and message code
    this.message = errorObj.message;                //  of error object
    this.data = errorObj.data;               //  to error handler class
    this.message_code = errorObj.message_code;       //  properties
  }

  toString() {
    return {
      message: this.message,
      status_code: this.status_code,
      data: this.data,
      message_code: this.message_code,
    };
  }
}
