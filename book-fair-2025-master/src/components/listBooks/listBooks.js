import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  editBook,
  toggleSelectBook,
} from "../../store/reducers/bookActions.js";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

import AddBookForm from "../addBook/addBook.js";

import "./listBooks.scss"; // Import the SCSS file
import axios from "axios";

const ListBooks = ({ books, deleteBook }) => {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleCheckOut = () => {
    const selectedBookIds = selectedBooks.join(",");
    if (!selectedBookIds) {
      alert("No books selected for checkout.");
      return;
    }
    navigate(`/checkout?ids=${selectedBookIds}`);
  };

  const handleDeleteBook = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      deleteBook(bookId);
      toast.success("Book deleted successfully");
      fetchBooks(); // Refresh book list after deletion
    }
  };

  const handleChange = (event) => {
    const searchValue = event.target.value;
    setSearch(searchValue);
    if (searchValue) {
      fetchSearchResults(searchValue); // Call API search when there is a value
    } else {
      setSearchResults([]); // Clear search results if no value
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:9999/api/search-list?key=${query}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSelectBook = (bookId) => {
    setSelectedBooks((prevSelectedBooks) =>
      prevSelectedBooks.includes(bookId)
        ? prevSelectedBooks.filter((id) => id !== bookId)
        : [...prevSelectedBooks, bookId]
    );
  };

  const handleDeleteSelectedBooks = () => {
    if (window.confirm("Are you sure you want to delete the selected books?")) {
      selectedBooks.forEach((bookId) => deleteBook(bookId));
      setSelectedBooks([]);
      toast.success("Selected books deleted successfully");
      fetchBooks(); // Refresh book list after deletion
    }
  };

  const handleDetailClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const [databook, setDatabook] = useState([]);
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:9999/api/get-list");
      setDatabook(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filterDay = (day) => {
    const dateStr = day;
    const date = new Date(dateStr);
    // Format the date
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  return (
    <div className="list-books">
      <div className="btn-container">
        <button className="checkout-button" onClick={handleCheckOut}>
          <MdOutlineShoppingCartCheckout />
          Check Out
        </button>
        <button
          onClick={handleDeleteSelectedBooks}
          className="delete-selected-button"
        >
          Delete Selected
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          name="search"
          placeholder="Search by any field"
          value={search}
          onChange={handleChange}
          className="search-input"
        />
      </div>
      <button onClick={toggleForm} className="add-book-button">
        {showForm ? "Hide Form" : "Add Book"}
      </button>
      {showForm && <AddBookForm book={editingBook} editBook={editBook} />}

      <table className="book-table">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>Author</th>
            <th>Quantity</th>
            <th>Day</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(searchResults.length > 0 ? searchResults : databook).map((book) => (
            <tr key={book.id}>
              <td
                className="checkbox-container"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  className="large-checkbox"
                  checked={selectedBooks.includes(book.id)}
                  onChange={() => handleSelectBook(book.id)}
                />
              </td>
              <td>{book.id}</td>
              <td>{book.Name}</td>
              <td>{book.Author}</td>
              <td>{book.Quantity}</td>
              <td>{filterDay(book.Day)}</td>
              <td onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => handleDetailClick(book.id)}
                  className="detail-button"
                >
                  Detail
                </button>
                <button
                  onClick={() => handleDeleteBook(book.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  books: state.books,
});

const mapDispatchToProps = (dispatch) => ({
  deleteBook: (bookId) => dispatch({ type: "DELETE_BOOK", payload: bookId }),
  addBook: (newBook) => dispatch({ type: "ADD_BOOK", payload: newBook }),
  editBook: (editedBook) =>
    dispatch({ type: "EDIT_BOOK", payload: editedBook }),
  toggleSelectBook: (bookId) =>
    dispatch({ type: "TOGGLE_SELECT_BOOK", payload: bookId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListBooks);
