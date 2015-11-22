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
            _.bindAll(this, 'drawUser', 'changePwdCallback');
            this.user = new UserM({'id': uid});
            this.user.fetch({success: this.drawUser});
        },

        render: function () {
            this.$el.html("<p>Loding...</p>");
        },

        drawUser: function() {
            this.$el.html(this.template(this.user.attributes));
            this.$("#change-pwd-form").submit(this.changePwdCallback);
            this.$("#change-pwd-modal").on('hidden.bs.modal', function(e){ $(e.target).find(".alert").addClass('hide');});
        },

        changePwdCallback: function(ev) {
            ev.preventDefault();
            var newPwd = this.$("#change-pwd-form")[0].elements.password.value;
            this.user.save({password: newPwd},
                           {wait: true,
                            patch: true,
                            success: function(){$("#change-pwd-modal").modal('hide');},
                            error: this.changePwdErrorCallback});
        },

        changePwdErrorCallback: function(model, response){
            var errMsg = "could not change the password";
            if(response.readyState == 0){
                errMsg = "could not contact the server"
            }else if(response.readyState == 4){
                errMsg = response.responseJSON.error.details;
            }
            var alert = $("#change-pwd-modal .alert");
            alert.html("<b>Error:</b> "+errMsg);
            alert.removeClass('hide');
        },
    });

    return UserV;
});
