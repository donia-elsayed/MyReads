import React, {useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import * as BooksAPI from '../BooksAPI'
import '../App.css'
import Book from './Book';
function Search() {
    const [searchTerm,setSearchTerm] = useState("");
    const [searchResult,setSearchResult] = useState([]);
    const updateBook = (book,shelf)=>{
        BooksAPI.update(book,shelf)
    }
    const searchForBook = ()=>{
        if(!searchTerm || searchTerm.length === 0) return setSearchResult([]) ;
        BooksAPI.search(searchTerm).then((item) => {
            if(item.error) return setSearchResult([])
            setSearchResult([...item].filter((i)=> {
                return  i.imageLinks?.smallThumbnail 
            }))  
        })         
    }
    useEffect(()=>{
        searchForBook();
    },[searchTerm])
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/">
                    <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author"
                    value={searchTerm} onChange={(e)=>{ setSearchTerm(e.target.value)}}/>
                </div>
            </div>
            {
                searchTerm?
                (
                    <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            searchResult.map((res) => (
                                <li key={res.id}>
                                   <Book book={res} updateBook={updateBook}/>
                                </li>
                            ))
                        }
                    </ol>
                </div>
                )
                :
                (
                    <div>this search term is not found </div>
                )
            }
           
        </div>  
    )
}

export default Search
