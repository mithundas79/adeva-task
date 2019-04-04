import HttpStatus from 'http-status';
const debug = require('debug')('drovoo-api:Middlewares/Response');

class ResponseObject {

  constructor(statusCode, status, message, data) {
    
    this.responseObject = {
      status_code: statusCode,
      status: HttpStatus[statusCode]
    }
    if (status) {
      this.responseObject.status = status;
    }
    if (message) {
      this.responseObject.message = message;
    }
    if (data) {
      this.responseObject.data = data;
    }

    return this.responseObject;
  }
}

export default ResponseObject;
