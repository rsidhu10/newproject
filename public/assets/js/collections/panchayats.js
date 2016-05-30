define([
    'models/panchayat',
    'backbone'
], function (Panchayat) {

    var PanchayatCollection = Backbone.Collection.extend({
        model:Panchayat,
        comparator: function(item) {
            return item.get('name');
        },
        url:function () {
            return this.id ? '/panchayat/' + this.id : '/panchayat';
        }
    });

    return PanchayatCollection;

});