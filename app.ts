// const sequelize = require('./Configuration/dbConfig')
import sequelize from "./Configuration/dbConfig"
import { AuthorService } from "./Repository/Author.repository"

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


const syncDb = async() => {
    await sequelize.authenticate().then(()=>{
        console.log("Success")
    }).catch((err)=>{
        console.log("Err",err)
    })
    
    
    
    try{
        await sequelize.sync({force:true});
        console.log("Sync Succesfull");

        await syncAssociations();
        console.log("Associations Synchronised");

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

        // await MembersService.updateMember(1,{name:"usha",email:"usha@gmail.com"});
        // await MembersService.updateMember(2,{name:"mammu",email:"mammu@gmail.com"});
        // await MembersService.getAllMembers();
    }
    catch(error){
        console.log("Error Creating or Syncing",error)
    }
}

syncDb();