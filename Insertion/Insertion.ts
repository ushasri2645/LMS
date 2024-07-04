import { Authors } from "../Models/AuthorModel"
import {Books} from "../Models/BookModel"
import {Loans} from '../Models/LoansModel'
import { Members } from "../Models/MembersModel"
import { Reservation } from "../Models/ReservationModel"


let authors: any;
let books : any;
let members : any;
let loans: any;
let reservations : any;

const insertAuthorsData = async () => {
    try {
        authors = await Authors.bulkCreate([
        { name: 'Rabindranath Tagore', birth_year: 1861, nationality: 'Indian' },
        { name: 'R.K. Narayan', birth_year: 1906, nationality: 'Indian' },
        { name: 'Arundhati Roy', birth_year: 1961, nationality: 'Indian' },
        { name: 'Chetan Bhagat', birth_year: 1974, nationality: 'Indian' }
      ]);
    } catch (error) {
        console.error('Error inserting Authors data:', error);
      }
}
const insertBooksData= async () =>{
    try{
        
        books = await Books.bulkCreate([
        { title: 'Gitanjali', authorId: 1, genre: 'Poetry', isbn: '9789388118297', publication_year: 1910 },
        { title: 'Malgudi Days', authorId: 2, genre: 'Fiction', isbn: '9788185986174', publication_year: 1943 },
        { title: 'The God of Small Things', authorId: 3, genre: 'Fiction', isbn: '9780679457312', publication_year: 1997 },
        { title: 'Five Point Someone', authorId: 4, genre: 'Fiction', isbn: '9788129104595', publication_year: 2004 }
      ]);
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

const insertMembersData = async() => {
    try{
         members = await Members.bulkCreate([
            { name: 'John Doe', address: '123 Main St', phone_number: '1234567890', email: 'john@example.com' },
            { name: 'Jane Smith', address: '456 Elm St', phone_number: '0987654321', email: 'jane@example.com' }
        ]);
    }catch (error) {
        console.error('Error inserting data:', error);
    }
}
  

const insertLoansData=async()=>{
    try{
        loans = await Loans.bulkCreate([
            { book_id: books[0].id, member_id: 1, loan_date: new Date(), due_date: new Date(new Date().setDate(new Date().getDate() + 14)) },
            { book_id: books[1].id, member_id: 2, loan_date: new Date(), due_date: new Date(new Date().setDate(new Date().getDate() + 14)) }
          ]);
    }
    catch(error){
        console.error('Error inserting data:', error);
    }
}
      
const insertReservationData=async()=>{
    try{
        reservations = await Reservation.bulkCreate([
            { book_id: 3, member_id: 2, reservation_date: new Date() },
            { book_id: 4, member_id: 1, reservation_date: new Date() }
          ]);
    }catch(error){
        console.error('Error inserting data:', error);
    }
}
    
  
export {insertAuthorsData,insertBooksData,insertMembersData,insertLoansData,insertReservationData}
