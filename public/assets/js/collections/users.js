define([
    'models/user',
    'backbone'
], function (User) {

    var UserCollection = Backbone.Collection.extend({
        model:User,
        comparator: function(item) {
            return item.get('username');
        },
        url:function () {
            return this.id ? '/user/' + this.id : '/user';
        }
    });

    return UserCollection;

});