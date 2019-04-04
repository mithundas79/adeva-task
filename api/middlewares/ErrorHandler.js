import APIError from '../helpers/APIError';

class ErrorHandler {

  constructor(error) {
    // debug(error);
    this.Error = error;
    if (!this.Error.code) {
      this.Error.code = 500;
    }
    if (this.Error.message) {
      return new APIError(this.Error.message, this.Error.code);
    }
    return this.Error;
  }
}

export default ErrorHandler;
