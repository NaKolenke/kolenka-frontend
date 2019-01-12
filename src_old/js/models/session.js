var $ = require('jquery')
var Backbone = require('backbone');
var Config = require('./config');
var User = require('./user');

var Session = Backbone.Model.extend({

    initialize: function() {
        this.user = null;
    },

    login: function(login, password) {
        return new Promise( (resolve, reject) => {
            $.ajax({
                url: Config.apiUrl + '/users/login/',
                contentType: 'application/json',
                dataType: 'json',
                method: 'POST',
                data: JSON.stringify( {username: login, password: password} ),
            })
            .done(function(response) {
                if (response.success == 1) {
                    resolve(response);
                } else {
                    reject(response.error);
                }
            })
            .fail(function(response) {
                reject(response.responseJSON.error);
            });
        });
    }
});

module.exports = Session;
