define([
    'models/block',
    'backbone'
], function (Block) {

    var BlockCollection = Backbone.Collection.extend({
        model:Block,
        comparator: function(item) {
            return item.get('name');
        },
        url:function () {
            return this.id ? '/block/' + this.id : '/block';
        }
    });

    return BlockCollection;

});