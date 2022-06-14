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

  it.skip('get author by id', async () => {
    const res = await request(app).get('/authors/3');

    const expected = {
      'id': '3',
      'dob': 'February 2, 1962', 
      'name': 'Chuck Palanuick', 
      'pob': 'Washington, US', 
      'books': [
        { 'id': 4, 'publisher': 'W. W. Norton', 'released': 1996, 'title': 'Fight Club' },
        { 'id': 5, 'publisher': 'Doubleday', 'released': 2001, 'title': 'Choke' },
        { 'id': 6, 'publisher': 'W. W. Norton', 'released': 1999, 'title': 'Survivor' }
      ]
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
