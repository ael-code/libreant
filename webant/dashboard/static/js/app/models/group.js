'use strict'

define([
    'backbone',
    'collections/capabilities'
], function (Backbone, CapsCll) {
    var GroupM =  Backbone.Model.extend({
      urlRoot: API_URL + '/groups/',
      parse: function(response, options) {
        if (options.collection) return response;
        return response.data;
      },
      initialize: function() {
       this.capabilities = new CapsCll();
       this.capabilities.url = this.urlRoot + this.id + '/capabilities/';
      }
    });
    return GroupM;
});
