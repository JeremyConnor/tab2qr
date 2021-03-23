import * as SQLite from "expo-sqlite";
import { BaseModel, types } from "expo-sqlite-orm";

export default class ScanHistory extends BaseModel {
  constructor(obj) {
    super(obj);
  }

  static get database() {
    return async () => SQLite.openDatabase("database.db");
  }

  static get tableName() {
    return "savedWindows";
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, // For while only supports id as primary key
      title: { type: types.TEXT, unique: true, not_null: true },
      timestamp: {
        type: types.INTEGER,
        default: () => Math.round(Date.now() / 1000),
      },
      windowInfo: {
        type: types.JSON,
        default: () => ({ incognito: false, tabs: [] }),
      },
    };
  }
}
