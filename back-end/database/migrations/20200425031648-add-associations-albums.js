'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
      return queryInterface.addColumn(
        'Albums', // name of Source model
        'libraryId', // name of the key we're adding 
        {
          type: DataTypes.INTEGER,
          references: {
            model: 'Libraries', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
    );
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.removeColumn(
      'Albums', // name of Source model
      'LibraryId' // key we want to remove
    );
  }
};
