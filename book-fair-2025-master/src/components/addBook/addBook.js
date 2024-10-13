import React, { useState } from "react";
import { connect } from "react-redux";
import "./addBook.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBookForm = ({ addBook }) => {
  const [formState, setFormState] = useState({
    Name: "",
    Author: "",
    Quantity: "",
    Day: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddBook = async (event) => {
    event.preventDefault();
    const newErrors = {};

    // Logging formState to debug
    console.log("formState:", formState);

    // Ensure all fields are checked correctly
    if (!formState.Name || !formState.Name.trim()) newErrors.Name = true;
    if (!formState.Author || !formState.Author.trim()) newErrors.Author = true;
    if (!formState.Quantity || !formState.Quantity.toString().trim())
      newErrors.Quantity = true;
    if (!formState.Day || !formState.Day.trim()) newErrors.Day = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all the fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9999/api/create-book",
        formState
      );

      if (response.status === 200) {
        addBook(response.data); // Dispatch Redux action to add the book to the state
        toast.success("Add new book successfully");
        setFormState({
          Name: "",
          Author: "",
          Quantity: "",
          Day: "",
        });
        setErrors({});
        navigate("/ListBooks");
      } else {
        toast.error("Failed to add the book");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding the book");
    }
  };

  return (
    <form onSubmit={handleAddBook} className="add-book-form">
      <input
        type="text"
        name="Name"
        placeholder="Name"
        value={formState.Name}
        onChange={handleChange}
        className={errors.Name ? "error" : ""}
      />
      <input
        type="text"
        name="Author"
        placeholder="Author"
        value={formState.Author}
        onChange={handleChange}
        className={errors.Author ? "error" : ""}
      />
      <input
        type="number"
        name="Quantity"
        placeholder="Quantity"
        value={formState.Quantity}
        onChange={handleChange}
        className={errors.Quantity ? "error" : ""}
      />
      <input
        type="date"
        name="Day"
        placeholder="Day"
        value={formState.Day}
        onChange={handleChange}
        className={errors.Day ? "error" : ""}
      />
      <button type="submit" className="add-button">
        Add Book
      </button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteBook: (bookId) => dispatch({ type: "DELETE_BOOK", payload: bookId }),
  addBook: (newBook) => dispatch({ type: "ADD_BOOK", payload: newBook }),
});

export default connect(null, mapDispatchToProps)(AddBookForm);
