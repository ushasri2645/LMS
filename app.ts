// const sequelize = require('./Configuration/dbConfig')
import sequelize from "./Configuration/dbConfig"
// import { insertData } from "./Insertion/Insertion"

import { Authors } from "./Models/AuthorModel"
// const {Authors} = require('./Models/AuthorModel')
const {Books} = require('./Models/BookModel')
const {Loans} = require('./Models/LoansModel')
const {Members} = require('./Models/MembersModel')
const {Reservation} = require('./Models/ReservationModel')

const syncDb = async() => {
    await sequelize.authenticate().then(()=>{
        console.log("Success")
    }).catch((err)=>{
        console.log("Err",err)
    })
    
    
    
    try{
        // await sequelize.authenticate();
        // console.log("authenticated");
        await sequelize.sync();
        console.log("Sync Succesfull");
        // await insertData();
        // console.log("Insertion Succesfull");
    }
    catch(error){
        console.log("Error Creating or Syncing",error)
    }
}

syncDb();