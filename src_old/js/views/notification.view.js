var $ = require('jquery')
var Backbone = require('backbone');
var template = require('../templates/notification.template.hbs');

var NotificationView =  Backbone.View.extend({
  template: template,

  events: {
    "click .btn-clear" : "close",
  },

  initialize: function() {
  },

  render: function() {
    this.$el.html(this.template({text: 'title'}));

    $('body').append(this.$el)

    var self = this;
    setTimeout(function(){
      self.close();
    }, 3000);

    return this;
  },

  close: function() {
    this.remove();
  }
})

module.exports = NotificationView;
