'use strict';

define('jquery', [], function() {
            return jQuery;
        });

var SF = STATIC_FOLDER;
requirejs.config({
    baseUrl: SF + "js/app",
    paths: {
        lib:  SF + "js/lib",
        backbone:  SF + "js/lib/backbone.min",
        underscore: SF + "js/lib/underscore.min",
        text: SF + "js/lib/text",
        bootstraptable: SF + "js/lib/bootstrap-table.min"
    }
});

require([
    'backbone', 'mainrouter'
], function (Backbone, Router) {
    Window.router = new Router();
    Backbone.history.start({pushState: true, root: DASHBOARD_URL+"/"});
});
