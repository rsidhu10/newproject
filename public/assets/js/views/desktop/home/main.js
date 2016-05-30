define([
    'text!templates/desktop/home/main.html',
    'text!templates/desktop/home/sidebar.html',
    'leaflet.markercluster',
    'backbone'
], function(aTemplate, aSidebar)
{
    var randomIcon = function() {

        var icons = [
            "/assets/js/libs/images/blue.png",
            "/assets/js/libs/images/green.png",
            "/assets/js/libs/images/lightblue.png",
            "/assets/js/libs/images/orange.png",
            "/assets/js/libs/images/pink.png",
            "/assets/js/libs/images/purple.png",
//            "/assets/js/libs/images/red.png",
            "/assets/js/libs/images/yellow.png"
        ];

        return icons[Math.floor(Math.random()*icons.length)];
    }

    var aView = Backbone.View.extend({
        render: function(){
            $(this.options.main_el).html(_.template(aTemplate));
            $(this.options.sidebar_el).html(_.template(aSidebar));

            var map = L.map('map').setView([30.360047,76.368922], 8);
            // http://{s}.tile.osm.org/{z}/{x}/{y}.png
            // http://{s}.tile.cloudmade.com/e815b71d0a674e62962401db7a4f1e2b/997/256/{z}/{x}/{y}.png
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
                maxZoom: 18
            }).addTo(map);
//            var marker = L.marker([51.5, -0.09]).addTo(map);
//            var circle = L.circle([51.508, -0.11], 500, {
//                color: 'red',
//                fillColor: '#f03',
//                fillOpacity: 0.5
//            }).addTo(map);
//            var polygon = L.polygon([
//                [51.509, -0.08],
//                [51.503, -0.06],
//                [51.51, -0.047]
//            ]).addTo(map);

//            /////////////////////////////////////////////
//            var markers = new L.MarkerClusterGroup(
//            {
//                disableClusteringAtZoom: 12,
//                options: {
//                    iconCreateFunction: function(cluster) {
//                        return new L.DivIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
//                    }
//                }
//            });
//            /////////////////////////////////////////
//            var marker = new L.Marker(new L.LatLng(lat, long, { title: habitation_name }));
//            marker.bindPopup(habitation_name);
//            markers.addLayer(marker);
//            /////////////////////////////////////////
//            map.addLayer(markers);

            require(['collections/wings'], function (WingCollection) {
                var wings = new WingCollection;
                wings.url = "/mapdata/hierarchy";
                wings.fetch({
                    error:function (model, response) {
                        if (response.status == "404") {
                            console.log('error: no Templates found');
                        } else {
                            console.log("error, response: " + JSON.stringify(response));
                        }
                    },
                    success:function (model, response) {
                        var markers = new L.MarkerClusterGroup(
                        {
                            disableClusteringAtZoom: 12,
                            options: {
                                iconCreateFunction: function(cluster) {
                                    return new L.DivIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
                                }
                            }
                        });
                        _.each(model.models, function(wing) {
//                            console.log('WING: ', wing);
                            var circles = wing.get('circles');
                            _.each(circles, function(circle) {
//                                console.log('circle:',circle);
                                var districts = circle.districts;
                                _.each(districts, function(district) {
//                                    console.log('district:',district);
                                    var divisions = district.divisions;
                                    _.each(divisions, function(division) {
//                                        console.log('division:',division);
                                        var subdivisions = division.subdivisions;
                                        _.each(subdivisions, function(subdivision) {
//                                            console.log('subdivision:',subdivision);
                                            var blocks = subdivision.blocks;
                                            _.each(blocks, function(block) {
//                                                console.log('block:',block);
                                                var markers = new L.MarkerClusterGroup(
                                                {
                                                    disableClusteringAtZoom: 12,
                                                    options: {
                                                        iconCreateFunction: function(cluster) {
                                                            return new L.DivIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
                                                        }
                                                    }
                                                });
                                                var panchayats = block.panchayats;
                                                _.each(panchayats, function(panchayat) {
//                                                    console.log('panchayat:',panchayat);
                                                    var villages = panchayat.villages;
                                                    _.each(villages, function(village) {
//                                                        console.log('village:',village);
                                                        var habitations = village.habitations;
                                                        _.each(habitations, function(habitation) {
//                                                            console.log('habitation:',habitation);
                                                            var marker = new L.Marker(new L.LatLng(habitation.latitude, habitation.longitude, { title: habitation.name }));
                                                            marker.bindPopup(habitation.name);
                                                            markers.addLayer(marker);
                                                        });
                                                    });
                                                });
                                                map.addLayer(markers);
                                            });
                                        });
                                    });
                                });
                            });
                        });
//                        map.addLayer(markers);
                    }
                });
            });

            /*
            require(['collections/habitations'], function (HabitationCollection) {
                var habitations = new HabitationCollection;
                habitations.url = "/habitation/all";
                habitations.fetch({
                    error:function (model, response) {
                        if (response.status == "404") {
                            console.log('error: no Templates found');
                        } else {
                            console.log("error, response: " + JSON.stringify(response));
                        }
                    },
                    success:function (model, response) {
    //                    console.log("success! # of Templates: " + model.length);
                        // now we put them on the map?
    //                    console.log('model',model);

                        var minLat = 99999999;
                        var maxLat = 0;
                        var minLong = 99999999;
                        var maxLong = 0;

                        currentIcons = new Array();
                        _.each(model.models, function(habitation) {
    //                        console.log('habitation',habitation);
                            var thisIcon = "/assets/js/libs/images/blue-dot.png";
                            var lat = parseFloat(habitation.get('latitude'));
                            var long = parseFloat(habitation.get('longitude'));

                            var block_name = habitation.get('block_name');
                            var found = false;
                            _.each(currentIcons, function(x) {
                                //console.log('X',x);
                                if(x.block_name == block_name) {
                                    found = true;
                                    thisIcon = x.icon;
                                }
                            });

                            if(found != true) {
                                thisIcon = randomIcon();
                                currentIcons.push({block_name:block_name, icon:thisIcon});
                                console.log('New icon: ' + thisIcon);
                            }

                            if( (parseInt(lat) > 0) && (parseInt(long) > 0) ) {
                                if(lat < minLat) {
                                    minLat = lat;
                                }
                                if(lat > maxLat) {
                                    maxLat = lat;
                                }

                                if(long < minLong) {
                                    minLong = long;
                                }
                                if(long > maxLong) {
                                    maxLong = long;
                                }
                            }

                            if(parseInt(lat) > 0) {
                                var block_name = habitation.get('block_name');
    //                            console.log('creating new icon ' + thisIcon);
                                myIcon = L.icon({
                                    iconUrl: thisIcon,
                                    shadowUrl: '/assets/js/libs/images/msmarker.shadow.png',
                                    iconSize: [32, 32],
                                    iconAnchor: [16, 32]
    //                                popupAnchor: [-3, -76],
    //                                shadowSize: [40, 37],
    //                                shadowAnchor: [12, 35]
                                });
                                myIcon2 = L.icon({
                                    iconUrl: randomIcon(),
                                    shadowUrl: '/assets/js/libs/images/msmarker.shadow.png',
                                    iconSize: [32, 32],
                                    iconAnchor: [16, 32]
    //                                popupAnchor: [-3, -76],
    //                                shadowSize: [40, 37],
    //                                shadowAnchor: [12, 35]
                                });
                                var marker = L.marker([lat, long], {'title': habitation.get('name'), 'icon': myIcon}).addTo(map);
    //                            var marker2 = L.marker([lat, long], {'title': habitation.get('name')}).addTo(map);

                            }
                        });
                        console.log('all done, currentIcons:', currentIcons);
                        var centerLat = (minLat + maxLat) / 2;
                        var centerLong = (minLong + maxLong) / 2;
                        map.setView([centerLat,centerLong], 11);
                        var polygon = L.polygon([
                            [minLat, minLong],
                            [maxLat, minLong],
                            [maxLat, maxLong],
                            [minLat, maxLong]
                        ]).addTo(map);
                        ///////////////////////////////////////////////////////
                        ///////////////////////////////////////////////////////
                        ///////////////////////////////////////////////////////
    ////                    var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
    ////                    cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade, Points &copy 2012 LINZ',
    ////                    cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 17, attribution: cloudmadeAttribution}),
    ////                    latlng = new L.LatLng(-37.82, 175.24);
    ////
    ////                    var map = new L.Map('map', {center: latlng, zoom: 13, layers: [cloudmade]});
    //
    ////                    var markers = new L.MarkerClusterGroup();
    //                    var markers = new L.MarkerClusterGroup({ options: {
    //                        iconCreateFunction: function(cluster) {
    //                            return new L.DivIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
    //                        }
    //                    }});
    //
    //                    for (var i = 0; i < addressPoints.length; i++) {
    //                        var a = addressPoints[i];
    //                        var title = a[2];
    //                        var marker = new L.Marker(new L.LatLng(a[0], a[1]), { title: title });
    //                        marker.bindPopup(title);
    //                        markers.addLayer(marker);
    //                    }
    //
    //                    map.addLayer(markers);
                    }
                });
            });
            */
        }

    });

    return aView;
    /*********************************************************************************************************/


});
