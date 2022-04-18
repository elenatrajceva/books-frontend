import './App.css';
import {Component} from "react";
import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import BooksList from "./components/Books/BookList";
import Header from "./components/Header/Header";
import BookAdd from "./components/Books/BookAdd";
import BookEdit from "./components/Books/BookEdit";
import BookRepository from "./repository/BookRepository";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            authors: [],
            selectedBook: {}
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Header/>
                <main>
                    <div className="container">
                        <Routes>
                            <Route path={"/book/add"} exact render={() =>
                                <BookAdd authors={this.state.authors}
                                         onAddBook={this.addBook}/>}
                            />
                            <Route path={"/book/edit/:id"} exact render={() =>
                                <BookEdit authors={this.state.authors}
                                          onEditBook={this.editBook}
                                          book={this.state.selectedBook}/>}/>


                            <Route path={"/book"} exact render={() =>
                                <BooksList books={this.state.books}
                                           onDelete={this.deleteBook}
                                           onEdit={this.getBook}
                                           onMarkAsTaken={this.markAsTaken}/>}/>

                            <Route render={() => <Navigate to="/books"/>}/>
                        </Routes>
                    </div>
                </main>
            </BrowserRouter>
        );
    }

    componentDidMount() {
        this.loadBooks();
        this.loadAuthors();
    }

    loadBooks = () => {
        BookRepository.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    }

    loadAuthors = () => {
        BookRepository.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    }

    addBook = (name, category, authorId, availableCopies) => {
        BookRepository.addBook(name, category, authorId, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    deleteBook = (id) => {
        BookRepository.deleteBook(id)
            .then(() => {
                this.loadBooks();
            });
    }

    editBook = (id, name, category, authorId, availableCopies) => {
        BookRepository.editBook(id, name, category, authorId, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    getBook = (id) => {
        BookRepository.getBookById(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    markAsTaken = (id) => {
        BookRepository.markAsTaken(id)
            .then(() => {
                this.loadBooks();
            });
    }
}

export default App;
