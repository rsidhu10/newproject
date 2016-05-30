define([
  'backbone'
], function() {

    var District = Backbone.Model.extend({
        defaults : {},
        url : function() {
            return '/district';
        }
    });

  return District;

});
