/**
 * This block contains additional Element shortcuts for effects easy handling
 *
 * Credits:
 *   Some ideas are inspired by 
 *     - MooTools  (http://mootools.net)      Copyright (C) Valerio Proietti
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Element.addMethods((function(methods) {
  var old_hide   = methods.hide,
      old_show   = methods.show,
      old_scroll = methods.scrollTo;

return {

  /**
   * hides the element with given visual effect
   *
   * @param String fx name
   * @param Object fx options
   */
  hide: function(fx, options) {
    return fx ? this.fx(fx, ['out', options]) : old_hide.call(this);
  },
  
  /**
   * shows the element with the given visual effect
   *
   * @param String fx name
   * @param Object fx options
   */
  show: function(fx, options) {
    return fx ? this.fx(fx, ['in', options]) : old_show.call(this);
  },
  
  /**
   * runs the Fx.Morth effect to the given style
   *
   * @param Object style or a String class names
   * @param Object optional effect options
   * @return Element self
   */
  morph: function(style, options) {
    return this.fx('morph', [style, options || {}]); // <- don't replace with arguments
  },
  
  /**
   * highlights the element
   *
   * @param String start color
   * @param String optional end color
   * @param Object effect options
   * @return Element self
   */
  highlight: function() {
    return this.fx('highlight', arguments);
  },
  
  /**
   * runs the Fx.Fade effect on the element
   *
   * @param mixed fade direction 'in' 'out' or a float number
   * @return Element self
   */
  fade: function() {
    return this.fx('fade', arguments);
  },
  
  /**
   * runs the Fx.Slide effect on the element
   *
   * @param String 'in' or 'out'
   * @param Object effect options
   * @return Element self
   */
  slide: function() {
    return this.fx('slide', arguments);
  },
  
  /**
   * Starts the smooth scrolling effect
   *
   * @param Object {x: NNN, y: NNN} where to scroll
   * @param Object fx-options
   * @return Element this
   */
  scroll: function(value, options) {
    return this.fx('scroll', [value, options||{}]);
  },
  
  /**
   * wraps the old scroll to be able to run it with fxes
   *
   * If you send two hashes then will start a smooth scrolling
   * otherwise will just jump over with the usual method
   * 
   * @return Element this
   */
  scrollTo: function(value, options) {
    return isHash(options) ? this.scroll(value, options) : old_scroll.apply(this, arguments);
  },
  
  
// protected

  // runs an Fx on the element
  fx: function(name, args) {
    var args = $A(args).compact(), options = isHash(args.last()) ? args.pop() : {},
        fx = new Fx[name.capitalize()](this, options);
    
    fx.start.apply(fx, args);
    
    return this;
  }
  
}})(Element.Methods));