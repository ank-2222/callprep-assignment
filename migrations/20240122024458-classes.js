"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const tableName = "classes";
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
        total_students: {
          type: sequelize_1.DataTypes.BIGINT,
          allowNull: false,
          defaultValue : 0,

        },
        avg_score: {
          type: sequelize_1.DataTypes.DECIMAL(10, 2),
          allowNull: false,
          defaultValue : 0,
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
