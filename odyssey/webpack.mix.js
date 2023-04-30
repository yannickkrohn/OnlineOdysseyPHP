const mix = require('laravel-mix');

mix.sass('resources/sass/app.scss', 'public/css')
    .sass('resources/sass/odysseys/brimstone/app.scss', 'public/css/odysseys/brimstone')
    .sass('node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss', 'public/css')
    .sass('node_modules/@fortawesome/fontawesome-free/scss/solid.scss', 'public/css')
    .sass('node_modules/@fortawesome/fontawesome-free/scss/regular.scss', 'public/css')
    .sass('node_modules/@fortawesome/fontawesome-free/scss/brands.scss', 'public/css')
    .js('resources/js/app.js', 'public/js')
    .js('resources/js/odysseys/brimstone/Brimstone.js', 'public/js')
    .autoload({
    jquery: ['$', 'window.jQuery', 'jQuery'],
}).webpackConfig({
});
