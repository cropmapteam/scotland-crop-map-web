import 'ol/ol.css';
import 'ol-layerswitcher/src/ol-layerswitcher.css';

import {Map, View} from 'ol';
import {ZoomSlider, ScaleLine} from 'ol/control.js';
import LayerSwitcher from 'ol-layerswitcher';
import TileLayer from 'ol/layer/Tile';
import {defaults as defaultControls, FullScreen, OverviewMap} from 'ol/control.js';
import MousePosition from 'ol/control/MousePosition.js';
import {createStringXY} from 'ol/coordinate.js';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS.js';
import Stamen from 'ol/source/Stamen.js';
import LayerGroup from 'ol/layer/Group';

import Overlay from 'ol/Overlay.js';
import {toStringHDMS} from 'ol/coordinate.js';
import {fromLonLat, toLonLat} from 'ol/proj.js';

import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
import {get as getProjection} from 'ol/proj';

proj4.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 ' +
    '+x_0=400000 +y_0=-100000 +ellps=airy ' +
    '+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 ' +
    '+units=m +no_defs');
register(proj4);
const proj27700 = getProjection('EPSG:27700');
proj27700.setExtent([0, 0, 700000, 1300000]);

// default center, zoom, rotation
// let center = [-270956.5258, 7479009.0604];
let center = [-270793.9280, 7471492.3420];
let zoom = 3;
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
var fullScreenControl = new FullScreen({
    source: 'fullscreen'
});

const map = new Map({
    target: 'map',
    controls: defaultControls().extend(
        [mousePositionControl, fullScreenControl]),
    layers: [
        new LayerGroup({
            'title': 'Base maps',
            layers: [
                new TileLayer({
                    title: 'OSM',
                    type: 'base',
                    source: new OSM()
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
                    resolutions: [1763.889,352.778,176.389,88.194, 35.278,26.458,17.639,8.819,3.528,1.764,0.882,0.441],
                }),
                new TileLayer({
                    title: 'Stamen Terrain',
                    type: 'base',
                    visible: true,
                    source: new Stamen({
                        layer: 'terrain'
                    })
                })
            ]
        }),
        new LayerGroup({
            title: 'Overlays',
            layers: [
                new TileLayer({
                    opacity: 0.8,
                    title: 'CropMap WMS',
                    type: 'overlay',
                    visible: true,
                    source: new TileWMS({
                        projection: 'EPSG:27700',
                        url: 'http://data.cropmap.edina.ac.uk/cgi-bin/mapserv.fcgi?map=/var/data/cropmap/2018/testwms_2.map',
                        // crossOrigin: 'anonymous',
                        crossOrigin: null,
                        params: {
                            'LAYERS': 'gtpolys',
                            'TILED': true,
                            'format': 'image/png',
                            'STYLE': 'default',
                            'VERSION': '1.1.1',
                            TRANSPARENT: true
                        },
                        transition: 0,
                        resolutions: [1763.889,352.778,176.389,88.194, 35.278,26.458,17.639,8.819,3.528,1.764,0.882,0.441],
                        serverType: 'mapserver',
                    }),
                }),
            ]
        })
    ],
    view: new View({
        resolutions: [1763.889,352.778,176.389,88.194, 35.278,26.458,17.639,8.819,3.528,1.764,0.882,0.441],
        center: center,
        zoom: zoom,
        rotation: rotation
    })
});


// Popup showing the position the user clicked
let popup = new Overlay({
    element: document.getElementById('popup')
});
map.addOverlay(popup);

map.on('click', function(evt) {
    let element = popup.getElement();
    let coordinate = evt.coordinate;
    let hdms = toStringHDMS(toLonLat(coordinate));

    $(element).popover('hide');
    popup.setPosition(coordinate);
    $(element).popover({
        container: '#map',
        title: 'Location',
        placement: 'auto',
        animation: true,
        html: true,
        content: 'HDMS - <code>' + hdms + '</code><br/>'+
            'EPSG:27700 - <code>' + document.getElementById('mouse-position').textContent + '</code>'
    });
    $(element).popover('show');
});
map.on('postrender', function(e) {
    let element = popup.getElement();
    $(element).popover('hide');
    let popover = $('#popup').data('bs.popover');
    if(!popover) return;
    let popper = popover._popper;
    if(!popper) return;
    popper.scheduleUpdate();
});

map.addControl(new LayerSwitcher());
map.addControl(new ZoomSlider());
// map.addControl(new Navigation());
// map.addControl(new Scale());
// map.addControl(new Attribution());
map.addControl(new ScaleLine());

// map.on('click', function(evt){
//     document.getElementById('mouse-position-saved').textContent = "Saved coordinate: "+document.getElementById('mouse-position').textContent;
// })
