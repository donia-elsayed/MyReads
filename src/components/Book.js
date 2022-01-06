import { useEffect, useState } from "react"
import * as BooksAPI from '../BooksAPI'
function Book({book,shelf,updateBook}) {
    const [updateShelf,setUpdateShelf] = useState(shelf);
    useEffect(()=>{
        BooksAPI.get(book.id).then((d) => setUpdateShelf(d.shelf));
        return updateShelf;
    })
   
    const handelShelfChange = (e)=>{
        setUpdateShelf(e.target.value)
        updateBook(book,e.target.value)
    }
   
    return (
        <>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" 
                        style={{ width: 128, height: 193, 
                        backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select value={updateShelf || "none"} onChange={handelShelfChange}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
            </div>
        </>
    )
}

export default Book
