import ResponseHelper from '../middlewares/ResponseObject';
import ErrorHelper from '../middlewares/ErrorHandler';

const debug = require('debug')('adeva-task:Controller/App');



class AppController {
  
  constructor() {
    this.ResponseHelper = ResponseHelper;
    this.ErrorHelper = ErrorHelper;
  }

  _createResponse(responseHandler, resultObj) {
    // debug(resultObj);
    return responseHandler.status(200).json(
      new this.ResponseHelper(
        resultObj.code || 200,
        resultObj.status || 'success',
        resultObj.message || null,
        resultObj.data || null,
      )
    );
  }
  
  _throwError(next, errObj, responseHandler = null) {
    debug(err);
    if (errObj.code === 200) {
      return responseHandler.status(200).json(
        new this.ResponseHelper(
          200,
          errObj.data || errObj.message || null,
          errObj.errCode || null
        )
      );
    }
    const err = new this.ErrorHelper(errObj);
    return next(err);
  }

}

export default AppController;
