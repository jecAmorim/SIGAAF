module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Users', {
        id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      user_email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      user_password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
       user_function: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      user_status: {
        allowNull: false,
        defaultValue: "pending",
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
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Users');
  }
};