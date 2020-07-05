cordova.define("cordova-plugin-sqlite-2.sqlitePlugin", function(require, exports, module) { 
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.sqlitePlugin = factory());
}(this, (function () { 'use strict';

  var test = function () {
    // Don't get fooled by e.g. browserify environments.
    return (typeof process !== 'undefined') && !process.browser;
  };

  var install = function (func) {
    return function () {
      process.nextTick(func);
    };
  };

  var nextTick = {
  	test: test,
  	install: install
  };

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  //based off rsvp https://github.com/tildeio/rsvp.js
  //license https://github.com/tildeio/rsvp.js/blob/master/LICENSE
  //https://github.com/tildeio/rsvp.js/blob/master/lib/rsvp/asap.js

  var Mutation = commonjsGlobal.MutationObserver || commonjsGlobal.WebKitMutationObserver;

  var test$1 = function () {
    return Mutation;
  };

  var install$1 = function (handle) {
    var called = 0;
    var observer = new Mutation(handle);
    var element = commonjsGlobal.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    return function () {
      element.data = (called = ++called % 2);
    };
  };

  var mutation = {
  	test: test$1,
  	install: install$1
  };

  var test$2 = function () {
    if (commonjsGlobal.setImmediate) {
      // we can only get here in IE10
      // which doesn't handel postMessage well
      return false;
    }
    return typeof commonjsGlobal.MessageChannel !== 'undefined';
  };

  var install$2 = function (func) {
    var channel = new commonjsGlobal.MessageChannel();
    channel.port1.onmessage = func;
    return function () {
      channel.port2.postMessage(0);
    };
  };

  var messageChannel = {
  	test: test$2,
  	install: install$2
  };

  var test$3 = function () {
    return 'document' in commonjsGlobal && 'onreadystatechange' in commonjsGlobal.document.createElement('script');
  };

  var install$3 = function (handle) {
    return function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = commonjsGlobal.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        handle();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      commonjsGlobal.document.documentElement.appendChild(scriptEl);

      return handle;
    };
  };

  var stateChange = {
  	test: test$3,
  	install: install$3
  };

  var test$4 = function () {
    return true;
  };

  var install$4 = function (t) {
    return function () {
      setTimeout(t, 0);
    };
  };

  var timeout = {
  	test: test$4,
  	install: install$4
  };

  var types = [
    nextTick,
    mutation,
    messageChannel,
    stateChange,
    timeout
  ];
  var draining;
  var currentQueue;
  var queueIndex = -1;
  var queue = [];
  var scheduled = false;
  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return;
    }
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      nextTick$1();
    }
  }

  //named nextTick for less confusing stack traces
  function nextTick$1() {
    if (draining) {
      return;
    }
    scheduled = false;
    draining = true;
    var len = queue.length;
    var timeout$$1 = setTimeout(cleanUpNextTick);
    while (len) {
      currentQueue = queue;
      queue = [];
      while (currentQueue && ++queueIndex < len) {
        currentQueue[queueIndex].run();
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    queueIndex = -1;
    draining = false;
    clearTimeout(timeout$$1);
  }
  var scheduleDrain;
  var i = -1;
  var len = types.length;
  while (++i < len) {
    if (types[i] && types[i].test && types[i].test()) {
      scheduleDrain = types[i].install(nextTick$1);
      break;
    }
  }
  // v8 likes predictible objects
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function () {
    var fun = this.fun;
    var array = this.array;
    switch (array.length) {
    case 0:
      return fun();
    case 1:
      return fun(array[0]);
    case 2:
      return fun(array[0], array[1]);
    case 3:
      return fun(array[0], array[1], array[2]);
    default:
      return fun.apply(null, array);
    }

  };
  var lib = immediate;
  function immediate(task) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    queue.push(new Item(task, args));
    if (!scheduled && !draining) {
      scheduled = true;
      scheduleDrain();
    }
  }

  var argsarray = argsArray;

  function argsArray(fun) {
    return function () {
      var len = arguments.length;
      if (len) {
        var args = [];
        var i = -1;
        while (++i < len) {
          args[i] = arguments[i];
        }
        return fun.call(this, args);
      } else {
        return fun.call(this, []);
      }
    };
  }

  var noopFn = function() {};

  // Simple FIFO queue implementation to avoid having to do shift()
  // on an array, which is slow.

  function Queue() {
    this.length = 0;
  }

  Queue.prototype.push = function (item) {
    var node = {item: item};
    if (this.last) {
      this.last = this.last.next = node;
    } else {
      this.last = this.first = node;
    }
    this.length++;
  };

  Queue.prototype.shift = function () {
    var node = this.first;
    if (node) {
      this.first = node.next;
      if (!(--this.length)) {
        this.last = undefined;
      }
      return node.item;
    }
  };

  Queue.prototype.slice = function (start, end) {
    start = typeof start === 'undefined' ? 0 : start;
    end = typeof end === 'undefined' ? Infinity : end;

    var output = [];

    var i = 0;
    for (var node = this.first; node; node = node.next) {
      if (--end < 0) {
        break;
      } else if (++i > start) {
        output.push(node.item);
      }
    }
    return output;
  };

  var tinyQueue = Queue;

  function WebSQLRows(array) {
    this._array = array;
    this.length = array.length;
  }

  WebSQLRows.prototype.item = function (i) {
    return this._array[i];
  };

  function WebSQLResultSet(insertId, rowsAffected, rows) {
    this.insertId = insertId;
    this.rowsAffected = rowsAffected;
    this.rows = new WebSQLRows(rows);
  }

  var WebSQLResultSet_1 = WebSQLResultSet;

  function errorUnhandled() {
    return true; // a non-truthy return indicates error was handled
  }

  // WebSQL has some bizarre behavior regarding insertId/rowsAffected. To try
  // to match the observed behavior of Chrome/Safari as much as possible, we
  // sniff the SQL message to try to massage the returned insertId/rowsAffected.
  // This helps us pass the tests, although it's error-prone and should
  // probably be revised.
  function massageSQLResult(sql, insertId, rowsAffected, rows) {
    if (/^\s*UPDATE\b/i.test(sql)) {
      // insertId is always undefined for "UPDATE" statements
      insertId = void 0;
    } else if (/^\s*CREATE\s+TABLE\b/i.test(sql)) {
      // WebSQL always returns an insertId of 0 for "CREATE TABLE" statements
      insertId = 0;
      rowsAffected = 0;
    } else if (/^\s*DROP\s+TABLE\b/i.test(sql)) {
      // WebSQL always returns insertId=undefined and rowsAffected=0
      // for "DROP TABLE" statements. Go figure.
      insertId = void 0;
      rowsAffected = 0;
    } else if (!/^\s*INSERT\b/i.test(sql)) {
      // for all non-inserts (deletes, etc.) insertId is always undefined
      // ¯\_(ツ)_/¯
      insertId = void 0;
    }
    return new WebSQLResultSet_1(insertId, rowsAffected, rows);
  }

  function SQLTask(sql, args, sqlCallback, sqlErrorCallback) {
    this.sql = sql;
    this.args = args;
    this.sqlCallback = sqlCallback;
    this.sqlErrorCallback = sqlErrorCallback;
  }

  function runBatch(self, batch) {

    function onDone() {
      self._running = false;
      runAllSql(self);
    }

    var readOnly = self._websqlDatabase._currentTask.readOnly;

    self._websqlDatabase._db.exec(batch, readOnly, function (err, results) {
      /* istanbul ignore next */
      if (err) {
        self._error = err;
        return onDone();
      }
      for (var i = 0; i < results.length; i++) {
        var res = results[i];
        var batchTask = batch[i];
        if (res.error) {
          if (batchTask.sqlErrorCallback(self, res.error)) {
            // user didn't handle the error
            self._error = res.error;
            return onDone();
          }
        } else {
          batchTask.sqlCallback(self, massageSQLResult(
            batch[i].sql, res.insertId, res.rowsAffected, res.rows));
        }
      }
      onDone();
    });
  }

  function runAllSql(self) {
    if (self._running || self._complete) {
      return;
    }
    if (self._error) {
      self._complete = true;
      return self._websqlDatabase._onTransactionComplete(self._error);
    }
    if (!self._sqlQueue.length) {
      self._complete = true;
      return self._websqlDatabase._onTransactionComplete();
    }
    self._running = true;
    var batch = [];
    var task;
    while ((task = self._sqlQueue.shift())) {
      batch.push(task);
    }
    runBatch(self, batch);
  }

  function executeSql(self, sql, args, sqlCallback, sqlErrorCallback) {
    self._sqlQueue.push(new SQLTask(sql, args, sqlCallback, sqlErrorCallback));
    if (self._runningTimeout) {
      return;
    }
    self._runningTimeout = true;
    lib(function () {
      self._runningTimeout = false;
      runAllSql(self);
    });
  }

  function WebSQLTransaction(websqlDatabase) {
    this._websqlDatabase = websqlDatabase;
    this._error = null;
    this._complete = false;
    this._runningTimeout = false;
    this._sqlQueue = new tinyQueue();
    if (!websqlDatabase._currentTask.readOnly) {
      // Since we serialize all access to the database, there is no need to
      // run read-only tasks in a transaction. This is a perf boost.
      this._sqlQueue.push(new SQLTask('BEGIN;', [], noopFn, noopFn));
    }
  }

  WebSQLTransaction.prototype.executeSql = function (sql, args, sqlCallback, sqlErrorCallback) {
    args = Array.isArray(args) ? args : [];
    sqlCallback = typeof sqlCallback === 'function' ? sqlCallback : noopFn;
    sqlErrorCallback = typeof sqlErrorCallback === 'function' ? sqlErrorCallback : errorUnhandled;

    executeSql(this, sql, args, sqlCallback, sqlErrorCallback);
  };

  WebSQLTransaction.prototype._checkDone = function () {
    runAllSql(this);
  };

  var WebSQLTransaction_1 = WebSQLTransaction;

  var ROLLBACK = [
    {sql: 'ROLLBACK;', args: []}
  ];

  var COMMIT = [
    {sql: 'END;', args: []}
  ];

  // v8 likes predictable objects
  function TransactionTask(readOnly, txnCallback, errorCallback, successCallback) {
    this.readOnly = readOnly;
    this.txnCallback = txnCallback;
    this.errorCallback = errorCallback;
    this.successCallback = successCallback;
  }

  function WebSQLDatabase(dbVersion, db) {
    this.version = dbVersion;
    this._db = db;
    this._txnQueue = new tinyQueue();
    this._running = false;
    this._currentTask = null;
  }

  WebSQLDatabase.prototype._onTransactionComplete = function(err) {
    var self = this;

    function done() {
      if (err) {
        self._currentTask.errorCallback(err);
      } else {
        self._currentTask.successCallback();
      }
      self._running = false;
      self._currentTask = null;
      self._runNextTransaction();
    }

    if (self._currentTask.readOnly) {
      done(); // read-only doesn't require a transaction
    } else if (err) {
      self._db.exec(ROLLBACK, false, done);
    } else {
      self._db.exec(COMMIT, false, done);
    }
  };

  WebSQLDatabase.prototype._runTransaction = function () {
    var self = this;
    var txn = new WebSQLTransaction_1(self);

    lib(function () {
      self._currentTask.txnCallback(txn);
      txn._checkDone();
    });
  };

  WebSQLDatabase.prototype._runNextTransaction = function() {
    if (this._running) {
      return;
    }
    var task = this._txnQueue.shift();

    if (!task) {
      return;
    }

    this._currentTask = task;
    this._running = true;
    this._runTransaction();
  };

  WebSQLDatabase.prototype._createTransaction = function(
      readOnly, txnCallback, errorCallback, successCallback) {
    errorCallback = errorCallback || noopFn;
    successCallback = successCallback || noopFn;

    if (typeof txnCallback !== 'function') {
      throw new Error('The callback provided as parameter 1 is not a function.');
    }

    this._txnQueue.push(new TransactionTask(readOnly, txnCallback, errorCallback, successCallback));
    this._runNextTransaction();
  };

  WebSQLDatabase.prototype.transaction = function (txnCallback, errorCallback, successCallback) {
    this._createTransaction(false, txnCallback, errorCallback, successCallback);
  };

  WebSQLDatabase.prototype.readTransaction = function (txnCallback, errorCallback, successCallback) {
    this._createTransaction(true, txnCallback, errorCallback, successCallback);
  };

  var WebSQLDatabase_1 = WebSQLDatabase;

  function customOpenDatabase(SQLiteDatabase) {

    function createDb(dbName, dbVersion) {
      var sqliteDatabase = new SQLiteDatabase(dbName);
      return new WebSQLDatabase_1(dbVersion, sqliteDatabase);
    }

    function openDatabase(args) {

      if (args.length < 4) {
        throw new Error('Failed to execute \'openDatabase\': ' +
          '4 arguments required, but only ' + args.length + ' present');
      }

      var dbName = args[0];
      var dbVersion = args[1];
      // db description and size are ignored
      var callback = args[4] || noopFn;

      var db = createDb(dbName, dbVersion);

      lib(function () {
        callback(db);
      });

      return db;
    }

    return argsarray(openDatabase);
  }

  var custom = customOpenDatabase;

  var custom$1 = custom;

  function map(arr, fun) {
    var len = arr.length;
    var res = Array(len);
    for (var i = 0; i < len; i++) {
      res[i] = fun(arr[i], i);
    }
    return res;
  }

  function zipObject(props, values) {
    var res = {};
    var len = Math.min(props.length, values.length);
    for (var i = 0; i < len; i++) {
      res[props[i]] = values[i];
    }
    return res;
  }

  function SQLiteResult(error, insertId, rowsAffected, rows) {
    this.error = error;
    this.insertId = insertId;
    this.rowsAffected = rowsAffected;
    this.rows = rows;
  }

  function massageError(err) {
    return typeof err === 'string' ? new Error(err) : err;
  }

  function SQLiteDatabase(name) {
    this._name = name;
  }

  function dearrayifyRow(res) {
    // use a compressed array format to send minimal data between
    // native and web layers
    var rawError = res[0];
    if (rawError) {
      return new SQLiteResult(massageError(res[0]));
    }
    var insertId = res[1];
    if (insertId === null) {
      insertId = void 0; // per the spec, should be undefined
    }
    var rowsAffected = res[2];
    var columns = res[3];
    var rows = res[4];
    var zippedRows = [];
    for (var i = 0, len = rows.length; i < len; i++) {
      zippedRows.push(zipObject(columns, rows[i]));
    }

    // v8 likes predictable objects
    return new SQLiteResult(null, insertId, rowsAffected, zippedRows);
  }

  // send less data over the wire, use an array
  function arrayifyQuery(query) {
    return [query.sql, (query.args || [])];
  }

  SQLiteDatabase.prototype.exec = function exec(queries, readOnly, callback) {

    function onSuccess(rawResults) {
      if (typeof rawResults === 'string') {
        rawResults = JSON.parse(rawResults);
      }
      var results = map(rawResults, dearrayifyRow);
      callback(null, results);
    }

    function onError(err) {
      callback(massageError(err));
    }

    cordova.exec(onSuccess, onError, 'SQLitePlugin', 'exec', [
      this._name,
      map(queries, arrayifyQuery),
      readOnly
    ]);
  };

  var openDB = custom$1(SQLiteDatabase);

  function SQLitePlugin() {
  }

  function openDatabase(name, version, description, size, callback) {
    if (name && typeof name === 'object') {
      // accept SQLite Plugin 1-style object here
      callback = version;
      size = name.size;
      description = name.description;
      version = name.version;
      name = name.name;
    }
    if (!size) {
      size = 1;
    }
    if (!description) {
      description = name;
    }
    if (!version) {
      version = '1.0';
    }
    if (typeof name === 'undefined') {
      throw new Error('please be sure to call: openDatabase("myname.db")');
    }
    return openDB(name, version, description, size, callback);
  }

  SQLitePlugin.prototype.openDatabase = openDatabase;

  var index = new SQLitePlugin();

  return index;

})));
});