define([
    'models/village',
    'backbone'
], function (Village) {

    var VillageCollection = Backbone.Collection.extend({
        model:Village,
        comparator: function(item) {
            return item.get('name');
        },
        url:function () {
            return this.id ? '/village/' + this.id : '/village';
        }
    });

    return VillageCollection;

});