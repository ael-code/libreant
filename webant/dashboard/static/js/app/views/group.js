'use strict'

define([
  'jquery',
  'underscore',
  'backbone',
  'bootstraptable',
  'models/group',
  'text!templates/group.html'
], function ($, _, Backbone, BootstrapTable, GroupM, GroupT) {

    var GroupV = Backbone.View.extend({

        template: _.template(GroupT),

        el: $('#page-wrapper'),

        initialize: function (gid) {
            _.bindAll(this, 'drawGroup', 'populateCapabilitiesTable');
            this.group = new GroupM({'id': gid});
            this.group.fetch({success: this.drawGroup});
            this.group.capabilities.fetch({success: this.populateCapabilitiesTable});
        },

        render: function () {
            this.$el.html("<p>Loding...</p>");
        },

        drawGroup: function() {
            this.$el.html(this.template(this.group.attributes));
            this.$("#capabilities-table").bootstrapTable()
        },

        populateCapabilitiesTable: function() {
            this.$('#capabilities-table').bootstrapTable('load', this.group.capabilities.toJSON());
        },
    });

    return GroupV;
});
