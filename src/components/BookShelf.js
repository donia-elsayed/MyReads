import Book from './Book'
import * as BooksAPI from '../BooksAPI'
function BookShelf({bookshelf,shelf,books,updateBookShelf}) {
    const updateBook = (book,shelf)=>{
        BooksAPI.update(book,shelf).then(()=>{
            updateBookShelf(book,shelf)
        })
    }
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{bookshelf}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        books.filter(data => data.shelf === shelf)
                        .map(book=>(
                            <li key={book.id}>
                              <Book book={book} shelf={shelf} updateBook={updateBook}/>
                            </li>
                        )) 
                    }
                </ol>
            </div>
        </div>
    )
}

export default BookShelf
