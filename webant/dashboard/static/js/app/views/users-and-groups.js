/*global define*/
'use strict'

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/users-and-groups.html',
    'collections/users',
    'models/user',
    'collections/groups',
    'bootstraptable'
], function ($, _, Backbone, UGTemplate, UsersCll, UserM, GroupsCll, Tables) {
    'use strict';

    var usersView = Backbone.View.extend({

        template: _.template(UGTemplate),

        el: $('#page-wrapper'),

        initialize: function () {
            _.bindAll(this, "render", "populateUsersTable", "populateGroupsTable", "addUserCallBack");
            this.users = new UsersCll();
            this.users.fetch({success: this.populateUsersTable});
            this.groups = new GroupsCll();
            this.groups.fetch({success: this.populateGroupsTable});
        },

        render: function () {
            this.$el.html(this.template);
            this.activateForms();
            this.usersTable = this.$('#users-table').bootstrapTable();
            this.usersTable.on('click-row.bs.table', function (e, row, $element) {
                console.log(row, $element);
                Window.router.navigate("users/"+row.id, {trigger: true});
            });
            this.groupsTable = this.$('#groups-table').bootstrapTable();
            this.groupsTable.on('click-row.bs.table', function (e, row, $element) {
                console.log(row, $element);
            });
        },

        activateForms: function() {
            this.$("#add-user-form").submit(this.addUserCallBack);
        },

        addUserCallBack: function(ev) {
            ev.preventDefault();
            var userElements = this.$("#add-user-form")[0].elements;
            console.log(userElements);
            var user = new UserM({name: userElements.username.value,
                                        password: userElements.password.value});
            user.save();
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
