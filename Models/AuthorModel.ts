import { Model,DataTypes } from "sequelize";
import sequelize from "../Configuration/dbConfig"
export const Authors = sequelize.define('Authors',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name : {
        type: DataTypes.STRING(255),
        allowNull : false
    },
    birth_year:{
        type:DataTypes.INTEGER,
    },
    nationality:{
        type:DataTypes.STRING(20)
    }
},{
    tableName:'Authors'
}) 

