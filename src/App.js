import * as BooksAPI from './BooksAPI'
import {Link} from "react-router-dom"
import BookShelf from './components/BookShelf'
import { useEffect, useState } from 'react'
import './App.css';

function  App() {
  const [books, setBooks] = useState([]);
  const updateBookShelf = (book,newShelf) =>{
      let isFound = false;
      const newBook = books.map((i) =>{
       if(i.id === book.id){
         i.shelf = newShelf;
         isFound = true;
       }
      
       return i;
      })
     if(!isFound){
      newBook.push({...book,shelf:newShelf})
     }
     setBooks(newBook)
     
  }
  
  useEffect(()=>{
    BooksAPI.getAll().then(data=>{
      setBooks(data)
    })
  },[])
  return (
  <>
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookShelf books={books} bookshelf="Currently Reading" shelf="currentlyReading" updateBookShelf={updateBookShelf}/>
        <BookShelf books={books} bookshelf="Want to Read" shelf="wantToRead" updateBookShelf={updateBookShelf}/>
        <BookShelf books={books} bookshelf="Read" shelf="read" updateBookShelf={updateBookShelf}/>
      </div>
    </div>
    <div className="open-search">
      <Link to="/search">
        <button>Add a book</button>
      </Link>
    </div>
  </>
  );
}

export default App;
