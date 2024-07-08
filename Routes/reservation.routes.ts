import {Reservation} from '../Models/ReservationModel'
import express, { Request, Response } from 'express';
const ReservationRouter = express.Router();


ReservationRouter.get('/reservations', async (req:Request, res:Response) => {
    try {
        const reservations = await Reservation.findAll();
        if (reservations.length === 0) return res.status(404).json({ message: "No reservations Found" });
        res.json({Reservations: reservations});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});

ReservationRouter.get('/reservations/:id', async (req:Request, res:Response) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (reservation === null) {
            return res.status(404).json({ message: "reservation Not Found" });
        }
        res.json(reservation);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
});

ReservationRouter.post('/reservation', async (req:Request, res:Response) => {
    try {
        const reservation = await Reservation.create(req.body);
        res.json(reservation);
    } catch (err:any) {
        res.status(400).json({message: err.message});
    }
});


ReservationRouter.put('/reservations/:id', async (req:Request, res:Response) => {
    try {
        const [updated] = await Reservation.update(req.body, {where: {id: req.params.id}});
        if (updated) {
            const updatedReservation = await Reservation.findByPk(req.params.id);
            res.json(updatedReservation);
        } else {
            res.status(404).json({ message: "Reservation Not Found" });
        }
    } catch (err:any) {
        res.status(400).json({message: err.message});
    }
});


ReservationRouter.delete('/reservations/:id', async (req:Request, res:Response) => {
    try {
        const deleted = await Reservation.destroy({where: {id: req.params.id}});
        if (deleted) {
            res.json({ message: " Reservation Deleted" });
        } else {
            res.status(404).json({ message: "reservation Not Found" });
        }
    } catch (err:any) {
        res.status(500).json({message: err.message});
    }
});

export {ReservationRouter}
