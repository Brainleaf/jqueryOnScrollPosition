# jqueryOnScrollPosition (version 0.4.0 - beta)
Detects if a DOM element is inside the viewport height on window scroll

**jqueryOnScrollPosition** is a jquery plugin that, during window scrorll, simply get the top and bottom positions of a DOM element, get its height and check if the element body is visible on screen. This plugin works with callbacks system returning an object (with some boolean results) that will passed, as parameter, to the callback functions.<br>
*jqueryOnScrollPosition* can accept 3 different callbacks that you can use as you need. <br>
See more about function callbacks usage on documentation.

## Installation

You can install plugin using [**Bower**](http://bower.io)

```
$ bower install on-scroll-position --save
```

or manually downloading package from GitHub or plugin homepage.

### Include Plugin
Include plugin in your webpages 
```html
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="path/to/jquery.onScrollPosition.min.js"></script>
```

### Usage
```javascript
$(function() {
    $("#element").onScrollPosition({
        callbackOnTrue: function(results) {
            // the code placed here will be executed only when element is visible
        },
        callbackOnFalse: function(results) {
            // the code placed here will be executed only when element is NOT visible
        },
        callbackOnScroll: function(results) {
            // the code placed here will be executed each time the page is scrolled
        }
    });
});
```

## Documentation
You can find a complete documentation with some use example at [Plugin HomePage](http://factory.brainleaf.eu/jqueryOnScrollPosition/)
