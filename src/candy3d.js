/**
 * @preserve Candy3D lightweight javascript 3D Engine running on webgl.
 * author: info@andrevenancio.com (Andre Venancio).
 */


var CANDY3D = CANDY3D || {
  name: 'Candy3D',
  version: '0.0.1',
  settings: {
    preserveDrawingBuffer: true,
    premultipliedAlpha: true,
    antialias: true,
    stencil: true,
    alpha: true
  }
};


CANDY3D.inherits = function(child, parent) {
  var tempParent = function() {};
  tempParent.prototype = parent.prototype;
  child.superClass = parent.prototype;
  child.prototype = new tempParent();
  child.prototype.constructor = child;
};


CANDY3D.generateGuid = function(type) {
  var result = type || '';
  for (var j = 0; j < 15; j++) {
    if (j === 5 || j === 10) {
      result = result + '-';
    }

    var i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
    result = result + i;
  }
  return result;
};
