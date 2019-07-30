import 'ol/ol.css';
import 'ol-layerswitcher/src/ol-layerswitcher.css';

import {Map, View} from 'ol';
// import {Navigation, PanZoomBar, Scale, ScaleLine} from 'ol/control';
import {ZoomSlider} from 'ol/control.js';
import LayerSwitcher from 'ol-layerswitcher';
import TileLayer from 'ol/layer/Tile';
import {defaults as defaultControls, OverviewMap} from 'ol/control.js';
import MousePosition from 'ol/control/MousePosition.js';
import {createStringXY} from 'ol/coordinate.js';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS.js';
import Stamen from 'ol/source/Stamen.js';
import {ImageArcGISRest} from 'ol/source.js';
import LayerGroup from 'ol/layer/Group';
import LayerImage from 'ol/layer/Image';
import SourceImageArcGISRest from 'ol/source/ImageArcGISRest';
import Proj from 'ol/proj';

// default center, zoom, rotation
let center = [-270956.5258, 7479009.0604];
let zoom = 2;
let rotation = 0;

var mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:27700',
    // comment the following two lines to have the mouse position
    // be placed within the map.
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position'),
    undefinedHTML: '&nbsp;'
});

const map = new Map({
    target: 'map',
    controls: defaultControls().extend([mousePositionControl]),
    layers: [
        new LayerGroup({
            'title': 'Base maps',
            layers: [
                new TileLayer({
                    title: 'OSM',
                    type: 'base',
                    visible: true,
                    source: new OSM()
                }),
                new TileLayer({
                    title: 'Stamen Terrain',
                    type: 'base',
                    visible: true,
                    source: new Stamen({
                        layer: 'terrain'
                    })
                }),
                new TileLayer({
                    title: 'EDINA OpenStream basemapping',
                    type: 'base',
                    source: new TileWMS({
                        projection: 'EPSG:27700',
                        url: "http://openstream.edina.ac.uk/openstream/wms",
                        params: { 
                            'LAYERS': "osopendata",
                            'token': "1fe359bc1beece9c01563cfb176fea657b241b6c2d4ea7097539049a8269a13d",
                            'format': "image/png",
                        },
                        // 'cache': "true",
                        serverType: 'mapserver',
                        attribution: "Contains Ordnance Survey data. (c) Crown copyright and database right 2019. Data provided by Digimap OpenStream, an EDINA, University of Edinburgh Service."
                    }),
                }),
            ]
        }),
        new LayerGroup({
            title: 'Overlays',
            layers: [
                new LayerImage({
                    opacity: 0.8,
                    title: 'CropMap',
                    type: 'overlay',
                    visible: true,
                    projection: 'EPSG:27700',
                    source: new SourceImageArcGISRest({
                        ratio: 1,
                        url: 'http://data.cropmap.edina.ac.uk/cgi-bin/mapserv.fcgi?map=/var/data/cropmap/2018/testwms_2.map',
                        params: { },
                        params: { 
                            'LAYERS': 'gtpolys' 
                        },
                        serverType: 'mapserver',
                    }),
                })
            ]
        })
    ],
    view: new View({
        // center: fromLonLat(center),
        resolutions: [1763.889,352.778,176.389,88.194, 35.278,26.458,17.639,8.819,3.528,1.764,0.882,0.441],
        // extent: [0, 0, 700000, 1300000],
        center: center,
        // center: Proj.toLonLat(center),
        zoom: zoom,
        rotation: rotation
    })
});

map.addControl(new LayerSwitcher());
map.addControl(new ZoomSlider());
// map.addControl(new Navigation());
// map.addControl(new Scale());
// map.addControl(new ScaleLine());

map.on('click', function(evt){
    document.getElementById('mouse-position-saved').textContent = "Saved coordinate: "+document.getElementById('mouse-position').textContent;
})
