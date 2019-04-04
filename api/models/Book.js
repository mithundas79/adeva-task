import Promise from 'bluebird';
import mongoose from 'mongoose';

// const driverStatusCode = statusCode.driver;

const debug = require('debug')('adeva-task:Model/Book');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;




const Book = new Schema({
  name: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  authors: [String],
  country: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  number_of_pages: {
    type: Number,
    required: true
  },
  release_date: {
    type: Date
  },
  created: {
    type: Date
  },
});

Book.method({
});


Book.statics = {
  add(saveParams) {
    const Model = this;
    const saveOperation = new Model(saveParams);
    return saveOperation.save();
  },
  
  list(filters) {
    const Model = this;
    let match = {};
    let sortObj = {
      created: -1
    };
    let offset = 0;
    let limit = 10;
    if (filters) {
      if (filters.name) {
        match.name = filters.name;
      }
      if (filters.country) {
        match.country  = filters.country;
      }
      if (filters.id) {
        match = {
          _id: mongoose.Types.ObjectId(filters.id)
        };
      }
      if (filters.release_year) {
        match.match_date = parseInt(filters.release_year, 10);
      }
      if (filters.publisher) {
        match.publisher = filters.publisher;
      }
      if (filters.page) {
        const page = parseInt(filters.page, 10);
        offset = (page - 1);
      }
      if (filters.pageSize) {
        limit = parseInt(filters.pageSize, 10);
      }
      
    }
    const aggregation = [{
      $addFields: {
        match_date: {
          $year: '$release_date'
        }
      }
    }, {
      $project: {
        name: 1,
        isbn: 1,
        authors: 1,
        number_of_pages: 1,
        publisher: 1,
        country: 1,
        release_date: 1,
        match_date: 1
      }
    }, {
      $match: match
    }, {
      $sort: sortObj
    }, {
      $project: {
        name: '$name',
        isbn: '$isbn',
        authors: '$authors',
        number_of_pages: '$number_of_pages',
        publisher: '$publisher',
        country: '$country',
        release_date: {
          $dateToString: {
            date: '$release_date',
            format: '%Y-%m-%d'
          }
        }
      }
    }, {
      $group: {
        _id: null,
        totalBooks: { $sum: 1 },
        books: {
          $push: '$$ROOT'
        }
      }
    }, {
      $project: {
        _id: 0,
        totalbooks: 1,
        books: {
          $slice: [
            '$books',
            parseInt(offset, 10),
            parseInt(limit, 10)
          ]
        }
      }
    }];
    aggregation.options = { allowDiskUse: true };
    
    return Model.aggregate(aggregation)
                .allowDiskUse(true)
                .exec();
  },
  
  readOne(id) {
    const Model = this;
    let match = {
      _id: mongoose.Types.ObjectId(id)
    };
    const aggregation = [{
      $project: {
        name: 1,
        isbn: 1,
        authors: 1,
        number_of_pages: 1,
        publisher: 1,
        country: 1,
        release_date: 1
      }
    }, {
      $match: match
    }, {
      $project: {
        name: '$name',
        isbn: '$isbn',
        authors: '$authors',
        number_of_pages: '$number_of_pages',
        publisher: '$publisher',
        country: '$country',
        release_date: {
          $dateToString: {
            date: '$release_date',
            format: '%Y-%m-%d'
          }
        }
      }
    }];
    aggregation.options = { allowDiskUse: true };
    
    return Model.aggregate(aggregation)
                .allowDiskUse(true)
                .exec();
  },

  editById(id, updateBody) {
    const Model = this;
    debug('id');
    debug(id);
    return Model.findOneAndUpdate({ _id: id }, updateBody)
      .then((book) => {
        debug(book);
        // (book);
        if (book) {
          return Promise.resolve(book.name);
        }
        return Promise.resolve(null);
      })
      .catch(err => Promise.reject(err));
  },
  
  deleteById(id) {
    const _id = mongoose.Types.ObjectId(id);
    return this.deleteOne({ _id }).exec();
  }

  


};

/**
 * @typedef Book
 */
export default mongoose.model('Book', Book);
