define([
  'backbone'
], function() {

    var Bill = Backbone.Model.extend({
        defaults : {},
        url : function() {
            return '/bill';
        }
    });

  return Bill;

});
