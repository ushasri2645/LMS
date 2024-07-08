import express from 'express'
import { AuthRouter } from './author.routes';
import { BookRouter } from './book.routes';
import { LoansRouter } from './loans.routes';
import { MembersRouter } from './member.routes';
import { ReservationRouter } from './reservation.routes';

const router = express.Router();

router.use('/', AuthRouter);
router.use('/', BookRouter);
router.use('/',LoansRouter);
router.use('/',MembersRouter);
router.use('/',ReservationRouter);

export default router;