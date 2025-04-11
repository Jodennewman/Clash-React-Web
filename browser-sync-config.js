module.exports = {
    proxy: "localhost:5173",
    port: 3008,
    open: false,
    notify: false,
    ui: false,
    files: [
        'src/**/*.{html,js,jsx,ts,tsx,css,scss,sass,less}',
        'public/**/*'
    ],
    // Don't attempt to reload on JS changes - let Vite handle that
    injectChanges: true,
    ghostMode: false,
    logLevel: "info"
};
