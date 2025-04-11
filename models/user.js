'use strict';

const {
  Model
} = require('sequelize');
const argon2 = require("argon2");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    toJSON() {
      const user = this.dataValues;
      delete user.password;

      return user;
    }
    
    static associate(models) {
      // define association here
      const {Link} = models
      this.hasMany(Link,{
        foreignKey: "userId"
      })
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeSave: async (user, options) => {
        if (user.changed('password')) {
          user.password = await argon2.hash(user.password);
        }
      },
    }
  });
  return User;
};