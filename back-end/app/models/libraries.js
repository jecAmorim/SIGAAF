
module.exports = (sequelize, DataTypes) => {
    const Library = sequelize.define('Library', {
      library_name: DataTypes.STRING,
    });
    Library.associate = models => {
      Library.hasMany(models.Album);
    };
    return Library;
  }