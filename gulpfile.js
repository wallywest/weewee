var _ = require('lodash'),
    requireDir = require('require-dir'),
    browserify = require('browserify'),
    gulp = require('gulp'),
    path = require('path'),
    lp = require('gulp-load-plugins')(), // automatically loads all plugins
    runSequence = require('run-sequence'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify');

//load tasks
var dir = requireDir('./tasks');

function bumpType() {
  return env.minor ? 'minor' : env.major ? 'major' : 'patch';
}

function currentVersion() {
  return 'v' + requireUncached('./package.json').version;
}

function devOnly(transform) {
  return env.deployment ? lp.util.noop() : transform;
}

function exclude(path) {
  if (_.isArray(path)) {
    return _.map(path, exclude);
  }
  return '!' + path;
}

function join(p1, p2) {
  if (_.isArray(p2)) {
    return _.map(p2, _.partial(join, p1));
  }
  return path.join(p1, p2 || '');
}

function deployOnly(transform) {
  return env.deployment ? transform : lp.util.noop();
}

function requireUncached(module) {
  delete require.cache[require.resolve(module)];
  return require(module);
}

function specFiles() {
  return _.union(config.srcSpecs);
}

// runs each value of an object through the lodash
// template function with itself as the data object
function templateObjectWithSelf(object) {
  return _.each(object, function (val, key) {
    object[key] = _.template(val, object);
  });
}

function karmaConfig() {
  var browsers = [lp.util.env.browser || 'PhantomJS'];
  return {
    configFile: config.karmaConfig,
    action: lp.util.env.watch ? 'watch' : 'run',
    browsers: browsers
  };
}

var env = lp.util.env,
    appPath = _.partial(join, './app'),
    buildPath = _.partial(join, './build'),
    bowerPath = _.partial(join, './bower_components'),
    bowerFiles = require('bower-files')({dir: bowerPath()}),
    packageConfig = require('./package.json'),
    jsFilter = lp.filter('*.js'),
    envs = ['development', 'alpha', 'production'];


// setup the environment
if (!process.env.NODE_ENV) {
  _.each(envs, function (e) {
    if (env[e]) {
      process.env.NODE_ENV = e;
    }
  });
}
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_VERSION = packageConfig.version;

lp.util.log('NODE_ENV = ' + process.env.NODE_ENV);

var config = {
      httpPort: '9000',
      jsHint: '.jshintrc',
      ngModule: 'vcme.app',
      // ignore IE fixes when injecting scripts
      ignoreInject: exclude(buildPath(['vendor/ie-fixes/{,**}'])),
      // important libraries first
      srcInject: buildPath(['**/reset.css', 'vendor/**/*', '**/*']),
      bowerComponents: bowerPath(),

      // IE specific fixes -- need to be copied
      srcIEFixes: bowerPath(['es5-shim/es5-shim.js', 'json3/lib/json3.min.js', 'selectivizr/selectivizr.js', 'box-sizing-polyfill/boxsizing.htc']),
      destIEFixes: buildPath('vendor/ie-fixes'),
      concatIEFixes: 'ie-fixes.js',

      // html
      srcViews: appPath('views/**/*.html'),
      destViews: buildPath('views/'),
      srcIndex: appPath('index.html'),
      srcTemplates: appPath('templates/**/*.html'),
      destTemplates: buildPath('templates/'),

      // plugin config
      minifyHtml: {
        empty: true,
        cdata: true,
        comments: true,
        conditionals: true
      },
      slim: {
        pretty: true
      },
      autoprefixer: ['last 2 versions', '> 1%', 'ie 7', 'ie 8'],

      // styles
      srcStyles: appPath('styles/**/*.scss'),
      mainStyle: appPath('styles/main.scss'),
      destStyles: buildPath('styles'),
      destVendorStyles: buildPath('vendor/styles'),
      concatVendorStyle: 'vendor.css',
      concatStyle: 'main.css',

      // scripts
      srcScripts: ['./app/scripts/app.js'],
      destScripts: buildPath('scripts'),
      concatScript: 'main.js',

// images
      srcImg: appPath('images/**/*'),
      destImg: buildPath('images'),

      // tests
      karmaConfig: 'karma.conf.js',
      srcSpecs: ['test/**/*-spec.js']
    }
  ;

var _bundler;
function bundler() {
  if (_bundler) return _bundler;

  _bundler = env.deployment ? browserify(config.srcScripts) : watchify(config.srcScripts);
  _bundler.transform('browserify-shim');
  _bundler.transform('browserify-angular-injector');
  _bundler.transform('envify');
  if (env.deployment) {
    _bundler.transform({global: true}, 'uglifyify');
  }
  return _bundler;
}

// deployment config
var deployment = templateObjectWithSelf({
  name: packageConfig.name,
  version: packageConfig.version,
  env: process.env.NODE_ENV,
  rsa: lp.util.env.rsa || '~/.ssh/deployerkey',
  server: lp.util.env.server || 'deployer@dplcfe01.vail',
  archiveName: '<%= name %>-<%= version %>-<%= env %>.tar',
  scpCmd: 'scp -i <%= rsa %> <%= archiveName %>.gz <%= server %>:/home/deployer/vcme-dash',
  alpha: 'ssh -i <%= rsa %> <%= server %> sudo /usr/local/bin/update-vcme-dash-alpha.pl <%= version %>'
});

// compile sass. minify, concat, rev only in deployment mode
gulp.task('styles', function () {
  return gulp.src(config.mainStyle)
    .pipe(devOnly(lp.plumber()))
    .pipe(lp.rubySass({
      loadPath: config.bowerComponents
    }))
    .pipe(deployOnly(lp.autoprefixer(config.autoprefixer)))
    .pipe(deployOnly(lp.combineMediaQueries()))
    .pipe(deployOnly(lp.minifyCss()))
    .pipe(deployOnly(lp.concat(config.concatStyle)))
    .pipe(deployOnly(lp.rev()))
    .pipe(gulp.dest(config.destStyles))
    .pipe(lp.connect.reload());
});

// minify, concat, rev vendor css
gulp.task('vendorStyles', function () {
  return gulp.src(bowerFiles.css)
    .pipe(devOnly(lp.plumber()))
    .pipe(lp.changed(config.destVendorStyles))
    .pipe(deployOnly(lp.autoprefixer(config.autoprefixer)))
    .pipe(deployOnly(lp.minifyCss()))
    .pipe(deployOnly(lp.concat(config.concatVendorStyle)))
    .pipe(deployOnly(lp.rev()))
    .pipe(gulp.dest(config.destVendorStyles))
    .pipe(lp.connect.reload());
});

// lint the code
gulp.task('jshint', function () {
  return gulp.src(config.srcScripts)
    .pipe(devOnly(lp.plumber()))
    .pipe(lp.changed(config.destScripts))
    .pipe(lp.jshint(config.jsHint))
    .pipe(lp.jshint.reporter('jshint-stylish'))
    .pipe(deployOnly(lp.jshint.reporter('fail')));
});

// lint js. minify, concat, uglify, and rev in deployment mode
gulp.task('scripts', ['jshint'], function () {
  return bundler()
    .bundle({
      debug: !env.deployment
    })
    .pipe(devOnly(lp.plumber()))
    .pipe(source('app.js'))
    .pipe(deployOnly(lp.streamify(lp.rev())))
    .pipe(gulp.dest(config.destScripts))
    .pipe(lp.connect.reload());
});

// files to fix < ie9
gulp.task('ieFixes', function () {
  return gulp.src(config.srcIEFixes)
    .pipe(jsFilter)
    .pipe(gulp.dest(config.destIEFixes))
    .pipe(jsFilter.restore())
    .pipe(lp.filter('*.htc'))
    .pipe(gulp.dest(buildPath()));
});

// minify images in deployment
gulp.task('images', function () {
  return gulp.src(config.srcImg)
    .pipe(devOnly(lp.plumber()))
    .pipe(lp.changed(config.destImg))
    .pipe(deployOnly(lp.imagemin()))
    .pipe(gulp.dest(config.destImg))
    .pipe(lp.connect.reload());
});

// compile slim. minify in deployment mode
gulp.task('views', function () {
  return gulp.src(config.srcViews)
    .pipe(devOnly(lp.plumber()))
    .pipe(lp.changed(config.destViews, {extension: '.html'}))
    .pipe(deployOnly(lp.minifyHtml(config.minifyHtml)))
    .pipe(gulp.dest(config.destViews))
    .pipe(lp.connect.reload());
});

// compile index and inject dependencies
gulp.task('index', ['styles', 'vendorStyles', 'scripts', 'templates', 'ieFixes'], function () {
  return gulp.src(config.srcIndex)
    .pipe(devOnly(lp.plumber()))
    .pipe(lp.inject(gulp.src(_.union(config.ignoreInject, config.srcInject), {read: false}), {
      ignorePath: [buildPath()]
    }))
    .pipe(deployOnly(lp.minifyHtml(config.minifyHtml)))
    .pipe(gulp.dest(buildPath()))
    .pipe(lp.connect.reload());
});

// compile templates into angular template cache
gulp.task('templates', function () {
  return gulp.src(config.srcTemplates)
    .pipe(devOnly(lp.plumber()))
    .pipe(lp.changed(config.destTemplates, {extension: '.html'}))
    .pipe(deployOnly(lp.minifyHtml(config.minifyHtml)))
    .pipe(gulp.dest(config.destTemplates))
    .pipe(lp.connect.reload());
});

// clean 'build/' and tarballs
gulp.task('clean', function () {
  return gulp.src([buildPath(), '*.tar.gz'], {read: false})
    .pipe(lp.clean())
});

// watches files
gulp.task('watch', function () {
  gulp.watch(config.srcStyles, ['styles']);
  gulp.watch(config.srcViews, ['views']);
  gulp.watch(config.srcImg, ['images']);
  gulp.watch(config.srcTemplates, ['templates']);
  bundler().on('update', function () {
    runSequence('scripts');
  });
  gulp.watch(config.srcIndex, ['index']);
  gulp.watch(bowerFiles.css, ['vendorStyles']);
});

// performs all necessary build tasks
gulp.task('build', ['clean'], function (cb) {
  runSequence(['index', 'images', 'views'], cb);
});

// starts a server
gulp.task('server', function () {
  lp.connect.server({
    root: buildPath(),
    port: config.httpPort,
    livereload: true
  });
});

// creates a tarball with all files in 'build/'
gulp.task('archive', ['build'], function () {
  return gulp.src(buildPath('**/*'))
    .pipe(lp.tar(deployment.archiveName))
    .pipe(lp.gzip())
    .pipe(gulp.dest('.'));
});

gulp.task('runDeploy', function () {
  var deployCmd = deployment[process.env.NODE_ENV];
  lp.util.log('scp: ' + deployment.scpCmd);
  lp.util.log('deploy: ' + deployCmd);
  deployCmd = deployCmd ? lp.exec(deployCmd) : lp.util.noop();
  return gulp.src('package.json', {read: false})
    .pipe(lp.exec(deployment.scpCmd))
    .pipe(deployCmd);
});

// deploys application
// use --rsa to specify a key path
// use --server to specify a deploy server
gulp.task('deploy', function (cb) {
  env.deployment = true; // force deployment mode when deploying
  runSequence('archive', 'runDeploy', cb);
});

// bumps version in package.json and bower.json
// use --patch (default), --minor, or --major
gulp.task('bumpVersion', function () {
  return gulp.src(['package.json', 'bower.json'])
    .pipe(lp.bump({type: bumpType()}))
    .pipe(gulp.dest('.'))
});

// Commits version files
gulp.task('commitVersion', function () {
  return gulp.src(['package.json', 'bower.json'])
    .pipe(lp.git.commit(currentVersion()), {args: '-a'});
});

// runs all unit tests in PhantomJS by default
// use --watch to automatically rerun specs on file change
// use --browser=<browser> to launch another browser
gulp.task('spec', function () {
  process.env.NODE_ENV = 'test';
  return gulp.src(specFiles())
    .pipe(lp.karma(karmaConfig()))
    .on('error', function (err) {
      throw err;
    });
});

gulp.task('test', ['spec']);

// tags HEAD ref with version
gulp.task('tag', function (cb) {
  var version = currentVersion();
  lp.git.tag(version, version, {}, cb);
});

gulp.task('bump', function (cb) {
  runSequence('bumpVersion', 'commitVersion', 'tag', cb);
});

// default task - builds, watches files, and runs server
// use --deployment for deployment build (minify, concat, etc)
gulp.task('default', ['build'], function (cb) {
  runSequence('server', 'watch', cb);
});
