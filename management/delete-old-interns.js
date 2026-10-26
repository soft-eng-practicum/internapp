import { MongoClient } from 'mongodb';
import 'dotenv/config';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

// configuration ===============================================================
const mongoURI = process.env.DB_CONN;
const rl = readline.createInterface({ input, output });

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const filter = {};
const sort = {
  'uploadDate': 1
};
const limit = 100;
const maxTimeMS = 60000;

async function deleteFile(_id) {
  console.log('Deleting: ' + _id);
  const deleteChunksResult = await coll_chunks.deleteMany({'files_id': _id });

  if (deleteChunksResult.deletedCount != 0) {
    console.log(`Successfully deleted ${deleteChunksResult.deletedCount} documents from fs.chunks.`);
  } else {
    console.log("No documents matched the query. Deleted 0 documents from fs.chunks.");
  }
  
  const deleteFilesResult = await coll_files.deleteMany({'_id': _id });
  if (deleteFilesResult.deletedCount != 0) {
    console.log(`Successfully deleted ${deleteFilesResult.deletedCount} documents from fs.files.`);
  } else {
    console.log("No documents matched the query. Deleted 0 documents from fs.files.");
  }    
}

const client = await MongoClient.connect( mongoURI );
const coll_files = client.db('ggcinternapp2').collection('fs.files');
const coll_chunks = client.db('ggcinternapp2').collection('fs.chunks');
const cursor = coll_files.find(filter, { sort, limit, maxTimeMS });
const result = await cursor.toArray();

console.log(result);

const yesno = await rl.question('Delete entries from database? (Y/N) ');

if (yesno.toLowerCase() == "y") {
  const deletefns = result.map( (x) => x._id ).map( async (_id) => await deleteFile(_id) );
  await Promise.all(deletefns);
}

await client.close();

// Always close the interface when done to release standard input
rl.close();
