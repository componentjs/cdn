cdn
===

CDN for component based on [gitproximus](https://github.com/github-utils/gitproximus) and [component-builder-www](https://github.com/component/builder.www).


## API

### GET /build.js?dependencies...

Create a JS build with the dependencies as a query string, ex. `GET /build.js?component/emitter=*&component/domify=*`.

### GET /build.css?dependencies...

Create a CSS build with the dependencies as a query string, ex. `GET /build.css?suitcss/suit=0.4.0&necolas/normalize.css=^3.0.0`.

### GET /standalone/:user/:project/:version?

Create a standalone, UMD.js build of a single component, ex. `GET /standalone/components/jquery`.
The version is optional and can be a semantic version.

### GET /:user/:repo/:archive(tarball|zipball)/:version?

Get a zipball or tarball of a repository, ex. `GET /component/emitter/tarball`.
The version is optional and can be a semantic version.

### GET /:user/:repo/:version/:file...

Get a specific file of a repository, ex. `GET /component/emitter/master/component.json`.
The version is optional and can be a semantic version.
