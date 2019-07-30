var bounds = new OpenLayers.Bounds(0, 0, 700000, 1300000);

var map = new OpenLayers.Map('map', {
    controls: [],
    projection: new OpenLayers.Projection("EPSG:27700"),
    units: "m",
    maxExtent: bounds,
    //resolutions: [2000, 400, 200, 100, 50, 25, 10, 5, 2.5, 1.25, 0.625, 0.3125, 0.15625]
    resolutions: [1763.889,352.778,176.389,88.194, 35.278,26.458,17.639,8.819,3.528,1.764,0.882,0.441]
});

var base = new OpenLayers.Layer("", {isBaseLayer: true});

var cropmap = new OpenLayers.Layer.WMS(
    "cropmap",
    "http://data.cropmap.edina.ac.uk/cgi-bin/mapserv.fcgi?map=/var/data/cropmap/2018/testwms_2.map",
    {layers: 'gtpolys'},
    {
        //resolutions: [2000, 400, 200, 100, 50, 25, 10, 5, 2.5, 1.25, 0.625, 0.3125, 0.15625],
        resolutions: [1763.889,352.778,176.389,88.194, 35.278,26.458,17.639,8.819,3.528,1.764,0.882,0.441],
        'isBaseLayer': false,
        visibility: true,
        opacity: 0.5                
    });

var osopenlayer = new OpenLayers.Layer.WMS(
        "EDINA OpenStream basemapping",
        "http://openstream.edina.ac.uk/openstream/wms",
        {
                token: "1fe359bc1beece9c01563cfb176fea657b241b6c2d4ea7097539049a8269a13d",
                format: "image/png",
                layers: "osopendata",
                cache: "true"
        },
        {attribution: "Contains Ordnance Survey data. (c) Crown copyright and database right 2019. Data provided by Digimap OpenStream, an EDINA, University of Edinburgh Service."
        });

map.addLayers([/*base,*/ osopenlayer, cropmap]);
map.addControl(new OpenLayers.Control.Navigation());
map.addControl(new OpenLayers.Control.LayerSwitcher());
map.addControl(new OpenLayers.Control.PanZoomBar());
map.addControl(new OpenLayers.Control.Scale());
map.addControl(new OpenLayers.Control.ScaleLine());
map.addControl(new OpenLayers.Control.MousePosition({
    div: document.getElementById("mouseposition")
}));

map.setCenter(new OpenLayers.LonLat(372850.000000, 628650.00610), 6);
// map.zoomToMaxExtent();