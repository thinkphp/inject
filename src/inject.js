(function(name, definition, context) {

   if(typeof module != 'undefined' && module.exports) module.exports = definition()

   else if(typeof context['define'] != 'undefined' && context['define'] == 'function' && context['define']['amd']) define(name, definition)

   else context[ name ] = definition()

})('inject', function(){

   var f = false, 

       loaded = f,

       queue = 1,

       done

   function callback() {

       if(!--queue) {

          done && done()
       }
   }

   function injectScript( src, fn ) {

            var loaded = f

            var s = document.createElement( 'script' )

                s.onload = s.onerror = s.onreadystatechange = function() {

                      if(loaded) return

                      s.onload = s.onreadystatechange = null

                      loaded = 1

                      fn() 
                }

                s.async = !0
                
                var file = /\.js$/.test(src) ? src : src + '.js'

                s.src = file

                document.getElementsByTagName( 'head' )[ 0 ].appendChild( s ) 
   }

   function Base( src ) {
 
            this.curr = this.root = new ScriptStep( src )
   }

   Base.prototype.then = function( src ) {

            this.curr = this.curr.child( src )

            queue++

      return this
   }

   Base.prototype.ready = function( cb ) {

            done = cb

            this.root.exec( callback ) 
   }

   function ScriptStep( src ) {

            this._scripts = [ src ]

            this._next = null
   }

   ScriptStep.prototype.child = function( src ) {

            return this._next = new ScriptStep( src )
   }

   ScriptStep.prototype.exec = function( cb ) {

           var len = this._scripts.length,

               completed = 0,

               self = this

               function parallel(index, src) {
 
                        return function() {

                              injectScript(src, callback)

                              if( ++completed == len )

                                 if(self._next) self._next.exec( cb )
                        }
               } 

               for(var i = 0; i < len; i++) parallel(i, this._scripts[ i ])()
   }

   return function( src ) {

          return new Base( src )
   }
}, this);
