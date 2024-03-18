const jwt = require('jsonwebtoken');
const Books = require('../db/book');
const Users = require('../db/user')

const getAllBooks = async (req, res) => {
    try {
        const bookData = await Books.find();
        res.status(200).json(bookData);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const getBookData = async (req, res) => {
    try {
        const id = req.params.id;
        const bookData = await Books.findById(id);
        if (!bookData) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(bookData);
    } catch (error) {
        console.error('Error fetching book data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const addBooks = async (req, res) => {
    try {
        const newBook = req.body
        const addNewBook = await Books.create(newBook)
        res.status(200).json({ message: "Book added Successfully" })
    } catch {
        res.send(400).json({ message: "Error creating book" })
    }
}

const bookRent = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized Access" });
        }
        const decoded = await jwt.verify(token.replace('Bearer ', ''), process.env.ACCESS_TOKEN_SECRET);
        const { bookID, bookName } = req.body;
        const rentObj = { bookID, bookName };
        const updatedRent = await Users.findByIdAndUpdate(decoded.id,
            { $push: { rentedBooks: rentObj } },
            { new: true });
        if (!updatedRent) {
            return res.status(404).json({ error: "User not found" });
        }
        const rentCount = await Users.countDocuments({ 'rentedBooks.bookID': bookID });
        return res.status(200).json({ message: "Book rented successfully", user: updatedRent, rentCount });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


const updateBooks = async (req, res) => {
    const { id } = req.params;
    const { coverimg, availstatus, rentalperiod } = req.body;
    try {
        const bookData = await Books.findById(id);
        if (!bookData) {
            return res.status(404).json({ error: "Invalid Book ID", message: "No book found with the provided ID" });
        }
        const updateBook = {};
        if (coverimg) updateBook.coverimg = coverimg;
        if (availstatus !== undefined) updateBook.availstatus = availstatus;
        if (rentalperiod) updateBook.rentalperiod = rentalperiod;
        const updatedBook = await Books.findByIdAndUpdate(id, updateBook, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ error: "Update Failed", message: "Failed to update the book" });
        }
        res.status(200).json({ message: "Book updated successfully", updatedBook });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ error: "Internal Server Error", message: "Failed to update the book" });
    }
};

const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Books.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully", deletedBook });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




module.exports = { getBookData, getAllBooks, updateBooks, addBooks, deleteBook, bookRent }




