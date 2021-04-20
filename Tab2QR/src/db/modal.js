import * as SQLite from 'expo-sqlite';
import {BaseModel, types} from 'expo-sqlite-orm';

export default class ScanHistory extends BaseModel {
  constructor(obj) {
    super(obj);
  }

  // Fetch database.
  static get database() {
    return async () => SQLite.openDatabase('database.db');
  }

  // Fetch the table "savedWindows".
  static get tableName() {
    return 'savedWindows';
  }

  // Return data to render inside a card in "Saved" section.
  static get columnMapping() {
    return {
      id: {type: types.INTEGER, primary_key: true},
      title: {type: types.TEXT, unique: true, not_null: true},
      timestamp: {
        type: types.INTEGER,
        default: () => Math.round(Date.now() / 1000),
      },
      windowInfo: {
        type: types.JSON,
        default: () => ({incognito: false, tabs: []}),
      },
    };
  }
}
