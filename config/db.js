const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USN, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port:process.env.DB_PORT || 3306,
  dialect: 'mysql'
});

async function dbconnect() {
    try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}

async function syncDb() {
    await sequelize.sync({ force: true });
console.log('All models were synchronized successfully.');
}

module.exports={sequelize,syncDb,dbconnect}