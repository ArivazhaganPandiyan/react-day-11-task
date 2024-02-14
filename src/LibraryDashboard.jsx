import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import './LibraryDashboard.css';

function LibraryDashboard() {
  // Mock data for books and authors
  const [books, setBooks] = useState([
    { id: 1, title: 'Ponniyin Selvan', author: 'Kalki Krishnamurthy', isbn: '1234567890', publicationDate: '1950-10-29' },
    { id: 2, title: 'Harry Potter and the Philosophers Stone', author: 'J. K. Rowling', isbn: '0987654321', publicationDate: '1997-07-26' }
  ]);

  const [authors, setAuthors] = useState([
    { id: 1, name: 'J.K. Rowling', birthDate: '1965-07-31', biography: 'J.K. Rowling, a British author and philanthropist, is best known for her creation of the Harry Potter series. The series consists of seven fantasy novels published between 1997 and 2007.' },
    { id: 2, name: 'Kalki Krishnamurthy', birthDate: '1899-09-09', biography: 'Ramaswamy Krishnamurthy, better known by his pen name Kalki, was an Indian writer, journalist, poet, critic and Indian independence activist who wrote in Tamil. He chose the pen-name Kalki,What is Kalki famous for Known for his well-known historical novels like Ponniyin Selvan' }
  ]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const handleBookSubmit = (values, { resetForm }) => {
    if (selectedBook) {
      const updatedBooks = books.map(book =>
        book.id === selectedBook.id ? { ...book, ...values } : book
      );
      setBooks(updatedBooks);
      setSelectedBook(null);
    } else {
      const newBook = { id: Math.floor(Math.random() * 1000), ...values };
      setBooks([...books, newBook]);
    }
    resetForm();
  };

  const handleAuthorSubmit = (values, { resetForm }) => {
    if (selectedAuthor) {
      const updatedAuthors = authors.map(author =>
        author.id === selectedAuthor.id ? { ...author, ...values } : author
      );
      setAuthors(updatedAuthors);
      setSelectedAuthor(null);
    } else {
      const newAuthor = { id: Math.floor(Math.random() * 1000), ...values };
      setAuthors([...authors, newAuthor]);
    }
    resetForm();
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const handleDeleteAuthor = (id) => {
    setAuthors(authors.filter(author => author.id !== id));
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
  };
  
  const handleEditAuthor = (author) => {
    setSelectedAuthor(author);
  };
  

  return (
    <div className='books-tab'>
      <h2>Books</h2>
      <Formik
        initialValues={selectedBook || { title: '', author: '', isbn: '', publicationDate: '' }}
        enableReinitialize
        validate={values => {
          const errors = {};
          if (!values.title) {
            errors.title = 'Title is required';
          }
          // Add more validations as needed
          return errors;
        }}
        onSubmit={handleBookSubmit}
      >
        <Form>
          <Field type="text" name="title" placeholder="Title" />
          <ErrorMessage name="title" component="div" />
          <Field type="text" name="author" placeholder="Author" />
          <Field type="text" name="isbn" placeholder="ISBN" />
          <Field type="date" name="publicationDate" />
          <button type="submit">{selectedBook ? 'Update Book' : 'Add Book'}</button>
        </Form>
      </Formik>
      <ul>
        {books.map(book => (
          <li key={book.id}>
           <div className='table-card'>
           <table>
            <tr><td> ISBN - {book.isbn}</td></tr>
              <tr><th>Title</th><th>Author</th></tr>
              
              <tr>
                <td>{book.title}  </td>
                <td>{book.author}</td> 
                <td>
                  <button className='del-btn' onClick={() => handleDeleteBook(book.id)}>Delete</button>
                  <button className='edit-btn' onClick={() => handleEditBook(book)}>Edit</button>
                </td>
              </tr>
              <tr><td>(Published on {book.publicationDate})</td></tr>
            </table>
           </div>
          </li>
        ))}
      </ul>

      <h2>Authors</h2>
      <Formik
        initialValues={selectedAuthor || { name: '', birthDate: '', biography: '' }}
        enableReinitialize
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Name is required';
          }
          // Add more validations as needed
          return errors;
        }}
        onSubmit={handleAuthorSubmit}
      >
        <Form>
          <Field type="text" name="name" placeholder="Name" />
          <ErrorMessage name="name" component="div" />
          <Field type="date" name="birthDate" />
          <Field type="text" name="biography" placeholder="Biography" />
          <button type="submit">{selectedAuthor ? 'Update Author' : 'Add Author'}</button>
        </Form>
      </Formik>
      <ul>
        {authors.map(author => (
          <li key={author.id}>
           <div className='table-card'>
           <table>
              <tr><th>Author Detail</th></tr>
            
           <tr><td> {author.name}  - ({author.birthDate})</td> </tr>
          <tr><td>{author.biography} </td>
          <td><button className='del-btn' onClick={() => handleDeleteAuthor(author.id)}>Delete</button>
            <button className='edit-btn' onClick={() => handleEditAuthor(author)}>Edit</button></td></tr>
           
            
            </table>
           </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LibraryDashboard;
