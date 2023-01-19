const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {

  sequelize.define(
    "breed",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      life_span: {
        type: DataTypes.STRING,
        defaultValue: "10 - 15",
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
