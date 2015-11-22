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
            _.bindAll(this, "render", "populateUsersTable",
                            "populateGroupsTable", "addUserCallBack");
            this.users = new UsersCll();
            this.users.on("sync", this.populateUsersTable);
            this.groups = new GroupsCll();
            this.users.on("sync", this.populateGroupsTable);
        },

        render: function () {
            this.$el.html(this.template);
            this.activateForms();
            this.usersTable = this.$('#users-table').bootstrapTable();
            this.usersTable.on('click-row.bs.table', function (e, row, $element) {
                window.router.navigate("users/"+row.id, {trigger: true});
            });
            this.groupsTable = this.$('#groups-table').bootstrapTable();
            this.groupsTable.on('click-row.bs.table', function (e, row, $element) {
                window.router.navigate("groups/"+row.id, {trigger: true});
            });
            this.groups.fetch();
            this.users.fetch();
        },

        activateForms: function() {
            this.$("#add-user-form").submit(this.addUserCallBack);
            this.$("#add-user-modal").on('hidden.bs.modal', function(e){ $(e.target).find(".alert").addClass('hide');});
        },

        populateUsersTable: function(){
            this.usersTable.bootstrapTable('load',this.users.toJSON());
        },

        populateGroupsTable: function(){
            this.groupsTable.bootstrapTable('load',this.groups.toJSON());
        },

        addUserCallBack: function(ev) {
            ev.preventDefault();
            var userElements = this.$("#add-user-form")[0].elements;
            this.users.create({name: userElements.username.value,
                               password: userElements.password.value},
                              {wait: true,
                               success: this.hideUserModal,
                               error: this.addUserErrorCallback});
        },

        hideUserModal: function(){
            $("#add-user-modal").modal('hide');
        },

        addUserErrorCallback: function(model, response){
            var alert = $("#add-user-modal .alert");
            alert.html("<b>Error: </b>" + response.responseJSON.error.details);
            alert.removeClass('hide');
        },
    });

    return usersView;
});
