var $ = require('jquery')
var Backbone = require('backbone');
var template = require('../templates/registration.template.hbs');

var RegistrationView =  Backbone.View.extend({
  template: template,

  initialize: function() {
  },

  render: function() {
    this.$el.html(this.template(
    ));
    return this;
  }
})

module.exports = RegistrationView;
