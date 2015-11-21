'use strict'

define([
    'backbone',
    'models/capability'
], function (Backbone, CapabilityM) {
    var CapabilitiesCll = Backbone.Collection.extend({
      model: CapabilityM,
      parse: function(response) {
        return response.data;
      },
    });
    return CapabilitiesCll;
});
