const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title; 
  publisher;
  released;

  constructor({ id, title, publisher, released }) {
    this.id = id;
    this.title = title;
    this.publisher = publisher;
    this.released = released;
  }

  static async getAll() {
    const { rows } = await pool.query(`
            SELECT books.*,
            COALESCE(
                json_agg(to_jsonb(authors))
                FILTER (WHERE authors.id IS NOT NULL), '[]'
            ) AS authors FROM books
            LEFT JOIN books_authors ON books.id = books_authors.book_id
            LEFT JOIN authors ON authors.id = books_authors.author_id
            GROUP BY books.id`);

    return rows.map(row => new Book(row));
  }
};
