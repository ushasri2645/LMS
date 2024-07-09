import {Books} from "../Models/BookModel"
import { Loans } from "../Models/LoansModel";

const booksAvailable = async (id:number) : Promise<boolean> => {
    const book: any = await Books.findByPk(id);
    console.log(book)
    if(book){
        console.log(book.no_of_copies)
        if(book.no_of_copies>0){
            console.log("Hi copies")
            return true;
        }
        else{
            console.error("Book Out of Stock")
        }
    }
    return false;
}

const NobooksAvailable = async (id:number) : Promise<number> => {
    const book: any = await Books.findByPk(id);
    console.log(book)
    if(book){
        return book.no_of_copies;
    }
    else{
        return -1;
    };
}
const reduceBooks = async(id:number) => {
    console.log("Came here",id)
    const book: any = await Books.findByPk(id);
    console.log(book)
    await book.update({"no_of_copies": book.no_of_copies - 1})  ;
    console.log( "left cpopies",book.no_of_copies)
}

const bookLoans = async(id:number) => {
    const book: any = await Books.findByPk(id);
    console.log(book);
    if(book){
        const loans = Loans.findAll({where:{book_id:book.id}})
        console.table((await loans).map((loan:any)=>loan.toJSON()))
        return loans;
    }
    else{
        console.log("Loan not found")
        return "Loan not Found"
    }

}
export {booksAvailable,reduceBooks,bookLoans,NobooksAvailable}