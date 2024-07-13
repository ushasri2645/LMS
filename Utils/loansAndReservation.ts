import { Reservation } from "../Models/ReservationModel";
import { Books } from "../Models/BookModel";
import { Authors } from "../Models/AuthorModel";
import { Loans } from "../Models/LoansModel";
import { Members } from "../Models/MembersModel";
import { where } from "sequelize";
import sequelize from "../Configuration/dbConfig";
import { reduceBooks } from "./bookutils";
export namespace LibraryQueries {
    export const getTopReservation = async(book_id:number)=>{
        try{
            const reservation = await Reservation.findOne({
                where:{
                    book_id:book_id
                },
                order:[['reservation_date','ASC']],
                limit:1
            })
            console.log(reservation)
            return reservation;
        }
        catch(e){
            console.log(e);
            return e;
        }
    }
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
                let book:any = await Books.findOne({where:{id:loan.book_id},transaction})
                if(!book){
                    throw new Error("Book not found")
                }
                const no=book.no_of_copies+1;
                book = await book.update({ "no_of_copies": no }, { transaction });

                let cloan,reservation: any;
                if(book.no_of_copies===1){
                    console.log("hi")
                    reservation = await getTopReservation(book.id);
                    console.log("top",reservation)
                    if(reservation){
                        cloan = await Loans.create({"book_id":book.id,"member_id":reservation.member_id, "loan_date":new Date(),"due_date":new Date().getDate() + 14,"typeOfLoan":"Through Reservation"},{transaction})
                        if(!cloan){
                            throw new Error("New Loan not created")
                        }
                        console.log("loan created")
                        await reservation.update({"status":"loaned"},{transaction}).then(()=>{}).catch((er:any)=>{throw new Error(er)})
                        
                        console.log("status changed in transaction")
                        // await book.update({"no_of_copies":book.no_of_copies-1},{transaction}).then(()=>{}).catch((er:any)=>{throw new Error(er)})
                        await reduceBooks(book.id)
                        console.log("updated count in book")
                        return "Loan Submitted and new Loan created for top reservation"
                    }
                    else{
                        return "Loan Submitted & No Reservations"
                    }
                }
                else{
                    return "Loan Submitted"
                }
            });
            return result;
        }
        catch(err){
            console.log(err);
            return err;
        }
    }
}
        


