define([
  'backbone'
], function() {

    var Panchayat = Backbone.Model.extend({
        defaults : {
            authenticated: false,
            groups: null
        },
        url : function() {
            return '/panchayat';
        }
    });

  return Panchayat;

});
