define([
  'backbone'
], function() {

    var AuditLog = Backbone.Model.extend({
        defaults : {},
        url : function() {
            return this.id ? '/auditlog/' + this.id : '/auditlog/all';
        }
    });

  return AuditLog;

});
