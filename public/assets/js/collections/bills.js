define([
    'models/bill',
    'backbone'
], function (Bill) {

    var BillCollection = Backbone.Collection.extend({
        model:Bill,
        url:function () {
            return this.id ? '/bill/' + this.id : '/bill';
        }
    });

    return BillCollection;

});