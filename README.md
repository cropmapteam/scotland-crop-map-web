# scotland-crop-map-web

Web interface for the Crop Map of Scotland

## Server installation

This is meant to be displaying a cropmap layer hosted on a MapServer running on the same server. Our demo server was running CentOS 7 but it should be replicable on any OS.

Requirements:

* [Apache](http://httpd.apache.org/docs/2.4/install.html)
* [MapServer](https//www.mapserver.org/installation/index.htm)
* [MapProxy](https://mapproxy.org/docs/latest/install.html)
* [PostGIS](https://postgis.net/install/)

## Web application

There is 2 version of the application, one is a simple html the other is using [NPM](https://www.npmjs.com/).

### HTML version

This is a simple HTML file using [OpenLayer 2](https://openlayers.org/two/) to display the map. This is very limited and was meant to get  something to show quickly. The content is under `html/`.
It's also using a [Bootstrap template](https://blackrockdigital.github.io/startbootstrap-scrolling-nav/).

### NPM version

This version is trying to reproduce the same thing with [OpenLayer 5](https://openlayers.org/) following an [example](https://openlayers.org/en/latest/doc/tutorials/bundle.html) online. The content is under `web/`.

You should be able to start the app by installing NPM and running:

```ssh
cd web
npm install
npm start
```

Then the appplication shuld appear on your browser at `http://localhost:1234`.
