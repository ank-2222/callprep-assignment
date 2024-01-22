"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { ref } = require("joi");
const sequelize_1 = require("sequelize");
const tableName = "students";
exports.default = {
  up: (queryInterface) => {
    return queryInterface.createTable(
      tableName,
      {
        id: {
          type: sequelize_1.DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
        },
        class_id: {
          type: sequelize_1.DataTypes.UUID,
          references: {
            model: "classes",
            key: "id",
          },
          allowNull: false,
        },
        reg_number: {
          type: sequelize_1.DataTypes.TEXT,
          allowNull: false,
        },
        first_name: {
          type: sequelize_1.DataTypes.TEXT,
          allowNull: false,
        },
        last_name: {
          type: sequelize_1.DataTypes.TEXT,
          allowNull: false,
        },
        age: {
          type: sequelize_1.DataTypes.BIGINT,
          allowNull: false,
        },
        gender: {
          type: sequelize_1.DataTypes.TEXT,
          allowNull: false,
        },
        mobile: {
          type: sequelize_1.DataTypes.TEXT,
          allowNull: false,
        },
        created_at: {
          type: sequelize_1.DataTypes.DATE,
          allowNull: false,
          defaultValue: sequelize_1.DataTypes.NOW,
        },
      },
      {
        engine: "MYISAM",
        charset: "latin1", // default: null
      }
    );
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(tableName);
  },
};
