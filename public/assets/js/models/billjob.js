define([
  'backbone'
], function() {

    var Billjob = Backbone.Model.extend({
        defaults : {},
        url : function() {
            return '/billjob';
        }
    });

  return Billjob;

});
