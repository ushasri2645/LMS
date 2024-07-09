import {Books} from "../Models/BookModel"


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
const reduceBooks = async(id:number) => {
    console.log("Came here",id)
    const book: any = await Books.findByPk(id);
    console.log(book)
    await book.update({"no_of_copies": book.no_of_copies - 1})  ;
    console.log( "left cpopies",book.no_of_copies)
}

export {booksAvailable,reduceBooks}