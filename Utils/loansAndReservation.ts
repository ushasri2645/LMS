import { Reservation } from "../Models/ReservationModel";
import { Books } from "../Models/BookModel";
import { Authors } from "../Models/AuthorModel";
import { Loans } from "../Models/LoansModel";
import { Members } from "../Models/MembersModel";
import { where } from "sequelize";

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
}
        


