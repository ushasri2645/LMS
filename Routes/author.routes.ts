import {Authors} from '../Models/AuthorModel'
import express, { Request, Response } from 'express';
import { allauthorsBooks, authorsBooks} from '../Utils/authors';
const AuthRouter = express.Router();



// Get all authors
AuthRouter.get('/authors', async (req:Request, res:Response) => {
    try {
        // Fetch all authors include books
        const authors = await Authors.findAll();
        if (authors.length === 0) return res.status(404).json({ message: "No Authors Found" });
        res.json({Authors: authors});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});
// Get one author
AuthRouter.get('/authors/:id', async (req:Request, res:Response) => {
    try {
        const author = await Authors.findByPk(req.params.id);
        if (author === null) {
            return res.status(404).json({ message: "Author Not Found" });
        }
        res.json(author);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});

// Create a new author
AuthRouter.post('/authors', async (req:Request, res:Response) => {
    try {
        const author = await Authors.create(req.body);
        res.json(author);
    } catch (err:any) {
        res.status(400).json({message: err.message});
    }
});

// Update an author
AuthRouter.put('/authors/:id', async (req:Request, res:Response) => {
    try {
        const [updated] = await Authors.update(req.body, {where: {id: req.params.id}});
        if (updated) {
            const updatedAuthor = await Authors.findByPk(req.params.id);
            res.json(updatedAuthor);
        } else {
            res.status(404).json({ message: "Author Not Found" });
        }
    } catch (err:any) {
        res.status(400).json({message: err.message});
    }
});
// Delete an author
AuthRouter.delete('/authors/:id', async (req:Request, res:Response) => {
    try {
        const deleted = await Authors.destroy({where: {id: req.params.id}});
        if (deleted) {
            res.json({ message: "Author Deleted" });
        } else {
            res.status(404).json({ message: "Author Not Found" });
        }
    } catch (err:any) {
        res.status(500).json({message: err.message});
    }
});


AuthRouter.get('/allauthorBooks', async (req:Request, res:Response)=>{
    const allauthors = await allauthorsBooks();
    res.send(allauthors)
})

AuthRouter.get('/authorsBooks/:id',async (req:Request, res:Response)=> {
    const allauthors = await authorsBooks(parseInt(req.params.id));
    res.send(allauthors)

})
export {AuthRouter}
