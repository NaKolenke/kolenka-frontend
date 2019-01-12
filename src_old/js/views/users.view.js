var $ = require('jquery')
var Backbone = require('backbone');
var Model = require('../models/users');
var template = require('../templates/users.template.hbs');
var userTemplate = require('../templates/user.template.hbs');

var UserView =  Backbone.View.extend({
  el: 'ul',
  template: userTemplate,

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },

  render: function() {
    this.$el.html(this.template(
      {name: this.model.get('name')}
    ));
    return this;
  }
})

var UsersView = Backbone.View.extend({
  template: template,

  initialize: function() {
    this.$el.html(this.template())

    this.collection = new Model();

    this.listenTo(this.collection, 'add', this.addOne);
    this.listenTo(this.collection, 'reset', this.addAll);
    this.listenTo(this.collection, 'all', this.render);

    this.collection.fetch();
  },

  render: function() {
  },

  addOne: function(user) {
    var view = new UserView({model: user});
    this.$el.append(view.render().el);
  },

  addAll: function() {
    this.collection.each(this.addOne, this);
  },


});

module.exports = UsersView;
