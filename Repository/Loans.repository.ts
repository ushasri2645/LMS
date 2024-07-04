import { Loans } from "../Models/LoansModel";

class LoanService{
    static createLoan = async(loan:any) =>{
        try{
            const createdLoan=await Loans.create(loan);
            console.log("Loan created Succesfully :",createdLoan);
        }
        catch(error){
            console.log("Error creating Loan:", error);
        }
    }
    static createBulkLoans = async(loans:any) => {
        try{
            const createdloans = await Loans.bulkCreate(loans);
            console.log("Loans created Succesfully");
        }
        catch(error){
            console.log("Error creating Loans:", error);
        }
    }
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
