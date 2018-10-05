var $ = require('jquery')
var Backbone = require('backbone');
var template = require('../templates/home.template.hbs');

var HomeView = Backbone.View.extend({
  el: '#main',
  template: template,

  render: function() {
    this.$el.html(template(
      {name: 'Username'}
    ));
  }
});

module.exports = HomeView;
