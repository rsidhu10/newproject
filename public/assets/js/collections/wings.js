define([
    'models/wing',
    'backbone'
], function (Wing) {

    var WingCollection = Backbone.Collection.extend({
        model:Wing,
        comparator: function(item) {
            return item.get('name');
        },
        url:function () {
            return this.id ? '/wing/' + this.id : '/wing/all';
        }
    });

    return WingCollection;

});