# rattrap

Temporarily capture all mouse events, preventing them from reaching underlying elements.

## Installation

Browserify is recommended.

    $ npm install rattrap

rattrap expects the `document` object to be globally accessible.

## Example

See `example/index.htm`.

    var rt = require('rattrap');

    rt.startCapture({
        mousemove: function(evt) {
            console.log("captured mouse movement", evt);
        },
        mouseup: function() {
            rt.stopCapture();
        }
    });

## API

#### `rattrap.startCapture(handlers)`

Starts catpuring all mouse events and dispatches them to `handlers`, an object mapping DOM event names such as `mousemove` and `mouseup` to event handlers. The special key `cursor` can also be used to display any CSS-supported cursor whilst capture is active.

#### `rattrap.stopCapture()`

Stops mouse capture.

## Browser Support

Tested on Chrome 28 and Firefox 22.