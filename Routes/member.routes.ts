import {Members} from '../Models/MembersModel'
import express, { Request, Response } from 'express';
const MembersRouter = express.Router();


MembersRouter.get('/members', async (req:Request, res:Response) => {
    try {
        const members = await Members.findAll();
        if (members.length === 0) return res.status(404).json({ message: "No members Found" });
        res.json({Members: members});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});

MembersRouter.get('/members/:id', async (req:Request, res:Response) => {
    try {
        const member = await Members.findByPk(req.params.id);
        if (member === null) {
            return res.status(404).json({ message: "Member Not Found" });
        }
        res.json(member);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});

MembersRouter.post('/members', async (req:Request, res:Response) => {
    try {
        const member = await Members.create(req.body);
        res.json(member);
    } catch (err:any) {
        res.status(400).json({message: err.message});
    }
});


MembersRouter.put('/Members/:id', async (req:Request, res:Response) => {
    try {
        const [updated] = await Members.update(req.body, {where: {id: req.params.id}});
        if (updated) {
            const updatedMember = await Members.findByPk(req.params.id);
            res.json(updatedMember);
        } else {
            res.status(404).json({ message: "Member Not Found" });
        }
    } catch (err:any) {
        res.status(400).json({message: err.message});
    }
});


MembersRouter.delete('/members/:id', async (req:Request, res:Response) => {
    try {
        const deleted = await Members.destroy({where: {id: req.params.id}});
        if (deleted) {
            res.json({ message: " Member Deleted" });
        } else {
            res.status(404).json({ message: "member Not Found" });
        }
    } catch (err:any) {
        res.status(500).json({message: err.message});
    }
});

export {MembersRouter}
