define([
  'backbone'
], function() {

    var Block = Backbone.Model.extend({
        defaults : {},
        url : function() {
            return '/block';
        }
    });

  return Block;

});
