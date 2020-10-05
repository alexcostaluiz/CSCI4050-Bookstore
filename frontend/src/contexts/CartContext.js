import React from 'react';

const book0 = {
  id: 0,
  author: 'Barack Obama',
  bookType: 'Hardcover',
  bookTypes: ['Hardcover', 'Paperback', 'Audio'],
  edition: null,
  image: 'https://kottke.org/plus/misc/images/obama-promised-land-book.jpg',
  isbn: '978-1-524-76316-9',
  numRatings: 4132,
  pages: 768,
  price: 34.99,
  publicationDate: 1605589200,
  publisher: 'Crown Publishing Group',
  quantity: 1,
  rating: 4.1,
  tags: ['Nonfiction', 'Biography', 'Autobiography', 'Bestseller'],
  title: 'A Promised Land',
};
const book1 = {
  id: 1,
  author: 'Yaa Gyasi',
  bookType: 'Hardcover',
  bookTypes: ['Hardcover', 'Paperback'],
  edition: null,
  image: 'http://images4.penguinrandomhouse.com/cover/700jpg/9780525658184',
  isbn: '978-0-525-65818-4',
  numRatings: 395,
  pages: 288,
  price: 22.95,
  publicationDate: 1598918400,
  publisher: 'Knopf Doubleday Publishing Group',
  quantity: 1,
  rating: 4.5,
  tags: ['Fiction', 'Literary Fiction', 'Bestseller'],
  title: 'Transcendent Kingdom',
};
const book2 = {
  id: 2,
  author: 'Toni Morrison',
  bookType: 'Hardcover',
  bookTypes: ['Hardcover', 'Paperback', 'Audio'],
  edition: null,
  image: 'https://images-na.ssl-images-amazon.com/images/I/91KvMhXP-LL.jpg',
  isbn: '978-0-307-27676-6',
  numRatings: 632,
  pages: 224,
  price: 14.45,
  publicationDate: 1249948800,
  publisher: 'Knopf Doubleday Publishing Group',
  quantity: 1,
  rating: 4.2,
  tags: ['Fiction', 'Historical Fiction', 'Literary Fiction', 'Bestseller'],
  title: 'A Mercy',
};
const book3 = {
  id: 3,
  author: 'Jean-Paul Sartre',
  bookType: 'Hardcover',
  bookTypes: ['Hardcover', 'Paperback'],
  edition: null,
  image: 'https://kbimages1-a.akamaihd.net/a0ed4935-f897-46ff-8314-8383c2c63550/1200/1200/False/nausea.jpg',
  isbn: '978-0-811-22030-9',
  numRatings: 154,
  pages: 186,
  price: 13.45,
  publicationDate: 1364169600,
  publisher: 'New Directions Publishing Corporation',
  quantity: 1,
  rating: 4.1,
  tags: ['Fiction', 'Philosophy', 'Literary Fiction'],
  title: 'Nausea',
};
const cart = [book0, book1, book2, book3];

const CartContext = React.createContext(cart);

const sampleBooks = [book0, book1, book2, book3];
export {CartContext as default, sampleBooks};
