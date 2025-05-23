/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2016, Codrops
 * http://www.codrops.com
 */
; (function (window) {

	'use strict';

	// from: http://stackoverflow.com/a/21913575
	function getComputedTranslateY(obj) {
		if (!window.getComputedStyle) return;
		var style = getComputedStyle(obj),
			transform = style.transform || style.webkitTransform || style.mozTransform;
		var mat = transform.match(/^matrix3d\((.+)\)$/);
		if (mat) return parseFloat(mat[1].split(', ')[13]);
		mat = transform.match(/^matrix\((.+)\)$/);
		return mat ? parseFloat(mat[1].split(', ')[5]) : 0;
	}

	/**********************************************/
	/** https://gist.github.com/desandro/1866474 **/
	/**********************************************/
	var lastTime = 0;
	var prefixes = 'webkit moz ms o'.split(' ');
	// get unprefixed rAF and cAF, if present
	var requestAnimationFrame = window.requestAnimationFrame;
	var cancelAnimationFrame = window.cancelAnimationFrame;
	// loop through vendor prefixes and get prefixed rAF and cAF
	var prefix;
	for (var i = 0; i < prefixes.length; i++) {
		if (requestAnimationFrame && cancelAnimationFrame) {
			break;
		}
		prefix = prefixes[i];
		requestAnimationFrame = requestAnimationFrame || window[prefix + 'RequestAnimationFrame'];
		cancelAnimationFrame = cancelAnimationFrame || window[prefix + 'CancelAnimationFrame'] ||
			window[prefix + 'CancelRequestAnimationFrame'];
	}

	// fallback to setTimeout and clearTimeout if either request/cancel is not supported
	if (!requestAnimationFrame || !cancelAnimationFrame) {
		requestAnimationFrame = function (callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function () {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

		cancelAnimationFrame = function (id) {
			window.clearTimeout(id);
		};
	}
	/**********************************************/
	/** https://gist.github.com/desandro/1866474 **/
	/**********************************************/

	var docElem = window.document.documentElement;

	// some helper functions
	function scrollY() { return window.pageYOffset || docElem.scrollTop; }
	function extend(a, b) {
		for (var key in b) {
			if (b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}
		return a;
	}

	/**
	 * Isometric grid obj
	 */
	function IsoGrid(el, options) {
		this.isolayerEl = el;

		this.options = extend({}, this.options);
		extend(this.options, options);

		this.gridEl = this.isolayerEl.querySelector('.grid');

		// grid items
		this.gridItems = [].slice.call(this.gridEl.querySelectorAll('.grid__item'));
		this.gridItemsTotal = this.gridItems.length;

		this.didscroll = false;

		this._init();
	}

	IsoGrid.prototype.options = {
		// static or scrollable
		type: 'static',
		// grid perspective value
		perspective: 0,
		// grid transform
		transform: '',
		// each grid item animation (for the subitems)
		stackItemsAnimation: {
			// this follows the dynamics.js (https://github.com/michaelvillar/dynamics.js) animate fn syntax
			// properties (pos is the current subitem position)
			properties: function (pos) {
				return {
					translateZ: (pos + 1) * 50
				};
			},
			// animation options (pos is the current subitem position); itemstotal is the total number of subitems
			options: function (pos, itemstotal) {
				return {
					type: dynamics.bezier,
					duration: 500,
					points: [{ "x": 0, "y": 0, "cp": [{ "x": 0.2, "y": 1 }] }, { "x": 1, "y": 1, "cp": [{ "x": 0.3, "y": 1 }] }]
				};
			}
		},
		// callback for loaded grid
		onGridLoaded: function () { return false; }
	};

	IsoGrid.prototype._init = function () {
		var self = this;

		imagesLoaded(this.gridEl, function () {
			// initialize masonry
			self.msnry = new Masonry(self.gridEl, {
				itemSelector: '.grid__item',
				isFitWidth: true
			});

			// the isolayer div element will be positioned fixed and will have a transformation based on the values defined in the HTML (data-attrs for the isolayer div element)
			if (self.options.type === 'scrollable') {
				self.isolayerEl.style.position = 'fixed';
			}

			self.isolayerEl.style.WebkitTransformStyle = self.isolayerEl.style.transformStyle = 'preserve-3d';

			var transformValue = self.options.perspective != 0 ? 'perspective(' + self.options.perspective + 'px) ' + self.options.transform : self.options.transform;
			self.isolayerEl.style.WebkitTransform = self.isolayerEl.style.transform = transformValue;

			// create the div element that will force the height for scrolling
			if (self.options.type === 'scrollable') {
				self._createPseudoScroller();
			}

			// init/bind events
			self._initEvents();

			// effects for loading grid elements:
			if (self.options.type === 'scrollable') {
				new AnimOnScroll(self.gridEl, {
					minDuration: 1,
					maxDuration: 1.2,
					viewportFactor: 0
				});
			}

			// grid is "loaded" (all images are loaded)
			self.options.onGridLoaded();
			classie.add(self.gridEl, 'grid--loaded');
		});
	};

	/**
	 * Creates the div element that will force the height for scrolling
	 */
	IsoGrid.prototype._createPseudoScroller = function () {
		// element that will force the height for scrolling
		this.pseudoScrollerEl = document.createElement('div');
		this.pseudoScrollerEl.className = 'pseudo-scroller';
		// insert it inside the main container (same level of isolayerEl)
		this.isolayerEl.parentNode.insertBefore(this.pseudoScrollerEl, this.isolayerEl);
		// set the height of the pseudoScroller (grid´s height + additional space between the top of the rotated isolayerEl and the page - value set for the translation on the Y axis)
		this.pseudoScrollerEl.style.height = this.gridEl.offsetHeight + getComputedTranslateY(this.isolayerEl) * Math.sqrt(2) + 'px';
	};

	/**
	 * Initialize/Bind events fn.
	 */
	// Helper function for debouncing
	// (Source: https://davidwalsh.name/javascript-debounce-function)
	function debounce(func, wait, immediate) {
		var timeout;
		return function () {
			var context = this, args = arguments;
			var later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	IsoGrid.prototype._initEvents = function () {
		var self = this;

		var scrollHandler = function () {
			requestAnimationFrame(function () {
				if (!self.didscroll) {
					self.didscroll = true;
					self._scrollPage();
				}
			});
		},
			mouseenterHandler = function (ev) {
				self._expandSubItems(ev.target);
			},
			mouseleaveHandler = function (ev) {
				self._collapseSubItems(ev.target);
			};

		// Function to handle resize logic
		var resizeTimeout;
		var onResizeFn = debounce(function () {
			var windowWidth = window.innerWidth;
			var newTransform;
			var perspective = self.options.perspective ? 'perspective(' + self.options.perspective + 'px) ' : '';
			var originalTransform = self.options.transform; // Store original transform

			// Define transforms based on width - adjust translateY mainly
			// Example: Extract original parts using regex or known structure
			var transformParts = originalTransform.match(/translateX\(([^)]+)\)\s+translateY\(([^)]+)\)\s+rotateX\(([^)]+)\)\s+rotateZ\(([^)]+)\)/);
			var originalTranslateX = transformParts ? transformParts[1] : '-15vw'; // Default if match fails
			var originalRotateX = transformParts ? transformParts[3] : '45deg';
			var originalRotateZ = transformParts ? transformParts[4] : '45deg';
			var newTranslateY;

			if (windowWidth > 1024) {
				// Large screens - use original offset (e.g., 275px from initial config)
				newTranslateY = transformParts ? transformParts[2] : '275px';
				newTransform = perspective + originalTransform;
			} else if (windowWidth > 768) {
				// Medium screens (769px - 1024px) - Move further upward
				newTranslateY = '285px'; // Closer to original 275px
				newTransform = perspective + 'translateX(' + originalTranslateX + ') translateY(' + newTranslateY + ') rotateX(' + originalRotateX + ') rotateZ(' + originalRotateZ + ')';
			} else if (windowWidth > 500) {
				// Small screens (501px - 768px) - Move upward
				newTranslateY = '300px'; // Less than previous 325px
				newTransform = perspective + 'translateX(' + originalTranslateX + ') translateY(' + newTranslateY + ') rotateX(' + originalRotateX + ') rotateZ(' + originalRotateZ + ')';
			} else {
				// Extra Small screens (<= 500px) - Keep previous value
				newTranslateY = '325px';
				newTransform = perspective + 'translateX(' + originalTranslateX + ') translateY(' + newTranslateY + ') rotateX(' + originalRotateX + ') rotateZ(' + originalRotateZ + ')';
			}

			// Apply the new transform
			self.isolayerEl.style.WebkitTransform = self.isolayerEl.style.transform = newTransform;

			// Allow transform to apply before layout/height calculation
			// Use setTimeout to ensure styles are computed after transform application
			setTimeout(function () {
				// Recalculate layout
				if (self.msnry) {
					self.msnry.layout();
				}

				// Recalculate scroller height AFTER transform and layout
				if (self.pseudoScrollerEl) {
					// Need to get the *new* computed translateY after applying the transform
					var gridTopOffset = getComputedTranslateY(self.isolayerEl); // Use computed style after transform change
					// Ensure gridTopOffset is a number, default to 0 if not
					gridTopOffset = typeof gridTopOffset === 'number' ? gridTopOffset : 0;
					self.pseudoScrollerEl.style.height = self.gridEl.offsetHeight + Math.abs(gridTopOffset * Math.sqrt(2)) + 'px'; // Use absolute value just in case
					self._scrollPage(); // Adjust scroll position after resize
				}
			}, 50); // Small delay

		}, 250); // Debounce resize events by 250ms

		if (this.options.type === 'scrollable') {
			// update the transform (ty) on scroll
			window.addEventListener('scroll', scrollHandler, false);

			// On resize, trigger the debounced resize function
			window.addEventListener('resize', onResizeFn);

			// on layoutComplete, recalculate height (keep existing logic)
			this.msnry.on('layoutComplete', function (laidOutItems) {
				// reset the height of the pseudoScroller (grid´s height + additional space between the top of the rotated isolayerEl and the page)
				// Use getComputedTranslateY for accuracy if possible, otherwise offsetTop
				var gridTopOffset = getComputedTranslateY(self.isolayerEl) || self.isolayerEl.offsetTop;
				self.pseudoScrollerEl.style.height = self.gridEl.offsetHeight + gridTopOffset * Math.sqrt(2) + 'px';
				self._scrollPage();
			});
		}

		this.gridItems.forEach(function (item) {
			item.addEventListener('mouseenter', mouseenterHandler);
			item.addEventListener('mouseleave', mouseleaveHandler);
		});
	};

	IsoGrid.prototype._expandSubItems = function (item) {
		var self = this,
			itemLink = item.querySelector('a'),
			subItems = [].slice.call(itemLink.querySelectorAll('.layer')),
			subItemsTotal = subItems.length;

		itemLink.style.zIndex = item.style.zIndex = this.gridItemsTotal;

		subItems.forEach(function (subitem, pos) {
			dynamics.stop(subitem);
			dynamics.animate(subitem, self.options.stackItemsAnimation.properties(pos), self.options.stackItemsAnimation.options(pos, subItemsTotal));
		});
	};

	IsoGrid.prototype._collapseSubItems = function (item) {
		var itemLink = item.querySelector('a');
		[].slice.call(itemLink.querySelectorAll('.layer')).forEach(function (subitem, pos) {
			dynamics.stop(subitem);
			dynamics.animate(subitem, {
				translateZ: 0 // enough to reset any transform value previously set
			}, {
				duration: 100,
				complete: function () {
					itemLink.style.zIndex = item.style.zIndex = 1;
				}
			})
		});
	};

	IsoGrid.prototype._scrollPage = function () {
		this.gridEl.style.WebkitTransform = this.gridEl.style.transform = 'translate3d(0,-' + scrollY() + 'px,0)';
		this.didscroll = false;
	};

	window.IsoGrid = IsoGrid;

})(window);
