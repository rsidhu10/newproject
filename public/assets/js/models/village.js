define([
  'backbone'
], function() {

    var Village = Backbone.Model.extend({
        defaults : {},
        url : function() {
            return '/village';
        }
    });

  return Village;

});
