// src/lib/indexedDB.ts

import { openDB } from "idb";

const DB_NAME = "KamusDB";
const STORE_NAME = "bookmarks";
const DB_VERSION = 1;

const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

export const getAllBookmarks = async (): Promise<string[]> => {
  const db = await initDB();
  const allBookmarks = await db.getAll(STORE_NAME);
  return allBookmarks.map((bookmark) => bookmark.word);
};

export const addBookmark = async (word: string) => {
  const db = await initDB();
  await db.add(STORE_NAME, { word });
};

export const removeBookmark = async (word: string) => {
  const db = await initDB();
  const allBookmarks = await db.getAll(STORE_NAME);
  const bookmarkToDelete = allBookmarks.find((b) => b.word === word);
  if (bookmarkToDelete) {
    await db.delete(STORE_NAME, bookmarkToDelete.id);
  }
};
