import { Model,DataTypes } from "sequelize";
import sequelize from "../Configuration/dbConfig"
import {Books} from './BookModel';
import { Members } from "./MembersModel";
import { Reservation } from "./ReservationModel";
import { Data } from "../Data/Data";


export const Loans = sequelize.define('Loans',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    book_id:{
        type: DataTypes.INTEGER,
        references: {
            model: Books,
            key: 'id'
        }
    },
    member_id:{
        type: DataTypes.INTEGER,
        references: {
            model: Members,
            key: 'id'
        }
    },
    loan_date:{
        type: DataTypes.DATE,
        // allowNull: false
    },
    due_date:{
        type: DataTypes.DATE,
        // allowNull: false
    },
    isReturned:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    typeOfLoan:{
        type: DataTypes.STRING,
        defaultValue: 'Loaned'
    }
},{
    timestamps:false,
    tableName:'Loans'
})



