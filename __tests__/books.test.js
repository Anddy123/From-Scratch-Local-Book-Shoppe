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
      'title': 'A Darker Shade of Magic', 
      'released': 2015, 
      'authors': []
    };

    expect(res.body).toEqual(expected);
  });

  it.skip('create author', async () => {
    const res = await request(app)
      .post('/authors')
      .send({
        name: 'John Doe',
        dob: 'January 1, 1970',
        pob: 'New York, US'
      });
    const expected = {
      'id': '7',
      'dob': 'January 1, 1970',
      'name': 'John Doe',
      'pob': 'New York, US',
      'books': []
    };
    expect(res.body).toEqual(expected);
  });

  afterAll(() => {
    pool.end();
  });
});
