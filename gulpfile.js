import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as nodeSass from 'sass';
import { create as bsCreate } from 'browser-sync';
import { deleteAsync } from 'del';
import imagemin from 'gulp-imagemin';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import terser from 'gulp-terser';

const browserSync = bsCreate();
const scss = gulpSass(nodeSass);

export function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'app/',
		},
	});
}

export function cleanDist() {
	return deleteAsync('docs');
}

export function images() {
	return gulp
		.src('app/images/**/*')
		.pipe(
			imagemin([
				imagemin.gifsicle({ interlaced: true }),
				imagemin.mozjpeg({ quality: 75, progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({
					plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
				}),
			]),
		)
		.pipe(gulp.dest('docs/images'));
}

export function scripts() {
	return gulp
		.src([
			'node_modules/choices.js/public/assets/scripts/choices.min.js',
			'app/js/main.js',
		])
		.pipe(concat('main.min.js'))
		.pipe(terser())
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.stream());
}

export function styles() {
	return gulp
		.src([
			'node_modules/choices.js/public/assets/styles/choices.min.css',
			'app/scss/*.scss',
		])
		.pipe(scss({ outputStyle: 'compressed' }))
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 10 version'],
				grid: true,
			}),
		)
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
}

export function build() {
	return gulp
		.src(
			[
				'app/css/*.css',
				'app/js/main.min.js',
				'app/*.html',
			],
			{
				base: 'app',
			},
		)
		.pipe(gulp.dest('docs'));
}

export function watching() {
	gulp.watch(['app/scss/**/*.scss'], styles);
	gulp.watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
	gulp.watch(['app/*.html']).on('change', browserSync.reload);
}

export const builder = gulp.series(cleanDist, images, build);

export default gulp.parallel(styles, scripts, browsersync, watching);
