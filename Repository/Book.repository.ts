import { Books } from "../Models/BookModel";
import sequelize from "../Configuration/dbConfig";

const getAllBooks = async() => {
    try{
        const books = await Books.findAll();
        console.table(books.map((book)=>book.toJSON()));
    }
    catch(error){
        console.log("Error Fetching data:",error);
    }
}

const getBookById = async(bookId: number) => {
    try{
        const book = await Books.findByPk(bookId);
        if(book){
            console.table(book.toJSON());
        }
        else{
            console.log("Book not Found");
        }
    }
    catch(error){
        console.log("Error fetching Book:",error);
    }
}

const updateBook = async(bookId: number,updatedData: object) =>{ 
    try{
        const book=await Books.findByPk(bookId);
        if(book){
            await book.update(updatedData);
        }
        else{
            console.log("Book not Found");
        }
    }
    catch(error){
        console.log("Error fetching Book:",error);
    }
}

const deleteBook = async(bookId: any) => {
    try{
        const book=await Books.findByPk(bookId);
        if(book){
            await book.destroy();
        }
        else{
            console.log("Book not Found");
        }
    }
    catch(error){
        console.log("Error fetching Book:",error);
    }
}


