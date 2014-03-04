var activeCaptures = [];

function createOverlay(doc) {
    var overlay = doc.createElement('div');
    overlay.className = 'rattrap-overlay';
    overlay.unselectable = 'on';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.webkitUserSelect = 'none';
    overlay.style.mozUserSelect = 'none';
    overlay.style.msUserSelect = 'none';
    return overlay;
}

function makeCaptureHandler(fn) {
    return function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        fn(evt);
    }
}

exports.startCapture = function(doc, events) {

    if (typeof events === 'undefined') {
        events = doc;
        doc = document;
    }

    if (activeCaptures.indexOf(doc) >= 0) {
        throw "cannot capture events, capture is already in progress";
    }

    var overlay = createOverlay(doc);
    doc.body.appendChild(overlay);
    activeCaptures.push(overlay);

    for (var k in events) {
        if (k === 'cursor') {
            overlay.style.cursor = events[k];
        } else {
            overlay.addEventListener(k, makeCaptureHandler(events[k]));
        }
    }

    return function() {
        doc.body.removeChild(overlay);
        activeCaptures.splice(activeCaptures.indexOf(overlay), 1);
        doc = null;
        overlay = null;
    }

}
