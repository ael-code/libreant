'use strict'

define([
    'backbone',
], function (Backbone) {
    var GroupM =  Backbone.Model.extend({
      urlRoot: API_URL + '/groups/',
      parse: function(response, options) {
        if (options.collection) return response;
        return response.data;
      },
    });
    return GroupM;
});
