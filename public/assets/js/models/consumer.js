define([
  'backbone'
], function() {

    var Consumer = Backbone.Model.extend({
        defaults : {},
        url : function() {
            return '/consumer';
        }
    });

  return Consumer;

});
