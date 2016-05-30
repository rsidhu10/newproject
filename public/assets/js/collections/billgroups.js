define([
    'models/billgroup',
    'backbone'
], function (Billgroup) {

    var BillGroupCollection = Backbone.Collection.extend({
        model:Billgroup,
        url:function () {
            return this.id ? '/billgroup/' + this.id : '/billgroup';
        }
    });

    return BillGroupCollection;

});