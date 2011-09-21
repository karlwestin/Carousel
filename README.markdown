CSS Transforms simple carousel
======

Sorry, but currently only webkit-transforms (i'm a lazy fuck)

The sorta weird purpose of this is to rewrite it into using canvas or whatever, for IE9

Math by my brother, Jonas. Stole the singleton pattern from [janl](https://github.com/janl/mustache.js/blob/master/mustache.js)

How to use
----------

* Create a UL with the carousel objects as LI:s

* Use `carousel.rotate(index)` to set index (0-based)

* `carousel.shownIndex()` to see what index is there. 

* `carousel.next() => next item