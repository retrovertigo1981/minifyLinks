'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const {User} = models
      this.belongsTo(User,{
        foreignKey: "userId"
      })
    }
  }
  Link.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    originalLink: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    shortLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clickCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Link',
  });
  return Link;
};