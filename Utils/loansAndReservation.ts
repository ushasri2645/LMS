import { Reservation } from "../Models/ReservationModel";
import { Books } from "../Models/BookModel";
import { Authors } from "../Models/AuthorModel";
import { Loans } from "../Models/LoansModel";
import { Members } from "../Models/MembersModel";
import { where } from "sequelize";
import sequelize from "../Configuration/dbConfig";

export namespace LibraryQueries {
    export const checkLoaned = async(data: any) => {
        try{
            const member = await Loans.findOne({where:{member_id:data.member_id,book_id:data.book_id}})
            if(member){
                console.log("Can't do reservation since you already loaned the book");
            }
            else{
                console.log("Success");
               
            }   
            return member; 
        }
        catch(Error){
            console.error("Error Checking:",Error);
        }  
    }
    export const loanSubmit = async(id:number) => {
        try{
            const result = await sequelize.transaction( async(transaction)=>{
                let loan:any = await  Loans.findOne({where:{id:id},transaction});
                if(!loan){
                    throw new Error("Loan Not Found")
                }
                if(loan.isReturned){
                    return "Loan already returned"
                }
                loan = await loan.update({"isReturned":true},{transaction});
                console.log(loan)
                console.log("Status changed to true")
                let book:any = await Books.findOne({where:{id:loan.book_id},transaction})
                if(!book){
                    throw new Error("Book not found")
                }
                console.log(book)
                const no=book.no_of_copies+1;
                // book = await book.update({"no_of_copies":no},transaction);
                book = await book.update({ "no_of_copies": no }, { transaction });
                console.log(book.toJSON)
                console.log("no of books changed to:",no );
                return book;
            });
            return result;
        }
        catch(err){
            console.log(err);
            return err;
        }
    }
}
        


