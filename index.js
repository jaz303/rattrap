var activeCapture = null;

function createOverlay() {
    var overlay = document.createElement('div');
    overlay.className = 'rattrap-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    return overlay;
}

function makeCaptureHandler(fn) {
    return function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        fn(evt);
    }
}

exports.startCapture = function(events) {

    if (activeCapture) {
        throw "cannot capture events, capture is already in progress";
    }

    activeCapture = createOverlay();

    document.body.appendChild(activeCapture);

    for (var k in events) {
        if (k === 'cursor') {
            activeCapture.style.cursor = events[k];
        } else {
            activeCapture.addEventListener(k, makeCaptureHandler(events[k]));
        }
    }

}

exports.stopCapture = function() {
    if (activeCapture) {
        document.body.removeChild(activeCapture);
        activeCapture = null;
    }
}
