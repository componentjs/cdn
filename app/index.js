
var component = require('component-builder-www');
var proxy = require('gitproximus');
var serve = require('koa-static');
var koa = require('koa');

var app = module.exports = koa();

if (!~['test', 'production'].indexOf(app.env)) app.use(require('koa-logger')());

app.use(require('koa-compress')());
app.use(require('koa-cdn'));

// there's an ENV setting for this, don't remember what
var maxage = 365 * 24 * 60 * 60 * 1000;

// serve favicon.ico
app.use(serve(process.cwd() + '/public', {
  maxage: maxage,
  defer: true,
}));
// serve any downloaded components
app.use(serve(process.cwd() + '/components', {
  maxage: maxage,
  defer: false,
}));

app.use(function* home(next) {
  if (this.request.path !== '/') return yield* next;
  this.response.status = 301;
  this.response.redirect('https://github.com/component/cdn');
})

// component stuff
app.use(component.standalone);
app.use(component.build);

// github proxy stuff
app.use(proxy.archive);
app.use(proxy.file);

if (!module.parent) {
  var port = process.env.PORT || 3333;
  app.listen(port);
  console.log('Component CDN is listening on port ' + port);
}
