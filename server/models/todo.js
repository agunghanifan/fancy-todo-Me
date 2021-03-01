'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Title harus diisi"
        },
        notEmpty: {
          args: true,
          msg: "Title harus diisi"
        }
      }
    }, 
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Description harus diisi"
        },
        notEmpty: {
          args: true,
          msg: "Description harus diisi"
        }
      }
    } ,
    status: {
      type: DataTypes.STRING,
    }, 
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Tanggal harus diisi"
        },
        notEmpty : {
          args: true,
          msg: "Tanggal Wajib Diisi"
        },
        isBefore(value) {
          if((new Date()) > value && (new Date()).toDateString() !== value.toDateString() ) {
            throw new Error("Tanggal tidak boleh dari masa lalu")
          }
        }
      }
    } 
  }, {
    sequelize,
    modelName: 'Todo',
    hooks: {
      beforeCreate: (instance) => {
        instance.status = "available"
      }
    }
  });
  return Todo;
};