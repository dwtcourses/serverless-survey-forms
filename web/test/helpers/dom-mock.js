module.exports = function(markup) {
if (typeof document !== 'undefined') return;
    const i18n = require('./i18n');
    const jsdom = require('jsdom').jsdom;

    global.document = jsdom(markup || '');
    global.window = document.defaultView;
    global.window.localStorage = {};
    global.navigator = {
        userAgent: 'node.js'
    };
    global.I18Next = i18n;

    // take all properties of the window object and also attach it to the
    // mocha global object
    propagateToGlobal(window);
};


// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (window) {
    for (let key in window) {
        if (!window.hasOwnProperty(key)) continue;
        if (key in global) continue;

        global[key] = window[key];
    }
}
