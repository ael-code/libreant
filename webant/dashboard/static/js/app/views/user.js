/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'models/user',
    'text!templates/user.html'
], function ($, _, Backbone, UserM, UserT) {
    'use strict';

    var UserV = Backbone.View.extend({

        template: _.template(UserT),

        el: $('#page-wrapper'),

        initialize: function (uid) {
            _.bindAll(this, 'drawUser');
            this.user = new UserM({'id': uid});
            this.user.fetch({success: this.drawUser});
        },

        render: function () {
            this.$el.html("<p>Loding...</p>");
        },

        drawUser: function() {
            this.$el.html(this.template(this.user.attributes));
        }
    });

    return UserV;
});
