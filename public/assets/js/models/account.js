define([
  'backbone'
], function() {

    var Account = Backbone.Model.extend({
        defaults : {},
        url : function() {
            return '/account';
        }
    });

  return Account;

});
