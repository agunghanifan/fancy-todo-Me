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
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg : "Firstname harus diisi"
        },
        notNull : {
          args: true,
          msg : "Firstname harus diisi"
        },
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg : "Lastname harus diisi"
        },
        notNull : {
          args: true,
          msg : "Lastname harus diisi"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg : "Email harus diisi"
        },
        notNull : {
          args: true,
          msg : "Email harus diisi"
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
        min : {
          args: 6,
          msg : "Password harus minimal 6 karakter"
        }
      }
    } 
  }, {
    sequelize,
    modelName: 'Account',
    hooks: {
      afterValidate: (instance) => {
        if(instance.password.length < 6) {
          throw new Error("Password length min. 6 character");
        }
      },
      beforeCreate: (instance) => {
        instance.password = hashPassword(instance.password)
      },
    }
  });
  return Account;
};