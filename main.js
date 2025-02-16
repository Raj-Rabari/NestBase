const electron = require('electron');
const shell = electron.shell;
const log = require('electron-log');
const app = electron.app;
const path = require('path');
const appPath = app.getPath('appData');
const { MongoMemoryServer } = require('mongodb-memory-server-core');
const { exec } = require('child_process');


async function startApp() {
    try {
        const uri = await startMongoDB();
        log.info(uri);
        process.env['mongo_uri'] = uri;
        require('./dist/main');
        shell.openExternal('http://localhost:3000');
    } catch {
        log.error('error while starting the server');
    }
}

startApp();


async function startMongoDB() {
  const mongod = await MongoMemoryServer.create({
    instance: {
      dbPath: path.join(appPath,'archive'), // Persist database in app directory
      storageEngine: "wiredTiger",
    },
  });

  console.log("MongoDB started at:", mongod.getUri());
  return mongod.getUri();
}
