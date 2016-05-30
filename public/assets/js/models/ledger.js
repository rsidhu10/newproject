define([
  'backbone'
], function() {

    var Ledger = Backbone.Model.extend({
        defaults : {},
        url : function() {
            return '/ledger';
        }
    });

  return Ledger;

});
