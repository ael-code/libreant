'use strict'

define([
    'backbone',
    'models/group'
], function (Backbone, GroupM) {
    var GroupsCll = Backbone.Collection.extend({
      model: GroupM,
      url: API_URL + '/groups/',
      parse: function(response) {
        return response.data;
      },
    });
    return GroupsCll;
});
