
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      user_name: {
        type: DataTypes.STRING,
        unique: {
          msg: 'username already taken - try another',
          fields: ['username']
        },
        validate: {
          len: {
            args: [6, 50],
            msg: 'username must be between 6 and 50 characters'
          },
          isString (val) {
            if(typeof val !== 'string') {
              throw new Error('username must be a string')
            }
          },
          containsNoBlankCharacters (val) {
            if(/\s/g.test(val)) {
              throw new sequelize.ValidationError('username can\'t contain blank characters')
            }
          }
        }
      },
      user_email: DataTypes.STRING,
      user_password: DataTypes.STRING,
    }
    );

    User.associate = models => {
      User.belongsTo(models.Status),
      User.belongsTo(models.Office)
    };
    
    
    return User;
  }