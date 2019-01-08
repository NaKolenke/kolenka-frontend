var Backbone = require('backbone');
var Config = require('./config');
var Model = require('./user');

var Users = Backbone.Collection.extend({
    url: Config.apiUrl + '/users/',
    model: Model,
});

module.exports = Users;
