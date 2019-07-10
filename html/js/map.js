var bounds = new OpenLayers.Bounds(0, 0, 700000, 1300000);

var map = new OpenLayers.Map('map', {
    controls: [],
    projection: new OpenLayers.Projection("EPSG:27700"),
    units: "m",
    maxExtent: bounds,
    resolutions: [2000, 400, 200, 100, 50, 25, 10, 5, 2.5, 1.25, 0.625, 0.3125, 0.15625],
    // center: [0, 0],
    // zoom: 1
});

var base = new OpenLayers.Layer("", {isBaseLayer: true});

var cropmap = new OpenLayers.Layer.WMS(
    "cropmap",
    "http://data.cropmap.edina.ac.uk/cgi-bin/mapserv.fcgi?map=/var/data/cropmap/2018/testwms_2.map",
    {layers: 'gtpolys'},
    {
        resolutions: [2000, 400, 200, 100, 50, 25, 10, 5, 2.5, 1.25, 0.625, 0.3125, 0.15625],
        'isBaseLayer': false,
        visibility: true
    });

map.addLayers([base, cropmap]);
map.addControl(new OpenLayers.Control.Navigation());
map.addControl(new OpenLayers.Control.LayerSwitcher());
map.addControl(new OpenLayers.Control.PanZoomBar());
map.addControl(new OpenLayers.Control.Scale());
map.addControl(new OpenLayers.Control.ScaleLine());
map.addControl(new OpenLayers.Control.MousePosition({
    div: document.getElementById("mouseposition")
}));

map.setCenter(new OpenLayers.LonLat(372850.000000, 628650.00610), 4);
// map.zoomToMaxExtent();