
module.exports = (sequelize, DataTypes) => {
    const Office = sequelize.define('Office', {
      office_name: DataTypes.STRING,
    });

//      Office.hasOne(User);

    return Office;
  }