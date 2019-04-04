// modules

import express from 'express';

// helpers
import ResponseObject from '../middlewares/ResponseObject';
import ErrorHandler from '../middlewares/ErrorHandler';

// general routes

const external = '/external-books';
const local = '/v1/'

import bookRoutes from './Books';
import extBookRoutes from './ExternalBooks';

const router = express.Router();

/** GET /welcome - Welcome to Yolo API */
router.get(local, (req, res) =>
  res.status(200).json(new ResponseObject(200, [{ message: 'Welcome to Adeva Task API'}]))
);



router.use(`${local}books`, bookRoutes);

// mount customer routes at /books
router.use(external, extBookRoutes);

export default router;
