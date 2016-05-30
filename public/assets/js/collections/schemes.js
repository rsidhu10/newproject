define([
    'models/scheme',
    'backbone'
], function (Scheme) {

    var SchemeCollection = Backbone.Collection.extend({
        model:Scheme,
        comparator: function(item) {
            return item.get('name');
        },
        url:function () {
            return this.id ? '/scheme/' + this.id : '/scheme/all';
        }
    });

    return SchemeCollection;

});