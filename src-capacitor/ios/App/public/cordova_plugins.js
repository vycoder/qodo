
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "cordova-plugin-network-information.Connection",
          "file": "plugins/cordova-plugin-network-information/www/Connection.js",
          "pluginId": "cordova-plugin-network-information",
        "clobbers": [
          "Connection"
        ]
        },
      {
          "id": "cordova-plugin-network-information.network",
          "file": "plugins/cordova-plugin-network-information/www/network.js",
          "pluginId": "cordova-plugin-network-information",
        "clobbers": [
          "navigator.connection",
          "navigator.network.connection"
        ]
        },
      {
          "id": "cordova-plugin-sqlite-2.sqlitePlugin",
          "file": "plugins/cordova-plugin-sqlite-2/dist/sqlite-plugin.js",
          "pluginId": "cordova-plugin-sqlite-2",
        "clobbers": [
          "sqlitePlugin"
        ]
        },
      {
          "id": "cordova-plugin-purchase.InAppPurchase",
          "file": "plugins/cordova-plugin-purchase/www/store-ios.js",
          "pluginId": "cordova-plugin-purchase",
        "clobbers": [
          "store"
        ]
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-plugin-network-information": "2.0.2",
      "cordova-plugin-purchase": "10.2.0",
      "cordova-plugin-sqlite-2": "1.0.6"
    };
    // BOTTOM OF METADATA
    });
    