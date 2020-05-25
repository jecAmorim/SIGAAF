
module.exports = (sequelize, DataTypes) => {
    const Library = sequelize.define('Library', {
      library_name: {
        type: DataTypes.STRING,
        unique: {
          msg: 'library already exist - try another',
          fields: ['library_name']
        },
      },
    });

    Library.associate = models => {
      Library.hasMany(models.Album);
    };
    return Library;
  }