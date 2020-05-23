
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      user_name: DataTypes.STRING,
      user_email: DataTypes.STRING,
      user_password: DataTypes.STRING,
    });
    User.associate = models => {
      User.belongsTo(models.Office, {foreignKey: 'id',sourceKey: 'OfficeId'})
    };
    User.associate = models => {
      User.belongsTo(models.Status, {foreignKey: 'id',sourceKey: 'StatusId'})
    };
 
    return User;
  }