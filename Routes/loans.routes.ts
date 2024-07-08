import {Loans} from '../Models/LoansModel'
import express, { Request, Response } from 'express';
const LoansRouter = express.Router();



// Get all authors
LoansRouter.get('/loans', async (req:Request, res:Response) => {
    try {
        // Fetch all authors include books
        const loans = await Loans.findAll();
        if (loans.length === 0) return res.status(404).json({ message: "No Loans Found" });
        res.json({Loans: loans});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});
// Get one author
LoansRouter.get('/loans/:id', async (req:Request, res:Response) => {
    try {
        const loan = await Loans.findByPk(req.params.id);
        if (loan === null) {
            return res.status(404).json({ message: "Loan Not Found" });
        }
        res.json(loan);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});

// Create a new author
LoansRouter.post('/loans', async (req:Request, res:Response) => {
    try {
        const loan = await Loans.create(req.body);
        res.json(loan);
    } catch (err:any) {
        res.status(400).json({message: err.message});
    }
});

// Update an author
LoansRouter.put('/loans/:id', async (req:Request, res:Response) => {
    try {
        const [updated] = await Loans.update(req.body, {where: {id: req.params.id}});
        if (updated) {
            const updatedLoan = await Loans.findByPk(req.params.id);
            res.json(updatedLoan);
        } else {
            res.status(404).json({ message: "Loan Not Found" });
        }
    } catch (err:any) {
        res.status(400).json({message: err.message});
    }
});
// Delete an author
LoansRouter.delete('/loans/:id', async (req:Request, res:Response) => {
    try {
        const deleted = await Loans.destroy({where: {id: req.params.id}});
        if (deleted) {
            res.json({ message: "Loan Deleted" });
        } else {
            res.status(404).json({ message: "Loan Not Found" });
        }
    } catch (err:any) {
        res.status(500).json({message: err.message});
    }
});

export {LoansRouter}
