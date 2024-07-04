import { Loans } from "../Models/LoansModel";

class LoanService{
    static getAllLoans = async() => {
        try{
            const loans = await Loans.findAll();
            console.table(loans.map((loan)=>loan.toJSON()));
        }
        catch(error){
            console.log("Error Fetching data:",error);
        }
    }

    static getLoanById = async(loanId: number) => {
        try{
            const loan = await Loans.findByPk(loanId);
            if(loan){
                console.table(loan.toJSON());
            }
            else{
                console.log("Loan not Found");
            }
        }
        catch(error){
            console.log("Error fetching Loan:",error);
        }
    }

    static updateLoan = async(loanId: number,updatedData: object) =>{ 
        try{
            const loan=await Loans.findByPk(loanId);
            if(loan){
                await loan.update(updatedData);
            }
            else{
                console.log("Loan not Found");
            }
        }
        catch(error){
            console.log("Error fetching Loan:",error);
        }
    }

    static deleteLoan = async(loanId: number) => {
        try{
            const loan=await Loans.findByPk(loanId);
            if(loan){
                await loan.destroy();
            }
            else{
                console.log("Loan not Found");
            }
        }
        catch(error){
            console.log("Error fetching Loan:",error);
        }
    }
}
export {LoanService}
