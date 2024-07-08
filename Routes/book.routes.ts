import {Books} from '../Models/BookModel'
import express, { Request, Response } from 'express';
const BookRouter = express.Router();



// Get all authors
BookRouter.get('/books', async (req:Request, res:Response) => {
    try {
        // Fetch all authors include books
        const books = await Books.findAll();
        if (books.length === 0) return res.status(404).json({ message: "No Books Found" });
        res.json({Books: books});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});
// Get one author
BookRouter.get('/books/:id', async (req:Request, res:Response) => {
    try {
        const book = await Books.findByPk(req.params.id);
        if (book === null) {
            return res.status(404).json({ message: "Book Not Found" });
        }
        res.json(book);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});

// Create a new author
BookRouter.post('/books', async (req:Request, res:Response) => {
    try {
        const book = await Books.create(req.body);
        res.json(book);
    } catch (err:any) {
        res.status(400).json({message: err.message});
    }
});

// Update an author
BookRouter.put('/book/:id', async (req:Request, res:Response) => {
    try {
        const [updated] = await Books.update(req.body, {where: {id: req.params.id}});
        if (updated) {
            const updatedbook= await Books.findByPk(req.params.id);
            res.json(updatedbook);
        } else {
            res.status(404).json({ message: "Book Not Found" });
        }
    } catch (err:any) {
        res.status(400).json({message: err.message});
    }
});
// Delete an author
BookRouter.delete('/book/:id', async (req:Request, res:Response) => {
    try {
        const deleted = await Books.destroy({where: {id: req.params.id}});
        if (deleted) {
            res.json({ message: "Book Deleted" });
        } else {
            res.status(404).json({ message: "Book Not Found" });
        }
    } catch (err:any) {
        res.status(500).json({message: err.message});
    }
});

export {BookRouter}
