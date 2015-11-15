define([
    'backbone',
], function (Backbone) {
    var GroupsCll = Backbone.Collection.extend({
      url: API_URL + '/groups/',
      parse: function(response) {
        return response.data;
      },
    });
    return GroupsCll;
});
