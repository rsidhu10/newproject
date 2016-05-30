// from home/main.js
define([
    'text!templates/desktop/habitation/main.html',
    'text!templates/desktop/data/sidebar.html',
    'text!templates/desktop/account/sidebar.html',
    'backbone'
], function (aTemplate, aSidebarAdmin, aSidebarUser) {
    var aView = Backbone.View.extend({
        render:function () {
            $(this.options.main_el).html(_.template(aTemplate));
            if(this.options.group == 100) {
                $(this.options.sidebar_el).html(_.template(aSidebarAdmin));
            } else {
                $(this.options.sidebar_el).html(_.template(aSidebarUser));
            }

            require(['collections/habitations', 'views/desktop/habitation/list'], function (Collection, CollectionView) {
                var aCollection = new Collection;
                var aCollectionView = new CollectionView({el:'#collection_div', 'collection':aCollection});
            });
        }
    });
    return aView;
});
