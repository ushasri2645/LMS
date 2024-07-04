import { Books } from "../Models/BookModel";

class BookService{
    static createBook = async(book:any) =>{
        try{
            const createdbook=await Books.create(book);
            console.log("Book created Succesfully :",createdbook);
        }
        catch(error){
            console.log("Error creating Book:", error);
        }
    }
    static createBulkBooks = async(books:any) => {
        try{
            const createdBooks = await Books.bulkCreate(books);
            console.log("Books created Succesfully");
        }
        catch(error){
            console.log("Error creating Books:", error);
        }
    }
    static getAllBooks = async() => {
        try{
            const books = await Books.findAll();
            console.table(books.map((book)=>book.toJSON()));
        }
        catch(error){
            console.log("Error Fetching data:",error);
        }
    }

    static getBookById = async(bookId: number) => {
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

    static updateBook = async(bookId: number,updatedData: object) =>{ 
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

    static deleteBook = async(bookId: number) => {
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
}

export {BookService}