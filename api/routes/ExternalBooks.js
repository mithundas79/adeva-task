import express from 'express';
// import validate from 'express-validation';
// import paramValidation from '../../constants/param-validation';

import ExternalBooks from '../controllers/ExternalBooks';

const router = express.Router(); // eslint-disable-line new-cap

const ExternalBook = new ExternalBooks();



router.route('/')
      .get((req, res, next) => ExternalBook.get(req, res, next));
      

export default router;
