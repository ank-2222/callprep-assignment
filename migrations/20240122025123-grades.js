"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { ref } = require("joi");
const sequelize_1 = require("sequelize");
const tableName = "grades";
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
        student_id: {
          type: sequelize_1.DataTypes.UUID,
          references: {
            model: "students",
            key: "id",
          },
          allowNull: false,
        },
        subject_id: {
          type: sequelize_1.DataTypes.UUID,
          references: {
            model: "subjects",
            key: "id",
          },
          allowNull: false,
        },
        total_marks: {
          type: sequelize_1.DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        obtained_marks: {
          type: sequelize_1.DataTypes.DECIMAL(10, 2),

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
