define([
    'backbone',
], function (Backbone) {
    var UserCll = Backbone.Collection.extend({
      url: API_URL + '/users/',
      parse: function(response) {
        return response.data;
      },
    });
    return UserCll;
});
