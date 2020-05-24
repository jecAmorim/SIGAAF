
module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('Status', {
      status_name: DataTypes.STRING,
    });

    Status.associate = models => {
      Status.hasMany(models.User)
    };
    return Status;
  }