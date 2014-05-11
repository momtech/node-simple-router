// Make code portable to Node.js without any changes
try {
   var autobahn = require('autobahn');
} catch (e) {
   // when running in browser, AutobahnJS will
   // be included without a module system
}

// Set up WAMP connection to router
var protocol = location.protocol == 'https:' ? 'wss:' : 'ws:'
var connection = new autobahn.Connection({
   url: protocol + '//'+ location.host + '/wamp',
   realm: 'tutorialrpc'}
);

// Set up 'onopen' handler
connection.onopen = function (session) {
   console.log("Session opened - Id: ", session.id)
   setInterval(function() {
      session.call('com.timeservice.now').then(
         // RPC success callback
         function (now) {
            console.log("Current time:", now.args[0]);
         },
         // RPC error callback
         function (error) {
            console.log("Call failed:", error);
         }
      );
   }, 5000);
};

// Open connection
connection.open();