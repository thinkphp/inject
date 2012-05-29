Inject - Yet Another JS Asynchronous Script Loader
--------------------------------------------------

This library allows you to load script resources on-demand from any URL and not block other resources from loading(like CSS and images).

How to use
==========

       inject('moo.js').then('foo.js').then('bar.js').ready(function(){

           //moo.js & foo.js & bar.js ready
           //do something
       }) 

       or you can without dot js

       inject('moo').then('foo').then('bar').ready(function(){

           //moo.js & foo.js & bar.js ready
           //do something
       }) 
  
Browser support
---------------

* IE6+
* Chrome
* Firefox 3+
* Opera
* Safari 4+

## License ##

Inject is an open-source project released under the MIT license.

