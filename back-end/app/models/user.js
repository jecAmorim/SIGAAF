
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      user_name: DataTypes.STRING,
      user_email: DataTypes.STRING,
      user_password: DataTypes.STRING,
      OfficeId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Office',
          key: 'id',
        }
      },
      StatusId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Status',
          key: 'id',
        }
      }
    });
    return User;
  }