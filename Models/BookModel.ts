import { Model,DataTypes } from "sequelize";
import sequelize from "../Configuration/dbConfig"
import { Authors } from "./AuthorModel";

export const Books = sequelize.define('Books',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    } ,
    title: {
        type:DataTypes.STRING(255),
        allowNull: false,
    },
    authorId:{
        type: DataTypes.INTEGER,
        references: {
            model: Authors,
            key: 'id'
        }
    },
    genre:{
        type: DataTypes.STRING(100),
    },
    isbn:{
        type: DataTypes.STRING(13),
        allowNull: false,
        unique:true
    },
    publication_year:{
        type: DataTypes.INTEGER, 
    }
},{
    tableName:'Books'
})

