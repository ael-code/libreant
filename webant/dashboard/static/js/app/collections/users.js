'use strict'

define([
    'backbone',
    'models/user'
], function (Backbone, UserM) {
    var UserCll = Backbone.Collection.extend({
      url: API_URL + '/users/',
      model: UserM,
      parse: function(response) {
        return response.data;
      },
    });
    return UserCll;
});
