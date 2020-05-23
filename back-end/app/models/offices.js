
module.exports = (sequelize, DataTypes) => {
    const Office = sequelize.define('Office', {
      office_name: DataTypes.STRING,
    });
    Office.associate = models => {
      Office.hasMany(models.User,{ foreignKey: {
        name: 'OfficeId',
        allowNull: false
      }, constraints: false})
    };
    /*
      Office.associate = function(models) {
      Office.belongsTo(models.User, { foreignKey: 'OfficeId', sourceKey: 'id' } );
    }
    */

    return Office;
  }