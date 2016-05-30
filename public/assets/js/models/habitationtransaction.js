define([
  'backbone'
], function() {

    var Habitationtransaction = Backbone.Model.extend({
        defaults : {
            authenticated: false,
            groups: null
        },
        url : function() {
            return this.id ? '/habitationtransactions/' + this.id : '/habitationtransactions';
        }
    });

  return Habitationtransaction;

});
