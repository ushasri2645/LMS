import { Authors } from "../Models/AuthorModel"
import { Books } from "../Models/BookModel";
const authorsBooks = async (id:number)=> {
    const author:any = await Authors.findByPk(id);
    if(author){
        const books = await Books.findAll({where:{authorId:author.id}})
        console.table(books.map((book)=>book.toJSON()));
    }
    else{
        console.log("Author not Found")
    }
}
const allauthorsBooks = async() => {
    const authBooks = await Authors.findAll({include:Books})
    console.log(authBooks)
    const formattedAuthors = authBooks.map(author => {
        const authorJSON = author.toJSON();
        return {
          id: authorJSON.id,
          name: authorJSON.name,
          birth_year: authorJSON.birth_year,
          nationality: authorJSON.nationality,
          Books: authorJSON.Books.map((book:any) => `${book.title} (ID: ${book.id})`).join(', '),
        };
      });
    console.table(formattedAuthors)
}

export {authorsBooks,allauthorsBooks}
