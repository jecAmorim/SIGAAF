
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const Album = sequelize.define('Album', {
      album_titulo: DataTypes.STRING,
      album_descricao: DataTypes.STRING,
      album_data_aquisicao: DataTypes.DATE,
      album_estado_conservacao: DataTypes.STRING,
      LibraryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Library',
          key: 'id',
        }
      }
    });
    return Album;
  }