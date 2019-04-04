import express from 'express';
// import validate from 'express-validation';
// import paramValidation from '../../constants/param-validation';

import Books from '../controllers/Books';

const router = express.Router(); // eslint-disable-line new-cap

const Book = new Books();



router.route('/')
      .post((req, res, next) => Book.create(req, res, next))
      .get((req, res, next) => Book.read(req, res, next));

router.route('/:id')
      .patch((req, res, next) => Book.updateById(req, res, next))
      .get((req, res, next) => Book.readById(req, res, next))
      .delete((req, res, next) => Book.deleteById(req, res, next));
      

export default router;
