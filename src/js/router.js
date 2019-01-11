var Backbone = require('backbone');
var AppView = require('./views/app.view');
var LoginView = require('./views/login.view');
var RegistrationView = require('./views/registration.view');
var UsersView = require('./views/users.view');
let FeedbackView = require('./views/feedback.view')

var Router = Backbone.Router.extend({
  routes: {
    '': 'default',
    'login': 'login',
    'register': 'registration',
    'feedback': 'feedback'
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

  feedback: function() {
    this.view.switchView(FeedbackView)
  }

});

module.exports = Router;
