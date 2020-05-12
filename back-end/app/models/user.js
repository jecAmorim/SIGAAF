
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      user_name: DataTypes.STRING,
      user_email: DataTypes.STRING,
      user_password: DataTypes.STRING,
      user_status: DataTypes.STRING,
      OfficeId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Office',
          key: 'id',
        }
      }
    });
    /*User.associate = models => {
      User.hasOne(models.Office, {  foreignKey: {
        name: 'OfficeID',
        allowNull: false
      }, constraints: false })
    };*/
    return User;
  }