const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('get all authors', async () => {

    const res = await request(app).get('/authors');
    const author = res.body.find((author) => author.id === '3');

    expect(author).toHaveProperty('name', 'Chuck Palanuick');
  });

  it('get author by id', async () => {
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

  afterAll(() => {
    pool.end();
  });
});
