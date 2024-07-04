import { Model,DataTypes } from "sequelize";
import sequelize from "../Configuration/dbConfig"
import {Books} from './BookModel';
import { Members } from "./MembersModel";

export const Reservation = sequelize.define('Reservation',{
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
    reservation_date:{
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    timestamps:false,
    tableName:'Reservation'
})




// Members.hasMany(Reservation,{foreignKey:'id'})
// Reservation.belongsTo(Members,{foreignKey:'id'})
// Reservation.belongsTo(Books,{foreignKey:'id'})
// Books.hasMany(Reservation,{foreignKey:'id'})
