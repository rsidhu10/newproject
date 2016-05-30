define([
    'models/consumer',
    'backbone'
], function (Consumer) {

    var ConsumerCollection = Backbone.Collection.extend({
        model:Consumer,
        comparator: function(item) {
            return item.get('name');
        },
        url:function () {
            return this.id ? '/consumer/' + this.id : '/consumer';
        }
    });

    return ConsumerCollection;

});