const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Task = sequelize.define(
  'Task',
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      // allowNull defaults to true
    },
    status:{
        type: DataTypes.ENUM,
        values: ['not started', 'in progress', 'completed'],
        defaultValue:'not started'
    },
    startedTime:{
        type:DataTypes.DATE,
    },
    completedTime:{
        type:DataTypes.DATE,
    }

  },
  {
    // Other model options go here
  },
);

// `sequelize.define` also returns the model
module.exports=Task