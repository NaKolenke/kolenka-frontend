var $ = require('jquery')
var Backbone = require('backbone');
var template = require('../templates/feedback.template.hbs');
var NotificationView = require('../views/notification.view');

var LoginView =  Backbone.View.extend({
  template: template,

  events: {
    "click #send-btn" : "send",
  },

  initialize: function() {
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  send: function(e) {
	e.preventDefault();
	
	var text = $('input[name=text]').val()
    $.ajax({
		url: Config.apiUrl + '/feedback/',
		contentType: 'application/json',
		dataType: 'json',
		method: 'POST',
		data: JSON.stringify( {text} ),
	})
	.done(function(response) {
		
	})
	.fail(function(response) {
		
	});
  }
})

module.exports = LoginView;
