CSS Transforms simple carousel
======

Carousel is now ported to <canvas> using the amazing [Three.js](https://github.com/mrdoob/three.js/)

The CSS Transitions version is still available under the branch CSS-Transitions

Math by my brother, Jonas. Stole the singleton pattern from [janl](https://github.com/janl/mustache.js/blob/master/mustache.js)

How to use
----------

* `carousel.init([1, 2, 3, 4]);` // number of elements

* Use `carousel.rotate(index)` to set index (0-based)

* `carousel.shownIndex()` to see what index is there. 

* `carousel.next()` => next item

* `carousel.remove(1);`=> removes item number 1