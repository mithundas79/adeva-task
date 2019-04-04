import Request from 'request-promise';
import config from '../../config/config';
/** Base controller */
import App from './App';

const debug = require('debug')('adeva-task:Controller/Books/External');



class ExternalBooks extends App {

  constructor() {
    super();
    this.bookapi = `${config.apiServer}/books/`;
    this.options = {
        uri: this.api,
        json: true
    }
  }
  
  reqBooks(extras) {
      const self = this;
      if (extras) {
          self.options.uri = self.api + extras;
      }
      this.options.method = 'GET';
      debug('Get request performed');
      debug(self.options);
      
      return Request(self.options)
          .then(response => Promise.resolve(response))
          .catch(e => Promise.reject(e.error));
      
  }
  
  get(req, res, next) {
    const self = this;
    let page = 1;
    let pageSize = 10;
    let filters = null;
    if (req.query) {
      if (req.query.page) {
        page = req.query.page;
      }
      if (req.query.pageSize) {
        pageSize = req.query.pageSize;
      }
      filters = `?page=${page}&pageSize=${pageSize}`;
      if (req.query.name) {
        filters += `&name=${req.query.name}`;
      }
      if (req.query.fromReleaseDate) {
        filters += `&fromReleaseDate=${req.query.fromReleaseDate}`;
      }
      if (req.query.toReleaseDate) {
        filters += `&toReleaseDate=${req.query.toReleaseDate}`;
      }
    }
    return self.reqBooks(filters)
        .then((response) => {
          let data = [];
          if (response) {
            if (response.length) {
              data = response.map((obj) => {
                return {
                  name: obj.name,
                  isbn: obj.isbn,
                  authors: obj.authors,
                  number_of_pages: obj.numberOfPages,
                  publisher: obj.publisher,
                  country: obj.country,
                  release_date: obj.released
                };
              });
            }
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
  }
  
}

export default ExternalBooks;

