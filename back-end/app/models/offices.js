
module.exports = (sequelize, DataTypes) => {
    const Office = sequelize.define('Office', {
      office_name: DataTypes.STRING,
    });

   Office.associate = models => {
    Office.hasMany(models.User)
  };
    return Office;
  }