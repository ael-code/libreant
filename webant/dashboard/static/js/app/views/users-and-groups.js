/*global define*/
'use strict'

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/users-and-groups.html',
    'collections/users',
    'collections/groups',
    'bootstraptable'
], function ($, _, Backbone, UGTemplate, UsersCll, GroupsCll, Tables) {
    'use strict';

    var usersView = Backbone.View.extend({

        template: _.template(UGTemplate),

        el: $('#page-wrapper'),

        initialize: function () {
            _.bindAll(this, "render", "populateUsersTable", "populateGroupsTable");
            this.users = new UsersCll();
            this.users.fetch({success: this.populateUsersTable});
            this.groups = new GroupsCll();
            this.groups.fetch({success: this.populateGroupsTable});
        },

        render: function () {
            this.$el.html(this.template);
            this.usersTable = this.$('#users-table').bootstrapTable();
            this.groupsTable = this.$('#groups-table').bootstrapTable();
        },

        populateUsersTable: function(){
            this.usersTable.bootstrapTable('load',this.users.toJSON());
        },

        populateGroupsTable: function(){
            this.groupsTable.bootstrapTable('load',this.groups.toJSON());
        }
    });

    return usersView;
});
