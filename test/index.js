
var request = require('supertest');

var server = require('..').listen();

before(function (done) {
  require('rimraf')(process.cwd() + '/components', done);
})

describe('/favicon.ico', function () {
  it('should work', function (done) {
    request(server)
    .get('/favicon.ico')
    .expect(200)
    .expect('Content-Type', 'image/x-icon')
    .end(done);
  })
})

describe('/standalone', function () {
  it('should work', function (done) {
    request(server)
    .get('/standalone/component/emitter')
    .expect(200)
    .expect('Content-Type', 'application/javascript')
    .end(done);
  })
})

describe('/build.js', function () {
  it('should work', function (done) {
    request(server)
    .get('/build.js')
    .query({
      'reworkcss/rework': '0'
    })
    .expect(200)
    .expect('Content-Type', 'application/javascript')
    .end(done);
  })
})

describe('/build.css', function () {
  it('should work', function (done) {
    request(server)
    .get('/build.css')
    .query({
      'suitcss/suit': '0.4.0'
    })
    .expect(200)
    .expect('Content-Type', 'text/css; charset=utf-8')
    .end(done);
  })
})

describe('/:user/:project/:archive/:version?', function () {
  it('should work', function (done) {
    request(server)
    .get('/component/emitter/tarball/master')
    .expect(200)
    .expect('Content-Type', 'application/x-gzip')
    .end(done);
  })
})

describe('/:user/:project/:version/:file...', function () {
  it('should work', function (done) {
    request(server)
    .get('/FortAwesome/Font-Awesome/v4.0.3/fonts/fontawesome-webfont.ttf')
    .expect(200)
    .expect('Content-Type', 'application/x-font-ttf')
    .end(done);
  })
})
