/**
 * The DOM Element unit handling
 *
 * Copyright (C) 2008-2010 Nikolay V. Nemshilov
 */

// Element constructor options mapper
var element_arguments_map = {
  id:      'id',
  html:    'innerHTML',
  'class': 'className'
},

element_methods_map = {
  style:   'setStyle',
  on:      'on'
},

Element_wrappers = {},

// caching the element instances to boos the things up
elements_cache = {},

/**
 * The elements constructor
 *
 * NOTE: this function is called in a context of a dom-wrapper
 *
 * @param String element tag name
 * @param Object options
 * @return HTMLElement
 */
element_constructor = function(element, options) {
  // building the element
  this._ = element = (element in elements_cache ? elements_cache[element] :
    (elements_cache[element] = document.createElement(element))
  ).cloneNode(false);

  // applying the options
  if (options !== undefined) {
    for (var key in options) {
      if (key in element_arguments_map) {
        element[element_arguments_map[key]] = options[key];
      } else if (key in element_methods_map) {
        this[element_methods_map[key]](options[key]);
      } else {
        this.set(key, options[key]);
      }
    }
  }
  
  return element;
};

if (Browser.IE) {
  //
  // IE browsers have a bug with checked input elements
  // and we kinda hacking the Element constructor so that
  // it affected IE browsers only
  //
  element_constructor = patch_function(element_constructor, /(\((\w+),\s*(\w+)\)\s*\{)/,
    '$1if($2==="input"&&$3)$2="<input name="+$3.name+" type="+$3.type+($3.checked?" checked":"")+"/>";'
  );
}

/**
 * The actual elements wrapper
 *
 */
var Element = RightJS.Element = new Wrapper({
  /**
   * constructor
   *
   * NOTE: this constructor will dynamically typecast
   *       the wrappers depending on the element tag-name
   *
   * @param String element tag name or an HTMLElement instance
   * @param Object options
   * @return Element element
   */
  initialize: function(element, options) {
    var tag = element.tagName, instance = this;

    // dynamically swapping the wrapper if we have it in the system
    if (tag in Element_wrappers) {
      instance = new Element_wrappers[tag](element);
      instance.$listeners = this.$listeners || [];
    } else {
      this._ = element;
    }

    return instance;
  },
  
  construct: element_constructor
});

Element.Wrappers = Element_wrappers;
