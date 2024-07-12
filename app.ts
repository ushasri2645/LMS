import sequelize from "./Configuration/dbConfig"
import { AuthorService } from "./Repository/Author.repository"
import express, { Request, Response } from 'express';
import { Authors } from "./Models/AuthorModel"
import {Books} from "./Models/BookModel"
import {Loans} from './Models/LoansModel'
import { Members } from "./Models/MembersModel"
import { Reservation } from "./Models/ReservationModel"
import { BookService } from "./Repository/Book.repository"
import { LoanService } from "./Repository/Loans.repository"
import { MembersService } from "./Repository/Members.repository"
import { ReservationService } from "./Repository/Reservation.repository"
import { syncAssociations } from "./Association/Association"
import { Data } from "./Data/Data"
import { LibraryQueries } from "./Utils/loansAndReservation"
import router from './Routes/index'
import path from 'path' 
import { allauthorsBooks } from "./Utils/authors";
import {bookLoans} from './Utils/bookutils'

const app = express();
app.use(express.json());
app.use('/',router);
app.use(express.static(path.join(__dirname,'Views')))
const syncDb = async() => {
    await sequelize.authenticate().then(()=>{
        console.log("Authnetication Success")
    }).catch((err)=>{
        console.log("Err",err)
    })
    try{
        await syncAssociations();
        console.log("Associations Synchronised");
        await sequelize.sync();
        console.log("Sync Succesfull");


        // await AuthorService.createBulkAuthors(Data.authorsData);
        await AuthorService.getAllAuthors();

        // await BookService.createBulkBooks(Data.booksData);
        await BookService.getAllBooks();

        // await MembersService.createBulkMembers(Data.membersData);
        await MembersService.getAllMembers();

        // await LoanService.createBulkLoans(Data.loansData);
        await LoanService.getAllLoans();

        // await ReservationService.createBulkReservations(Data.reservationsData)
        await ReservationService.getAllReservations();
        // await bookLoans(3);
    }
    catch(error){
        console.log("Error Creating or Syncing",error)
    }
}

const indexuse = async() =>{
    await sequelize.query('SET enable_seqscan=off');
    const [results,data] = await sequelize.query('EXPLAIN SELECT * FROM "\Books\" WHERE title = \'Gitanjali\'');
    console.log(results);
    const [results1,data1] = await sequelize.query('EXPLAIN SELECT * FROM "\Authors\" WHERE name = \'Rabindranath Tagore\'');
    console.log(results1);
}

app.use('/api/ping', ((req:Request, res:Response) => {  
    res.json({ message: "pong" });
}));

const fetchAllIndexes = async () => {
    try {
        const [results] = await sequelize.query(`
            SELECT
                tablename,
                indexname,
                indexdef
            FROM
                pg_indexes
            WHERE
                schemaname = 'public';
        `);
        console.log(results);
    } catch (error) {
        console.error('Error fetching indexes:', error);
    }
};


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

syncDb();
// fetchAllIndexes();
indexuse();
