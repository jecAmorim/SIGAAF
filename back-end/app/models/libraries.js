
module.exports = (sequelize, DataTypes) => {
    const Library = sequelize.define('Library', {
      library_name: DataTypes.STRING,
    });

    return Library;
  }