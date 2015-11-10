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
        }
    });

    return MainRouter;
});
