import { Authors } from "../Models/AuthorModel";

class AuthorService {
    static createAuthor = async(author:any) =>{
        try{
            const createdAuthor=await Authors.create(author);
            console.log("Author created Succesfully :",createdAuthor);
        }
        catch(error){
            console.log("Error creating Author:", error);
        }
    }
    static createBulkAuthors = async(authors:any) => {
        try{
            const createdAuthors = await Authors.bulkCreate(authors);
            console.log("Authors created Succesfully");
        }
        catch(error){
            console.log("Error creating Authors:", error);
        }
    }
    static getAllAuthors = async() => {
        try{
            const authors = await Authors.findAll();
            console.table(authors.map((author)=>author.toJSON()));
        }
        catch(error){
            console.log("Error Fetching data:",error);
        }
    }

    static getAuthorById = async(authorId: number) => {
        try{
            const Author = await Authors.findByPk(authorId);
            if(Author){
                console.table(Author.toJSON());
            }
            else{
                console.log("Author not Found");
            }
        }
        catch(error){
            console.log("Error fetching author:",error);
        }
    }

    static updateAuthor = async(authorId: number,updatedData: object) =>{ 
        try{
            const author=await Authors.findByPk(authorId);
            if(author){
                await author.update(updatedData);
            }
            else{
                console.log("Author not Found");
            }
        }
        catch(error){
            console.log("Error fetching author:",error);
        }
    }

    static deleteAuthor = async(authorId: any) => {
        try{
            const author=await Authors.findByPk(authorId);
            if(author){
                await author.destroy();
            }
            else{
                console.log("Author not Found");
            }
        }
        catch(error){
            console.log("Error fetching author:",error);
        }
    }
}


export {AuthorService}