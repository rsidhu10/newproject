define([
    'models/billjob',
    'backbone'
], function (Billjob) {

    var BillJobCollection = Backbone.Collection.extend({
        model:Billjob,
        url:function () {
            return this.id ? '/billjob/' + this.id : '/billjob';
        }
    });

    return BillJobCollection;

});