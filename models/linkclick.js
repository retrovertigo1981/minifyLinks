'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LinkClick extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LinkClick.init({
    linkId: DataTypes.INTEGER,
    country: DataTypes.STRING,
    clickedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'LinkClick',
  });
  return LinkClick;
};