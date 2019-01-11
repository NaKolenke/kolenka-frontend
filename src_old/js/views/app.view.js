var $ = require('jquery')
var Backbone = require('backbone');
var HeaderView = require('./header.view');

var AppView =  Backbone.View.extend({
  el: '#content',

  initialize: function() {
    this.view = null;
    this.header = new HeaderView();
  },

  render: function() {
    if (this.view != null) {
      this.view.render();
      this.$el.append(this.view.el)
    }
    this.header.render();
    return this;
  },

  switchView: function(NewView) {
    if (this.view != null) {
      this.view.remove();
    }

    this.view = new NewView();

    this.render();
  }
})

module.exports = AppView;
