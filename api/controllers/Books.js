/** Base controller */
import App from './App';
import Book from '../models/Book';

const debug = require('debug')('adeva-task:Controller/Books');



class Books extends App {

  constructor() {
    super();
    this.model = Book;
  }
  
  read(req, res, next) {
    const self = this;
    let filter = null;
    if (req.query) {
      filter = req.query;
    }
    self.model.list(filter)
      .then((books) => {
        let data = [];
        let responseObj = {
          code: 404,
          status: 'not found',
          message: 'Not found',
          data
        };
        if (books) {
          if (books.length) {
            data = {
              books
            };
            responseObj = {
              data
            };
          }
        }
        super._createResponse(res, responseObj);
      })
      .catch((err) => {
        debug(err);
        super._throwError(next, err, res);
      });
  }
  
  readById(req, res, next) {
    const self = this;
    const bookId = req.params.id;
    self.model.readOne(bookId)
      .then((book) => {
        let data = null;
        let responseObj = {
          code: 404,
          status: 'not found',
          message: 'Not found',
          data
        };
        if (book) {
          if (book.length) {
            data = {
              book: book[0]
            };
            responseObj = {
              data
            };
            super._createResponse(res, responseObj);
          }
        }
        
        super._createResponse(res, responseObj);
        
      })
      .catch((err) => {
        debug(err);
        super._throwError(next, err, res);
      });
  }
  
  create(req, res, next) {
    const self = this;
    const body = req.body;
    debug(body);
    if (!body.name || !body.isbn || !body.publisher || !body.authors || !body.country || !body.number_of_pages || !body.release_date) {
      super._throwError(next, { code: 400, message: 'BADDATA' }, res);
    } else {
      const saveObject = {
        name: body.name,
        isbn: body.isbn,
        publisher: body.publisher,
        authors: body.authors,
        country: body.country,
        number_of_pages: body.number_of_pages,
        release_date: body.release_date
      };
      self.model.add(saveObject)
        .then((savedData) => {
          self.model.readOne(savedData._id)
            .then((book) => {
              let data = {
                book: null
              };
              if (book) {
                data = {
                  book: book[0]
                };
              }
              const responseObj = {
                data
              };
              super._createResponse(res, responseObj);
            })
            .catch((err) => {
              debug(err);
              super._throwError(next, err, res);
            });
        })
        .catch((err) => {
          debug(err);
          super._throwError(next, err, res);
        });
    }
    
  }
  
  updateById(req, res, next) {
    const self = this;
    const bookId = req.params.id;
    const body = req.body;
    debug(body);
    if (!body.name && !body.isbn && !body.publisher && !body.authors && !body.country && !body.number_of_pages && !body.release_date) {
      super._throwError(next, { code: 400, message: 'BADDATA' }, res);
    } else {
      const saveObject = {};
      if (body.name) {
        saveObject.name = body.name;
      }
      if (body.isbn) {
        saveObject.isbn = body.isbn;
      }
      if (body.publisher) {
        saveObject.publisher = body.publisher;
      }
      if (body.country) {
        saveObject.country = body.country;
      }
      if (body.number_of_pages) {
        saveObject.number_of_pages = parseInt(body.number_of_pages, 10);
      }
      if (body.release_date) {
        saveObject.name = body.release_date
      }
      self.model.editById(bookId, saveObject)
        .then((bookName) => {
          if (bookName) {
            const responseObj = {
              message: `The book ${bookName} is updated successfully`,
              data: []
            };
            super._createResponse(res, responseObj);
          } else {
            super._throwError(next, { code: 500, message: 'UPDATEFAILED' }, res);
          }
        })
        .catch((err) => {
          debug(err);
          super._throwError(next, err, res);
        });
    }
    
  }
  
  deleteById(req, res, next) {
    const self = this;
    const bookId = req.params.id;
    self.model.findOne({ _id: bookId }).select('name').lean().exec()
      .then((book) => {
        if (book) {
          self.model.deleteById(bookId)
            .then((deleteRes) => {
                if (deleteRes) {
                  const responseObj = {
                    code: 204,
                    message: `The book ${book.name} is deleted successfully`,
                    data: []
                  };
                  super._createResponse(res, responseObj);
                } else {
                  super._throwError(next, { code: 500, message: 'DELETEFAILED' }, res);
                }
              })
              .catch((err) => {
                debug(err);
                super._throwError(next, err, res);
              });
        } else {
          
        }
      })
    
  }
  
}

export default Books;

