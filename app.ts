// const sequelize = require('./Configuration/dbConfig')
import sequelize from "./Configuration/dbConfig"
import {insertAuthorsData,insertBooksData,insertMembersData,insertLoansData,insertReservationData} from "./Insertion/Insertion"

import { Authors } from "./Models/AuthorModel"
import {Books} from "./Models/BookModel"
import {Loans} from './Models/LoansModel'
import { Members } from "./Models/MembersModel"
import { Reservation } from "./Models/ReservationModel"

const syncDb = async() => {
    await sequelize.authenticate().then(()=>{
        console.log("Success")
    }).catch((err)=>{
        console.log("Err",err)
    })
    
    
    
    try{
        await sequelize.sync({force:true});
        console.log("Sync Succesfull");

        await insertAuthorsData();
        console.log("Authors Insertion Succesfull");
        const authors=await Authors.findAll();
        console.table(authors.map((author)=>author.toJSON()));

        await insertBooksData();
        console.log("Books Insertion Succesfull");
        const books=await Books.findAll();
        console.table(books.map((book)=>book.toJSON()));

        await insertMembersData();
        console.log("Members Insertion Succesfull");
        const members=await Members.findAll();
        console.table(members.map((member:any)=>member.toJSON()));
        
        await insertLoansData();
        console.log("Loans Insertion Succesfull");
        const loans=await Loans.findAll();
        console.table(loans.map((loan:any)=>loan.toJSON()));

        await insertReservationData();
        console.log("Reservation Insertion Succesfull");
        const reservations=await Reservation.findAll();
        console.table(reservations.map((reservation:any)=>reservation.toJSON()));

    }
    catch(error){
        console.log("Error Creating or Syncing",error)
    }
}

syncDb();