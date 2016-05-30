define([
  'backbone'
], function() {

    var Collectioncenter = Backbone.Model.extend({
        defaults : {
            name: null
        },
        url : function() {
            return '/collectioncenter';
        }
    });

  return Collectioncenter;

});
