import axios from "../custom-axios/axios"

const BookRepository = {
    fetchBooks: () => {
        return axios.get("/book");
    },
    fetchAuthors: () => {
        return axios.get("/author");
    },
    addBook: (name, category, author, availableCopies) => {
        return axios.post("/book", {
            "name" : name,
            "category" : category,
            "authorId" : author,
            "availableCopies" : availableCopies,
        });
    },
    editBook: (id, name, category, author, availableCopies) => {
        return axios.put(`/book/edit/${id}`, {
            "name" : name,
            "category" : category,
            "authorId" : author,
            "availableCopies" : availableCopies,
        });
    },
    deleteBook: (id) => {
        return axios.delete(`/book/delete/${id}`);
    },
    getBookById: (id) => {
        return axios.get(`/book/${id}`)
    },
    markAsTaken: (id) => {
        return axios.post(`/book/markAsTaken/${id}`)
    }

};

export default BookRepository;
