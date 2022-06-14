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
  afterAll(() => {
    pool.end();
  });
});
