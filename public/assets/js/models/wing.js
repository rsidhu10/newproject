define([
  'backbone'
], function() {

    var Wing = Backbone.Model.extend({
        defaults : {},
        url : function() {
            return this.id ? '/wing/' + this.id : '/wing/all';
        }
    });

  return Wing;

});
