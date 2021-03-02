'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword, comparePassword} = require('../helper/hash-password')

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.hasMany(models.Todo, {foreignKey: "AccountId"})
    }
  };
  Account.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg : "Username harus diisi"
        },
        notNull : {
          args: true,
          msg : "Username harus diisi"
        },
        isEmail : {
          args: true,
          msg: "Wajib menggunakan Email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          args: true,
          msg: "Password harus diisi"
        },
        notEmpty: {
          msg : "Password harus diisi"
        },
      }
    } 
  }, {
    sequelize,
    modelName: 'Account',
    hooks: {
      beforeCreate: (instance) => {
        instance.password = hashPassword(instance.password)
      }
    }
  });
  return Account;
};