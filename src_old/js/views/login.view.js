var $ = require('jquery')
var Backbone = require('backbone');
var template = require('../templates/login.template.hbs');
var Session = require('../models/session');
var NotificationView = require('../views/notification.view');

var LoginView =  Backbone.View.extend({
  template: template,

  events: {
    "click #login-btn" : "login",
  },

  initialize: function() {
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  login: function() {
    var session = new Session();
    var login = $('input[name=email]').val()
    var password = $('input[name=password]').val()
    session.login(login, password)
      .then((response) => {
        new NotificationView().render();
      })
      .catch((response) => {
        new NotificationView().render();
      });
  }
})

module.exports = LoginView;
