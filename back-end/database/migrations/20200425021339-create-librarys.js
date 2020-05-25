'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
      return queryInterface.createTable('Libraries', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
      },
  
      library_name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique,
      },
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
    return queryInterface.dropTable('Libraries');
  }
};
