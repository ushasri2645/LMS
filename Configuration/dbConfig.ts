import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('maindb','ushasri','ushasri',{
    host:'localhost',
    port:5432,
    dialect:'postgres',
    logging:false
});

const dbConnection = async() => {
    // try{
    //     await sequelize.authenticate();
    //     console.log("Succesfully Connected");
    //     await sequelize.sync();
    //     console.log("Succesfully Synchronised");
    // }
    // catch(error){
    //     console.log("Error Connecting database",error);
    // }

    await sequelize.authenticate().then(()=>{console.log("success")}).catch((err)=>{console.log(err)})
}

dbConnection();
export default sequelize;
// module.exports = {sequelize,dbConnection}

