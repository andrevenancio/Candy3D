/**
 * @author info@andrevenancio.com (Andre Venancio)
 */


CANDY3D.Math = {

  degToRad: function(degrees) {
    return degress * Math.PI / 180;
  },

  radToDeg: function(radians) {
    return radians * 180 / Math.PI;
  },

  setRGBfromHEX: function(hex) {
    hex = Math.floor(hex);
    var rgb = new CANDY3D.RGB();
    rgb.r = (hex >> 16 & 0xff) / 255;
    rgb.g = (hex >> 8 & 0xff) / 255;
    rgb.b = (hex & 0xff) / 255;
    return rgb;
  },

  hexify: function(channel) {
    var hex = Math.ceil(channel * 255).toString(16);
    if (hex.length === 1) {
      hex = '0' + hex;
    }
    return hex;
  },

  mergeColors: function(hex1, hex2) {
    var rgb1 = CANDY3D.Math.setRGBfromHEX(hex1);
    var rgb2 = CANDY3D.Math.setRGBfromHEX(hex2);

    var r = (rgb1.r + rgb2.r) / 2;
    var g = (rgb1.g + rgb2.g) / 2;
    var b = (rgb1.b + rgb2.b) / 2;
    return new CANDY3D.RGB(r, g, b);
  },

  format: function(rgb) {
    var r = CANDY3D.Math.hexify(rgb.r);
    var g = CANDY3D.Math.hexify(rgb.g);
    var b = CANDY3D.Math.hexify(rgb.b);
    var hex = '#' + r + g + b;
    return hex;
  }
};