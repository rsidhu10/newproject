define([
    'models/auditlog',
    'backbone'
], function (AuditLog) {

    var AuditLogCollection = Backbone.Collection.extend({
        model:AuditLog,
        url:function () {
            return this.id ? '/auditlog/' + this.id : '/auditlog/all';
        }
    });

    return AuditLogCollection;

});