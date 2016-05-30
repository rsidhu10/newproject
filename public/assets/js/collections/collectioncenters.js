define([
    'models/collectioncenter',
    'backbone'
], function (CollectionCenter) {

    var CollectionCenterCollection = Backbone.Collection.extend({
        model:CollectionCenter,
        comparator: function(item) {
            return item.get('name');
        },
        url:function () {
            return this.id ? '/collectioncenter/' + this.id : '/collectioncenter/all';
        }
    });

    return CollectionCenterCollection;

});