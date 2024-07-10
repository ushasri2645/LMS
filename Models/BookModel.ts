import { Model,DataTypes } from "sequelize";
import sequelize from "../Configuration/dbConfig"
import { Authors } from "./AuthorModel";
import { Data } from "../Data/Data";

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
    no_of_copies:{
        type: DataTypes.INTEGER,
        defaultValue:10
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
    },
    no_of_reservation:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
},{
    timestamps:false,
    tableName:'Books',
    indexes:[
        {
            unique:true,
            fields:['title'],
        }
    ]
})


// Authors.hasMany(Books,{foreignKey:'authorId'});
// Books.belongsTo(Authors,{foreignKey:'authorId'})



