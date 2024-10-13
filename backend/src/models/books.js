'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BOOKS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BOOKS.init({
    Name: DataTypes.STRING,
    Author: DataTypes.STRING,
    Quantity: DataTypes.INTEGER,
    Day: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'BOOKS',
  });
  return BOOKS;
};