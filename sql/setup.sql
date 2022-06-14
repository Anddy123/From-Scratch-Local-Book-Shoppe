-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS books_authors CASCADE;
DROP TABLE IF EXISTS authors CASCADE; 
DROP TABLE IF EXISTS books CASCADE;

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    title VARCHAR NOT NULL,
    publisher VARCHAR NOT NULL,
    released INT NOT NULL
);

CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    name VARCHAR NOT NULL,
    dob VARCHAR NOT NULL,
    pob VARCHAR NOT NULL
);

CREATE TABLE books_authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,  
    author_id INT NOT NULL, 
    book_id INT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES authors(id), 
    FOREIGN KEY (book_id) REFERENCES books(id)
);

INSERT INTO books (
    title, 
    publisher, 
    released 
)
VALUES
('Slaughterhouse Five', 'Delacorte', 1969),
('American Gods', 'William Morrow', 2001),
('Good Omens', 'Gollancz', 1990),
('Fight Club', 'W. W. Norton', 1996),
('Choke', 'Doubleday', 2001),
('Survivor', 'W. W. Norton', 1999),
('The Fifth Season', 'Orbit', 2015),
('Vicious', 'Tor Books', 2013),
('A Darker Shade of Magic', 'Tor Books', 2015)
;

INSERT INTO authors (
    name, 
    dob, 
    pob
)
VALUES
('Kurt Vonnegut', 'November 11, 1922', 'Indiana, US'),
('Neil Gaiman', 'November 10, 1960', 'Porchester, UK'),
('Chuck Palanuick', 'February 2, 1962', 'Washington, US'),
('Nora Keita Jemisin', 'September 17, 1972', 'Iowa, US'),
('Victoria Elizabeth Schwab', 'July 7, 1987', 'California, US'),
('Terry Pratchett', 'April 28, 1948', 'Buckinhamshire, UK')
;

INSERT INTO books_authors (
    author_id, 
    book_id
)
VALUES
(1, 1),
(2, 2), 
(2, 3), 
(3, 4), 
(3, 5),
(3, 6), 
(4, 7), 
(5, 8), 
(5, 9),
(6, 3);