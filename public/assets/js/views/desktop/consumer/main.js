// from home/main.js
define([
    'text!templates/desktop/consumer/main.html',
    'text!templates/desktop/data/sidebar.html',
    'backbone'
], function (aTemplate, aSidebar) {
    var aView = Backbone.View.extend({
        render:function () {
            $(this.options.main_el).html(_.template(aTemplate));
            $(this.options.sidebar_el).html(_.template(aSidebar));

            require(['collections/consumers', 'views/desktop/consumer/list'], function (Collection, CollectionView) {
                var aCollection = new Collection;
                var aCollectionView = new CollectionView({el:'#collection_div', 'collection':aCollection});
            });
        }
    });
    return aView;
});
