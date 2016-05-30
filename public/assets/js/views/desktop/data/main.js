define([
    'text!templates/desktop/data/main.html',
    'text!templates/desktop/data/sidebar.html',
    'collections/wings',
    'collections/circles',
    'collections/districts',
    'collections/divisions',
    'collections/subdivisions',
    'collections/blocks',
    'collections/panchayats',
    'collections/villages',
    'collections/habitations',
    'arbor-graphics',
    'springyui',
    'backbone'
], function (aTemplate, aSidebar, Wings, Circles, Districts, Divisions, Subdivisions, Blocks, Panchayts, Villages, Habitations) {
    // got it from here: http://d.alliscalm.net/vintro/
    var aView = Backbone.View.extend({
        initialize: function () {
            console.log('init data ');
            _.bindAll(this, 'render');
            _.bindAll(this, 'springyGraph');
            _.bindAll(this, 'springy_wingsReset');
            _.bindAll(this, 'doArbor');
            _.bindAll(this, 'arbor_Renderer');
            _.bindAll(this, 'arbor_site');
            _.bindAll(this, 'arbor_site_renderer');
            _.bindAll(this, 'arbor_wings');
            _.bindAll(this, 'arbor_wings_reset');
            _.bindAll(this, 'arbor_other_renderer');
        },
        render: function () {
            console.log('render data ');
            $(this.options.main_el).html(_.template(aTemplate));
            $(this.options.sidebar_el).html(_.template(aSidebar));
//            this.springyGraph();
//            this.doArbor();
//            this.arbor_site();
            this.arbor_wings();
        },
        doArbor: function () {
            var sys = arbor.ParticleSystem(1000, 600, 0.5);
            sys.parameters({gravity: true});
            sys.renderer = this.arbor_Renderer("#graphVis");
            // add some nodes to the graph and watch it go...
            sys.addEdge('a', 'b');
            sys.addEdge('a', 'c');
            sys.addEdge('a', 'd');
            sys.addEdge('a', 'e');
            sys.addNode('f', {alone: true, mass: .25});
        },
        arbor_wings: function() {
            console.log('arbor_wings');
            this.wings = new Wings();
            this.wings.bind('reset', this.arbor_wings_reset);
            this.wings.url = "/hierarchy";
            this.wings.fetch({reset: true});
        },
        arbor_wings_reset: function() {
            var nodes = {};
            var edges = {};

            this.wings.each(function (wing) {
                var wing_edges = {};
                var percent = parseInt((parseInt(wing.get('consumers_num_accounts_positive_balance')) / parseInt(wing.get('consumers_num_accounts_connected'))) * 100) || 0;
//                var wing_node = graph.newNode({label: wing.get('name'), type: "wing", id: wing.id, connected: wing.get('consumers_num_accounts_connected')});
                nodes['wing' + '-' + wing.id] = {name: wing.get('name'), color: "red", alpha: 1, type:'wing', overdue_percent: percent, bills_open: wing.habitations_current_month_bills_open, bills_closed: wing.habitations_current_month_bills_closed};
                var circles = wing.get('circles');
                _.each(circles, function (circle) {
                    var circle_edges = {};
                    var percent = parseInt((parseInt(circle.consumers_num_accounts_positive_balance) / parseInt(circle.consumers_num_accounts_connected)) * 100) || 0;
//                    var circle_node = graph.newNode({label: circle.name, type: "circle", id: circle.id, connected: circle.consumers_num_accounts_connected});
                    nodes['circle' + '-' + circle.id] = {name: circle.name, color: "green", alpha: 1, type:'circle', overdue_percent: percent, bills_open: circle.habitations_current_month_bills_open, bills_closed: circle.habitations_current_month_bills_closed};
                    wing_edges['circle' + '-' + circle.id] = {length:.8};
                    var districts = circle.districts;
                    _.each(districts, function (district) {
                        var district_edges = {};
                        var percent = parseInt((parseInt(district.consumers_num_accounts_positive_balance) / parseInt(district.consumers_num_accounts_connected)) * 100) || 0;
//                        var district_node = graph.newNode({label: district.name, type: "district", id: district.id, connected: district.consumers_num_accounts_connected, overdue_percent: percent});
                        nodes['district' + '-' + district.id] = {name: district.name, color: "blue", alpha: 1, type:'district', overdue_percent: percent, bills_open: district.habitations_current_month_bills_open, bills_closed: district.habitations_current_month_bills_closed};
                        circle_edges['district' + '-' + district.id] = {length:.8};
                        var divisions = district.divisions;
                        _.each(divisions, function (division) {
                            var division_edges = {};
                            var percent = parseInt((parseInt(division.consumers_num_accounts_positive_balance) / parseInt(division.consumers_num_accounts_connected)) * 100) || 0;
//                            var division_node = graph.newNode({label: division.name, type: "division", id: division.id, connected: division.consumers_num_accounts_connected, overdue_percent: percent});
                            nodes['division' + '-' + division.id] = {name: division.name, color: "orange", alpha: 1, type:'division', overdue_percent: percent, bills_open: division.habitations_current_month_bills_open, bills_closed: division.habitations_current_month_bills_closed};
                            district_edges['division' + '-' + division.id] = {length:.8};
                            var subdivisions = division.subdivisions;
                            _.each(subdivisions, function (subdivision) {
                                var subdivision_edges = {};
                                var percent = parseInt((parseInt(subdivision.consumers_num_accounts_positive_balance) / parseInt(subdivision.consumers_num_accounts_connected)) * 100) || 0;
//                                var subdivision_node = graph.newNode({label: subdivision.name, type: "subdivision", id: subdivision.id, connected: subdivision.consumers_num_accounts_connected, overdue_percent: percent});
                                nodes['subdivision' + '-' + subdivision.id] = {name: subdivision.name, color: "purple", alpha: 1, type:'subdivision', overdue_percent: percent, bills_open: subdivision.habitations_current_month_bills_open, bills_closed: subdivision.habitations_current_month_bills_closed};
                                division_edges['subdivision' + '-' + subdivision.id] = {length:.8};
                                var blocks = subdivision.blocks;
                                _.each(blocks, function (block) {
                                    var percent = parseInt((parseInt(block.consumers_num_accounts_positive_balance) / parseInt(block.consumers_num_accounts_connected)) * 100) || 0;
//                                    var block_node = graph.newNode({label: block.name, type: "block", id: block.id, connected: block.consumers_num_accounts_connected, overdue_percent: percent});
                                    nodes['block' + '-' + block.id] = {name: block.name, color: "navy", alpha: 1, type:'block', overdue_percent: percent, bills_open: block.habitations_current_month_bills_open, bills_closed: block.habitations_current_month_bills_closed};
                                    subdivision_edges['block' + '-' + block.id] = {length:.8};
//                                    graph.newEdge(block_node, subdivision_node, {color: subdivision_color});
                                });
//                                graph.newEdge(subdivision_node, division_node, {color: division_color});
                                edges['subdivision' + '-' + subdivision.id] = subdivision_edges;
                            });
//                            graph.newEdge(division_node, district_node, {color: district_color});
                            edges['division' + '-' + division.id] = division_edges;
                        });
//                        graph.newEdge(district_node, circle_node, {color: circle_color});
                        edges['district' + '-' + district.id] = district_edges;
                    });
//                    graph.newEdge(circle_node, wing_node, {color: wing_color});
                    edges['circle' + '-' + circle.id] = circle_edges;
                });
                edges['wing' + '-' + wing.id] = wing_edges;
            });
            var CLR = {
                branch: "#b2b19d",
                code: "orange",
                doc: "#922E00",
                demo: "#a7af00"
            };
            var theUI = {};
            theUI.nodes = nodes;
            theUI.edges = edges;

            console.log(theUI);

            var sys = arbor.ParticleSystem();
            sys.parameters({stiffness: 900, repulsion: 2000, gravity: true, dt: 0.015});
            sys.renderer = this.arbor_site_renderer("#graphVis");
//            sys.renderer = this.arbor_other_renderer("#graphVis");
            sys.graft(theUI);
        },
        arbor_site: function () {
            var CLR = {
                branch: "#b2b19d",
                code: "orange",
                doc: "#922E00",
                demo: "#a7af00"
            }

            var theUI = {
                nodes: {
                    "arbor.js": {color: "red", shape: "dot", alpha: 1},
                    "demos": {color: CLR.branch, shape: "dot", alpha: 1},
                    "halfviz": {color: CLR.demo, alpha: 0, link: '/halfviz'},
                    "atlas": {color: CLR.demo, alpha: 0, link: '/atlas'},
                    "echolalia": {color: CLR.demo, alpha: 0, link: '/echolalia'},

                    "docs": {color: CLR.branch, shape: "dot", alpha: 1},
                    "reference": {color: CLR.doc, alpha: 0, link: '#reference'},
                    "introduction": {color: CLR.doc, alpha: 0, link: '#introduction'},

                    "code": {color: CLR.branch, shape: "dot", alpha: 1},
                    "github": {color: CLR.code, alpha: 0, link: 'https://github.com/samizdatco/arbor'},
                    ".zip": {color: CLR.code, alpha: 0, link: '/js/dist/arbor-v0.92.zip'},
                    ".tar.gz": {color: CLR.code, alpha: 0, link: '/js/dist/arbor-v0.92.tar.gz'}
                },
                edges: {
                    "arbor.js": {
                        demos: {length: .8},
                        docs: {length: .8},
                        code: {length: .8}
                    },
                    demos: {halfviz: {},
                        atlas: {},
                        echolalia: {}
                    },
                    docs: {reference: {},
                        introduction: {}
                    },
                    code: {".zip": {},
                        ".tar.gz": {},
                        "github": {}
                    }
                }
            }


            var sys = arbor.ParticleSystem()
            sys.parameters({stiffness: 900, repulsion: 2000, gravity: true, dt: 0.015})
            sys.renderer = this.arbor_site_renderer("#graphVis")
            sys.graft(theUI)

//                var nav = Nav("#nav")
//                $(sys.renderer).bind('navigate', nav.navigate)
//                $(nav).bind('mode', sys.renderer.switchMode)
//                nav.init()
        },
        arbor_other_renderer: function(canvas) {

            var colour = {
              orange:"#EEB211",
              darkblue:"#21526a",
              purple:"#941e5e",
              limegreen:"#c1d72e",
              darkgreen:"#619b45",
              lightblue:"#009fc3",
              pink:"#d11b67"
            };

            var dom = $(canvas)
            var canvas = dom.get(0)
            var ctx = canvas.getContext("2d")
            var gfx = arbor.Graphics(canvas)
            var particleSystem = null
            var imagepath = './graphics/'

            var selected = null,
                nearest = null,
                _mouseP = null;

            // Main output section
            var that = {
              init:function(system){
                particleSystem = system
                particleSystem.screenSize(canvas.width, canvas.height)
                particleSystem.screenPadding(25, 50)

                that.initMouseHandling()

                // Preload all images into the node object
                particleSystem.eachNode(function(node, pt) {
                  if(node.data.image) {
                    node.data.imageob = new Image()
                    node.data.imageob.src = imagepath + node.data.image
                  }
                } )
              },

              redraw:function(){
                if (!particleSystem) return
                gfx.clear() // convenience ƒ: clears the whole canvas rect
                // draw the nodes & save their bounds for edge drawing
                var nodeBoxes = {}

                // draw the edges
                particleSystem.eachEdge(function(edge, pt1, pt2){
                  // edge: {source:Node, target:Node, length:#, data:{}}
                  // pt1:  {x:#, y:#}  source position in screen coords
                  // pt2:  {x:#, y:#}  target position in screen coords

                  // Don't draw lines that shouldn't be there
                  if (edge.source.data.alpha * edge.target.data.alpha == 0) return
                  gfx.line(pt1, pt2, {stroke:colour.orange, width:2, alpha:edge.target.data.alpha})
                })

                // draw the nodes
                particleSystem.eachNode(function(node, pt){
                  // node: {mass:#, p:{x,y}, name:"", data:{}}
                  // pt:   {x:#, y:#}  node position in screen coords

                  // Hide hidden nodes
                  if (node.data.alpha===0) return

                  // Load extra info
                  var imageob = node.data.imageob
                  var imageH = node.data.image_h
                  var imageW = node.data.image_w
                  var radius = parseInt(node.data.radius)
                  // determine the box size and round off the coords if we'll be
                  // drawing a text label (awful alignment jitter otherwise...)
                  var label = node.data.label||""
                  var w = ctx.measureText(""+label).width + 10
                  if(w < radius) {
                    w = radius;
                  }
                  if (!(""+label).match(/^[ \t]*$/)){
                    pt.x = Math.floor(pt.x)
                    pt.y = Math.floor(pt.y)
                  }else{
                    label = null
                  }

                  // Set colour
                  if (node.data.color) ctx.fillStyle = node.data.color
                  else ctx.fillStyle = "rgba(0,0,0,.2)"
                  if (node.data.color=='none') ctx.fillStyle = "white"

                  // Draw the object
                  if (node.data.shape=='dot'){
                    // Check if it's a dot
                    gfx.oval(pt.x-w/2, pt.y-w/2, w,w, {fill:ctx.fillStyle, alpha:node.data.alpha})
                    nodeBoxes[node.name] = [pt.x-w/2, pt.y-w/2, w,w]
                    // Does it have an image?
                    if (imageob){
                      // Images are cached
                      ctx.drawImage(imageob, pt.x-(imageW/2), pt.y+radius/2, imageW, imageH)
                    }
                  }else {
                    // If none of the above, draw a rectangle
                    gfx.rect(pt.x-w/2, pt.y-10, w,20, 4, {fill:ctx.fillStyle, alpha:node.data.alpha})
                    nodeBoxes[node.name] = [pt.x-w/2, pt.y-11, w, 22]
                  }

                  // Draw the text
                  if (label){
                    ctx.font = "12px Helvetica"
                    ctx.textAlign = "center"
                    ctx.fillStyle = "white"
                    if (node.data.color=='none') ctx.fillStyle = '#333333'
                    ctx.fillText(label||"", pt.x, pt.y+4)
                    // ctx.fillText(label||"", pt.x, pt.y+4)
                  }

                })



              },
              switchMode:function(e){
                if (e.mode=='hidden'){
                  dom.stop(true).fadeTo(e.dt,0, function(){
                    if (sys) sys.stop()
                    $(this).hide()
                  })
                }else if (e.mode=='visible'){
                  dom.stop(true).css('opacity',0).show().fadeTo(e.dt,1,function(){
                    that.resize()
                  })
                  if (sys) sys.start()
                }
              },

              switchSection:function(newSection){
                var parent = sys.getEdgesFrom(newSection)[0].source
                var children = $.map(sys.getEdgesFrom(newSection), function(edge){
                  return edge.target
                })

                sys.eachNode(function(node){
                  if (node.data.shape=='dot') return // skip all but leafnodes
                  var nowVisible = ($.inArray(node, children)>=0)
                  var newAlpha = (nowVisible) ? 1 : 0
                  var dt = (nowVisible) ? .5 : .5
                  sys.tweenNode(node, dt, {alpha:newAlpha})
                  if (newAlpha==1){
                    node.p.x = parent.p.x + 3*Math.random() - .025
                    node.p.y = parent.p.y + 3*Math.random() - .025
                    node.tempMass = .001
                  }
                })
              },

              initMouseHandling:function(){
                // no-nonsense drag and drop (thanks springy.js)
                selected = null;
                nearest = null;
                var dragged = null;
                var oldmass = 1

                var _section = null

                var handler = {
                  moved:function(e){
                    var pos = $(canvas).offset();
                    _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
                    nearest = sys.nearest(_mouseP);

                    if (!nearest.node) return false

                    if (nearest.node.data.shape!='dot'){
                      selected = (nearest.distance < 50) ? nearest : null

                      if (selected){
                         dom.addClass('linkable')
                         // Will need to re-enable this for clickable links
                         // window.status = selected.node.data.link.replace(/^\//,"http://"+window.location.host+"/").replace(/^#/,'')
                      }
                      else{
                         dom.removeClass('linkable')
                         window.status = ''
                      }
                    }else if ($.inArray(nearest.node.name, ['innovation','solution', 'collaboration', 'facilitation', 'international', 'participation']) >=0 ){
                      if (nearest.node.name!=_section){
                        _section = nearest.node.name
                        that.switchSection(_section)
                      }
                      dom.removeClass('linkable')
                      window.status = ''
                    }

                    return false
                  },
                  clicked:function(e){
                    var pos = $(canvas).offset();
                    _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
                    nearest = dragged = sys.nearest(_mouseP);

                    if (nearest && selected && nearest.node===selected.node){
                      if (selected.node.data.link) {
                        var link = selected.node.data.link
                        if (link.match(/^#/)){
                           $(that).trigger({type:"navigate", path:link.substr(1)})
                        }else{
                           window.location = link
                        }
                        return false
                      }
                    }


                    if (dragged && dragged.node !== null) dragged.node.fixed = true

                    $(canvas).unbind('mousemove', handler.moved);
                    $(canvas).bind('mousemove', handler.dragged)
                    $(window).bind('mouseup', handler.dropped)

                    return false
                  },
                  dragged:function(e){
                    var old_nearest = nearest && nearest.node._id
                    var pos = $(canvas).offset();
                    var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)

                    if (!nearest) return
                    if (dragged !== null && dragged.node !== null){
                      var p = sys.fromScreen(s)
                      dragged.node.p = p
                    }

                    return false
                  },

                  dropped:function(e){
                    if (dragged===null || dragged.node===undefined) return
                    if (dragged.node !== null) dragged.node.fixed = false
                    dragged.node.tempMass = 1000
                    dragged = null;
                    // selected = null
                    $(canvas).unbind('mousemove', handler.dragged)
                    $(window).unbind('mouseup', handler.dropped)
                    $(canvas).bind('mousemove', handler.moved);
                    _mouseP = null
                    return false
                  }


                }

                $(canvas).mousedown(handler.clicked);
                $(canvas).mousemove(handler.moved);

              }
            }

            // helpers for figuring out where to draw arrows (thanks springy.js)
            var intersect_line_line = function(p1, p2, p3, p4)
            {
              var denom = ((p4.y - p3.y)*(p2.x - p1.x) - (p4.x - p3.x)*(p2.y - p1.y));
              if (denom === 0) return false // lines are parallel
              var ua = ((p4.x - p3.x)*(p1.y - p3.y) - (p4.y - p3.y)*(p1.x - p3.x)) / denom;
              var ub = ((p2.x - p1.x)*(p1.y - p3.y) - (p2.y - p1.y)*(p1.x - p3.x)) / denom;

              if (ua < 0 || ua > 1 || ub < 0 || ub > 1)  return false
              return arbor.Point(p1.x + ua * (p2.x - p1.x), p1.y + ua * (p2.y - p1.y));
            }

            var intersect_line_box = function(p1, p2, boxTuple)
            {
              var p3 = {x:boxTuple[0], y:boxTuple[1]},
                  w = boxTuple[2],
                  h = boxTuple[3]

              var tl = {x: p3.x, y: p3.y};
              var tr = {x: p3.x + w, y: p3.y};
              var bl = {x: p3.x, y: p3.y + h};
              var br = {x: p3.x + w, y: p3.y + h};

              return intersect_line_line(p1, p2, tl, tr) ||
                    intersect_line_line(p1, p2, tr, br) ||
                    intersect_line_line(p1, p2, br, bl) ||
                    intersect_line_line(p1, p2, bl, tl) ||
                    false
            }

            return that
        },
        arbor_site_renderer: function (elt) {
            var dom = $(elt)
            var canvas = dom.get(0)
            var ctx = canvas.getContext("2d");
            var gfx = arbor.Graphics(canvas)
            var sys = null

            var _vignette = null
            var selected = null,
                nearest = null,
                _mouseP = null;


            var that = {
                init: function (pSystem) {
                    sys = pSystem
                    sys.screen({size: {width: dom.width(), height: dom.height()},
                        padding: [36, 60, 36, 60]})

                    $(window).resize(that.resize)
                    that.resize()
                    that._initMouseHandling()

                    if (document.referrer.match(/echolalia|atlas|halfviz/)) {
                        // if we got here by hitting the back button in one of the demos,
                        // start with the demos section pre-selected
                        that.switchSection('demos')
                    }
                },
                resize: function () {
                    canvas.width = $(window).width() - 360;
                    canvas.height = .75 * $(window).height()
                    sys.screen({size: {width: canvas.width, height: canvas.height}})
                    _vignette = null
                    that.redraw()
                },
                redraw: function () {
                    gfx.clear()
                    sys.eachEdge(function (edge, p1, p2) {
                        if (edge.source.data.alpha * edge.target.data.alpha == 0) return
                        gfx.line(p1, p2, {stroke: "#b2b19d", width: 2, alpha: edge.target.data.alpha})
                    })
                    sys.eachNode(function (node, pt) {
                        var w = Math.max(20, 20 + gfx.textWidth(node.data.name));
                        if(w<95) {
                            w = 95;
                        }
//                        console.log(node.data.name + ' w: ' + w);
                        if (node.data.alpha === 0) return
                        if (node.data.shape == 'dot') {
                            gfx.oval(pt.x - w / 2, pt.y - w / 2, w, w, {fill: node.data.color, alpha: node.data.alpha})
                            gfx.text(node.name, pt.x, pt.y + 7, {color: "white", align: "center", font: "Arial", size: 12})
//                            gfx.text(node.name, pt.x, pt.y + 7, {color: "white", align: "center", font: "Arial", size: 12})
                        } else {
                            gfx.rect(pt.x - w / 2, pt.y - 8, w, 40, 4, {fill: node.data.color, alpha: node.data.alpha});
                            gfx.text(node.data.type, (pt.x - w / 2) + 2, pt.y + 2, {color: "#c5c5c5", align: "left", font: "Arial", size: 10});
                            gfx.text(node.data.name, pt.x, pt.y + 15, {color: "white", align: "center", font: "Arial", size: 12});
                            var percent = parseInt((parseInt(node.data.bills_closed) / (parseInt(node.data.bills_closed) + parseInt(node.data.bills_open))) * 100);
                            if(isNaN(percent)) {
                                percent = 0;
                            }
                            gfx.text("Bill Collection: " + percent + "%", (pt.x - w / 2) + 2, pt.y + 22, {color: "#c5c5c5", align: "left", font: "Arial", size: 10});
                            gfx.text("Past Due: " + node.data.overdue_percent + "%", (pt.x - w / 2) + 2, pt.y + 30, {color: "#c5c5c5", align: "left", font: "Arial", size: 10});

//                            gfx.text(, pt.x, pt.y + 22, {color: "white", align: "center", font: "Arial", size: 10});
//                            gfx.text(, pt.x, pt.y + 28, {color: "white", align: "center", font: "Arial", size: 10});
//                            gfx.text(node.data.name, pt.x, pt.y + 9, {color: "white", align: "center", font: "Arial", size: 12})
                        }
                    })
                    that._drawVignette()
                },

                _drawVignette: function () {
                    var w = canvas.width
                    var h = canvas.height
                    var r = 20

                    if (!_vignette) {
                        var top = ctx.createLinearGradient(0, 0, 0, r)
                        top.addColorStop(0, "#e0e0e0")
                        top.addColorStop(.7, "rgba(255,255,255,0)")

                        var bot = ctx.createLinearGradient(0, h - r, 0, h)
                        bot.addColorStop(0, "rgba(255,255,255,0)")
                        bot.addColorStop(1, "white")

                        _vignette = {top: top, bot: bot}
                    }

                    // top
                    ctx.fillStyle = _vignette.top
                    ctx.fillRect(0, 0, w, r)

                    // bot
                    ctx.fillStyle = _vignette.bot
                    ctx.fillRect(0, h - r, w, r)
                },

                switchMode: function (e) {
                    if (e.mode == 'hidden') {
                        dom.stop(true).fadeTo(e.dt, 0, function () {
                            if (sys) sys.stop()
                            $(this).hide()
                        })
                    } else if (e.mode == 'visible') {
                        dom.stop(true).css('opacity', 0).show().fadeTo(e.dt, 1, function () {
                            that.resize()
                        })
                        if (sys) sys.start()
                    }
                },

                switchSection: function (newSection) {
                    var parent = sys.getEdgesFrom(newSection)[0].source
                    var children = $.map(sys.getEdgesFrom(newSection), function (edge) {
                        return edge.target
                    })

                    sys.eachNode(function (node) {
                        if (node.data.shape == 'dot') return // skip all but leafnodes

                        var nowVisible = ($.inArray(node, children) >= 0)
                        var newAlpha = (nowVisible) ? 1 : 0
                        var dt = (nowVisible) ? .5 : .5
                        sys.tweenNode(node, dt, {alpha: newAlpha})

                        if (newAlpha == 1) {
                            node.p.x = parent.p.x + .05 * Math.random() - .025
                            node.p.y = parent.p.y + .05 * Math.random() - .025
                            node.tempMass = .001
                        }
                    })
                },


                _initMouseHandling: function () {
                    // no-nonsense drag and drop (thanks springy.js)
                    selected = null;
                    nearest = null;
                    var dragged = null;
                    var oldmass = 1

                    var _section = null

                    var handler = {
                        moved: function (e) {
                            var pos = $(canvas).offset();
                            _mouseP = arbor.Point(e.pageX - pos.left, e.pageY - pos.top)
                            nearest = sys.nearest(_mouseP);

                            if (!nearest.node) return false

                            if (nearest.node.data.shape != 'dot') {
                                selected = (nearest.distance < 50) ? nearest : null
                                if (selected) {
                                    dom.addClass('linkable')
//                                    window.status = selected.node.data.link.replace(/^\//, "http://" + window.location.host + "/").replace(/^#/, '')
                                }
                                else {
                                    dom.removeClass('linkable')
                                    window.status = ''
                                }
                            } else if ($.inArray(nearest.node.name, ['arbor.js', 'code', 'docs', 'demos']) >= 0) {
                                if (nearest.node.name != _section) {
                                    _section = nearest.node.name
                                    that.switchSection(_section)
                                }
                                dom.removeClass('linkable')
                                window.status = ''
                            }

                            return false
                        },
                        clicked: function (e) {
                            var pos = $(canvas).offset();
                            _mouseP = arbor.Point(e.pageX - pos.left, e.pageY - pos.top)
                            nearest = dragged = sys.nearest(_mouseP);

//                            if (nearest && selected && nearest.node === selected.node) {
////                                var link = selected.node.data.link
////                                if (link.match(/^#/)) {
////                                    $(that).trigger({type: "navigate", path: link.substr(1)})
////                                } else {
////                                    window.location = link
////                                }
////                                return false
//                            }


                            if (dragged && dragged.node !== null) dragged.node.fixed = true

                            $(canvas).unbind('mousemove', handler.moved);
                            $(canvas).bind('mousemove', handler.dragged)
                            $(window).bind('mouseup', handler.dropped)

                            return false
                        },
                        dragged: function (e) {
                            var old_nearest = nearest && nearest.node._id
                            var pos = $(canvas).offset();
                            var s = arbor.Point(e.pageX - pos.left, e.pageY - pos.top)

                            if (!nearest) return
                            if (dragged !== null && dragged.node !== null) {
                                var p = sys.fromScreen(s)
                                dragged.node.p = p
                            }

                            return false
                        },

                        dropped: function (e) {
                            if (dragged === null || dragged.node === undefined) return
                            if (dragged.node !== null) dragged.node.fixed = false
                            dragged.node.tempMass = 1000
                            dragged = null;
                            // selected = null
                            $(canvas).unbind('mousemove', handler.dragged)
                            $(window).unbind('mouseup', handler.dropped)
                            $(canvas).bind('mousemove', handler.moved);
                            _mouseP = null
                            return false
                        }


                    }

                    $(canvas).mousedown(handler.clicked);
                    $(canvas).mousemove(handler.moved);

                }
            }

            return that
        },
        arbor_Renderer: function (canvas) {
/////////////////////////////////////////////////////////////////////////////////////
            var canvas = $(canvas).get(0)
            var ctx = canvas.getContext("2d");
            var particleSystem

            var that = {
                init: function (system) {
                    //
                    // the particle system will call the init function once, right before the
                    // first frame is to be drawn. it's a good place to set up the canvas and
                    // to pass the canvas size to the particle system
                    //
                    // save a reference to the particle system for use in the .redraw() loop
                    particleSystem = system

                    // inform the system of the screen dimensions so it can map coords for us.
                    // if the canvas is ever resized, screenSize should be called again with
                    // the new dimensions
                    particleSystem.screenSize(canvas.width, canvas.height)
                    particleSystem.screenPadding(80) // leave an extra 80px of whitespace per side

                    // set up some event handlers to allow for node-dragging
                    that.initMouseHandling()
                },
                redraw: function () {
                    //
                    // redraw will be called repeatedly during the run whenever the node positions
                    // change. the new positions for the nodes can be accessed by looking at the
                    // .p attribute of a given node. however the p.x & p.y values are in the coordinates
                    // of the particle system rather than the screen. you can either map them to
                    // the screen yourself, or use the convenience iterators .eachNode (and .eachEdge)
                    // which allow you to step through the actual node objects but also pass an
                    // x,y point in the screen's coordinate system
                    //
                    ctx.fillStyle = "white"
                    ctx.fillRect(0, 0, canvas.width, canvas.height)

                    particleSystem.eachEdge(function (edge, pt1, pt2) {
                        // edge: {source:Node, target:Node, length:#, data:{}}
                        // pt1:  {x:#, y:#}  source position in screen coords
                        // pt2:  {x:#, y:#}  target position in screen coords

                        // draw a line from pt1 to pt2
                        ctx.strokeStyle = "rgba(0,0,0, .333)"
                        ctx.lineWidth = 1
                        ctx.beginPath()
                        ctx.moveTo(pt1.x, pt1.y)
                        ctx.lineTo(pt2.x, pt2.y)
                        ctx.stroke()
                    })

                    particleSystem.eachNode(function (node, pt) {
                        // node: {mass:#, p:{x,y}, name:"", data:{}}
                        // pt:   {x:#, y:#}  node position in screen coords

                        // draw a rectangle centered at pt
                        var w = 10
                        ctx.fillStyle = (node.data.alone) ? "orange" : "black"
                        ctx.fillRect(pt.x - w / 2, pt.y - w / 2, w, w)
                    })
                },
                initMouseHandling: function () {
                    // no-nonsense drag and drop (thanks springy.js)
                    var dragged = null;

                    // set up a handler object that will initially listen for mousedowns then
                    // for moves and mouseups while dragging
                    var handler = {
                        clicked: function (e) {
                            var pos = $(canvas).offset();
                            _mouseP = arbor.Point(e.pageX - pos.left, e.pageY - pos.top)
                            dragged = particleSystem.nearest(_mouseP);

                            if (dragged && dragged.node !== null) {
                                // while we're dragging, don't let physics move the node
                                dragged.node.fixed = true
                            }

                            $(canvas).bind('mousemove', handler.dragged)
                            $(window).bind('mouseup', handler.dropped)

                            return false
                        },
                        dragged: function (e) {
                            var pos = $(canvas).offset();
                            var s = arbor.Point(e.pageX - pos.left, e.pageY - pos.top)

                            if (dragged && dragged.node !== null) {
                                var p = particleSystem.fromScreen(s)
                                dragged.node.p = p
                            }

                            return false
                        },

                        dropped: function (e) {
                            if (dragged === null || dragged.node === undefined) return
                            if (dragged.node !== null) dragged.node.fixed = false
                            dragged.node.tempMass = 1000
                            dragged = null
                            $(canvas).unbind('mousemove', handler.dragged)
                            $(window).unbind('mouseup', handler.dropped)
                            _mouseP = null
                            return false
                        }
                    }

                    // start listening
                    $(canvas).mousedown(handler.clicked);

                }
            }
            return that;
            /////////////////////////////////////////////////////////////////////////
        },
        springyGraph: function () {
            this.graph = new Springy.Graph();
            this.wings = new Wings();
            this.wings.bind('reset', this.springy_wingsReset);
            this.wings.url = "/hierarchy";
            this.wings.fetch({reset: true});
        },
        springy_wingsReset: function () {
            console.log('wings reset!', this.wings);

            var graph = this.graph;
            //                var node = graph.newNode({label: model.get('name')});
            //                var node2 = graph.newNode({label: 'asdasd'});
            //                graph.newEdge(node, node2, {color: '#00A0B0'});

            var wing_color = "#00A0B0";
            var circle_color = "#6A4A3C";
            var district_color = "#CC333F";
            var division_color = "#EB6841";
            var subdivision_color = "#EDC951";
//            var block_color = "#";


            this.wings.each(function (wing) {
                var percent = parseInt((parseInt(wing.get('consumers_num_accounts_positive_balance')) / parseInt(wing.get('consumers_num_accounts_connected'))) * 100) || 0;
                var wing_node = graph.newNode({label: wing.get('name'), type: "wing", id: wing.id, connected: wing.get('consumers_num_accounts_connected'), overdue_percent: percent});
                var circles = wing.get('circles');
                _.each(circles, function (circle) {
                    var percent = parseInt((parseInt(circle.consumers_num_accounts_positive_balance) / parseInt(circle.consumers_num_accounts_connected)) * 100) || 0;
                    var circle_node = graph.newNode({label: circle.name, type: "circle", id: circle.id, connected: circle.consumers_num_accounts_connected, overdue_percent: percent});
                    var districts = circle.districts;
                    _.each(districts, function (district) {
                        var percent = parseInt((parseInt(district.consumers_num_accounts_positive_balance) / parseInt(district.consumers_num_accounts_connected)) * 100) || 0;
                        var district_node = graph.newNode({label: district.name, type: "district", id: district.id, connected: district.consumers_num_accounts_connected, overdue_percent: percent});
                        var divisions = district.divisions;
                        _.each(divisions, function (division) {
                            var percent = parseInt((parseInt(division.consumers_num_accounts_positive_balance) / parseInt(division.consumers_num_accounts_connected)) * 100) || 0;
                            var division_node = graph.newNode({label: division.name, type: "division", id: division.id, connected: division.consumers_num_accounts_connected, overdue_percent: percent});
                            var subdivisions = division.subdivisions;
                            _.each(subdivisions, function (subdivision) {
                                var percent = parseInt((parseInt(subdivision.consumers_num_accounts_positive_balance) / parseInt(subdivision.consumers_num_accounts_connected)) * 100) || 0;
                                var subdivision_node = graph.newNode({label: subdivision.name, type: "subdivision", id: subdivision.id, connected: subdivision.consumers_num_accounts_connected, overdue_percent: percent});
                                var blocks = subdivision.blocks;
                                _.each(blocks, function (block) {
                                    var percent = parseInt((parseInt(block.consumers_num_accounts_positive_balance) / parseInt(block.consumers_num_accounts_connected)) * 100) || 0;
                                    var block_node = graph.newNode({label: block.name, type: "block", id: block.id, connected: block.consumers_num_accounts_connected, overdue_percent: percent});
                                    graph.newEdge(block_node, subdivision_node, {color: subdivision_color});
                                });
                                graph.newEdge(subdivision_node, division_node, {color: division_color});
                            });
                            graph.newEdge(division_node, district_node, {color: district_color});
                        });
                        graph.newEdge(district_node, circle_node, {color: circle_color});
                    });
                    graph.newEdge(circle_node, wing_node, {color: wing_color});
                });
            });

            this.springy = jQuery('#springygraphVis').springy({
                graph: graph,
                nodeSelected: function (node) {
                    console.log('Node selected: ' + JSON.stringify(node.data));
//                    if(node.data.type == "wing") {
//                        window.app_router.navigate("circles/wing/" + node.data.id, {trigger: true});
////                        window.app_router.navigate("wings", {trigger: true});
//                    } else if(node.data.type == "circle") {
//                        window.app_router.navigate("districts/circle/" + node.data.id, {trigger: true});
//                    } else if(node.data.type == "district") {
//                        window.app_router.navigate("divisions/district/" + node.data.id, {trigger: true});
//                    } else if(node.data.type == "division") {
//                        window.app_router.navigate("subdivisions/division/" + node.data.id, {trigger: true});
//                    } else if(node.data.type == "subdivision") {
//                        window.app_router.navigate("blocks/subdivision/" + node.data.id, {trigger: true});
//                    } else if(node.data.type == "block") {
//                        window.app_router.navigate("panchayats/block/" + node.data.id, {trigger: true});
//                    }
                }
            });
        }
    });
    return aView;
});
