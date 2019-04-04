import mongoose from 'mongoose';
import util from 'util';
import envConfig from './env';
import app from './config/express';

const debug = require('debug')('adeva-task:Settings/App');

const port = process.env.PORT || envConfig.port;
const env = process.env || envConfig.env;

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

Promise.config({
    // Enable cancellation
  cancellation: true,
});

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: 30, // Retry up to 30 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
}

const connectWithRetry = () => {
console.log('MongoDB connection with retry')
mongoose.connect(envConfig.db, options).then(()=>{
  console.log('MongoDB is connected')
}).catch(err=>{
  console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
  setTimeout(connectWithRetry, 5000)
})
}

connectWithRetry();

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 



// print mongoose logs in dev env
// print mongoose logs in dev env
if (envConfig.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

app.disable('etag');
// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port port
  app.listen(port, () => {
    debug(`adeva task server started on port ${port} (${env})`);
  });
}
(function() {
  var childProcess = require("child_process");
  var oldSpawn = childProcess.spawn;
  function mySpawn() {
      console.log('spawn called');
      console.log(arguments);
      var result = oldSpawn.apply(this, arguments);
      return result;
  }
  childProcess.spawn = mySpawn;
})();

export default app;
