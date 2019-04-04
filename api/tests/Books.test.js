import mongoose from 'mongoose';
import request from 'supertest';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../app';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Book APIs', () => {
  let book = {
      name: 'The Eiger Sanction',
      isbn: '9781400098026',
      authors: ['Trevanian'],
      country: 'USA',
      publisher: 'Broadway Books',
      number_of_pages: 322,
      release_date: '2017-04-01'
    };

  describe('# POST /api/v1/books', () => {
    it('should create a new book', (done) => {
      request(app)
        .post('/api/v1/books')
        .send(book)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status_code).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data.book).to.be.an('object');
          expect(res.body.data.book.name).to.equal(book.name);
          expect(res.body.data.book.isbn).to.equal(book.isbn);
          expect(res.body.data.book.country).to.equal(book.country);
          expect(res.body.data.book.publisher).to.equal(book.publisher);
          expect(res.body.data.book.number_of_pages).to.equal(book.number_of_pages);
          expect(res.body.data.book.release_date).to.equal(book.release_date);
          book = res.body.data.book;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/v1/books/:id', () => {
    it('should get book details', (done) => {
      request(app)
        .get(`/api/v1/books/${book._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status_code).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data.book).to.be.an('object');
          expect(res.body.data.book.name).to.equal(book.name);
          expect(res.body.data.book.isbn).to.equal(book.isbn);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when book does not exists', (done) => {
      request(app)
        .get('/api/v1/books/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.status_code).to.equal(404);
          expect(res.body.status).to.equal('not found');
          expect(res.body.message).to.equal('Not found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PATCH /api/v1/books/:id', () => {
    it('should update book details', (done) => {
      book.name = 'Game of Rhino';
      request(app)
        .patch(`/api/v1/books/${book._id}`)
        .send(book)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.status_code).to.equal(200);
          expect(res.body.status).to.equal('success');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/v1/books/', () => {
    it('should get all books', (done) => {
      request(app)
        .get('/api/v1/books')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status_code).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data.books).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/v1/books/:id', () => {
    it('should delete a book', (done) => {
      request(app)
        .delete(`/api/v1/books/${book._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.status_code).to.equal(204);
          expect(res.body.status).to.equal('success');
          done();
        })
        .catch(done);
    });
  });
});