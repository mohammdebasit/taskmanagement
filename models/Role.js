const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Role = sequelize.define(
  'Role',
  {
    // Model attributes are defined here
   name:{
    type:DataTypes.STRING,
    allowNull:false
   }

  },
  {
    // Other model options go here
  },
);

// `sequelize.define` also returns the model
module.exports=Role