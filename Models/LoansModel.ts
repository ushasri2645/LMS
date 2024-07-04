import { Model,DataTypes } from "sequelize";
import sequelize from "../Configuration/dbConfig"
import {Books} from './BookModel';
import { Members } from "./MembersModel";
import { Reservation } from "./ReservationModel";


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
        allowNull: false
    },
    due_date:{
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    timestamps:false,
    tableName:'Loans'
})

Loans.belongsTo(Books,{foreignKey:'id'})
Loans.belongsTo(Reservation,{foreignKey:'id'})

Members.hasMany(Loans,{foreignKey:'id'})
Loans.belongsTo(Members,{foreignKey:'id'})

Books.hasMany(Loans,{foreignKey:'id'})


