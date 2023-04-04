import { openDB } from 'idb';
// const { openDB } = require('idb');


const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// PUT route to update the note value in indexDB
export const putDb = async (content) => {
  // create a connection to the database and version we want to use
  // const todosDb = await openDB('todos', 1);
  const db = await initdb();
  // create a new transaction and specify the database and data privileges
  const tx = db.transaction('jate', 'readwrite');
  // open up the desired object store
  const store = tx.objectStore('jate');
  // use the .put() method to update the value in db and get confirmation of req
  const result = await store.put({ iid: Date.now(), todo: content });
  // waits for the transaction to complete and then continues
  await tx.done;

  return result;
};

// TODO: Add logic for a method that gets all the content from the database
// GET route to obtain note data
export const getDb = async () => {
  // create a connection to the database and version we want to use
  // const todosDb = await openDB('todos', 1);
  const db = await initdb();
  // create a new transaction and specify the database and data privileges
  const tx = db.transaction('jate', 'readonly');
  // open up the desired object store
  const store = tx.objectStore('jate');
  // use the .getAll() method to geta all data in db and get confirmation of req
  const result = await store.getAll();
  console.log('result.value', result);
  // waits for the transaction to complete and then continues
  await tx.done;

  return result > 0 ? result[0] : null;
};

// module.exports = {
//   initdb,
//   putDb,
//   getDb,
// };

//   calls the initialize db function
initdb();