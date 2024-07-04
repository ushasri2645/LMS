import { Authors } from "../Models/AuthorModel";
import { Books } from "../Models/BookModel";
import { Loans } from "../Models/LoansModel";
import { Members } from "../Models/MembersModel";
import { Reservation } from "../Models/ReservationModel";


const syncAssociations = async() =>{
    //Authors & Books
    Authors.hasMany(Books,{foreignKey:'authorId'});
    Books.belongsTo(Authors,{foreignKey:'authorId'});

    //Books & Loans
    Books.hasMany(Loans,{foreignKey:'book_id'});
    Loans.belongsTo(Books,{foreignKey:'book_id'});

    //Books & Reservation
    Books.hasMany(Reservation,{foreignKey:'book_id'});
    Reservation.belongsTo(Books,{foreignKey:'book_id'});

    //Loans & Members
    Members.hasMany(Loans,{foreignKey:'member_id'})
    Loans.belongsTo(Members,{foreignKey:'member_id'})

    //Reservation and Members
    Members.hasMany(Reservation,{foreignKey:'member_id'});
    Reservation.belongsTo(Members,{foreignKey:'member_id'});
}

export {syncAssociations}

