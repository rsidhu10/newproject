define([
    'text!templates/desktop/billing/jobs.html',
    'text!templates/desktop/billing/sidebar.html',
    'backbone'
], function(aTemplate, aSidebar)
{
    var aView = Backbone.View.extend({
        render: function(){
            $(this.options.main_el).html(_.template(aTemplate));
            $(this.options.sidebar_el).html(_.template(aSidebar));
        }
    });
    return aView;
});
