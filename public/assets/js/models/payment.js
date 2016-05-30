define([
  'backbone'
], function() {

    var Payment = Backbone.Model.extend({
        defaults : {},
        url : function() {
            return '/payment';
        }
    });

  return Payment;

});
