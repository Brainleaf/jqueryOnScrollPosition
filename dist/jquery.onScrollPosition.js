/*
 *  jQueryOnScrollPosition - v0.4.0
 *  It detects if a DOM element is inside the viewport height on window scroll
 *  http://factory.brainleaf.eu/jqueryOnScrollPosition
 *
 *  Made by BRAINLEAF Communication
 *  Under MIT License
 */
;(function ( $, window, document, undefined ) {

	"use strict";

		var pluginName = "onScrollPosition",
            defaults = {
                activeOnStart: true,
                triggersOffset: [0,0],
                elementOffset: 0,
                callbackOnScroll: "",
                callbackOnTrue: "",
                callbackOnFalse: ""
            };

		// Plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				init: function () {
						// Place initialization logic here
						// You already have access to the DOM element and
						// the options via the instance, e.g. this.element
						// and this.settings
						// you can add more functions like the one below and
						// call them like so: this.yourOtherFunction(this.element, this.settings).
                        if (this.settings.activeOnStart === true) this.getElementPosition(this.element, this.settings);
                        var plugin = this;
                        $(window).on('scroll', function() {
                            plugin.getElementPosition(plugin.element, plugin.settings);
                        });
                        
				},
				getElementPosition: function () {
                    
                    var windowH = $(window).height(),
                        elementH = $(this.element).outerHeight() + this.settings.elementOffset,
                        top = 0 + this.settings.triggersOffset[0],
                        bottom = windowH + this.settings.triggersOffset[1],
                        startPosition,
                        scrollTop,
                        scrollPositions = {
                            elementTop:0,
                            elementBottom:0
                        },
                        results = {};
                    
                    
				    startPosition = $(this.element).offset().top + this.settings.elementOffset;
                    scrollTop = $(window).scrollTop();
                    scrollPositions = {
                        elementTop: (startPosition - scrollTop),
                        elementBottom: (startPosition + elementH) - scrollTop
                    };

                    if (scrollPositions.elementTop > top && scrollPositions.elementTop < bottom && scrollPositions.elementBottom > bottom) {

                        results = {
                            isOnScreen: true,
                            elementTopIsOnScreen: true,
                            elementBottomIsOnScreen: false,
                            isOutOnTop: false,
                            isOutOnBottom: false,
                            scrollTop: $(window).scrollTop()
                        }
                        if(this.settings.callbackOnTrue !== "") this.settings.callbackOnTrue(results);

                    }
                    else if (scrollPositions.elementTop > top && scrollPositions.elementTop < bottom && scrollPositions.elementBottom < bottom) {

                        results = {
                            isOnScreen: true,
                            elementTopIsOnScreen: true,
                            elementBottomIsOnScreen: true,
                            isOutOnTop: false,
                            isOutOnBottom: false,
                            scrollTop: $(window).scrollTop()
                        }
                        if(this.settings.callbackOnTrue !== "") this.settings.callbackOnTrue(results);
                    }

                    else if (scrollPositions.elementTop < top && scrollPositions.elementBottom > top && scrollPositions.elementBottom < bottom) {

                        results = {
                            isOnScreen: true,
                            elementTopIsOnScreen: false,
                            elementBottomIsOnScreen: true,
                            isOutOnTop: false,
                            isOutOnBottom: false,
                            scrollTop: $(window).scrollTop()
                        }
                        if(this.settings.callbackOnTrue !== "") this.settings.callbackOnTrue(results);

                    }

                    else if (scrollPositions.elementTop < top && scrollPositions.elementBottom < top) {

                        results = {
                            isOnScreen: false,
                            elementTopIsOnScreen: false,
                            elementBottomIsOnScreen: false,
                            isOutOnTop: true,
                            isOutOnBottom: false,
                            scrollTop: $(window).scrollTop()
                        }
                        if(this.settings.callbackOnFalse !== "") this.settings.callbackOnFalse(results);

                    }

                    else if (scrollPositions.elementTop > bottom && scrollPositions.elementBottom > bottom) {

                        results = {
                            isOnScreen: false,
                            elementTopIsOnScreen: false,
                            elementBottomIsOnScreen: false,
                            isOutOnTop: false,
                            isOutOnBottom: true,
                            scrollTop: $(window).scrollTop()
                        }
                        if(this.settings.callbackOnFalse !== "") this.settings.callbackOnFalse(results);

                    }

                    if(this.settings.callbackOnScroll !== "") this.settings.callbackOnScroll(results);
                    
				} // end of getElementPosition();
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );
