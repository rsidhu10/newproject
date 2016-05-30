define([
  'backbone'
], function() {

    var Circle = Backbone.Model.extend({
        defaults : {},
        url : function() {
            return '/circle';
        }
    });

  return Circle;

});
