'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
      return queryInterface.createTable('Albums', {
        id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    
      album_titulo: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      album_total_titulos: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.INTEGER,
      },
      album_descricao: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      album_data_aquisicao: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      album_estado_conservacao: {
        allowNull: false,
        type: DataTypes.STRING,
      },
     /* companyId: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
        unique:true,
        references: {
          model: 'libraries',
          key: 'id',
        },
      },*/
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Albums');
  }
};
