define([
    'models/habitation',
    'text!templates/desktop/habitation/editmodel.html',
    'backbone.bootstrap-modal'
], function (aModel, editTemplate) {

    /** ************************************************ **/
    var TemplateModelEditView = Backbone.View.extend({
        tagName:'div',
        template:_.template(editTemplate),
        //className:'alert-message warning',
        events:{
            "click":'modelClicked',
            "change":'inputChanged'
        },
        initialize:function () {
            console.log('Init, model:',this.model);
            _.bindAll(this, 'render');
            this.model.bind('change', this.change);
        },
        change: function() {
            console.log('Change, model:',this.model);
            this.render();
        },
        render:function () {
            console.log('Render, model:',this.model);
            $(this.el).html(this.template(this.model.toJSON()));
//            $(this.el).html('<h2>Test Test!</h2>');
            return this;
        },
        modelClicked:function (e) {
            e.stopPropagation();
            return false;
        },
        inputChanged:function(e) {
            e.stopPropagation();
//            console.log('input changed, event: ', e);
            var item = e.target.attributes.getNamedItem('name').value;
            var new_value = e.target.value;
            console.log('item:'+item+' val:'+new_value);
            return false;
        }
    });

    return TemplateModelEditView;
});
