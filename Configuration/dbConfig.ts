import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('lms2','ushasri','ushasri',{
    host:'localhost',
    port:5432,
    dialect:'postgres',
    logging:false
});

const dbConnection = async() => {
    await sequelize.authenticate().then(()=>{console.log("success")}).catch((err)=>{console.log(err)})
}

dbConnection();
export default sequelize;
// module.exports = {sequelize,dbConnection}

