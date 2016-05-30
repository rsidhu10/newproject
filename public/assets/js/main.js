requirejs.config({
    paths:{
        'jquery':'libs/jquery-1.7.2',
        'jquery.cookie': 'libs/jquery.cookie',
        'underscore':'libs/underscore',
        'backbone':'libs/backbone',
        'text':'libs/text',
        'json2':'libs/json2',
        'bootstrap':'libs/bootstrap',
        'bootstrap-datepicker': 'libs/bootstrap-datepicker',
        'backbone.bootstrap-modal': 'libs/backbone.bootstrap-modal',
        'templates':'../templates',
        'jquery.select2': 'libs/select2.min',
        'leaflet': 'libs/leaflet-0.4.4',
        'leaflet.markercluster': 'libs/leaflet.markercluster-src',
        'highcharts': 'libs/highcharts',
        'springy': 'libs/springy',
        'springyui': 'libs/springyui-jsidhu',
        'arbor': 'libs/arbor',
        'arbor-graphics': 'libs/graphics',
        'arbor-tween': 'libs/arbor-tween',
        'backbone-pageable': 'libs/backbone-pageable.min',
        'backgrid': 'libs/backgrid',
        'backgrid-text-cell': 'libs/extensions/text-cell/backgrid-text-cell.min',
        'backgrid-select-all': 'libs/extensions/select-all/backgrid-select-all.min'
    },
    shim:{
        'highcharts': {
            deps:['jquery'],
            exports:'Highcharts'
        },
        'jquery.cookie':['jquery'],
        'jquery.select2':['jquery'],
        'bootstrap-datepicker':['bootstrap'],
        'backbone.bootstrap-modal':['backbone'],
        'bootstrap':['jquery'],
        'backbone-pageable': ['backbone'],
        'backbone':{
            deps:['json2', 'underscore', 'jquery', 'bootstrap', 'bootstrap-datepicker'],
            exports:'backbone'
        },
        'backgrid-select-all': ['backgrid-text-cell'],
        'backgrid-text-cell': ['backgrid'],
        'backgrid':{
            deps:['', 'backbone'],
            exports:'Backgrid'
        },
        'leaflet.markercluster': {
            deps: ['leaflet'],
            exports: 'L'
        },
        'leaflet': {
            deps: ['jquery'],
            exports: 'L'
        },
        'springy': {
            deps: ['jquery'],
            exports: 'Springy'
        },
        'springyui': {
            deps: ['springy'],
            exports: 'Springy'
        },
        'arbor':['jquery'],
        'arbor-tween':['arbor'],
        'arbor-graphics':['arbor-tween']
    }
});

define(['jquery.select2', 'jquery.cookie', 'backbone'], function () {
        Backbone.emulateJSON = true;
        require([
            'desktop_app'
        ], function (DesktopApp) {
            DesktopApp.initialize();
        });
    }
);
