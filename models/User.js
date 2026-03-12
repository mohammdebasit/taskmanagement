const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{isEmail:{
        msg:"Email not in valid format"
      }}
      // allowNull defaults to true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },

  },
  {
    // Other model options go here
  },
);

// `sequelize.define` also returns the model
module.exports=User