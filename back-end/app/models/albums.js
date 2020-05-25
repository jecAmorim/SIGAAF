
const models = require('../models');
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
    const Album = sequelize.define('Album', {
      album_titulo: DataTypes.STRING,
      album_descricao: DataTypes.STRING,
      album_data_aquisicao: {
        type: DataTypes.DATE, 
        get() {
        return moment(this.getDataValue('album_data_aquisicao')).format('YYYY-MM-DD');
        }
      },
      album_estado_conservacao: DataTypes.STRING,
    });

    Album.associate = models => {
      Album.belongsTo(models.Library)
    };
    
    return Album;
  }