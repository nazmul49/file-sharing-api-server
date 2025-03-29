import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";

const File = sequelize.define("File", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  originalName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  publicKey: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  privateKey: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  lastReadAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

export default File;
