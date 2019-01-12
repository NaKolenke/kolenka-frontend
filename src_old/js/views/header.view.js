var $ = require('jquery')
var Backbone = require('backbone');
var template = require('../templates/header.template.hbs');

var HeaderView =  Backbone.View.extend({
  el: '#header',
  template: template,

  initialize: function() {
  },

  render: function() {
    this.$el.html(this.template(
    ));
    return this;
  }
})

module.exports = HeaderView;
