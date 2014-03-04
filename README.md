# rattrap

Temporarily capture all mouse events, preventing them from reaching underlying elements.

## Installation

Browserify is recommended.

    $ npm install rattrap

## Example

See `example/index.htm`.

```javascript
var rt = require('rattrap');

var stopCapture = rt.startCapture({
    mousemove: function(evt) {
        console.log("captured mouse movement", evt);
    },
    mouseup: function() {
        stopCapture();
    }
});
```

## API

#### `rattrap.startCapture([document], handlers)`

Starts catpuring all mouse events and dispatches them to `handlers`, an object mapping DOM event names such as `mousemove` and `mouseup` to event handlers. The special key `cursor` can also be used to display any CSS-supported cursor whilst capture is active. If omitted, `document` defaults to `window.document`. Returns a function that can be called to cancel the capture operation.

## Browser Support

Tested on Chrome 28 and Firefox 22.
