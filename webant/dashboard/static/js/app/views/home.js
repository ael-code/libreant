/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/home.html'
], function ($, _, Backbone, HomeT) {
    'use strict';

    var HomeView = Backbone.View.extend({

        template: _.template(HomeT),

        el: $('#page-wrapper'),

        initialize: function () {},

        render: function () {
            this.$el.html(this.template);
        }
    });

    return HomeView;
});
