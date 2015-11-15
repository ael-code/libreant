/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/not-found.html'
], function ($, _, Backbone, notFoundT) {
    'use strict';

    var View = Backbone.View.extend({

        template: _.template(notFoundT),

        el: $('#page-wrapper'),

        initialize: function () {},

        render: function () {
            this.$el.html(this.template);
        }
    });

    return View;
});
