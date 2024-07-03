import { Model,DataTypes } from "sequelize";
import sequelize from "../Configuration/dbConfig"


export const Members = sequelize.define('Members',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name : {
        type: DataTypes.STRING(255),
        allowNull : false
    },
    address:{
        type: DataTypes.STRING(255),
    },
    phone_number:{
        type: DataTypes.STRING(20),
        allowNull : false,
        unique:true
    },
    email:{
        type: DataTypes.STRING(255),
        unique:true
    }
},{
    tableName:'Members'
})

