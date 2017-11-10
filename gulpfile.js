var gulp = require('gulp');
var del = require('del');
var push = require('git-push');
var argv = require('minimist')(process.argv.slice(2));
var ncp = require('ncp').ncp;
const path = require('path');
var srcPath = "D:\\Sreejith\\Projects\\Timesheet-Source\\mailservice"; //current folder
var destPath = "D:\\Sreejith\\Projects\\timesheet-app-build"; //Any destination folder

gulp.task('clean', del.bind(null, [destPath+'/*', '!timesheet-app-build/.git'], {dot: true, force: true}));

gulp.task('build', ['clean'], function() {
  // TODO: Build website from source files into the `./build` folder
  
	ncp(srcPath, destPath, function (err) {
		if (err) {
		return console.error(err);
		}
		console.log('Copying files complete.');
	});  
});

gulp.task('deploy', function(cb) {
  var remote =  {name: 'production', url: 'https://git.heroku.com/pure-dusk-99706.git', branch: 'master'};
  push(destPath, remote, cb);
});