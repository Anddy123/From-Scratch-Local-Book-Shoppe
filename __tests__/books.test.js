const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('book routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('get all books', async () => {

    const res = await request(app).get('/books');
    const books = res.body.find((book) => book.id === '3');

    expect(books).toHaveProperty('title', 'Good Omens');
  });

  it('get book by id', async () => {
    const res = await request(app).get('/books/8');

    const expected = {
      'id': '8',
      'publisher': 'Tor Books', 
      'title': 'Vicious', 
      'released': 2013
    };

    expect(res.body).toEqual(expected);
  });

  it('create book', async () => {
    const res = await request(app)
      .post('/books')
      .send({
        title: 'The Great Gatsby',
        publisher: 'F. Scott Fitzgerald',
        released: 1925
      });
    const expected = {
      'id': '10',
      'publisher': 'F. Scott Fitzgerald',
      'title': 'The Great Gatsby',
      'released': 1925
    };
    expect(res.body).toEqual(expected);
  });

  afterAll(() => {
    pool.end();
  });
});
