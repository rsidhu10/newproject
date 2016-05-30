define([
  'backbone'
], function() {

    var Habitation = Backbone.Model.extend({
        defaults : {
            authenticated: false,
            groups: null
        },
        url : function() {
            return this.id ? '/habitation/' + this.id : '/habitations';
        }
    });

  return Habitation;

});
