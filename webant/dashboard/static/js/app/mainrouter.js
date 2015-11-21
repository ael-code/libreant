/*global define*/

define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var MainRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'index': 'home',
            'users-and-groups': 'usersAndGroups',
            'users/:uid': 'user',
            'groups/:gid': 'group',
            '*path': 'notFoundRoute'
        },

        initialize: function() {console.log('Initializing router')},
        test: function(){
                console.log("test");
              },

        home: function(){
            require(['views/home'], function(HomeV){
                console.log('Moving to "home"');
                var HomeV = new HomeV();
                HomeV.render();
            });
        },

        usersAndGroups: function(){
            require(['views/users-and-groups'], function(UGView){
                console.log('Moving to "users & groups"');
                var UGView = new UGView();
                UGView.render();
            });
        },

        user: function(uid){
            require(['views/user'], function(UserV){
                var UserV = new UserV(uid);
                UserV.render();
            });
        },

        group: function(gid){
            require(['views/group'], function(GroupV){
                var GroupV = new GroupV(gid);
                GroupV.render();
            });
        },

        notFoundRoute: function(path){
            require(['views/not-found'], function(NotFoundV){
                var notFoundV = new NotFoundV();
                notFoundV.render();
            });
        }
    });

    return MainRouter;
});
