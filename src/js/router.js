var Backbone = require('backbone');
var AppView = require('./views/app.view');
var LoginView = require('./views/login.view');
var RegistrationView = require('./views/registration.view');
var UsersView = require('./views/users.view');

var Router = Backbone.Router.extend({
  routes: {
    '': 'default',
    'login': 'login',
    'register': 'registration',
  },

  initialize: function() {
    this.view = new AppView();

    Backbone.history.start();
  },

  default: function() {
    this.view.switchView(UsersView);
  },

  login: function() {
    this.view.switchView(LoginView);
  },

  registration: function() {
    this.view.switchView(RegistrationView);
  },

});

module.exports = Router;
