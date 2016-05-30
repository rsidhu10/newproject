define([
    'text!templates/desktop/billing/main.html',
    'text!templates/desktop/billing/sidebar.html',
    'backbone'
], function (aTemplate, aSidebar) {
    var aView = Backbone.View.extend({
        render:function () {
            $(this.options.main_el).html(_.template(aTemplate));
            $(this.options.sidebar_el).html(_.template(aSidebar));
            var filter = this.options.filter;
            var page = this.options.page;

            require(['collections/billjobs', 'views/desktop/billing/list'], function (Collection, CollectionView) {
                var aCollection = new Collection;
                aCollection.url = "/billjob/" + filter + "/" + page;
                var aCollectionView = new CollectionView({el:'#collection_div', 'collection':aCollection, 'filter':filter, 'page':page});
            });
        }
    });
    return aView;
});
