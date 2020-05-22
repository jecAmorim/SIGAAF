'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
      return queryInterface.addColumn(
        'Users', // name of Source model
        'OfficeId', // name of the key we're adding 
        {
          type: DataTypes.INTEGER,
          references: {
            model: 'Offices', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
    );
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.removeColumn(
      'Users', // name of Source model
      'OfficeId' // key we want to remove
    );
  }
};