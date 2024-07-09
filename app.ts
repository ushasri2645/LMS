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

const app = express();
app.use(express.json());
app.use('/',router);
app.use(express.static(path.join(__dirname,'Views')))
const syncDb = async() => {
    await sequelize.authenticate().then(()=>{
        console.log("Success")
    }).catch((err)=>{
        console.log("Err",err)
    })
    try{
        await syncAssociations();
        console.log("Associations Synchronised");
        await sequelize.sync({force:true});
        console.log("Sync Succesfull");

        

        // await insertAuthorsData();
        // console.log("Authors Insertion Succesfull");


        // await insertBooksData();
        // console.log("Books Insertion Succesfull");
        
        // await insertMembersData();
        // console.log("Members Insertion Succesfull");
        
        
        // await insertLoansData();
        // console.log("Loans Insertion Succesfull");
        

        // await insertReservationData();
        // console.log("Reservation Insertion Succesfull");
        // await Authors.sync()
        await AuthorService.createBulkAuthors(Data.authorsData);
        await AuthorService.getAllAuthors();

        await BookService.createBulkBooks(Data.booksData);
        await BookService.getAllBooks();

        await MembersService.createBulkMembers(Data.membersData);
        await MembersService.getAllMembers();

        await LoanService.createBulkLoans(Data.loansData);
        await LoanService.getAllLoans();

        await ReservationService.createBulkReservations(Data.reservationsData)
        await ReservationService.getAllReservations();
    }
    catch(error){
        console.log("Error Creating or Syncing",error)
    }
}

app.use('/api/ping', ((req:Request, res:Response) => {  
    res.json({ message: "pong" });
}));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

syncDb();