define([
    'backbone',
], function (Backbone) {
    var UserM = Backbone.Model.extend({
      urlRoot: API_URL + '/users/',
      parse: function(response) {
        return response.data;
      },
    });
    return UserM;
});

