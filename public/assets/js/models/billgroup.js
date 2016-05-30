define([
  'backbone'
], function() {

    var Billgroup = Backbone.Model.extend({
        defaults : {},
        url:function () {
            return this.id ? '/billgroups/' + this.id : '/billgroups';
        }
    });

  return Billgroup;

});
