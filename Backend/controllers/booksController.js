const jwt = require('jsonwebtoken');
const Books = require('../db/book')

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

const updateBooks = async (req, res) => {
    const { id } = req.params;
    const { coverimg, availstatus, rentalperiod } = req.body;
    try {
        const bookData = await Books.findById(id);
        if (!bookData) {
            return res.status(404).json({ message: "Invalid Book" });
        }

        const updateBook = { coverimg, availstatus, rentalperiod };

        const updatedBook = await Books.updateOne({ _id: id }, updateBook);

        res.status(200).json({ message: "Book updated successfully", updatedBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { getBookData,getAllBooks, updateBooks, addBooks }




