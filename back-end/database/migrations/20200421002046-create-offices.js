module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Offices', {
        id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
     
      office_name: {
        allowNull: false,
        type: DataTypes.STRING,
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
    // Office hasOne Order
    return queryInterface.addColumn(
      'Users', // name of Target model
      'OfficeId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Offices', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Offices');
  }
};