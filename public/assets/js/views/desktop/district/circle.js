// from home/main.js
define([
    'text!templates/desktop/district/main.html',
    'text!templates/desktop/data/sidebar.html',
    'backbone'
], function (aTemplate, aSidebar) {
    var aView = Backbone.View.extend({
        render:function () {
            $(this.options.main_el).html(_.template(aTemplate));
            $(this.options.sidebar_el).html(_.template(aSidebar));

            var parent_model_id = this.options.parent_model_id;
            require(['collections/districts', 'views/desktop/district/list'], function (Collection, CollectionView) {
                var aCollection = new Collection;
                aCollection.url = '/districts/circle/' + parent_model_id;
                var aCollectionView = new CollectionView({el:'#collection_div', 'collection':aCollection});
            });
        }
    });
    return aView;
});
