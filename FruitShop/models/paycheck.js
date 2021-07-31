'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Paycheck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Paycheck.init(
    {
      name: DataTypes.STRING,
      capacity: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Paycheck',
    }
  )
  return Paycheck
}
