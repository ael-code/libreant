'use strict'

define([
    'backbone',
], function (Backbone) {
    var CapabilityM = Backbone.Model.extend({
      urlRoot: API_URL + '/capabilities/',
      parse: function(response, options) {
        if (options.collection) return response;
        return response.data;
      },
    });
    return CapabilityM;
});
